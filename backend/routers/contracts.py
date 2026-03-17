from typing import Literal
from sqlmodel import select, func
from sqlalchemy import distinct
from typing import Annotated
from fastapi import APIRouter, File, Form, Response, UploadFile, status, Query
from pydantic import BaseModel
from sqlmodel import select
from datetime import datetime

from backend.db import ClauseType, Contract, ContractClause, SessionDep

router = APIRouter()

class ContractResponse(BaseModel):
    """
    Response model for contract summaries.
    
    Includes basic contract information along with aggregated clause data for efficient listing and filtering.
    """
    id: int
    name: str
    number_of_clauses: int
    clause_types: list[ClauseType]
    created_at: datetime

class ContractDetailResponse(ContractResponse):
    """Detailed response model for a single contract, including the full text of its clauses."""
    clauses: list[ContractClause]


@router.get("/contracts/")
def get_contracts(
    session: SessionDep, 
    search: str | None = None, 
    categories: list[ClauseType] | None = Query(None), 
    sort: Literal['name', 'created_at', 'number_of_clauses', '-name', '-created_at', '-number_of_clauses'] | None = None
    ):
    """Endpoint to retrieve a list of contracts with optional search, filtering, and sorting."""
    query = select(
        Contract.id,
        Contract.name,
        Contract.created_at,
        func.count(ContractClause.id).label("number_of_clauses"),
        func.group_concat(ContractClause.clause_type, ",").label("clause_types")
    ).join(ContractClause).group_by(Contract.id)
    if sort:
        if sort.startswith('-'):
            sort_field = sort[1:]
            query = query.order_by(getattr(Contract, sort_field).desc())
        else:
            sort_field = sort
            query = query.order_by(getattr(Contract, sort_field).asc())
    # Apply default sorting by created_at desc for consistent results when no sort parameter is provided 
    # or when multiple records have the same value in the sorted field
    query = query.order_by(Contract.created_at.desc())

    if search:
        query = query.where(Contract.name.contains(search))
    if categories:
        query = query.where(ContractClause.clause_type.in_(categories))
    rows = session.exec(query).all()
    return [
        ContractResponse(
            id=r.id,
            name=r.name,
            number_of_clauses=r.number_of_clauses,
            clause_types={ClauseType[c] for c in set(rows[0].clause_types.split(','))},
            created_at=r.created_at,
        )
        for r in rows
    ]


@router.get("/contracts/{contract_id}")
def get_contract_details(session: SessionDep, contract_id: int, response: Response):
    """Endpoint to retrieve detailed information about a specific contract, including its clauses."""
    contract = session.get(Contract, contract_id)
    if not contract:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {'error': '404 - Not found'}
    clauses = session.exec(select(ContractClause).where(ContractClause.contract_id == contract_id)).all()
    return ContractDetailResponse(
        id=contract.id,
        name=contract.name,
        number_of_clauses=len(clauses),
        clause_types={clause.clause_type for clause in clauses},
        clauses=clauses,
        created_at=contract.created_at
    )   

@router.post("/contracts/", status_code=status.HTTP_201_CREATED)
def create_contract(session: SessionDep, name: str = Form(...), file: UploadFile = File(...)):
    """Endpoint to create a new contract by uploading a text file containing the contract clauses."""
    if file.content_type not in ["text/plain", "text/markdown"]:
        return {"error": "Invalid file type. Only text files are allowed."}
    file_content = file.file.read()
    text_content = file_content.decode("utf-8")
    
    contract = Contract(name=name)
    session.add(contract)
    session.commit()
    session.refresh(contract)

    for sentence in text_content.split("."):
        stripped_sentence = sentence.strip()
        if not stripped_sentence:
            continue
        clause = ContractClause(contract_id=contract.id, clause_text=stripped_sentence)
        session.add(clause)
    session.commit()
    
    related_clauses = session.exec(select(ContractClause).where(ContractClause.contract_id == contract.id)).all()
    response = ContractResponse(
        id=contract.id,
        name=contract.name,
        number_of_clauses=len(related_clauses),
        created_at=contract.created_at,
        clause_types={clause.clause_type for clause in related_clauses}
    )
    return response

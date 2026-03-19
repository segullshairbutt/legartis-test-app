from pydantic import BaseModel
from fastapi import APIRouter, Response, status

from backend.db import ClauseType, ContractClause
from backend.db import SessionDep


class ClauseUpdatePayload(BaseModel):
    """Payload model for updating a contract clause's type."""

    clause_type: ClauseType


router = APIRouter()


@router.patch("/clauses/{clause_id}")
def update_clause(
    session: SessionDep,
    clause_id: int,
    clause_update_payload: ClauseUpdatePayload,
    response: Response,
):
    """Endpoint to update the type of a specific contract clause."""
    clause = session.get(ContractClause, clause_id)
    if not clause:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"error": "Clause not found."}
    clause.clause_type = clause_update_payload.clause_type
    session.add(clause)
    session.commit()
    session.refresh(clause)
    return clause

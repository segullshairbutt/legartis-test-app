from datetime import datetime
from typing import Annotated
from enum import Enum

from fastapi import Depends
from sqlmodel import SQLModel, Field, create_engine, Session

class ClauseType(str, Enum):
    """
    Clause types for contract clauses.
    
    Helpful for categorizing clauses and enabling filtering based on clause types.
    """
    LIMITATION_OF_LIABILITY = "Limitation of Liability"
    TERMINATION_FOR_CONVENIENCE = "Termination for Convenience"
    NON_COMPETE = "Non-Compete"

class Contract(SQLModel, table=True):
    """Contract model representing a legal contract."""
    id: int | None = Field(default=None, primary_key=True)
    name: str
    created_at: datetime = Field(default_factory=datetime.now)


class ContractClause(SQLModel, table=True):
    """ContractClause model representing individual clauses within a contract."""
    id: int | None = Field(default=None, primary_key=True)
    contract_id: int = Field(foreign_key="contract.id")
    clause_text: str
    clause_type: ClauseType = Field(default=ClauseType.NON_COMPETE)

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"


engine = create_engine(sqlite_url, echo=True)

def _get_session():
    """Dependency function to get a database session."""
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(_get_session)]


def create_db_and_tables():
    """
    Create the database and tables.
    
    Expected to be called at application startup to ensure the database schema is set up before handling requests.
    """
    SQLModel.metadata.create_all(engine)

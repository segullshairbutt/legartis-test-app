
from fastapi import FastAPI

from backend.db import create_db_and_tables, engine
from backend.routers import contracts, clauses


async def lifespan(app: FastAPI):
    """Lifespan function to handle application startup and shutdown events."""
    create_db_and_tables()
    yield
    engine.dispose()

app = FastAPI(lifespan=lifespan)

app.include_router(contracts.router)
app.include_router(clauses.router)
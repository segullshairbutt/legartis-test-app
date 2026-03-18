from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.db import create_db_and_tables, engine
from backend.routers import contracts, clauses

ALLOWED_ORIGINS = [
    "http://localhost:4200",
]

async def lifespan(app: FastAPI):
    """Lifespan function to handle application startup and shutdown events."""
    create_db_and_tables()
    yield
    engine.dispose()

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contracts.router)
app.include_router(clauses.router)
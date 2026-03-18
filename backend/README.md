# Backend — FastAPI Contract Management API

REST API for managing legal contracts and clauses.

**Stack:** FastAPI + SQLModel + SQLite

## Setup

### Local Development

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -e .
fastapi dev
```

Server runs at `http://localhost:8000`

**API Documentation:** `http://localhost:8000/docs`

### Docker

```bash
docker build -t legartis-backend .
docker run -p 8000:8000 legartis-backend
```

## Project Structure

```
backend/
├── main.py           # FastAPI app, CORS, routes
├── db.py             # Models: Contract, ContractClause
├── routers/
│   ├── contracts.py  # Contract endpoints
│   └── clauses.py    # Clause endpoints
├── pyproject.toml    # Dependencies
└── Dockerfile
```

## API Endpoints

**GET** `/contracts/` — List contracts
**GET** `/contracts/{id}` — Get contract details
**POST** `/contracts/` — Create contract (multipart form with title + file)
**PATCH** `/clauses/{id}` — Update clause

Full docs at `/docs` when running.

## DB Models

- **Contract**: id, name, created_at
- **ContractClause**: id, contract_id, clause_text, clause_type
- **ClauseType**: Enum (Limitation of Liability, Termination for Convenience, Non-Compete)

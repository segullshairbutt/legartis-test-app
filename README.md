# Legartis

A full-stack contract management app. Upload contracts, organize clauses, and manage details.

**Stack:** Angular 21 + FastAPI + SQLite

## Quick Start with Docker

```bash
docker-compose up --build
```

Then open:

- **Frontend:** `http://localhost:4200`
- **Backend:** `http://localhost:8000`
- **API Docs:** `http://localhost:8000/docs`

To stop:

```bash
docker-compose down
```

## Local Development

For local setup instructions, see:

- [Backend README](backend/README.md) — FastAPI setup
- [Web README](web/README.md) — Angular setup

## Tech Stack

### Frontend

- **Framework**: Angular 21.2.2 (Standalone Components)
- **UI Components**: PrimeNG 21.1.3 (PrimeUI themes)
- **Styling**: Tailwind CSS 4.2.1 with tailwindcss-primeui integration
- **State Management**: RxJS for reactive data flows
- **Form Management**: Reactive Forms with strong type safety
- **Testing**: Vitest for unit tests
- **Package Manager**: Yarn 1.22.22

### Backend

- **Framework**: FastAPI 0.135.1 (Python 3.12.1+)
- **ORM**: SQLModel (SQL + Pydantic)
- **Server**: Uvicorn with hot-reload
- **Package Management**: UV package manager

### Database

- **SQLite** (default, configurable to other SQL databases via SQLModel)

### Infrastructure

- **Containerization**: Docker + Docker Compose
- **CORS**: Configured for cross-origin communication between frontend and backend

## Project Structure

```
legartis/
├── backend/                      # FastAPI backend application
│   ├── main.py                   # FastAPI app setup, CORS, lifespan management
│   ├── db.py                     # Database models (Contract, ContractClause, ClauseType enum)
│   ├── pyproject.toml            # Python dependencies and project metadata
│   ├── routers/
│   │   ├── contracts.py          # Contract endpoints (list, detail, create)
│   │   ├── clauses.py            # Clause endpoints
│   │   └── __init__.py
│   ├── Dockerfile                # Backend containerization
│   └── README.md
│
├── web/                          # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.routes.ts     # Route definitions
│   │   │   ├── app.config.ts     # Angular app configuration
│   │   │   ├── utils.ts          # Shared utilities
│   │   │   ├── components/       # Reusable UI components
│   │   │   │   └── layout/       # Main layout wrapper
│   │   │   ├── services/         # API integration services
│   │   │   │   ├── contract-service.ts
│   │   │   │   └── clause-service.ts
│   │   │   ├── types/            # TypeScript type definitions
│   │   │   │   └── contract.ts   # Contract and Clause types
│   │   │   ├── views/            # Page-level components
│   │   │   │   ├── contract/
│   │   │   │   │   ├── list/     # Contract listing page
│   │   │   │   │   ├── create/   # Contract creation form
│   │   │   │   │   └── detail/   # Contract details with clauses
│   │   │   │   │       └── edit-clause-dialog/
│   │   │   │   └── generics/     # Generic pages (404, etc.)
│   │   │   └── styles.css        # Global styles
│   │   ├── main.ts               # Entry point
│   │   └── index.html            # HTML template
│   ├── angular.json              # Angular CLI configuration
│   ├── tsconfig.json             # TypeScript configuration
│   ├── package.json              # Node dependencies
│   ├── Dockerfile                # Frontend containerization
│   └── README.md
│
├── docker-compose.yml            # Multi-container orchestration
└── a.md                          # Project notes
```

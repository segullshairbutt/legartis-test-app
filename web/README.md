# Web — Angular Frontend

Contract management UI built with Angular 21, PrimeNG, and Tailwind CSS.

**Stack:** Angular 21 + PrimeNG + Tailwind CSS + RxJS

## Setup

### Local Development

```bash
cd web
yarn install
yarn start
```

App runs at `http://localhost:4200`

### Docker

```bash
docker build -t legartis-web .
docker run -p 4200:4200 legartis-web
```

## Project Structure

```
web/src/app/
├── app.routes.ts         # Route definitions
├── app.ts                # Root component
├── utils.ts              # Utilities
├── components/           # Reusable components
├── services/             # API services
│   ├── contract-service.ts
│   └── clause-service.ts
├── types/                # TypeScript types
│   └── contract.ts
└── views/                # Page components
    ├── contract/list
    ├── contract/create
    └── contract/detail
```

## Features

- Contract listing with search and filters
- Upload new contracts
- View contract details and clauses
- Edit clause information

## Available Commands

```bash
yarn start       # Dev server
yarn build       # Production build
yarn test        # Run tests
```

## Notes

- All components are **standalone** for better modularity
- Uses **Reactive Forms** for type-safe form handling
- Routes are **lazy-loaded** for better performance
- File inputs tracked in component state for better control

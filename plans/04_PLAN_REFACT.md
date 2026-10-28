# Plan 1: Refactor - Separate API (Backend) and App (Frontend), Apply OOP & SOLID Principles

## Goal
Restructure the project to clearly separate backend (API) from frontend (App), follow Object-Oriented Programming (OOP) best practices with proper separation of concerns, apply SOLID principles rigorously, avoid code duplication, and organize in a scalable, maintainable way - without changing existing behavior for the sign-up flow.

## Current State Analysis
- **Frontend (Next.js App Router)**: Currently in `src/app/` contains pages, layouts, and API routes mixed together (Next.js App Router convention mixes routes; need to reorganize structure conceptually)
- **Backend**: API routes live under `src/app/api/v1/...` (route handlers doing validation, hashing, DB access directly)
- **Shared logic**: Utilities in `src/lib/`, components in `src/components/`
- **Patterns observed**: Inline validation, direct Supabase calls in route handlers, repeated patterns (password hashing, ID generation, timestamps)

## Target Structure

We need to separate concerns:
- **Backend/API layer**: Move API logic to a dedicated structure (e.g., `src/api/` or `api/`) - "sem versionamento" means remove `/v1/` versioning from paths as requested
- **Frontend/App layer**: Move UI/routes to `src/app/` reorganized or to `src/app/` kept for Next.js routing but with clear separation; the user says "separe os arquivos que são de backend em uma pasta API - sem versionamento - e os que são de frontend para uma pasta App"

But Next.js App Router has constraints - API routes must live under `app/` or we need to use route handlers. We need to plan carefully:
- Option 1: Create `src/api/` for backend services/controllers/repositories (framework-agnostic), keep Next.js route handlers thin in `src/app/api/` or restructure to `src/api/` as the backend root without versioning
- Option 2: Move API route handlers from `src/app/api/v1/*` to `src/api/*` (no versioning) and have Next.js route handlers in `src/app/api/*` that delegate, OR restructure so backend is in `src/api/` 

The key instruction: "separe os arquivos que são de backend em uma pasta API - sem versionamento - e os que são de frontend para uma pasta App"

So:
- Backend files → `src/api/` (or root `api/`) without `v1/` versioning
- Frontend files → `src/app/` (or `src/app/` reorganized as "App" folder)

Need to respect Next.js App Router - pages/layouts stay in app router structure, but organize internal structure. Maybe:
```
src/
├── api/                    # Backend (no versioning) - services, controllers, repositories, validators, etc.
│   ├── accounts/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── validators/
│   │   ├── dtos/
│   │   ├── entities/
│   │   └── index.ts
│   ├── products/           # for future CRUD
│   └── shared/             # common backend utilities (hashing, id, db)
│       ├── interfaces/     # Base interfaces (IRepository, IService, etc.)
│       ├── services/       # Shared services (HashService, IdGenerator, DateService)
│       ├── errors/         # Custom error classes
│       └── utils/
├── app/                    # Frontend (Next.js App Router pages/routes)
│   ├── auth/
│   ├── products/
│   └── ...
├── components/             # Shared UI components
├── lib/                    # Shared utilities/config
└── types/                  # Shared types
```

And API routes in `src/app/api/` become thin adapters calling `src/api/*` services, or we restructure. Also "sem versionamento" - so endpoints move from `/api/v1/sign-up` to `/api/sign-up` etc.

## SOLID Principles & OOP Best Practices

### SOLID Principles (Mandatory)
- **S - Single Responsibility Principle (SRP)**: Each class, module, or function must have one reason to change. Controllers handle HTTP, Services handle business logic, Repositories handle data access.
- **O - Open/Closed Principle (OCP)**: Entities should be open for extension but closed for modification. Use interfaces and inheritance/composition to extend behavior without changing existing code.
- **L - Liskov Substitution Principle (LSP)**: Implementations must be substitutable for their interfaces. All repository/service implementations must honor their contracts.
- **I - Interface Segregation Principle (ISP)**: Create focused, minimal interfaces. Don't force classes to implement unused methods. Prefer multiple small interfaces over large ones.
- **D - Dependency Inversion Principle (DIP)**: High-level modules should not depend on low-level modules. Both should depend on abstractions. Use dependency injection (constructor injection) to decouple layers.

### Additional OOP & Best Practices
- **Encapsulation**: Hide internal state, expose only necessary methods through interfaces
- **Abstraction**: Define contracts via interfaces in `shared/interfaces/` and domain interfaces
- **Composition over Inheritance**: Prefer composing dependencies over deep inheritance hierarchies
- **Separation of Concerns**: Strict Controller → Service → Repository layers
- **DRY (Don't Repeat Yourself)**: Extract common logic to shared services
- **YAGNI (You Aren't Gonna Need It)**: Implement only what's needed now, but design for extensibility
- **KISS (Keep It Simple, Stupid)**: Favor simple, readable solutions
- **Dependency Injection**: All dependencies injected via constructors for testability
- **DTOs (Data Transfer Objects)**: Use DTOs for input/output contracts, separate from entities
- **Value Objects**: Encapsulate domain concepts with validation (e.g., Email, Password)
- **Custom Error Classes**: Centralized error handling with domain-specific errors
- **Type Safety**: Leverage TypeScript strictly, avoid `any`
- **Immutability**: Prefer immutable data where possible
- **Single Source of Truth**: Centralize configurations, constants, and shared logic

## Design Patterns to Apply
- **Repository Pattern**: Abstract data access behind interfaces
- **Service Layer Pattern**: Encapsulate business logic
- **Dependency Injection**: Constructor-based DI for loose coupling
- **Factory Pattern**: For creating complex objects/services when needed
- **Strategy Pattern**: For interchangeable algorithms (e.g., different validators/hasher implementations)

## Refactoring Steps

### Phase 1: Analysis & Preparation
1. Map all current files and dependencies
2. Identify what is backend vs frontend
3. Create new directory structure
4. Plan migration without breaking current sign-up flow

### Phase 2: Create Backend Structure (OOP)
Create in `src/api/`:
- `shared/` - base classes, interfaces, utilities (HashService, IdGenerator, DateService)
- `accounts/` - account domain
  - `Account.ts` or types
  - `AccountRepository.ts` (interface + Supabase implementation)
  - `AccountService.ts` (business logic)
  - `AccountController.ts` (orchestrates)
  - `accountValidator.ts` (validation rules)
- `products/` (prepare for CRUD)
- `config/` - DB config

Example pattern:
```typescript
// src/api/shared/interfaces/IRepository.ts
export interface IRepository<T> { ... }

// src/api/accounts/AccountRepository.ts
export class AccountRepository implements IAccountRepository {
  constructor(private db: SupabaseClient) {}
  async create(account: CreateAccountDTO): Promise<Account> { ... }
}
```

### Phase 3: Extract Common Logic
- **Password hashing**: `src/api/shared/services/PasswordHasher.ts` (bcrypt wrapper)
- **ID generation**: `src/api/shared/services/IdGenerator.ts` (nanoid wrapper)
- **Timestamps**: `src/api/shared/services/DateService.ts`
- **Validation**: Extract schemas to `src/api/*/validators/`

### Phase 4: Refactor Sign-Up Route
- Move logic from `src/app/api/v1/sign-up/route.ts` to `src/api/accounts/AccountController.ts` + `AccountService.ts`
- Create thin Next.js route handler in new location or adapt
- Remove versioning: move to `/api/sign-up` (or keep compatibility? But "sem versionamento" requested)

### Phase 5: Reorganize Frontend
- Keep Next.js App Router structure in `src/app/` as frontend
- Ensure clear separation - no business logic in components/pages, move to hooks/services
- Extract API calls to `src/services/` or `src/lib/api/`
- Components already separated

### Phase 6: Update Imports & Routes
- Update all imports
- Change API endpoints from `/api/v1/*` to `/api/*` (no versioning)
- Update frontend to call new endpoints
- Ensure no duplication

## Implementation Checklist
- [ ] Create `src/api/` directory structure
- [ ] Create shared services (Hash, Id, Date)
- [ ] Create Account domain (Repository, Service, Controller, Validator)
- [ ] Refactor sign-up to use OOP layers
- [ ] Move/restructure API routes to remove versioning
- [ ] Extract frontend API calls to dedicated service layer
- [ ] Remove duplicated code
- [ ] Update imports throughout codebase
- [ ] Test sign-up flow still works
- [ ] Update documentation

## Risks & Considerations
- Next.js App Router requires API routes in `app/api/` - need to decide: keep thin route handlers there that import from `src/api/`, or use different structure
- Breaking changes to routes (removing v1) - need to update frontend
- Maintaining backward compatibility during transition
- Large refactor - do incrementally

## Success Criteria
- Backend logic in `src/api/` with OOP layers, no versioning
- Frontend in `src/app/` clearly separated
- No code duplication
- Sign-up flow works identically
- Clear separation of responsibilities
- Follow SOLID principles

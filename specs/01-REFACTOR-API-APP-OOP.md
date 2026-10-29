# 01 - Refactor: API/App Separation with OOP and SOLID

## Scope
Frontend, Backend, Architecture

## Context
Refactor the codebase to separate backend logic into `src/api/` with OOP layers (Controller → Service → Repository), keep Next.js route handlers as thin adapters in `src/app/api/`, apply SOLID principles, remove API versioning, and maintain existing sign-up behavior.

## Functional Requirements
1. Create `src/api/` structure with shared services, errors, and interfaces
2. Implement Account domain with Repository, Service, Controller, Validator, DTOs
3. Move sign-up logic from `src/app/api/v1/sign-up` to `src/api/accounts/*`
4. Create thin route adapter at `src/app/api/sign-up/route.ts` (no versioning)
5. Update frontend to call `/api/sign-up`
6. Follow dependency injection via constructors

## Non-Functional Requirements
- SOLID principles (SRP, OCP, LSP, ISP, DIP)
- Separation of concerns
- No code duplication
- Framework-agnostic business logic where possible
- Type safety

## You Must
- Keep route handlers only in `src/app/api/` as thin adapters
- Put all business logic in `src/api/`
- Use interfaces and dependency injection
- Remove versioning from sign-up endpoint

## You Must Not
- Move route.ts files outside `src/app/api/`
- Break existing sign-up flow
- Add features outside refactor scope

## Tech Stack
Next.js, TypeScript, Supabase, bcrypt, nanoid

## Acceptance Criteria
- Sign-up works via `/api/sign-up`
- Business logic in `src/api/accounts/`
- Route handler is thin (<10 lines)
- SOLID layers implemented

## Result
Clean architecture with separated concerns, maintainable and extensible codebase

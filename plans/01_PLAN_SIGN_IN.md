# Sign-In Implementation Plan (Authentication)

## Objective
Implement authentication to allow users to sign in with email and password, create sessions via cookies, show generic errors, and conditionally display the header (Sign In button vs avatar).

## Current State
- Sign-up flow is implemented (`/auth/sign-up`, `POST /api/v1/sign-up`, `accounts` table)
- No `/auth/sign-in` page
- No `POST /api/v1/sign-in` endpoint
- No shared platform layout
- Home is minimal
- No session/auth system

## Scope
Frontend, Backend

## Tech Stack
React.js, Next.js (App Router), React Hook Form, Zod, Shadcn/UI, TailwindCSS, Supabase, tRPC (if applicable), Bun

## Files to Create/Modify

### Database
- Check `accounts` table (exists: id, first_name, last_name, email, password(hash), active, created_at, updated_at). No migration needed if compatible.

### Backend (API)
- `src/app/api/v1/sign-in/route.ts` - POST endpoint
  - Validate body (email, password)
  - Find user in `accounts` by email
  - Compare password with bcrypt
  - On failure: return 401 with generic message "Invalid email or password" (do not reveal which field)
  - On success: create Next.js session via cookies and return 200

### Frontend
- `src/app/auth/sign-in/page.tsx` - Sign-in page
- Layout/header components for conditional display
- Update `src/app/page.tsx`
- UI components as needed

### Auth Utilities
- `src/lib/auth/session.ts` - Session management via httpOnly cookies
- `src/lib/auth/get-session.ts` - Get current session

## Implementation Steps

### Step 1: Preparation
- [ ] Read current layout and home
- [ ] Review existing UI components
- [ ] Understand cookie usage in App Router

### Step 2: Session System
- [ ] Create session creation (set httpOnly cookie)
- [ ] Create session retrieval
- [ ] Create session destruction (optional)
- [ ] Define cookie name and payload

### Step 3: Sign-In API
- [ ] Create route
- [ ] Validate format (400 if malformed)
- [ ] Lookup user
- [ ] Compare password
- [ ] Generic 401 on failure
- [ ] Create session and set cookie on success

### Step 4: Sign-In Page
- [ ] Form with React Hook Form + Zod
- [ ] Fields: email, password
- [ ] Red error alert on failure
- [ ] Redirect to `/` on success
- [ ] Match project style

### Step 5: Layout and Header
- [ ] Header component with session check
- [ ] Show "Sign In" linking to `/auth/sign-in` if not logged in
- [ ] Show avatar + name/email if logged in (use DiceBear)
- [ ] Integrate into layout

### Step 6: Home
- [ ] Update home with title and skeleton
- [ ] Integrate header

### Step 7: Validation
- [ ] Valid login
- [ ] Invalid credentials (generic error)
- [ ] Malformed data
- [ ] Cookie set
- [ ] Conditional header

## Acceptance Criteria
- [ ] `/auth/sign-in` exists with form and validation
- [ ] `POST /api/v1/sign-in` works
- [ ] Generic error on auth failure
- [ ] Session via cookies, redirect to `/` on success
- [ ] Header shows button when logged out, avatar+info when logged in
- [ ] Base layout created
- [ ] Home updated

## Notes
- Never leak whether email exists
- Use httpOnly cookies; secure in production
- Follow sign-up patterns
- Use bcrypt.compare
- Use DiceBear for avatars

## Suggested Order
1. Session utilities
2. API
3. Header/layout
4. Page
5. Home
6. Tests

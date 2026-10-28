# Feedback Implementation Plan (Product Reviews)

## Objective
Allow authenticated users to add reviews (rating 1-5 + comment). Unauthenticated users see an auth prompt. Show existing reviews on product detail page.

## Current State
- Detail page may not be complete
- Auth system needs to exist
- `products` table needed
- No `products_feedbacks` table

## Scope
Frontend, Backend, Database

## Tech Stack
React.js, Next.js, React Hook Form, Zod, Shadcn/UI, TailwindCSS, Supabase, tRPC

## Files to Create/Modify

### Database
- Migration for `products_feedbacks`: `id` (nanoid), `score` (int 1-5), `comment` (text), `created_at`, `created_by` (FK accounts), `product_id` (FK products)

### Backend
- Endpoint to create feedback (require auth)

### Frontend
- Update `src/app/products/[id]/page.tsx`
- `src/components/feedback/feedback-form.tsx`
- `src/components/feedback/feedback-list.tsx`
- `src/components/feedback/auth-required.tsx`

## Steps

### Step 1: Database
- [ ] Create migration with FKs and score constraint 1-5

### Step 2: Auth
- [ ] Ensure session helpers exist

### Step 3: API
- [ ] POST endpoint for feedback (401 if not logged in, 400 on validation)

### Step 4: UI
- [ ] Show product, reviews, and form or auth block
- [ ] Form with rating 1-5 and comment

### Step 5: Validation
- [ ] Auth block for unauthenticated
- [ ] Form for authenticated
- [ ] Create review
- [ ] Validation works

## Acceptance Criteria
- [ ] Table created
- [ ] Detail page shows product + reviews + form/auth block
- [ ] Only authenticated can post
- [ ] Reviews listed

## Notes
- Check session on server
- Join with accounts to show author
- Follow project patterns

## Suggested Order
1. Migration
2. Session helpers
3. API
4. Components + page
5. Tests

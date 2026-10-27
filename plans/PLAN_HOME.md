# Home Implementation Plan (Product Listing)

## Objective
Implement product listing on the home page with infinite scroll, create `products` table, add `GET`/`POST` endpoints for products, and prepare navigation to product details.

## Current State
- Home is minimal
- No `products` table
- No product endpoints
- No detail page

## Scope
Frontend, Backend, Database

## Tech Stack
React.js, Next.js (App Router), React Hook Form, Shadcn/UI, TailwindCSS, Supabase, tRPC, Bun, React Query

## Files to Create/Modify

### Database
- `supabase/migrations/XXXXXX_create_products_table.sql`
  - `id` (nanoid), `name` (text), `description` (text nullable), `image_url` (text nullable), `external_link` (text), `score` (boolean/number), `created_at`, `updated_at`

### Backend
- `src/app/api/v1/products/route.ts` - GET (paginated/infinite) and POST (manual creation)

### Frontend
- `src/app/page.tsx` - Update home
- `src/components/products/product-card.tsx`
- `src/components/products/product-list.tsx`
- `src/app/products/[id]/page.tsx` - Basic detail page

## Steps

### Step 1: Database
- [ ] Review migrations
- [ ] Create migration
- [ ] Apply migration

### Step 2: API
- [ ] GET `/api/v1/products` with pagination/cursor
- [ ] POST `/api/v1/products` (name, external_link, image)
- [ ] Return [] if empty

### Step 3: Components
- [ ] ProductCard (title, image, description)
- [ ] ProductList with infinite scroll (IntersectionObserver/React Query)
- [ ] Integrate with data fetching

### Step 4: Pages
- [ ] Update home
- [ ] Create basic `/products/[id]` route
- [ ] Link to details

### Step 5: Validation
- [ ] Empty list
- [ ] With products
- [ ] Infinite scroll
- [ ] Navigation
- [ ] Manual POST

## Acceptance Criteria
- [ ] `products` table via migration
- [ ] GET returns products or []
- [ ] POST allows manual creation
- [ ] Home lists products with image/title/description
- [ ] Infinite scroll works
- [ ] Clicking product navigates to detail
- [ ] Public page

## Notes
- Include `image_url`
- Follow existing patterns
- Keep scope to listing only

## Suggested Order
1. Migration
2. API
3. Components
4. Pages
5. Tests

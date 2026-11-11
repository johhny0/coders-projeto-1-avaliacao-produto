# 03 - Review Summary Persistence and Rating Overview

## Scope
Backend, Database, Frontend

## Context
The AI review summary is currently generated on every product page load. Persist generated summaries so they are reused until the product receives a new review. Also add a rating overview above the reviews list.

## Functional Requirements
1. Store review summaries in `product_review_summaries`
2. Reuse the stored summary while the number of reviews with comments and the latest review timestamp are unchanged
3. Generate and persist a new summary only when a new review changes those values
4. Keep returning the stored summary when the AI provider fails during regeneration
5. Show a rating overview above the reviews list with:
   - Average score
   - Total review count
   - Percentage of reviews for each star value (1 to 5)
6. Do not render the rating overview when the product has no reviews

## Non-Functional Requirements
- Follow the existing OOP layering (`Controller` -> `Service` -> `Repository`)
- Keep route handlers as thin adapters
- Use Supabase service-role access for persistence
- Preserve the existing visual language (Tailwind tokens: `ink`, `graphite`, `rule`, `surface`)

## Data Model
`product_review_summaries`
- `product_id` (primary key, references `products.id`, cascade delete)
- `summary` (text, required)
- `reviews_count` (integer, required)
- `latest_review_at` (timestamptz, nullable)
- `created_at`, `updated_at` (timestamptz)

## Acceptance Criteria
- First request with reviews generates and stores the summary
- Subsequent requests load the stored summary without calling the AI provider
- Adding a review triggers a new summary generation
- Rating overview shows the correct average and per-star percentages
- TypeScript compilation succeeds

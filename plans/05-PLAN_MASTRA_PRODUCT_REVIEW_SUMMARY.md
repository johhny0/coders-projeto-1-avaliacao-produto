# Plan 5: Product Review AI Summary with Mastra (Auto-load)

## Goal
Add a new section on the product page, between the product description and the reviews list, where Mastra AI summarizes the product reviews. The summary must be generated automatically on page load using Mastra agents via OpenRouter. The section must only appear if there is at least one review with a comment.

## Scope
- Frontend: New UI section on product page (auto-load)
- Backend/API: New endpoint to generate/get review summary using Mastra agent
- AI: Mastra agent configured to summarize reviews via OpenRouter
- Follow project stack: Next.js, TypeScript, Tailwind, Shadcn/UI, Mastra.ai

## Requirements
1. Create a new session/section on the product page between description and reviews
2. Use Mastra to summarize reviews with AI via OpenRouter
3. Generate summary automatically on page load (no manual "Gerar resumo" button)
4. Only render the section if there is at least one review that has a comment
5. If no reviews or no reviews with comments, do not render anything
6. Show loading state while generating
7. Keep UI clean and consistent with existing design
8. API endpoint to generate summary
9. Agent configured following Mastra patterns with OpenRouter

## Mastra Integration
Reference: https://mastra.ai/docs/agents/overview
- Use `@mastra/core/agent`
- Use `@openrouter/ai-sdk-provider` with `OPENROUTER_API_KEY`
- Model: `google/gemini-2.5-flash` (configurable)

## UI Placement
On product detail page:
```
[Product Header/Image]
[Product Description]
[AI Review Summary Section]  <- NEW, between description and reviews (only if reviews with comments exist)
[Reviews List]
```

## API Design
Endpoint: `GET /api/products/[id]/review-summary` (primary)
- Fetches all reviews for the product from `products_feedbacks`
- Filters reviews that have non-empty comments
- If no reviews with comments → return 204 No Content so UI does not render
- If reviews with comments exist → generate summary via Mastra agent and return `{ summary: string }`
- Thin adapter in `app/api/`, logic in `src/api/` following SOLID

## Data Flow
1. Product page loads, `ReviewSummary` component mounts
2. Component calls `GET /api/products/[id]/review-summary`
3. API fetches reviews from `products_feedbacks`
4. If no review with comment → API returns 204, component does not render
5. If reviews exist → API calls Mastra agent with reviews
6. Agent returns summary
7. Component displays summary with loading state

## Implementation Plan

### Phase 1: Setup
1. Add dependencies: `@mastra/core`, `@openrouter/ai-sdk-provider`
2. Create Mastra agent structure

### Phase 2: Mastra Agent
Create `src/mastra/agents/review-summary-agent.ts` using OpenRouter:
```typescript
import { Agent } from "@mastra/core/agent";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

export const reviewSummaryAgent = new Agent({
  name: "review-summary-agent",
  instructions: "... Portuguese summary ...",
  model: openrouter("google/gemini-2.5-flash"),
});
```

### Phase 3: API (SOLID)
- Extend `ProductService` with `generateReviewSummary(productId: string)`
  - Validate product exists
  - Fetch reviews from DB
  - Filter reviews with comments
  - If none → return 204
  - Call agent and return summary
- Extend `ProductController` to handle 204
- Create thin route handler in `src/app/api/products/[id]/review-summary/route.ts`

### Phase 4: UI
- Create `src/components/products/review-summary.tsx` as client component
- Auto-fetch on mount with `useEffect` (GET)
- Show loading state
- Only render if summary returned successfully
- Do not show button
- Add to product page between description and reviews

## Files to Create/Modify
- `src/mastra/agents/review-summary-agent.ts` (new)
- `src/mastra/index.ts` (new)
- `src/api/products/services/IProductService.ts` (modify)
- `src/api/products/services/ProductService.ts` (modify)
- `src/api/products/controllers/IProductController.ts` (modify)
- `src/api/products/controllers/ProductController.ts` (modify)
- `src/app/api/products/[id]/review-summary/route.ts` (new)
- `src/components/products/review-summary.tsx` (new)
- `src/app/products/[id]/page.tsx` (modify)

## Checklist
- [x] Use OpenRouter for Mastra agent
- [x] Generate summary on page load (no button)
- [x] Only render if reviews with comments exist
- [x] Thin adapters in app/api/, logic in src/api/
- [x] Follow SOLID principles
- [x] Loading state
- [x] Handle empty/no-comment reviews (no render, 204)
- [x] Add to product page between description and reviews

## Notes
- Requires `OPENROUTER_API_KEY` in environment
- Uses Mastra as per docs
- Follows refact pattern established in Plan 4
- Portuguese summaries to match platform language

# 02 - Product Review AI Summary with Mastra (Auto-load via OpenRouter)

## Scope
Frontend, Backend, AI Integration

## Context
Add an AI-powered summary section on the product page between product description and reviews. Summary is generated automatically on page load using Mastra agents through OpenRouter. Section only appears if there is at least one review with a comment.

## Functional Requirements
1. Create section "Resumo das avaliações com IA" between description and reviews
2. Use Mastra agent with OpenRouter (`google/gemini-2.5-flash`)
3. Generate summary automatically on component mount (no manual button)
4. Fetch reviews from `products_feedbacks` and filter those with non-empty comments
5. If no reviews with comments → do not render section (API returns 204)
6. Display loading state while generating
7. Show summary in clean UI block

## Non-Functional Requirements
- Follow existing architecture (thin adapters in `app/api/`, logic in `src/api/`)
- Apply SOLID principles
- Use environment variable `OPENROUTER_API_KEY`
- Portuguese summaries
- Graceful error handling

## You Must
- Use `@mastra/core/agent` and `@openrouter/ai-sdk-provider`
- Create agent in `src/mastra/agents/review-summary-agent.ts`
- Add endpoint `GET /api/products/[id]/review-summary`
- Extend ProductService/Controller following OOP patterns
- Make component client-side with auto-fetch

## You Must Not
- Add manual generate button
- Render section when no reviews with comments
- Put business logic in route handlers
- Store summaries in database without invalidating them when new reviews are added (see `specs/03-REVIEW-SUMMARY-PERSISTENCE.md`)

## Tech Stack
Next.js, TypeScript, Tailwind, Shadcn/UI, Mastra, OpenRouter, Supabase

## Acceptance Criteria
- Section appears only when reviews with comments exist
- Summary generated on page load
- Loading state shown
- No section rendered if empty
- API follows thin adapter pattern
- Agent uses OpenRouter

## Result
Users see an automatic AI summary of product reviews between description and reviews, powered by Mastra via OpenRouter

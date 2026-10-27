# AGENTS.md

This project must be operated by OpenCode using the Claude model configured in `opencode.jsonc`.

## Project Context
- Base decisions on `docs/ARCHITECTURE.md` for architecture and stack.
- Base decisions on `specs/SIGN_UP.md` as the main specification for the feature currently in development.
- Current scope is account creation (`sign-up`) and must not be expanded to other features.

## Rules
- Before making any changes, read the architecture and relevant specification.
- Follow the defined stack: Next.js, React, TypeScript, Tailwind, Supabase, tRPC, React Hook Form, Shadcn/UI.
- Do not implement features outside the sign-up flow.
- When a task is described as "Claude", execute it via OpenCode using the Claude model already configured.
- Always prioritize API + validation + persistence + success/error feedback.

## Suggested Flow
1. Understand the feature requirements.
2. Review `docs/ARCHITECTURE.md`.
3. Review the relevant spec in `specs/`.
4. Propose or implement the minimal change needed.
5. Validate without expanding scope.

## Language Policy
- All new documents, code files, comments, variable names, function names, and UI text must be in English.
- When creating new files, use English names.
- Translate existing files to English when requested.

## Model
The project uses the Claude model via `anthropic/claude-sonnet-4-5` in `opencode.jsonc`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

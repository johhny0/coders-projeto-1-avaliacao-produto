# Sign In (Authentication)

## Scope
Frontend, Backend

## Context
We need to implement authentication so users can access the platform with:
- Email
- Password

## Functional Requirements
1. Add client-side validation to the form.
   1. If valid, send the request to the API.
2. On authentication failure, display a generic error message (do not specify whether email or password is wrong), e.g. "Invalid email or password".
3. Read and validate credentials from the `accounts` table.
4. The request must be `POST` to `/api/v1/sign-in` with JSON in the body.
5. On success, return `200`. On error:
   1. Create a new Next.js session using cookies.
   2. `400`: Bad request/malformed data.
   3. `401`: Authentication failure.
6. If not logged in, display a "Sign In" button in the header.
7. If logged in, display an avatar with first name, last name, and email.
   1. DiceBear (https://www.dicebear.com/) may be used for avatars.

## Non-Functional Requirements
- UI/UX: Clean, elegant, modern user experience.
- Performance: Fast authentication flow.

## You Must
- Create a base layout for the platform.
- Create a minimal home page (title and skeleton) as needed for header integration.
- Create a new authentication endpoint.
- Create a new sign-in page at `/auth/sign-in`.

## You Must Not
- Implement any functionality outside the authentication flow.
- Send emails at this time. Only process the request, validate credentials, create a session, and return success/error as specified.

## Tech Stack
React.js, Next.js, React Hook Form, Shadcn/UI, TailwindCSS, Supabase, tRPC, Bun

## Acceptance Criteria
- Sign-in page at `/auth/sign-in` with form and validation.
- API communication for sending data and receiving response.
- Error display (red alert in the form).
- On success, redirect to `/`.
- Header shows "Sign In" button when logged out and avatar + user info when logged in.

## Result
Users can sign in to their accounts.

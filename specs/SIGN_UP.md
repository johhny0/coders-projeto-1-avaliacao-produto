# Sign Up (Account Creation)

## Scope
Frontend, Backend, Database

## Context
We need to implement account creation. Users must provide:
- First name
- Last name
- Email
- Password
- Password confirmation

## Functional Requirements
1. Add client-side validation.
   1. If the form is valid, send the request to the API.
   2. First name and last name must be handled separately.
2. Create a new account in the `accounts` table:
   1. `id`: nanoid (generated in the API layer)
   2. `first_name`: text
   3. `last_name`: text
   4. `email`: text
   5. `password`: text (hashed)
   6. `active`: boolean
   7. `created_at`: timestamp
   8. `updated_at`: timestamp
3. The request must be `POST` to `/api/v1/sign-up` with JSON in the body.
4. On success, return `201`. On validation/format errors:
   1. `400`: Bad request/malformed data

## Non-Functional Requirements
- Security: Passwords must be stored securely (hashed). Data must be transmitted securely over HTTPS.
- UI/UX: Clean, elegant, modern user experience.
- Performance: Fast account creation.

## You Must
- Create the base project structure with an initial sign-up endpoint.
- Create the base project structure with a sign-up page.
- Configure base libraries.

## You Must Not
- Implement any functionality outside the sign-up flow.
- Send emails at this time. Only process the request, save to the database, and return success/error as specified.

## Tech Stack
React.js, Next.js, React Hook Form, Shadcn/UI, TailwindCSS, Supabase, tRPC, Bun

## Acceptance Criteria
- Sign-up page at `/auth/sign-up` with form and validation.
- API communication for sending data and receiving response.
- Error display (red alert in the form).
- On success, redirect to `/auth/sign-up/success`.

## Result
Users can create new accounts on the platform.

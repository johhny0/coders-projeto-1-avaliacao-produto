import { cookies } from "next/headers";

export type SessionPayload = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
};

const SESSION_COOKIE_NAME = "aval_session";

export async function createSession(payload: SessionPayload) {
  const cookieStore = await cookies();
  // Use httpOnly cookie; in production secure flag should be true
  // For local dev it's fine as-is
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(payload), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!cookie?.value) {
      return null;
    }
    const session = JSON.parse(cookie.value) as SessionPayload;
    if (!session.userId || !session.email) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

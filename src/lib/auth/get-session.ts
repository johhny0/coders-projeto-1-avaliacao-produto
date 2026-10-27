import { getSession, type SessionPayload } from "./session";

export async function getCurrentSession(): Promise<SessionPayload | null> {
  return getSession();
}

export { getSession as default };
export type { SessionPayload };

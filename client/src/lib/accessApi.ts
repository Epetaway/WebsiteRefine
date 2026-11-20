// Browser client for the gated-content API (server/access/handler.ts). The site is static on
// GitHub Pages; the API runs on Vercel at VITE_ACCESS_API_URL (e.g. https://api.ehicksonjr.com).
// The session lives in an HttpOnly cookie the API sets, so this file never sees a token.

export type GatedDocument = "withyou-engineering";

export const accessApiUrl = (import.meta.env.VITE_ACCESS_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export type AccessRequestInput = {
  document: GatedDocument;
  name: string;
  email: string;
  company?: string;
  reason?: string;
  website?: string;
};

export type ContentResult<T> =
  | { kind: "unlocked"; content: T; expiresAt: string }
  | { kind: "locked"; message?: string }
  | { kind: "unavailable"; message: string };

export class AccessError extends Error {}

const UNAVAILABLE = "Access requests aren't available right now. Please email e@ehicksonjr.com.";

async function call(path: string, init: RequestInit = {}): Promise<Response> {
  if (!accessApiUrl) throw new AccessError(UNAVAILABLE);
  try {
    return await fetch(`${accessApiUrl}/api/access/${path}`, {
      ...init,
      credentials: "include",
      headers: init.body ? { "Content-Type": "application/json" } : undefined,
    });
  } catch {
    throw new AccessError("Couldn't reach the server. Check your connection and try again.");
  }
}

async function errorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string };
    return body.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function fetchGatedContent<T>(document: GatedDocument): Promise<ContentResult<T>> {
  if (!accessApiUrl) return { kind: "unavailable", message: UNAVAILABLE };
  let response: Response;
  try {
    response = await call(`content?document=${encodeURIComponent(document)}`);
  } catch (error) {
    return { kind: "unavailable", message: (error as Error).message };
  }
  if (response.status === 401) {
    // Only an ended approval is worth telling a returning visitor; "not signed in" is the default.
    const message = await errorMessage(response, "");
    return { kind: "locked", message: message.startsWith("Your access has ended") ? message : undefined };
  }
  if (response.status === 503) return { kind: "unavailable", message: await errorMessage(response, UNAVAILABLE) };
  if (!response.ok) return { kind: "unavailable", message: await errorMessage(response, UNAVAILABLE) };
  const body = (await response.json()) as { content: T; expiresAt: string };
  return { kind: "unlocked", content: body.content, expiresAt: body.expiresAt };
}

export async function requestAccess(input: AccessRequestInput): Promise<string> {
  const response = await call("request", { method: "POST", body: JSON.stringify(input) });
  if (!response.ok) throw new AccessError(await errorMessage(response, "Your request didn't go through. Please try again."));
  const body = (await response.json()) as { message?: string };
  return body.message ?? "Request received.";
}

export async function signIn(document: GatedDocument, email: string, password: string): Promise<void> {
  const response = await call("login", { method: "POST", body: JSON.stringify({ document, email, password }) });
  if (!response.ok) throw new AccessError(await errorMessage(response, "Sign-in failed. Please try again."));
}

export async function signOut(): Promise<void> {
  await call("logout", { method: "POST" }).catch(() => undefined);
}

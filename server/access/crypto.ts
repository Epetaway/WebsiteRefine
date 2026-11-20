// Secrets for the gated-content flow: generated passwords, password hashing, signed decision
// links and signed session tokens. Node's built-in crypto only, so there's nothing new to install.
import { createHmac, randomBytes, randomInt, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

// No 0/O, 1/I/L: the password is read from an email and typed by hand.
const PASSWORD_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/** Four groups of four, e.g. "K7MQ-3XPA-9RTV-HC2N": 16 characters from 31 ≈ 79 bits. */
export function generatePassword(): string {
  const chars = Array.from({ length: 16 }, () => PASSWORD_ALPHABET[randomInt(PASSWORD_ALPHABET.length)]);
  return [0, 4, 8, 12].map((i) => chars.slice(i, i + 4).join("")).join("-");
}

/** Accepts what people paste: any case, with or without dashes or spaces. */
export function normalizePassword(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scrypt(normalizePassword(password), salt, 32);
  return `scrypt$${salt.toString("base64url")}$${hash.toString("base64url")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltText, hashText] = stored.split("$");
  if (scheme !== "scrypt" || !saltText || !hashText) return false;
  const expected = Buffer.from(hashText, "base64url");
  const actual = await scrypt(normalizePassword(password), Buffer.from(saltText, "base64url"), expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function hmac(secret: string, value: string): string {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export type Decision = "approve" | "deny";

/** Signature for an approve/deny link. Binds the request id, the action and the link's expiry. */
export function signDecision(secret: string, requestId: string, action: Decision, expiresAt: number): string {
  return hmac(secret, `decision:${requestId}:${action}:${expiresAt}`);
}

export function verifyDecision(
  secret: string,
  requestId: string,
  action: string,
  expiresAt: number,
  signature: string,
  now = Date.now(),
): action is Decision {
  if (action !== "approve" && action !== "deny") return false;
  if (!Number.isFinite(expiresAt) || expiresAt < now) return false;
  return safeEqual(signDecision(secret, requestId, action, expiresAt), signature);
}

export type SessionClaims = { requestId: string; expiresAt: number };

/** A stateless session token: "<requestId>.<expiresAt>.<signature>". */
export function signSession(secret: string, claims: SessionClaims): string {
  const body = `${claims.requestId}.${claims.expiresAt}`;
  return `${body}.${hmac(secret, `session:${body}`)}`;
}

export function verifySession(secret: string, token: string | undefined, now = Date.now()): SessionClaims | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [requestId, expiresText, signature] = parts;
  const expiresAt = Number(expiresText);
  if (!requestId || !Number.isFinite(expiresAt) || expiresAt < now) return null;
  if (!safeEqual(hmac(secret, `session:${requestId}.${expiresText}`), signature)) return null;
  return { requestId, expiresAt };
}

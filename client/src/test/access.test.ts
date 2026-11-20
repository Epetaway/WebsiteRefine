import { describe, expect, it, vi } from "vitest";
import type { ServerResponse } from "node:http";
import {
  generatePassword,
  hashPassword,
  signDecision,
  signSession,
  verifyDecision,
  verifyPassword,
  verifySession,
} from "../../../server/access/crypto";
import { handleAccess, type AccessDeps, type AccessRequest } from "../../../server/access/handler";
import type { AccessRequestRow, AccessStore } from "../../../server/access/store";
import type { AccessMailer } from "../../../server/access/email";

const SECRET = "test-secret-that-is-at-least-32-characters-long";
const NOW = Date.UTC(2026, 10, 20, 15, 0, 0);

describe("access crypto", () => {
  it("generates readable 16-character passwords that don't repeat", () => {
    const a = generatePassword();
    expect(a).toMatch(/^[A-HJ-NP-Z2-9]{4}(-[A-HJ-NP-Z2-9]{4}){3}$/);
    expect(new Set(Array.from({ length: 50 }, generatePassword)).size).toBe(50);
  });

  it("verifies a hashed password, ignoring case and dashes, and rejects others", async () => {
    const hash = await hashPassword("K7MQ-3XPA-9RTV-HC2N");
    expect(hash).not.toContain("K7MQ");
    expect(await verifyPassword("k7mq 3xpa 9rtv hc2n", hash)).toBe(true);
    expect(await verifyPassword("K7MQ-3XPA-9RTV-HC2X", hash)).toBe(false);
  });

  it("accepts a decision link only with the right action, signature and an unexpired time", () => {
    const exp = NOW + 1000;
    const sig = signDecision(SECRET, "req-1", "approve", exp);
    expect(verifyDecision(SECRET, "req-1", "approve", exp, sig, NOW)).toBe(true);
    expect(verifyDecision(SECRET, "req-1", "deny", exp, sig, NOW)).toBe(false);
    expect(verifyDecision(SECRET, "req-2", "approve", exp, sig, NOW)).toBe(false);
    expect(verifyDecision(SECRET, "req-1", "approve", exp, sig, exp + 1)).toBe(false);
    expect(verifyDecision("another-secret-another-secret-123456", "req-1", "approve", exp, sig, NOW)).toBe(false);
  });

  it("rejects tampered and expired session tokens", () => {
    const token = signSession(SECRET, { requestId: "req-1", expiresAt: NOW + 1000 });
    expect(verifySession(SECRET, token, NOW)).toEqual({ requestId: "req-1", expiresAt: NOW + 1000 });
    expect(verifySession(SECRET, token.replace("req-1", "req-2"), NOW)).toBeNull();
    expect(verifySession(SECRET, token, NOW + 1001)).toBeNull();
    expect(verifySession(SECRET, "garbage", NOW)).toBeNull();
  });
});

// ---------------------------------------------------------------------------------------------
// Handler flow with an in-memory store and a fake mailer.

function memoryStore() {
  const rows: AccessRequestRow[] = [];
  const store: AccessStore = {
    async findOpenRequest(email, document) {
      return rows.find((r) => r.email === email && r.document === document && (r.status === "pending" || (r.status === "approved" && new Date(r.password_expires_at!).getTime() > NOW))) ?? null;
    },
    async countRequestsSince() { return rows.length; },
    async insertRequest(input) {
      const row: AccessRequestRow = { id: `req-${rows.length + 1}`, ...input, status: "pending", created_at: new Date(NOW).toISOString(), password_hash: null, password_expires_at: null, failed_logins: 0, locked_until: null };
      rows.push(row);
      return row;
    },
    async getRequest(id) { return rows.find((r) => r.id === id) ?? null; },
    async approve(id, passwordHash, expiresAt) {
      const row = rows.find((r) => r.id === id && r.status === "pending");
      if (!row) return null;
      Object.assign(row, { status: "approved", password_hash: passwordHash, password_expires_at: expiresAt.toISOString() });
      return row;
    },
    async deny(id) {
      const row = rows.find((r) => r.id === id && r.status === "pending");
      if (!row) return null;
      row.status = "denied";
      return row;
    },
    async findLoginCandidate(email, document) {
      return rows.find((r) => r.email === email && r.document === document && r.status === "approved" && new Date(r.password_expires_at!).getTime() > NOW) ?? null;
    },
    async recordFailedLogin(id, max, lockoutMs) {
      const row = rows.find((r) => r.id === id)!;
      row.failed_logins += 1;
      if (row.failed_logins >= max) row.locked_until = new Date(NOW + lockoutMs).toISOString();
    },
    async recordLogin(id) {
      const row = rows.find((r) => r.id === id)!;
      row.failed_logins = 0;
      row.locked_until = null;
    },
  };
  return { rows, store };
}

function deps() {
  const { rows, store } = memoryStore();
  const sent: { kind: string; to: string; password?: string }[] = [];
  const mailer: AccessMailer = {
    async sendOwnerRequest(r) { sent.push({ kind: "owner", to: r.email }); },
    async sendPassword(r, password) { sent.push({ kind: "password", to: r.email, password }); },
    async sendDenied(r) { sent.push({ kind: "denied", to: r.email }); },
  };
  const d: AccessDeps = {
    env: {
      databaseUrl: "unused",
      signingSecret: SECRET,
      sendgridApiKey: "unused",
      ownerEmail: "e@ehicksonjr.com",
      fromEmail: "e@ehicksonjr.com",
      apiBaseUrl: "https://api.ehicksonjr.com",
      siteUrl: "https://ehicksonjr.com",
      allowedOrigins: ["https://ehicksonjr.com"],
    },
    store,
    mailer,
    now: () => NOW,
  };
  return { d, rows, sent };
}

type Result = { status: number; headers: Record<string, string>; body: string };

async function call(d: AccessDeps, action: string, init: { method: string; body?: unknown; query?: Record<string, string>; headers?: Record<string, string> }): Promise<Result> {
  const headers: Record<string, string> = { origin: "https://ehicksonjr.com", ...(init.body && !init.headers?.["content-type"] ? { "content-type": "application/json" } : {}), ...init.headers };
  const req = { method: init.method, headers, body: init.body, query: init.query ?? {} } as unknown as AccessRequest;
  const out: Result = { status: 200, headers: {}, body: "" };
  const res = {
    set statusCode(value: number) { out.status = value; },
    get statusCode() { return out.status; },
    setHeader: vi.fn((key: string, value: string) => { out.headers[key.toLowerCase()] = value; }),
    end: vi.fn((chunk?: string) => { out.body = chunk ?? ""; }),
  } as unknown as ServerResponse;
  await handleAccess(req, res, action, d);
  return out;
}

const REQUEST = { document: "withyou-engineering", name: "Jordan Lee", email: "Jordan@Example.com", company: "Acme", reason: "Hiring for a UX engineer" };

describe("access flow", () => {
  it("runs request → approve → login → content end to end", async () => {
    const { d, rows, sent } = deps();

    const requested = await call(d, "request", { method: "POST", body: REQUEST });
    expect(requested.status).toBe(200);
    expect(rows[0]).toMatchObject({ email: "jordan@example.com", status: "pending" });
    expect(sent).toEqual([{ kind: "owner", to: "jordan@example.com" }]);

    // Unauthenticated content is refused.
    expect((await call(d, "content", { method: "GET", query: { document: "withyou-engineering" } })).status).toBe(401);

    const exp = NOW + 60_000;
    const link = { id: "req-1", action: "approve", exp: String(exp), sig: signDecision(SECRET, "req-1", "approve", exp) };
    // Opening the link only shows a confirmation page; it changes nothing.
    const confirm = await call(d, "decide", { method: "GET", query: link });
    expect(confirm.status).toBe(200);
    expect(confirm.body).toContain("Approve access");
    expect(rows[0].status).toBe("pending");

    const approved = await call(d, "decide", { method: "POST", body: link, headers: { origin: "null", "content-type": "application/x-www-form-urlencoded" } });
    expect(approved.status).toBe(200);
    expect(rows[0].status).toBe("approved");
    expect(new Date(rows[0].password_expires_at!).getTime()).toBe(NOW + 72 * 60 * 60 * 1000);
    const password = sent.find((m) => m.kind === "password")!.password!;

    // The link works once.
    expect((await call(d, "decide", { method: "POST", body: link })).status).toBe(409);

    const login = await call(d, "login", { method: "POST", body: { document: "withyou-engineering", email: "jordan@example.com", password } });
    expect(login.status).toBe(200);
    const cookie = login.headers["set-cookie"];
    expect(cookie).toMatch(/HttpOnly/);
    expect(cookie).toMatch(/Secure/);
    expect(cookie).toMatch(/SameSite=Lax/);
    expect(cookie).toMatch(/Max-Age=28800/);

    const content = await call(d, "content", { method: "GET", query: { document: "withyou-engineering" }, headers: { cookie: cookie.split(";")[0] } });
    expect(content.status).toBe(200);
    expect(JSON.parse(content.body).content.decisions.length).toBeGreaterThan(0);
    expect(content.headers["access-control-allow-origin"]).toBe("https://ehicksonjr.com");
  });

  it("gives the same reply for a repeat request and doesn't email Earl twice", async () => {
    const { d, sent } = deps();
    const first = await call(d, "request", { method: "POST", body: REQUEST });
    const second = await call(d, "request", { method: "POST", body: REQUEST });
    expect(second.body).toBe(first.body);
    expect(sent.filter((m) => m.kind === "owner")).toHaveLength(1);
  });

  it("drops honeypot submissions silently", async () => {
    const { d, rows, sent } = deps();
    const result = await call(d, "request", { method: "POST", body: { ...REQUEST, website: "x" } });
    expect(result.status).toBe(200);
    expect(rows).toHaveLength(0);
    expect(sent).toHaveLength(0);
  });

  it("locks sign-in after five wrong passwords", async () => {
    const { d } = deps();
    await call(d, "request", { method: "POST", body: REQUEST });
    const exp = NOW + 60_000;
    await call(d, "decide", { method: "POST", body: { id: "req-1", action: "approve", exp: String(exp), sig: signDecision(SECRET, "req-1", "approve", exp) } });
    const wrong = { document: "withyou-engineering", email: "jordan@example.com", password: "AAAA-AAAA-AAAA-AAAA" };
    for (let i = 0; i < 5; i++) expect((await call(d, "login", { method: "POST", body: wrong })).status).toBe(401);
    expect((await call(d, "login", { method: "POST", body: wrong })).status).toBe(429);
  });

  it("denies: emails the visitor and blocks sign-in", async () => {
    const { d, rows, sent } = deps();
    await call(d, "request", { method: "POST", body: REQUEST });
    const exp = NOW + 60_000;
    const result = await call(d, "decide", { method: "POST", body: { id: "req-1", action: "deny", exp: String(exp), sig: signDecision(SECRET, "req-1", "deny", exp) } });
    expect(result.status).toBe(200);
    expect(rows[0].status).toBe("denied");
    expect(sent.map((m) => m.kind)).toEqual(["owner", "denied"]);
  });

  it("rejects a forged decision link and other origins", async () => {
    const { d, rows } = deps();
    await call(d, "request", { method: "POST", body: REQUEST });
    const forged = await call(d, "decide", { method: "POST", body: { id: "req-1", action: "approve", exp: String(NOW + 60_000), sig: "forged" } });
    expect(forged.status).toBe(403);
    expect(rows[0].status).toBe("pending");
    expect((await call(d, "request", { method: "POST", body: REQUEST, headers: { origin: "https://evil.example" } })).status).toBe(403);
  });
});

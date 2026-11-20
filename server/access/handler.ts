// One HTTP handler for the whole gated-content flow, written against Node's own request and
// response types so the same code runs as a Vercel function (api/access/[action].ts) and inside
// the Express dev server (server/routes.ts).
//
//   POST /api/access/request   visitor asks for access          → email to Earl
//   GET  /api/access/decide    Earl opens approve/deny link     → confirmation page
//   POST /api/access/decide    Earl confirms                    → password or "no" email to visitor
//   POST /api/access/login     visitor signs in (email + pw)    → HttpOnly session cookie
//   GET  /api/access/content   signed-in visitor reads document → gated JSON
//   POST /api/access/logout    visitor signs out                → cookie cleared
//
// Decision links open a confirmation page instead of acting on GET, because mail scanners
// (Outlook Safe Links, Gmail previews) fetch links automatically and would otherwise approve them.
import type { IncomingMessage, ServerResponse } from "node:http";
import { z } from "zod";
import { ACCESS, GATED_DOCUMENTS, isGatedDocument, readAccessEnv, type AccessEnv, type GatedDocumentKey } from "./config.js";
import { generatePassword, hashPassword, signSession, verifyDecision, verifyPassword, verifySession } from "./crypto.js";
import { createMailer, escapeHtml, type AccessMailer } from "./email.js";
import { createStore, type AccessStore } from "./store.js";
import { withYouEngineeringLocked } from "./content.js";

export type AccessRequest = IncomingMessage & { body?: unknown; query?: Record<string, unknown> };

export type AccessDeps = { env: AccessEnv; store: AccessStore; mailer: AccessMailer; now?: () => number };

const LOCKED_CONTENT: Record<GatedDocumentKey, unknown> = {
  "withyou-engineering": withYouEngineeringLocked,
};

// A real scrypt hash of a random value, compared against when no account matches, so a wrong
// email takes as long as a wrong password.
const DUMMY_HASH = "scrypt$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

const requestSchema = z.object({
  document: z.string(),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().toLowerCase().email().max(254),
  company: z.string().trim().max(120).optional().transform((value) => value || null),
  reason: z.string().trim().max(1000).optional().transform((value) => value || null),
  // Honeypot: hidden from people, filled in by bots.
  website: z.string().max(200).optional(),
});

const loginSchema = z.object({
  document: z.string(),
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(64),
});

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function sendHtml(res: ServerResponse, status: number, title: string, bodyHtml: string) {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'");
  res.end(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>body{font:16px/1.6 system-ui,sans-serif;max-width:560px;margin:10vh auto;padding:0 20px;color:#1a1422}
h1{font-size:24px}dl{display:grid;grid-template-columns:auto 1fr;gap:6px 16px}dt{font-weight:600}
button{font:inherit;padding:10px 20px;border-radius:6px;border:1px solid #1a1422;background:#1a1422;color:#fff;cursor:pointer}
button.secondary{background:#fff;color:#1a1422}.muted{color:#5b5560;font-size:14px}</style></head>
<body>${bodyHtml}</body></html>`);
}

function readCookie(req: IncomingMessage, name: string): string | undefined {
  const header = req.headers.cookie;
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

function sessionCookie(env: AccessEnv, value: string, maxAgeSeconds: number) {
  const secure = env.apiBaseUrl.startsWith("https://") ? "; Secure" : "";
  return `${ACCESS.cookieName}=${encodeURIComponent(value)}; Path=/api/access; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure}`;
}

/** CORS for the public site. Returns false when the caller's origin isn't allowed. */
function applyCors(req: IncomingMessage, res: ServerResponse, env: AccessEnv): boolean {
  const origin = req.headers.origin;
  // No origin, or "null" (what browsers send for the decision form under Referrer-Policy:
  // no-referrer). No CORS headers are added, so other sites still can't read responses.
  if (!origin || origin === "null") return true;
  const ownOrigin = new URL(env.apiBaseUrl).origin;
  if (origin === ownOrigin) return true;
  if (!env.allowedOrigins.includes(origin)) return false;
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
  return true;
}

function queryValue(req: AccessRequest, key: string): string {
  const value = req.query?.[key];
  return typeof value === "string" ? value : Array.isArray(value) && typeof value[0] === "string" ? value[0] : "";
}

function bodyValue(req: AccessRequest, key: string): string {
  const body = req.body as Record<string, unknown> | undefined;
  const value = body?.[key];
  return typeof value === "string" ? value : "";
}

function isJson(req: IncomingMessage): boolean {
  return (req.headers["content-type"] ?? "").toLowerCase().startsWith("application/json");
}

const GENERIC_REQUEST_REPLY = { ok: true, message: "Request received. You'll get an email once it's reviewed." };
const GENERIC_LOGIN_ERROR = { error: "That email and password don't match an active approval." };

async function handleRequest(req: AccessRequest, res: ServerResponse, deps: AccessDeps) {
  if (req.method !== "POST" || !isJson(req)) return send(res, 405, { error: "Use a JSON POST." });
  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) return send(res, 400, { error: "Please check your name and email." });
  const input = parsed.data;
  if (!isGatedDocument(input.document)) return send(res, 400, { error: "Unknown document." });
  if (input.website) return send(res, 200, GENERIC_REQUEST_REPLY);

  // The same reply whether or not this email already has a request, so the form can't be used
  // to find out who has access.
  if (await deps.store.findOpenRequest(input.email, input.document)) return send(res, 200, GENERIC_REQUEST_REPLY);

  const now = deps.now?.() ?? Date.now();
  const recent = await deps.store.countRequestsSince(new Date(now - 24 * 60 * 60 * 1000));
  if (recent >= ACCESS.maxRequestsPerDay) {
    return send(res, 429, { error: "Too many requests today. Please email e@ehicksonjr.com instead." });
  }

  const row = await deps.store.insertRequest({
    document: input.document,
    name: input.name,
    email: input.email,
    company: input.company,
    reason: input.reason,
  });
  await deps.mailer.sendOwnerRequest(row);
  return send(res, 200, GENERIC_REQUEST_REPLY);
}

async function handleDecide(req: AccessRequest, res: ServerResponse, deps: AccessDeps) {
  const source = req.method === "POST" ? bodyValue : queryValue;
  const id = source(req, "id");
  const action = source(req, "action");
  const exp = Number(source(req, "exp"));
  const sig = source(req, "sig");
  const now = deps.now?.() ?? Date.now();

  if (!verifyDecision(deps.env.signingSecret, id, action, exp, sig, now)) {
    return sendHtml(res, 403, "Link not valid", "<h1>This link isn't valid.</h1><p>It may have expired or been changed. Open the latest request email instead.</p>");
  }
  const request = await deps.store.getRequest(id);
  if (!request) return sendHtml(res, 404, "Not found", "<h1>Request not found.</h1>");
  const doc = GATED_DOCUMENTS[request.document];

  if (request.status !== "pending") {
    return sendHtml(res, 409, "Already decided", `<h1>Already decided.</h1><p>This request is <strong>${escapeHtml(request.status)}</strong>. Nothing changed.</p>`);
  }

  if (req.method === "GET") {
    const verb = action === "approve" ? "Approve" : "Deny";
    return sendHtml(res, 200, `${verb} access`, `
      <h1>${verb} access to ${escapeHtml(doc.title)}?</h1>
      <dl><dt>Name</dt><dd>${escapeHtml(request.name)}</dd><dt>Email</dt><dd>${escapeHtml(request.email)}</dd>
      <dt>Company</dt><dd>${escapeHtml(request.company) || "—"}</dd><dt>Why</dt><dd>${escapeHtml(request.reason) || "—"}</dd></dl>
      <form method="post" action="${escapeHtml(deps.env.apiBaseUrl)}/api/access/decide">
        <input type="hidden" name="id" value="${escapeHtml(id)}"><input type="hidden" name="action" value="${escapeHtml(action)}">
        <input type="hidden" name="exp" value="${exp}"><input type="hidden" name="sig" value="${escapeHtml(sig)}">
        <button type="submit"${action === "deny" ? ' class="secondary"' : ""}>${verb}</button>
      </form>
      <p class="muted">${action === "approve" ? "A new password will be emailed to them. It expires in 72 hours." : "They'll get a short, polite email."}</p>`);
  }

  if (req.method !== "POST") return sendHtml(res, 405, "Not allowed", "<h1>Not allowed.</h1>");

  if (action === "approve") {
    const password = generatePassword();
    const expiresAt = new Date(now + ACCESS.passwordTtlMs);
    const approved = await deps.store.approve(id, await hashPassword(password), expiresAt);
    if (!approved) return sendHtml(res, 409, "Already decided", "<h1>Already decided.</h1><p>Nothing changed.</p>");
    await deps.mailer.sendPassword(approved, password, expiresAt);
    return sendHtml(res, 200, "Approved", `<h1>Approved.</h1><p>A password was sent to ${escapeHtml(approved.email)}. It expires in 72 hours.</p>`);
  }

  const denied = await deps.store.deny(id);
  if (!denied) return sendHtml(res, 409, "Already decided", "<h1>Already decided.</h1><p>Nothing changed.</p>");
  await deps.mailer.sendDenied(denied);
  return sendHtml(res, 200, "Denied", `<h1>Denied.</h1><p>${escapeHtml(denied.email)} was sent a short note.</p>`);
}

async function handleLogin(req: AccessRequest, res: ServerResponse, deps: AccessDeps) {
  if (req.method !== "POST" || !isJson(req)) return send(res, 405, { error: "Use a JSON POST." });
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success || !isGatedDocument(parsed.data.document)) return send(res, 401, GENERIC_LOGIN_ERROR);
  const { email, password, document } = parsed.data;
  const now = deps.now?.() ?? Date.now();

  const candidate = await deps.store.findLoginCandidate(email, document);
  if (!candidate?.password_hash) {
    await verifyPassword(password, DUMMY_HASH);
    return send(res, 401, GENERIC_LOGIN_ERROR);
  }
  if (candidate.locked_until && new Date(candidate.locked_until).getTime() > now) {
    return send(res, 429, { error: "Too many attempts. Try again in 15 minutes." });
  }
  if (!(await verifyPassword(password, candidate.password_hash))) {
    await deps.store.recordFailedLogin(candidate.id, ACCESS.maxFailedLogins, ACCESS.lockoutMs);
    return send(res, 401, GENERIC_LOGIN_ERROR);
  }

  await deps.store.recordLogin(candidate.id);
  const passwordExpiry = new Date(candidate.password_expires_at ?? now).getTime();
  const expiresAt = Math.min(now + ACCESS.sessionTtlMs, passwordExpiry);
  const token = signSession(deps.env.signingSecret, { requestId: candidate.id, expiresAt });
  res.setHeader("Set-Cookie", sessionCookie(deps.env, token, Math.max(0, Math.floor((expiresAt - now) / 1000))));
  return send(res, 200, { ok: true, expiresAt: new Date(expiresAt).toISOString() });
}

async function handleContent(req: AccessRequest, res: ServerResponse, deps: AccessDeps) {
  if (req.method !== "GET") return send(res, 405, { error: "Use GET." });
  const document = queryValue(req, "document");
  if (!isGatedDocument(document)) return send(res, 404, { error: "Unknown document." });
  const now = deps.now?.() ?? Date.now();
  const session = verifySession(deps.env.signingSecret, readCookie(req, ACCESS.cookieName), now);
  if (!session) return send(res, 401, { error: "Sign in to read this." });

  // Checked on every read, so expiring or revoking a request in the database ends access at once.
  const request = await deps.store.getRequest(session.requestId);
  const active = request?.status === "approved"
    && request.document === document
    && request.password_expires_at !== null
    && new Date(request.password_expires_at).getTime() > now;
  if (!active) return send(res, 401, { error: "Your access has ended. Request access again." });

  return send(res, 200, { document, expiresAt: new Date(session.expiresAt).toISOString(), content: LOCKED_CONTENT[document] });
}

function handleLogout(req: AccessRequest, res: ServerResponse, deps: AccessDeps) {
  if (req.method !== "POST") return send(res, 405, { error: "Use POST." });
  res.setHeader("Set-Cookie", sessionCookie(deps.env, "", 0));
  return send(res, 200, { ok: true });
}

export async function handleAccess(req: AccessRequest, res: ServerResponse, action: string, injected?: AccessDeps) {
  const env = injected?.env ?? readAccessEnv();
  if (!env) return send(res, 503, { error: "Access requests aren't set up yet. Please email e@ehicksonjr.com." });
  if (!applyCors(req, res, env)) return send(res, 403, { error: "Origin not allowed." });
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  const deps: AccessDeps = injected ?? { env, store: createStore(env.databaseUrl), mailer: createMailer(env) };
  try {
    switch (action) {
      case "request": return await handleRequest(req, res, deps);
      case "decide": return await handleDecide(req, res, deps);
      case "login": return await handleLogin(req, res, deps);
      case "content": return await handleContent(req, res, deps);
      case "logout": return handleLogout(req, res, deps);
      default: return send(res, 404, { error: "Not found." });
    }
  } catch (error) {
    // Log the error type only: request bodies hold names, emails and passwords.
    console.error(`[access] ${action} failed:`, error instanceof Error ? error.name : "error");
    return send(res, 500, { error: "Something went wrong. Please try again, or email e@ehicksonjr.com." });
  }
}

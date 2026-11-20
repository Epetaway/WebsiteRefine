// Settings for the gated-content flow. Everything secret comes from the environment; see
// docs/ACCESS-GATE.md for the full list and how to set each one.

export const ACCESS = {
  /** How long an approved visitor's generated password works. */
  passwordTtlMs: 72 * 60 * 60 * 1000,
  /** How long one sign-in lasts (never longer than the password itself). */
  sessionTtlMs: 8 * 60 * 60 * 1000,
  /** How long the approve/deny links in Earl's email work. */
  decisionLinkTtlMs: 7 * 24 * 60 * 60 * 1000,
  /** Wrong passwords allowed before a request is locked, and for how long. */
  maxFailedLogins: 5,
  lockoutMs: 15 * 60 * 1000,
  /** Spam limits: one open request per email, and a cap on new requests per day. */
  maxRequestsPerDay: 25,
  cookieName: "eh_access",
} as const;

/** Gated documents. The key is what the client asks for; the value names it in emails. */
export const GATED_DOCUMENTS = {
  "withyou-engineering": { title: "WithYou — Engineering notes", path: "/work/withyou/engineering" },
} as const;

export type GatedDocumentKey = keyof typeof GATED_DOCUMENTS;

export function isGatedDocument(value: unknown): value is GatedDocumentKey {
  return typeof value === "string" && Object.hasOwn(GATED_DOCUMENTS, value);
}

export type AccessEnv = {
  databaseUrl: string;
  signingSecret: string;
  sendgridApiKey: string;
  ownerEmail: string;
  fromEmail: string;
  /** Public base URL of this API, used to build the approve/deny links. */
  apiBaseUrl: string;
  /** Public site URL, used in the email sent to the visitor. */
  siteUrl: string;
  /** Origins allowed to call the API with credentials. */
  allowedOrigins: string[];
};

/** Reads the environment. Returns null when anything required is missing, so the API can say
 *  "not configured" instead of failing halfway through a request. */
export function readAccessEnv(env: NodeJS.ProcessEnv = process.env): AccessEnv | null {
  const databaseUrl = env.DATABASE_URL;
  const signingSecret = env.ACCESS_SIGNING_SECRET;
  const sendgridApiKey = env.SENDGRID_API_KEY;
  const apiBaseUrl = env.ACCESS_API_BASE_URL;
  if (!databaseUrl || !signingSecret || signingSecret.length < 32 || !sendgridApiKey || !apiBaseUrl) return null;
  const siteUrl = env.ACCESS_SITE_URL ?? "https://ehicksonjr.com";
  return {
    databaseUrl,
    signingSecret,
    sendgridApiKey,
    ownerEmail: env.ACCESS_OWNER_EMAIL ?? "e@ehicksonjr.com",
    fromEmail: env.ACCESS_FROM_EMAIL ?? "e@ehicksonjr.com",
    apiBaseUrl: apiBaseUrl.replace(/\/$/, ""),
    siteUrl: siteUrl.replace(/\/$/, ""),
    allowedOrigins: (env.ACCESS_ALLOWED_ORIGINS ?? siteUrl).split(",").map((origin) => origin.trim()).filter(Boolean),
  };
}

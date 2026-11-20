// Access requests in Postgres (Neon). The table is defined in shared/schema.ts (accessRequests)
// so `npm run db:push` creates it. Plain parameterized SQL keeps this file free of path aliases,
// which the Vercel function bundler doesn't resolve.
import { neon } from "@neondatabase/serverless";
import type { GatedDocumentKey } from "./config.js";

export type AccessStatus = "pending" | "approved" | "denied" | "revoked";

export type AccessRequestRow = {
  id: string;
  document: GatedDocumentKey;
  name: string;
  email: string;
  company: string | null;
  reason: string | null;
  status: AccessStatus;
  created_at: string;
  password_hash: string | null;
  password_expires_at: string | null;
  failed_logins: number;
  locked_until: string | null;
};

export type NewAccessRequest = {
  document: GatedDocumentKey;
  name: string;
  email: string;
  company: string | null;
  reason: string | null;
};

export function createStore(databaseUrl: string) {
  const sql = neon(databaseUrl);

  return {
    /** An open request (pending, or approved and unexpired) for this email and document. */
    async findOpenRequest(email: string, document: GatedDocumentKey): Promise<AccessRequestRow | null> {
      const rows = (await sql`
        select * from access_requests
        where email = ${email} and document = ${document}
          and (status = 'pending' or (status = 'approved' and password_expires_at > now()))
        order by created_at desc limit 1`) as AccessRequestRow[];
      return rows[0] ?? null;
    },

    async countRequestsSince(since: Date): Promise<number> {
      const rows = (await sql`select count(*)::int as count from access_requests where created_at > ${since.toISOString()}`) as { count: number }[];
      return rows[0]?.count ?? 0;
    },

    async insertRequest(input: NewAccessRequest): Promise<AccessRequestRow> {
      const rows = (await sql`
        insert into access_requests (document, name, email, company, reason, status)
        values (${input.document}, ${input.name}, ${input.email}, ${input.company}, ${input.reason}, 'pending')
        returning *`) as AccessRequestRow[];
      return rows[0];
    },

    async getRequest(id: string): Promise<AccessRequestRow | null> {
      const rows = (await sql`select * from access_requests where id = ${id} limit 1`) as AccessRequestRow[];
      return rows[0] ?? null;
    },

    /** Approves only a request that is still pending, so a decision link works once. */
    async approve(id: string, passwordHash: string, expiresAt: Date): Promise<AccessRequestRow | null> {
      const rows = (await sql`
        update access_requests
        set status = 'approved', decided_at = now(), password_hash = ${passwordHash},
            password_expires_at = ${expiresAt.toISOString()}, failed_logins = 0, locked_until = null
        where id = ${id} and status = 'pending'
        returning *`) as AccessRequestRow[];
      return rows[0] ?? null;
    },

    async deny(id: string): Promise<AccessRequestRow | null> {
      const rows = (await sql`
        update access_requests set status = 'denied', decided_at = now()
        where id = ${id} and status = 'pending'
        returning *`) as AccessRequestRow[];
      return rows[0] ?? null;
    },

    /** The approved, unexpired request a visitor can sign in with. */
    async findLoginCandidate(email: string, document: GatedDocumentKey): Promise<AccessRequestRow | null> {
      const rows = (await sql`
        select * from access_requests
        where email = ${email} and document = ${document} and status = 'approved'
          and password_expires_at > now()
        order by decided_at desc limit 1`) as AccessRequestRow[];
      return rows[0] ?? null;
    },

    async recordFailedLogin(id: string, maxFailed: number, lockoutMs: number): Promise<void> {
      await sql`
        update access_requests
        set failed_logins = failed_logins + 1,
            locked_until = case when failed_logins + 1 >= ${maxFailed}
              then now() + (${lockoutMs} * interval '1 millisecond') else locked_until end
        where id = ${id}`;
    },

    async recordLogin(id: string): Promise<void> {
      await sql`update access_requests set failed_logins = 0, locked_until = null, last_login_at = now() where id = ${id}`;
    },
  };
}

export type AccessStore = ReturnType<typeof createStore>;

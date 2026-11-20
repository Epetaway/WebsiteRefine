# Gated notes: approved access

Some pages (today: `/work/withyou/engineering`) have a public overview and a locked section that only approved visitors can read.

## How it works

1. A visitor fills in **Request access** (name, work email, optional company and reason).
2. The API stores the request and emails **e@ehicksonjr.com** with **Approve** and **Deny** links.
3. Each link opens a confirmation page. Nothing changes until Earl presses the button, so mail scanners that open links automatically can't approve anything. Links work once and expire after 7 days.
4. **Approve:** the API generates a random password (16 characters, about 79 bits), stores only its scrypt hash, and emails the password to the visitor. **The password expires after 72 hours.**
   **Deny:** the visitor gets a short, polite email.
5. The visitor signs in with their email and password. The API sets an HttpOnly, Secure, SameSite=Lax cookie that lasts **8 hours** (never past the password's expiry).
6. The page fetches the locked content from the API. The API re-checks the request on every read, so expiry and revocation take effect immediately.

The locked content lives only in `server/access/content.ts`. It is not in the client bundle or in the prerendered HTML.

**Safeguards:** generic error messages (the forms don't reveal who has access), 5 wrong passwords lock sign-in for 15 minutes, a honeypot field, one open request per email, at most 25 new requests per day, CORS limited to the site, and logs that record error types only, never names, emails or passwords.

## Where it runs

| Piece | Where |
|---|---|
| Site, including the public overview | GitHub Pages (unchanged) |
| API: `/api/access/{request,decide,login,content,logout}` | Vercel function `api/access/[action].ts` at **api.ehicksonjr.com** |
| Storage | Neon Postgres, table `access_requests` |
| Email | SendGrid, sending from e@ehicksonjr.com |
| Local development | The same handler is mounted on the Express dev server |

## One-time setup

1. **Database.** Create a Neon Postgres database (the free tier is enough). Then run:
   ```bash
   DATABASE_URL=... npm run db:push
   ```
   This creates `access_requests`, which is defined in `shared/schema.ts`.
2. **Vercel environment variables** (Production):
   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | Neon connection string |
   | `SENDGRID_API_KEY` | SendGrid key with Mail Send permission |
   | `ACCESS_SIGNING_SECRET` | 32+ random characters, e.g. `openssl rand -base64 48` |
   | `ACCESS_API_BASE_URL` | `https://api.ehicksonjr.com` |
   | `ACCESS_ALLOWED_ORIGINS` | `https://ehicksonjr.com,https://www.ehicksonjr.com` |
   | `ACCESS_SITE_URL` | `https://ehicksonjr.com` (optional; this is the default) |
   | `ACCESS_OWNER_EMAIL` | `e@ehicksonjr.com` (optional; this is the default) |
3. **Domain.** In Vercel, add `api.ehicksonjr.com` to the project. At your DNS provider, add the CNAME record Vercel shows. `ehicksonjr.com` itself stays on GitHub Pages.
4. **SendGrid.** e@ehicksonjr.com must be a verified sender. The contact form already relies on this, so it's probably done; check before going live.
5. **GitHub Pages build.** In the repository settings, add an Actions **variable** (not a secret) named `VITE_ACCESS_API_URL` with the value `https://api.ehicksonjr.com`. `pages.yml` passes it into the build.

Until step 5 is done, the page shows the public overview and an "Email Earl" fallback instead of the forms.

## Day to day

- **Revoke someone early:** `update access_requests set status = 'revoked' where email = '...';` Their next page load is refused.
- **See who has access:** `select name, email, company, status, password_expires_at, last_login_at from access_requests order by created_at desc;`
- **Change the time limits:** `server/access/config.ts` (`passwordTtlMs`, `sessionTtlMs`, `decisionLinkTtlMs`).
- **Gate another page:** add its content to `server/access/content.ts`, add a key to `GATED_DOCUMENTS` in `config.ts`, and wrap that page's locked part in `<AccessGate document="...">`.

## Privacy note

Requests store a name, email, company and reason. That data is used only to decide on access and send the password. Delete old rows when they're no longer needed, e.g. `delete from access_requests where created_at < now() - interval '180 days';`

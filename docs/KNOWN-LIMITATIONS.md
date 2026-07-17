# Known Limitations

Updated: 2026-07-16

## Professional record

- AMA Fight Club's end month/year is unconfirmed; the public record uses the
  conservative `Jan 2025 - 2025` range.
- Current flagger employer, title, start date, and resume-publication choice are
  unconfirmed and unpublished.
- Several legacy-only employers are withheld pending primary evidence.

## Investigations and research

- The independent investigations are not peer-reviewed research and do not prove
  relationship, learning, or decision-quality outcomes.
- Proposed interviews, usability tests, diary studies, observations, and
  experiments have not been conducted.
- WithYou retains a documented legacy privacy inconsistency and screens that are
  implemented but not integrated.
- DojoNet's instructor workflow is not represented as implemented.
- Gundam Forge's competitive restriction coverage and public product hosting are
  not verified.
- Martial arts academy and teaching dates are not published as a formal entry.

## Platform and operations

- The external Vercel Git integration must be disconnected in its dashboard to
  fully stop duplicate deployments; repository-triggered Vercel deployment has
  been removed.
- The public Contact page uses direct email and has no delivery service to
  verify. The retained, currently unused server endpoint still depends on
  SendGrid configuration; its rate limiting is per server/function instance.
- The application is a client-rendered React experience; static per-route shells
  cover metadata, not full server-rendered page content.
- Google Analytics depends on its deployment environment variable.
- `npm audit --omit=dev` reports zero production vulnerabilities. The full audit
  reports four moderate development-tool findings in the legacy `drizzle-kit`
  dependency chain; the suggested automatic resolution is a breaking downgrade,
  so it was not applied during this release.
- Archived HCEPS files remain in the repository for visual comparison. The build
  removes them and the standalone prototype exports from production output; their
  superseded copy exists only as source history.

## Accessibility and QA

- Accessibility practices are applied, but no formal conformance or independent
  assistive-technology audit exists.
- Generated PDFs are selectable and ATS-oriented but are not tagged PDFs.
- Physical-device screen-reader testing, network throttling, and independent
  admissions/recruiter review remain external checks. Serverless email delivery
  only becomes a release check if that endpoint is reintroduced into the UI.

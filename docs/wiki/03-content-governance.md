# 3. Content governance

[← Architecture](02-architecture.md) · Next: [Key decisions →](04-decisions.md)

## Why the build checks the words

Portfolio copy drifts. A phrase like "production-ready" or "WCAG compliant" slips in during a rewrite, and nobody notices until an interviewer asks. On this site that kind of claim fails the build.

`scripts/validate-content.ts` runs twice: on the source (`validate:content`) and on the built output (`validate:built`). It fails if:

- **Retired claims come back.** For example: "10+ years," "rules-accurate simulator," "zero backend," "verified WCAG AA," and old test counts that no longer matched the code.
- **The public title doesn't match the résumé.** It must be "Lead Front-End Engineer."
- **An employment entry isn't safe to publish,** or uses "Present" without a confirmed current role.
- **A case study isn't using its governed status,** or has no proposed evaluation method.
- **The Earl the Kaiju case study claims a launch, bookings, certification, WCAG compliance, enrolment numbers or revenue growth.** The product is in development, so none of those can be true yet.
- **A figure is missing alt text, a caption or a source.**
- **A code excerpt links anywhere but the commit it cites.**

## The claim audit

In July 2026 I audited every public claim against the repositories and my records ([`docs/CLAIM-AUDIT.md`](../CLAIM-AUDIT.md)). Every claim was classified as one of four kinds:
- verified fact
- implementation evidence
- design rationale
- known gap or planned work

Some changes that came out of it:

| Before | After |
|---|---|
| "3 Shipped Products" | Three product investigations at different stages |
| "Production-Ready" | Beta or development-stage status |
| "WCAG compliant" | Accessibility practices; no claim of formal conformance |
| Year-count summary claims | Removed, so they don't imply continuous engineering employment |

## Evidence records

Each case study has a record in `docs/` (for example [`GUNDAM-FORGE-CASE-STUDY.md`](../GUNDAM-FORGE-CASE-STUDY.md)). It lists every claim on the page, its source (a file and lines, a commit, or a capture) and its state.

When Gundam-Forge's history was rewritten in Nov 2026 to remove committed card art, every cited commit hash changed. The record and the excerpt links were updated to the new hashes, so the evidence still resolves.

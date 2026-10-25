# Facts Requiring Confirmation

Audit date: 2026-07-17

The production data model publishes only `verified` facts. Values marked `requires-confirmation`, `private`, or `exclude` are rejected by `client/src/data/professional/validation.ts` and `scripts/validate-content.ts` or are deliberately absent from the public data set.

| Fact | Current evidence | Status | Current publication decision | Confirmation needed |
| --- | --- | --- | --- | --- |
| AMA Fight Club end date | Start month/year and work scope are supported; exact end month is absent | Requires confirmation | Publish conservatively as `Jan 2025 — 2025`; never use `Present` | Exact end month/year and whether the role should still be current |
| Current flagger employer | No verified supplied record | Requires confirmation | Omit from public résumé and website | Legal employer name |
| Official flagger title | No verified supplied record | Requires confirmation | Omit | Exact payroll/title wording |
| Flagger start date | No verified supplied record | Requires confirmation | Omit | Start month/year |
| Flagger placement | No publication decision supplied | Requires confirmation | Omit from both PDFs | Public résumé, graduate CV only, both, or neither |
| Canonical LinkedIn URL | Existing public records consistently use `https://linkedin.com/in/earlhicksonjr` | Verified for link routing; profile contents not audited | Publish URL | Earl should confirm the live profile remains controlled and current |
| Tabby’s Place role/date | Historical source fragment without sufficient corroboration | Requires confirmation | Omit | Employer, exact role, month/year, employment type |
| Prosek Partners role/date | Historical source fragment without sufficient corroboration | Requires confirmation | Omit | Employer, exact role, month/year, employment type |
| William R. Seide Agency role/date | Historical source fragment without sufficient corroboration | Requires confirmation | Omit | Employer, exact role, month/year, employment type |
| Merkle role/date | Historical source fragment without sufficient corroboration | Requires confirmation | Omit | Employer, exact role, month/year, employment type |
| Second Melody role/date | Historical source fragment without sufficient corroboration | Requires confirmation | Omit | Employer, exact role, month/year, employment type |
| Earlier KBS&P work | Conflicting/partial records; internship status unclear | Requires confirmation | Omit | Legal employer spelling, separate engagements, roles, exact dates, internship/contract status |
| Merck month-level dates | Year 2019 is supported; months are not | Requires confirmation | Publish `2019` only | Start/end month and contract type |
| Verizon Wireless month-level dates | Years 2015–2016 are supported; months are not | Requires confirmation | Publish `2015 — 2016` only | Start/end month |
| Martial-arts academy, formal title, and teaching dates | Teaching practice is supported; organizational/title/date details are not | Requires confirmation | Publish practice and evidence boundary only | Academy, formal title, date range, and permission to publish |
| Numerical professional outcome metrics | No source/method/permission package supplied | Exclude | Remove and block | Source record, measurement method, date, contribution, and permission for each metric |
| Public test-count claims | Repository test totals are mutable and are not product outcomes | Exclude from portfolio claims | Report only in dated QA documentation | Only publish externally if a durable release record makes the number meaningful |
| Product deployment claims | Configuration exists, but public URLs for the independent products are not all verified | Requires confirmation | Use `development-stage`, `deployable`, or `not verified publicly` | Verified production URL, owner, release date, and current availability |
| Earl the Kaiju coaching-site URL | `docs/LAUNCH.md` in the website repo: not deployed, no domain | Requires confirmation | `coachingSite.liveUrl = null`; no "Visit" link is rendered | The live https URL and launch date |
| Earl the Kaiju AI-assistance wording | Proofs, PR descriptions and app logs show AI-assisted production under Earl's direction | Requires confirmation | Disclosed on the page in Earl's voice | Earl's approval of the exact wording |
| Earl the Kaiju concept-board provenance | Approval proof 3 calls it an AI render | Requires confirmation | Captioned "made to my direction with AI image tools" and labeled SOURCE REFERENCE | Earl's confirmation |
| Earl the Kaiju test counts | Dated project logs and CI run 40146198369 | Verified with date and source | Published only with their date and source | — |

## Confirmation workflow

1. Earl supplies a source record or written confirmation.
2. The fact receives a `verified` status in the canonical professional source.
3. Employment chronology is updated in one place.
4. `npm run content:export` regenerates `resume/content.json`.
5. Both PDFs are regenerated and validated.
6. `npm run qa` confirms no stale value survives.

No unresolved item should be “fixed” by guessing a month, merging contracts, or using `Present`.

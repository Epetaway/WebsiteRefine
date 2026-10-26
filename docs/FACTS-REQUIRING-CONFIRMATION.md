# Facts Requiring Confirmation

Audit date: 2026-07-17; résumé reconciliation 2026-10-25

The production data model publishes only `verified` facts. Values marked `requires-confirmation`, `private`, or `exclude` are rejected by `client/src/data/professional/validation.ts` and `scripts/validate-content.ts` or are deliberately absent from the public data set.

| Fact | Current evidence | Status | Current publication decision | Confirmation needed |
| --- | --- | --- | --- | --- |
| AMA Fight Club end date | Résumé dated 2026-10-24 lists the role as current | Verified | Publish `Jan 2025 — Present` | — |
| Current flagger employer | No verified supplied record | Requires confirmation | Omit from public résumé and website | Legal employer name |
| Official flagger title | No verified supplied record | Requires confirmation | Omit | Exact payroll/title wording |
| Flagger start date | No verified supplied record | Requires confirmation | Omit | Start month/year |
| Flagger placement | No publication decision supplied | Requires confirmation | Omit from both PDFs | Public résumé, graduate CV only, both, or neither |
| Canonical LinkedIn URL | Earl confirmed `https://www.linkedin.com/in/earlhicksonjr` on 2026-10-25 | Verified | Publish URL | Fix the résumé, which prints `linkedin.com/in/earl-hickson-jr` |
| Tabby’s Place role/date | Résumé dated 2026-10-24 | Verified | Publish: Front-End Developer, Contract, Oct 2025 | — |
| Prosek Partners role/date | Résumé dated 2026-10-24 | Verified | Publish: Front-End Developer, Contract, Apr — Sep 2021 | — |
| William R. Seide Agency role/date | Résumé dated 2026-10-24 | Verified | Publish: Front-End Developer, Contract, Jan — Jun 2020 | — |
| Merkle role/date | Résumé dated 2026-10-24 | Verified | Publish: Email Marketing Specialist, Contract, Nov 2018 — Jul 2019 | — |
| Second Melody role/date | Résumé dated 2026-10-24 gives one combined line | Partly verified | Publish only the résumé's "Earlier" line (2013–2017) | Separate title and dates, if ever needed |
| Earlier KBS&P work | Résumé dated 2026-10-24 gives one combined line | Partly verified | Publish only the résumé's "Earlier" line (2013–2017) | Separate engagements, titles, and internship status, if ever needed |
| Merck entry | Not on the 2026-10-24 résumé | Exclude | Removed from the site and both PDFs; blocked by validators | — |
| Verizon Wireless entry | Not on the 2026-10-24 résumé | Exclude | Removed from the site and both PDFs; blocked by validators | — |
| Martial-arts academy, formal title, and teaching dates | Résumé dated 2026-10-24: AMA Fight Club (Professor, 2025 — Present), Colton Brown Training Center (Instructor, 2023 — 2024), Pure MMA (Instructor, 2021 — 2022) | Verified | Publish | — |
| Numerical professional outcome metrics | Earl confirmed the BroadcastMed 18% lead-form and 25% email-production figures during the 2026 résumé rebuild; both are on the 2026-10-24 résumé | Verified for those two only | Publish those two; every other metric stays excluded | Source package for any new metric |
| Public test-count claims | Repository test totals are mutable and are not product outcomes | Exclude from portfolio claims, with one exception | The résumé's "27 Vitest test files" for Gundam Forge appears on the Resume page and PDF; counted in the local repository on 2026-10-25 | Recount before each résumé update |
| Product deployment claims | Checked 2026-10-25 in a browser: the DojoNet demo at `epetaway.github.io/DojoNet-Prototype-MAX/` loads; `epetaway.github.io/Gundam-Forge/` returns GitHub Pages' 404 | Partly verified | The Resume page and PDF link the DojoNet demo only; Gundam Forge shows `Beta` with no link | Restore the Gundam Forge Pages site, then link it and use "Public beta" |
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

No unresolved item should be “fixed” by guessing a month or merging contracts. `Present` is allowed only for roles listed in `confirmedCurrentRoles` (`client/src/data/professional/validation.ts`).

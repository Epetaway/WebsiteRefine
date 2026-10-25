# Claim Audit

Audit date: 2026-07-17

## Classification standard

- **Verified fact:** confirmed by repository evidence or supplied professional records.
- **Implementation evidence:** demonstrable working behavior, not proof of public deployment or user outcomes.
- **Design rationale/reflection:** Earl's stated reasoning.
- **Known gap/planned/open question:** explicitly incomplete or untested.

## Canonical corrections

| Existing/public claim | Decision |
| --- | --- |
| `3 Shipped Products` | Replace with three independent product investigations at different implementation stages. |
| `Production-Ready` | Replace with beta-oriented, active-development, or development-stage status. |
| Gundam Forge `rules-accurate simulator` / `zero backend` | Replace with functional playtesting, heuristic opponent behavior, and deployment-dependent Supabase paths. |
| `WCAG compliant`, `100% WCAG`, or formal AA guarantees | Replace with accessibility practices/considerations; formal conformance has not been independently verified. |
| `6+ years` / `10+ years` summary claims | Remove from canonical positioning to avoid implying continuous engineering employment. |
| Deployment configuration as a live product | Label as deployable or development-stage unless a public URL is verified. |
| Type/data support as enforced behavior | Label as designed but not enforced where applicable. |

## Investigation results

- **WithYou (rebuilt as a bespoke page 2026-10-25):** beta-oriented mobile/backend work, not released. Pairing is an invite code plus an accept-or-decline step (relationship-space rebuild, Oct 2026). The legacy unconditional partner-profile path was closed on Oct 12, 2026 (SPK-H, #186, nine regression tests); legacy visibility is still per account rather than per relationship space. Primary button labels measure 2.78:1 (known gap). Device evidence for the rebuilt flows is Android-only. The couple photography is a labeled placeholder library; three marketing-kit issues are shown as found. AI-assisted development is disclosed. Full matrix: `docs/WITHYOU-CASE-STUDY.md`.
- **DojoNet:** active development. The portfolio prototype demonstrates qualitative progression and reflection; it does not claim instructor workflows or validated learning outcomes.
- **Gundam Forge:** functional beta-oriented implementation. The automated opponent is heuristic, not generative AI. Competitive restriction coverage and verified production hosting remain incomplete.

- **Earl the Kaiju (added 2026-10-24):** brand identity approved (v1.2–v1.5, dated approval record); instructor website built and tested on a local build, **not deployed**, no domain; Kaiju Coach Sprint 01 MVP tested in CI and on Earl's phone, **not yet used in a real class**. Desktop sync and website-to-app inquiries are designed/planned only; the media library is a labeled concept. The raster concept board is a source reference, not approved art. AI-assisted production is disclosed on the page. No inquiries, students, conversions or revenue are claimed. Full matrix: `docs/EARL-THE-KAIJU-CASE-STUDY.md`.

## Professional content

- Use `UX Engineer` as the one public title.
- AMA Fight Club is shown conservatively as `Jan 2025 - 2025` until its end month is confirmed.
- The current non-technology employer, official title, and exact start date are not published because they are unconfirmed.
- Independent investigation outcomes are not presented as peer-reviewed research or measured user outcomes.

## Automated enforcement

- The exact `ClaimType` union lives in `client/src/data/professional/types.ts`.
- Project implementation statements carry claim types in `client/src/data/investigations.ts`.
- `scripts/validate-content.ts` scans both source and built output for banned metrics, conflicting identity language, unsafe status claims, stale route architecture, and unverified `Present` language. For Earl the Kaiju it also blocks launch/booking/certification/outcome language, rejects a coaching-site link that isn't a verified https URL, keeps the concept board labeled as a source reference, and keeps private-repository code excerpts short and unlinked.
- `client/src/test/content-governance.test.ts` prevents unsupported claims and non-canonical career sources from re-entering routed content.
- `scripts/validate_pdfs.py` applies the same banned-claim boundary to both generated PDFs.

## Publication-safe replacements

| Removed formulation | Published formulation |
| --- | --- |
| Three shipped/production-ready products | Three independent product investigations at different implementation stages |
| Years-of-experience totals | Specific verified roles and date ranges |
| Numeric efficiency or conversion improvements | Qualitative responsibility and implementation evidence |
| Rules-accurate AI simulator | Functional playtesting with heuristic opponent behavior |
| WCAG compliant | Accessibility-focused implementation / accessibility practices applied |
| Research study or experiment | Independent HCI investigation / proposed research |
| Mutual approval after invite code | Deliberate participation in invite-code pairing |

The build currently passes source and built-output claim validation.

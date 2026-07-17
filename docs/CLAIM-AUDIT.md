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

- **WithYou:** beta-oriented mobile/backend work. Invite-code pairing is deliberate participation, not a separate post-code approval. Field-level visibility exists alongside a legacy unconditional path. Some screens are implemented but not integrated.
- **DojoNet:** active development. The portfolio prototype demonstrates qualitative progression and reflection; it does not claim instructor workflows or validated learning outcomes.
- **Gundam Forge:** functional beta-oriented implementation. The automated opponent is heuristic, not generative AI. Competitive restriction coverage and verified production hosting remain incomplete.

## Professional content

- Use `UX Engineer` as the one public title.
- AMA Fight Club is shown conservatively as `Jan 2025 - 2025` until its end month is confirmed.
- The current non-technology employer, official title, and exact start date are not published because they are unconfirmed.
- Independent investigation outcomes are not presented as peer-reviewed research or measured user outcomes.

## Automated enforcement

- The exact `ClaimType` union lives in `client/src/data/professional/types.ts`.
- Project implementation statements carry claim types in `client/src/data/investigations.ts`.
- `scripts/validate-content.ts` scans both source and built output for banned metrics, conflicting identity language, unsafe status claims, stale route architecture, and unverified `Present` language.
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

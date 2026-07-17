# Claim Audit

Audit date: 2026-07-16

## Classification standard

- **Verified fact:** confirmed by repository evidence or supplied professional records.
- **Implementation evidence:** demonstrable working behavior, not proof of public deployment or user outcomes.
- **Design rationale/reflection:** Earl's stated reasoning.
- **Known gap/planned/open question:** explicitly incomplete or untested.
- **Proposed research:** a future evaluation method, never represented as completed work.
- **Conceptual editorial illustration:** visual framing, not implementation evidence.
- **Implementation capture:** a development screenshot, not proof of public deployment or human outcome.

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

## Enforcement

- Canonical application routes import `client/src/data/investigations.ts` and
  `professionalFacts.json`.
- Archived `.dc.html` documents are excluded from the React runtime, disallowed
  in `robots.txt`, and served with `X-Robots-Tag: noindex, nofollow` on Netlify.
- Route behavior tests assert that canonical paths do not render iframes.
- `docs/METRIC-EVIDENCE.md` is the allow/deny record for numerical claims.
- Generated documents fail validation when required text, metadata, filenames,
  or page-count limits change.

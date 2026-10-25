# Earl the Kaiju — case study record

Route: `/work/earl-the-kaiju` · Content: `client/src/data/earlTheKaiju.ts` · Page: `client/src/pages/earl-the-kaiju.tsx` · Assets: `docs/EARL-THE-KAIJU-ASSETS.md`

Audit date: 2026-10-24.

## Scope

One new flagship case study. Home and Work list the case studies in Earl's order — **01 WithYou, 02 Earl the Kaiju, 03 Gundam Forge, 04 DojoNet** — and each number matches its position (DojoNet moved from 02 to 04 at Earl's request, 2026-10-25). The three existing investigations keep their content, pages, prototypes and assets. Shared code changed only where the new entry needed it:

| File | Change |
|---|---|
| `client/src/data/work.ts` (new) | The display order (`displayOrder`) for cards and next-navigation. |
| `client/src/data/investigations.ts` | Array order WithYou, Gundam Forge, DojoNet; DojoNet's number is 04. No content changed. |
| `netlify/functions/server.js` → `server.cjs` | Netlify's build refused a CommonJS function under `"type": "module"`; this had failed every deploy preview since PR #23. |
| `client/src/pages/home.tsx`, `work.tsx` | Read `workEntries` instead of `investigations`; same card markup. Work page counts say four projects. Home's "Beyond the screen" section gains one link. |
| `client/src/pages/investigation.tsx` | Prototype choice is an explicit typed map (no silent Gundam Forge fallback). "Next case study" follows the shared order: WithYou → Earl the Kaiju → Gundam Forge → DojoNet → WithYou. |
| `client/src/pages/about.tsx` | One sentence and one link in the teaching section. |
| `client/src/App.tsx` | The route, plus legacy destinations. |
| `client/src/redesign.css` | One rule for the About links row. |

The old Earl d. Kaiju microsite stays archived. Its addresses now lead to the case study.

## Source evidence matrix

| Claim on the page | Source | State |
|---|---|---|
| Brand identity final Oct 18, 2026 (v1.2); patterns and kit Oct 19 (v1.4); horizontal logos Oct 19 (v1.5) | Brand package v1.5 `09-approval-record/decisions.md` | Verified |
| 949 files in the package | Package `README.md` / `MANIFEST.txt` (948 listed + manifest) | Verified |
| Tagline "Gain Perspective Over Fear." and its full-stop rule | `decisions.md`; guidelines p.20 | Verified (settings proposed) |
| "The panther is Earl" idea, audiences tension, symbol map | Guidelines v1.5 pp.4, 20 | Earl-approved design rationale |
| Frame bowed up to 6 units; two crests found; real-size minimums | Proof 2; `08-reports/crest-geometry-audit.md` | Verified |
| Board emerald 2.4:1 on Shadow; #0B7A62 chosen (3.65:1 graphics, 4.68:1 ivory label) | Proof 3; `08-reports/contrast-table.md` | Verified |
| Concept board is an AI-assisted raster render | Proof 3 ("the AI render adds shine"); package README ("Earl's original raster artwork… reference only") | **Earl to confirm wording** |
| H and KAIJU spacing fixes; I–J 92 → 69 units; 3,858 points checked | Proof 4; guidelines p.10 | Verified |
| Size rules tested / measured / estimated | Package README; guidelines p.12 | Verified |
| Website: Next.js 16 static export, React 19, Tailwind 4, one Worker, D1, Turnstile, Resend | `Epetaway/EarltheKaiju` README, `package.json`, `wrangler.jsonc` @ 77657a8 | Verified (repo) |
| Website not deployed; no domain | `docs/LAUNCH.md` ("Nothing here has been done yet"); empty `NEXT_PUBLIC_SITE_URL`; placeholder D1 id | Verified |
| Interest-first rules enforced by tests | `tests/e2e/content-guard.spec.ts`; README project rules | Verified (repo) |
| Pipeline order and limits (20 KB, 3 s, 3/hour, 10/day) | `worker/routes/inquiry.ts`, `wrangler.jsonc` | Verified (code) |
| 14 schema tests, 16 Worker tests (session 1); 31 unit+Worker, 46 E2E (session 3) | `docs/case-study-log.md`, Oct 19, 2026 | Dated log record |
| Lighthouse table | `docs/case-study-log.md` session 3 (local, phone emulation, pre-launch) | Dated lab record |
| Bugs found by Lighthouse, axe, no-JS and flake tests | `docs/case-study-log.md` | Dated log record |
| Home and Meet Earl redesigned to Earl's mockups; inner pages in open PR #11 | PRs #10 (merged) and #11 (open) | Verified (GitHub) |
| Kaiju Coach stack and ADRs | `Epetaway/earltheKaiju_app` `docs/decisions.md` @ 6446efa | Verified |
| Implemented features list; designed sync; concept media library | App README, `docs/01`, `docs/06`, `08b-library-media-concept.png` | Verified |
| 67 tests, 0 failed; lint clean; emulator device flow passed | `ci-reports` branch: `main/status.json`, `main/tests.txt`, `main-device/tests.txt` (run 40146198369) | Verified (CI) |
| Passed on Earl's Galaxy Note10+ in 42 s | App `docs/case-study-log.md`, Oct 24 | Dated log record |
| QA findings (Start class below the fold, etc.) | App `docs/case-study-log.md`, `docs/08-qa-review.md` | Verified |
| No INTERNET permission; backup off | `android/app/src/main/AndroidManifest.xml` @ 6446efa | Verified (code) |
| Project timeline starts December 2023, when Earl began teaching as Earl the Kaiju | Earl's statement, Oct 25, 2026 | Verified by Earl |
| Earl's BJJ dates (started 2015, black belt 2024) and BFA | Earl's statements (project memory) and the website's confirmed content (`docs/content-to-confirm.md`) | Verified by Earl |
| Long-term academy, name undecided and separate | Earl's statement | Verified by Earl |

## Authorship and AI assistance

The page says: Earl set the brand strategy and art direction, wrote the requirements, made the UX calls and approved every release; production work — vector cleanup, most of the code and the tests — was done with Claude working from his briefs; Earl reviewed results and tested the app on his phone.

Basis: the brand proofs are addressed to Earl for decisions ("Color — your call") and record his approvals; website PR descriptions end "Generated by Claude Code"; the app's case-study log describes the agent's development environment and Earl's sign-off (ADR-012) and phone run. **Earl should confirm or adjust this wording before merge.**

## Code highlights (6)

| # | Repository | Path | Commit | Visibility |
|---|---|---|---|---|
| 1 | Epetaway/EarltheKaiju | `src/lib/inquiry/schema.ts` | 77657a8 | Private — short excerpt, no link |
| 2 | Epetaway/EarltheKaiju | `worker/routes/inquiry.ts` | 77657a8 | Private — trimmed excerpt (… marks omitted lines) |
| 3 | Epetaway/EarltheKaiju | `scripts/postbuild-headers.mjs` | 77657a8 | Private — trimmed excerpt |
| 4 | Epetaway/earltheKaiju_app | `…/domain/timer/TimerEngine.kt` | 6446efa | Public — linked |
| 5 | Epetaway/earltheKaiju_app | `…/data/repo/Repositories.kt` | 6446efa | Public — linked |
| 6 | Epetaway/earltheKaiju_app | `android/app/src/main/AndroidManifest.xml` | 6446efa | Public — linked |

No secrets appear in any excerpt. `validate-content.ts` fails the build if a private excerpt grows past 30 lines or gains a link.

## Editorial notes

- Voice follows Earl's stated preference: human, direct, first person, no buzzwords. The "Why I built it" section keeps the career story at the level Earl described publicly and leaves private history out.
- Headline: "Building an identity into a working ecosystem." (from the brief's working title). The name itself is shown as the approved lockup artwork; the accessible h1 reads "Earl the Kaiju — Building an identity into a working ecosystem."
- The brand rule "never retype the wordmark" is respected: the name appears as artwork, and as plain sentence-case text only in running copy and the h1.
- Project identity lives inside the page (Shadow, Emerald, restrained Gold, Ivory, Barlow Condensed display); the site header, footer, navigation and card designs stay the portfolio's own.
- Every figure, chapter and status ledger item carries a visible status label; diagrams are labeled "Retrospective illustration".
- Test counts are published only with their date and source, per the rule in `FACTS-REQUIRING-CONFIRMATION.md`.

## Pending facts and decisions for Earl

1. AI-assistance wording (above) and the concept-board wording.
2. Meet Earl screenshot with background people and gym signage — OK for the portfolio?
3. Coaching site URL: when it launches, set `coachingSite.liveUrl` in `earlTheKaiju.ts`. The hero and closing then show **Visit Earl the Kaiju**; validation rejects anything that isn't an https URL on another domain. Decide then whether `/earldkaiju` should keep pointing at the case study (current) or go to the coaching site.
4. Replace local-build captures with live captures after launch, and add real Lighthouse numbers then.

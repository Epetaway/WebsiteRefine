# Gundam Forge — case study record

Route: `/work/gundam-forge` · Content: `client/src/data/gundamForge.ts` (+ the `gundam-forge` entry in `client/src/data/investigations.ts`) · Page: `client/src/pages/gundam-forge.tsx` · Parts: `client/src/components/gundam-forge/parts.tsx` and the shared `client/src/components/case-study-kit/kit.tsx` · Styles: `client/src/styles/gundam-forge.css` · Assets: `docs/GUNDAM-FORGE-ASSETS.md`

Audit date: 2026-10-25.

## Scope

Gundam Forge moves from the shared investigation template to a bespoke page built the way WithYou and Earl the Kaiju are: its own route, scoped stylesheet in the app's identity, content file, generated media record, capture and asset scripts, provenance docs and tests. The investigation record stays the single source for the abstract, implementation ledger, evidence and limitations; the page reads it. Shared changes:

| File | Change |
|---|---|
| `client/src/App.tsx` | Lazy route `/work/gundam-forge` ahead of `/work/:slug`. |
| `client/src/components/case-study-kit/kit.tsx` (new) | Picture, status tag, eyebrow, figure and public-repo code card, namespaced so Gundam Forge and DojoNet share markup and evidence rules but not looks. |
| `client/src/data/investigations.ts` | Gundam Forge entry: preview paths and alt, captures point at the new media. No claim changed. |
| `client/src/lib/caseStudyView.ts` | Gundam Forge's card uses the new preview composition. |
| `client/src/test/routes.test.tsx` | h1 now reads "Gundam Forge — Show the rule while the player is still deciding."; the deep-dive test checks the code-card disclosure on both new pages. |
| `scripts/validate-content.ts` | Gundam Forge rules (below). |
| `client/public/assets/fonts/` | Orbitron and Exo 2 (OFL), loaded only by `gundam-forge.css`. |

## Page structure

Hero · 00 overview · the human tension · **Chapter 01 The interface system**: 01.1 identity, 01.2 colour, 01.3 type, 01.4 surfaces, motion and the card · **Chapter 02 Designing the decision**: 02.1 rules and advice, 02.2 workflow, 02.3 the decision in the build, 02.4 the prototype, 02.5 playtesting, 02.6 small screens and themes, 02.7 around the builder · **Chapter 03 Engineering the rules**: 03.1 system, 03.2 code, 03.3 testing and QA · 04 evidence and limitations · 05 reflection and what's next.

## Source evidence matrix

Repository: `Epetaway/Gundam-Forge` (public) at `50321ed47aedc181296c606682b6c001eaa5c61e`.

| Claim on the page | Source | State |
|---|---|---|
| Built Feb 22 – Apr 24, 2026; 308 commits (289 Earl, 10 Copilot agent, 9 Claude) | `git log` | Verified (git) |
| AI coding assistants helped; direction and decisions Earl's | Co-author trailers on commits; Copilot agent PR #8 | **Earl to confirm wording** |
| Official-site look replaced with Forge branding the same day (1:28 pm → 6:09 pm) | 07942d4, 23f3bbe | Verified (git) |
| v2 visual reset Feb 25; token audit Mar 3 (30+ replacements, 10 files); semantic text tokens Mar 4 | 58116cd; f457ea8, b11fe4f; 615cc9c | Verified (git) |
| Rendered tokens and their values | `apps/web/app/globals.css` | Verified (code) |
| Package hex tokens differ from the CSS and aren't imported | `packages/design-system/src/tokens.ts`; search for imports | Verified (code) — **known gap** |
| Orbitron / Exo 2 / JetBrains Mono roles and weights | `app/layout.tsx`; `typography.ts`; `globals.css` | Verified (code) |
| Panel levels defined; level 3 unused | `globals.css`; search | Verified (code) |
| Motion durations; reduced-motion rule; 5:7 card sizes; 44 px Button minimum | `motion.ts`; `globals.css`; `card-sizes.ts`; `components/ui/Button.tsx` | Verified (code) |
| Contrast ratios (tokens) | Computed (WCAG 2.x); checked in `gundam-forge.test.tsx` | Computed for this page |
| Primary button 3.68:1; cobalt-600 5.17:1 | Computed | **Known gap** |
| Five rules and three warnings; errors vs warnings; isValid from errors only | `packages/shared/src/validation.ts` | Verified (code) |
| validateDeck() called by builder, playtester, deck API route and deck loader | Search at 50321ed | Verified (code) |
| Playtest gated on validity; playtester refuses invalid decks with the list | `forge-workbench.tsx` (canPlaytest); `app/playtest/page.tsx` | Verified (code) |
| Removal undo toast, 5 s | `forge-workbench.tsx` | Verified (code) |
| 4-copy cap at the click, "rather than relying solely on validation errors" | 34ab631 | Documented decision |
| Builder changes and dates (Format field, + button, grid, filters, sidebar, modal revert) | ccfb1e7, 0ee8d58, a31bea0, c7288a5, 4e6c20f, f984f2d → 2b7af24 → 542f203 | Verified (git) |
| getCopyLimit/isLegalInFormat unused | Search at 50321ed | Verified (code) — designed, not enforced |
| CardArtImage fallback chain; art downloaded at build, served same-origin | `CardArtImage.tsx`; fb994df | Verified (code/git) |
| 623-record catalog | `apps/web/public/data/cards.catalog.json` | Verified (data) |
| Test run: 257 tests, 253 passed, 4 skipped, 27 files; 2 files need jsdom | `npx vitest run`, Oct 25, 2026 (with and without `jsdom`) | Computed for this page |
| tsc clean; next build succeeds; /forge first-load JS 295 kB | Oct 25, 2026 (capture build, local fonts) | Computed for this page |
| CI runs typecheck and build, not tests | `.github/workflows/deploy.yml`, root `package.json` | Verified (code) — **known gap** |
| 39 of 41 bundled decks pass; two seed decks fail | validateDeck() over getDecks(), Oct 25, 2026 | Computed for this page |
| Rendered contrast: warning text 2.8:1; counters 3.5:1; light notice 1.5:1; light Issues 2.5:1 | Playwright, computed styles composited over their backgrounds | Computed for this page — **known gaps** |
| Autosave writes an empty deck on mount (seen under React's dev double-mount) | `forge-workbench.tsx` effects; reproduced in `next dev` | Computed for this page — **known gap** |
| No "unofficial" statement in the UI | Search of `app/` and `components/` | Verified — **known gap** |
| Home counters hard-coded | `app/page.tsx` | Verified — **known gap** |
| No verified public URL | `epetaway.github.io/Gundam-Forge/` returned a client error, Oct 25, 2026 | Verified |
| QA history (rules, hotlinking, playtester a11y, storage notice, svh dialog, classification) | f70a928, fb994df, 8e02fbc, 291a53c, 0ce2b43 (PR #6), PR #8 | Verified (git) |

## Code highlights (4, public, linked)

| # | Path | Lines @ 50321ed |
|---|---|---|
| 1 | `packages/shared/src/validation.ts` | 99–146 |
| 2 | `apps/web/app/forge/forge-workbench.tsx` | 345–407 |
| 3 | `packages/shared/src/types.ts` | 176–203 |
| 4 | `apps/web/components/ui/CardArtImage.tsx` | 22–54 |

Excerpts are trimmed (… marks omitted lines) and link to the exact lines at the full commit hash.

## Validation

`scripts/validate-content.ts` fails the build if the Gundam Forge sources claim a release, rules accuracy, competitive quality or user numbers, call the bot "AI-powered", drop the unofficial statement or the text-proxy statement, leave a figure without alt text, caption or source, or link an excerpt anywhere but the cited commit. `client/src/test/gundam-forge.test.tsx` checks the chapters, prototype, limitations, every image's alt and derivatives on disk, the capture labels, the stated contrast ratios, and the permalinks.

## For Earl to confirm before merge

1. The AI-assistance wording in the hero and overview (mirrors the WithYou wording you approved).
2. Text proxies in place of official card art — or say if you'd rather show the art.
3. The three reflections, written in your voice from the evidence.
4. The six "found while preparing this page" items are real issues in the Forge app. The page shows them as known gaps; the two that matter most if Forge ever goes public are the missing "unofficial" statement and the hard-coded home counters.

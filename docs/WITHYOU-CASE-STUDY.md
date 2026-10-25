# WithYou — case study record

Route: `/work/withyou` · Content: `client/src/data/withyou.ts` (+ the `withyou` entry in `client/src/data/investigations.ts`) · Page: `client/src/pages/withyou.tsx` · Parts: `client/src/components/withyou/parts.tsx` · Styles: `client/src/styles/withyou.css` · Assets: `docs/WITHYOU-ASSETS.md`

Audit date: 2026-10-25.

## Scope

The WithYou case study moves from the shared investigation template to a bespoke page built the way Earl the Kaiju is (PR #26): its own route, scoped stylesheet, content file, generated media record, asset scripts and provenance docs. The investigation record keeps its role as the single source for the abstract, implementation ledger, evidence and limitations; the page reads it rather than restating it. Shared code changed only where the new page needed it:

| File | Change |
|---|---|
| `client/src/App.tsx` | Lazy route `/work/withyou` ahead of `/work/:slug`. |
| `client/src/lib/caseStudyView.ts` | `HeroMedia` gains an optional `srcSet`; WithYou's card uses the new preview composition. |
| `client/src/data/investigations.ts` | WithYou entry only: new preview paths and alt, design evolution, implementation ledger (SPK-H closed; two known gaps; Android-only device evidence), captures. |
| `client/src/test/routes.test.tsx` | WithYou's h1 now reads "WithYou — Two private rooms with a shared door."; the generic deep-dive test points at DojoNet. |
| `scripts/validate-content.ts` | WithYou rules (below) and the new source files. |
| `client/public/assets/fonts/` | Inter 400–700 (OFL), loaded only by `withyou.css`. |

## Page structure

Hero · 00 overview · the human tension · **Chapter 01 Brand**: 01.1 strategy and voice, 01.2 the mark, 01.3 color and type, 01.4 icons and illustration, 01.5 photography, 01.6 campaign, 01.7 the design system · **Chapter 02 Product**: 02.1 principles, 02.2 information architecture, 02.3 design to build, 02.4 the sharing interaction (with the interactive prototype), 02.5 platform and theme parity, 02.6 handoff and spec · **Chapter 03 Engineering**: 03.1 system, 03.2 code, 03.3 what QA caught · 04 evidence and limitations · 05 reflection and what's next.

## Source evidence matrix

App repository: `TerrianAi/withyou` (private) at `612da33`. Design export: `Design/withyou`.

| Claim on the page | Source | State |
|---|---|---|
| Project started January 2026 and is ongoing | Earl | **Earl to confirm** |
| v4.2.1 tokens in code since Jun 18, 2026 | PR #89 "realign v4 design system and QA" (0ba87bb, Jun 18) | Verified (git) |
| Not publicly released; no users; no measured outcome | `BETA_CHECKLIST.md`; no store listing | Verified |
| Brand idea, voice rules, "never sound like" lines | Design export `README.md` (content fundamentals); brand kit voice board | Verified (design source) |
| Logo history: Apr 30 coral/blush → May 12 plum → May 14 coral/navy → drawn in code | File dates and commits on `apps/mobile/assets/` and `brand/`; 9de6fea (May 14) | Verified (git) |
| Mark geometry (two ellipses, stroke ratio, clip) | `apps/mobile/src/components/core/Logo.tsx` | Verified (code) |
| Palette values and the contrast ratios shown | `apps/mobile/src/theme/tokens.ts`; ratios computed with the WCAG 2.x formula and checked in `withyou.test.tsx` | Computed for this page |
| Primary button label white on coral = 2.78:1 | `Button` styles + tokens; computed | **Known gap** found while preparing the page |
| Dark-mode text tokens lifted to 4.5:1 (May 28) and photo-overlay contrast fixed (Sep 30) | 7a02e39 (#27); #117 | Verified (git) |
| 39 icons, 8 state illustrations; icon rules (24 grid, 1.8 stroke, active 2.2) | `apps/mobile/assets/icons/`, `illustrations/`; design export README (iconography) | Verified |
| Photography direction, library of 36 by id, do/don't, treatment values (crop at center 30%, gradient transparent 40% → navy 55%, glass 18% white + 20px blur) | Design export `README.md` (imagery, transparency & blur); `ui_kits/brand/brand.jsx` artboard 03; `ui_kits/mobile/components.jsx` `CoupleImage` | Verified (design source) |
| Safe-text zones for the five hero slots | App `docs/design/source-asset-manifest.md` §6 | Verified (design source) |
| Photos are placeholders to be replaced before release | Same manifest §6 and §7 | Verified; shown on the page |
| Hero and date-idea files are copies of six library photos | SHA-256 comparison of `apps/mobile/assets/images/{heroes,date-ideas}/` against the library, Oct 25, 2026 | Computed for this page |
| Marketing kit: privacy-band headline invisible | `colors_and_type.css` sets `h2 { color: var(--fg1) }`; `marketing.jsx` sets white only on the band container; reproduced in the render | Verified (design source) — **known gap** |
| App Store headlines 1.32 / 1.50 / 1.36:1; navy > 9:1 | `marketing.jsx` `AppStoreSet` gradients; computed | Computed for this page — **known gap** |
| Nudge copy "Jordan mentioned a hard week" implies disclosure | `ui_kits/mobile/screens.jsx` `Dashboard`, used in the landing hero | Design observation — **known gap** |
| Navigation history (5 tabs → 4 → Today/Our Focus/Connect/Guidance/Us; Gallery retired Oct 5, Insights Oct 10) | v1.0 prototype; design system v4.2.1; RCH-PR05b (#125, Oct 1) and later PRs | Verified (git) |
| Visibility layers (storage row per field; one service helper; API projection; AI context; privacy tags) | Prisma `ProfileFieldVisibility`; `partner-legacy-profile.ts`; `docs/architecture/04` §2.3; `ai-architecture` §8.1; `PrivacyTag` | Verified (code/docs); API layer **partial** |
| Legacy partner-profile gap closed Oct 12, 2026 with nine regression tests | SPK-H, #186; `partner-profile-visibility.test.ts` | Verified (git) |
| Five AI switches now read by the server | PRIV-1, #191 (Oct 12) | Verified (git) |
| QA findings list (bundler red screen; dark-mode contrast; emulator QA; 200% text; joint check-in entry; stale busy state) | 9de6fea; #27; #92; #163; `BETA_CHECKLIST.md`; #187 | Verified (git) |
| Per-space visibility still open | SPK-H PR description; code comment | **Known gap** |
| Device evidence Android-only for the rebuilt flows | `BETA_CHECKLIST.md` | Verified — **partial** |

## Authorship and AI assistance

The page says Earl set the product direction, built the brand and design system, designed the flows and made the UX calls; most of the code was written with AI coding assistants from his specs and handoffs, and he reviewed the results and tested builds in simulators, emulators and on Android phones. Basis: commit and PR history (agent-authored PR descriptions, Earl's merges), the design handoffs, the QA folders. **Earl should confirm or adjust this wording before merge.**

## Code highlights (3)

| # | Path | Commit | Visibility |
|---|---|---|---|
| 1 | `apps/mobile/src/components/core/Logo.tsx` | 612da33 | Private — short excerpt, no link |
| 2 | `apps/mobile/src/theme/tokens.ts` | 612da33 | Private — short excerpt, no link |
| 3 | `apps/api/src/services/profile/partner-legacy-profile.ts` | 612da33 | Private — trimmed excerpt (… marks omitted lines) |

No secrets appear in any excerpt.

## Validation

`scripts/validate-content.ts` fails the build if the WithYou sources make release, clinical, compliance or user-count claims, or carry star-rating text; if any figure lacks alt text, a caption or a source; if a private excerpt grows past 30 lines or gains a link; or if the photo library isn't shown whole with its placeholder label. `client/src/test/withyou.test.tsx` checks the chapters, the prototype, the limitations list, every image's alt, every figure's derivative on disk, the status labels, the photo library and slots, and every contrast ratio the page states.

## Pending facts and decisions for Earl

1. Photography: origin and rights of the 36-photo library (see the assets manifest).
2. AI-assistance wording (above) and the "January 2026" start date.
3. Whether to publish the three marketing-kit findings as written.
4. Reflections 2 and 3 were drafted for his voice — confirm or rewrite.
5. The Field Note "Designing Consent" and `docs/GRADUATE-APPLICATION-CONTENT.md` still describe the legacy profile gap as open; they were left untouched.

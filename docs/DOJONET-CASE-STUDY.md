# DojoNet — case study record

Route: `/work/dojonet` · Content: `client/src/data/dojonet.ts` (+ the `dojonet` entry in `client/src/data/investigations.ts`) · Page: `client/src/pages/dojonet.tsx` · Parts: `client/src/components/dojonet/parts.tsx` and the shared `client/src/components/case-study-kit/kit.tsx` · Styles: `client/src/styles/dojonet.css` · Assets: `docs/DOJONET-ASSETS.md`

Audit date: 2026-10-25.

## Scope

DojoNet moves from the shared investigation template to a bespoke page built the way WithYou and Earl the Kaiju are: its own route, a scoped stylesheet in the app's Spec v3 identity (warm white, Dojo Red, Bebas Neue), a content file, a generated media record, capture and asset scripts, provenance docs and tests. The investigation record stays the single source for the abstract, implementation ledger, evidence and limitations; the page reads it. Shared changes:

| File | Change |
|---|---|
| `client/src/App.tsx` | Lazy route `/work/dojonet` ahead of `/work/:slug`. |
| `client/src/components/case-study-kit/kit.tsx` (new) | Shared with Gundam Forge; see `docs/GUNDAM-FORGE-CASE-STUDY.md`. |
| `client/src/data/investigations.ts` | DojoNet entry: preview paths and alt, captures point at the new media; the first implementation item now notes that the demo profile route crashes. |
| `client/src/lib/caseStudyView.ts` | DojoNet's card uses the new preview composition. |
| `client/src/test/routes.test.tsx` | h1 now reads "DojoNet — Progress isn't the same as completion."; the deep-dive test covers both new pages. |
| `scripts/validate-content.ts` | DojoNet rules (below). |
| `client/public/assets/fonts/` | Bebas Neue (OFL), loaded only by `dojonet.css`. |

## Page structure

Hero · 00 overview · the human tension · **Chapter 01 The design system**: 01.1 the idea, 01.2 colour, 01.3 type, 01.4 surfaces and components, 01.5 the token audit (before/after pairs) · **Chapter 02 Designing for learning**: 02.1 the progression model (with the interactive as-built vs proposed stage comparison), 02.2 information architecture, 02.3 journal-first, 02.4 the build, 02.5 the prototype, 02.6 dark mode and small screens · **Chapter 03 Engineering, and what I'd fix**: 03.1 system, 03.2 the model in code, 03.3 testing and QA · 04 results, evidence and limitations · 05 reflection and what's next.

## Source evidence matrix

Repository: `Epetaway/DojoNet-Prototype-MAX` (public) at `be2db530aea80ea8525a02536af0452dcd49b1fb`.

| Claim on the page | Source | State |
|---|---|---|
| Public repository from Oct 27, 2025; 23 commits, all Earl's | `git log` | Verified (git) |
| Product idea, interface design and front-end development, solo | Commit authorship; the spec | **Earl to confirm wording** |
| "Inspired by early MySpace customization with 2025-grade design"; five spec principles | `docs/DojoNet-UI-UX-and-Component-Implementation.md` §1 | Verified (doc) |
| Spec v3 tokens and values, light and dark | `src/index.css` lines 6–20 and the `.dark` block | Verified (code) |
| No borders (`--color-border: transparent`); one elevation token; radii; 8-point spacing; page margins | `src/index.css`; `tailwind.config.js` | Verified (code) |
| Bebas Neue for the wordmark and headings; Inter for text | `index.html`; `tailwind.config.js`; `index.css` | Verified (code) |
| Profile themes (Default, Tatami, Iron, Neon) | `src/pages/ProfileEditor.tsx` (`themePresets`, lines 111–114) | Verified (code) |
| 24 custom properties defined; 6 used but undefined; `--color-primary` 153 uses in 16 files; `--accent-primary` 105 uses | Search of `src/` at be2db53 | Computed for this page — **known gap** |
| README lists `--color-primary` as the brand accent | `README.md` | Verified (doc) |
| Light mode: active tabs and primary buttons render white on `#F9F9F9` (1.05:1) | `training` capture; computed | Local build capture — **known gap** |
| One-line fix brings them back in Dojo Red (6.6:1) | `training-fixed` capture | Fix demonstrated |
| 51 class names on Tailwind `brand` (rose `#E11D48`); 57 on raw `red-500` (29 text, 25 bg, 3 border) | `tailwind.config.js`; search of `src/` | Computed for this page — **known gap** |
| Four stages as a TypeScript union, chosen by the learner, reversible | `TrainingJournal.tsx` (`Technique.proficiency`, lines 916–931) | Verified (code) |
| Progress tab shows the spread per stage, no overall score | `TrainingJournal.tsx` | Verified (code) |
| Stage one-line meanings | Written for this page | **Proposed for this page** (stated on the page) |
| Selected stage contrast 3.3 / 2.0 / 3.3 / 2.1 :1; unselected 8.0:1 | Computed (WCAG 2.x, colour on a 10% tint); checked in `dojonet.test.tsx` | Computed for this page — **known gap** |
| Proposed control: Matte Black on a 22% tint, at least 13:1, `aria-pressed` | This page's component; checked in the test | Retrospective illustration |
| Belt chapters: "White Belt Journey" start; `rankUp()` closes and opens; entries file into the open chapter | `src/store.js` (`ensureChapter`, `rankUp` lines 544–566); `Journal.jsx` | Verified (code) |
| Dashboard leads with streak, hours and sessions | `MilestonesWidget`; `dashboard` capture | Verified — **known gap** |
| Spec's journal composer defaults to Private; the built composer defaults to Public | Spec; `PostComposer.jsx` line 8 | Verified (code) — **known gap** |
| Seed technique uses "Intermediate", outside the union | `public/demo-data.json` | Verified (data) — **known gap** |
| Two Zustand stores; the JS store reads the session once at load (`store.js` line 278) before the TS store's demo fetch finishes | `src/store.js`; `src/app/store.ts` lines 80–96 | Verified (code) |
| First visit shows "Login to see your dashboard" until a reload | Fresh browser profile, Oct 25, 2026 (`fresh-dashboard`) | Computed for this page — **known gap** |
| Demo profile route crashes (`reading 'left'`) | `#/profile/u_demo`, Oct 25, 2026 (`profile-crash`) | Computed for this page — **known gap** |
| "New Entry" on the Training Journal returns to the dashboard composer | `TrainingJournal.tsx` | Verified (code) — **known gap** |
| Button atom 40 px tall | `Button.jsx` (`h-10`) | Verified (code) — **known gap** |
| HashRouter in production; lazy routes | `src/App.jsx`; `vite.config.js` | Verified (code) |
| Express dev server with JSON persistence; front end falls back to local data | `server/index.js` | Verified (code) |
| 16-model Prisma schema, not connected | `prisma/schema.prisma` | Verified (code) — designed |
| Vitest: 1 file, 1 test passes; `vite build` succeeds, entry chunk 121 kB gzipped | Run Oct 25, 2026 | Computed for this page |
| QA history (hash router, signed-out storage errors, static-mode stubs, demo arrays, `getJournals`) | a7a79cb → 03c3ffe, 1000620, 989ca4a, db710cc, 077fe29 | Verified (git) |
| "The lesson I took into WithYou" (private by default) | WithYou case study record | **Earl to confirm** |

## Code highlights (4, public, linked)

| # | Path | Lines @ be2db53 |
|---|---|---|
| 1 | `src/pages/TrainingJournal.tsx` | 916–931 |
| 2 | `src/store.js` | 544–566 |
| 3 | `src/app/store.ts` | 80–96 |
| 4 | `src/index.css` | 6–20 |

Excerpts are trimmed (… marks omitted lines) and link to the exact lines at the full commit hash.

## Validation

`scripts/validate-content.ts` fails the build if the DojoNet sources claim a launch, users, a learning outcome or a mastery percentage, leave a figure without alt text, caption or source, label a `-fixed` capture as anything but Fix demonstrated (or label anything else that way), drop the neutral-placeholder statement, or link an excerpt anywhere but the cited commit. `client/src/test/dojonet.test.tsx` checks the chapters, the stage control's state, the limitations, every figure's derivative on disk, the stated contrast ratios and the permalinks.

## For Earl to confirm before merge

1. The role and dates line: "Product idea, interface design and front-end development, solo." and "2025 · public repository from Oct 27, 2025".
2. The three reflections, written in your voice from the evidence — especially the line that ties DojoNet's public-by-default composer to WithYou's private-by-default rule.
3. The stage meanings are proposed on the page, not taken from the app. Replace them with your own teaching language if you'd rather.
4. Whether to link the live GitHub Pages demo. It isn't linked: on a first visit it shows "Login to see your dashboard" until a reload, and the demo profile crashes. Both are one-line-to-small fixes in the app repo.

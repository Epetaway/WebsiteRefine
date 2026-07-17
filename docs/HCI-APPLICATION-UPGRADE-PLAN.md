# HCI Application Upgrade Plan

Audit date: 2026-07-16

Working branch: `hci-application-readiness`

Default branch: `main`

Baseline and production deployment commit: `ad2844899ceadcc7b2a8b5449d9464b2bb737129`

## Baseline

At the start of this migration, the repository used React 18, TypeScript, Vite,
React Router, an Express service, and Netlify/Vercel configuration. The official
domain was served by Netlify, while GitHub also recorded Vercel Production
deployments. The canonical React routes all rendered `HandoffFrame`, which
loaded `.dc.html` documents from `client/public/hceps/designs/` in iframes.
Native React pages and local prototypes existed but were not the production
runtime.

The baseline commands were:

| Purpose | Command |
| --- | --- |
| Install | `npm ci` (or `npm install` for local development) |
| Develop | `npm run dev` |
| Lint | `npm run lint` |
| Type check | `npm run check` / `npm run typecheck` |
| Tests | `npm test` |
| Build | `npm run build` |
| Production start | `npm start` |
| Full application QA | `npm run qa` |
| Document QA | `npm run documents:qa` |

No E2E command existed at baseline. Behavior tests use Vitest, Testing Library,
and browser-based manual verification.

## Baseline route system

The following routes were iframe hosts: `/`, `/work`, `/work/:slug`,
`/research`, `/field-notes`, `/field-notes/:slug`, `/about`, `/resume`, and
`/contact`. Legacy routes redirected in React, but server-level redirects were
incomplete. There was no `/graduate-review` route.

## Baseline resume sources

- `client/src/data/professionalProfile.ts`
- `client/src/data/professionalExperience.ts`
- `client/src/data/experience.ts`
- `resume/content.json` and `resume/generate.mjs`
- `scripts/generate_resume_pdf.py`
- `client/public/hceps/designs/Resume.dc.html`
- multiple PDF and DOCX files under public, source, and function directories

These sources disagreed about AMA Fight Club, BroadcastMed, KBS&P, legacy-only
employers, unsupported metrics, and planned HCI study.

## Known contradictions at baseline

- AMA Fight Club appeared as both `Present` and ending in `2025`.
- The current flagger employer, title, date, and publication choice were absent.
- The former resume model advertised UX and Front-End variants.
- One education list described an HCI application as planned graduate study.
- Archived handoff content included unsupported outcome and performance metrics.
- The official domain was Netlify-hosted while the repository also deployed to
  Vercel as Production.
- Static HTML metadata said UX Engineer while the iframe homepage foregrounded
  HCEPS and could expose different content.
- Editorial artwork and implementation captures were not consistently labeled.

## Target architecture

- One Vite/React application and one official domain.
- Native semantic routes with a shared header, footer, skip link, page patterns,
  evidence labels, and deterministic local prototypes.
- One canonical professional record at
  `client/src/data/professionalFacts.json`, consumed by TypeScript pages, the
  Vite HTML transform, and both PDF generators.
- One public resume and one no-index application-specific graduate CV.
- Route-specific metadata shells generated during the production build.
- Netlify as the sole configured production host for `ehicksonjr.com`; GitHub
  Actions performs quality validation instead of a second deployment.
- Archived `.dc.html` documents retained only as no-index design references.

## Migration sequence and checklist

- [x] Confirm default branch, clean worktree, baseline commit, deployment state,
  and project commands.
- [x] Create `hci-application-readiness` from `main`.
- [x] Establish canonical professional data and unresolved-fact controls.
- [x] Remove the multi-variant resume source and stale public document files.
- [x] Replace all canonical iframe routes with lazy-loaded native React pages.
- [x] Add `/graduate-review` as a stable, no-index review path.
- [x] Add proposed-method and evidence boundaries to every investigation.
- [x] Label editorial illustrations separately from implementation captures.
- [x] Generate readable two-page resume and graduate CV artifacts.
- [x] Add route, navigation, content, prototype, and PDF validation.
- [x] Generate static route metadata shells and complete redirect rules.
- [x] Consolidate production configuration around Netlify.
- [ ] Confirm the facts listed in `FACTS-REQUIRING-CONFIRMATION.md` with Earl.
- [ ] Disconnect the existing Vercel Git integration in the Vercel dashboard;
  repository configuration can no longer initiate it, but external integration
  state is outside this branch.

## Risk areas

- Unknown current-employment facts must remain unpublished until confirmed.
- Archived handoff files contain superseded claims; they are blocked from
  indexing and excluded from the application runtime, but retained for design
  comparison.
- The public Contact page uses direct email. The retained server email endpoint
  would require a verified SendGrid sender if reintroduced into the UI.
- SPA content still requires JavaScript for the visible page, although static
  metadata shells improve indexing and social previews.
- A formal WCAG conformance audit and user study have not been conducted.

## Verification requirements

- `npm run qa` succeeds without warnings treated as errors.
- `npm run performance:validate` enforces active image and built-asset budgets.
- `npm run qa:browser` passes the 27-check local production-browser suite.
- `npm run documents:qa` succeeds; both PDFs render without clipping or overlap.
- Canonical and legacy routes are exercised in tests.
- No canonical route renders an iframe.
- Browser QA covers 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920 CSS
  pixel widths, mobile landscape, keyboard navigation, prototypes, and 200% zoom.
- Built route shells contain unique titles, descriptions, canonicals, Open Graph,
  Twitter metadata, and Article JSON-LD where appropriate.

## Phase completion ledger

All repository-controlled work for the 22 phases is complete. “External” below
means the repository is intentionally ready for a fact owner or hosting provider
check; it does not indicate missing implementation.

| Phase | Repository status | Evidence or boundary |
| ---: | --- | --- |
| 1 | Complete | Safe branch, baseline, architecture, deployment, commands, and plan recorded. |
| 2 | Complete | One canonical professional record; unknown employment facts are blocked from publication and documented. |
| 3 | Complete | Canonical routes are native, lazy React pages with zero iframe runtime. |
| 4 | Complete | Reusable editorial/technology primitives and responsive tokens are in production code. |
| 5 | Complete | Home follows the required narrative, the v4 light investigation exhibits, and the one-thesis/four-principles framework composition. |
| 6 | Complete | Research page separates used methods from methods sought through formal training. |
| 7 | Complete | Stable, no-index five-minute Graduate Review path and application CV are present. |
| 8 | Complete | All investigations expose status, contribution, changed-mind evidence, prototype, limitations, and proposed methods. |
| 9 | Complete | Claim and metric policies are documented and enforced by content validation. |
| 10 | Complete | One public UX Engineer résumé and one canonical download remain. |
| 11 | Complete | Separate two-page, no-index graduate CV is linked only from the admissions path. |
| 12 | Complete | Both PDFs are generated from canonical facts and pass automated two-page/selectable-text validation. |
| 13 | Complete | About focuses on practice trajectory, teaching, human capability, and current direction. |
| 14 | Complete | Three complete Field Notes include metadata, evidence boundaries, and accessible reading layouts. |
| 15 | Complete | Repository employers are reconciled conservatively. External LinkedIn/application-form edits await the documented fact confirmations. |
| 16 | Complete | Route-specific metadata, JSON-LD, sitemap, robots, route shells, and redirects are validated. |
| 17 | Complete | Accessibility implementation and limitations are documented without a conformance claim. |
| 18 | Complete | The 320–1920 px, framework, interaction, prototype, redirect, and zoom browser matrix passes 27 checks. |
| 19 | Complete | Thirty-five meaningful route, navigation, prototype, contact, résumé, and graduate-review tests pass. |
| 20 | Complete | Clean local production QA/build passes. Netlify domain and provider state remain post-deploy external checks. |
| 21 | Complete | WebP conversion, lazy loading, intrinsic dimensions, route splitting, and deterministic budgets pass. Live Core Web Vitals remain post-deploy evidence. |
| 22 | Complete | Required handoff documents and README are current with the final implementation and QA results. |

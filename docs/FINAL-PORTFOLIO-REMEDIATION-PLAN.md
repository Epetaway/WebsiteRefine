# Final Portfolio Remediation Plan

Audit date: 2026-07-17

Canonical domain: `https://ehicksonjr.com`

Working branch: `hci-portfolio-production-readiness`

Starting commit: `ad2844899ceadcc7b2a8b5449d9464b2bb737129`

Default branch: `main`

## Current state

- The repository is a React 18 and TypeScript application built with Vite and served by Express.
- React Router defines the public route tree, but every canonical route currently renders `HandoffFrame`, which loads an archived `.dc.html` document in an iframe.
- A substantial native editorial React implementation already exists in `client/src/pages`, `client/src/components/editorial`, `client/src/components/prototypes`, and `client/src/index.css`, but it is not connected to production routing.
- The `.dc.html` files in `client/public/hceps/designs` and `client/public/prototypes` contain useful visual references and prototype archives. They also contain stale titles, unsupported metrics, variant-resume language, and other superseded claims.
- Professional information is duplicated across `professionalProfile.ts`, `professionalExperience.ts`, `projects.ts`, `investigations.ts`, `experience.ts`, `resume/content.json`, the Python PDF generator, generated Markdown, an old DOCX, an old source PDF, metadata, design documents, and legacy pages.
- The only canonical public PDF path is already `/assets/Earl-Hickson-Jr-Resume.pdf`, but the generator hard-codes its content and uses body type below the required minimum. No source-controlled graduate CV currently exists.
- Route metadata uses React Helmet, while `client/index.html`, `client/public/sitemap.xml`, `client/public/robots.txt`, `vercel.json`, Netlify redirects, and Express fallback behavior provide deployment/indexing support.
- The initial quality pipeline passes: ESLint, TypeScript, 10 Vitest tests, and the Vite/Express production build. Existing tests do not validate the canonical router, route metadata, claim governance, graduate review, PDFs, redirects, or full-page accessibility.
- Production dependencies have no known `npm audit --omit=dev` vulnerabilities. The full development tree reports four moderate advisories and will be evaluated without applying unsafe breaking upgrades.
- Production DNS, provider environment variables, SendGrid delivery, analytics, and the deployed commit cannot be inferred from a local build and require explicit production verification.

## Target state

- One native semantic React application at `https://ehicksonjr.com`.
- One public identity: Earl Hickson Jr., UX Engineer.
- One canonical professional-data module controlling public identity, experience, education, certification, capabilities, teaching, research, links, project status, and publication-safe facts.
- One public employment résumé at `/resume` and `/assets/Earl-Hickson-Jr-Resume.pdf`.
- One application-specific graduate CV, intentionally linked only from `/graduate-review`.
- One native route hierarchy for Home, Work, three investigations, Research, Field Notes, About, Resume, Contact, Graduate Review, and 404.
- Permanent hosting redirects for legacy URLs, with in-app redirects as the SPA fallback.
- Route-specific canonical, Open Graph, Twitter, and structured metadata.
- Evidence labels that distinguish implementation, rationale, reflection, known gaps, planned work, and proposed research.
- Automated publication guards that reject unresolved facts, banned phrases, unverified metrics, iframe-based canonical pages, broken canonical assets, and invalid PDFs.
- Accessible, responsive, print-friendly presentation with documented browser and automated QA.

## Architecture migration

```text
Before
React Router
  -> HandoffFrame
    -> iframe
      -> public/hceps/designs/*.dc.html

After
React Router
  -> SiteLayout
    -> native page component
      -> reusable editorial, evidence, prototype, and document components
        -> canonical professional and investigation data
```

The `.dc.html` documents remain archived design references. They are not canonical destinations and are excluded from the sitemap, metadata, navigation, and public route renderer.

## Files affected

### Routing and application shell

- `client/src/App.tsx`
- `client/src/main.tsx`
- `client/src/components/layout/header.tsx`
- `client/src/components/layout/footer.tsx`
- `client/src/components/seo.tsx`
- `client/src/pages/*`

### Canonical data and publication validation

- New `client/src/data/professional/*`
- `client/src/data/investigations.ts`
- `client/src/data/fieldNotes.ts`
- Legacy data modules converted to compatibility exports or removed from canonical imports
- New validation scripts/tests for facts, claims, routes, links, and documents

### Design system and interaction

- `client/src/index.css`
- `client/src/components/editorial/*`
- `client/src/components/prototypes/*`
- New shared layout, evidence, figure, timeline, graduate-review, and contact components only where they reduce meaningful repetition

### Résumé and graduate CV

- `scripts/generate_resume_pdf.py`
- New canonical document-data export consumed by the PDF build
- `client/public/assets/Earl-Hickson-Jr-Resume.pdf`
- New `client/public/assets/application/Earl-Hickson-Jr-HCI-Graduate-CV.pdf`
- Legacy public résumé variants removed from public assets
- `resume/content.json`, `resume/generate.mjs`, and generated variant files archived or retired from the public workflow

### SEO, deployment, and documentation

- `client/index.html`
- `client/public/sitemap.xml`
- `client/public/robots.txt`
- `vercel.json`
- `netlify.toml`
- `_redirects`
- `client/public/_redirects`
- `README.md`
- Required records in `docs/`

### Test surface

- `client/src/test/*`
- New route, claim, metadata, field-note, graduate-review, PDF, and publication-safety tests

## Risks and controls

| Risk | Control |
| --- | --- |
| Existing native pages diverge visually from the current handoff | Preserve the established obsidian/orchid/editorial token system and compare representative pages at all required viewports. |
| Unverified career facts leak through an old data file or archive | Restrict canonical imports to the professional module; scan the built output and sitemap; keep archives unlinked and non-canonical. |
| Browser-only redirects return `200` instead of permanent redirects | Add explicit host-level redirect rules and retain React redirects only as a fallback. |
| PDF generation duplicates career data | Generate document input from a machine-readable export of the canonical TypeScript source and validate extracted PDF text. |
| Contact form appears reliable without verified delivery | Prefer direct email as the dependable path; expose form availability only when delivery is configured and document the service boundary. |
| Design-rich pages become difficult to scan or use at zoom | Test 320–1920 px, mobile landscape, 200% zoom, keyboard flow, reduced motion, and print styles. |
| Archived `.dc.html` prototypes are mistaken for production claims | Label the archive as reference material, remove it from routing/indexing, and block `.dc.html` from canonical render tests. |
| Automated checks give false confidence | Pair unit/static checks with browser console, keyboard, responsive, link, asset, metadata, and PDF inspection. |
| Provider state cannot be validated locally | Report provider-dependent checks separately and never score them as verified without production evidence. |

## Migration sequence

1. Record Git, build, deployment, route, data, document, claim, and archive inventories.
2. Establish the canonical typed professional source and publication validation.
3. Wire the native application shell and canonical routes; remove `HandoffFrame` from production routing.
4. Complete missing Graduate Review and canonical Field Note content.
5. Reconcile Home, Work, Research, About, Resume, Contact, and investigation content against the approved thesis and claim rules.
6. Add route-specific metadata, JSON-LD, sitemap entries, robots policy, social assets, and permanent legacy redirects.
7. Generate the public résumé and graduate CV from canonical exported data; inspect rendering and extracted text.
8. Add high-risk route, navigation, prototype, claim, publication, metadata, asset, and document tests.
9. Run lint, TypeScript, unit tests, production build, E2E/browser checks, accessibility checks, link checks, and responsive checks.
10. Fix failures, update evidence documents, inspect the deployed production site where access permits, and score only verified categories.

## Verification strategy

- `npm install`
- `npm run lint`
- `npm run check`
- `npm test`
- `npm run build`
- Publication-safety scan of source and built assets
- PDF generation, `pdfinfo`, `pdftotext`, page rendering, and visual inspection
- Canonical and legacy route tests
- Browser inspection at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920 px
- Mobile landscape, 200% zoom, reduced-motion, keyboard-only, and print checks
- Browser console and failed-network-request checks
- Heading, landmark, accessible-name, focus, mobile-menu, and form-state checks
- Sitemap, robots, canonical, Open Graph, Twitter, JSON-LD, and redirect validation
- Production URL checks separated from local/preview evidence

## Definition of done

- Canonical routes render native semantic React components without `HandoffFrame`, iframes, or `.dc.html` primary content.
- The public identity, thesis, role targets, project status, professional chronology, and contact links come from one publication-safe source.
- Unconfirmed facts are omitted or conservatively worded, and unresolved publication statuses fail validation.
- The three investigations expose precise implementation evidence, limitations, open questions, proposed methods, and usable prototypes.
- Home, Work, Research, Graduate Review, About, Field Notes, Resume, and Contact answer their intended reviewer questions without duplicate or conflicting narratives.
- One readable, selectable, ATS-friendly public résumé and one clearly scoped graduate CV pass automated and visual validation.
- Canonical metadata, sitemap, robots, social assets, structured data, and permanent redirects are valid.
- Accessibility and responsive behavior are verified and documented without claiming formal conformance.
- Lint, TypeScript, tests, production build, route checks, claim checks, asset checks, and document checks pass with no open errors.
- Provider-dependent limitations are stated plainly; no 9/10 score is assigned without supporting evidence.

## Completion record

Implementation and local release validation completed 2026-07-17. All repository-controlled definition-of-done items pass. The live domain remains on the prior release, so merge/deploy and post-deployment verification are the only external follow-up; details are recorded in `docs/PRODUCTION-READINESS.md` and `docs/SEO-REINDEXING-CHECKLIST.md`.

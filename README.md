# Earl Hickson Jr. - UX Engineer Portfolio

Canonical source for [ehicksonjr.com](https://ehicksonjr.com).

This repository presents one professional identity, one public resume, three
independent HCI/product investigations, a research direction, a focused graduate
review path, and an editorial Field Notes system. HCEPS is the internal design,
editorial, and evidence-governance framework; it is not the public brand or a
second application.

## Architecture

- React 18, TypeScript, Vite, and React Router
- Native semantic page routes with lazy-loaded page bundles
- Custom editorial/technology design system in `client/src/index.css`
- Express development/production service with a retained Netlify email endpoint
- React Helmet runtime metadata plus generated static metadata shells
- Vitest and Testing Library behavior tests
- ReportLab/PyPDF professional-document generation and validation

Netlify is the canonical deployment provider for `ehicksonjr.com`. GitHub Actions
runs quality gates. The former repository-driven Vercel deployment was removed to
avoid parallel production systems.

## Route map

```text
/
/work
/work/withyou
/work/dojonet
/work/gundam-forge
/research
/field-notes
/field-notes/:slug
/about
/resume
/contact
/graduate-review      # stable, no-index, omitted from primary navigation
```

Legacy Projects, Case Studies, Investigations, How I Think, Approach, Blog, and
Writing paths redirect to the canonical structure. Archived `.dc.html` files are
retained under `client/public/hceps/designs/` as source-only visual references.
The production build removes that archive and the standalone prototype exports
from `dist`, so their superseded copy cannot become a public alternate site.

## Canonical content system

`client/src/data/professionalFacts.json` is the source of truth for:

- name, UX Engineer title, summary, thesis, belief, availability, and links
- professional experience and conservative date ranges
- education and certification
- research interests and preparation
- teaching perspective and publication boundary
- capabilities and unresolved professional facts

TypeScript modules re-export typed areas for application use. Vite reads the same
JSON for static HTML metadata, and the PDF generator reads it for both documents.
Investigation evidence lives in `client/src/data/investigations.ts`; Field Notes
live in `client/src/data/fieldNotes.ts`.

Unknown employment details are never inferred. See
`docs/FACTS-REQUIRING-CONFIRMATION.md` and
`docs/EMPLOYMENT-RECONCILIATION.md`.

## Local setup

```bash
npm install
npm run dev
```

The Express/Vite development server defaults to `http://127.0.0.1:3000`.

## Quality commands

```bash
npm run lint
npm run check
npm run typecheck
npm test
npm run build
npm run performance:validate
npm run qa:browser
npm run qa:visual
npm run qa
```

The build creates per-route HTML metadata shells before bundling the production
server. `npm run qa` includes deterministic asset and bundle budgets after the
production build. `npm run qa:browser` starts a local Vite preview when needed
and exercises responsive layouts, navigation, canonical metadata, the three
prototypes, Home investigation exhibits, and investigation human-context
evidence in headless Chrome. It also verifies the ZIP-aligned Investigations
index, 16:10 implementation capture grids, desktop hover enlargement, and the
mobile tap-to-open evidence lightbox.

`npm run qa:visual` captures every canonical page that has a matching page
template in the v4 Afro-Futurist Editorial Modernism handoff. It writes paired
desktop and mobile screenshots, comparison sheets, and structural measurements
to `output/visual-qa/`.

## Professional documents

Install the isolated PDF dependencies once:

```bash
npm run documents:setup
```

Generate and validate both documents:

```bash
npm run documents:qa
```

Outputs:

- Public resume: `client/public/assets/Earl-Hickson-Jr-Resume.pdf`
- Graduate CV: `client/public/assets/application/Earl-Hickson-Jr-HCI-Graduate-CV.pdf`
- Review copies: `output/pdf/`

Validation checks existence, non-empty files, two-page limits, expected
selectable text, filenames, document titles, and author metadata. Rendered PNG
review is still required after meaningful layout changes.

## Deployment

Netlify uses `netlify.toml`, runs `./build.sh`, and publishes `dist/public`. The
public Contact page uses direct email and does not depend on a form service. A
legacy-compatible serverless email endpoint remains available if a form is
reintroduced. Its service variables are optional for the current UI:

```text
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=
VITE_GA_MEASUREMENT_ID=
```

After merge, verify the custom domain, headers, redirects, route shells, direct
email links, resume downloads, and sitemap on the deployed commit. If the
serverless endpoint is re-enabled in the UI, verify its sender and delivery
configuration separately.

## Accessibility approach

The site uses native landmarks, a skip link, logical heading hierarchy, visible
focus, an accessible mobile dialog with focus return, reduced-motion support,
meaningful alt text and captions, live prototype announcements, native controls,
and responsive long-form typography. This is an accessibility-focused
implementation, not a formal WCAG conformance claim.

See `docs/ACCESSIBILITY-REVIEW.md` and `docs/RESPONSIVE-QA.md`.

## Evidence and claim policy

The portfolio distinguishes verified facts, implementation evidence, design
rationale, reflection, known gaps, planned work, and proposed research. Working
software is not presented as proof of a human outcome. A type definition is not
presented as enforced behavior. Deployment configuration is not presented as a
verified live product.

See `docs/CLAIM-AUDIT.md`, `docs/METRIC-EVIDENCE.md`, and
`docs/KNOWN-LIMITATIONS.md`.

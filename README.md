# Earl Hickson Jr. — UX Engineer Portfolio

Canonical source for [ehicksonjr.com](https://ehicksonjr.com): one professional identity, one public résumé, three independent product case studies plus the Earl the Kaiju flagship case study, a research direction, Field Notes, and an intentional graduate-review path.

HCEPS remains the internal editorial, evidence-governance, and design-language reference. It is not a second public portfolio or runtime application.

## Architecture

- React 18, TypeScript, Vite, and React Router.
- Native semantic React pages; canonical routes contain no iframe or `.dc.html` runtime.
- Custom creative-technologist CSS with self-hosted Manrope and JetBrains Mono.
- Route-based code splitting and focused interactive prototypes.
- React Helmet route metadata and JSON-LD.
- Vite static output for Vercel/Netlify; Express production server for local verification.

## Route map

```text
/                                      Home
/work                                  Work
/work/withyou                          WithYou case study
/work/dojonet                          DojoNet case study
/work/gundam-forge                     Gundam Forge case study
/work/earl-the-kaiju                   Earl the Kaiju flagship case study
/research                              Research direction
/field-notes                           Field Notes
/field-notes/:slug                     Field Note
/about                                 About
/resume                                Public professional record
/contact                               Direct contact paths
/graduate-review                       Five-minute HCI admissions review
```

Legacy Projects, Case Studies, Investigations, Blog, Writing, How I Think, and Approach paths redirect to canonical routes. Unknown paths render a real 404 view.

## Design system

The active system uses dark product surfaces, warm reading areas, saffron brand accents, project-specific rose/green/cobalt accents, large Manrope headings, JetBrains Mono metadata, a wide twelve-column rhythm, and explicit evidence/status labels. Long-form case-study material sits behind accessible technical deep-dive disclosures while recruiter summaries remain permanently visible.

## Canonical professional data

`client/src/data/professional/` owns identity, links, experience, education, certification, capabilities, teaching, research, project statuses, and fact state. Routed pages read this source directly.

`npm run content:export` generates `resume/content.json`; the PDF generator consumes that file. Do not hand-edit generated career content or add a second résumé data source.

Fact states are `verified`, `requires-confirmation`, `private`, and `exclude`. Production publication is limited to verified facts. See `docs/FACTS-REQUIRING-CONFIRMATION.md` and `docs/EMPLOYMENT-RECONCILIATION.md`.

## Claim governance

Claims use a typed vocabulary: verified fact, implementation evidence, design rationale, personal reflection, research claim, known gap, planned work, and proposed research. Built software is not described as a proven human outcome, peer-reviewed research, or verified public deployment.

Source and built output are scanned for banned metrics, stale identities, unsafe status language, and iframe architecture. See `docs/CLAIM-AUDIT.md` and `docs/METRIC-EVIDENCE.md`.

## Local setup

```bash
npm install
npm run dev
```

Development defaults to `http://127.0.0.1:3000`.

Optional environment variables:

```text
VITE_GA_MEASUREMENT_ID=
SENDGRID_API_KEY=             # retained server integration; not used by the public Contact UI
```

The Contact page uses robust direct email, LinkedIn, and GitHub links because production form delivery is not verified.

## Quality commands

```bash
npm run lint
npm run check
npm run typecheck
npm test
npm run validate:content
npm run validate:pdf
npm run build
npm run qa:browser
npm run qa
```

`qa:browser` requires Chrome or `CHROME_BIN` and tests canonical routes, expanded case-study disclosures, redirects, PDFs, metadata, images, keyboard focus, axe accessibility, required viewports, mobile landscape, zoom-equivalent reflow, reduced motion, primary target size, and regenerated route screenshots.

Lighthouse CI:

```bash
npx @lhci/cli autorun
```

The final review record is in `docs/PRODUCTION-READINESS.md`.

## Documents

Canonical public résumé:

```text
/assets/Earl-Hickson-Jr-Resume.pdf
```

Application-specific graduate CV:

```text
/assets/application/Earl-Hickson-Jr-HCI-Graduate-CV.pdf
```

Generate and validate both:

```bash
npm run content:export
npm run documents:generate
npm run validate:pdf
```

The graduate CV is intentionally linked from `/graduate-review`; it is not promoted as an alternative employment résumé. Generation details are in `resume/README.md`.

## Accessibility approach

The implementation includes skip navigation, semantic landmarks/headings, visible focus, an accessible mobile dialog, focus containment/return, reduced-motion handling, meaningful image alternatives, live prototype announcements, sufficient contrast, 320 px reflow, and 44 px primary controls. Automation supports—but does not replace—physical assistive-technology testing. See `docs/ACCESSIBILITY-REVIEW.md`.

## Project statuses

- WithYou — functional beta-oriented implementation; legacy sharing inconsistency documented.
- DojoNet — active development; instructor workflow and outcomes not claimed.
- Gundam Forge — functional beta-oriented implementation; heuristic opponent, incomplete competitive restriction coverage, and unverified public hosting.

## Build and deployment

```bash
npm run build
PORT=3000 npm start
```

Vercel and Netlify publish `dist/public` and apply canonical redirects plus the SPA fallback. The live site must be checked after the exact merged commit deploys; follow `docs/SEO-REINDEXING-CHECKLIST.md`. The current live domain remains on the prior release at the time of this branch review.

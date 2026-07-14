# Earl Hickson Jr. — UX Engineer Portfolio

Canonical source for [ehicksonjr.com](https://ehicksonjr.com).

The site presents one professional identity, one public resume, three independent product investigations, a research direction, and an editorial Field Notes system. The HCEPS archive informed the design/evidence system; it is not a second public portfolio or a second application in this repository.

## Product architecture

- React 18 + TypeScript + Vite
- React Router
- Tailwind CSS plus a custom editorial/technology token layer
- Express backend for contact delivery and retained legacy service routes
- SendGrid notification path when configured
- React Helmet metadata and Google Analytics initialization

## Canonical routes

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
```

Legacy project, Blog, How I Think, and Approach routes redirect into this structure.

## Local development

```bash
npm install
npm run dev
```

The Express/Vite development server defaults to `http://127.0.0.1:3000`.

## Quality commands

```bash
npm run check
npm run lint
npm test
npm run build
```

## Environment variables

```text
SENDGRID_API_KEY=
VITE_GA_MEASUREMENT_ID=
```

Additional legacy integrations have their own optional variables in `server/routes.ts`. Contact submissions use in-memory storage; SendGrid email is the durable notification path when configured.

## Public resume

The only public download is:

```text
/assets/Earl-Hickson-Jr-Resume.pdf
```

Regenerate it with:

```bash
tmp/pdf-venv/bin/python scripts/generate_resume_pdf.py
```

The generated delivery copy is written to `output/pdf/` and the public asset directory.

## Evidence policy

The public portfolio distinguishes implemented behavior, integrated behavior, design work, partial work, known gaps, and development-stage evidence. Working software is not presented as proof of human outcomes, peer-reviewed research, or verified public deployment.

See [docs/HCEPS-INTEGRATION-PLAN.md](docs/HCEPS-INTEGRATION-PLAN.md), [docs/CLAIM-AUDIT.md](docs/CLAIM-AUDIT.md), and [docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md).

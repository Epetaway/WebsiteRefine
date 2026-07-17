# HCEPS Integration Plan

Audit date: 2026-07-14

## Product decision

WebsiteRefine remains the canonical repository for `https://ehicksonjr.com`. The HCEPS archive is a reference for editorial structure, evidence governance, interaction prototypes, and visual tokens. It will not be deployed or maintained as a second portfolio.

## Current architecture

- React 18, TypeScript, Vite, React Router, Tailwind CSS.
- Express server with in-memory storage, SendGrid-backed contact notifications, prototype access, and legacy social/BJJ endpoints.
- React Helmet metadata, Google Analytics initialization, static sitemap/robots files.
- Legacy routes for projects, case studies, How I Think, Blog, and Earl d. Kaiju.
- Multiple overlapping data files and three public resume variants.
- Dark Prismora/legacy design tokens and repeated `Front-End Engineer` positioning.

## Target architecture

- Preserve React/Vite/Express and the existing deployment shape.
- Establish typed sources of truth under `client/src/data/` for professional identity, navigation, investigations, experience, research themes, and Field Notes.
- Establish shared editorial/technology layout primitives and one reusable prototype frame.
- Make the public routes `/`, `/work`, `/work/:slug`, `/research`, `/field-notes`, `/field-notes/:slug`, `/about`, `/resume`, and `/contact`.
- Keep one public resume download: `/assets/Earl-Hickson-Jr-Resume.pdf`.
- Use page-scoped metadata with `https://ehicksonjr.com` canonicals.

## Route migration

| Legacy route | Canonical destination |
| --- | --- |
| `/projects`, `/case-studies` | `/work` |
| `/projects/WithYou` | `/work/withyou` |
| `/projects/DojoNet-Prototype-MAX` | `/work/dojonet` |
| `/projects/Gundam-Forge` | `/work/gundam-forge` |
| `/blog` | `/field-notes` |
| `/blog/:slug` | `/field-notes/:slug` where a matching note exists; otherwise index |
| `/how-i-think`, `/approach` | `/research` |

Unrelated legacy experiments remain unlinked while source files are retained for archival safety.

## Component migration

- Replace the global header/footer with accessible canonical navigation.
- Add editorial page headers, evidence labels, capability diagrams, investigation reading-mode controls, and reusable project/professional rows.
- Adapt the HCEPS prototype arguments into React Router-compatible, stateful local prototypes. Do not embed adjacent applications.
- Retain React Helmet and analytics rather than importing Next metadata or Vercel Analytics.

## Content migration

- Migrate the HCEPS thesis, three investigation structures, research direction, About narrative, Field Notes, and evidence policy.
- Merge useful verified professional history from the existing site and archive into the central profile/experience data.
- Archive rather than delete legacy blog, case-study, BJJ, and design-brand source files.
- Remove unsupported metrics and shipping/compliance claims from canonical public routes.

## Design-system migration

- Foundation: Obsidian, Carbon, Graphite, Warm Bone, Sand, Ink, Mist.
- Project accents: Orchid/Terracotta, Emerald/Solar Gold, Cobalt/Royal Violet.
- Typography: Source Serif 4, Manrope, JetBrains Mono with system fallbacks.
- Alternate editorial and technology modes with consistent focus, reduced-motion, and responsive behavior.

## Asset migration

- Copy only HCEPS implementation captures, design captures, Open Graph SVGs, and the final verified resume.
- Publish files under `client/public/assets/brand` and `client/public/assets/projects`.
- Label captures by evidence type. Do not copy `node_modules`, `.next`, output, temporary files, `.DS_Store`, or `__MACOSX`.

## Risk areas

- Existing public claims conflict with the archive audit and must not remain on canonical pages.
- The completed public Contact page uses direct email and a copy-address action. The retained server endpoint still has a honeypot and basic in-process rate limit, but it is not part of the public interaction and requires SendGrid only if reintroduced.
- The archive resume has a visible ampersand encoding defect and needs regeneration.
- Several legacy employer metrics and role-date variants conflict; canonical pages use the conservative archive history.
- Static hosts require SPA fallbacks plus client redirects; direct HTTP 301/308 rules remain deployment-specific.

## Implementation order

1. Create typed data, tokens, navigation, route map, and documentation.
2. Build shared shell, metadata, editorial/technology primitives, and prototypes.
3. Rebuild Home and Work.
4. Build three investigation routes and prototypes.
5. Build Research, Field Notes, About, Resume, and Contact.
6. Add redirects, assets, sitemap, robots, and canonical metadata.
7. Regenerate the PDF resume; run type, lint, build, test, accessibility, and responsive checks.

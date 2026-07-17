# SEO and Indexing Review

Review date: 2026-07-16

Canonical domain: `https://ehicksonjr.com`

## Implemented

- The Vite HTML transform reads the canonical professional record for the base
  name, title, summary, email, LinkedIn, GitHub, and Person JSON-LD.
- Each canonical route has a unique in-app title, description, canonical URL,
  Open Graph title/description/image, and Twitter metadata.
- The production build creates a static `index.html` shell for each canonical
  route so first-response metadata does not depend on client JavaScript.
- Field Note shells use `og:type=article` and Article JSON-LD with publication
  date, author, and main entity URL.
- The main document includes Person JSON-LD with UX Engineer as the only title.
- `sitemap.xml` contains only indexable canonical native routes.
- `/graduate-review` and its application CV use no-index directives and are
  intentionally absent from the sitemap.
- HCEPS handoff files and standalone prototypes are removed from production
  output. Robots and Netlify header rules remain as defense in depth.
- Legacy public resume URLs permanently redirect to the one canonical PDF.
- Legacy portfolio routes have permanent Netlify redirects and React fallbacks.

## Validation

`npm run build` generates and verifies 14 metadata shells. A build fails if a
shell does not contain its expected title and canonical URL.

## Remaining operational check

After deployment, request representative route HTML with JavaScript disabled and
verify the Netlify custom domain serves the new static shells. Resubmit the
sitemap only after the branch is merged and deployed.

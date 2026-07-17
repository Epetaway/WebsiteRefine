# Route Migration

Canonical domain: `https://ehicksonjr.com`

| Canonical route | Purpose |
| --- | --- |
| `/` | Professional identity, selected work, thesis, trajectory, practice, notes, career CTA |
| `/work` | Selected investigations and professional practice |
| `/work/withyou` | WithYou investigation |
| `/work/dojonet` | DojoNet investigation |
| `/work/gundam-forge` | Gundam Forge investigation |
| `/research` | Human-centered product inquiry and evidence position |
| `/field-notes` | Editorial journal index |
| `/field-notes/:slug` | Individual note |
| `/about` | Practitioner trajectory and current direction |
| `/resume` | One public online resume and one PDF download |
| `/contact` | Direct email, copy-address action, and reasons to write |
| `/graduate-review` | Focused, no-index admissions review path and graduate CV |

Legacy React routes use `<Navigate replace>`, and Netlify permanent redirects
send known legacy paths directly to canonical destinations. Remaining route
requests use the SPA fallback. This preserves destinations without redirect
loops while keeping only canonical routes in the sitemap.

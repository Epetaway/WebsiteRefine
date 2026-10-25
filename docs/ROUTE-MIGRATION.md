# Route Migration

Canonical domain: `https://ehicksonjr.com`

| Canonical route | Purpose |
| --- | --- |
| `/` | Professional identity, selected work, thesis, trajectory, practice, notes, career CTA |
| `/work` | Selected investigations and professional practice |
| `/work/withyou` | WithYou investigation |
| `/work/dojonet` | DojoNet investigation |
| `/work/gundam-forge` | Gundam Forge investigation |
| `/work/earl-the-kaiju` | Earl the Kaiju flagship case study (brand, website, Kaiju Coach) |
| `/research` | Human-centered product inquiry and evidence position |
| `/field-notes` | Editorial journal index |
| `/field-notes/:slug` | Individual note |
| `/about` | Practitioner trajectory and current direction |
| `/resume` | One public online resume and one PDF download |
| `/contact` | Direct contact methods and retained contact form |

Earl the Kaiju legacy destinations: `/earldkaiju` and `/EarldKaiju` (React Router matches case-insensitively), `/earl-the-kaiju`, `/projects/earl-the-kaiju` and `/projects/earldkaiju` all go to `/work/earl-the-kaiju`. The same entries are in `_redirects`, `client/public/_redirects`, `vercel.json` and `netlify.toml`; on GitHub Pages (the current host) the SPA fallback hands them to the client router. When the coaching site has a verified URL, decide whether `/earldkaiju` should point there instead.

Legacy React routes use `<Navigate replace>` and static host configuration continues to send requests to the SPA entry point. This preserves destinations without creating loops. Server-level permanent redirects can be added at the hosting layer after deployment ownership is verified.

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
| `/contact` | Direct contact methods and retained contact form |

Legacy React routes use `<Navigate replace>` and static host configuration continues to send requests to the SPA entry point. This preserves destinations without creating loops. Server-level permanent redirects can be added at the hosting layer after deployment ownership is verified.

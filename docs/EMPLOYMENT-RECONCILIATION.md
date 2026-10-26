# Employment Reconciliation

Audit date: 2026-10-25 (supersedes the 2026-07-17 audit)

Source of truth: Earl's résumé dated 2026-10-24 ("Lead Front-End Résumé (2026)"). `client/src/data/professional/experience.ts` carries it into the site; `resume/content.json` is generated from that file, and the PDF generator consumes the JSON. Older `.dc.html` documents are reference archives, not career-data authorities.

| Employer | Role | Location | Dates | Published |
| --- | --- | --- | --- | --- |
| AMA Fight Club | Front-End Developer & Brazilian Jiu-Jitsu Professor | Cedar Knolls, NJ | Jan 2025 — Present | Yes; the only role allowed to use `Present` (`confirmedCurrentRoles`) |
| Freelance and Contract | Independent Front-End Developer | Remote | Nov 2024 — Oct 2025 | Yes, with two engagements below |
| ↳ Tabby's Place: A Cat Sanctuary | Front-End Developer, Contract | — | Oct 2025 | Yes |
| ↳ Wealth Creation Innovation | Senior Front-End Developer, Contract | — | Nov — Dec 2024 | Yes |
| Asembia | Front-End Developer | Florham Park, NJ | Dec 2023 — Oct 2024 | Yes |
| BroadcastMed / Conexiant | Lead Designer & Front-End Developer | Remote | Aug 2021 — Feb 2023 | Yes (dates corrected from Nov 2021 — Mar 2023) |
| Prosek Partners | Front-End Developer, Contract | Remote | Apr 2021 — Sep 2021 | Yes (newly published) |
| William R. Seide Agency LLC | Front-End Developer, Contract | New Jersey | Jan 2020 — Jun 2020 | Yes (newly published) |
| Merkle | Email Marketing Specialist, Contract | Remote | Nov 2018 — Jul 2019 | Yes (newly published) |
| Kirshenbaum Bond Senecal + Partners, Second Melody | Front-end and digital design roles | — | 2013–2017 | One "Earlier" line only, as on the résumé |
| Current flagger employer | — | — | — | Omitted (not on the résumé) |

## Removed

- **Merck, Freelance Front-End Developer, 2019** and **Verizon Wireless, Front-End Developer, 2015–2016** are not on the 2026-10-24 résumé and were removed. `scripts/validate-content.ts` and `scripts/validate_pdfs.py` now block both names so they cannot return by accident.

## Surface reconciliation

- Home and Work render the `experience` ledger plus the `earlierExperience` line.
- The Resume page and the public PDF follow the résumé's section order: Summary, Technical Skills, Professional Experience, Selected Projects, Coaching and Leadership, Education and Certifications.
- The graduate CV uses each role's one-line summary instead of the full bullets.
- About discusses trajectory without duplicating the chronology.
- `resume/content.json` is generated with `npm run content:export`; both PDFs with `npm run documents:generate`.
- The public PDF leaves out the phone number on the emailed résumé, because the PDF is a public download.

## Known differences from the résumé

- **IBM Full Stack Software Developer Professional Certificate** stays on the site (Earl's decision, 2026-10-25) although the résumé lists only the two Team Treehouse certificates.
- **Gundam Forge** shows as `Beta` with no live link. The résumé says "Public beta · epetaway.github.io/Gundam-Forge", but that URL returned GitHub Pages' 404 on 2026-10-25.
- **LinkedIn**: the site, the résumé and both PDFs use `linkedin.com/in/earl-hickson-jr`, the live profile (checked 2026-10-26). The `earlhicksonjr` URL adopted on 2026-10-25 returns LinkedIn's 404 and was reverted with Earl's approval on 2026-10-26.

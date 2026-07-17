# Employment Reconciliation

Audit date: 2026-07-17

`client/src/data/professional/experience.ts` is the final public chronology. `resume/content.json` is generated from it, and the PDF generator consumes that JSON. Older `.dc.html` documents are reference archives, not career-data authorities.

| Employer | Role | Start | End | Current website | Native React data | Resume JSON | PDF generator | Design document | LinkedIn | Verified final value | Publication decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AMA Fight Club | Front-End Developer & Digital Integration Specialist | Jan 2025 | 2025, month unknown | Same canonical value | Canonical | Generated | Generated | Older values ignored | Update recommended | `Jan 2025 — 2025` pending exact end month | Publish conservatively; no `Present` |
| Asembia | Front-End Developer | Dec 2023 | Oct 2024 | Same canonical value | Canonical | Generated | Generated | Reference only | Update recommended | `Dec 2023 — Oct 2024` | Publish |
| BroadcastMed | Lead Designer & Front-End Developer | Nov 2021 | Mar 2023 | Same canonical value | Canonical | Generated | Generated | Reference only | Update recommended | `Nov 2021 — Mar 2023` | Publish |
| Merck | Freelance Front-End Developer | 2019 | 2019 | Same canonical value | Canonical | Generated | Generated | Reference only | Update recommended | `2019` | Publish year only |
| Verizon Wireless | Front-End Developer | 2015 | 2016 | Same canonical value | Canonical | Generated | Generated | Reference only | Update recommended | `2015 — 2016` | Publish years only |
| Current flagger employer | Unknown | Unknown | Unknown/current unknown | Not published | Excluded | Excluded | Excluded | Not authoritative | Confirmation required | No verified value | Omit |
| Tabby’s Place | Unknown | Unknown | Unknown | Not published | Excluded | Excluded | Excluded | Historical fragment only | Confirmation required | No verified value | Omit |
| Prosek Partners | Unknown | Unknown | Unknown | Not published | Excluded | Excluded | Excluded | Historical fragment only | Confirmation required | No verified value | Omit |
| William R. Seide Agency | Unknown | Unknown | Unknown | Not published | Excluded | Excluded | Excluded | Historical fragment only | Confirmation required | No verified value | Omit |
| Merkle | Unknown | Unknown | Unknown | Not published | Excluded | Excluded | Excluded | Historical fragment only | Confirmation required | No verified value | Omit |
| Second Melody | Unknown | Unknown | Unknown | Not published | Excluded | Excluded | Excluded | Historical fragment only | Confirmation required | No verified value | Omit |
| KBS&P | Engagements and internship status unresolved | Unknown | Unknown | Not published | Excluded | Excluded | Excluded | Conflicting archive values | Confirmation required | No verified value | Omit; do not merge engagements |

## Surface reconciliation

- Homepage and Work read `experience` directly.
- Resume page reads `experience` directly.
- About discusses trajectory and transition without duplicating chronology.
- `resume/content.json` is generated with `npm run content:export`.
- Public résumé and graduate CV are produced by `scripts/generate_resume_pdf.py`.
- Person structured data does not duplicate employer chronology.
- Application forms should copy the values above until a confirmed update is made.

## LinkedIn update recommendations

- Use `UX Engineer` as the headline identity.
- Match the five published entries and conservative date precision exactly.
- Do not mark AMA Fight Club current until confirmed.
- Keep the current non-technology role private or omitted until Earl makes an explicit publication decision.
- Add omitted historical employers only after separate engagement records are verified.

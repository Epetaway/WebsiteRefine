# Resume system

`content.json` is the single source of truth for Earl's resume — all facts,
bullets, and skills, each tagged per variant (`ux`, `fe`). `generate.mjs`
renders that content into the tailored Markdown resumes in `output/`.

## Regenerating

```bash
node resume/generate.mjs
```

This overwrites `resume/output/Earl_Hickson_Jr_UX_Engineer_Resume.md` and
`resume/output/Earl_Hickson_Jr_Front_End_Engineer.md`.

## Publishing to the site

The site serves `.docx` downloads from `client/public/assets/`
(`RESUME_PATH` in `client/src/data/projects.ts` points at the UX Engineer
version). After editing `content.json` and regenerating the Markdown,
convert to `.docx` with [pandoc](https://pandoc.org/) and copy into place:

```bash
node resume/generate.mjs
pandoc resume/output/Earl_Hickson_Jr_UX_Engineer_Resume.md \
  -o client/public/assets/Earl_Hickson_Jr_UX_Engineer_Resume.docx \
  --metadata title="Earl Hickson Jr. — UX Engineer Resume"
pandoc resume/output/Earl_Hickson_Jr_Front_End_Engineer.md \
  -o client/public/assets/Earl_Hickson_Jr_Front_End_Engineer.docx \
  --metadata title="Earl Hickson Jr. — Front-End Engineer Resume"
```

## Adding a new variant (e.g. an HCI graduate CV)

1. Add an entry under `variants` (title, file base name, summary).
2. Add matching entries under `skills`, `education`, `projects`, and
   (optionally) `areasOfInterest` keyed to the new variant name.
3. Add a `bullets.<variant>` array to each `experience` entry you want that
   variant to include.
4. Re-run `node resume/generate.mjs`.

## Editing content

Every fact in `content.json` (employers, dates, metrics, certifications)
should trace back to something Earl actually did — don't add achievements,
metrics, or history that aren't verified. When rephrasing a bullet for a
new variant, keep the underlying claim identical; only the framing changes.

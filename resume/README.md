# Professional document system

The former multi-variant resume data and Markdown outputs were removed because
they conflicted with the site's one-public-resume policy.

Canonical professional facts live in
`client/src/data/professionalFacts.json`. Generate the public resume and the
application-specific graduate CV with:

```bash
npm run documents:generate
```

Validate filenames, page counts, metadata, and expected selectable text with:

```bash
npm run documents:validate
```

Only `client/public/assets/Earl-Hickson-Jr-Resume.pdf` is a public resume. The
graduate CV is linked only from the no-index graduate-review path.

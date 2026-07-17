# Canonical document data

`content.json` is generated from `client/src/data/professional` and the
canonical investigation and Field Note records. Do not edit it manually.

Generate the public employment resume and the application-specific graduate CV:

```bash
python3 -m venv tmp/pdf-venv
tmp/pdf-venv/bin/pip install reportlab pdfplumber pypdf
npm run documents:generate
```

The command refreshes `resume/content.json`, creates stable delivery copies in
`output/pdf/`, and copies the public files to:

```text
client/public/assets/Earl-Hickson-Jr-Resume.pdf
client/public/assets/application/Earl-Hickson-Jr-HCI-Graduate-CV.pdf
```

Validate text, metadata, page count, link annotations, and minimum font size:

```bash
npm run validate:pdf
```

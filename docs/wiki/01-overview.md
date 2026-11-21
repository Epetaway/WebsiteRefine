# 1. Overview

[← Wiki home](README.md) · Next: [Architecture →](02-architecture.md)

## Who it's for

Recruiters, hiring managers and engineers deciding whether to talk to me. Each of them needs to work out, quickly:
- what role I do (Lead Front-End Engineer)
- whether my engineering is real
- whether I understand design beyond how things look
- how to reach me

## What it has to prove

A portfolio is a set of claims. The site's job is to make those claims easy to check:

- **Case studies show evidence, not adjectives.** Code excerpts link to exact lines at a specific commit. Screenshots carry a source. Limitations are published next to the work.
- **The résumé and the site agree.** The public title, the employers and the dates come from one résumé record, and the build checks it.
- **Status words mean something.** "Built," "designed," "partial" and "known gap" are used consistently across every project.

## What's on the site

| Area | Route | Notes |
|---|---|---|
| Home, Work, About, Résumé, Contact | `/`, `/work`, `/about`, `/resume`, `/contact` | Contact uses direct links; no unverified form |
| WithYou case study | `/work/withyou` | Brand, product and privacy engineering |
| WithYou engineering notes | `/work/withyou/engineering` | Public overview; full notes shared on approval |
| Earl the Kaiju, Gundam Forge, DojoNet | `/work/...` | Bespoke case-study pages |
| Field Notes | `/field-notes`, `/field-notes/:slug` | Short essays tied to the projects |
| Research | `/research` | Themes across the projects |

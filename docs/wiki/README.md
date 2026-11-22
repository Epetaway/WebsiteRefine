# ehicksonjr.com: Project Wiki

This repository is my portfolio site, [ehicksonjr.com](https://ehicksonjr.com). It's a working product with its own engineering standards: a React SPA with bespoke case-study pages, Field Notes, a résumé, and since November 2026, an approval-gated engineering notes page backed by a small serverless API.

The design problem is specific. A portfolio makes claims about the person who built it, so this one is built to **make claims checkable**. Every case study separates what's built from what's designed and what's a known gap, and a build script fails if unsupported claims creep back in.

> **Status:** Live on GitHub Pages. The access API for gated notes runs on Vercel once it's configured ([`docs/ACCESS-GATE.md`](../ACCESS-GATE.md)).

## The short version

| | |
|---|---|
| **My role** | Designer and front-end engineer, sole owner. I direct AI coding assistants for parts of the work (GitHub Copilot's agent authored 66 of 391 commits, and Claude co-authored others) and review everything before it merges. |
| **Stack** | React, Vite, TypeScript, react-router, Tailwind, Express, Vitest and Testing Library; Neon Postgres, SendGrid and a Vercel function for gated content |
| **Scale** | 391 commits since Aug 2025; 18 test files with 137 tests; 17 prerendered routes; four bespoke case studies |
| **Hardest problems** | Keeping claims honest as content changes; SEO for a single-page app on static hosting; real access control on a static site |

## Read in this order

1. **[Overview](01-overview.md)**: who the site is for and what it has to prove
2. **[Architecture](02-architecture.md)**: SPA plus prerender, case-study system, deploy targets, and the access API
3. **[Content governance](03-content-governance.md)**: how the build stops unsupported claims
4. **[Key decisions](04-decisions.md)**: what I chose and what it cost
5. **[Quality](05-quality.md)**: tests, accessibility and performance results, and known limitations

## Questions I'd enjoy being asked about

- Why does the build fail if a page says "production-ready"?
- How do you get per-page SEO metadata from a single-page app on GitHub Pages?
- Why a server-side gate instead of a password field in the page?
- What did the claim audit remove from the site, and why?

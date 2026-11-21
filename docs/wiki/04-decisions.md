# 4. Key decisions

[← Content governance](03-content-governance.md) · Next: [Quality →](05-quality.md)

## 1. Static hosting, prerendered metadata

**Decision:** Host the SPA on GitHub Pages, and prerender one HTML file per route for metadata.

**Why:** It's free, fast and has nothing to operate. Prerendering solves the SPA's weak point, link previews and SEO, without moving to a server-rendered framework.

**Cost:** Every new route needs a metadata entry. A test enforces that so it can't be forgotten.

## 2. Bespoke case-study pages over one template

**Decision:** Each flagship project has its own page in its own brand, sharing a small kit where it helps.

**Why:** Each project has its own brand, and a designer's portfolio should show that range. The bespoke pages replaced a shared investigation template.

**Cost:** More code per project. Shared pieces live in the case-study kit, and a shared record (`investigations.ts`) keeps abstracts, evidence and limitations consistent.

## 3. Content rules enforced by the build

**Decision:** Fail the build on unsupported or retired claims ([Content governance](03-content-governance.md)).

**Why:** Honesty that depends on remembering doesn't hold up across rewrites.

**Cost:** Some legitimate wording needs care. That friction is the point.

## 4. A real server-side gate for private engineering notes

**Context:** I wanted to share deeper notes about a private codebase with people evaluating me, without publishing them.

**Decision:** Keep the locked content on a small Vercel API, released only after I approve a request by email and the visitor signs in. The rejected alternative was a password field in the page.

**Why:** On a static site, a client-side password is decoration. The content still ships in the JavaScript.

**Cost:** A database, an email provider and a function to configure. Visitors wait for my approval, which is why the overview stays public.

## 5. Self-hosted fonts and no blocking third parties

**Decision:** Self-host Latin-subset fonts, preload the two critical ones, and load analytics only when it's configured.

**Why:** Google Fonts was render-blocking. Self-hosting cut a third-party origin from the critical path.

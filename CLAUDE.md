# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Source for Earl Hickson Jr.'s portfolio site (ehicksonjr.com) — a React SPA (case studies, Field Notes, résumé, contact) backed by a single Express server. The old BJJ microsite at `/earldkaiju` is archived; that path now redirects to the Earl the Kaiju case study at `/work/earl-the-kaiju` (`client/src/pages/earl-the-kaiju.tsx`, content in `client/src/data/earlTheKaiju.ts`, record in `docs/EARL-THE-KAIJU-CASE-STUDY.md`). Monorepo with three top-level source trees: `client/` (Vite + React), `server/` (Express API), `shared/` (Drizzle schema + Zod validators consumed by both).

## Commands

```bash
npm run dev         # start Express + Vite dev middleware (one process, one port)
npm run build        # vite build (client) + esbuild bundle of server/index.ts -> dist/
npm start            # run the production build (dist/index.js)
npm run check         # tsc --noEmit, project-wide type check
npm run lint          # eslint . --ext .ts,.tsx --max-warnings=0
npm run lint:fix      # eslint --fix
npm run db:push       # drizzle-kit push (schema in shared/schema.ts)
```

- There is no test suite / test runner configured (no `test` script, no Jest/Vitest config). `tsconfig.json` excludes `**/*.test.ts` defensively but none exist.
- To lint or type-check a single file, run `eslint <path>` directly (the `check` script is always project-wide since `tsc` has no per-file mode here).
- Dev server listens on `process.env.PORT || 3000` bound to `127.0.0.1` (see `server/index.ts`) — the README's "visit :5000" is stale.

## Architecture

### Server

`server/app.ts`'s `createApp()` builds the shared Express app (middleware, `registerRoutes` from `server/routes.ts`, error handler, `/assets` static) used by every entrypoint. `server/index.ts` is the dev/generic-Node entrypoint (`npm run dev`, `npm start`, Railway/Replit): in development it dynamically imports `server/vite.ts` for Vite's dev middleware (`setupVite`); in production it serves the built client via `serveStatic` (`server/static.ts`). `server/vercel.ts` is a separate entrypoint used only by `vercel.json`'s `@vercel/node` build — it calls `createApp()` + `serveStatic` directly and deliberately never imports `server/vite.ts`, even dynamically, because Vercel's function bundler statically traces every reachable `import`/`require` (ignoring runtime `if` guards) and would otherwise pull `vite`/`esbuild`/`rollup` (devDependencies) into the deployed function, blowing past Vercel's 250MB uncompressed function size limit. Keep new dev-only tooling imports out of `server/vercel.ts`'s reachable graph for the same reason. Alternate deploy targets wrap the same Express app rather than re-implementing it: `netlify/functions/server.cjs` (CommonJS, hence `.cjs` under the root `"type": "module"`) adapts it via `serverless-http` for Netlify; `build.sh` covers Railway.

Data access goes through `server/storage.ts`'s `IStorage` interface, currently implemented only by `MemStorage` (in-memory `Map`s). `shared/schema.ts` defines the real Drizzle/Postgres tables and Zod insert schemas (users, contacts, bjjBookings, socialMediaPosts) and `drizzle.config.ts`/`db:push` exist to migrate a real Postgres (Neon) database — but nothing in `server/routes.ts` currently talks to it; all reads/writes go through the in-memory store. Don't assume data persists across restarts.

### Path aliases

`@/*` → `client/src/*`, `@shared/*` → `shared/*` (defined in both `tsconfig.json` and `vite.config.ts` — keep them in sync if you add more).

### Client routing

`client/src/App.tsx` uses **react-router-dom** (`Routes`/`Route`) as the active router. `wouter` is still a dependency and is still imported by a few not-yet-migrated files (`hooks/use-analytics.tsx`, `pages/blog-post.tsx`, `pages/article.tsx`) — treat those as leftovers from an in-progress migration, not a second routing system to design around.

### Theming — two unrelated systems, same vocabulary

- `contexts/ThemeContext.tsx` (`ThemeProvider`/`useTheme`) controls **page chrome** only: a `pageChrome: 'light' | 'dark'` flag that `AppShell` uses to flip the outer page background/text color. The site is always visually dark-mode under the hood (`theme: 'dark'` is hardcoded, `toggleTheme` is a no-op) — this is not a user-facing light/dark switch.
- Each case study additionally carries its own `DarkCaseStudyTheme` (accent/surface/border colors, defined per-project in that study's `theme.ts`) that styles its internal template. A case study's `index.tsx` typically calls `setPageChrome('light')` on mount / resets to `'dark'` on unmount, independent of its own `DarkCaseStudyTheme`. Don't conflate the two when changing either.

### Case study system

`client/src/components/case-study/` is a shared component library used by **two parallel per-project templates**:

- `PremiumCaseStudyTemplate` + `PremiumCaseStudyData` (`types.ts`) — the original template (Overview → Challenge → Goals → Process → Prototype → Features → Tech Stack → Code → Metrics → Learnings → Next).
- `DesignDocCaseStudyTemplate` + `DesignDocCaseStudyData` — a newer, richer template modeled on a full claude.ai design-doc export (Overview → Problem → Opportunity → Goals → Research → Design Principles → Information Architecture → Features → Visual Design → Technical Architecture → Design System → Accessibility → Challenges → Outcomes → Reflection → Next Steps). TOC numbering here is auto-derived from the `TOC_SECTIONS` array (`eyebrowFor`) so section order and displayed numbers can't drift apart.

Both templates render through the same `PremiumCaseStudyLayout` shell and share section components (`CaseStudyHero`, `CaseStudyMetaStrip`, `CaseStudyTOC`, `CaseStudyFeatureCarousel`, etc.) — when adding a new section, add it once here and wire it into whichever template(s) need it rather than forking.

Each project lives under `client/src/case-studies/<slug>/`: `data.tsx` (content, typed against one of the two `*Data` types), `theme.ts` (`DarkCaseStudyTheme`), `index.tsx` (sets page chrome, renders the matching template with that data). `client/src/pages/case-study.tsx` special-cases known dedicated slugs by rendering their components directly (check the `canonicalSlug` checks near the top of that file for the current list — it's edited often); anything else falls through to a legacy generic inline template driven by `client/src/data/caseStudies.ts`. That legacy page's screenshot-fetching `useEffect` (GitHub API lookup) runs on every visit to `/projects/:slug` regardless of which branch actually renders, since hooks execute before the early-return — expect harmless 404s in the console for dedicated case studies that don't set a `repo` screenshots folder.

**Prototype viewing**: `data.prototype` (optional on both `*Data` types, shape `{ url, label?, description? }`) renders as `ProtectedPrototypeButton` — in `CaseStudyHero`'s CTA row for the Premium/DesignDoc templates, inline in the legacy generic template. It's a password gate, not a viewer: the button POSTs to `/api/prototype-access` (checked server-side against `PROTOTYPE_ACCESS_PASSWORD`, `server/routes.ts`, so the password never ships in the client bundle), and on success stores an expiry timestamp in `localStorage` for `PROTOTYPE_ACCESS_TTL_MINUTES` (default 30) before opening `url` in a new tab — one password unlocks every prototype on the site until it expires, then it's asked again. Both env vars need setting locally (`.env`, gitignored) for the flow to work at all; unset password → the endpoint 500s intentionally rather than silently allowing access.

### Deployment

Multi-target by design: Netlify (`netlify.toml` + serverless function), Vercel (`vercel.json`), Railway/Replit (`.replit`, `build.sh`). All share the same Express app — see Server section above.

// Post-build step: writes one static HTML file per canonical route, each with that route's own
// <title>, description, canonical URL, Open Graph, Twitter and JSON-LD tags in the raw HTML.
//
// Why: the site is a client-rendered SPA. On GitHub Pages, any path without a real file was
// answered by 404.html (a copy of index.html) with HTTP 404 and the homepage's head tags.
// Crawlers and link-preview bots don't run JavaScript, so every deep link looked like a missing
// homepage. With a real file per route, GitHub Pages answers 200 and the head is correct before
// any script runs. The body is unchanged: React boots and renders the page as before, and
// react-helmet-async takes over the tags marked data-rh="true".
//
// Also writes:
//  - 404.html: the SPA fallback for unknown paths, marked noindex with the not-found title.
//  - a small redirect page for each legacy URL (client/src/data/legacyRoutes.ts).
//
// Run after `vite build` (wired into `npm run build`). Values come from client/src/data/routeMeta/,
// the same module the pages' <SEO> components read.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  legacyRedirects,
  notFoundMeta,
  resolveHead,
  routeMeta,
  type RouteMeta,
} from "../client/src/data/routeMeta";
import { routeFile } from "./route-files";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist/public");
const shellPath = path.join(dist, "index.html");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// JSON inside <script> only needs "<" neutralised so no value can close the tag.
const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

type HeadOptions = { canonical?: boolean; robots?: string; refreshTo?: string };

function headTags(meta: RouteMeta, options: HeadOptions = {}) {
  const head = resolveHead(meta);
  const withCanonical = options.canonical ?? true;
  const tag = (html: string) => `    ${html}`;
  const meta_ = (attr: "name" | "property", key: string, value: string) =>
    tag(`<meta data-rh="true" ${attr}="${key}" content="${escapeHtml(value)}" />`);

  return [
    tag(`<title>${escapeHtml(head.title)}</title>`),
    meta_("name", "description", head.description),
    withCanonical ? tag(`<link data-rh="true" rel="canonical" href="${escapeHtml(head.canonical)}" />`) : null,
    options.robots ? tag(`<meta name="robots" content="${escapeHtml(options.robots)}" />`) : null,
    options.refreshTo
      ? tag(`<meta http-equiv="refresh" content="0; url=${escapeHtml(options.refreshTo)}" />`)
      : null,
    meta_("property", "og:title", head.title),
    meta_("property", "og:description", head.description),
    withCanonical ? meta_("property", "og:url", head.canonical) : null,
    meta_("property", "og:type", head.type),
    head.publishedTime ? meta_("property", "article:published_time", head.publishedTime) : null,
    meta_("property", "og:site_name", "Earl Hickson Jr."),
    tag(`<meta property="og:locale" content="en_US" />`),
    meta_("property", "og:image", head.image),
    meta_("property", "og:image:alt", head.imageAlt),
    meta_("name", "twitter:card", "summary_large_image"),
    meta_("name", "twitter:title", head.title),
    meta_("name", "twitter:description", head.description),
    meta_("name", "twitter:image", head.image),
    meta_("name", "twitter:image:alt", head.imageAlt),
    head.jsonLd
      ? tag(`<script data-rh="true" type="application/ld+json">${safeJson(head.jsonLd)}</script>`)
      : null,
  ]
    .filter(Boolean)
    .join("\n");
}

// The tags client/index.html hard-codes for the homepage. Each is removed and rewritten per route.
const replaceable = [
  /\s*<title>[\s\S]*?<\/title>/g,
  /\s*<meta\b[^>]*\bname="(?:description|robots|twitter:[^"]*)"[^>]*>/g,
  /\s*<meta\b[^>]*\bproperty="(?:og:[^"]*|article:[^"]*)"[^>]*>/g,
  /\s*<link\b[^>]*\brel="canonical"[^>]*>/g,
];

const shell = readFileSync(shellPath, "utf8");
const marker = "<!--route-head-->";
const template = (() => {
  // Put the marker where <title> was, then strip every replaceable tag.
  const titleAt = shell.search(/<title>/);
  if (titleAt === -1) throw new Error("dist/public/index.html has no <title>; was it built?");
  let html = `${shell.slice(0, titleAt)}${marker}${shell.slice(titleAt)}`;
  for (const pattern of replaceable) html = html.replace(pattern, "");
  // Every built asset must be root-absolute so nested routes (/field-notes/x) load it.
  const relative = html.match(/\b(?:src|href)="(?!\/|https?:|mailto:|data:|#)[^"]+"/g);
  if (relative) throw new Error(`index.html has relative asset references: ${relative.join(", ")}`);
  return html;
})();

const render = (head: string) => template.replace(marker, head.trimStart());

function write(relative: string, html: string) {
  const file = path.join(dist, relative);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const written = new Set<string>();
function writeRoute(routePath: string, html: string) {
  const file = routeFile(routePath);
  if (written.has(file)) throw new Error(`Two routes write ${file}.`);
  written.add(file);
  write(file, html);
}

// 1. Canonical routes.
for (const meta of routeMeta) {
  writeRoute(meta.path, render(headTags(meta, { robots: "index,follow" })));
}

// 2. Unknown paths: GitHub Pages serves 404.html with a 404 status.
write("404.html", render(headTags(notFoundMeta, { canonical: false, robots: "noindex" })));

// 3. Legacy URLs: a static page that carries the destination's head and refreshes to it.
const metaByPath = new Map(routeMeta.map((meta) => [meta.path, meta]));
for (const { from, to } of legacyRedirects) {
  const target = metaByPath.get(to);
  if (!target) throw new Error(`Legacy redirect ${from} points at ${to}, which isn't a canonical route.`);
  const head = headTags(target, { refreshTo: to });
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
${head}
    <script>location.replace(${safeJson(to)} + location.search + location.hash);</script>
  </head>
  <body>
    <p>This page moved to <a href="${escapeHtml(to)}">${escapeHtml(resolveHead(target).canonical)}</a>.</p>
  </body>
</html>
`;
  writeRoute(from, html);
}

process.stdout.write(
  `Prerendered head metadata for ${routeMeta.length} routes, 404.html, and ${legacyRedirects.length} legacy redirects.\n`,
);

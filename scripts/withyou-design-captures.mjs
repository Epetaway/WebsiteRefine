#!/usr/bin/env node
// Renders WithYou's design source files to PNG for scripts/withyou-assets.mjs.
//
// The design files are self-contained HTML exports (React + Babel from unpkg, Inter and
// JetBrains Mono from Google Fonts). They are served read-only from a local static server
// and captured at 2x with Playwright. Nothing is edited; a few captures click the export's
// own controls (platform and theme toggles) before the screenshot.
//
//   DESIGN_DIR     the WithYou design-system export (default: ../../Design/withyou)
//   APP_REPO_DIR   a checkout of the WithYou app repository at 612da33 (default: ../withyou)
//   CAPTURES_DIR   output (default: tmp/withyou-captures)
//   CHROME_BIN     a Chrome/Chromium executable (default: the macOS Google Chrome path)
//   VENDOR_DIR     optional: a node_modules folder holding react@18.3.1, react-dom@18.3.1,
//                  @babel/standalone, @fontsource/inter and @fontsource/jetbrains-mono, used
//                  instead of the CDNs when the machine running this has no network access.
//   ONLY           optional: comma-separated capture ids to (re)render; default is all of them.
//
// scripts/withyou-harness/ holds one extra page, social-posts.html, which renders the marketing
// kit's own SocialPost component — the kit defines it but its index page doesn't show it.

import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const designDir = path.resolve(root, process.env.DESIGN_DIR ?? "../../Design/withyou");
const appDir = path.resolve(root, process.env.APP_REPO_DIR ?? "../withyou");
const outDir = path.resolve(root, process.env.CAPTURES_DIR ?? "tmp/withyou-captures");
const vendorDir = process.env.VENDOR_DIR ? path.resolve(process.env.VENDOR_DIR) : null;
const chromePath = process.env.CHROME_BIN ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const types = { ".html": "text/html", ".js": "text/javascript", ".jsx": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".json": "application/json" };
const harnessDir = path.join(root, "scripts/withyou-harness");
const mounts = { "/design/": designDir, "/app/": appDir, "/harness/": harnessDir };
const server = createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const mount = Object.keys(mounts).find((prefix) => url.startsWith(prefix));
  const file = mount ? path.join(mounts[mount], url.slice(mount.length)) : null;
  if (!file || !file.startsWith(mounts[mount]) || !existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  res.end(await readFile(file));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const design = (p) => `${base}/design/${p}`;
const harness = (p) => `${base}/harness/${p}`;
const appDoc = (p) => `${base}/app/${p}`;

const doc = { width: 1440, height: 1000 };
const jobs = [
  // Artboard 03 (image direction) is rebuilt natively on the page from the photo files.
  ...[["brandkit-identity", 0], ["brandkit-components", 1], ["brandkit-handoff", 3]].map(([id, nth]) => ({ id, url: design("ui_kits/brand/index.html"), viewport: { width: 1280, height: 900 }, selector: ".stage .frame", nth })),
  ...["platform-ios", "platform-android", "colors-dark-mode", "components-widgets", "screen-templates"].map((name) => ({ id: `ds-${name}`, url: design(`preview/${name}.html`), viewport: { width: 1200, height: 700 }, fullPage: true, wait: 2000 })),
  { id: "wireframes-canvas", url: design("uploads/WithYou- Wireframe/WithYou Wireframes.html"), viewport: doc },
  { id: "wfmap-title", url: design("uploads/WithYou- Wireframe/WithYou Workflow Map.html"), viewport: doc, clip: { x: 100, y: 40, width: 1240, height: 1520 } },
  { id: "wfmap-user-flow", url: design("uploads/WithYou- Wireframe/WithYou Workflow Map.html"), viewport: doc, selector: "section.major", nth: 3 },
  { id: "flow-graph", url: appDoc("docs/WithYou_Wireframe/WithYou Flow.html"), viewport: doc },
  { id: "hifi-entry", url: appDoc("docs/WithYou_Wireframe/WithYou Prototype.html"), viewport: doc },
  { id: "architecture-doc", url: appDoc("docs/WithYou_Wireframe/WithYou Architecture.html"), viewport: doc, fullPage: true },
  { id: "handoff-ios-light-welcome", url: appDoc("docs/design/handoff-2026-06-29/Prototype.dc.html"), viewport: doc },
  { id: "handoff-android-dark-welcome", url: appDoc("docs/design/handoff-2026-06-29/Prototype.dc.html"), viewport: doc, clicks: ["button:has-text('Android')", "button:has-text('Dark')"] },
  // Marketing UI kit: the desktop landing page, the mobile landing page and the App Store set.
  ...[["mk-landing-desktop", 0], ["mk-landing-mobile", 1], ["mk-appstore-set", 2]].map(([id, nth]) => ({ id, url: design("ui_kits/marketing/index.html"), viewport: doc, selector: ".stage .frame", nth })),
  { id: "mk-social-posts", url: harness("social-posts.html"), viewport: doc, selector: "#posts" },
  ...[["onbspec-principles", "section#principles"], ["onbspec-privacy-screen", "section#screen-privacy"], ["onbspec-matrix", "section#matrix"]].map(([id, selector]) => ({ id, url: appDoc("docs/design/onboarding-redesign/WithYou-Onboarding-Handoff.html"), viewport: doc, selector })),
];

const fontFaces = () =>
  [400, 500, 600, 700].map((w) => `@font-face{font-family:'Inter';font-weight:${w};font-display:block;src:url(${base}/vendor/inter-${w})}`).join("\n") +
  [400, 500, 600, 700].map((w) => `@font-face{font-family:'JetBrains Mono';font-weight:${w};font-display:block;src:url(${base}/vendor/mono-${w})}`).join("\n");

async function routeVendor(page) {
  if (!vendorDir) return;
  await page.route("**/*", async (route) => {
    const url = route.request().url();
    if (url.startsWith(base) && !url.includes("/vendor/")) return route.continue();
    if (url.includes("fonts.googleapis.com")) return route.fulfill({ contentType: "text/css", body: fontFaces() });
    const font = url.match(/\/vendor\/(inter|mono)-(\d+)$/);
    if (font) {
      const pkg = font[1] === "inter" ? "@fontsource/inter/files/inter" : "@fontsource/jetbrains-mono/files/jetbrains-mono";
      return route.fulfill({ contentType: "font/woff2", body: await readFile(path.join(vendorDir, `${pkg}-latin-${font[2]}-normal.woff2`)) });
    }
    const cdn = url.match(/unpkg\.com\/(@?[^@]+)@[^/]+\/(.+)$/);
    if (cdn && existsSync(path.join(vendorDir, cdn[1], cdn[2]))) {
      return route.fulfill({ contentType: "text/javascript", body: await readFile(path.join(vendorDir, cdn[1], cdn[2])) });
    }
    return route.abort();
  });
}

const only = process.env.ONLY ? new Set(process.env.ONLY.split(",").map((id) => id.trim())) : null;

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: chromePath, headless: true });
for (const job of only ? jobs.filter((item) => only.has(item.id)) : jobs) {
  const context = await browser.newContext({ viewport: job.viewport, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await routeVendor(page);
  await page.goto(job.url, { waitUntil: "load" });
  await page.waitForTimeout(job.wait ?? 7000);
  for (const selector of job.clicks ?? []) {
    await page.locator(selector).first().click();
    await page.waitForTimeout(800);
  }
  const out = path.join(outDir, `${job.id}.png`);
  if (job.selector) {
    const element = page.locator(job.selector).nth(job.nth ?? 0);
    await element.scrollIntoViewIfNeeded();
    await element.screenshot({ path: out });
  } else {
    await page.screenshot({ path: out, fullPage: Boolean(job.fullPage), clip: job.clip });
  }
  console.log(`captured ${job.id}`);
  await context.close();
}
await browser.close();
server.close();

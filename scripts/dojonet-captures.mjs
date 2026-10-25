#!/usr/bin/env node
// Captures DojoNet for /work/dojonet (see docs/DOJONET-ASSETS.md).
//
// Runs against a local production build of the public repository Epetaway/DojoNet-Prototype-MAX
// at be2db53 (Oct 28, 2025), served the way GitHub Pages serves it:
//
//   npx vite build && npx vite preview --port 4173 --strictPort
//
// Capture rules — each one is stated on the page:
//   * The demo account is the app's own (demo-data.json). The app seeds it on first load; the
//     capture then reloads once, because two stores race for the session on a first visit (the
//     "fresh-dashboard" capture shows that state on purpose).
//   * Avatars come from a remote avatar service and event photos from remote stock libraries.
//     The capture machine has no network, and the portfolio doesn't publish strangers' faces, so
//     avatars render as a neutral silhouette and photos as the app's own placeholder artwork
//     (public/placeholders/events/*.svg).
//   * Bebas Neue and Inter are served locally (@fontsource 5.3.0, OFL) in place of Google Fonts.
//   * Captures whose id ends in "-fixed" add one CSS rule before the screenshot:
//       :root { --color-primary: var(--accent-primary); }
//     It defines the token the components use but index.css never declares. It demonstrates the
//     fix for this page; it is not in the app repository.
//
//   BASE_URL      default http://localhost:4173/DojoNet-Prototype-MAX/
//   APP_DIR       the DojoNet checkout (for its placeholder SVGs)
//   FONT_DIR      folder holding bebas-neue-latin-400 and inter-latin-{400,500,600,700} woff2
//   CAPTURES_DIR  output (default tmp/dojonet-captures)
//   CHROME_BIN    a Chrome/Chromium executable
//   ONLY          optional comma-separated capture ids

import { readdirSync, readFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = process.env.BASE_URL ?? "http://localhost:4173/DojoNet-Prototype-MAX/";
const OUT = path.resolve(root, process.env.CAPTURES_DIR ?? "tmp/dojonet-captures");
const ONLY = (process.env.ONLY ?? "").split(",").filter(Boolean);
const need = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name} (see the header of this script).`);
  return value;
};
const appDir = need("APP_DIR");
const fontDir = need("FONT_DIR");

const fonts = {
  "bebas.woff2": "bebas-neue-latin-400-normal.woff2",
  "inter-400.woff2": "inter-latin-400-normal.woff2",
  "inter-500.woff2": "inter-latin-500-normal.woff2",
  "inter-600.woff2": "inter-latin-600-normal.woff2",
  "inter-700.woff2": "inter-latin-700-normal.woff2",
};
const fontCss =
  "@font-face{font-family:'Bebas Neue';font-weight:400;src:url(https://fonts.gstatic.com/local/bebas.woff2) format('woff2')}" +
  [400, 500, 600, 700].map((w) => `@font-face{font-family:'Inter';font-weight:${w};src:url(https://fonts.gstatic.com/local/inter-${w}.woff2) format('woff2')}`).join("");
const placeholderDir = path.join(appDir, "public/placeholders/events");
const placeholders = readdirSync(placeholderDir).sort().map((file) => readFileSync(path.join(placeholderDir, file)));
const silhouette = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#E0E0E0"/><circle cx="100" cy="78" r="36" fill="#9CA3AF"/><path d="M28 200c6-44 36-70 72-70s66 26 72 70z" fill="#9CA3AF"/></svg>';
const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const FIX = ":root { --color-primary: var(--accent-primary); }";

const tab = (name) => async (page) => {
  await page.getByRole("button", { name: new RegExp(`^\\s*${name}`) }).first().click();
  await page.waitForTimeout(900);
};
const practicing = async (page) => {
  await tab("Technique Library")(page);
  await page.getByRole("button", { name: /^Practicing$/ }).first().click();
  await page.waitForTimeout(700);
};
const journalComposer = async (page) => {
  await page.getByRole("button", { name: /^Journal$/ }).first().click();
  await page.waitForTimeout(800);
};

const groups = [
  { name: "desktop", w: 1440, h: 900, shots: [
    { id: "dashboard", hash: "#/dashboard" },
    { id: "composer-journal", hash: "#/dashboard", act: journalComposer },
    { id: "training", hash: "#/training" },
    { id: "training-fixed", hash: "#/training", fix: true },
    { id: "techniques", hash: "#/training", act: tab("Technique Library") },
    { id: "techniques-fixed", hash: "#/training", fix: true, act: practicing },
    { id: "progress-fixed", hash: "#/training", fix: true, act: tab("Progress") },
    { id: "journal", hash: "#/journal" },
    { id: "profile-crash", hash: "#/profile/u_demo" },
  ] },
  { name: "fresh", w: 1440, h: 900, fresh: true, shots: [{ id: "fresh-dashboard", hash: "#/dashboard" }] },
  { name: "dark", w: 1440, h: 900, dark: true, shots: [
    { id: "dark-dashboard", hash: "#/dashboard" },
    { id: "dark-techniques", hash: "#/training", act: tab("Technique Library") },
  ] },
  { name: "mobile", w: 390, h: 844, mobile: true, shots: [
    { id: "m-dashboard", hash: "#/dashboard" },
    { id: "m-techniques", hash: "#/training", act: tab("Technique Library") },
    { id: "m-techniques-fixed", hash: "#/training", fix: true, act: practicing },
    { id: "m-journal", hash: "#/journal" },
  ] },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN });
for (const group of groups) {
  const todo = group.shots.filter((shot) => !ONLY.length || ONLY.includes(shot.id));
  if (!todo.length) continue;
  const context = await browser.newContext({
    viewport: { width: group.w, height: group.h },
    deviceScaleFactor: 2,
    isMobile: Boolean(group.mobile),
    hasTouch: Boolean(group.mobile),
    reducedMotion: "reduce",
    colorScheme: "light",
  });
  await context.addInitScript((dark) => { try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch { /* */ } }, Boolean(group.dark));
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === "fonts.googleapis.com") return route.fulfill({ status: 200, contentType: "text/css", body: fontCss });
    if (url.hostname === "fonts.gstatic.com") {
      const file = fonts[url.pathname.split("/").pop()];
      return file ? route.fulfill({ status: 200, contentType: "font/woff2", body: readFileSync(path.join(fontDir, file)) }) : route.abort();
    }
    if (/pravatar|randomuser/.test(url.hostname)) return route.fulfill({ status: 200, contentType: "image/svg+xml", body: silhouette });
    if (route.request().resourceType() === "image" && url.hostname !== "localhost") {
      return route.fulfill({ status: 200, contentType: "image/svg+xml", body: placeholders[hash(url.href) % placeholders.length] });
    }
    if (url.hostname !== "localhost") return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  if (!group.fresh) {
    await page.goto(BASE, { waitUntil: "load" });
    await page.waitForTimeout(2500);
    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(1500);
  }
  for (const shot of todo) {
    await page.goto("about:blank"); // a hash change alone wouldn't reload, and the fix rule must not carry over
    await page.goto(BASE + shot.hash, { waitUntil: "load" });
    await page.waitForTimeout(1800);
    if (shot.fix) await page.addStyleTag({ content: FIX });
    if (shot.act) await shot.act(page).catch((error) => console.warn(`  ${shot.id}: ${error.message.split("\n")[0]}`));
    await page.mouse.move(2, 2);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, `${shot.id}.png`) });
    console.log(`captured ${shot.id}`);
  }
  await context.close();
}
await browser.close();

#!/usr/bin/env node
// Renders the site-page Open Graph images (1200×630 PNG) to client/public/assets/brand/social/.
// LinkedIn, Slack, iMessage and X don't render SVG share images, so these replace the old
// og-*.svg files. The design follows the Field Note cards (client/public/assets/field-notes/):
// the live site's dark tech tokens from client/src/redesign.css, Manrope + JetBrains Mono,
// no serif type. Copy is carried over from the retired SVGs and the pages themselves; add no
// claims here that the pages don't make.
//
//   node scripts/brand-social-images.mjs            render every card
//   node scripts/brand-social-images.mjs home about render some
//
// Needs Chrome or Chromium: set CHROME_BIN, or it tries the usual install paths.

import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fontsDir = path.join(root, "client/public/assets/fonts");
const outDir = path.join(root, "client/public/assets/brand/social");

const cards = {
  home: {
    label: "Earl Hickson Jr. / Lead Front-End Engineer",
    title: "From interface to implementation.",
    lead: "Design systems · Accessibility · Healthcare UI",
    url: "ehicksonjr.com",
  },
  investigations: {
    label: "Work / Case studies",
    title: "Selected case studies",
    lead: "Design decisions. Working interfaces. Clear evidence.",
    url: "ehicksonjr.com/work",
  },
  research: {
    label: "Research / Direction",
    title: "Research direction",
    lead: "I design and build technology that helps people become more capable.",
    url: "ehicksonjr.com/research",
  },
  about: {
    label: "About / Practice",
    title: "Earl Hickson Jr.",
    lead: "Lead Front-End Engineer. Design, engineering and human-centered systems.",
    url: "ehicksonjr.com/about",
  },
  resume: {
    label: "Resume / Professional record",
    title: "Resume",
    lead: "Lead Front-End Engineer. Open to lead and senior front-end roles.",
    url: "ehicksonjr.com/resume",
  },
  contact: {
    label: "Contact / Opportunities",
    title: "Contact Earl Hickson Jr.",
    lead: "Open to lead and senior front-end engineering roles. e@ehicksonjr.com",
    url: "ehicksonjr.com/contact",
  },
  "graduate-review": {
    label: "Graduate review / HCI",
    title: "Graduate Review",
    lead: "Design · Engineering · Independent HCI inquiry",
    url: "ehicksonjr.com/graduate-review",
  },
};

const escape = (value) =>
  value.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function cardHtml({ label, title, lead, url }) {
  const font = (file) => pathToFileURL(path.join(fontsDir, file)).href;
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: "Manrope"; font-weight: 200 800; src: url("${font("manrope-latin.woff2")}") format("woff2"); }
@font-face { font-family: "JetBrains Mono"; font-weight: 100 800; src: url("${font("jetbrains-mono-latin.woff2")}") format("woff2"); }
:root { --bg: #0b0d12; --text: #f7f3eb; --muted: #aeb4bf; --gold: #f6b51d; --line: rgba(247, 243, 235, .14); }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1200px; height: 630px; }
body {
  background-color: var(--bg);
  background-image:
    linear-gradient(rgba(247, 243, 235, .035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(247, 243, 235, .035) 1px, transparent 1px);
  background-size: 80px 80px;
  color: var(--text);
  font-family: Manrope, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.card { width: 1200px; height: 630px; padding: 56px 64px 54px; display: flex; flex-direction: column; }
.label { display: flex; align-items: center; gap: 22px; font-family: "JetBrains Mono", monospace; font-size: 15px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: var(--gold); }
.label::before { content: ""; width: 40px; height: 2px; background: var(--gold); }
h1 { margin-top: 30px; max-width: 1060px; font-size: 92px; font-weight: 650; line-height: .93; letter-spacing: -.06em; text-transform: uppercase; text-wrap: balance; }
.rule { margin-top: auto; width: 760px; height: 2px; background: var(--gold); opacity: .55; }
.lead { margin-top: 24px; max-width: 760px; font-size: 26px; line-height: 1.3; color: var(--muted); text-wrap: balance; }
.footer { margin-top: 34px; padding-top: 22px; border-top: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; }
.who { display: flex; align-items: center; gap: 18px; }
.mono { width: 42px; height: 42px; display: grid; place-items: center; border: 1px solid rgba(247, 243, 235, .32); font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 600; color: var(--gold); }
.name { font-size: 18px; font-weight: 500; }
.role { margin-top: 5px; font-family: "JetBrains Mono", monospace; font-size: 10px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: var(--gold); }
.url { font-family: "JetBrains Mono", monospace; font-size: 13px; letter-spacing: .1em; color: var(--muted); }
</style></head>
<body><div class="card">
  <p class="label">${escape(label)}</p>
  <h1>${escape(title)}</h1>
  <div class="rule"></div>
  <p class="lead">${escape(lead)}</p>
  <div class="footer">
    <div class="who"><span class="mono">EH</span><div><p class="name">Earl Hickson Jr.</p><p class="role">Lead Front-End Engineer</p></div></div>
    <span class="url">${escape(url)}</span>
  </div>
</div></body></html>`;
}

function chromePath() {
  const candidates = [
    process.env.CHROME_BIN,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) throw new Error("No Chrome found. Set CHROME_BIN to a Chrome or Chromium binary.");
  return found;
}

const requested = process.argv.slice(2);
const names = requested.length ? requested : Object.keys(cards);
for (const name of names) if (!cards[name]) throw new Error(`Unknown card: ${name}`);

await mkdir(outDir, { recursive: true });
const scratch = await mkdtemp(path.join(os.tmpdir(), "og-cards-"));
const browser = await chromium.launch({ executablePath: chromePath() });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const name of names) {
    const htmlFile = path.join(scratch, `${name}.html`);
    await writeFile(htmlFile, cardHtml(cards[name]));
    await page.goto(pathToFileURL(htmlFile).href);
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => {
      const card = document.querySelector(".card");
      return card.scrollHeight > card.clientHeight || card.scrollWidth > card.clientWidth;
    });
    if (overflow) throw new Error(`${name}: content overflows the 1200×630 card.`);
    const file = path.join(outDir, `og-${name}.png`);
    await page.screenshot({ path: file, type: "png" });
    process.stdout.write(`wrote ${path.relative(root, file)}\n`);
  }
} finally {
  await browser.close();
  await rm(scratch, { recursive: true, force: true });
}

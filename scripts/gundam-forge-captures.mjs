#!/usr/bin/env node
// Captures Gundam Forge for /work/gundam-forge (see docs/GUNDAM-FORGE-ASSETS.md).
//
// Runs against a local production build of the public repository Epetaway/Gundam-Forge at
// 50321ed (Apr 24, 2026):
//
//   cd apps/web && npm run build && npx next start -p 3002
//
// Capture rules — each one is stated on the page:
//   * Official card art is never published. Every card image request is answered with a text
//     proxy drawn from the card's own catalog record (name, colour, type, cost, level, AP/HP, id),
//     in Gundam Forge's own colour tokens and labelled "TEXT PROXY" on the card.
//   * Decks are fictional study decks seeded into the app's own localStorage format
//     (gundam-forge.decks); the catalog deck shown is a "Forge Team" seed deck. The tournament
//     deck list is not captured: it carries real player handles from a public results feed.
//   * The first-visit welcome modal is pre-dismissed except in the capture that shows it.
//   * Every other non-local request is aborted (the capture machine has no network).
//   * next/font/google can't download Orbitron and Exo 2 offline, so the capture build serves
//     the same OFL families locally (@fontsource 5.3.0). The rendered typography is the app's.
//
//   BASE_URL      default http://localhost:3002
//   CATALOG       the app's apps/web/public/data/cards.catalog.json
//   DECKS_JSON    the app's bundled decks dumped to JSON (id, entries) — see the assets doc
//   FONT_DIR      folder holding orbitron-latin-700, exo-2-latin-600 and jetbrains-mono-latin-500 woff2
//   CAPTURES_DIR  output (default tmp/gundam-forge-captures)
//   CHROME_BIN    a Chrome/Chromium executable
//   ONLY          optional comma-separated capture ids

import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = process.env.BASE_URL ?? "http://localhost:3002";
const OUT = path.resolve(root, process.env.CAPTURES_DIR ?? "tmp/gundam-forge-captures");
const ONLY = (process.env.ONLY ?? "").split(",").filter(Boolean);
const need = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name} (see the header of this script).`);
  return value;
};

const catalog = JSON.parse(await readFile(need("CATALOG"), "utf8"));
const bundledDecks = JSON.parse(await readFile(need("DECKS_JSON"), "utf8"));
const fontDir = need("FONT_DIR");
const b64 = async (file) => (await readFile(path.join(fontDir, file))).toString("base64");
const fontCss =
  `@font-face{font-family:'O';font-weight:700;src:url(data:font/woff2;base64,${await b64("orbitron-latin-700-normal.woff2")}) format('woff2')}` +
  `@font-face{font-family:'E';font-weight:600;src:url(data:font/woff2;base64,${await b64("exo-2-latin-600-normal.woff2")}) format('woff2')}` +
  `@font-face{font-family:'M';font-weight:500;src:url(data:font/woff2;base64,${await b64("jetbrains-mono-latin-500-normal.woff2")}) format('woff2')}`;

// ---------------------------------------------------------------- text proxies
// Gundam Forge's own --color-* tokens (apps/web/app/globals.css).
const CARD_COLORS = { Blue: "#3b82f6", Red: "#ef4444", Green: "#22c55e", White: "#e5e7eb", Purple: "#8b5cf6", Colorless: "#7d8ea8" };
const byId = new Map(catalog.map((card) => [card.id, card]));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const wrap = (name, max = 16) => {
  const lines = [];
  let line = "";
  for (const word of name.split(/\s+/)) {
    if ((`${line} ${word}`).trim().length > max && line) { lines.push(line); line = word; } else line = `${line} ${word}`.trim();
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
};
function proxySvg(card) {
  const c = CARD_COLORS[card.color] ?? CARD_COLORS.Colorless;
  const lines = wrap(card.name ?? card.id);
  const y0 = 214 - (lines.length - 1) * 17;
  const name = lines.map((l, i) => `<text x="150" y="${y0 + i * 34}" text-anchor="middle" font-family="E" font-weight="600" font-size="27" fill="#e6edf8">${esc(l)}</text>`).join("");
  const stats = card.type === "Unit" || card.type === "Base"
    ? `<text x="28" y="378" font-family="M" font-size="17" fill="#bac6d8">AP ${card.ap ?? 0}</text><text x="272" y="378" text-anchor="end" font-family="M" font-size="17" fill="#bac6d8">HP ${card.hp ?? 0}</text>`
    : "";
  const level = card.level != null ? `<text x="150" y="80" text-anchor="middle" font-family="M" font-size="15" fill="#9aa9bf">LV ${card.level}</text>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 420" width="600" height="840"><defs><style>${fontCss}</style>
<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16233a"/><stop offset="1" stop-color="#0c1526"/></linearGradient>
<pattern id="h" width="36" height="40" patternUnits="userSpaceOnUse"><polygon points="18,2 34,11 34,29 18,38 2,29 2,11" fill="none" stroke="${c}" stroke-width="0.6" opacity="0.16"/></pattern></defs>
<rect width="300" height="420" rx="12" fill="url(#g)"/><rect width="300" height="420" rx="12" fill="url(#h)"/>
<rect width="300" height="12" fill="${c}"/><rect x="5" y="5" width="290" height="410" rx="9" fill="none" stroke="${c}" stroke-opacity="0.55" stroke-width="2"/>
<circle cx="40" cy="52" r="23" fill="#0e1116" stroke="${c}" stroke-width="2.5"/><text x="40" y="61" text-anchor="middle" font-family="O" font-weight="700" font-size="24" fill="#e6edf8">${card.cost ?? 0}</text>
<text x="272" y="44" text-anchor="end" font-family="M" font-size="13" fill="${c}">${esc((card.color ?? "").toUpperCase())}</text>${level}
<line x1="40" y1="112" x2="260" y2="112" stroke="${c}" stroke-opacity="0.35"/>${name}
<text x="150" y="306" text-anchor="middle" font-family="O" font-weight="700" font-size="15" letter-spacing="3" fill="${c}">${esc((card.type ?? "").toUpperCase())}</text>
<line x1="40" y1="338" x2="260" y2="338" stroke="${c}" stroke-opacity="0.35"/>${stats}
<text x="150" y="404" text-anchor="middle" font-family="M" font-size="12" fill="#7d8ea8">${esc(card.id)} · TEXT PROXY</text></svg>`;
}

// ---------------------------------------------------------------- fictional study decks
const base = bundledDecks.find((deck) => deck.id === "blue-white-midrange");
const now = "2026-10-25T16:00:00.000Z";
const intent = { clans: [], colors: ["Blue", "White"], packages: [], includeEX: false };
const resources = [{ cardId: "R-001", qty: 4 }, { cardId: "R-002", qty: 3 }, { cardId: "R-003", qty: 3 }];
const draftEntries = base.entries.map((entry) => (entry.cardId === "ST01-015" ? { ...entry, qty: entry.qty - 1 } : entry));
const seededDecks = [
  { id: "study-draft", name: "Blue / White study — draft", description: "Fictional study deck.", visibility: "private", deckIntent: intent, entries: draftEntries, createdAt: now, updatedAt: now },
  { id: "study-valid", name: "Blue / White study", description: "Fictional study deck.", visibility: "private", deckIntent: intent, entries: [...base.entries, ...resources], createdAt: now, updatedAt: now },
];

const openIssues = async (page) => {
  await page.getByRole("button", { name: /deck issue/ }).first().click();
  await page.waitForTimeout(600);
};
// Steps through the playtester's own start flow: coin flip, turn order, then the opening hand.
// Buttons are tried in priority order so "Confirm …" wins over the choice it confirms.
const clickThrough = async (page, names, stopAt) => {
  for (let step = 0, idle = 0; step < 16 && idle < 4; step += 1) {
    if (stopAt && (await page.getByText(stopAt).count())) return;
    let clicked = false;
    for (const name of names) {
      const button = page.getByRole("button", { name }).first();
      if (await button.count()) { await button.click().catch(() => {}); clicked = true; break; }
    }
    idle = clicked ? 0 : idle + 1;
    await page.waitForTimeout(1500);
  }
};
const toMulligan = (page) => clickThrough(page, [/^flip coin/i, /^go first/i, /^continue/i], /Mulligan Decision/);
const toBoard = async (page) => {
  await toMulligan(page);
  await clickThrough(page, [/^confirm keep hand/i, /^keep this hand/i, /^continue/i, /^start/i], /Draw Phase/);
  for (const name of [/^got it/i, /^draw card/i]) {
    await page.getByRole("button", { name }).first().click().catch(() => {});
    await page.waitForTimeout(1200);
  }
};

const desktop = { w: 1440, h: 900 };
const phone = { w: 390, h: 844, mobile: true };
const shots = [
  { id: "forge-draft", path: "/forge?deckId=study-draft", ...desktop },
  { id: "forge-issues", path: "/forge?deckId=study-draft", ...desktop, act: openIssues },
  { id: "forge-valid", path: "/forge?deckId=study-valid", ...desktop },
  { id: "forge-create", path: "/forge", ...desktop },
  { id: "cards", path: "/cards", ...desktop },
  { id: "deck-view", path: "/decks/blue-white-midrange", ...desktop },
  { id: "home", path: "/", ...desktop },
  { id: "welcome", path: "/", ...desktop, welcome: true },
  { id: "playtest-start", path: "/decks/blue-white-midrange/playtest", ...desktop },
  { id: "playtest-mulligan", path: "/decks/blue-white-midrange/playtest", ...desktop, act: toMulligan },
  { id: "playtest-board", path: "/decks/blue-white-midrange/playtest", ...desktop, act: toBoard },
  { id: "playtest-empty", path: "/playtest", ...desktop },
  { id: "light-forge-valid", path: "/forge?deckId=study-valid", ...desktop, theme: "light" },
  { id: "light-forge-draft", path: "/forge?deckId=study-draft", ...desktop, theme: "light" },
  { id: "m-forge-draft", path: "/forge?deckId=study-draft", ...phone },
  { id: "m-forge-issues", path: "/forge?deckId=study-draft", ...phone, act: openIssues },
  { id: "m-cards", path: "/cards", ...phone },
  { id: "m-light-forge", path: "/forge?deckId=study-draft", ...phone, theme: "light" },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN });
for (const shot of shots) {
  if (ONLY.length && !ONLY.includes(shot.id)) continue;
  const context = await browser.newContext({
    viewport: { width: shot.w, height: shot.h },
    deviceScaleFactor: 2,
    isMobile: Boolean(shot.mobile),
    hasTouch: Boolean(shot.mobile),
    reducedMotion: "reduce",
  });
  await context.addInitScript(({ decks, welcome, theme }) => {
    try {
      if (!welcome) localStorage.setItem("gundam-forge.hasSeenWelcome", "true");
      localStorage.setItem("gundam-forge.decks", JSON.stringify(decks));
      localStorage.setItem("gundam-forge:theme", theme);
      localStorage.setItem("gundam-forge-mute", "true");
    } catch { /* storage unavailable */ }
  }, { decks: seededDecks, welcome: Boolean(shot.welcome), theme: shot.theme ?? "dark" });
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    const art = url.pathname.startsWith("/_next/image") ? url.searchParams.get("url") ?? "" : url.pathname;
    if (/card_art|\/cards\/card\//.test(art) || url.hostname.includes("gundam-gcg") || url.hostname.includes("exburst")) {
      const id = (art.split("/").pop() ?? "").replace(/\.(webp|png|jpe?g)$/i, "");
      return route.fulfill({ status: 200, contentType: "image/svg+xml", body: proxySvg(byId.get(id) ?? { id, name: id, color: "Colorless", type: "" }) });
    }
    if (url.hostname !== "localhost") return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  await page.goto(BASE + shot.path, { waitUntil: "networkidle", timeout: 120_000 }).catch(() => {});
  await page.waitForTimeout(1800);
  if (shot.act) await shot.act(page).catch((error) => console.warn(`  ${shot.id}: ${error.message.split("\n")[0]}`));
  await page.screenshot({ path: path.join(OUT, `${shot.id}.png`) });
  console.log(`captured ${shot.id}`);
  await context.close();
}
await browser.close();

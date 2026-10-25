#!/usr/bin/env node
// Lays out the card previews (1440x1200) and Open Graph images (1200x630) for the Gundam Forge
// and DojoNet case studies from their real captures. Nothing in a capture is altered: each is
// placed whole (or cropped to a rectangle) on a ground drawn in the project's own tokens.
//
//   GF_CAPTURES / DN_CAPTURES   output folders of gundam-forge-captures.mjs / dojonet-captures.mjs
//   FONT_DIR                    @fontsource woff2 files: orbitron-latin-700, exo-2-latin-{500,600},
//                               jetbrains-mono-latin-500, bebas-neue-latin-400, inter-latin-{500,600}
//   OUT_DIR                     default tmp/case-study-compositions
//   CHROME_BIN                  a Chrome/Chromium executable

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const need = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name}.`);
  return path.resolve(root, value);
};
const gf = (id) => pathToFileURL(path.join(need("GF_CAPTURES"), `${id}.png`)).href;
const dn = (id) => pathToFileURL(path.join(need("DN_CAPTURES"), `${id}.png`)).href;
const font = (file) => pathToFileURL(path.join(need("FONT_DIR"), file)).href;
const OUT = path.resolve(root, process.env.OUT_DIR ?? "tmp/case-study-compositions");

const faces = `
@font-face{font-family:Orbitron;font-weight:700;src:url(${font("orbitron-latin-700-normal.woff2")})}
@font-face{font-family:'Exo 2';font-weight:500;src:url(${font("exo-2-latin-500-normal.woff2")})}
@font-face{font-family:'Exo 2';font-weight:600;src:url(${font("exo-2-latin-600-normal.woff2")})}
@font-face{font-family:'JetBrains Mono';font-weight:500;src:url(${font("jetbrains-mono-latin-500-normal.woff2")})}
@font-face{font-family:'Bebas Neue';font-weight:400;src:url(${font("bebas-neue-latin-400-normal.woff2")})}
@font-face{font-family:Inter;font-weight:500;src:url(${font("inter-latin-500-normal.woff2")})}
@font-face{font-family:Inter;font-weight:600;src:url(${font("inter-latin-600-normal.woff2")})}
*{box-sizing:border-box;margin:0}
body{width:var(--w);height:var(--h);overflow:hidden;position:relative}
img{display:block;width:100%;height:auto}
.browser{position:absolute;overflow:hidden;border-radius:14px}
.browser i{display:flex;gap:7px;padding:11px 14px}
.browser i b{width:10px;height:10px;border-radius:50%}
.phone{position:absolute;overflow:hidden;border:9px solid #05070c;border-radius:44px;background:#000}
`;

// Gundam Forge: its own dark ground (--background 221 62% 9%), cobalt glow and the hex pattern
// from the app's card back; the GF badge and Orbitron wordmark as the app's header sets them.
const gfGround = `
body{background:radial-gradient(900px 520px at 78% 18%,rgba(37,99,235,.34),transparent 70%),radial-gradient(700px 400px at 10% 100%,rgba(139,92,246,.16),transparent 70%),#091225;color:#e9eff7;font-family:'Exo 2'}
body::before{content:"";position:absolute;inset:0;opacity:.5;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='40'%3E%3Cpolygon points='18,2 34,11 34,29 18,38 2,29 2,11' fill='none' stroke='%231d4ed8' stroke-width='.6' opacity='.35'/%3E%3C/svg%3E")}
.lockup{position:absolute;display:flex;align-items:center;gap:14px}
.badge{display:grid;place-items:center;border:1.5px solid rgba(96,165,250,.7);border-radius:4px;background:rgba(59,130,246,.25);color:#93c5fd;font-family:'JetBrains Mono';font-weight:500;box-shadow:0 0 28px rgba(59,130,246,.5)}
.word{font-family:Orbitron;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
.browser{border:1px solid rgba(96,165,250,.35);background:#0b1426;box-shadow:0 40px 90px rgba(0,0,0,.6)}
.browser i{background:#101b31;border-bottom:1px solid rgba(96,165,250,.18)} .browser i b{background:rgba(186,198,216,.3)}
.phone{box-shadow:0 40px 80px rgba(0,0,0,.6),0 0 0 1px rgba(96,165,250,.25)}
.label{position:absolute;font-family:'JetBrains Mono';font-size:15px;letter-spacing:.16em;text-transform:uppercase;color:#93c5fd}
h1{position:absolute;font-family:Orbitron;font-weight:700;line-height:1.08;letter-spacing:-.01em}
`;

// DojoNet: Spec v3 tokens — Background Light #F9F9F9, Matte Black #1A1A1A, Dojo Red #B71C1C —
// with Bebas Neue for the wordmark, as the app's header sets it.
const dnGround = `
body{background:#F9F9F9;color:#1A1A1A;font-family:Inter}
.slab{position:absolute;background:#1A1A1A}
.red{position:absolute;background:#B71C1C}
.word{position:absolute;font-family:'Bebas Neue';letter-spacing:.02em;line-height:.9}
.browser{border:1px solid rgba(26,26,26,.08);background:#fff;box-shadow:0 1px 2px rgba(26,26,26,.06),0 30px 70px rgba(26,26,26,.22)}
.browser i{background:#F2F2F2} .browser i b{background:#E0E0E0}
.phone{border-color:#1A1A1A;box-shadow:0 30px 70px rgba(26,26,26,.35)}
.label{position:absolute;font-family:Inter;font-weight:600;font-size:15px;letter-spacing:.14em;text-transform:uppercase}
h1{position:absolute;font-family:'Bebas Neue';font-weight:400;line-height:.92;letter-spacing:.01em}
`;

const pages = {
  "gundam-forge/preview": { w: 1440, h: 1200, css: gfGround, body: `
    <div class="lockup" style="left:84px;top:78px"><span class="badge" style="width:58px;height:58px;font-size:20px">GF</span><span class="word" style="font-size:40px">Gundam Forge</span></div>
    <p class="label" style="left:86px;top:166px">Decision support · Deck builder</p>
    <div class="browser" style="left:84px;top:300px;width:1150px"><i><b></b><b></b><b></b></i><img src="${gf("forge-draft")}" alt=""></div>
    <div class="phone" style="right:56px;top:470px;width:320px"><img src="${gf("m-forge-issues")}" alt=""></div>` },
  "gundam-forge/og": { w: 1200, h: 630, css: gfGround, body: `
    <div class="lockup" style="left:64px;top:60px"><span class="badge" style="width:46px;height:46px;font-size:16px">GF</span><span class="word" style="font-size:30px">Gundam Forge</span></div>
    <h1 style="left:64px;top:150px;width:470px;font-size:44px">Show the rule while the player is still deciding.</h1>
    <p class="label" style="left:66px;top:540px;font-size:13px">Case study · Earl Hickson Jr.</p>
    <div class="browser" style="left:560px;top:70px;width:760px"><i><b></b><b></b><b></b></i><img src="${gf("forge-issues")}" alt=""></div>` },
  "dojonet/preview": { w: 1440, h: 1200, css: dnGround, body: `
    <div class="slab" style="left:0;top:0;width:1440px;height:470px"></div>
    <div class="red" style="left:84px;top:236px;width:120px;height:10px"></div>
    <p class="word" style="left:80px;top:96px;font-size:150px;color:#F9F9F9">DOJONET</p>
    <p class="label" style="left:86px;top:272px;color:#F3F4F6">Learning · Training journal</p>
    <div class="browser" style="left:84px;top:350px;width:1090px"><i><b></b><b></b><b></b></i><img src="${dn("dashboard")}" alt=""></div>
    <div class="phone" style="right:60px;top:300px;width:330px"><img src="${dn("m-journal")}" alt=""></div>` },
  "dojonet/og": { w: 1200, h: 630, css: dnGround, body: `
    <div class="slab" style="left:0;top:0;width:520px;height:630px"></div>
    <p class="word" style="left:60px;top:58px;font-size:84px;color:#F9F9F9">DOJONET</p>
    <div class="red" style="left:62px;top:160px;width:90px;height:8px"></div>
    <h1 style="left:60px;top:200px;width:420px;font-size:76px;color:#F9F9F9">Progress isn't the same as completion.</h1>
    <p class="label" style="left:62px;top:548px;font-size:13px;color:#F3F4F6">Case study · Earl Hickson Jr.</p>
    <div class="browser" style="left:560px;top:70px;width:760px"><i><b></b><b></b><b></b></i><img src="${dn("journal")}" alt=""></div>` },
};

await mkdir(path.join(OUT, "gundam-forge"), { recursive: true });
await mkdir(path.join(OUT, "dojonet"), { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN });
for (const [id, spec] of Object.entries(pages)) {
  const page = await browser.newPage({ viewport: { width: spec.w, height: spec.h } });
  // Written to disk and opened as a file so the page may load the file:// captures and fonts.
  const htmlPath = path.join(OUT, `${id}.html`);
  await writeFile(htmlPath, `<!doctype html><html><head><meta charset="utf-8"><style>:root{--w:${spec.w}px;--h:${spec.h}px}${faces}${spec.css}</style></head><body>${spec.body}</body></html>`);
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, `${id}.png`) });
  console.log(`composed ${id}`);
  await page.close();
}
await browser.close();

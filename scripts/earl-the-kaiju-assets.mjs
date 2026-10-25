#!/usr/bin/env node
// Builds the published media for /work/earl-the-kaiju from approved sources.
//
// Sources are read, never modified. Output goes to
//   client/public/assets/projects/earl-the-kaiju/
// and a size record to
//   client/src/data/earlTheKaiju.media.json
//
// Three sources, each configurable:
//   BRAND_PACKAGE_DIR  Earl-the-Kaiju-Brand-Package-v1.5 (default: ../../Design/EarltheKaiju/…)
//   APP_REPO_DIR       a checkout of Epetaway/earltheKaiju_app at 6446efa (default: ../earltheKaiju_app)
//   SITE_CAPTURES_DIR  2x Playwright captures of the instructor site, built from
//                      Epetaway/EarltheKaiju main @ 77657a8 and served locally
//   GUIDELINES_PDF     brand guidelines v1.5 (default: the copy inside the package)
//   COMPOSITIONS_DIR   preview.png (1440x1200) and og.png (1200x630) composed from the above
//
// Logo SVGs are copied byte for byte and checked against the package MANIFEST.txt.
// Raster sources become AVIF + WebP (metadata stripped). Proof crops are fixed
// rectangles of the approval proofs; nothing is retouched or recolored.
//
// Needs sharp, which is not a portfolio dependency:
//   SHARP_FROM=/path/to/any/project/package.json node scripts/earl-the-kaiju-assets.mjs

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { copyFile, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(process.env.SHARP_FROM ?? import.meta.url);
const sharp = require("sharp");

const brandDir = path.resolve(
  root,
  process.env.BRAND_PACKAGE_DIR ?? "../../Design/EarltheKaiju/Earl-the-Kaiju-Brand-Package-v1.5",
);
const appDir = path.resolve(root, process.env.APP_REPO_DIR ?? "../earltheKaiju_app");
const capturesDir = process.env.SITE_CAPTURES_DIR
  ? path.resolve(root, process.env.SITE_CAPTURES_DIR)
  : null;
const guidelinesPdf = path.resolve(
  root,
  process.env.GUIDELINES_PDF ?? path.join(brandDir, "07-guidelines/Earl-the-Kaiju-Brand-Guidelines-v1.5.pdf"),
);
const outDir = path.join(root, "client/public/assets/projects/earl-the-kaiju");

// Approved guideline pages, rendered from the v1.5 PDF with pdftoppm (poppler).
const guidelinePages = { 7: "guide-crest-anatomy", 10: "guide-ceremonial-construction", 12: "guide-clear-space", 13: "guide-small-sizes", 17: "guide-typography", 18: "guide-companions" };
const pagesDir = await mkdtemp(path.join(os.tmpdir(), "etk-guide-"));
for (const page of Object.keys(guidelinePages)) {
  execFileSync("pdftoppm", ["-f", page, "-l", page, "-png", "-singlefile", "-scale-to-x", "2000", "-scale-to-y", "-1", guidelinesPdf, path.join(pagesDir, `page-${page}`)]);
}
const recordPath = path.join(root, "client/src/data/earlTheKaiju.media.json");

const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");

// ---------------------------------------------------------------- logos (SVG, unchanged)
const logos = [
  "01-vector-svg/crest/earl-the-kaiju-crest-full-color.svg",
  "01-vector-svg/crest/earl-the-kaiju-crest-one-color-white.svg",
  "01-vector-svg/crest/earl-the-kaiju-crest-one-color-black.svg",
  "01-vector-svg/crest/earl-the-kaiju-crest-simplified-full-color.svg",
  "01-vector-svg/crest/earl-the-kaiju-eyes-mark-full-color.svg",
  "01-vector-svg/practical/earl-the-kaiju-lockup-stacked-full-color.svg",
  "01-vector-svg/practical/earl-the-kaiju-lockup-horizontal-full-color.svg",
  "01-vector-svg/ceremonial/earl-the-kaiju-ceremonial-lockup-stacked-full-color.svg",
  "01-vector-svg/companions/earl-the-kaiju-glyph-set-earl-gold.svg",
  "01-vector-svg/companions/earl-the-kaiju-kanji-kaiju-vertical-gold.svg",
  "01-vector-svg/tagline/earl-the-kaiju-tagline-one-line-gold.svg",
];

// ---------------------------------------------------------------- raster jobs
// crop: [left, top, width, height] in source pixels. widths: output widths.
const brand = (p) => path.join(brandDir, p);
const app = (p) => path.join(appDir, "docs/screenshots/sprint-01", p);
const capture = (p) => (capturesDir ? path.join(capturesDir, p) : null);
// Card preview and social image: layouts composed for the portfolio from the approved
// crest and lockup plus the real captures above (see docs/EARL-THE-KAIJU-ASSETS.md).
const compositionsDir = process.env.COMPOSITIONS_DIR ? path.resolve(root, process.env.COMPOSITIONS_DIR) : null;

const jobs = [
  // Process evidence
  { id: "source-board", src: brand("00-source-reference/official-logo-system-board.png"), widths: [800, 1448] },
  { id: "proof-frame-straightening", src: brand("09-approval-record/proof-2-production-fixes.png"), crop: [60, 1100, 1880, 560], widths: [900, 1600] },
  { id: "proof-one-crest-decision", src: brand("09-approval-record/proof-2-production-fixes.png"), crop: [60, 2280, 1880, 720], widths: [900, 1600] },
  { id: "proof-real-size", src: brand("09-approval-record/proof-2-production-fixes.png"), crop: [60, 3020, 1880, 1580], widths: [900, 1600] },
  { id: "proof-color-options", src: brand("09-approval-record/proof-3-color-decision.png"), crop: [40, 1060, 1920, 730], widths: [900, 1600] },
  { id: "proof-ceremonial-directions", src: brand("09-approval-record/proof-1-ceremonial-wordmark.png"), crop: [60, 70, 2280, 1470], widths: [900, 1600] },
  { id: "proof-lettering-fixes", src: brand("09-approval-record/proof-4-final-approval-v1.2.png"), crop: [60, 1220, 1880, 730], widths: [900, 1600] },
  { id: "proof-one-crest-everywhere", src: brand("09-approval-record/proof-4-final-approval-v1.2.png"), crop: [60, 1980, 1880, 570], widths: [900, 1600] },
  { id: "proof-patterns-from-references", src: brand("09-approval-record/proof-6-patterns-and-kit-design-review-v1.4.png"), crop: [50, 260, 1500, 360], widths: [900, 1500] },
  { id: "proof-horizontal-before-after", src: brand("09-approval-record/proof-7-horizontal-logos-v1.5.png"), crop: [50, 265, 1500, 425], widths: [900, 1500] },
  ...Object.entries(guidelinePages).map(([page, id]) => ({ id, src: path.join(pagesDir, `page-${page}.png`), widths: [900, 1600] })),
  // Applications
  { id: "pattern-lattice", src: brand("11-patterns/swatches/earl-the-kaiju-pattern-lattice-full-color-swatch.png"), widths: [800, 1600] },
  { id: "pattern-den", src: brand("11-patterns/swatches/earl-the-kaiju-pattern-den-full-color-swatch.png"), widths: [800, 1600] },
  { id: "template-business-card", src: brand("10-marketing-templates/png-previews/earl-the-kaiju-template-business-card-front-bleed.png"), widths: [540, 1080] },
  { id: "template-social-post", src: brand("10-marketing-templates/png-previews/earl-the-kaiju-template-social-post-portrait-1080x1350.png"), widths: [540, 1080] },
  { id: "template-tagline-card", src: brand("10-marketing-templates/png-previews/earl-the-kaiju-template-tagline-card-square-1080x1080.png"), widths: [540, 1080] },
  { id: "app-icon", src: brand("05-app-icon-favicon/android/earl-the-kaiju-play-store-icon-512px.png"), widths: [256, 512] },
  // Kaiju Coach (CI renders, fictional data)
  ...[
    ["coach-today", "01-today.png"],
    ["coach-today-font-200", "01e-today-font-200.png"],
    ["coach-planner", "02-planner-week.png"],
    ["coach-lesson-builder", "03-lesson-builder.png"],
    ["coach-class-mode", "04-class-mode.png"],
    ["coach-class-mode-landscape", "04d-class-mode-landscape.png"],
    ["coach-post-class", "04f-post-class.png"],
    ["coach-timer-work", "05-timer-work.png"],
    ["coach-students", "06-students.png"],
    ["coach-attendance", "07-attendance.png"],
    ["coach-library-media-concept", "08b-library-media-concept.png"],
    ["coach-settings", "09-settings.png"],
    ["coach-device-class-mode", "device/d07-class-mode.png"],
  ].map(([id, file]) => ({ id, src: app(file), widths: [null] })),
  // Instructor website (local build of main @ 77657a8, 2x captures)
  ...(capturesDir
    ? [
        { id: "site-home-desktop", src: capture("site-home-1440-viewport.png"), widths: [960, 1600] },
        { id: "site-about-desktop", src: capture("site-about-1440-viewport.png"), widths: [960, 1600] },
        { id: "site-home-mobile", src: capture("site-home-390-viewport.png"), widths: [390, 780] },
        { id: "site-menu-mobile", src: capture("site-menu-390.png"), widths: [390, 780] },
        { id: "site-form-errors-desktop", src: capture("site-contact-errors-1440-clean.png"), widths: [960, 1600] },
        { id: "site-form-errors-mobile", src: capture("site-contact-errors-390-clean.png"), widths: [390, 780] },
      ]
    : []),
  ...(compositionsDir
    ? [{ id: "preview", src: path.join(compositionsDir, "preview.png"), widths: [480, 800, 1440] }]
    : []),
];

// ---------------------------------------------------------------- run
await mkdir(path.join(outDir, "brand"), { recursive: true });
await mkdir(path.join(outDir, "media"), { recursive: true });

const manifest = new Map();
for (const line of (await readFile(path.join(brandDir, "MANIFEST.txt"), "utf8")).split("\n").slice(1)) {
  const m = line.trim().match(/^([0-9a-f]{64})\s+\d+\s+(.+)$/);
  if (m) manifest.set(m[2], m[1]);
}

const record = { generatedBy: "scripts/earl-the-kaiju-assets.mjs", logos: {}, media: {} };

for (const rel of logos) {
  const buf = await readFile(brand(rel));
  const expected = manifest.get(rel);
  if (!expected) throw new Error(`${rel} is not in MANIFEST.txt`);
  if (sha256(buf) !== expected) throw new Error(`${rel} does not match MANIFEST.txt`);
  const name = path.basename(rel);
  await copyFile(brand(rel), path.join(outDir, "brand", name));
  const viewBox = buf.toString("utf8").match(/viewBox="([^"]+)"/)?.[1]?.split(/\s+/).map(Number);
  record.logos[name.replace(/^earl-the-kaiju-|\.svg$/g, "")] = {
    src: `/assets/projects/earl-the-kaiju/brand/${name}`,
    width: viewBox?.[2] ?? null,
    height: viewBox?.[3] ?? null,
    sha256: expected,
  };
}

for (const job of jobs) {
  const sourceBuf = await readFile(job.src);
  let base = sharp(sourceBuf);
  if (job.crop) {
    const [left, top, width, height] = job.crop;
    base = base.extract({ left, top, width, height });
  }
  const meta = job.crop
    ? { width: job.crop[2], height: job.crop[3] }
    : await sharp(sourceBuf).metadata();
  const sources = [];
  for (const requested of job.widths) {
    const width = Math.min(requested ?? meta.width, meta.width);
    const height = Math.round((meta.height * width) / meta.width);
    const resized = base.clone().resize({ width, withoutEnlargement: true });
    const stem = `${job.id}-${width}`;
    await resized.clone().avif({ quality: 62, effort: 4 }).toFile(path.join(outDir, "media", `${stem}.avif`));
    await resized.clone().webp({ quality: 84 }).toFile(path.join(outDir, "media", `${stem}.webp`));
    sources.push({ width, height, stem });
  }
  const largest = sources[sources.length - 1];
  record.media[job.id] = {
    width: largest.width,
    height: largest.height,
    avif: sources.map((s) => `/assets/projects/earl-the-kaiju/media/${s.stem}.avif ${s.width}w`).join(", "),
    webp: sources.map((s) => `/assets/projects/earl-the-kaiju/media/${s.stem}.webp ${s.width}w`).join(", "),
    fallback: `/assets/projects/earl-the-kaiju/media/${largest.stem}.webp`,
    sourceSha256: sha256(sourceBuf),
    ...(job.crop ? { crop: job.crop } : {}),
  };
}

if (compositionsDir) {
  await mkdir(path.join(outDir, "social"), { recursive: true });
  await sharp(await readFile(path.join(compositionsDir, "og.png")))
    .png({ compressionLevel: 9, palette: false })
    .toFile(path.join(outDir, "social", "og.png"));
}

await writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
console.log(`Wrote ${Object.keys(record.logos).length} logos and ${Object.keys(record.media).length} media items.`);

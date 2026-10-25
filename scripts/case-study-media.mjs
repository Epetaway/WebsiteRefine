#!/usr/bin/env node
// Builds the published media for /work/gundam-forge and /work/dojonet from their captures
// (scripts/gundam-forge-captures.mjs, scripts/dojonet-captures.mjs) and compositions
// (scripts/case-study-compositions.mjs). Provenance: docs/GUNDAM-FORGE-ASSETS.md and
// docs/DOJONET-ASSETS.md.
//
// Raster sources become AVIF + WebP (metadata stripped). Crops are fixed rectangles in source
// pixels; nothing is retouched or recoloured. The Open Graph PNG is copied unchanged.
// Output: client/public/assets/projects/<slug>/{media,social}/ and client/src/data/<slug>.media.json
//
//   PROJECT            gundam-forge | dojonet
//   CAPTURES_DIR       that project's captures (default tmp/<slug>-captures)
//   COMPOSITIONS_DIR   default tmp/case-study-compositions
//   SHARP_FROM         a package.json in any project that has sharp installed (sharp isn't a
//                      portfolio dependency)

import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(process.env.SHARP_FROM ?? import.meta.url);
const sharp = require("sharp");

const slug = process.env.PROJECT;
const recordName = { "gundam-forge": "gundamForge", dojonet: "dojonet" }[slug];
if (!recordName) throw new Error("Set PROJECT to gundam-forge or dojonet.");
const capturesDir = path.resolve(root, process.env.CAPTURES_DIR ?? `tmp/${slug}-captures`);
const compositionsDir = path.resolve(root, process.env.COMPOSITIONS_DIR ?? "tmp/case-study-compositions");
const outDir = path.join(root, `client/public/assets/projects/${slug}`);
const publicBase = `/assets/projects/${slug}`;
const recordPath = path.join(root, `client/src/data/${recordName}.media.json`);

const desktop = [900, 1600];
const phone = [360, 720];
const capture = (id, widths, crop) => ({ id, src: path.join(capturesDir, `${id}.png`), widths, crop });

const projects = {
  "gundam-forge": {
    appCommit: "Epetaway/Gundam-Forge@50321ed",
    jobs: [
      capture("forge-draft", desktop),
      capture("forge-issues", desktop),
      capture("forge-valid", desktop),
      capture("forge-create", desktop),
      capture("cards", desktop),
      capture("deck-view", desktop),
      // The home page above its stat row: those counters are hard-coded demo numbers (see the case study record).
      capture("home", desktop, [0, 0, 2880, 1000]),
      capture("welcome", desktop),
      capture("playtest-mulligan", desktop),
      capture("playtest-board", desktop),
      capture("playtest-empty", [900], [760, 700, 1360, 420]),
      capture("light-forge-draft", desktop),
      capture("light-forge-valid", desktop),
      capture("m-forge-draft", phone),
      capture("m-forge-issues", phone),
      capture("m-cards", phone),
      capture("m-light-forge", phone),
    ],
  },
  dojonet: {
    appCommit: "Epetaway/DojoNet-Prototype-MAX@be2db53",
    jobs: [
      capture("dashboard", desktop),
      capture("composer-journal", desktop),
      capture("training", desktop),
      capture("training-fixed", desktop),
      capture("techniques", desktop),
      capture("techniques-fixed", desktop),
      capture("progress-fixed", desktop),
      capture("journal", desktop),
      // The app's own error banner at the foot of the crashed profile route.
      capture("profile-crash", [900, 1600], [0, 1560, 1640, 240]),
      capture("fresh-dashboard", [900, 1600], [0, 0, 2880, 1300]),
      capture("dark-dashboard", desktop),
      capture("dark-techniques", desktop),
      capture("m-dashboard", phone),
      capture("m-techniques", phone),
      capture("m-techniques-fixed", phone),
      capture("m-journal", phone),
    ],
  },
};

const project = projects[slug];
const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");
const jobs = [
  ...project.jobs,
  { id: "preview", src: path.join(compositionsDir, slug, "preview.png"), widths: [480, 800, 1440] },
];

await rm(path.join(outDir, "media"), { recursive: true, force: true });
await mkdir(path.join(outDir, "media"), { recursive: true });
await mkdir(path.join(outDir, "social"), { recursive: true });

const media = {};
for (const job of jobs) {
  const input = await readFile(job.src);
  const base = job.crop
    ? sharp(input).extract({ left: job.crop[0], top: job.crop[1], width: job.crop[2], height: job.crop[3] })
    : sharp(input);
  const { width: sourceWidth, height: sourceHeight } = job.crop
    ? { width: job.crop[2], height: job.crop[3] }
    : await sharp(input).metadata();
  const avif = [];
  const webp = [];
  let largest = null;
  for (const target of job.widths) {
    const width = Math.min(target, sourceWidth);
    const resized = () => base.clone().resize({ width, withoutEnlargement: true });
    const name = `${job.id}-${width}`;
    await writeFile(path.join(outDir, "media", `${name}.avif`), await resized().avif({ quality: 60, effort: 6 }).toBuffer());
    await writeFile(path.join(outDir, "media", `${name}.webp`), await resized().webp({ quality: 82, effort: 6 }).toBuffer());
    avif.push(`${publicBase}/media/${name}.avif ${width}w`);
    webp.push(`${publicBase}/media/${name}.webp ${width}w`);
    largest = { name, width };
  }
  media[job.id] = {
    width: largest.width,
    height: Math.round((sourceHeight * largest.width) / sourceWidth),
    avif: avif.join(", "),
    webp: webp.join(", "),
    fallback: `${publicBase}/media/${largest.name}.webp`,
    ...(job.crop ? { crop: job.crop } : {}),
    sourceSha256: sha256(input),
  };
  console.log(`  ${job.id}`);
}

const og = await readFile(path.join(compositionsDir, slug, "og.png"));
await copyFile(path.join(compositionsDir, slug, "og.png"), path.join(outDir, "social", "og.png"));

await writeFile(
  recordPath,
  `${JSON.stringify({ generatedBy: "scripts/case-study-media.mjs", appCommit: project.appCommit, og: { src: `${publicBase}/social/og.png`, sha256: sha256(og) }, media }, null, 2)}\n`,
);
console.log(`Wrote ${Object.keys(media).length} media entries to ${path.relative(root, recordPath)}`);

#!/usr/bin/env node
// Builds the published media for /work/withyou from WithYou's own design and code sources.
//
// Sources are read, never modified. Output goes to
//   client/public/assets/projects/withyou/{brand,icons,illustrations,media,social}/
// and a size + checksum record to
//   client/src/data/withyou.media.json
//
// Four sources, each configurable:
//   APP_REPO_DIR      a checkout of the WithYou app repository at 612da33 (default: ../withyou)
//                     — brand SVGs, icons, illustrations, the photo library and the app icon from
//                       apps/mobile/assets, simulator/emulator QA captures and prototype reference
//                       captures from docs/, and the Maestro tour screenshots from .maestro/
//   DESIGN_DIR        the WithYou design-system export (default: ../../Design/withyou)
//                     — only checked here; its renders come from CAPTURES_DIR
//   CAPTURES_DIR      Playwright renders of the design source files, made by
//                     scripts/withyou-design-captures.mjs (default: tmp/withyou-captures)
//   COMPOSITIONS_DIR  preview.png (1440x1200) and og.png (1200x630) composed for the portfolio
//                     from the captures above (optional)
//
// SVGs are copied byte for byte and their SHA-256 recorded. Raster sources become AVIF + WebP
// (metadata stripped). Crops are fixed rectangles; nothing is retouched or recolored.
//
// Needs sharp, which is not a portfolio dependency:
//   SHARP_FROM=/path/to/any/project/package.json node scripts/withyou-assets.mjs

import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(process.env.SHARP_FROM ?? import.meta.url);
const sharp = require("sharp");

const appDir = path.resolve(root, process.env.APP_REPO_DIR ?? "../withyou");
const capturesDir = path.resolve(root, process.env.CAPTURES_DIR ?? "tmp/withyou-captures");
const compositionsDir = process.env.COMPOSITIONS_DIR ? path.resolve(root, process.env.COMPOSITIONS_DIR) : null;
const outDir = path.join(root, "client/public/assets/projects/withyou");
const recordPath = path.join(root, "client/src/data/withyou.media.json");
const publicBase = "/assets/projects/withyou";

const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");
const app = (p) => path.join(appDir, p);
const capture = (p) => path.join(capturesDir, p);

// ---------------------------------------------------------------- vectors (copied unchanged)
const brandFiles = [
  // April 30, 2026 — first logo files (coral + blush)
  "apps/mobile/assets/withyou_logo_mark.svg",
  "apps/mobile/assets/withyou_logo_horizontal.svg",
  // May 12, 2026 — v2 handoff (plum + coral)
  "apps/mobile/assets/brand/withyou-logo-mark-light.svg",
  "apps/mobile/assets/brand/withyou-logo-horizontal-light.svg",
  "apps/mobile/assets/brand/withyou-app-icon-source-1024.svg",
  // May 14, 2026 — refresh (coral + navy)
  "apps/mobile/assets/brand/withyou-mark-refresh-light.svg",
  "apps/mobile/assets/brand/withyou-wordmark-refresh-light.svg",
  "apps/mobile/assets/brand/withyou-app-icon-refresh-1024.svg",
  "apps/mobile/assets/brand/withyou-notification-icon.svg",
];

const iconFiles = {
  navigation: ["nav-home", "nav-checkin", "nav-connect", "nav-profile", "nav-more"],
  actions: [
    "action-add", "action-back", "action-calendar", "action-close", "action-copy", "action-edit",
    "action-filter", "action-heart", "action-location", "action-lock", "action-map-pin",
    "action-notification", "action-save", "action-search", "action-settings", "action-share", "action-shield",
  ],
  features: [
    "feature-checkin", "feature-private-note", "feature-help-me-say-this", "feature-guided-talk",
    "feature-boundaries", "feature-support-preferences", "feature-communication-style",
    "feature-relationship-goals", "feature-shared-list", "feature-date-ideas", "feature-nearby",
    "feature-notifications", "feature-privacy-data", "feature-profile", "feature-relationship-settings",
    "feature-crisis-support", "feature-insights",
  ],
};

const illustrationFiles = [
  "illustration-empty-connect",
  "illustration-invite-expired",
  "illustration-partner-removed",
  "illustration-offline",
  "illustration-session-expired",
  "illustration-notification-denied",
  "illustration-permission-denied",
  "illustration-crisis-support",
];

// ---------------------------------------------------------------- raster jobs
// crop: [left, top, width, height] in source pixels. widths: output widths (null = source width).
const qa = (p) => app(`docs/qa/screenshots/frontend-redesign/${p}`);
const ref = (p) => app(`docs/design/verification/reference/${p}`);
const onb = (p) => app(`docs/design/onboarding-prototype/qa/${p}`);
const phone = [360, 720];
const doc = [900, 1600];
const refCrop = [826, 88, 708, 1508]; // the screen inside the prototype's device frame (2360x1682 canvas)

// The curated photo library: 36 files, 600 px wide at source, served from apps/mobile/assets/images.
// The design's asset manifest marks it as a stand-in set to be replaced with rights-cleared
// photography before release. The six image-direction photos and a-01 (the redesign's primary
// hero) also get a 600 px derivative.
const libraryIds = [
  ...Array.from({ length: 20 }, (_, i) => `a-${String(i + 1).padStart(2, "0")}`),
  ...Array.from({ length: 16 }, (_, i) => `b-${String(i + 1).padStart(2, "0")}`),
];
const largeIds = new Set(["a-01", "a-06", "b-12", "b-01", "a-07", "a-15", "b-16"]);

const jobs = [
  ...libraryIds.map((id) => ({ id: `photo-${id}`, src: app(`apps/mobile/assets/images/${id}.jpg`), widths: largeIds.has(id) ? [240, 600] : [240] })),
  // Maestro tab tour, May 30, 2026 (iOS Simulator, iPhone 17 Pro, iOS 26.4). The app repo
  // gitignores .maestro/screenshots, so these come from the local run that produced them.
  { id: "ios-tour-home", src: app(".maestro/screenshots/tour-00-home.png"), widths: phone },
  { id: "ios-tour-us", src: app(".maestro/screenshots/tour-03-us.png"), widths: phone },
  // Native QA captures, May 16, 2026 (iOS Simulator, iPhone 17 Pro; Android emulator, API 35)
  { id: "ios-home-light", src: qa("pr3-entry-pairing-home/ios/ios-home-dashboard-light-iphone17pro.png"), widths: phone },
  { id: "ios-home-dark", src: qa("pr3-entry-pairing-home/ios/ios-home-dashboard-dark-iphone17pro.png"), widths: phone },
  { id: "android-welcome-light", src: qa("pr3-entry-pairing-home/android/android-welcome-light-withyou-api-35.png"), widths: phone },
  { id: "android-welcome-dark", src: qa("pr3-entry-pairing-home/android/android-welcome-dark-withyou-api-35.png"), widths: phone },
  { id: "android-pair-invite-light", src: qa("pr3-entry-pairing-home/android/android-pair-invite-light-withyou-api-35.png"), widths: phone },
  { id: "android-pair-invite-dark", src: qa("pr3-entry-pairing-home/android/android-pair-invite-dark-withyou-api-35.png"), widths: phone },
  // May 14, 2026 — the bundler failure that moved the logo into code
  { id: "ios-svg-bundler-error", src: app("docs/design/verification/implementation-screenshots/ios/ios-homescreen.png"), widths: phone },
  // Onboarding QA captures from PR #80, June 17, 2026 (iOS Simulator)
  { id: "onb-impl-basic-profile", src: onb("00c-03-basic-profile.png"), widths: phone },
  { id: "onb-impl-communication", src: onb("00c-05-communication.png"), widths: phone },
  { id: "onb-impl-lens", src: onb("00c-06-lens.png"), widths: phone },
  { id: "onb-impl-privacy", src: onb("00c-07-privacy.png"), widths: phone },
  { id: "onb-impl-partner-card", src: onb("00c-08-partner-card.png"), widths: phone },
  { id: "onb-impl-pairing", src: onb("00c-09-pairing.png"), widths: phone },
  // Prototype reference captures, normalized May 13, 2026 from the v1.0 prototype
  { id: "ref-ios-pair-invite", src: ref("reference-ios-06-pair-invite.png"), crop: refCrop, widths: phone },
  { id: "ref-ios-home", src: ref("reference-ios-10-home-dashboard.png"), crop: refCrop, widths: phone },
  { id: "ref-ios-checkin-review", src: ref("reference-ios-11-checkin-review.png"), crop: refCrop, widths: phone },
  { id: "ref-ios-partner-summary", src: ref("reference-ios-11-checkin-partner-summary.png"), crop: refCrop, widths: phone },
  { id: "ref-ios-privacy", src: ref("reference-ios-15-privacy-data.png"), crop: refCrop, widths: phone },
  // App icon as shipped in app.config.js
  { id: "app-icon", src: app("apps/mobile/assets/icon.png"), widths: [256, 512] },
  // Renders of the design source files (scripts/withyou-design-captures.mjs, 2x)
  { id: "brandkit-identity", src: capture("brandkit-identity.png"), widths: doc },
  { id: "brandkit-components", src: capture("brandkit-components.png"), widths: doc },
  { id: "brandkit-handoff", src: capture("brandkit-handoff.png"), widths: doc },
  { id: "ds-platform-ios", src: capture("ds-platform-ios.png"), widths: doc },
  { id: "ds-platform-android", src: capture("ds-platform-android.png"), widths: doc },
  { id: "ds-colors-dark-mode", src: capture("ds-colors-dark-mode.png"), widths: doc },
  { id: "ds-components-widgets", src: capture("ds-components-widgets.png"), widths: doc },
  { id: "ds-screen-templates", src: capture("ds-screen-templates.png"), widths: doc },
  { id: "wireframes-canvas", src: capture("wireframes-canvas.png"), widths: doc },
  { id: "wfmap-title", src: capture("wfmap-title.png"), widths: doc },
  { id: "wfmap-user-flow", src: capture("wfmap-user-flow.png"), widths: doc },
  { id: "flow-graph", src: capture("flow-graph.png"), widths: doc },
  { id: "hifi-entry", src: capture("hifi-entry.png"), widths: doc },
  { id: "architecture-doc", src: capture("architecture-doc.png"), crop: [0, 0, 2880, 1560], widths: doc },
  { id: "handoff-ios-light-welcome", src: capture("handoff-ios-light-welcome.png"), widths: doc },
  { id: "handoff-android-dark-welcome", src: capture("handoff-android-dark-welcome.png"), widths: doc },
  { id: "onbspec-principles", src: capture("onbspec-principles.png"), widths: doc },
  { id: "onbspec-privacy-screen", src: capture("onbspec-privacy-screen.png"), widths: doc },
  { id: "onbspec-matrix", src: capture("onbspec-matrix.png"), widths: doc },
  // Marketing UI kit. The landing hero is cut above the mock-up's star-rating line (there are no
  // ratings), and the privacy band is kept as rendered — its headline really is invisible.
  { id: "mk-landing-hero", src: capture("mk-landing-desktop.png"), crop: [0, 0, 2560, 1395], widths: doc },
  { id: "mk-privacy-band", src: capture("mk-landing-desktop.png"), crop: [0, 4142, 2560, 816], widths: doc },
  { id: "mk-appstore-set", src: capture("mk-appstore-set.png"), widths: doc },
  { id: "mk-social-posts", src: capture("mk-social-posts.png"), widths: doc },
  ...(compositionsDir
    ? [{ id: "preview", src: path.join(compositionsDir, "preview.png"), widths: [480, 800, 1440] }]
    : []),
];

// ---------------------------------------------------------------- run
for (const dir of ["brand", "icons", "illustrations", "media"]) {
  await rm(path.join(outDir, dir), { recursive: true, force: true });
  await mkdir(path.join(outDir, dir), { recursive: true });
}

const record = { generatedBy: "scripts/withyou-assets.mjs", appCommit: process.env.APP_COMMIT ?? "612da33", brand: {}, icons: {}, illustrations: {}, media: {} };

async function copySvg(rel, targetDir) {
  const buf = await readFile(app(rel));
  const text = buf.toString("utf8");
  if (/<script|\son[a-z]+=|xlink:href="http/i.test(text)) throw new Error(`${rel} contains active content`);
  const name = path.basename(rel);
  await copyFile(app(rel), path.join(outDir, targetDir, name));
  const viewBox = text.match(/viewBox="([^"]+)"/)?.[1]?.split(/[\s,]+/).map(Number);
  return {
    src: `${publicBase}/${targetDir}/${name}`,
    width: viewBox?.[2] ?? null,
    height: viewBox?.[3] ?? null,
    sha256: sha256(buf),
    source: rel,
  };
}

for (const rel of brandFiles) {
  const id = path.basename(rel, ".svg").replace(/^withyou[-_]/, "").replace(/_/g, "-");
  record.brand[id] = await copySvg(rel, "brand");
}
for (const [group, names] of Object.entries(iconFiles)) {
  for (const name of names) {
    record.icons[name] = { ...(await copySvg(`apps/mobile/assets/icons/${group}/${name}.svg`, "icons")), group };
  }
}
for (const name of illustrationFiles) {
  record.illustrations[name] = await copySvg(`apps/mobile/assets/illustrations/${name}.svg`, "illustrations");
}

for (const job of jobs) {
  const sourceBuf = await readFile(job.src);
  let base = sharp(sourceBuf, { limitInputPixels: false });
  if (job.crop) {
    const [left, top, width, height] = job.crop;
    base = base.extract({ left, top, width, height });
  }
  const meta = job.crop ? { width: job.crop[2], height: job.crop[3] } : await sharp(sourceBuf).metadata();
  const sources = [];
  for (const requested of job.widths) {
    const width = Math.min(requested ?? meta.width, meta.width);
    const height = Math.round((meta.height * width) / meta.width);
    const resized = base.clone().resize({ width, withoutEnlargement: true });
    const stem = `${job.id}-${width}`;
    await resized.clone().avif({ quality: 60, effort: 4 }).toFile(path.join(outDir, "media", `${stem}.avif`));
    await resized.clone().webp({ quality: 82 }).toFile(path.join(outDir, "media", `${stem}.webp`));
    sources.push({ width, height, stem });
  }
  const largest = sources[sources.length - 1];
  record.media[job.id] = {
    width: largest.width,
    height: largest.height,
    avif: sources.map((s) => `${publicBase}/media/${s.stem}.avif ${s.width}w`).join(", "),
    webp: sources.map((s) => `${publicBase}/media/${s.stem}.webp ${s.width}w`).join(", "),
    fallback: `${publicBase}/media/${largest.stem}.webp`,
    sourceSha256: sha256(sourceBuf),
    ...(job.crop ? { crop: job.crop } : {}),
  };
}

if (compositionsDir) {
  await mkdir(path.join(outDir, "social"), { recursive: true });
  await sharp(await readFile(path.join(compositionsDir, "og.png")))
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, "social", "og.png"));
}

await writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
console.log(
  `Wrote ${Object.keys(record.brand).length} brand files, ${Object.keys(record.icons).length} icons, ` +
    `${Object.keys(record.illustrations).length} illustrations and ${Object.keys(record.media).length} media items.`,
);

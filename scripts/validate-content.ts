import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { fieldNotes } from "../client/src/data/fieldNotes";
import { investigations } from "../client/src/data/investigations";
import {
  coachingSite,
  codeHighlights,
  coachFigures,
  flagship,
  guidelineFigures,
  limitations as flagshipLimitations,
  processFigures,
  websiteFigures,
  applicationFigures,
} from "../client/src/data/earlTheKaiju";
import {
  architectureFigure as withYouArchitectureFigure,
  campaignFigures as withYouCampaignFigures,
  codeHighlights as withYouCode,
  comparisons as withYouComparisons,
  designSystemFigures as withYouDesignSystemFigures,
  flowFigures as withYouFlowFigures,
  handoffFigures as withYouHandoffFigures,
  onboardingBuild as withYouOnboardingBuild,
  overview as withYouOverview,
  photoInProduct as withYouPhotoInProduct,
  photoLibrary as withYouPhotoLibrary,
  photography as withYouPhotography,
  platformFigures as withYouPlatformFigures,
  sharingFigures as withYouSharingFigures,
  specFigures as withYouSpecFigures,
  svgErrorFigure as withYouSvgErrorFigure,
  withYou,
} from "../client/src/data/withyou";
import {
  codeHighlights as gundamCode,
  decisionSequence as gundamDecisionSequence,
  emptyStateFigure as gundamEmptyStateFigure,
  gundamForge,
  overview as gundamOverview,
  playtestFigures as gundamPlaytestFigures,
  repository as gundamRepository,
  responsiveFigures as gundamResponsiveFigures,
  surfaceFigures as gundamSurfaceFigures,
  themeFigures as gundamThemeFigures,
  workflowFigures as gundamWorkflowFigures,
} from "../client/src/data/gundamForge";
import {
  buildFigures as dojonetBuildFigures,
  codeHighlights as dojonetCode,
  composerFigure as dojonetComposerFigure,
  dojonet,
  fixFigures as dojonetFixFigures,
  mobileFigures as dojonetMobileFigures,
  overview as dojonetOverview,
  parityFigures as dojonetParityFigures,
  qaFigures as dojonetQaFigures,
  repository as dojonetRepository,
} from "../client/src/data/dojonet";
import {
  assertPublicationSafe,
  confirmedCurrentRoles,
  experience,
  professionalLinks,
  profile,
} from "../client/src/data/professional";

import { legacyRedirects, resolveHead, routeMeta } from "../client/src/data/routeMeta";
import { routeFile } from "./route-files";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const builtMode = process.argv.includes("--built");

const canonicalSourceFiles = [
  "client/src/App.tsx",
  "client/src/pages/home.tsx",
  "client/src/pages/work.tsx",
  "client/src/pages/investigation.tsx",
  "client/src/pages/research.tsx",
  "client/src/pages/field-notes.tsx",
  "client/src/pages/field-note.tsx",
  "client/src/pages/about.tsx",
  "client/src/pages/resume.tsx",
  "client/src/pages/contact.tsx",
  "client/src/pages/graduate-review.tsx",
  "client/src/components/layout/header.tsx",
  "client/src/components/layout/footer.tsx",
  "client/src/data/investigations.ts",
  "client/src/data/fieldNotes.ts",
  "client/src/pages/earl-the-kaiju.tsx",
  "client/src/data/earlTheKaiju.ts",
  "client/src/data/work.ts",
  "client/src/components/earl-the-kaiju/parts.tsx",
  "client/src/components/earl-the-kaiju/EcosystemDiagram.tsx",
  "client/src/pages/withyou.tsx",
  "client/src/data/withyou.ts",
  "client/src/components/withyou/parts.tsx",
  "client/src/pages/gundam-forge.tsx",
  "client/src/data/gundamForge.ts",
  "client/src/components/gundam-forge/parts.tsx",
  "client/src/pages/dojonet.tsx",
  "client/src/data/dojonet.ts",
  "client/src/components/dojonet/parts.tsx",
  "client/src/components/case-study-kit/kit.tsx",
  "client/index.html",
  "client/public/sitemap.xml",
];

const bannedPatterns = [
  /front-?end engineer\s*[·/|+]\s*ux engineer/i,
  /human-centered front-?end engineer/i,
  /portfolio in the form of a thesis/i,
  /three working products/i,
  /10\+\s*years/i,
  /ten years of engineering/i,
  /maintained in two variants/i,
  /request a tailored variant/i,
  /hci graduate study\s*[—-]\s*applications in progress/i,
  /rules-accurate simulator/i,
  /zero backend/i,
  /verified wcag aa/i,
  /\b531 integration tests\b/i,
  /\b17 e2e flows\b/i,
  // Chronology replaced by the Oct 24, 2026 résumé; these entries must not come back.
  /\bMerck\b/,
  /Verizon Wireless/,
];

function fail(message: string): never {
  throw new Error(`[content validation] ${message}`);
}

function read(relativePath: string) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function assertNoBannedLanguage(relativePath: string, content: string) {
  for (const pattern of bannedPatterns) {
    if (pattern.test(content)) {
      fail(`${relativePath} contains blocked public language: ${pattern}`);
    }
  }
}

function collectFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const absolute = path.join(directory, entry);
    return statSync(absolute).isDirectory() ? collectFiles(absolute) : [absolute];
  });
}

assertPublicationSafe();

// The public title matches the résumé headline (Oct 24, 2026).
if (profile.publicTitle !== "Lead Front-End Engineer") {
  fail("The canonical public title must be Lead Front-End Engineer, matching the résumé.");
}

if (professionalLinks.website !== "https://ehicksonjr.com") {
  fail("The canonical website must be https://ehicksonjr.com.");
}

for (const item of experience) {
  if (item.factStatus !== "verified") {
    fail(`Professional experience ${item.id} is not publication-safe.`);
  }
  if (
    /\bpresent\b/i.test(item.dates) &&
    !(confirmedCurrentRoles as readonly string[]).includes(item.id)
  ) {
    fail(`Professional experience ${item.id} uses Present without a confirmed current role.`);
  }
}

const expectedStatuses = {
  withyou: "Functional beta-oriented implementation",
  dojonet: "Active development",
  "gundam-forge": "Functional beta-oriented implementation",
};

for (const investigation of investigations) {
  if (investigation.status !== expectedStatuses[investigation.slug]) {
    fail(`${investigation.slug} does not use its governed project status.`);
  }
  if (!investigation.proposedMethods.length) {
    fail(`${investigation.slug} has no proposed evaluation method.`);
  }
}

// Earl the Kaiju flagship case study: evidence rules specific to an in-development product.
const flagshipUnsupported = [
  /production-ready/i,
  /\blive site\b/i,
  /\bnow live\b/i,
  /\blaunched\b/i,
  /booking system/i,
  /\bbook (a|your) (class|lesson|session) (now|today)\b/i,
  /\bcertified\b/i,
  /wcag (2\.\d )?compliant/i,
  /\b\d+\s*(new )?students (enrolled|signed up)\b/i,
  /\b(conversion|revenue) (rate|growth|increase)\b/i,
];
const flagshipSources = [
  "client/src/pages/earl-the-kaiju.tsx",
  "client/src/data/earlTheKaiju.ts",
  "client/src/components/earl-the-kaiju/parts.tsx",
  "client/src/components/earl-the-kaiju/EcosystemDiagram.tsx",
];
for (const relativePath of flagshipSources) {
  const content = read(relativePath);
  for (const pattern of flagshipUnsupported) {
    if (pattern.test(content)) fail(`${relativePath} makes an unsupported claim: ${pattern}`);
  }
}
if (coachingSite.liveUrl !== null) {
  let url: URL;
  try {
    url = new URL(coachingSite.liveUrl);
  } catch {
    fail("The coaching site URL is not a valid URL.");
  }
  if (url.protocol !== "https:" || /ehicksonjr\.com$/i.test(url.hostname) || /example|yourdomain|localhost/i.test(url.hostname)) {
    fail("The coaching site URL must be the verified public https site, not the portfolio or a placeholder.");
  }
}
if (flagship.path !== "/work/earl-the-kaiju") fail("The Earl the Kaiju case study must live at /work/earl-the-kaiju.");
if (!flagshipLimitations.length) fail("Earl the Kaiju must publish its known limitations.");
for (const figure of [...processFigures, ...guidelineFigures, ...applicationFigures, ...websiteFigures, ...coachFigures]) {
  if (figure.alt.trim().length < 12 || !figure.source.trim() || !figure.caption.trim()) {
    fail(`Earl the Kaiju figure ${figure.media} needs alt text, a caption and a source.`);
  }
}
if (processFigures.some((figure) => figure.media === "source-board" && figure.status !== "SOURCE REFERENCE")) {
  fail("The raster concept board must stay labeled as a source reference, not approved artwork.");
}
for (const item of codeHighlights) {
  if (!item.path || !item.commit || !item.evidence || !item.tradeoff) {
    fail(`Code highlight ${item.id} needs a source path, commit, tradeoff and evidence.`);
  }
  if (item.repo === "Epetaway/EarltheKaiju" && (item.href || item.code.split("\n").length > 30)) {
    fail(`Code highlight ${item.id} comes from a private repository: keep it a short excerpt with no link.`);
  }
}

// WithYou case study: a built, unreleased product. No release, clinical or outcome claims;
// every figure labeled and sourced; private-repository excerpts short and unlinked.
const withYouUnsupported = [
  /production-ready/i,
  /\blaunched\b/i,
  /\bin production\b/i,
  /\bnow live\b/i,
  /\bHIPAA\b/i,
  /\b(clinically|scientifically) (proven|validated)\b/i,
  /\bimproved? relationship outcomes?\b(?! (has|have) (not )?been)/i,
  /wcag (2\.\d )?compliant/i,
  /\b\d[\d,]* (users|couples|downloads)\b/i,
  /★|\b\d(\.\d)? (stars?|star rating)\b/i,
];
for (const relativePath of ["client/src/pages/withyou.tsx", "client/src/data/withyou.ts", "client/src/components/withyou/parts.tsx"]) {
  const content = read(relativePath);
  for (const pattern of withYouUnsupported) {
    if (pattern.test(content)) fail(`${relativePath} makes an unsupported claim: ${pattern}`);
  }
}
if (withYou.path !== "/work/withyou") fail("The WithYou case study must live at /work/withyou.");
for (const figure of [
  ...withYouDesignSystemFigures,
  ...withYouFlowFigures,
  ...withYouComparisons.flatMap((item) => [item.design, ...item.build]),
  ...withYouSharingFigures,
  ...withYouPlatformFigures,
  ...withYouOnboardingBuild,
  ...withYouHandoffFigures,
  ...withYouSpecFigures,
  withYouSvgErrorFigure,
  withYouArchitectureFigure,
  ...withYouPhotoInProduct,
  ...Object.values(withYouCampaignFigures),
]) {
  if (figure.alt.trim().length < 12 || !figure.source.trim() || !figure.caption.trim()) {
    fail(`WithYou figure ${figure.media} needs alt text, a caption and a source.`);
  }
}
// The couple photography is AI-generated stand-in art: it stays labeled as that wherever it appears.
if (withYouPhotoLibrary.length !== 36 || !/AI-generated/.test(withYouPhotography.placeholder) || !/AI-generated/.test(withYouOverview.boundary)) {
  fail("The WithYou photo library must show all 36 photos and say plainly that they are AI-generated stand-ins.");
}
for (const item of withYouCode) {
  if (!item.path || !item.commit || !item.evidence || !item.tradeoff) {
    fail(`WithYou code highlight ${item.id} needs a source path, commit, tradeoff and evidence.`);
  }
  if ("href" in item || item.code.split("\n").length > 30) {
    fail(`WithYou code highlight ${item.id} comes from a private repository: keep it a short excerpt with no link.`);
  }
}

// Gundam Forge and DojoNet case studies: built, unreleased prototypes from public repositories.
// No release, accuracy or outcome claims; every figure labeled and sourced; excerpts linked to the
// exact lines at the cited commit.
type PublicExcerpt = { id: string; path: string; lines: [number, number]; code: string; tradeoff: string; evidence: string };
function assertPublicExcerpts(label: string, repo: { url: string; commit: string; fullCommit: string }, items: PublicExcerpt[]) {
  if (!/^[0-9a-f]{40}$/.test(repo.fullCommit) || !repo.fullCommit.startsWith(repo.commit) || !repo.url.startsWith("https://github.com/Epetaway/")) {
    fail(`${label} must cite a full commit hash in a public Epetaway repository.`);
  }
  for (const item of items) {
    if (!item.path || !item.tradeoff || !item.evidence || !(item.lines[0] > 0 && item.lines[0] < item.lines[1])) {
      fail(`${label} code highlight ${item.id} needs a source path, a line range, a tradeoff and evidence.`);
    }
    if (item.code.split("\n").length > 30) fail(`${label} code highlight ${item.id} is longer than 30 lines.`);
  }
}
function assertFigures(label: string, figures: { media: string; alt: string; caption: string; source: string }[]) {
  for (const figure of figures) {
    if (figure.alt.trim().length < 12 || !figure.source.trim() || !figure.caption.trim()) {
      fail(`${label} figure ${figure.media} needs alt text, a caption and a source.`);
    }
  }
}

const gundamUnsupported = [
  /production-ready/i,
  /\blaunched\b/i,
  /\bnow live\b/i,
  /\bin production\b/i,
  /rules-accurate/i,
  /\bofficial (Bandai )?(app|tool|partner|product)\b/i,
  /\bAI-powered\b/i,
  /\b(competitive|tournament)-(ready|grade|winning)\b/i,
  /wcag (2\.\d )?compliant/i,
  /\b\d[\d,]* (users|players|downloads)\b/i,
];
for (const relativePath of ["client/src/pages/gundam-forge.tsx", "client/src/data/gundamForge.ts", "client/src/components/gundam-forge/parts.tsx"]) {
  const content = read(relativePath);
  for (const pattern of gundamUnsupported) {
    if (pattern.test(content)) fail(`${relativePath} makes an unsupported claim: ${pattern}`);
  }
}
if (gundamForge.path !== "/work/gundam-forge") fail("The Gundam Forge case study must live at /work/gundam-forge.");
// The fan-project and card-art boundaries stay stated, on the record and on the page.
if (!/Unofficial and not affiliated with Bandai/.test(gundamOverview.boundary) || !/text proxies/.test(gundamOverview.boundary)) {
  fail("Gundam Forge must say it is unofficial and that official card art is replaced by text proxies.");
}
if (!/Not affiliated with or endorsed by Bandai/.test(read("client/src/pages/gundam-forge.tsx"))) {
  fail("The Gundam Forge page must close with its unofficial fan-project statement.");
}
const gundamFigures = [
  ...gundamWorkflowFigures,
  ...gundamDecisionSequence,
  ...gundamPlaytestFigures,
  ...gundamSurfaceFigures,
  gundamEmptyStateFigure,
  ...gundamResponsiveFigures,
  ...gundamThemeFigures,
];
assertFigures("Gundam Forge", gundamFigures);
if (gundamFigures.some((figure) => figure.status !== "LOCAL BUILD CAPTURE")) {
  fail("Every Gundam Forge capture must stay labeled as a local build capture.");
}
assertPublicExcerpts("Gundam Forge", gundamRepository, gundamCode);

const dojonetUnsupported = [
  /production-ready/i,
  /\blaunched\b/i,
  /\bnow live\b/i,
  /\bimproves? (learning|retention|outcomes)\b/i,
  /\b(proven|validated) (to|learning)\b/i,
  /wcag (2\.\d )?compliant/i,
  /\b\d[\d,]* (users|students|members|downloads)\b/i,
];
for (const relativePath of ["client/src/pages/dojonet.tsx", "client/src/data/dojonet.ts", "client/src/components/dojonet/parts.tsx"]) {
  const content = read(relativePath);
  for (const pattern of dojonetUnsupported) {
    if (pattern.test(content)) fail(`${relativePath} makes an unsupported claim: ${pattern}`);
  }
}
if (dojonet.path !== "/work/dojonet") fail("The DojoNet case study must live at /work/dojonet.");
if (!/neutral placeholders/.test(dojonetOverview.boundary)) {
  fail("DojoNet must say that remote avatars and photos render as neutral placeholders.");
}
const dojonetFigures = [
  ...dojonetFixFigures.flatMap((pair) => [pair.before, pair.after]),
  dojonetComposerFigure,
  ...dojonetBuildFigures,
  ...dojonetParityFigures,
  ...dojonetMobileFigures,
  ...dojonetQaFigures,
];
assertFigures("DojoNet", dojonetFigures);
// A capture with the injected token rule is a demonstrated fix, never the app as built — and the reverse.
for (const figure of dojonetFigures) {
  if (figure.media.endsWith("-fixed") !== (figure.status === "FIX DEMONSTRATED")) {
    fail(`DojoNet figure ${figure.media} must be labeled FIX DEMONSTRATED exactly when it carries the injected token rule.`);
  }
}
assertPublicExcerpts("DojoNet", dojonetRepository, dojonetCode);

if (fieldNotes.length !== 4) {
  fail("Exactly four canonical Field Notes must be published.");
}

const appSource = read("client/src/App.tsx");
if (/HandoffFrame|<iframe|\.dc\.html/i.test(appSource)) {
  fail("The canonical router references iframe handoff architecture.");
}

for (const relativePath of canonicalSourceFiles) {
  assertNoBannedLanguage(relativePath, read(relativePath));
}

const sitemap = read("client/public/sitemap.xml");
const expectedRoutes = [
  "/work/withyou",
  "/work/dojonet",
  "/work/gundam-forge",
  "/work/earl-the-kaiju",
  "/research",
  "/field-notes/a-bridge-you-meet-each-other-on",
  "/field-notes/teaching-jiu-jitsu-and-ux",
  "/field-notes/designing-consent",
  "/field-notes/information-architecture-and-card-games",
  "/about",
  "/resume",
  "/contact",
  "/graduate-review",
];
for (const route of expectedRoutes) {
  if (!sitemap.includes(`https://ehicksonjr.com${route}`)) {
    fail(`Sitemap is missing ${route}.`);
  }
}

// Route metadata: every canonical route shares a raster image that exists, one URL per route.
const rasterImage = /\.(?:png|jpe?g)$/i;
const seenRoutePaths = new Set<string>();
for (const meta of routeMeta) {
  if (seenRoutePaths.has(meta.path)) fail(`Route metadata lists ${meta.path} twice.`);
  seenRoutePaths.add(meta.path);
  const image = meta.image ?? "";
  if (!rasterImage.test(image)) {
    fail(`${meta.path} share image must be PNG or JPG (social platforms don't render SVG): ${image || "(none)"}.`);
  }
  if (!existsSync(path.join(root, "client/public", image))) {
    fail(`${meta.path} share image ${image} is missing from client/public.`);
  }
}
if (/og-[\w-]+\.svg|og:image"[^>]+\.svg/i.test(read("client/index.html"))) {
  fail("client/index.html still references an SVG share image.");
}

if (builtMode) {
  const dist = path.join(root, "dist/public");
  const builtFiles = [
    path.join(dist, "index.html"),
    ...collectFiles(path.join(dist, "assets")).filter((file) =>
      /\.(?:js|css|svg)$/i.test(file),
    ),
  ].filter(
    (file) =>
      !file.includes(`${path.sep}hceps${path.sep}`) &&
      !file.includes(`${path.sep}prototypes${path.sep}`),
  );

  for (const absolute of builtFiles) {
    const relative = path.relative(root, absolute);
    const content = readFileSync(absolute, "utf8");
    assertNoBannedLanguage(relative, content);
    if (/HandoffFrame|<iframe[^>]+\.dc\.html/i.test(content)) {
      fail(`${relative} contains canonical handoff architecture.`);
    }
  }

  // Every canonical route has a static file with its own head, so GitHub Pages answers 200 and
  // crawlers see the right title, canonical and share image without running JavaScript.
  const attribute = (html: string, pattern: RegExp) => html.match(pattern)?.[1];
  const homeTitle = resolveHead(routeMeta.find((meta) => meta.path === "/")!).title;
  for (const meta of routeMeta) {
    const file = path.join(dist, routeFile(meta.path));
    if (!existsSync(file)) fail(`${meta.path} has no prerendered file (${path.relative(root, file)}).`);
    const html = readFileSync(file, "utf8");
    const expected = resolveHead(meta);
    const title = attribute(html, /<title>([^<]*)<\/title>/);
    const canonical = attribute(html, /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
    const ogUrl = attribute(html, /<meta[^>]*property="og:url"[^>]*content="([^"]+)"/);
    const ogImage = attribute(html, /<meta[^>]*property="og:image"[^>]*content="([^"]+)"/);
    if (canonical !== expected.canonical) fail(`${meta.path} canonical is ${canonical}, expected ${expected.canonical}.`);
    if (ogUrl !== expected.canonical) fail(`${meta.path} og:url is ${ogUrl}, expected ${expected.canonical}.`);
    if (!ogImage || !rasterImage.test(ogImage)) fail(`${meta.path} og:image is not a PNG or JPG: ${ogImage}.`);
    const imagePath = new URL(ogImage).pathname;
    if (!existsSync(path.join(dist, imagePath))) fail(`${meta.path} og:image ${imagePath} is missing from dist/public.`);
    if (!title) fail(`${meta.path} has no <title>.`);
    if (meta.path !== "/" && title === homeTitle.replace(/&/g, "&amp;")) {
      fail(`${meta.path} still has the homepage title.`);
    }
    if ((html.match(/<title>/g) ?? []).length !== 1) fail(`${meta.path} has more than one <title>.`);
  }

  const notFoundHtml = readFileSync(path.join(dist, "404.html"), "utf8");
  if (!/<meta name="robots" content="noindex"/.test(notFoundHtml)) fail("404.html is not marked noindex.");
  if (/rel="canonical"/.test(notFoundHtml)) fail("404.html must not declare a canonical URL.");

  for (const { from, to } of legacyRedirects) {
    const file = path.join(dist, routeFile(from));
    if (!existsSync(file)) fail(`Legacy URL ${from} has no redirect file.`);
    if (!readFileSync(file, "utf8").includes(`url=${to}"`)) fail(`Legacy URL ${from} doesn't redirect to ${to}.`);
  }
}

process.stdout.write(
  `Content validation passed (${builtMode ? "built output" : "source"}).\n`,
);

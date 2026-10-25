import { readFileSync, readdirSync, statSync } from "node:fs";
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
  assertPublicationSafe,
  experience,
  professionalLinks,
  profile,
} from "../client/src/data/professional";

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

if (profile.publicTitle !== "UX Engineer") {
  fail("The canonical public title must be UX Engineer.");
}

if (professionalLinks.website !== "https://ehicksonjr.com") {
  fail("The canonical website must be https://ehicksonjr.com.");
}

for (const item of experience) {
  if (item.factStatus !== "verified") {
    fail(`Professional experience ${item.id} is not publication-safe.`);
  }
  if (/\bpresent\b/i.test(item.dates)) {
    fail(`Professional experience ${item.id} uses unverified Present language.`);
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

if (fieldNotes.length !== 3) {
  fail("Exactly three canonical Field Notes must be published.");
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
}

process.stdout.write(
  `Content validation passed (${builtMode ? "built output" : "source"}).\n`,
);

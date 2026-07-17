import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const errors = [];

function fail(message) {
  errors.push(message);
}

function read(path) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    fail(`Missing required file: ${path}`);
    return "";
  }
  return readFileSync(absolute, "utf8");
}

function filesWithin(path) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) return [];
  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const child = join(absolute, entry.name);
    return entry.isDirectory()
      ? filesWithin(relative(root, child))
      : [relative(root, child)];
  });
}

function expect(condition, message) {
  if (!condition) fail(message);
}

const facts = JSON.parse(read("client/src/data/professionalFacts.json"));
const app = read("client/src/App.tsx");
const redirects = read("client/public/_redirects");
const publishedRoutes = read("client/src/data/publishedRoutes.ts");
const routeShellGenerator = read("scripts/generate_route_shells.mjs");

expect(facts.profile.title === "UX Engineer", "The canonical professional title must remain UX Engineer.");
expect(facts.profile.links.resume === "/assets/Earl-Hickson-Jr-Resume.pdf", "The canonical public resume path changed.");
expect(facts.profile.links.graduateCv === "/assets/application/Earl-Hickson-Jr-HCI-Graduate-CV.pdf", "The graduate CV path changed.");
expect(Array.isArray(facts.unresolvedProfessionalFacts) && facts.unresolvedProfessionalFacts.length > 0, "Unresolved employment facts must remain explicit until confirmed.");

const ama = facts.professionalExperience.find((role) => role.id === "ama-fight-club");
expect(Boolean(ama), "AMA Fight Club experience is missing from the canonical record.");
expect(ama?.endKnown === false, "AMA Fight Club must not be presented with a confirmed end date.");
expect(!/present/i.test(ama?.dates ?? ""), "AMA Fight Club must not be labeled Present without confirmation.");

expect(!/HandoffFrame|<iframe\b/i.test(app), "The canonical router must not use the retired iframe handoff.");
expect(app.includes('path="/graduate-review"'), "The graduate-review route is missing.");
expect(redirects.includes("/projects /work 301"), "The legacy /projects redirect is missing.");
expect(redirects.includes("/assets/Earl_Hickson_Jr_Front_End_Engineer.docx"), "The legacy resume redirect is missing.");

for (const [, slug] of publishedRoutes.matchAll(/"([a-z0-9-]+)"/g)) {
  expect(redirects.includes(`/blog/${slug} /field-notes/${slug} 301`), `The legacy blog redirect is missing for ${slug}.`);
  expect(routeShellGenerator.includes(`/field-notes/${slug}`), `The metadata shell is missing for ${slug}.`);
}

const productionFiles = [
  "client/index.html",
  "client/src/App.tsx",
  "client/src/components/layout/header.tsx",
  "client/src/components/layout/footer.tsx",
  "client/src/components/seo.tsx",
  "client/src/data/professionalFacts.json",
  "client/src/data/investigations.ts",
  "client/src/data/fieldNotes.ts",
  "client/src/data/publishedRoutes.ts",
  ...filesWithin("client/src/pages").filter((path) =>
    /\/(home|work|investigation|research|field-notes|field-note|about|resume|contact|graduate-review|not-found)\.tsx$/.test(path),
  ),
];

const forbiddenClaims = [
  [/\b(?:3|three) shipped products?\b/i, "unsupported shipped-product count"],
  [/\bproduction[- ]ready\b/i, "unverified production-readiness claim"],
  [/\brules[- ]accurate\b/i, "unverified rules-accuracy claim"],
  [/\bzero backend\b/i, "unsupported architecture claim"],
  [/\bWCAG compliant\b/i, "unverified compliance claim"],
  [/\b10\+ years\b/i, "unsupported experience-duration claim"],
  [/\bapplications? in progress\b/i, "unsupported application-status claim"],
  [/\b623(?:-record| records?)\b/i, "unsupported dataset-size claim"],
];

for (const path of productionFiles) {
  const content = read(path);
  for (const [pattern, label] of forbiddenClaims) {
    if (pattern.test(content)) fail(`${path}: ${label}`);
  }
}

const publicDocuments = filesWithin("client/public").filter((path) => [".pdf", ".docx"].includes(extname(path).toLowerCase()));
const expectedPublicDocuments = [
  "client/public/assets/Earl-Hickson-Jr-Resume.pdf",
  "client/public/assets/application/Earl-Hickson-Jr-HCI-Graduate-CV.pdf",
];

expect(
  JSON.stringify(publicDocuments.sort()) === JSON.stringify(expectedPublicDocuments.sort()),
  `Unexpected public PDF/DOCX set: ${publicDocuments.join(", ") || "none"}`,
);

for (const path of expectedPublicDocuments) {
  expect(existsSync(join(root, path)) && statSync(join(root, path)).size > 1_000, `${path} is missing or unexpectedly small.`);
}

if (errors.length) {
  console.error(`Public-content validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Public-content validation passed (${productionFiles.length} source files, ${publicDocuments.length} public documents).`);

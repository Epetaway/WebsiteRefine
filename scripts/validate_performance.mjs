import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];
const results = [];

function checkFile(relativePath, maximumBytes) {
  const absolutePath = path.join(root, relativePath);
  const bytes = statSync(absolutePath).size;
  results.push({ file: relativePath, bytes, maximumBytes });
  if (bytes > maximumBytes) failures.push(`${relativePath} is ${bytes} bytes; budget is ${maximumBytes}`);
}

function largestBuiltAsset(extension, maximumBytes) {
  const directory = path.join(root, "dist/public/assets");
  const files = readdirSync(directory)
    .filter((file) => file.endsWith(extension))
    .map((file) => ({ file, bytes: statSync(path.join(directory, file)).size }))
    .sort((a, b) => b.bytes - a.bytes);
  if (!files.length) {
    failures.push(`No built ${extension} assets found; run the production build first`);
    return;
  }
  const largest = files[0];
  results.push({ file: `dist/public/assets/${largest.file}`, bytes: largest.bytes, maximumBytes });
  if (largest.bytes > maximumBytes) failures.push(`Largest ${extension} asset is ${largest.bytes} bytes; budget is ${maximumBytes}`);
}

const imageBudget = 250 * 1024;
[
  "client/src/images/me.webp",
  "client/src/images/BLKBELT.webp",
  "client/src/images/earl-bjj-photo.webp",
  "client/public/assets/projects/withyou/home-exhibit.webp",
  "client/public/assets/projects/dojonet/home-exhibit.webp",
  "client/public/assets/projects/gundam-forge/home-exhibit.webp",
].forEach((file) => checkFile(file, imageBudget));

largestBuiltAsset(".js", 250 * 1024);
largestBuiltAsset(".css", 110 * 1024);

const appSource = readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const pageImports = [...appSource.matchAll(/const\s+\w+\s*=\s*lazy\(\(\)\s*=>\s*import\("@\/pages\//g)];
if (pageImports.length < 11) failures.push(`Expected at least 11 lazy page imports; found ${pageImports.length}`);

for (const relativePath of ["client/src/pages/home.tsx", "client/src/pages/field-notes.tsx", "client/src/pages/about.tsx"]) {
  const source = readFileSync(path.join(root, relativePath), "utf8");
  if (!source.includes('loading="lazy"')) failures.push(`${relativePath} must lazy-load below-the-fold images`);
  if (!source.includes("width=") || !source.includes("height=")) failures.push(`${relativePath} must reserve image layout space with dimensions`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  const format = (bytes) => `${Math.round(bytes / 1024)} KB`;
  console.log(`performance validation passed ${results.length + 2} checks`);
  for (const result of results) console.log(`- ${result.file}: ${format(result.bytes)} / ${format(result.maximumBytes)}`);
  console.log(`- route-level code splitting: ${pageImports.length} lazy page imports`);
  console.log("- below-the-fold editorial images use native lazy loading and reserve layout space");
}

import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { fieldNotes } from "@/data/fieldNotes";
import { investigations } from "@/data/investigations";
import { legacyRedirects, routeMeta } from "@/data/routeMeta";

// Every page a visitor can land on needs an entry in client/src/data/routeMeta/, or the
// prerender step has nothing to write and crawlers get a 404 for it.

const appSource = readFileSync(path.resolve(__dirname, "../App.tsx"), "utf8");
const staticRoutePaths = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((routePath) => routePath !== "*" && !routePath.includes(":"));
const metaPaths = new Set(routeMeta.map((meta) => meta.path));

describe("route metadata", () => {
  it("finds the static routes in App.tsx", () => {
    expect(staticRoutePaths).toContain("/");
    expect(staticRoutePaths).toContain("/field-notes");
  });

  it.each(staticRoutePaths)("has an entry for %s", (routePath) => {
    expect(metaPaths.has(routePath)).toBe(true);
  });

  it.each(fieldNotes.map((note) => note.slug))("has an entry for Field Note %s", (slug) => {
    const meta = routeMeta.find((entry) => entry.path === `/field-notes/${slug}`);
    expect(meta).toBeDefined();
    expect(meta?.type).toBe("article");
    expect(meta?.image).toBe(`/assets/field-notes/og-${slug}.png`);
  });

  it.each(investigations.map((item) => `/work/${item.slug}`))(
    "has an entry for the case study at %s",
    (routePath) => {
      expect(metaPaths.has(routePath)).toBe(true);
    },
  );

  it("lists each path once, with a raster share image", () => {
    expect(metaPaths.size).toBe(routeMeta.length);
    for (const meta of routeMeta) expect(meta.image).toMatch(/\.(png|jpe?g)$/);
  });

  it("points every legacy URL at a canonical route", () => {
    for (const { to } of legacyRedirects) expect(metaPaths.has(to)).toBe(true);
  });
});

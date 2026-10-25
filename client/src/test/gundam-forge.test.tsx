import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "@/App";
import { permalink } from "@/components/case-study-kit/kit";
import {
  cardColors,
  codeHighlights,
  decisionSequence,
  emptyStateFigure,
  gfMedia,
  gfOg,
  gundamForge,
  gundamForgeRecord,
  overview,
  playtestFigures,
  repository,
  responsiveFigures,
  signals,
  statusLedger,
  surfaceFigures,
  surfaces,
  textLevels,
  themeFigures,
  workflowFigures,
} from "@/data/gundamForge";
import { workEntries } from "@/data/work";

const publicDir = path.resolve(process.cwd(), "client/public");

function renderRoute(route: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

// WCAG 2.x relative-luminance contrast, to keep the page's computed ratios honest.
function contrast(a: string, b: string) {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
const ratioIn = (text: string) => Number(/(\d+(?:\.\d+)?):1/.exec(text)?.[1]);

const allFigures = [
  ...workflowFigures,
  ...decisionSequence,
  ...playtestFigures,
  ...surfaceFigures,
  emptyStateFigure,
  ...responsiveFigures,
  ...themeFigures,
];

describe("Gundam Forge case study", () => {
  it("keeps its place in the case-study order with the new preview composition", () => {
    const entry = workEntries.find((item) => item.slug === "gundam-forge");
    expect(entry).toMatchObject({ path: "/work/gundam-forge", number: "03" });
    expect(entry?.heroMedia.src).toMatch(/\/assets\/projects\/gundam-forge\/media\/preview-1440\.webp$/);
    expect(existsSync(path.join(publicDir, gfOg))).toBe(true);
  });

  it("renders the three chapters, the prototype, the code and the limitations", async () => {
    renderRoute("/work/gundam-forge");
    expect(await screen.findByRole("heading", { level: 1, name: /^Gundam Forge — Show the rule while the player is still deciding/ }, { timeout: 5000 })).toBeInTheDocument();
    for (const name of [/The interface system/i, /Designing the decision/i, /Engineering the rules/i, /What exists — and what doesn't yet/i, /The case in five minutes/i]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { name: "Constraint, explanation, recovery", level: 3 })).toBeInTheDocument();
    expect(screen.getAllByRole("article").filter((node) => node.className === "gf-code-card")).toHaveLength(codeHighlights.length);
    const limitations = screen.getByRole("heading", { name: /Known limitations/i }).parentElement as HTMLElement;
    expect(within(limitations).getAllByRole("listitem")).toHaveLength(gundamForgeRecord.limitations.length);
    expect(screen.getByText(/Not affiliated with or endorsed by Bandai/)).toBeInTheDocument();
  });

  it("gives every image alt text, and every figure a caption, source and real derivative", async () => {
    renderRoute("/work/gundam-forge");
    await screen.findByRole("heading", { level: 1, name: /^Gundam Forge — / }, { timeout: 5000 });
    for (const image of Array.from(document.querySelectorAll("main img"))) {
      expect(image.hasAttribute("alt")).toBe(true);
    }
    for (const figure of allFigures) {
      expect(figure.alt.trim().length).toBeGreaterThanOrEqual(12);
      expect(figure.caption.trim()).not.toBe("");
      expect(figure.source.trim()).not.toBe("");
      expect(gfMedia[figure.media]).toBeDefined();
      expect(figure.status).toBe("LOCAL BUILD CAPTURE");
    }
    for (const item of Object.values(gfMedia)) {
      expect(item.fallback).toMatch(/^\/assets\/projects\/gundam-forge\/media\/.+\.webp$/);
      expect(existsSync(path.join(publicDir, item.fallback))).toBe(true);
      for (const entry of `${item.avif}, ${item.webp}`.split(", ")) {
        expect(existsSync(path.join(publicDir, entry.split(" ")[0]))).toBe(true);
      }
    }
  });

  it("says plainly that the art is replaced and the project is unofficial", () => {
    expect(overview.boundary).toMatch(/Unofficial and not affiliated with Bandai/);
    expect(overview.boundary).toMatch(/official card art is replaced by text proxies/);
    const assetsDoc = readFileSync(path.resolve(process.cwd(), "docs/GUNDAM-FORGE-ASSETS.md"), "utf8");
    expect(assetsDoc).toMatch(/TEXT PROXY/);
  });

  it("states contrast ratios that match the WCAG formula", () => {
    const surface = "#141f34";
    for (const swatch of textLevels) expect(contrast(swatch.hex, surface)).toBeCloseTo(ratioIn(swatch.contrast), 1);
    for (const swatch of signals) expect(contrast(swatch.hex, surface)).toBeCloseTo(ratioIn(swatch.contrast), 1);
    for (const colour of cardColors) expect(contrast(colour.hex, surface)).toBeCloseTo(ratioIn(colour.contrast), 2);
    for (const swatch of surfaces.filter((item) => item.contrast.startsWith("Primary text"))) {
      expect(contrast("#e9eff7", swatch.hex)).toBeCloseTo(ratioIn(swatch.contrast), 1);
    }
    // The primary-button finding and its fix, and the page's own button.
    expect(contrast("#ffffff", "#3b82f6")).toBeCloseTo(3.68, 2);
    expect(contrast("#ffffff", "#2563eb")).toBeCloseTo(5.17, 2);
  });

  it("links every public excerpt to its exact lines and makes no release claims", () => {
    for (const item of codeHighlights) {
      expect(item.code.split("\n").length).toBeLessThanOrEqual(30);
      expect(item.lines[0]).toBeLessThan(item.lines[1]);
      expect(permalink(repository, item)).toBe(`https://github.com/Epetaway/Gundam-Forge/blob/${repository.fullCommit}/${item.path}#L${item.lines[0]}-L${item.lines[1]}`);
    }
    expect(repository.fullCommit.startsWith(repository.commit)).toBe(true);
    for (const item of statusLedger) {
      expect(`${item.value} ${item.status}`).not.toMatch(/\b(launched|now live|production-ready|in production)\b/i);
    }
    expect(gundamForge.path).toBe("/work/gundam-forge");
  });
});

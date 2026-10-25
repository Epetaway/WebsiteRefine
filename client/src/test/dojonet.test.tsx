import { existsSync } from "node:fs";
import path from "node:path";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "@/App";
import { permalink } from "@/components/case-study-kit/kit";
import {
  buildFigures,
  codeHighlights,
  composerFigure,
  dnMedia,
  dnOg,
  dojonet,
  dojonetRecord,
  fixFigures,
  mobileFigures,
  overview,
  palette,
  parityFigures,
  qaFigures,
  repository,
  stages,
  statusLedger,
  tokenAudit,
} from "@/data/dojonet";
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

function contrast(a: string, b: string) {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
// A colour at `alpha` over white, as a hex string.
const tint = (hex: string, alpha: number) =>
  `#${[1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * alpha + 255 * (1 - alpha)).toString(16).padStart(2, "0")).join("")}`;
const ratioIn = (text: string) => Number(/(\d+(?:\.\d+)?):1/.exec(text)?.[1]);

const allFigures = [
  ...fixFigures.flatMap((pair) => [pair.before, pair.after]),
  composerFigure,
  ...buildFigures,
  ...parityFigures,
  ...mobileFigures,
  ...qaFigures,
];

describe("DojoNet case study", () => {
  it("keeps its place in the case-study order with the new preview composition", () => {
    const entry = workEntries.find((item) => item.slug === "dojonet");
    expect(entry).toMatchObject({ path: "/work/dojonet", number: "04" });
    expect(entry?.heroMedia.src).toMatch(/\/assets\/projects\/dojonet\/media\/preview-1440\.webp$/);
    expect(existsSync(path.join(publicDir, dnOg))).toBe(true);
  });

  it("renders the chapters, the prototype, the code and the limitations", async () => {
    renderRoute("/work/dojonet");
    expect(await screen.findByRole("heading", { level: 1, name: /^DojoNet — Progress isn't the same as completion/ }, { timeout: 5000 })).toBeInTheDocument();
    for (const name of [/The design system/i, /Designing for learning/i, /Engineering, and what I'd fix/i, /What exists — and what doesn't yet/i, /The case in five minutes/i]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("article").filter((node) => node.className === "dn-code-card")).toHaveLength(codeHighlights.length);
    const limitations = screen.getByRole("heading", { name: /Known limitations/i }).parentElement as HTMLElement;
    expect(within(limitations).getAllByRole("listitem")).toHaveLength(dojonetRecord.limitations.length);
  });

  it("lets the proposed stage control be operated, with its state exposed", async () => {
    renderRoute("/work/dojonet");
    await screen.findByRole("heading", { level: 1, name: /^DojoNet — / }, { timeout: 5000 });
    const group = screen.getByRole("group", { name: /Stage for Hip Escape/ });
    const mastered = within(group).getByRole("button", { name: /Mastered/ });
    expect(mastered).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(mastered);
    expect(mastered).toHaveAttribute("aria-pressed", "true");
    // The meaning is announced from a polite live region beside the control.
    const live = screen.getAllByText(stages[3].meaning).find((node) => node.getAttribute("aria-live") === "polite");
    expect(live).toBeDefined();
  });

  it("gives every figure alt text, a caption, a source and a real derivative, and labels the fix", () => {
    for (const figure of allFigures) {
      expect(figure.alt.trim().length).toBeGreaterThanOrEqual(12);
      expect(figure.caption.trim()).not.toBe("");
      expect(figure.source.trim()).not.toBe("");
      expect(dnMedia[figure.media]).toBeDefined();
      // Any capture with the injected token rule says so.
      expect(figure.media.endsWith("-fixed")).toBe(figure.status === "FIX DEMONSTRATED");
    }
    for (const item of Object.values(dnMedia)) {
      expect(item.fallback).toMatch(/^\/assets\/projects\/dojonet\/media\/.+\.webp$/);
      expect(existsSync(path.join(publicDir, item.fallback))).toBe(true);
    }
    expect(overview.boundary).toMatch(/neutral placeholders/);
  });

  it("states contrast ratios that match the WCAG formula", () => {
    expect(contrast("#ffffff", "#f9f9f9")).toBeCloseTo(1.05, 2);
    expect(contrast("#ffffff", "#b71c1c")).toBeCloseTo(6.57, 2);
    expect(contrast("#ffffff", "#ef4444")).toBeCloseTo(3.76, 2);
    expect(contrast("#4d4d4d", "#f9f9f9")).toBeCloseTo(8.03, 2);
    for (const stage of stages) {
      expect(contrast(stage.hex, tint(stage.hex, 0.1))).toBeCloseTo(ratioIn(stage.selectedContrast), 1);
      // The proposed selected state on the page: Matte Black on a 22% tint.
      expect(contrast("#1a1a1a", tint(stage.hex, 0.22))).toBeGreaterThan(13);
    }
    for (const swatch of palette.filter((item) => ["Teal", "Amber"].includes(item.name))) {
      expect(contrast(swatch.hex, "#ffffff")).toBeCloseTo(ratioIn(swatch.contrast), 1);
    }
    expect(tokenAudit.undefinedNames).toHaveLength(6);
  });

  it("links every public excerpt to its exact lines and makes no outcome claims", () => {
    for (const item of codeHighlights) {
      expect(item.code.split("\n").length).toBeLessThanOrEqual(30);
      expect(permalink(repository, item)).toContain(`/blob/${repository.fullCommit}/${item.path}#L`);
    }
    for (const item of statusLedger) {
      expect(`${item.value} ${item.status}`).not.toMatch(/\b(launched|now live|production-ready|improves learning)\b/i);
    }
    expect(dojonet.path).toBe("/work/dojonet");
  });
});

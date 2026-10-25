import { existsSync } from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "@/App";
import {
  architectureFigure,
  campaignFigures,
  codeHighlights,
  comparisons,
  designSystemFigures,
  flowFigures,
  handoffFigures,
  heroSlots,
  imageDirection,
  onboardingBuild,
  palette,
  photoInProduct,
  photoLibrary,
  platformFigures,
  sharingFigures,
  specFigures,
  statusLedger,
  svgErrorFigure,
  withYou,
  withYouRecord,
  wyBrand,
  wyIcons,
  wyIllustrations,
  wyMedia,
} from "@/data/withyou";
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

// WCAG 2.x relative-luminance contrast, to keep the page's "computed" ratios honest.
function contrast(a: string, b: string) {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const allFigures = [
  ...designSystemFigures,
  ...flowFigures,
  ...comparisons.flatMap((item) => [item.design, ...item.build]),
  ...sharingFigures,
  ...platformFigures,
  ...onboardingBuild,
  ...handoffFigures,
  ...specFigures,
  svgErrorFigure,
  architectureFigure,
  ...photoInProduct,
  ...Object.values(campaignFigures),
];

describe("WithYou case study", () => {
  it("keeps WithYou first in the case-study order with its new preview art", () => {
    expect(workEntries[0]).toMatchObject({ slug: "withyou", path: "/work/withyou", number: "01" });
    expect(workEntries[0].heroMedia.presentation).toBe("desktop");
    expect(workEntries[0].heroMedia.src).toMatch(/\/assets\/projects\/withyou\/media\/preview-1440\.webp$/);
  });

  it("renders the three chapters, the sharing prototype, the evidence and the limitations", async () => {
    renderRoute("/work/withyou");
    expect(await screen.findByRole("heading", { level: 1, name: /^WithYou — Two private rooms with a shared door/ }, { timeout: 5000 })).toBeInTheDocument();
    for (const name of [/Building the brand/i, /Designing the product/i, /Engineering the privacy model/i, /What exists — and what doesn't yet/i]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getByText("Private entry", { selector: "h4" })).toBeInTheDocument();
    expect(screen.getAllByRole("article").filter((node) => node.className === "wy-code-card")).toHaveLength(codeHighlights.length);
    const limitations = screen.getByRole("heading", { name: /Known limitations/i }).parentElement as HTMLElement;
    expect(within(limitations).getAllByRole("listitem")).toHaveLength(withYouRecord.limitations.length);
  });

  it("gives every image alt text, and every figure a caption, source and real derivative", async () => {
    renderRoute("/work/withyou");
    await screen.findByRole("heading", { level: 1, name: /^WithYou — / }, { timeout: 5000 });
    for (const image of Array.from(document.querySelectorAll("main img"))) {
      expect(image.hasAttribute("alt")).toBe(true);
    }
    for (const figure of allFigures) {
      expect(figure.alt.trim().length).toBeGreaterThanOrEqual(12);
      expect(figure.caption.trim()).not.toBe("");
      expect(figure.source.trim()).not.toBe("");
      expect(wyMedia[figure.media]).toBeDefined();
    }
    for (const item of Object.values(wyMedia)) {
      expect(item.fallback).toMatch(/^\/assets\/projects\/withyou\/media\/.+\.webp$/);
      expect(existsSync(path.join(publicDir, item.fallback))).toBe(true);
    }
    for (const file of [...Object.values(wyBrand), ...Object.values(wyIcons), ...Object.values(wyIllustrations)]) {
      expect(existsSync(path.join(publicDir, file.src))).toBe(true);
      expect(file.sha256).toMatch(/^[0-9a-f]{64}$/);
    }
  });

  it("labels captures by what they are and keeps the photography flagged as a placeholder", async () => {
    for (const figure of [...sharingFigures, ...comparisons.map((item) => item.design)]) {
      expect(figure.status).toBe("PROTOTYPE REFERENCE");
    }
    for (const figure of [...designSystemFigures, ...flowFigures, ...handoffFigures, ...specFigures, architectureFigure, ...Object.values(campaignFigures)]) {
      expect(figure.status).toBe("DESIGN SOURCE");
    }
    for (const figure of [...onboardingBuild, ...platformFigures, ...photoInProduct, ...comparisons.flatMap((item) => item.build)]) {
      expect(["SIMULATOR CAPTURE", "EMULATOR CAPTURE"]).toContain(figure.status);
    }
    renderRoute("/work/withyou");
    await screen.findByRole("heading", { level: 1, name: /^WithYou — / }, { timeout: 5000 });
    expect(screen.getByText(/curated placeholder library/i)).toBeInTheDocument();
  });

  it("shows the whole photo library, built around ids and slots", async () => {
    expect(photoLibrary).toHaveLength(36);
    expect(photoLibrary[0]).toBe("photo-a-01");
    expect(photoLibrary[35]).toBe("photo-b-16");
    // Direction and slot photos are shown large, so they need the full-width derivative.
    for (const id of [...imageDirection.map((item) => item.photo), ...heroSlots.map((slot) => slot.photo), "photo-a-01" as const]) {
      expect(wyMedia[id].width).toBe(600);
    }
    renderRoute("/work/withyou");
    await screen.findByRole("heading", { level: 1, name: /^WithYou — / }, { timeout: 5000 });
    expect(screen.getByRole("heading", { level: 2, name: /Photography is the brand's iconography/ })).toBeInTheDocument();
    expect(within(screen.getByRole("list", { name: /Contact sheet of the 36 library photos/ })).getAllByRole("listitem")).toHaveLength(36);
    expect(screen.getByRole("heading", { level: 2, name: /The same voice, out in the world/ })).toBeInTheDocument();
  });

  it("states contrast ratios that match the WCAG formula", () => {
    expect(contrast("#FFFFFF", "#FF6B6B")).toBeCloseTo(2.78, 2);
    expect(contrast("#1D2841", "#FF6B6B")).toBeCloseTo(5.28, 2);
    expect(contrast("#1D2841", "#FBF4EC")).toBeCloseTo(13.44, 1);
    expect(contrast("#FF6B6B", "#FBF4EC")).toBeCloseTo(2.54, 1);
    expect(contrast("#F5EFE6", "#1A1422")).toBeCloseTo(15.74, 1);
    expect(contrast("#9C90A8", "#251D30")).toBeCloseTo(5.37, 1);
    expect(palette.find((color) => color.name === "Coral")?.contrast).toMatch(/^2\.5:1/);
    // The page's own button: plum on coral.
    expect(contrast("#1A1422", "#FF6B6B")).toBeGreaterThan(4.5);
    // App Store panels: white headlines on the light end of each gradient, and navy instead.
    expect(contrast("#FFFFFF", "#FFD8CC")).toBeCloseTo(1.32, 2);
    expect(contrast("#FFFFFF", "#D9CDF7")).toBeCloseTo(1.5, 2);
    expect(contrast("#FFFFFF", "#C8E4D2")).toBeCloseTo(1.36, 2);
    for (const end of ["#FFD8CC", "#D9CDF7", "#C8E4D2"]) {
      expect(contrast("#1D2841", end)).toBeGreaterThan(9);
    }
  });

  it("keeps private-repository excerpts short and unlinked, and makes no release claims", () => {
    for (const item of codeHighlights) {
      expect(item.code.split("\n").length).toBeLessThanOrEqual(30);
      expect(item).not.toHaveProperty("href");
      expect(item.commit).toBe("612da33");
    }
    for (const item of statusLedger) {
      expect(`${item.value} ${item.status}`).not.toMatch(/\b(launched|live|production-ready|in production)\b/i);
    }
    expect(withYou.path).toBe("/work/withyou");
  });
});

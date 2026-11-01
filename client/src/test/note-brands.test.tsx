import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { fieldNotes } from "@/data/fieldNotes";
import { noteBrands } from "@/data/noteBrands";
import FieldNotePage from "@/pages/field-note";

// WCAG 2.x relative luminance and contrast ratio.
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe("note brands", () => {
  it.each(Object.values(noteBrands).map((brand) => [brand.key, brand.tokens] as const))(
    "%s meets WCAG AA for every text pairing",
    (_key, t) => {
      for (const [fg, bg] of [
        [t.text, t.surface], [t.accent, t.surface], [t.accent2, t.surface], [t.muted, t.surface],
        [t.ink, t.paper], [t.ink, t.paper2], [t.surface, t.accent], ["#12151a", t.paper],
      ]) {
        expect(contrast(fg, bg), `${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
      }
    },
  );

  it("gives every project note a brand with a case study", () => {
    for (const note of fieldNotes) {
      if (note.project) expect(noteBrands[note.project].caseStudy).toMatch(/^\/work\//);
    }
  });

  it("renders a project note with its co-brand and case-study link", () => {
    const note = fieldNotes.find((entry) => entry.project === "withyou")!;
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[`/field-notes/${note.slug}`]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes><Route path="/field-notes/:slug" element={<FieldNotePage />} /></Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(container.querySelector("article")).toHaveClass("nb--withyou");
    expect(screen.getByText(`Field Note ${note.number}, about WithYou`)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View the WithYou case study" })).toHaveAttribute("href", "/work/withyou");
  });
});

import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { fieldNotes } from "@/data/fieldNotes";
import FieldNotePage from "@/pages/field-note";

function renderNote(slug: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/field-notes/${slug}`]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes><Route path="/field-notes/:slug" element={<FieldNotePage />} /></Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

const figuresOf = (slug: string) =>
  fieldNotes.find((note) => note.slug === slug)!.sections.flatMap((section) => (section.figure ? [section.figure] : []));

describe("Field Note figures", () => {
  it("renders each figure with its alt text, a numbered caption and its source", () => {
    const { container } = renderNote("designing-consent");
    const figures = container.querySelectorAll("figure.field-note-figure");
    const data = figuresOf("designing-consent");
    expect(figures).toHaveLength(data.length);
    data.forEach((figure, index) => {
      const element = figures[index] as HTMLElement;
      expect(within(element).getByRole("img", { name: figure.alt })).toHaveAttribute("width", String(figure.width));
      expect(within(element).getByText(`Figure 0${index + 1}`)).toBeInTheDocument();
      expect(within(element).getByText(figure.caption)).toBeInTheDocument();
      expect(within(element).getByText(figure.source)).toBeInTheDocument();
    });
    const index = screen.getByRole("navigation", { name: "Figures in this note" });
    expect(within(index).getAllByRole("link")).toHaveLength(data.length);
  });

  it("renders a text-only note without figures or a figure index", () => {
    const { container } = renderNote("teaching-jiu-jitsu-and-ux");
    expect(container.querySelector("figure")).toBeNull();
    expect(screen.queryByRole("navigation", { name: "Figures in this note" })).toBeNull();
  });
});

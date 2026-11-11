import { fireEvent, render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { fieldNotes } from "@/data/fieldNotes";
import FieldNotePage from "@/pages/field-note";

const slug = "same-emblem-new-colors";
const compare = fieldNotes.find((note) => note.slug === slug)!.sections.find((section) => section.compare)!.compare!;

function renderNote() {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/field-notes/${slug}`]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes><Route path="/field-notes/:slug" element={<FieldNotePage />} /></Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("Field Note before/after slider", () => {
  it("renders both images with their own alt text, a numbered caption and its source", () => {
    const { container } = renderNote();
    const figure = container.querySelector("figure.field-note-compare") as HTMLElement;
    expect(figure).toBeInTheDocument();
    expect(within(figure).getByRole("img", { name: compare.before.alt })).toHaveAttribute("width", String(compare.width));
    expect(within(figure).getByRole("img", { name: compare.after.alt })).toBeInTheDocument();
    expect(within(figure).getByText("Figure 01 · Drag to compare")).toBeInTheDocument();
    expect(within(figure).getByText(compare.caption)).toBeInTheDocument();
    expect(within(figure).getByText(compare.source)).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "Figures in this note" })).getAllByRole("link")).toHaveLength(1);
  });

  it("exposes a keyboard- and screen-reader-operable slider that moves the reveal", () => {
    const { container } = renderNote();
    const slider = screen.getByRole("slider", { name: compare.control });
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
    expect(slider).toHaveValue("50");
    const stage = container.querySelector(".field-note-compare__stage") as HTMLElement;
    expect(stage.style.getPropertyValue("--p")).toBe("0.5");
    fireEvent.change(slider, { target: { value: "20" } });
    expect(slider).toHaveValue("20");
    expect(stage.style.getPropertyValue("--p")).toBe("0.2");
    expect(slider).toHaveAttribute("aria-valuetext", "20% of the now version showing");
  });

  it("lists a srcset from the listed widths for both sides", () => {
    const { container } = renderNote();
    const images = container.querySelectorAll("figure.field-note-compare img");
    expect(images).toHaveLength(2);
    [compare.before, compare.after].forEach((side, index) => {
      expect(images[index].getAttribute("srcset")).toBe(compare.widths.map((width) => `${side.src}-${width}.webp ${width}w`).join(", "));
    });
  });
});

import { existsSync } from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { workEntries } from "@/data/work";
import { workCovers } from "@/data/workCovers";
import Work from "@/pages/work";

const renderWork = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/work"]}>
        <Work />
      </MemoryRouter>
    </HelmetProvider>,
  );

const publicFile = (url: string) => path.resolve(__dirname, "../../public", url.replace(/^\//, ""));

describe("/work case-study cards", () => {
  it("renders one card per case study, in display order, each linking to its case study by name", () => {
    renderWork();
    const links = screen.getAllByRole("link").filter((link) => link.classList.contains("work-card__link"));
    expect(links.map((link) => link.textContent)).toEqual(workEntries.map((entry) => entry.name));
    expect(links.map((link) => link.getAttribute("href"))).toEqual(workEntries.map((entry) => entry.path));
  });

  it("shows each card's main screen and floating phone screen with alt text", () => {
    renderWork();
    for (const entry of workEntries) {
      const card = screen.getByTestId(`work-card-${entry.slug}`);
      const cover = workCovers[entry.slug];
      expect(within(card).getByAltText(cover.main.alt)).toBeInTheDocument();
      expect(within(card).getByAltText(cover.float.alt)).toBeInTheDocument();
      expect(within(card).getByRole("heading", { level: 2, name: entry.name })).toBeInTheDocument();
    }
  });

  it("alternates the media side so cards don't stack identically", () => {
    renderWork();
    const sides = workEntries.map((entry) =>
      screen.getByTestId(`work-card-${entry.slug}`).classList.contains("work-card--media-left") ? "left" : "right",
    );
    expect(sides).toEqual(["right", "left", "right", "left"]);
  });

  it("uses case-study captures that exist on disk, not Home's composite preview images", () => {
    for (const entry of workEntries) {
      const cover = workCovers[entry.slug];
      expect(cover, entry.slug).toBeDefined();
      for (const image of [cover.main, cover.float]) {
        expect(image.item.fallback).not.toMatch(/preview/);
        expect(image.item.fallback).not.toBe(entry.heroMedia.src);
        expect(existsSync(publicFile(image.item.fallback)), image.item.fallback).toBe(true);
        for (const candidate of [...image.item.webp.split(", "), ...image.item.avif.split(", ")]) {
          const url = candidate.split(" ")[0];
          expect(existsSync(publicFile(url)), url).toBe(true);
        }
      }
    }
  });
});

import { existsSync } from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";
import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { workEntries } from "@/data/work";
import { workCovers, type WorkCoverPlacement } from "@/data/workCovers";
import Home from "@/pages/home";
import Work from "@/pages/work";

const renderAt = (route: string, page: ReactElement) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>{page}</MemoryRouter>
    </HelmetProvider>,
  );

const publicFile = (url: string) => path.resolve(__dirname, "../../public", url.replace(/^\//, ""));

const pages: [WorkCoverPlacement, string, () => ReactElement, 2 | 3][] = [
  ["work", "/work", () => <Work />, 2],
  ["home", "/", () => <Home />, 3],
];

describe.each(pages)("case-study cards on %s", (placement, route, page, level) => {
  it("renders one card per case study, in display order, each linking to its case study by name", () => {
    renderAt(route, page());
    const links = screen.getAllByRole("link").filter((link) => link.classList.contains("work-card__link"));
    expect(links.map((link) => link.textContent)).toEqual(workEntries.map((entry) => entry.name));
    expect(links.map((link) => link.getAttribute("href"))).toEqual(workEntries.map((entry) => entry.path));
  });

  it("shows each card's main screen and floating phone screen with alt text", () => {
    renderAt(route, page());
    for (const entry of workEntries) {
      const card = screen.getByTestId(`work-card-${entry.slug}`);
      const pair = workCovers[entry.slug][placement];
      expect(within(card).getByAltText(pair.main.alt)).toBeInTheDocument();
      expect(within(card).getByAltText(pair.float.alt)).toBeInTheDocument();
      expect(within(card).getByRole("heading", { level, name: entry.name })).toBeInTheDocument();
    }
  });

  it("alternates the media side so cards don't stack identically", () => {
    renderAt(route, page());
    const sides = workEntries.map((entry) =>
      screen.getByTestId(`work-card-${entry.slug}`).classList.contains("work-card--media-left") ? "left" : "right",
    );
    expect(sides).toEqual(["right", "left", "right", "left"]);
  });
});

describe("work cover images", () => {
  it("use case-study captures that exist on disk, not the composite preview images", () => {
    for (const entry of workEntries) {
      const cover = workCovers[entry.slug];
      expect(cover, entry.slug).toBeDefined();
      for (const placement of ["work", "home"] as const) {
        for (const image of [cover[placement].main, cover[placement].float]) {
          expect(image.item.fallback).not.toMatch(/preview/);
          expect(existsSync(publicFile(image.item.fallback)), image.item.fallback).toBe(true);
          for (const candidate of [...image.item.webp.split(", "), ...image.item.avif.split(", ")]) {
            const url = candidate.split(" ")[0];
            expect(existsSync(publicFile(url)), url).toBe(true);
          }
        }
      }
    }
  });

  it("don't repeat between Home and /work", () => {
    for (const entry of workEntries) {
      const { work, home } = workCovers[entry.slug];
      const workImages = [work.main.item.fallback, work.float.item.fallback];
      expect(workImages, entry.slug).not.toContain(home.main.item.fallback);
      expect(workImages, entry.slug).not.toContain(home.float.item.fallback);
    }
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import Work from "@/pages/work";

describe("investigations index", () => {
  it("uses the three-open-studies reference structure and product exhibits", () => {
    const view = render(<HelmetProvider><MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Work /></MemoryRouter></HelmetProvider>);

    expect(screen.getByText("INVESTIGATIONS — 03 OPEN STUDIES")).toBeInTheDocument();
    expect(view.container.querySelectorAll(".work-entry")).toHaveLength(3);
    expect(view.container.querySelectorAll('img[src*="home-exhibit"]')).toHaveLength(3);
    expect(view.container.querySelector(".work-method")).toBeInTheDocument();
    expect(view.container.querySelector(".professional-history")).not.toBeInTheDocument();
  });
});

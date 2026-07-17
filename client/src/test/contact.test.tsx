import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import Contact from "@/pages/contact";

function renderContact() {
  return render(<HelmetProvider><Contact /></HelmetProvider>);
}

describe("contact page", () => {
  it("uses the direct, person-to-person contact model from the design reference", () => {
    renderContact();
    expect(screen.getAllByRole("link", { name: "e@ehicksonjr.com" })[0]).toHaveAttribute("href", "mailto:e@ehicksonjr.com");
    expect(screen.getByRole("link", { name: "Write →" })).toHaveAttribute("href", "mailto:e@ehicksonjr.com");
    expect(screen.getByRole("button", { name: "Copy address" })).toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  it("exposes the supplied reasons-to-write structure", () => {
    renderContact();
    expect(screen.getByText("Good reasons to write")).toBeInTheDocument();
    expect(screen.getByText(/design judgment and engineering execution/i)).toBeInTheDocument();
  });
});

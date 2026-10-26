import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import Contact from "@/pages/contact";

describe("contact page", () => {
  it("publishes dependable direct contact methods", () => {
    render(<HelmetProvider><Contact /></HelmetProvider>);
    const emailLinks = screen.getAllByRole("link", { name: "e@ehicksonjr.com" });
    expect(emailLinks[0]).toHaveAttribute("href", "mailto:e@ehicksonjr.com");
    expect(screen.getByRole("link", { name: "Email Earl" })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:e@ehicksonjr.com?subject="),
    );
    expect(screen.getByRole("link", { name: /earl-hickson-jr/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/earl-hickson-jr",
    );
  });

  it("does not expose an unverified web form", () => {
    render(<HelmetProvider><Contact /></HelmetProvider>);
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.getByText(/production email delivery is not verified/i)).toBeInTheDocument();
  });
});

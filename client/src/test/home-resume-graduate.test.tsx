import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Home from "@/pages/home";
import Resume from "@/pages/resume";
import GraduateReview from "@/pages/graduate-review";
import professionalFacts from "@/data/professionalFacts.json";

function renderPage(page: React.ReactNode) {
  return render(<HelmetProvider><MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{page}</MemoryRouter></HelmetProvider>);
}

describe("homepage review paths", () => {
  it("links directly to work, resume, research, graduate review, and contact", () => {
    renderPage(<Home />);
    expect(screen.getByRole("link", { name: "View the investigations" })).toHaveAttribute("href", "/work");
    expect(screen.getAllByRole("link", { name: "View resume" })[0]).toHaveAttribute("href", "/resume");
    expect(screen.getAllByRole("link", { name: /Research direction/i })[0]).toHaveAttribute("href", "/research");
    expect(screen.getAllByRole("link", { name: /Graduate review/i })[0]).toHaveAttribute("href", "/graduate-review");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("heading", { name: "Three questions, answered with working software." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "One thesis, four working principles." })).toBeInTheDocument();
    expect(screen.getByText("Capability over convenience")).toBeInTheDocument();
    expect(screen.getByText("Agency before automation")).toBeInTheDocument();
    expect(screen.getByText("Evidence before claim")).toBeInTheDocument();
    expect(screen.getByText("Build to find out")).toBeInTheDocument();
  });
});

describe("public resume", () => {
  it("uses canonical professional facts and one canonical download", () => {
    renderPage(<Resume />);
    expect(screen.getByText(/One public résumé—UX Engineer/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Download PDF/i })).toHaveAttribute("href", professionalFacts.profile.links.resume);
    expect(screen.getByText("Jan 2025 - 2025")).toBeInTheDocument();
    expect(screen.queryByText(/Applications in progress/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/tailored variant|two variants|Front-End Engineer toggle/i)).not.toBeInTheDocument();
  });
});

describe("graduate review", () => {
  it("exposes the focused evidence path and application CV", () => {
    renderPage(<GraduateReview />);
    expect(screen.getByRole("heading", { name: /Three independent inquiries/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Verified methods are separated/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Download graduate CV" })).toHaveAttribute("href", professionalFacts.profile.links.graduateCv);
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
    expect(screen.getByText(/not completed research claims/i)).toBeInTheDocument();
  });
});

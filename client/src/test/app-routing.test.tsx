import { render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "@/App";

function renderPath(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("canonical native routing", () => {
  const routes = [
    ["/", /Designing and building human-centered systems/i],
    ["/work", /Long-form investigative work/i],
    ["/work/withyou", /How might a shared digital space support intentional connection/i],
    ["/work/dojonet", /Can technology help people see their training/i],
    ["/work/gundam-forge", /Does more information actually help a player decide/i],
    ["/research", /My career began with how something should look/i],
    ["/field-notes", /Field notes and shorter essays/i],
    ["/field-notes/designing-consent", "Designing Consent Into Digital Products"],
    ["/about", /Code, culture, and discipline/i],
    ["/resume", /The structured work history/i],
    ["/contact", /The fastest way to reach me is by email/i],
    ["/graduate-review", /Earl Hickson Jr. — for admissions reviewers/i],
  ] as const;

  it.each(routes)("renders %s as a semantic page without an iframe", async (path, heading) => {
    const view = renderPath(path);
    expect(await screen.findByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
    expect(view.container.querySelector("iframe")).not.toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it.each([
    ["/projects", /Long-form investigative work/i],
    ["/case-studies", /Long-form investigative work/i],
    ["/investigations", /Long-form investigative work/i],
    ["/how-i-think", /My career began with how something should look/i],
    ["/approach", /My career began with how something should look/i],
    ["/blog", /Field notes and shorter essays/i],
    ["/writing", /Field notes and shorter essays/i],
  ] as const)("redirects %s to its canonical page", async (path, heading) => {
    renderPath(path);
    expect(await screen.findByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  });

  it("preserves a published legacy writing deep link", async () => {
    renderPath("/blog/designing-consent");
    expect(await screen.findByRole("heading", { level: 1, name: "Designing Consent Into Digital Products" })).toBeInTheDocument();
  });

  it("sends an unpublished legacy writing slug to the field-notes index", async () => {
    renderPath("/blog/dei-rollbacks-black-tech-job-hunt");
    expect(await screen.findByRole("heading", { level: 1, name: /Field notes and shorter essays/i })).toBeInTheDocument();
  });

  it("provides a keyboard skip link before the primary navigation", async () => {
    renderPath("/");
    await screen.findByRole("heading", { level: 1 });
    const skip = screen.getByRole("link", { name: "Skip to main content" });
    expect(skip).toHaveAttribute("href", "#main-content");
    await waitFor(() => expect(document.querySelectorAll("h1")).toHaveLength(1));
  });

  it("shows the changed-mind evidence without a numbered human-context chapter", async () => {
    const view = renderPath("/work/withyou");
    expect(await screen.findByText("Changed my mind")).toBeInTheDocument();
    expect(screen.getByText(/I originally thought the main design challenge was creating a shared experience/i)).toBeInTheDocument();
    expect(view.container.querySelector(".investigation-context > strong")).not.toBeInTheDocument();
  });
});

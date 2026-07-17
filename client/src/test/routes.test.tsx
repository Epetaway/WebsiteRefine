import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "@/App";

function renderRoute(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={[path]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("canonical route architecture", () => {
  it.each([
    ["/", /Designing and building human-centered systems/i],
    ["/work", /Selected design investigations/i],
    ["/work/withyou", "WithYou"],
    ["/work/dojonet", "DojoNet"],
    ["/work/gundam-forge", "Gundam Forge"],
    ["/research", /I design and build technology/i],
    ["/field-notes", /thinking carefully in public/i],
    ["/field-notes/designing-consent", /Designing Consent Into Digital Products/i],
    ["/about", /I began with visual communication/i],
    ["/resume", /One public resume/i],
    ["/contact", /Let’s build technology/i],
    ["/graduate-review", /Design preparation/i],
  ])("renders %s as a native page", async (path, heading) => {
    const { container } = renderRoute(path);
    expect(await screen.findByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
    expect(container.querySelector("iframe")).not.toBeInTheDocument();
    expect(container.textContent).not.toContain(".dc.html");
    expect(container.querySelector(".site-header")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it.each([
    ["/projects", /Selected design investigations/i],
    ["/case-studies", /Selected design investigations/i],
    ["/investigations", /Selected design investigations/i],
    ["/projects/withyou", "WithYou"],
    ["/projects/dojonet", "DojoNet"],
    ["/projects/gundam-forge", "Gundam Forge"],
    ["/how-i-think", /I design and build technology/i],
    ["/approach", /I design and build technology/i],
    ["/blog", /thinking carefully in public/i],
    ["/writing", /thinking carefully in public/i],
  ])("redirects legacy route %s", async (path, heading) => {
    renderRoute(path);
    expect(await screen.findByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  });

  it("renders the 404 for an unknown route and an unknown project slug", async () => {
    const first = renderRoute("/not-a-route");
    expect(await screen.findByRole("heading", { name: /This path is no longer/i })).toBeInTheDocument();
    first.unmount();
    renderRoute("/work/not-a-project");
    expect(await screen.findByRole("heading", { name: /This path is no longer/i })).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
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
    ["/", /I design and build digital products/i],
    ["/work", /Design decisions/i],
    ["/work/withyou", "WithYou"],
    ["/work/dojonet", "DojoNet"],
    ["/work/gundam-forge", "Gundam Forge"],
    ["/work/earl-the-kaiju", /Earl the Kaiju — Building an identity into a working ecosystem/i],
    ["/research", /I design and build technology/i],
    ["/field-notes", /thinking carefully in public/i],
    ["/field-notes/designing-consent", /Designing Consent Into Digital Products/i],
    ["/about", /I learned to design the message/i],
    ["/resume", /One public resume/i],
    ["/contact", /Let’s build a product/i],
    ["/graduate-review", /Design preparation/i],
  ])("renders %s as a native page", async (path, heading) => {
    const { container } = renderRoute(path);
    // Route chunks load lazily; the larger case-study chunk can take over a second under jsdom.
    expect(await screen.findByRole("heading", { level: 1, name: heading }, { timeout: 5000 })).toBeInTheDocument();
    expect(container.querySelector("iframe")).not.toBeInTheDocument();
    expect(container.textContent).not.toContain(".dc.html");
    expect(container.querySelector(".site-header")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it.each([
    ["/projects", /Design decisions/i],
    ["/case-studies", /Design decisions/i],
    ["/investigations", /Design decisions/i],
    ["/projects/withyou", "WithYou"],
    ["/projects/dojonet", "DojoNet"],
    ["/projects/gundam-forge", "Gundam Forge"],
    ["/how-i-think", /I design and build technology/i],
    ["/approach", /I design and build technology/i],
    ["/blog", /thinking carefully in public/i],
    ["/writing", /thinking carefully in public/i],
    ["/earldkaiju", /Building an identity into a working ecosystem/i],
    ["/EarldKaiju", /Building an identity into a working ecosystem/i],
    ["/earl-the-kaiju", /Building an identity into a working ecosystem/i],
    ["/projects/earl-the-kaiju", /Building an identity into a working ecosystem/i],
    ["/projects/earldkaiju", /Building an identity into a working ecosystem/i],
  ])("redirects legacy route %s", async (path, heading) => {
    renderRoute(path);
    expect(await screen.findByRole("heading", { level: 1, name: heading }, { timeout: 5000 })).toBeInTheDocument();
  });

  it("renders the 404 for an unknown route and an unknown project slug", async () => {
    const first = renderRoute("/not-a-route");
    expect(await screen.findByRole("heading", { name: /This path is no longer/i })).toBeInTheDocument();
    first.unmount();
    renderRoute("/work/not-a-project");
    expect(await screen.findByRole("heading", { name: /This path is no longer/i })).toBeInTheDocument();
  });

  it("keeps the recruiter summary visible and exposes a semantic technical deep dive", async () => {
    const { container } = renderRoute("/work/withyou");
    expect(await screen.findByRole("heading", { name: /The case in five minutes/i })).toBeInTheDocument();
    const disclosure = container.querySelector("details#deep-dive");
    expect(disclosure).toBeInTheDocument();
    const summary = screen.getByText(/Open the full design and implementation record/i);
    expect(summary).toBeInTheDocument();
    fireEvent.click(summary);
    expect(disclosure).toHaveAttribute("open");
  });

  it("continues from the last investigation to Earl the Kaiju, then back to the first", async () => {
    renderRoute("/work/gundam-forge");
    fireEvent.click(await screen.findByRole("link", { name: /Read Earl the Kaiju/i }));
    expect(await screen.findByRole("heading", { level: 1, name: /Earl the Kaiju/i }, { timeout: 5000 })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: /Read WithYou/i }));
    expect(await screen.findByRole("heading", { level: 1, name: "WithYou" })).toBeInTheDocument();
  });

  it("moves between case studies through the project navigation", async () => {
    renderRoute("/work/withyou");
    const nextCaseStudy = await screen.findByRole("link", { name: /Read DojoNet/i });
    fireEvent.click(nextCaseStudy);
    expect(await screen.findByRole("heading", { level: 1, name: "DojoNet" })).toBeInTheDocument();
  });
});

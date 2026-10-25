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
    ["/work/withyou", /^WithYou — Two private rooms with a shared door/],
    ["/work/dojonet", /^DojoNet — Progress isn't the same as completion/],
    ["/work/gundam-forge", /^Gundam Forge — Show the rule while the player is still deciding/],
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
    ["/projects/withyou", /^WithYou — Two private rooms with a shared door/],
    ["/projects/dojonet", /^DojoNet — /],
    ["/projects/gundam-forge", /^Gundam Forge — /],
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

  it.each(["/work/gundam-forge", "/work/dojonet"])("keeps the recruiter summary visible and the code reasoning one disclosure away on %s", async (path) => {
    const { container } = renderRoute(path);
    expect(await screen.findByRole("heading", { name: /The case in five minutes/i }, { timeout: 5000 })).toBeInTheDocument();
    const disclosure = container.querySelector("article[id^='code-'] details");
    expect(disclosure).toBeInTheDocument();
    const summary = disclosure?.querySelector("summary") as HTMLElement;
    expect(summary).toHaveTextContent(/Problem → Decision → Implementation → Tradeoff → Evidence/);
    fireEvent.click(summary);
    expect(disclosure).toHaveAttribute("open");
  });

  it("follows the case-study order WithYou → Earl the Kaiju → Gundam Forge → DojoNet → WithYou", async () => {
    renderRoute("/work/withyou");
    fireEvent.click(await screen.findByRole("link", { name: /Read Earl the Kaiju/i }));
    expect(await screen.findByRole("heading", { level: 1, name: /Earl the Kaiju/i }, { timeout: 5000 })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: /Read Gundam Forge/i }));
    expect(await screen.findByRole("heading", { level: 1, name: /^Gundam Forge — / }, { timeout: 5000 })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: /Read DojoNet/i }));
    expect(await screen.findByRole("heading", { level: 1, name: /^DojoNet — / }, { timeout: 5000 })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: /Read WithYou/i }));
    expect(await screen.findByRole("heading", { level: 1, name: /^WithYou — / }, { timeout: 5000 })).toBeInTheDocument();
  });

  it("moves between case studies through the project navigation", async () => {
    renderRoute("/work/gundam-forge");
    const nextCaseStudy = await screen.findByRole("link", { name: /Read DojoNet/i }, { timeout: 5000 });
    fireEvent.click(nextCaseStudy);
    expect(await screen.findByRole("heading", { level: 1, name: /^DojoNet — / }, { timeout: 5000 })).toBeInTheDocument();
  });
});

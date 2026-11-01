import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "@/App";
import { highlight } from "@/components/earl-the-kaiju/highlight";
import {
  coachingSite,
  codeHighlights,
  flagship,
  limitations,
  media,
  processFigures,
} from "@/data/earlTheKaiju";
import { investigations } from "@/data/investigations";
import { workEntries } from "@/data/work";

function renderRoute(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("Earl the Kaiju case study", () => {
  it("lists the case studies in Earl's order, numbered by position", () => {
    expect(workEntries.map((entry) => entry.slug)).toEqual(["withyou", "earl-the-kaiju", "gundam-forge", "dojonet"]);
    expect(workEntries.map((entry) => entry.number)).toEqual(["01", "02", "03", "04"]);
    expect(workEntries[1]).toMatchObject({ path: "/work/earl-the-kaiju", name: "Earl the Kaiju" });
    for (const item of investigations) {
      expect(workEntries.find((entry) => entry.slug === item.slug)?.number).toBe(item.number);
    }
  });

  it("appears on the Work index and the homepage's selected work", async () => {
    const work = renderRoute("/work");
    expect(await screen.findByRole("heading", { level: 2, name: "Earl the Kaiju" })).toBeInTheDocument();
    const titles = screen.getAllByRole("heading", { level: 2 }).map((node) => node.textContent);
    expect(titles.filter((title) => ["WithYou", "Earl the Kaiju", "Gundam Forge", "DojoNet"].includes(title ?? ""))).toEqual(["WithYou", "Earl the Kaiju", "Gundam Forge", "DojoNet"]);
    // Each card is one link named for its project; the whole card is its hit area.
    expect(screen.getByRole("link", { name: "Earl the Kaiju" })).toHaveAttribute("href", "/work/earl-the-kaiju");
    work.unmount();
    renderRoute("/");
    expect(await screen.findByRole("heading", { level: 3, name: "Earl the Kaiju" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Earl the Kaiju" })).toHaveAttribute("href", "/work/earl-the-kaiju");
  });

  it("links to it from the About page's teaching story", async () => {
    renderRoute("/about");
    expect(await screen.findByRole("link", { name: /See the Earl the Kaiju case study/i })).toHaveAttribute("href", "/work/earl-the-kaiju");
  });

  it("does not link to a coaching site until one is verified", async () => {
    expect(coachingSite.liveUrl).toBeNull();
    renderRoute("/work/earl-the-kaiju");
    await screen.findByRole("heading", { level: 1, name: /Earl the Kaiju/i }, { timeout: 5000 });
    expect(screen.queryByRole("link", { name: /Visit Earl the Kaiju/i })).not.toBeInTheDocument();
    expect(screen.getByTestId("coaching-site-note")).toHaveTextContent(/no public link yet/i);
    expect(screen.getByRole("link", { name: /Preview the coaching site/i })).toHaveAttribute("href", "#website");
  });

  it("renders the three chapters, the evidence and the limitations", async () => {
    renderRoute("/work/earl-the-kaiju");
    for (const name of [/Building the identity/i, /Building the business platform/i, /Building the instructor tool/i, /What exists — and what doesn't yet/i]) {
      expect(await screen.findByRole("heading", { level: 2, name }, { timeout: 5000 })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("article").filter((node) => node.className === "etk-code-card")).toHaveLength(codeHighlights.length);
    const limitationsHeading = screen.getByRole("heading", { name: /Known limitations/i });
    const list = limitationsHeading.parentElement as HTMLElement;
    expect(within(list).getAllByRole("listitem")).toHaveLength(limitations.length);
  });

  it("labels the concept board as a source reference, not approved art", () => {
    const board = processFigures.find((figure) => figure.media === "source-board");
    expect(board?.status).toBe("SOURCE REFERENCE");
    expect(board?.caption).toMatch(/AI image tools/);
  });

  it("gives every image alt text and a real derivative", async () => {
    renderRoute("/work/earl-the-kaiju");
    await screen.findByRole("heading", { level: 1, name: /Earl the Kaiju/i }, { timeout: 5000 });
    for (const image of Array.from(document.querySelectorAll("main img"))) {
      expect(image.hasAttribute("alt")).toBe(true);
    }
    for (const item of Object.values(media)) {
      expect(item.fallback).toMatch(/^\/assets\/projects\/earl-the-kaiju\/media\/.+\.webp$/);
      expect(item.width).toBeGreaterThan(0);
    }
  });

  it("keeps private-repository excerpts short and unlinked", () => {
    for (const item of codeHighlights) {
      if (item.repo === "Epetaway/EarltheKaiju") {
        expect(item.href).toBeUndefined();
        expect(item.code.split("\n").length).toBeLessThanOrEqual(30);
      } else {
        expect(item.href).toMatch(/^https:\/\/github\.com\/Epetaway\/earltheKaiju_app\/blob\/6446efa\//);
      }
    }
    expect(flagship.status).not.toMatch(/live|launched|production/i);
  });
});

describe("case study syntax highlighter", () => {
  it("marks comments, strings, keywords and numbers and keeps every character", () => {
    const code = "// note\nconst x = 'a';\nreturn 3000;";
    const tokens = highlight(code, "ts");
    expect(tokens.map((token) => token.text).join("")).toBe(code);
    expect(tokens.find((token) => token.kind === "comment")?.text).toBe("// note");
    expect(tokens.filter((token) => token.kind === "keyword").map((token) => token.text)).toEqual(["const", "return"]);
    expect(tokens.find((token) => token.kind === "string")?.text).toBe("'a'");
    expect(tokens.find((token) => token.kind === "number")?.text).toBe("3000");
  });

  it("handles Kotlin and XML", () => {
    expect(highlight("val n = 999L", "kotlin").find((token) => token.kind === "keyword")?.text).toBe("val");
    const xml = highlight('<!-- c -->\n<application android:allowBackup="false" />', "xml");
    expect(xml.map((token) => token.kind)).toEqual(expect.arrayContaining(["comment", "tag", "attr", "string"]));
  });
});

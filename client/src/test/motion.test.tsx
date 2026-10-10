import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Reveal } from "@/components/motion/Reveal";

describe("motion preferences", () => {
  it("does not apply an entrance transform when reduced motion is requested", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: (query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }),
    });

    const { container } = render(<Reveal><p>Static content</p></Reveal>);
    expect(container.firstElementChild).not.toHaveStyle({ opacity: "0" });
    expect(container.firstElementChild).not.toHaveStyle({ transform: "translateY(18px)" });
  });
});

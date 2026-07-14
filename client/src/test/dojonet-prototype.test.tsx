import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DojoNetProgressPrototype } from "@/components/prototypes/DojoNetProgressPrototype";

describe("DojoNet progress prototype", () => {
  it("supports keyboard selection for techniques and learning stages", async () => {
    const user = userEvent.setup();
    render(<DojoNetProgressPrototype />);
    const technique = screen.getByRole("button", { name: "Hip escape" });
    technique.focus();
    await user.keyboard("{Enter}");
    expect(technique).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "Continue" }));
    const stage = screen.getByRole("button", { name: /Connecting/i });
    stage.focus();
    await user.keyboard(" ");
    expect(stage).toHaveAttribute("aria-pressed", "true");
  });

  it("records a technique, qualitative stage, and reflection without a score", async () => {
    const user = userEvent.setup();
    render(<DojoNetProgressPrototype />);
    await user.click(screen.getByRole("button", { name: "Technical stand-up" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("button", { name: /Applying under pressure/i }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    const reflection = screen.getByRole("textbox", { name: /What changed/i });
    await user.clear(reflection);
    await user.type(reflection, "I recognized the opening during a live round.");
    await user.click(screen.getByRole("button", { name: "Record session" }));
    expect(screen.getByText("Technical stand-up")).toBeInTheDocument();
    expect(screen.getByText("Applying under pressure", { selector: "strong" })).toBeInTheDocument();
    expect(screen.getByText("No completion score calculated")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reset prototype" }));
    expect(screen.getByText("Choose a technique", { selector: "h4" })).toBeInTheDocument();
  });
});

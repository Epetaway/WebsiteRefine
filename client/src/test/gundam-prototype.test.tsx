import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { GundamForgeValidationPrototype } from "@/components/prototypes/GundamForgeValidationPrototype";

describe("Gundam Forge validation prototype", () => {
  it("updates the deck count when a card is added and removed", async () => {
    const user = userEvent.setup();
    render(<GundamForgeValidationPrototype />);
    expect(screen.getByText("9", { selector: ".deck-status strong" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add Aerial Unit" }));
    expect(screen.getByText("10", { selector: ".deck-status strong" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Remove one Aerial Unit" }));
    expect(screen.getByText("9", { selector: ".deck-status strong" })).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("surfaces, explains, and resolves a card-count warning", async () => {
    const user = userEvent.setup();
    render(<GundamForgeValidationPrototype />);
    expect(screen.getByText("Clear")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add Aerial Unit" }));
    expect(screen.getByText("1 warning")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Inspect warning" }));
    expect(screen.getByRole("alert")).toHaveTextContent("exceeds its limit");
    await user.click(screen.getByRole("button", { name: "Replace with Tactical Relay" }));
    expect(screen.getByText("Validation recovered", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reset prototype" }));
    expect(screen.getByRole("button", { name: "Add Aerial Unit" })).toBeInTheDocument();
  });
});

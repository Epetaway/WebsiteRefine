import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { WithYouSharingPrototype } from "@/components/prototypes/WithYouSharingPrototype";

describe("WithYou sharing prototype", () => {
  it("keeps the entry private until an explicit reviewed sharing decision", async () => {
    const user = userEvent.setup();
    render(<WithYouSharingPrototype />);
    expect(screen.getByText("Private entry", { selector: "h4" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("radio", { name: /Share a safe summary/i }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText(/raw note remains private/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Confirm decision" }));
    expect(screen.getByText("Your partner could use reassurance and a quiet evening.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reset prototype" }));
    expect(screen.getByText("Private entry", { selector: "h4" })).toBeInTheDocument();
  });
});

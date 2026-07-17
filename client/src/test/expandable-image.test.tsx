import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ExpandableImage } from "@/components/editorial/ExpandableImage";

describe("expandable evidence image", () => {
  it("opens a large dialog on activation and closes with Escape", async () => {
    render(<ExpandableImage src="/evidence.png" alt="Implementation screen" caption="Project implementation screen" />);

    const trigger = screen.getByRole("button", { name: "Open larger image: Project implementation screen" });
    fireEvent.click(trigger);

    expect(screen.getByRole("dialog", { name: "Project implementation screen" })).toBeInTheDocument();
    expect(document.body).toHaveStyle({ overflow: "hidden" });

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe("");
    expect(trigger).toHaveFocus();
  });
});

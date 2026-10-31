import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Header from "@/components/layout/header";

describe("site navigation", () => {
  it("exposes the canonical desktop links and active route", () => {
    render(<MemoryRouter initialEntries={["/about"]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Header /></MemoryRouter>);
    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Work" })[0]).toHaveAttribute("href", "/work");
    expect(screen.getAllByRole("link", { name: "About" })[0]).toHaveClass("is-active");
    expect(screen.getAllByRole("link", { name: "Notes" })[0]).toHaveAttribute("href", "/field-notes");
    expect(screen.getAllByRole("link", { name: "Resume" })[0]).toHaveAttribute("href", "/resume");
    expect(screen.queryByRole("link", { name: "Research" })).not.toBeInTheDocument();
  });

  it("opens the mobile dialog, closes with Escape, and returns focus", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Header /></MemoryRouter>);
    const trigger = screen.getByRole("button", { name: "Menu" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Site navigation" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Site navigation" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("renders the mobile dialog outside the header so the header's backdrop-filter can't clip it", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Header /></MemoryRouter>);
    await user.click(screen.getByRole("button", { name: "Menu" }));
    const dialog = screen.getByRole("dialog", { name: "Site navigation" });
    expect(dialog.closest("header")).toBeNull();
    expect(dialog.parentElement).toBe(document.body);
  });
});

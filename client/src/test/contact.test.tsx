import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import Contact from "@/pages/contact";

function renderContact() {
  return render(<HelmetProvider><Contact /></HelmetProvider>);
}

describe("contact form", () => {
  afterEach(() => vi.restoreAllMocks());

  it("blocks incomplete inquiries before making a network request", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(globalThis, "fetch");
    renderContact();
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
  });

  it("submits valid professional inquiry data and reports success", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ message: "ok" }), { status: 200, headers: { "Content-Type": "application/json" } }));
    renderContact();
    await user.type(screen.getByRole("textbox", { name: /Full name/i }), "Jordan Recruiter");
    await user.type(screen.getByRole("textbox", { name: /Email/i }), "jordan@example.com");
    await user.type(screen.getByRole("textbox", { name: /Message/i }), "We are hiring a UX Engineer for a product systems team.");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(fetchMock).toHaveBeenCalledWith("/api/contact", expect.objectContaining({ method: "POST" }));
    expect(await screen.findByText("Thank you. Your message was received.")).toBeInTheDocument();
  });

  it("surfaces an API failure and preserves a direct-email fallback", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ message: "Delivery unavailable" }), { status: 503, headers: { "Content-Type": "application/json" } }));
    renderContact();
    await user.type(screen.getByRole("textbox", { name: /Full name/i }), "Jordan Recruiter");
    await user.type(screen.getByRole("textbox", { name: /Email/i }), "jordan@example.com");
    await user.type(screen.getByRole("textbox", { name: /Message/i }), "We are hiring a UX Engineer for a product systems team.");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByText("Delivery unavailable")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "e@ehicksonjr.com" })).toHaveAttribute("href", "mailto:e@ehicksonjr.com");
  });
});

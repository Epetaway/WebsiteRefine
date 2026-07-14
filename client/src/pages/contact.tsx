import { useState } from "react";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import { professionalProfile } from "@/data/professionalProfile";

type Status = { type: "success" | "error"; message: string } | null;

export default function Contact() {
  const { links } = professionalProfile;
  const [form, setForm] = useState({ name: "", email: "", organization: "", opportunity: "Full-time role", message: "", website: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    if (!form.name.trim()) {
      setStatus({ type: "error", message: "Please enter your full name." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    if (form.message.trim().length < 20) {
      setStatus({ type: "error", message: "Please share at least 20 characters about the opportunity." });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          website: form.website,
          type: "professional",
          message: `Organization: ${form.organization || "Not provided"}\nOpportunity: ${form.opportunity}\nMessage: ${form.message}`,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "The message could not be sent.");
      setStatus({ type: "success", message: "Thank you. Your message was received." });
      setForm({ name: "", email: "", organization: "", opportunity: "Full-time role", message: "", website: "" });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "The message could not be sent. Please email me directly." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="portfolio-page">
      <SEO title="Contact — Earl Hickson Jr." description="Contact Earl Hickson Jr. about full-time UX Engineering, Design Engineering, Product Engineering, and frontend product roles." path="/contact" image="/assets/brand/social/og-contact.svg" />
      <PageIntro label="Contact / Opportunities" title={<>Let’s build technology that helps people do more, understand more, or become more <em>capable.</em></>} lead={<p>{professionalProfile.availability}. I am especially interested in teams where product design and implementation inform each other.</p>} aside={<div className="contact-direct"><span>Direct contact</span><a href={`mailto:${links.email}`}>{links.email}</a><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a></div>} />

      <section className="contact-layout section-shell" aria-label="Professional contact form">
        <aside><p className="eyebrow">Primary role areas</p><ul>{professionalProfile.focus.map((focus) => <li key={focus}>{focus}</li>)}</ul><p className="contact-layout__note">Email is the most reliable channel. The form uses the site's existing Express/SendGrid path when configured.</p></aside>
        <form className="contact-form" onSubmit={submit} noValidate>
          <div className="contact-form__heading"><span>Professional inquiry</span><h2>Start a conversation.</h2><p>Required fields are marked with an asterisk.</p></div>
          <div className="form-grid">
            <label>Full name <span aria-hidden="true">*</span><input required autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
            <label>Email <span aria-hidden="true">*</span><input required type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
            <label>Organization<input autoComplete="organization" value={form.organization} onChange={(event) => setForm({ ...form, organization: event.target.value })} /></label>
            <label>Opportunity type<select value={form.opportunity} onChange={(event) => setForm({ ...form, opportunity: event.target.value })}><option>Full-time role</option><option>Contract project</option><option>Collaboration</option><option>Other</option></select></label>
          </div>
          <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} /></label>
          <label>Message <span aria-hidden="true">*</span><textarea required minLength={20} rows={6} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell me about the team, product, and what you need." /></label>
          <button className="button button--primary" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send message"}</button>
          <div className={`form-status${status ? ` form-status--${status.type}` : ""}`} role="status" aria-live="polite">{status?.message}</div>
        </form>
      </section>
    </div>
  );
}

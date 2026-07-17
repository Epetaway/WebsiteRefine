import { useState } from "react";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import { professionalProfile } from "@/data/professionalProfile";

export default function Contact() {
  const { links } = professionalProfile;
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copyEmail() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(links.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <div className="portfolio-page contact-page">
      <SEO title="Contact — Earl Hickson Jr." description="Contact Earl Hickson Jr. about full-time UX Engineering, Design Engineering, Product Engineering, and frontend product roles." path="/contact" image="/assets/brand/social/og-contact.svg" />
      <PageIntro label="Contact" railLabel="Contact / open" title={<>The fastest way to reach me is by email.</>} lead={<p>Open to full-time UX engineering and human-centered product engineering roles, graduate-program conversations, and questions about any of the investigations.</p>} />

      <section className="contact-reference" aria-label="Contact Earl Hickson Jr.">
        <div><div className="contact-email-card"><div><span>Email</span><a href={`mailto:${links.email}`}>{links.email}</a></div><div className="button-row"><a className="button button--primary" href={`mailto:${links.email}`}>Write →</a><button className="button button--secondary" type="button" onClick={copyEmail}>{copyStatus === "copied" ? "Copied ✓" : "Copy address"}</button><span className="sr-only" role="status" aria-live="polite">{copyStatus === "copied" ? "Email address copied to clipboard." : copyStatus === "failed" ? "Copy unavailable. Select the email address instead." : ""}</span></div></div><p>No forms, no scheduling widgets—a reply from a person. Code is public on <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>.</p></div>
        <aside><span>Good reasons to write</span><ul><li>A role where design judgment and engineering execution are the same job.</li><li>HCI graduate study—methods, mentorship, and where this work fits.</li><li>Pushback on any claim in the investigations—evidence welcome.</li></ul></aside>
      </section>
    </div>
  );
}

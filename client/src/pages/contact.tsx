import SEO from "@/components/seo";
import { contactMeta } from "@/data/routeMeta/pages";
import { PageIntro } from "@/components/editorial/PageIntro";
import { professionalLinks, profile } from "@/data/professional";

export default function Contact() {
  const subject = encodeURIComponent("Professional inquiry for Earl Hickson Jr.");
  return (
    <div className="portfolio-page">
      <SEO {...contactMeta} />
      <PageIntro compact label="Contact / Opportunities" title={<>Let’s build a product people can understand—and a system that can <em>ship.</em></>} lead={<p>{profile.availability}. {profile.workPreference}. I am especially interested in teams where product design and implementation inform each other.</p>} aside={<div className="contact-direct"><span>Direct contact</span><a href={`mailto:${professionalLinks.email}`}>{professionalLinks.email}</a><a href={professionalLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={professionalLinks.github} target="_blank" rel="noreferrer">GitHub ↗</a></div>} />

      <section className="contact-layout section-shell" aria-labelledby="contact-heading">
        <aside><p className="eyebrow">Primary role areas</p><ul>{profile.focusRoles.map((focus) => <li key={focus}>{focus}</li>)}</ul><p className="contact-layout__note">Email is the dependable contact channel. A web form is intentionally not published because production email delivery is not verified.</p></aside>
        <div className="contact-card">
          <span>Professional inquiry</span>
          <h2 id="contact-heading">Start a conversation.</h2>
          <p>Please include the team, product, role or collaboration, and what you would like to discuss. The button opens your email application so you retain a copy of the message.</p>
          <a className="button button--primary" href={`mailto:${professionalLinks.email}?subject=${subject}`}>Email Earl</a>
          <dl>
            <div><dt>Email</dt><dd><a href={`mailto:${professionalLinks.email}`}>{professionalLinks.email}</a></dd></div>
            <div><dt>LinkedIn</dt><dd><a href={professionalLinks.linkedin} target="_blank" rel="noreferrer">earl-hickson-jr ↗</a></dd></div>
            <div><dt>GitHub</dt><dd><a href={professionalLinks.github} target="_blank" rel="noreferrer">Epetaway ↗</a></dd></div>
          </dl>
        </div>
      </section>
    </div>
  );
}

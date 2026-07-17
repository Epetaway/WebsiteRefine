import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import { professionalProfile } from "@/data/professionalProfile";
import { professionalExperience } from "@/data/professionalExperience";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import professionalFacts from "@/data/professionalFacts.json";

export default function Resume() {
  const { links } = professionalProfile;
  return (
    <div className="portfolio-page resume-page">
      <SEO title="Resume — Earl Hickson Jr., UX Engineer" description="Earl Hickson Jr. — UX Engineer working across design, frontend engineering, accessibility, and full-stack product development." path="/resume" image="/assets/brand/social/og-resume.svg" />
      <PageIntro label="Resume" railLabel="Resume / record" title={<>The structured work history.</>} lead={<div><p>One public résumé—UX Engineer. Design and engineering practice across healthcare, media, enterprise, and consumer products—the employment record behind the investigations.</p><div className="button-row resume-hero-actions"><a className="button button--primary" href={links.resume} download>Download PDF ↓</a><Link className="button button--secondary" to="/contact">Contact →</Link></div></div>} />

      <section className="resume-record">
        <div className="resume-record__employment"><p className="resume-record__label">Employment</p>{professionalExperience.map((experience) => <article key={experience.company}><div className="resume-record__date">{experience.dates}</div><div><h2>{experience.company}</h2><h3>{experience.role}</h3><p>{experience.summary}</p></div></article>)}</div>
        <aside className="resume-record__sidebar">
          <section><p className="resume-record__label">Education & credentials</p>{education.map((item) => <div className="resume-record__credential" key={item.degree}><strong>{item.degree}</strong><span>{item.institution} · {item.date}</span></div>)}{certifications.map((item) => <div className="resume-record__credential" key={item.name}><strong>{item.name}</strong><span>{item.issuer} · Verified {item.date}</span></div>)}</section>
          <section><p className="resume-record__label">Toolkit</p>{professionalFacts.capabilities.map((capability) => <div className="resume-record__capability" key={capability.group}><strong>{capability.group}</strong><span>{capability.items}</span></div>)}</section>
        </aside>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { investigations } from "@/data/investigations";
import {
  capabilities,
  certifications,
  education,
  experience,
  professionalLinks,
  profile,
  teaching,
} from "@/data/professional";

export default function Resume() {
  return (
    <div className="portfolio-page resume-page">
      <SEO title="Resume — Earl Hickson Jr., UX Engineer" description="Earl Hickson Jr. — UX Engineer working across design, frontend engineering, accessibility, and full-stack product development." path="/resume" image="/assets/brand/social/og-resume.svg" />
      <PageIntro label="Resume / Professional record" title={<>One public resume. One professional <em>identity.</em></>} lead={<p>A publication-safe professional record spanning visual design, frontend development, UX engineering, and independent product systems.</p>} aside={<a className="resume-download" href={professionalLinks.publicResume} download><span>PDF / ATS-friendly</span><strong>Download resume</strong><small>Earl-Hickson-Jr-Resume.pdf</small></a>} />

      <article className="online-resume">
        <header className="online-resume__header"><div><h2>{profile.name}</h2><p>{profile.publicTitle}</p></div><address><a href={`mailto:${professionalLinks.email}`}>{professionalLinks.email}</a><a href={professionalLinks.linkedin}>linkedin.com/in/earlhicksonjr</a><a href={professionalLinks.github}>github.com/Epetaway</a></address></header>

        <section><SectionHeader number="01" label="Professional summary" /><p className="resume-summary">{profile.summary} Currently working outside technology while pursuing a return to full-time product work.</p></section>

        <section><SectionHeader number="02" label="Professional experience" /><div className="resume-experience">{experience.map((item) => <article key={item.id}><header><div><h3>{item.role}</h3><p>{item.employer}</p></div><span>{item.dates}</span></header>{item.responsibilities.length ? <ul>{item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul> : <p>{item.summary}</p>}</article>)}</div></section>

        <section><SectionHeader number="03" label="Selected investigations" /><div className="resume-investigations">{investigations.map((project) => <article key={project.slug}><div><h3>{project.name}</h3><span>{project.status}</span></div><p>{project.abstract.product}</p><small>{project.stack.join(" / ")}</small><Link to={`/work/${project.slug}`}>View investigation →</Link></article>)}</div></section>

        <section><SectionHeader number="04" label="Capabilities" /><div className="capabilities-grid">{capabilities.map((group) => <div key={group.label}><h3>{group.label}</h3><p>{group.items.join(", ")}</p></div>)}</div></section>

        <section><SectionHeader number="05" label="Education and certification" /><div className="education-grid"><div><span>Education</span><h3>{education[0].credential}</h3><p>{education[0].institution} · {education[0].completed}</p></div><div><span>Certification</span><h3>{certifications[0].credential}</h3><p>{certifications[0].issuer} · Verified {certifications[0].completed}</p></div></div></section>

        <section><SectionHeader number="06" label="Teaching and leadership" /><p className="resume-summary">{teaching.summary} {teaching.evidenceBoundary}</p></section>
      </article>
    </div>
  );
}

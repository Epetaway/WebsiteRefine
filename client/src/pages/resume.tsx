import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { professionalProfile } from "@/data/professionalProfile";
import { professionalExperience } from "@/data/professionalExperience";
import { investigations } from "@/data/investigations";

const capabilities = [
  ["Interaction & product", "User flows, information architecture, interaction design, prototyping, responsive design, design systems, accessibility"],
  ["Frontend engineering", "React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, component architecture, state management"],
  ["Backend & data", "Node.js, Express, REST APIs, PostgreSQL, Prisma, Supabase, authentication, real-time systems"],
  ["Quality & delivery", "Behavior testing, Testing Library, Git/GitHub, CI/CD, Vite, deployment workflows"],
];

export default function Resume() {
  const { links } = professionalProfile;
  return (
    <div className="portfolio-page resume-page">
      <SEO title="Resume — Earl Hickson Jr., UX Engineer" description="Earl Hickson Jr. — UX Engineer working across design, frontend engineering, accessibility, and full-stack product development." path="/resume" image="/assets/brand/social/og-resume.svg" />
      <PageIntro label="Resume / Professional record" title={<>One public resume. One professional <em>identity.</em></>} lead={<p>A verified professional record spanning visual design, frontend development, UX engineering, and independent product systems.</p>} aside={<a className="resume-download" href={links.resume} download><span>PDF / ATS-friendly</span><strong>Download resume</strong><small>Earl-Hickson-Jr-Resume.pdf</small></a>} />

      <article className="online-resume">
        <header className="online-resume__header"><div><h2>{professionalProfile.name}</h2><p>{professionalProfile.title}</p></div><address><a href={`mailto:${links.email}`}>{links.email}</a><a href={links.linkedin}>linkedin.com/in/earlhicksonjr</a><a href={links.github}>github.com/Epetaway</a></address></header>

        <section><SectionHeader number="01" label="Professional summary" /><p className="resume-summary">UX Engineer whose practice has progressed from graphic design to digital design, frontend development, and human-centered product engineering. Experienced in accessible interfaces, reusable component systems, API-integrated products, and independent full-stack applications. Currently working outside technology while pursuing a return to full-time product work.</p></section>

        <section><SectionHeader number="02" label="Professional experience" /><div className="resume-experience">{professionalExperience.map((experience) => <article key={experience.company}><header><div><h3>{experience.role}</h3><p>{experience.company}</p></div><span>{experience.dates}</span></header>{experience.bullets.length ? <ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : <p>{experience.summary}</p>}</article>)}</div></section>

        <section><SectionHeader number="03" label="Selected investigations" /><div className="resume-investigations">{investigations.map((project) => <article key={project.slug}><div><h3>{project.name}</h3><span>{project.status}</span></div><p>{project.abstract.product}</p><small>{project.stack.join(" / ")}</small><Link to={`/work/${project.slug}`}>View investigation →</Link></article>)}</div></section>

        <section><SectionHeader number="04" label="Capabilities" /><div className="capabilities-grid">{capabilities.map(([label, detail]) => <div key={label}><h3>{label}</h3><p>{detail}</p></div>)}</div></section>

        <section><SectionHeader number="05" label="Education and certification" /><div className="education-grid"><div><span>Education</span><h3>Bachelor of Fine Arts in Graphic Design</h3><p>Kean University · 2015</p></div><div><span>Certification</span><h3>IBM Full Stack Software Developer Professional Certificate</h3><p>Verified December 2025</p></div></div></section>
      </article>
    </div>
  );
}

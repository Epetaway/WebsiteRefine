import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { CapabilityNetwork } from "@/components/editorial/CapabilityNetwork";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { investigations } from "@/data/investigations";
import { fieldNotes } from "@/data/fieldNotes";
import { professionalExperience } from "@/data/professionalExperience";
import { professionalProfile } from "@/data/professionalProfile";
import portrait from "@/images/me.webp";

const trajectory = [
  ["Art", "expression"],
  ["Graphic design", "communication"],
  ["Interaction design", "experience"],
  ["Frontend engineering", "behavior"],
  ["Full-stack engineering", "systems"],
  ["HCI", "consequences"],
];

export default function Home() {
  return (
    <div className="portfolio-page">
      <SEO
        title="Earl Hickson Jr. — UX Engineer"
        description="UX Engineer designing and building human-centered systems across interaction design, frontend engineering, and full-stack product development."
      />

      <section className="professional-hero">
        <div className="professional-hero__rail" aria-hidden="true"><span>PORTFOLIO / 2026</span><i /></div>
        <div className="professional-hero__copy">
          <p className="eyebrow"><span /> {professionalProfile.name}</p>
          <p className="professional-hero__role">{professionalProfile.title}</p>
          <h1>{professionalProfile.tagline}</h1>
          <p className="professional-hero__lead">
            I work across interaction design, frontend engineering, and full-stack product development. My practice began in graphic design and expanded into engineering as I became increasingly interested not only in how technology looks, but how it behaves and what it enables people to do.
          </p>
          <div className="button-row">
            <Link className="button button--primary" to="/work">View my work</Link>
            <Link className="button button--secondary" to="/resume">View resume</Link>
            <Link className="text-link" to="/contact">Contact <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="hero-proof">
            <div><span>Practice</span><p>Design + engineering + product reasoning</p></div>
            <div><span>Direction</span><p>{professionalProfile.availability}</p></div>
          </div>
        </div>
        <figure className="professional-hero__portrait">
          <img src={portrait} alt="Portrait of Earl Hickson Jr." />
          <figcaption><span>01 / PROFILE</span><p>Graphic-design foundation. Product-engineering practice. Human-centered direction.</p></figcaption>
        </figure>
      </section>

      <section className="selected-work section-shell">
        <SectionHeader number="01" label="Selected investigations" title="Working systems, human questions." />
        <div className="investigation-list">
          {investigations.map((project) => (
            <article key={project.slug} className="investigation-row" style={{ "--project-accent": project.accent } as React.CSSProperties}>
              <div className="investigation-row__number">{project.number}</div>
              <div className="investigation-row__visual">
                <img src={project.previewImage} alt={project.previewAlt} loading="lazy" />
                <span>Original project artwork</span>
              </div>
              <div className="investigation-row__body">
                <div className="investigation-row__meta"><span>{project.theme}</span><span>{project.status}</span></div>
                <h3>{project.name}</h3>
                <blockquote>{project.question}</blockquote>
                <dl><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Context</dt><dd>{project.stack.slice(0, 4).join(" / ")}</dd></div></dl>
                <Link to={`/work/${project.slug}`} className="text-link">Read the investigation <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="technology-section section-shell">
        <SectionHeader number="02" label="Human capability system" title="Different domains. One recurring question." light />
        <CapabilityNetwork />
      </section>

      <section className="trajectory-section section-shell">
        <SectionHeader number="03" label="Practice trajectory" title="The medium expanded. So did the question." />
        <div className="trajectory-grid">
          <blockquote>“Engineering became another creative material.”</blockquote>
          <ol>{trajectory.map(([stage, result], index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong><i aria-hidden="true">→</i><em>{result}</em></li>)}</ol>
        </div>
        <Link className="text-link" to="/about">Read the full trajectory <span aria-hidden="true">→</span></Link>
      </section>

      <section className="practice-section section-shell">
        <SectionHeader number="04" label="Professional practice" title="Product work across healthcare, media, and enterprise systems." />
        <div className="practice-grid">
          {professionalExperience.slice(0, 3).map((experience) => (
            <article key={experience.company}><span>{experience.dates}</span><h3>{experience.company}</h3><p className="practice-grid__role">{experience.role}</p><p>{experience.summary}</p></article>
          ))}
        </div>
        <Link className="text-link" to="/work#professional-practice">View professional practice <span aria-hidden="true">→</span></Link>
      </section>

      <section className="notes-section section-shell">
        <SectionHeader number="05" label="Field notes" title="Thinking carefully in public." />
        <div className="notes-grid">
          {fieldNotes.map((note) => <article key={note.slug} style={{ "--note-accent": note.themeColor } as React.CSSProperties}><div><span>{note.number}</span><span>{note.theme}</span></div><h3><Link to={`/field-notes/${note.slug}`}>{note.title}</Link></h3><blockquote>{note.claim}</blockquote><p>{note.summary}</p><Link className="text-link" to={`/field-notes/${note.slug}`}>Read note <span aria-hidden="true">→</span></Link></article>)}
        </div>
      </section>

      <section className="career-cta">
        <p className="eyebrow eyebrow--light">Current direction</p>
        <h2>{professionalProfile.availability}.</h2>
        <p>I am looking for work where design and engineering are treated as connected disciplines.</p>
        <ul>{professionalProfile.focus.map((focus) => <li key={focus}>{focus}</li>)}</ul>
        <div className="button-row"><Link className="button button--light" to="/resume">View resume</Link><Link className="button button--outline-light" to="/contact">Contact me</Link></div>
      </section>
    </div>
  );
}

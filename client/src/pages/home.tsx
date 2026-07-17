import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { HomeFramework } from "@/components/editorial/HomeFramework";
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

const investigationExhibits = [
  "/assets/projects/withyou/home-exhibit.webp",
  "/assets/projects/dojonet/home-exhibit.webp",
  "/assets/projects/gundam-forge/home-exhibit.webp",
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
          <p className="eyebrow"><span /> {professionalProfile.name} — {professionalProfile.title}</p>
          <h1>{professionalProfile.tagline}</h1>
          <p className="professional-hero__thesis">Three independent product investigations, documented as HCI inquiries.</p>
          <p className="professional-hero__lead">
            I work across interaction design, frontend engineering, and full-stack product development. My practice began in graphic design and expanded into engineering as I became increasingly interested not only in how technology looks, but how it behaves and what it enables people to do.
          </p>
          <div className="hero-proof">
            <div><span>Focus</span><p>Human capability — what technology helps a person become able to do</p></div>
            <div><span>Method</span><p>Build to investigate — then separate implementation from human outcomes</p></div>
            <div><span>Now</span><p>{professionalProfile.availability} and preparing for formal HCI study</p></div>
          </div>
          <div className="button-row professional-hero__actions">
            <Link className="button button--primary" to="/work">View the investigations <span aria-hidden="true">→</span></Link>
            <Link className="button button--secondary" to="/resume">View resume <span aria-hidden="true">↓</span></Link>
          </div>
          <nav className="hero-secondary-links" aria-label="Additional review paths">
            <Link to="/research">Research direction</Link>
            <Link to="/graduate-review">Graduate review</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
        <figure className="professional-hero__portrait">
          <div className="professional-hero__portrait-meta" aria-hidden="true"><span>The practitioner</span><span>Fig. 00</span></div>
          <img src={portrait} alt="Portrait of Earl Hickson Jr." width="900" height="1125" />
          <figcaption>
            <strong>Earl Hickson Jr. — Designer · Engineer</strong>
            <span>BFA Graphic Design · UX Engineering · Parsippany, NJ</span>
          </figcaption>
        </figure>
      </section>

      <section className="professional-record" aria-label="Professional record at a glance">
        <article><span>Record·01 — Practice</span><strong>Design → HCI</strong><p>A practice that expanded from visual communication into interactive systems and human consequence.</p></article>
        <article><span>Record·02 — Access</span><strong>Accessibility-focused</strong><p>Semantic interfaces, keyboard behavior, visible focus, responsive layouts, and inclusive implementation practices.</p></article>
        <article><span>Record·03 — Systems</span><strong>Design + engineering</strong><p>Component architecture, APIs, data, testing, and deployment treated as connected product materials.</p></article>
        <article><span>Record·04 — Evidence</span><strong>3 investigations</strong><p>Relationships, learning, and decision support documented with explicit status, contribution, and limitations.</p></article>
      </section>

      <section className="home-investigations" id="investigations">
        <header className="home-band-heading">
          <div><span>Selected investigations</span><h2>Three questions, answered with working software.</h2></div>
          <Link to="/work">Full index →</Link>
        </header>
        <div className="home-campaign-list">
          {investigations.map((project, index) => (
            <article key={project.slug} className={`home-campaign${index % 2 ? " home-campaign--reverse" : ""}`} style={{ "--project-accent": project.accent } as React.CSSProperties}>
              <div className="home-campaign__copy">
                <div className="home-campaign__meta"><span>{project.theme}</span><span>{project.status}</span></div>
                <h3>{project.question}</h3>
                <blockquote>{project.name} — {project.argument}</blockquote>
                <p>{project.abstract.product}</p>
                <dl>
                  <div><dt>Evidence</dt><dd>{project.evidence[0]}</dd></div>
                  <div><dt>Position</dt><dd>{project.abstract.remember}</dd></div>
                </dl>
                <Link to={`/work/${project.slug}`} className="home-campaign__button">Open the investigation →</Link>
              </div>
              <Link to={`/work/${project.slug}`} className="home-campaign__figure" aria-label={`Open the ${project.name} investigation`}>
                <img src={investigationExhibits[index]} alt={`${project.name} product interface exhibit`} loading="lazy" width="1200" height="800" />
                <span>Exhibit {String.fromCharCode(65 + index)}</span><b>Fig. {String(index + 1).padStart(2, "0")}</b>
                <small>{project.name} — implementation evidence</small>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <HomeFramework />

      <section className="trajectory-section section-shell">
        <SectionHeader label="Practice trajectory" title="The medium expanded. So did the question." />
        <div className="trajectory-grid">
          <blockquote>“Engineering became another creative material.”</blockquote>
          <ol>{trajectory.map(([stage, result], index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong><i aria-hidden="true">→</i><em>{result}</em></li>)}</ol>
        </div>
        <Link className="text-link" to="/about">Read the full trajectory <span aria-hidden="true">→</span></Link>
      </section>

      <section className="practice-section section-shell">
        <SectionHeader label="Professional practice" title="Product work across healthcare, media, and enterprise systems." />
        <div className="practice-grid">
          {professionalExperience.slice(0, 3).map((experience) => (
            <article key={experience.company}><span>{experience.dates}</span><h3>{experience.company}</h3><p className="practice-grid__role">{experience.role}</p><p>{experience.summary}</p></article>
          ))}
        </div>
        <Link className="text-link" to="/resume">View the professional record <span aria-hidden="true">→</span></Link>
      </section>

      <section className="notes-section section-shell">
        <SectionHeader label="Field notes" title="Thinking carefully in public." />
        <div className="notes-grid">
          {fieldNotes.map((note) => <article key={note.slug} style={{ "--note-accent": note.themeColor } as React.CSSProperties}><div><span>{note.number}</span><span>{note.theme}</span></div><h3><Link to={`/field-notes/${note.slug}`}>{note.title}</Link></h3><blockquote>{note.claim}</blockquote><p>{note.summary}</p><Link className="text-link" to={`/field-notes/${note.slug}`}>Read note <span aria-hidden="true">→</span></Link></article>)}
        </div>
      </section>

      <section className="graduate-direction section-shell">
        <SectionHeader label="Graduate-study direction" title="Formal methods for evaluating the human consequence." />
        <div className="graduate-direction__grid">
          <blockquote>Working software can prove implementation. It cannot, by itself, prove a human outcome.</blockquote>
          <div><p>I am preparing for graduate study in human-computer interaction to deepen my ability to investigate privacy expectations, learning behavior, decision support, accessibility, and human agency with methods strong enough to test the questions.</p><div className="button-row"><Link className="button button--primary" to="/graduate-review">Five-minute graduate review</Link><Link className="button button--secondary" to="/research">Research direction</Link></div></div>
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

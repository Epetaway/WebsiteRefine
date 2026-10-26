import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { Reveal } from "@/components/motion/Reveal";
import { workEntries } from "@/data/work";
import { fieldNotes } from "@/data/fieldNotes";
import { earlierExperience, experience, profile, teaching } from "@/data/professional";
import { publicPath } from "@/lib/publicPath";
import portrait from "@/images/earl-bjj-photo.png";
import trainingPhoto from "@/images/BLKBELT.png";

const practice = [
  ["01", "Frame", "Turn an ambiguous product problem into a clear interaction and system boundary."],
  ["02", "Design", "Shape flows, information, states, and accessible interface behavior."],
  ["03", "Build", "Translate the design into resilient components, data, and working product code."],
  ["04", "Verify", "Test the behavior, name the gaps, and separate implementation from outcome claims."],
] as const;

export default function Home() {
  return (
    <div className="portfolio-home">
      <SEO
        title={`Earl Hickson Jr. — ${profile.publicTitle}`}
        description="Lead front-end engineer with a BFA in graphic design and 6+ years building production interfaces for healthcare, financial services, and digital media."
      />

      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__grid" aria-hidden="true" />
        <Reveal className="home-hero__copy">
          <p className="signal-label"><span /> Earl Hickson Jr. / {profile.publicTitle}</p>
          <h1 id="home-title">I design and build digital products from <em>interface</em> to implementation.</h1>
          <p className="home-hero__lead">{profile.lead}</p>
          <div className="home-hero__actions">
            <Link className="button button--accent" to="/work">View case studies <span aria-hidden="true">↗</span></Link>
            <a className="button button--ghost" href={publicPath("/assets/Earl-Hickson-Jr-Resume.pdf")} download>Download résumé</a>
          </div>
          <dl className="home-hero__status">
            <div><dt>Current</dt><dd>{profile.availability}</dd></div>
            <div><dt>Focus</dt><dd>{profile.specialties.join(" · ")}</dd></div>
          </dl>
        </Reveal>

        <Reveal className="home-hero__portrait" delay={0.08}>
          <div className="home-hero__portrait-frame">
            <img src={portrait} alt="Earl Hickson Jr. smiling against a yellow background" width="1536" height="1024" />
            <span aria-hidden="true">EH / 2026</span>
          </div>
          <p>Designer by foundation. Engineer by practice. Teacher by discipline.</p>
        </Reveal>

        <p className="home-hero__scroll" aria-hidden="true">Selected work ↓</p>
      </section>

      <section className="home-work" aria-labelledby="selected-work-heading">
        <header className="home-section-heading">
          <p className="signal-label"><span /> 01 / Selected case studies</p>
          <h2 id="selected-work-heading">Product thinking made tangible.</h2>
          <p>Independent products showing how I move between interaction decisions, implementation constraints, and working interfaces.</p>
        </header>

        <div className="home-case-list">
          {workEntries.map((project, index) => (
            <Reveal key={project.slug} className="home-case" delay={index * 0.04}>
              <article style={{ "--project-accent": project.accent } as React.CSSProperties}>
                <Link className={`home-case__media home-case__media--${project.heroMedia.presentation}`} to={project.path} aria-label={`View ${project.name} case study`}>
                  <span>{project.number} / {project.status}</span>
                  <img src={project.heroMedia.src} srcSet={project.heroMedia.srcSet} sizes={project.heroMedia.srcSet ? "(max-width: 1050px) 100vw, 45vw" : undefined} alt={project.heroMedia.alt} loading={index === 0 ? "eager" : "lazy"} />
                </Link>
                <div className="home-case__content">
                  <div className="home-case__meta"><span>{project.theme}</span><span>{project.stack.slice(0, 3).join(" · ")}</span></div>
                  <h3>{project.name}</h3>
                  <p className="home-case__question">{project.question}</p>
                  <p>{project.summary}</p>
                  <dl><div><dt>My role</dt><dd>{project.role}</dd></div><div><dt>Built</dt><dd>{project.built}</dd></div></dl>
                  <Link className="case-link" to={project.path}>Read case study <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Link className="button button--dark" to="/work">See all work and experience</Link>
      </section>

      <section className="home-experience" aria-labelledby="experience-heading">
        <header className="home-section-heading home-section-heading--dark">
          <p className="signal-label"><span /> 02 / Professional practice</p>
          <h2 id="experience-heading">Production work across complex organizations.</h2>
          <p>Front-end delivery, component standards, accessibility, and team leadership across healthcare, financial services, digital media, and nonprofit work.</p>
        </header>
        <div className="experience-ledger">
          {experience.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.03}>
              <article>
                <span>{item.dates}</span>
                <div><h3>{item.employer}</h3><p>{item.role}</p></div>
                <p>{item.summary}</p>
                <span>{item.area}</span>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="experience-ledger__earlier">{earlierExperience}</p>
        <Link className="case-link case-link--light" to="/resume">Open the full professional record <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="home-practice" aria-labelledby="practice-heading">
        <header className="home-section-heading">
          <p className="signal-label"><span /> 03 / How I work</p>
          <h2 id="practice-heading">Design and engineering are one continuous practice.</h2>
          <p>Each phase changes the others. Implementation exposes design assumptions; testing exposes what the implementation still does not prove.</p>
        </header>
        <ol className="practice-sequence">
          {practice.map(([number, title, detail]) => (
            <li key={title}><span>{number}</span><h3>{title}</h3><p>{detail}</p></li>
          ))}
        </ol>
      </section>

      <section className="home-discipline" aria-labelledby="discipline-heading">
        <Reveal className="home-discipline__image">
          <img src={trainingPhoto} alt="Earl teaching a young Brazilian Jiu-Jitsu student" loading="lazy" width="4032" height="2268" />
          <span>Practice / feedback / adaptation</span>
        </Reveal>
        <Reveal className="home-discipline__copy" delay={0.06}>
          <p className="signal-label"><span /> 04 / Beyond the screen</p>
          <h2 id="discipline-heading">The work is shaped by teaching, repetition, and learning under pressure.</h2>
          <p>{teaching.summary}</p>
          <blockquote>“Understanding a description is not the same as being able to act.”</blockquote>
          <div><Link className="case-link case-link--light" to="/about">More about my path <span aria-hidden="true">↗</span></Link><Link className="case-link case-link--light" to="/work/earl-the-kaiju">Earl the Kaiju case study <span aria-hidden="true">↗</span></Link><Link className="case-link case-link--light" to="/research">Research direction <span aria-hidden="true">↗</span></Link></div>
        </Reveal>
      </section>

      <section className="home-notes" aria-labelledby="notes-heading">
        <header className="home-section-heading">
          <p className="signal-label"><span /> 05 / Notes</p>
          <h2 id="notes-heading">Ideas from the workbench.</h2>
        </header>
        <div className="home-note-list">
          {fieldNotes.slice(0, 3).map((note) => (
            <article key={note.slug}>
              <span>{note.number} / {note.readingTime}</span>
              <h3><Link to={`/field-notes/${note.slug}`}>{note.title}</Link></h3>
              <p>{note.summary}</p>
              <Link className="case-link" to={`/field-notes/${note.slug}`}>Read note <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-contact">
        <p className="signal-label"><span /> Available for the right team</p>
        <h2>Looking for a front-end lead who can design the experience and get a team shipping it?</h2>
        <p>I’m open to full-time lead and senior front-end engineering roles. {profile.workPreference}.</p>
        <div><Link className="button button--accent" to="/contact">Start a conversation <span aria-hidden="true">↗</span></Link><Link className="button button--ghost" to="/resume">View résumé</Link></div>
      </section>
    </div>
  );
}

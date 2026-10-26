import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { Reveal } from "@/components/motion/Reveal";
import { PageIntro } from "@/components/editorial/PageIntro";
import { workEntries } from "@/data/work";
import { earlierExperience, experience } from "@/data/professional";

export default function Work() {
  return (
    <div className="portfolio-page work-page">
      <SEO
        title="Work — Earl Hickson Jr."
        description="Case studies and professional front-end work by Earl Hickson Jr., lead front-end engineer."
        path="/work"
        image="/assets/brand/social/og-investigations.svg"
      />
      <PageIntro
        dark
        label="Work / Case studies"
        title={<>Design decisions. Working interfaces. <em>Clear evidence.</em></>}
        lead={<p>Four independent projects show how I frame interaction problems, make system decisions, and build the resulting experience. Professional history shows where that practice has shipped inside teams.</p>}
        aside={<dl className="page-facts"><div><dt>Case studies</dt><dd>4 independent projects</dd></div><div><dt>Practice</dt><dd>Design through implementation</dd></div><div><dt>Evidence</dt><dd>Built does not mean proven</dd></div></dl>}
      />

      <section className="work-case-studies" aria-label="Selected case studies">
        {workEntries.map((project, index) => (
          <Reveal key={project.slug}>
            <article className="work-case" style={{ "--project-accent": project.accent } as React.CSSProperties}>
              <div className="work-case__number"><span>{project.number}</span><i /></div>
              <div className={`work-case__visual work-case__visual--${project.heroMedia.presentation}`}>
                <span>{project.status}</span>
                <img src={project.heroMedia.src} srcSet={project.heroMedia.srcSet} sizes={project.heroMedia.srcSet ? "(max-width: 1050px) 100vw, 40vw" : undefined} alt={project.heroMedia.alt} loading={index === 0 ? "eager" : "lazy"} />
              </div>
              <div className="work-case__body">
                <p className="signal-label"><span /> {project.theme}</p>
                <h2>{project.name}</h2>
                <p className="work-case__question">{project.question}</p>
                <p>{project.summary}</p>
                <dl>
                  <div><dt>My role</dt><dd>{project.role}</dd></div>
                  <div><dt>Principal decision</dt><dd>{project.decision}</dd></div>
                  <div><dt>Implementation</dt><dd>{project.built}</dd></div>
                  <div><dt>Stack</dt><dd>{project.stack.join(" · ")}</dd></div>
                </dl>
                <Link className="button button--project" to={project.path}>Open case study <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section id="professional-practice" className="work-history" aria-labelledby="work-history-title">
        <header className="home-section-heading home-section-heading--dark">
          <p className="signal-label"><span /> Professional experience</p>
          <h2 id="work-history-title">The independent work sits on a production foundation.</h2>
          <p>Public descriptions remain concise to protect confidential employer material while showing the scope of the work.</p>
        </header>
        <div className="experience-ledger">
          {experience.map((item) => (
            <article key={item.id}>
              <span>{item.dates}</span>
              <div><h3>{item.employer}</h3><p>{item.role}</p></div>
              <p>{item.summary}</p>
              <span>{item.area}</span>
            </article>
          ))}
        </div>
        <p className="experience-ledger__earlier">{earlierExperience}</p>
        <Link className="button button--accent" to="/resume">View résumé</Link>
      </section>
    </div>
  );
}

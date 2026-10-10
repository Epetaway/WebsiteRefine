import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { Reveal } from "@/components/motion/Reveal";
import { PageIntro } from "@/components/editorial/PageIntro";
import { investigations } from "@/data/investigations";
import { experience } from "@/data/professional";
import { getCaseStudyView } from "@/lib/caseStudyView";

export default function Work() {
  return (
    <div className="portfolio-page work-page">
      <SEO
        title="Work — Earl Hickson Jr."
        description="UX engineering case studies and professional frontend product work by Earl Hickson Jr."
        path="/work"
        image="/assets/brand/social/og-investigations.svg"
      />
      <PageIntro
        dark
        label="Work / Case studies"
        title={<>Design decisions. Working interfaces. <em>Clear evidence.</em></>}
        lead={<p>Three independent products show how I frame interaction problems, make system decisions, and build the resulting experience. Professional history shows where that practice has shipped inside teams.</p>}
        aside={<dl className="page-facts"><div><dt>Case studies</dt><dd>3 product systems</dd></div><div><dt>Practice</dt><dd>Design through implementation</dd></div><div><dt>Evidence</dt><dd>Built does not mean proven</dd></div></dl>}
      />

      <section className="work-case-studies" aria-label="Selected case studies">
        {investigations.map((project, index) => {
          const view = getCaseStudyView(project);
          return (
            <Reveal key={project.slug}>
              <article className="work-case" style={{ "--project-accent": project.accent } as React.CSSProperties}>
                <div className="work-case__number"><span>{project.number}</span><i /></div>
                <div className={`work-case__visual work-case__visual--${view.heroMedia.presentation}`}>
                  <span>{project.status}</span>
                  <img src={view.heroMedia.src} alt={view.heroMedia.alt} loading={index === 0 ? "eager" : "lazy"} />
                </div>
                <div className="work-case__body">
                  <p className="signal-label"><span /> {project.theme}</p>
                  <h2>{project.name}</h2>
                  <p className="work-case__question">{project.question}</p>
                  <p>{project.abstract.product}</p>
                  <dl>
                    <div><dt>My role</dt><dd>{project.role}</dd></div>
                    <div><dt>Principal decision</dt><dd>{project.interactionDecision}</dd></div>
                    <div><dt>Implementation</dt><dd>{project.abstract.built}</dd></div>
                    <div><dt>Stack</dt><dd>{project.stack.join(" · ")}</dd></div>
                  </dl>
                  <Link className="button button--project" to={`/work/${project.slug}`}>Open case study <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            </Reveal>
          );
        })}
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
        <Link className="button button--accent" to="/resume">View résumé</Link>
      </section>
    </div>
  );
}

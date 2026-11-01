import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { workMeta } from "@/data/routeMeta/pages";
import { Reveal } from "@/components/motion/Reveal";
import { PageIntro } from "@/components/editorial/PageIntro";
import { workEntries } from "@/data/work";
import { getWorkCover, workCoverStyle } from "@/data/workCovers";
import { KitPicture } from "@/components/case-study-kit/kit";
import { earlierExperience, experience } from "@/data/professional";

export default function Work() {
  return (
    <div className="portfolio-page work-page">
      <SEO {...workMeta} />
      <PageIntro
        dark
        label="Work / Case studies"
        title={<>Design decisions. Working interfaces. <em>Clear evidence.</em></>}
        lead={<p>Four independent projects show how I frame interaction problems, make system decisions, and build the resulting experience. Professional history shows where that practice has shipped inside teams.</p>}
        aside={<dl className="page-facts"><div><dt>Case studies</dt><dd>4 independent projects</dd></div><div><dt>Practice</dt><dd>Design through implementation</dd></div><div><dt>Evidence</dt><dd>Built does not mean proven</dd></div></dl>}
      />

      <section className="work-case-studies" aria-label="Selected case studies">
        {workEntries.map((project, index) => {
          const cover = getWorkCover(project.slug);
          const eager = index === 0;
          return (
            <Reveal key={project.slug}>
              <article
                className={`work-card work-card--${index % 2 === 0 ? "media-right" : "media-left"}`}
                style={workCoverStyle(cover) as React.CSSProperties}
                data-testid={`work-card-${project.slug}`}
              >
                <div className="work-card__body">
                  <p className="work-card__meta">
                    <span>Case study {project.number}</span>
                    <span>{project.theme}</span>
                  </p>
                  <h2><Link className="work-card__link" to={project.path}>{project.name}</Link></h2>
                  <p className="work-card__question">{project.question}</p>
                  <p className="work-card__summary">{project.summary}</p>
                  <dl>
                    <div><dt>My role</dt><dd>{project.role}</dd></div>
                    <div><dt>Principal decision</dt><dd>{project.decision}</dd></div>
                    <div><dt>Implementation</dt><dd>{project.built}</dd></div>
                    <div><dt>Stack</dt><dd>{project.stack.join(" · ")}</dd></div>
                  </dl>
                  <span className="work-card__cta" aria-hidden="true">Open case study <i>→</i></span>
                </div>
                <div className="work-card__stage">
                  <span className="work-card__status">{project.status}</span>
                  <div className="work-card__main">
                    <i className="work-card__bar" aria-hidden="true"><b /><b /><b /></i>
                    <KitPicture item={cover.main.item} alt={cover.main.alt} sizes="(max-width: 900px) 92vw, 52vw" eager={eager} />
                  </div>
                  <div className="work-card__float">
                    <KitPicture item={cover.float.item} alt={cover.float.alt} sizes="(max-width: 900px) 34vw, 14vw" eager={eager} />
                  </div>
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
        <p className="experience-ledger__earlier">{earlierExperience}</p>
        <Link className="button button--accent" to="/resume">View résumé</Link>
      </section>
    </div>
  );
}

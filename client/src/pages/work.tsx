import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { workMeta } from "@/data/routeMeta/pages";
import { Reveal } from "@/components/motion/Reveal";
import { PageIntro } from "@/components/editorial/PageIntro";
import { Mark } from "@/components/motion/Mark";
import { workEntries } from "@/data/work";
import { WorkCard } from "@/components/editorial/WorkCard";
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
        {workEntries.map((project, index) => (
          <Reveal key={project.slug}>
            <WorkCard
              project={project}
              index={index}
              placement="work"
              headingLevel="h2"
              details={[
                { label: "My role", value: project.role },
                { label: "Principal decision", value: project.decision },
                { label: "Implementation", value: project.built },
                { label: "Stack", value: project.stack.join(" · ") },
              ]}
            />
          </Reveal>
        ))}
      </section>

      <section id="professional-practice" className="work-history" aria-labelledby="work-history-title">
        <header className="home-section-heading home-section-heading--dark">
          <p className="signal-label"><span /> Professional experience</p>
          <h2 id="work-history-title">The independent work sits on a <Mark>production foundation.</Mark></h2>
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

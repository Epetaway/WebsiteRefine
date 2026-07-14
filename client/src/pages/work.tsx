import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { investigations } from "@/data/investigations";
import { professionalExperience } from "@/data/professionalExperience";

export default function Work() {
  return (
    <div className="portfolio-page">
      <SEO title="Work — Earl Hickson Jr." description="Selected human-centered product investigations and professional UX engineering practice by Earl Hickson Jr." path="/work" image="/assets/brand/social/og-investigations.svg" />
      <PageIntro label="Work / Evidence" title={<>Selected design investigations <em>and</em> professional practice.</>} lead={<p>These are different evidence types. The investigations show independent product reasoning and implementation. Professional history shows how that practice has operated inside healthcare, media, and enterprise teams.</p>} aside={<dl className="page-facts"><div><dt>Flagship work</dt><dd>3 investigations</dd></div><div><dt>Reading modes</dt><dd>Abstract + full study</dd></div><div><dt>Evidence policy</dt><dd>Built ≠ proven</dd></div></dl>} />

      <section className="section-shell work-investigations">
        <SectionHeader number="01" label="Selected design investigations" title="Three products at different stages of implementation." />
        {investigations.map((project) => (
          <article className="work-entry" key={project.slug} style={{ "--project-accent": project.accent } as React.CSSProperties}>
            <div className="work-entry__index"><span>{project.number}</span><i /></div>
            <div className="work-entry__image"><img src={project.previewImage} alt={project.previewAlt} loading="lazy" /><span>Original project artwork</span></div>
            <div className="work-entry__content"><p className="eyebrow">{project.theme}</p><h2>{project.name}</h2><blockquote>{project.question}</blockquote><p>{project.abstract.product}</p><dl><div><dt>Status</dt><dd>{project.status}</dd></div><div><dt>Role</dt><dd>{project.role}</dd></div></dl><Link className="button button--project" to={`/work/${project.slug}`}>Open investigation</Link></div>
          </article>
        ))}
      </section>

      <section id="professional-practice" className="section-shell professional-history">
        <SectionHeader number="02" label="Professional practice" title="Verified work without invented public case studies." />
        <p className="section-lead">Public descriptions stay compact to protect confidential employer material while preserving the scope of the work.</p>
        <div className="professional-history__list">
          {professionalExperience.map((experience) => <article key={experience.company}><div><span>{experience.dates}</span><span>{experience.area}</span></div><h3>{experience.company}</h3><p className="professional-history__role">{experience.role}</p><p>{experience.summary}</p></article>)}
        </div>
      </section>
    </div>
  );
}

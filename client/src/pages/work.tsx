import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { ExpandableImage } from "@/components/editorial/ExpandableImage";
import { PageIntro } from "@/components/editorial/PageIntro";
import { investigations } from "@/data/investigations";

const workEvidence = {
  withyou: { exhibit: "Exhibit A", detail: "Working mobile and backend beta · pairing and privacy-control evidence", status: "Working beta" },
  dojonet: { exhibit: "Exhibit B", detail: "Working React application · journal, profile, and practice-history surfaces", status: "Active development" },
  "gundam-forge": { exhibit: "Exhibit C", detail: "Working typed application · catalog, deck construction, and playtesting", status: "Functional beta" },
} as const;

export default function Work() {
  return (
    <div className="portfolio-page work-page">
      <SEO title="Investigations — Earl Hickson Jr." description="Three open human-centered product investigations by Earl Hickson Jr." path="/work" image="/assets/brand/social/og-investigations.svg" />
      <PageIntro label="INVESTIGATIONS — 03 OPEN STUDIES" railLabel="Index / investigations" title={<>Long-form investigative work.</>} lead={<p>A stated research question, a transparent evidence trail, and an explicit note on confidence—every study names what is built, what is partial, and what remains unproven.</p>} />

      <section className="work-investigations" aria-label="Selected design investigations">
        {investigations.map((project) => {
          const evidence = workEvidence[project.slug];
          return (
          <article className="work-entry" key={project.slug} style={{ "--project-accent": project.accent } as React.CSSProperties}>
            <div className="work-entry__index"><strong>{project.number}</strong><span>{project.theme}</span></div>
            <div className="work-entry__content">
              <h2>{project.name}: {project.argument}</h2>
              <p className="work-entry__meta">{project.theme} / Product design / Independent inquiry</p>
              <p>{project.abstract.product}</p>
              <Link className="work-entry__link" to={`/work/${project.slug}`}>Read the investigation →</Link>
            </div>
            <figure className="work-entry__image">
              <span>Evidence</span>
              <ExpandableImage src={project.previewImage} alt={project.previewAlt} caption={`${project.name} — ${evidence.detail}`} hint={`${evidence.exhibit} · view larger`} width={1200} height={800} />
              <figcaption><span>{evidence.detail}</span><b>{evidence.status}</b></figcaption>
            </figure>
          </article>
          );
        })}
      </section>

      <section className="work-method" aria-label="Investigation method">
        <div>
          <i aria-hidden="true" />
          <p><span>Method — </span>Every investigation follows the same discipline: a stated research question, a transparent evidence trail, and an explicit note on confidence. Shorter arguments live in <Link to="/field-notes">Field Notes</Link>.</p>
        </div>
      </section>
    </div>
  );
}

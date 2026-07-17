import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import professionalFacts from "@/data/professionalFacts.json";
import { investigations } from "@/data/investigations";
import { fieldNotes } from "@/data/fieldNotes";

export default function GraduateReview() {
  const { profile, researchInterests, researchPreparation, teachingPerspective, capabilities } = professionalFacts;

  return (
    <div className="portfolio-page graduate-review-page">
      <SEO
        title="HCI Graduate Review — Earl Hickson Jr."
        description="A focused admissions-review path through Earl Hickson Jr.'s HCI motivation, independent investigations, technical preparation, and research direction."
        path="/graduate-review"
        image="/assets/brand/social/og-research.svg"
        noIndex
      />
      <PageIntro
        label="Graduate review — a curated five-minute path"
        title={<>Earl Hickson Jr. — for admissions reviewers.</>}
        lead={<p>UX Engineer and independent HCI practitioner with a background in graphic design, frontend engineering, and full-stack product development. My work explores how interactive systems can strengthen human capability across relationships, learning, and complex decision-making without unnecessarily replacing human agency.</p>}
        aside={<dl className="page-facts"><div><dt>Seeking</dt><dd>Graduate study in HCI and formal research-methods training</dd></div><div><dt>Interests</dt><dd>{researchInterests.slice(0, 4).join(" · ")}</dd></div><div><dt>Contact</dt><dd><a href={`mailto:${profile.links.email}`}>Email</a> · <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a> · <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></dd></div></dl>}
      />

      <section id="research-interest" className="graduate-review-section graduate-why">
        <div className="graduate-section-marker"><strong>01</strong><span>Why HCI</span><i /></div>
        <div className="graduate-why__copy">
          <p>Graphic design taught me communication. Interaction design introduced behavior. Frontend engineering made behavior real. Full-stack development exposed the systems underneath. HCI introduces the question the rest of the path kept circling: what are the human consequences of what I build?</p>
          <blockquote>Working software can prove implementation. It cannot by itself prove a human outcome — that is what I want formal training to address.</blockquote>
          <Link className="text-link" to="/research">Full research statement <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section id="investigations" className="graduate-review-section">
        <div className="graduate-section-marker"><strong>02</strong><span>Three investigations</span><i /></div>
        <div className="graduate-investigation-list">
          <h2 className="sr-only">Three independent inquiries with explicit evidence boundaries</h2>
          {investigations.map((investigation) => (
            <Link to={`/work/${investigation.slug}`} className="graduate-investigation-row" key={investigation.slug} style={{ "--project-accent": investigation.accent } as React.CSSProperties}>
              <span className="graduate-investigation-row__identity"><b>{investigation.number} / {investigation.theme}</b><strong>{investigation.name}</strong><i>{investigation.status}</i></span>
              <span className="graduate-investigation-row__detail"><span>{investigation.question} {investigation.abstract.built}</span><small>Role: {investigation.role} · Proposed: {investigation.proposedMethods.slice(0, 2).join(", ")}</small></span>
              <b className="graduate-investigation-row__open">Open →</b>
            </Link>
          ))}
        </div>
      </section>

      <section id="preparation" className="graduate-review-section">
        <div className="graduate-section-marker"><strong>03</strong><span>Preparation</span><i /></div>
        <div className="graduate-preparation-ledger">
          <h2 className="sr-only">Verified methods are separated from formal training goals.</h2>
          <div><strong>Technical</strong><p>{capabilities.slice(1).map((item) => item.items).join(" · ")}</p></div>
          <div><strong>Design</strong><p>BFA Graphic Design, Kean University (2015) · {capabilities[0].items}</p></div>
          <div><strong>Methods used</strong><p>{researchPreparation.used.join(" · ")}</p></div>
          <div><strong>Seeking training</strong><p>{researchPreparation.seeking.join(" · ")}</p></div>
          <div><strong>Teaching</strong><p>{teachingPerspective.summary} {teachingPerspective.publicRecordStatus}</p></div>
          <p className="methods-boundary">The methods listed under seeking training are proposed directions—not completed research claims.</p>
        </div>
      </section>

      <section id="writing" className="graduate-review-section graduate-review-section--last">
        <div className="graduate-section-marker"><strong>04</strong><span>Writing &amp; documents</span><i /></div>
        <div className="graduate-review-documents">
          <h2 className="sr-only">Selected writing and application documents</h2>
          <div className="graduate-review-writing-list">
            {fieldNotes.slice(0, 3).map((note) => <Link key={note.slug} to={`/field-notes/${note.slug}`}>{note.title}</Link>)}
          </div>
          <div className="button-row">
            <a className="button button--light" href={profile.links.graduateCv} download>Download graduate CV</a>
            <Link className="button button--outline-light" to="/contact">Contact</Link>
          </div>
          <p>Graduate CV — application-specific and linked only from this focused review path. This is a curated path through the public portfolio, not a second portfolio.</p>
        </div>
      </section>
    </div>
  );
}

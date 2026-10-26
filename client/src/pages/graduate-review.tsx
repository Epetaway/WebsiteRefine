import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { PageIntro } from "@/components/editorial/PageIntro";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { investigations } from "@/data/investigations";
import {
  capabilities,
  certifications,
  education,
  professionalLinks,
  profile,
  research,
  teaching,
} from "@/data/professional";
import { publicPath } from "@/lib/publicPath";

export default function GraduateReview() {
  return (
    <div className="portfolio-page graduate-review-page">
      <SEO
        title={`Graduate Review — Earl Hickson Jr., ${profile.publicTitle}`}
        description="A five-minute HCI admissions review of Earl Hickson Jr.'s preparation, independent case studies, research interests, writing, and graduate CV."
        path="/graduate-review"
        image="/assets/brand/social/og-graduate-review.svg"
      />
      <PageIntro
        label="Graduate review / HCI"
        title={<>Design preparation. Engineering preparation. A clear <em>research direction.</em></>}
        lead={<p>{profile.graduateSummary}</p>}
        aside={
          <div className="graduate-review__quick-links">
            <span>Application document</span>
            <a href={publicPath(professionalLinks.graduateCv)}>Open graduate CV</a>
            <small>Two-page, application-specific PDF</small>
          </div>
        }
      />

      <nav className="review-jump-nav" aria-label="Graduate review sections">
        <a href="#research-direction">Research direction</a>
        <a href="#preparation">Preparation</a>
        <a href="#investigations">Case studies</a>
        <a href="#teaching-writing">Teaching and writing</a>
        <a href="#application-documents">Documents and contact</a>
      </nav>

      <section id="research-direction" className="section-shell review-research">
        <SectionHeader number="01" label="Research direction" title="Why human-computer interaction, and why now." />
        <div className="review-two-column">
          <div>
            <h3>Why HCI</h3>
            <p>Graphic design taught me to shape communication. Interaction design moved that work into behavior. Frontend engineering made behavior testable, and full-stack development exposed how schemas, APIs, and system constraints affect the experience a person actually receives.</p>
            <p>Building answered whether I could make a system function. It did not answer whether the system helped someone learn, understand, decide, or act. Graduate study is the next step because I want the research methods needed to evaluate those human consequences with rigor.</p>
          </div>
          <div>
            <h3>Research interests</h3>
            <ul className="tag-list">
              {research.interests.map((interest) => <li key={interest}>{interest}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="preparation" className="technology-section section-shell">
        <SectionHeader number="02" label="Preparation" title="Visual reasoning, interaction implementation, and system thinking." light />
        <div className="review-preparation-grid">
          <article>
            <span>Design preparation</span>
            <h3>{education[0].credential}</h3>
            <p>{education[0].institution} · {education[0].completed}</p>
            <p>Formal preparation in typography, hierarchy, composition, visual systems, and communication.</p>
          </article>
          <article>
            <span>Engineering preparation</span>
            <h3>{certifications[0].credential}</h3>
            <p>{certifications[0].issuer} · {certifications[0].completed}</p>
            <p>{capabilities.map((group) => group.label).join(" · ")}</p>
          </article>
          <article>
            <span>Methods used</span>
            <h3>Applied product evaluation</h3>
            <ul>{research.methodsUsed.map((method) => <li key={method}>{method}</li>)}</ul>
          </article>
          <article>
            <span>Methods sought through graduate study</span>
            <h3>Human research practice</h3>
            <ul>{research.methodsSought.map((method) => <li key={method}>{method}</li>)}</ul>
          </article>
        </div>
      </section>

      <section id="investigations" className="section-shell review-investigations">
        <SectionHeader number="03" label="Independent HCI case studies" title="What I built, what the evidence supports, and what remains unknown." />
        <div className="review-investigations__list">
          {investigations.map((investigation) => (
            <article key={investigation.slug} style={{ "--project-accent": investigation.accent } as React.CSSProperties}>
              <header>
                <span>{investigation.number} / {investigation.theme}</span>
                <h3>{investigation.name}</h3>
                <p>{investigation.question}</p>
              </header>
              <dl>
                <div><dt>Contribution</dt><dd>{investigation.role}</dd></div>
                <div><dt>Current maturity</dt><dd>{investigation.status}</dd></div>
                <div><dt>Evidence</dt><dd>{investigation.evidence[0]}</dd></div>
                <div><dt>What remains unknown</dt><dd>{investigation.limitations[0]}</dd></div>
                <div><dt>Proposed evaluation</dt><dd>{investigation.proposedMethods.join(" · ")}</dd></div>
              </dl>
              <Link className="button button--project" to={`/work/${investigation.slug}`}>Review {investigation.name}</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="teaching-writing" className="section-shell review-teaching">
        <SectionHeader number="04" label="Teaching and selected writing" title="Capability is a thread across the practice." />
        <div className="review-two-column">
          <article>
            <h3>{teaching.heading}</h3>
            <p>{teaching.summary}</p>
            <ul>{teaching.practices.map((practice) => <li key={practice}>{practice}</li>)}</ul>
            <small>{teaching.positions.map((position) => `${position.academy} (${position.dates})`).join(" · ")}</small>
          </article>
          <article>
            <h3>Selected Field Notes</h3>
            <ol className="review-writing-list">
              {research.selectedWriting.map((item) => (
                <li key={item.path}><Link to={item.path}>{item.title}</Link></li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <section id="application-documents" className="review-documents">
        <p className="eyebrow eyebrow--light">Application documents and contact</p>
        <h2>Continue with the evidence most useful to your review.</h2>
        <p>The graduate CV is an application-specific document, not an alternative employment résumé.</p>
        <div className="button-row">
          <a className="button button--light" href={publicPath(professionalLinks.graduateCv)}>Graduate CV</a>
          <Link className="button button--outline-light" to="/research">Research direction</Link>
          <a className="button button--outline-light" href={professionalLinks.github} target="_blank" rel="noreferrer">GitHub</a>
          <Link className="button button--outline-light" to="/contact">Contact</Link>
        </div>
      </section>
    </div>
  );
}

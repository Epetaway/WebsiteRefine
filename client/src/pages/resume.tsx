import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { resumeMeta } from "@/data/routeMeta/pages";
import { PageIntro } from "@/components/editorial/PageIntro";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import {
  capabilities,
  certifications,
  earlierExperience,
  education,
  experience,
  professionalLinks,
  profile,
  selectedProjects,
  teaching,
} from "@/data/professional";
import { publicPath } from "@/lib/publicPath";

const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// Section order follows the résumé so the page and the PDF read the same way.
export default function Resume() {
  return (
    <div className="portfolio-page resume-page">
      <SEO {...resumeMeta} />
      <PageIntro compact label="Resume / Professional record" title={<>One public resume. One professional <em>identity.</em></>} lead={<p>The same record as the PDF: production front-end work in healthcare, financial services, and digital media, and the independent products I build and ship.</p>} aside={<a className="resume-download" href={publicPath(professionalLinks.publicResume)} download><span>PDF / ATS-friendly</span><strong>Download resume</strong><small>Earl-Hickson-Jr-Resume.pdf</small></a>} />

      <article className="online-resume">
        <header className="online-resume__header">
          <div><h2>{profile.name}</h2><p>{profile.publicTitle} · {profile.specialties.join(" · ")}</p></div>
          <address>
            <span>{profile.location}</span>
            <a href={`mailto:${professionalLinks.email}`}>{professionalLinks.email}</a>
            <a href={professionalLinks.linkedin}>{displayUrl(professionalLinks.linkedin)}</a>
            <a href={professionalLinks.github}>{displayUrl(professionalLinks.github)}</a>
          </address>
        </header>

        <section><SectionHeader number="01" label="Summary" /><p className="resume-summary">{profile.summary}</p></section>

        <section>
          <SectionHeader number="02" label="Technical skills" />
          <div className="capabilities-grid">
            {capabilities.map((group) => (
              <div key={group.label}>
                <h3>{group.label}</h3>
                {group.note ? <small>{group.note}</small> : null}
                <p>{group.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader number="03" label="Professional experience" />
          <div className="resume-experience">
            {experience.map((item) => (
              <article key={item.id}>
                <header><div><h3>{item.role}</h3><p>{item.employer} · {item.location}</p></div><span>{item.dates}</span></header>
                {item.responsibilities.length ? <ul>{item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul> : null}
                {item.engagements?.map((engagement) => (
                  <div className="resume-engagement" key={engagement.client}>
                    <h4>{engagement.client} <span>{engagement.role} · {engagement.dates}</span></h4>
                    <ul>{engagement.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>
                  </div>
                ))}
                {!item.responsibilities.length && !item.engagements?.length ? <p>{item.summary}</p> : null}
              </article>
            ))}
            <p className="resume-earlier">{earlierExperience}</p>
          </div>
        </section>

        <section>
          <SectionHeader number="04" label="Selected projects" />
          <div className="resume-investigations">
            {selectedProjects.map((project) => (
              <article key={project.slug}>
                <div><h3>{project.name}</h3><span>{project.status}</span></div>
                <p className="resume-project__descriptor">{project.descriptor}</p>
                <ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                <small>{project.stack.join(" / ")}</small>
                <Link to={`/work/${project.slug}`}>View case study →</Link>
                {project.live ? <a href={project.live.url} target="_blank" rel="noreferrer">{project.live.label} ↗</a> : null}
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader number="05" label="Coaching and leadership" />
          <p className="resume-summary">{teaching.summary}</p>
          <ul className="resume-coaching">
            {teaching.positions.map((position) => (
              <li key={position.academy}><strong>{position.academy}</strong> — {position.role} · {position.location} · {position.dates}</li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeader number="06" label="Education and certifications" />
          <div className="education-grid">
            {education.map((item) => (
              <div key={item.credential}><span>Education</span><h3>{item.credential}</h3><p>{item.institution}, {item.location} · {item.completed}</p></div>
            ))}
            {certifications.map((item) => (
              <div key={item.credential}>
                <span>Certification</span>
                <h3>{item.credential}</h3>
                <p>{item.issuer} · {item.completed}</p>
                {item.verificationUrl ? <a href={item.verificationUrl} target="_blank" rel="noreferrer">Verify certificate ↗</a> : null}
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

import { Link, useParams } from "react-router-dom";
import SEO from "@/components/seo";
import { EvidenceBadge } from "@/components/editorial/EvidenceBadge";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { WithYouSharingPrototype } from "@/components/prototypes/WithYouSharingPrototype";
import { DojoNetProgressPrototype } from "@/components/prototypes/DojoNetProgressPrototype";
import { GundamForgeValidationPrototype } from "@/components/prototypes/GundamForgeValidationPrototype";
import { getInvestigation, investigations } from "@/data/investigations";
import { getCaseStudyView } from "@/lib/caseStudyView";
import NotFound from "@/pages/not-found";

export default function InvestigationPage() {
  const { slug } = useParams();
  const investigation = getInvestigation(slug);
  if (!investigation) return <NotFound />;

  const view = getCaseStudyView(investigation);
  const next = investigations[(investigations.indexOf(investigation) + 1) % investigations.length];
  const Prototype = investigation.slug === "withyou" ? WithYouSharingPrototype : investigation.slug === "dojonet" ? DojoNetProgressPrototype : GundamForgeValidationPrototype;

  return (
    <div className="investigation-page case-study-page" style={{ "--project-accent": investigation.accent, "--project-secondary": investigation.accentSecondary } as React.CSSProperties}>
      <SEO
        title={`${investigation.name} — UX Engineering Case Study`}
        description={investigation.abstract.product}
        path={`/work/${investigation.slug}`}
        image={`/assets/projects/${investigation.slug}/social/og.svg`}
        jsonLd={{ "@context": "https://schema.org", "@type": "CreativeWork", name: investigation.name, description: investigation.abstract.product, url: `https://ehicksonjr.com/work/${investigation.slug}`, author: { "@type": "Person", name: "Earl Hickson Jr.", url: "https://ehicksonjr.com" }, genre: "UX engineering case study", keywords: [investigation.theme, ...investigation.stack], isAccessibleForFree: true }}
      />

      <section className="case-hero" aria-labelledby="case-title">
        <div className="case-hero__copy">
          <Link className="case-back" to="/work">← All work</Link>
          <p className="signal-label"><span /> Case study {investigation.number} / {investigation.theme}</p>
          <h1 id="case-title">{investigation.name}</h1>
          <p className="case-hero__question">{investigation.question}</p>
          <div className="case-hero__tags"><span>{investigation.status}</span>{investigation.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
        </div>
        <figure className={`case-hero__media case-hero__media--${view.heroMedia.presentation}`}>
          <img src={view.heroMedia.src} alt={view.heroMedia.alt} />
          <figcaption>Current implementation / development-stage capture</figcaption>
        </figure>
      </section>

      {investigation.slug === "gundam-forge" && <p className="fan-disclaimer">Independent, unofficial, non-commercial fan project. Not affiliated with or endorsed by Bandai, Sunrise, or the relevant rights holders. Portfolio visuals do not use official franchise artwork.</p>}

      <section className="case-overview" aria-labelledby="case-overview-title">
        <header>
          <p className="signal-label"><span /> Recruiter overview</p>
          <h2 id="case-overview-title">The case in five minutes.</h2>
          <p>{investigation.abstract.product}</p>
        </header>
        <div className="case-overview__grid">
          <article><span>Challenge</span><p>{view.challenge}</p></article>
          <article><span>My contribution</span><p>{view.contribution}</p></article>
          <article><span>Principal decision</span><p>{view.decision}</p></article>
          <article><span>What I built</span><p>{view.implementation}</p></article>
        </div>
        <div className="case-outcome">
          <span>What the work demonstrates</span>
          <blockquote>{investigation.abstract.remember}</blockquote>
          <p><strong>Evidence boundary:</strong> {view.evidenceBoundary}</p>
        </div>
      </section>

      <section className="case-proof" aria-labelledby="case-proof-title">
        <div>
          <p className="signal-label"><span /> Selected evidence</p>
          <h2 id="case-proof-title">A working interface, not only a concept.</h2>
        </div>
        <div className="case-proof__captures">
          {investigation.captures.slice(0, 3).map((capture) => (
            <figure key={capture.src}>
              <img src={capture.src} alt={capture.alt} loading="lazy" width="1280" height="800" />
              <figcaption><EvidenceBadge status={capture.label} /><span>{capture.caption}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <details className="case-deep-dive" id="deep-dive">
        <summary>
          <span><small>Technical deep dive</small><strong>Open the full design and implementation record</strong></span>
          <i aria-hidden="true">+</i>
        </summary>
        <div className="case-deep-dive__content">
          <section className="study-section section-shell"><SectionHeader number="01" label="Human context" title="The system begins with a human tension." /><div className="study-prose">{investigation.humanContext.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<blockquote>{investigation.changedMind}</blockquote></div></section>
          <section className="technology-chamber section-shell"><SectionHeader number="02" label="Design tension" title="What the interface must hold at the same time." light /><div className="tension-grid">{investigation.tension.map((item, index) => <article key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.label}</h3><p>{item.detail}</p></article>)}</div></section>
          <section className="study-section section-shell"><SectionHeader number="03" label="System, responsibilities, and constraints" title="The product argument has technical and practical boundaries." /><div className="investigation-system"><div><span>System / architecture</span><p>{investigation.systemDescription}</p></div><div><span>Responsibilities</span><ul>{investigation.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div><div><span>Constraints</span><ul>{investigation.constraints.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
          <section className="study-section section-shell"><SectionHeader number="04" label="Workflow and design evolution" title="A product argument expressed as behavior." /><div className="decision-grid"><div><span>Core workflow</span><ol>{investigation.coreWorkflow.map((item) => <li key={item}>{item}</li>)}</ol></div><div><span>Design evolution</span><p>{investigation.designEvolution}</p></div><div><span>Interaction decision</span><p>{investigation.interactionDecision}</p></div><div><span>Technical consequence</span><p>{investigation.technicalConsequence}</p></div></div></section>
          <section className="prototype-section section-shell"><SectionHeader number="05" label="Interactive evidence" title="One focused prototype, not an embedded application." light /><Prototype /></section>
          <section className="study-section section-shell"><SectionHeader number="06" label="Implementation and evidence" title="What exists, what is partial, and what remains uncertain." /><div className="evidence-list">{investigation.implementation.map((item) => <div key={item.claim}><EvidenceBadge status={item.status} /><p>{item.claim}</p></div>)}</div><div className="evidence-boundary"><span>Evidence boundary</span>{investigation.evidence.map((item) => <p key={item}>{item}</p>)}</div><div className="testing-evidence"><span>Testing evidence</span><ul>{investigation.testingEvidence.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
          <section className="capture-section section-shell"><SectionHeader number="07" label="Implementation captures" title="Screens from the current development-stage work." light /><div className="capture-grid">{investigation.captures.map((capture) => <figure key={capture.src}><img src={capture.src} alt={capture.alt} loading="lazy" width="1280" height="800" /><figcaption><EvidenceBadge status={capture.label} /><span>{capture.caption}</span></figcaption></figure>)}</div></section>
          <section className="study-section section-shell"><SectionHeader number="08" label="Limitations and open questions" title="Working software is not a validated outcome." /><div className="limitations-grid"><div><span>Known limitations</span><ul>{investigation.limitations.map((item) => <li key={item}>{item}</li>)}</ul></div><div><span>Open research questions</span><ol>{investigation.openQuestions.map((item) => <li key={item}>{item}</li>)}</ol></div></div></section>
          <section className="study-section section-shell investigation-reflection"><SectionHeader number="09" label="Proposed evaluation and reflection" title="The next evidence requires people, methods, and research ethics." /><div className="limitations-grid"><div><span>Proposed methods</span><ul>{investigation.proposedMethods.map((item) => <li key={item}>{item}</li>)}</ul><small>Proposed research—not completed testing.</small></div><div><span>Reflection</span><p>{investigation.reflection}</p><Link className="case-link" to={investigation.relatedFieldNote.path}>Related note: {investigation.relatedFieldNote.title} <span aria-hidden="true">↗</span></Link></div></div></section>
        </div>
      </details>

      <aside className="next-investigation"><span>Next case study / {next.number}</span><h2>{next.name}</h2><p>{next.question}</p><Link className="button button--light" to={`/work/${next.slug}`}>Read {next.name}</Link></aside>
    </div>
  );
}

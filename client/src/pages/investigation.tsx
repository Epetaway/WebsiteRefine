import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import SEO from "@/components/seo";
import { EvidenceBadge } from "@/components/editorial/EvidenceBadge";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { WithYouSharingPrototype } from "@/components/prototypes/WithYouSharingPrototype";
import { DojoNetProgressPrototype } from "@/components/prototypes/DojoNetProgressPrototype";
import { GundamForgeValidationPrototype } from "@/components/prototypes/GundamForgeValidationPrototype";
import { getInvestigation, investigations } from "@/data/investigations";

export default function InvestigationPage() {
  const { slug } = useParams();
  const investigation = getInvestigation(slug);
  const [mode, setMode] = useState<"abstract" | "full">("abstract");
  useEffect(() => { setMode("abstract"); window.scrollTo(0, 0); }, [slug]);
  if (!investigation) return <Navigate to="/work" replace />;
  const next = investigations[(investigations.indexOf(investigation) + 1) % investigations.length];
  const Prototype = investigation.slug === "withyou" ? WithYouSharingPrototype : investigation.slug === "dojonet" ? DojoNetProgressPrototype : GundamForgeValidationPrototype;

  return (
    <div className="investigation-page" style={{ "--project-accent": investigation.accent, "--project-secondary": investigation.accentSecondary } as React.CSSProperties}>
      <SEO title={`${investigation.name} — ${investigation.theme} Investigation`} description={investigation.abstract.product} path={`/work/${investigation.slug}`} image={`/assets/projects/${investigation.slug}/social/og.svg`} />
      <header className="investigation-hero">
        <div className="investigation-hero__meta"><span>{investigation.number}</span><span>{investigation.theme}</span><span>{investigation.status}</span></div>
        <div className="investigation-hero__title"><p className="eyebrow eyebrow--light">Independent product investigation</p><h1>{investigation.name}</h1><blockquote>{investigation.question}</blockquote></div>
        <figure><img src={investigation.previewImage} alt={investigation.previewAlt} /><figcaption>Original project artwork</figcaption></figure>
        <dl className="investigation-hero__facts"><div><dt>Role</dt><dd>{investigation.role}</dd></div><div><dt>Context</dt><dd>{investigation.context}</dd></div><div><dt>Stack</dt><dd>{investigation.stack.join(" · ")}</dd></div></dl>
      </header>

      {investigation.slug === "gundam-forge" && <p className="fan-disclaimer">Independent, unofficial, non-commercial fan project. Not affiliated with or endorsed by Bandai, Sunrise, or the relevant rights holders. Portfolio visuals do not use official franchise artwork.</p>}

      <nav className="reading-mode" aria-label="Investigation reading mode"><span>Choose reading depth</span><div role="group"><button type="button" aria-pressed={mode === "abstract"} onClick={() => setMode("abstract")}><strong>Abstract</strong><small>Approximately 2 min</small></button><button type="button" aria-pressed={mode === "full"} onClick={() => setMode("full")}><strong>Full study</strong><small>Approximately 15 min</small></button></div></nav>

      <div id="investigation-content">
        <section className="investigation-abstract section-shell">
          <SectionHeader number="A" label="Abstract" title={investigation.argument} />
          <div className="abstract-grid">
            {Object.entries(investigation.abstract).map(([key, value]) => <div key={key}><span>{key === "built" ? "What I built" : key === "remember" ? "Remember" : key}</span><p>{value}</p></div>)}
          </div>
          {mode === "abstract" && <button type="button" className="button button--primary" onClick={() => setMode("full")}>Continue to full study</button>}
        </section>

        {mode === "full" && <>
          <section className="study-section section-shell"><SectionHeader number="01" label="Human context" title="The system begins with a human tension." /><div className="study-prose">{investigation.humanContext.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<blockquote>{investigation.changedMind}</blockquote></div></section>
          <section className="technology-chamber section-shell"><SectionHeader number="02" label="Design tension" title="What the interface must hold at the same time." light /><div className="tension-grid">{investigation.tension.map((item, index) => <article key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.label}</h3><p>{item.detail}</p></article>)}</div></section>
          <section className="study-section section-shell"><SectionHeader number="03" label="Interaction decision" title="A product argument expressed as behavior." /><div className="decision-grid"><div><span>Interaction</span><p>{investigation.interactionDecision}</p></div><div><span>Technical consequence</span><p>{investigation.technicalConsequence}</p></div></div></section>
          <section className="prototype-section section-shell"><SectionHeader number="04" label="Interactive evidence" title="One focused prototype, not an embedded application." light /><Prototype /></section>
          <section className="study-section section-shell"><SectionHeader number="05" label="Implementation and evidence" title="What exists, what is partial, and what remains uncertain." /><div className="evidence-list">{investigation.implementation.map((item) => <div key={item.claim}><EvidenceBadge status={item.status} /><p>{item.claim}</p></div>)}</div><div className="evidence-boundary"><span>Evidence boundary</span>{investigation.evidence.map((item) => <p key={item}>{item}</p>)}</div></section>
          <section className="capture-section section-shell"><SectionHeader number="06" label="Implementation captures" title="Screens from the current development-stage work." light /><div className="capture-grid">{investigation.captures.map((capture) => <figure key={capture.src}><img src={capture.src} alt={capture.alt} loading="lazy" /><figcaption><EvidenceBadge status={capture.label} /><span>{capture.caption}</span></figcaption></figure>)}</div></section>
          <section className="study-section section-shell"><SectionHeader number="07" label="Limitations and open questions" title="Working software is not a validated outcome." /><div className="limitations-grid"><div><span>Known limitations</span><ul>{investigation.limitations.map((item) => <li key={item}>{item}</li>)}</ul></div><div><span>Open questions</span><ol>{investigation.openQuestions.map((item) => <li key={item}>{item}</li>)}</ol></div></div></section>
        </>}
      </div>

      <aside className="next-investigation"><span>Next investigation / {next.number}</span><h2>{next.name}</h2><p>{next.question}</p><Link className="button button--light" to={`/work/${next.slug}`}>Read {next.name}</Link></aside>
    </div>
  );
}

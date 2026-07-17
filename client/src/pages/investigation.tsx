import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import SEO from "@/components/seo";
import { EvidenceBadge } from "@/components/editorial/EvidenceBadge";
import { ExpandableImage } from "@/components/editorial/ExpandableImage";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { WithYouSharingPrototype } from "@/components/prototypes/WithYouSharingPrototype";
import { DojoNetProgressPrototype } from "@/components/prototypes/DojoNetProgressPrototype";
import { GundamForgeValidationPrototype } from "@/components/prototypes/GundamForgeValidationPrototype";
import { getInvestigation, investigations, type Investigation } from "@/data/investigations";

type PanelItem = { label: string; detail: string; color?: string; outcome?: boolean };

const evidencePanels: Record<Exclude<Investigation["slug"], "withyou">, { title: string; footer: string; items: PanelItem[] }> = {
  dojonet: {
    title: "Runtime truth",
    footer: "The app as it runs today — dormant code is labeled, not claimed.",
    items: [
      { label: "Local storage — active", detail: "The current demo persists its practitioner-facing state in the browser.", color: "#16B889" },
      { label: "Journal surfaces — implemented", detail: "Training history, qualitative stages, and reflection are represented in the running interface.", color: "#A78BF6" },
      { label: "Production record — not wired", detail: "Browser-local persistence is not presented as a production learning record.", color: "#A78BF6" },
      { label: "Instructor view — known gap", detail: "The complementary coaching workflow is not represented as complete.", color: "#E08A6D" },
    ],
  },
  "gundam-forge": {
    title: "Where the information lives",
    footer: "Having access to information ≠ being able to make sense of it.",
    items: [
      { label: "01 — The rulebook", detail: "Deck legality, restrictions, and timing rules — authoritative, but separate from the build surface." },
      { label: "02 — The card database", detail: "Text, costs, and effects are searchable, but encountered one card at a time." },
      { label: "03 — The player’s head", detail: "Synergies, ratios, and remembered restrictions are assembled while deciding." },
      { label: "→ Forge — the moment of decision", detail: "Constraints and relationships surface when they become relevant — and only then.", outcome: true },
    ],
  },
};

const humanContextChapters: Record<Investigation["slug"], { title: string; paragraphs: string[]; quote?: string; asideLabel: string; asideItems: string[]; note?: string }> = {
  withyou: {
    title: "Relationship apps are an odd design domain, because the thing they’re organized around — a couple — is not a single user.",
    paragraphs: [
      "Almost every consumer product built for couples treats the relationship as the unit of design: one shared calendar, one shared photo stream, one shared feed. That framing is convenient to build, but it is wrong about how relationships actually work. Being in a relationship does not mean giving up individual boundaries.",
      "Software that treats paired as merged removes that option by default, and usually does it silently. WithYou started as a question about whether a relationship app could be genuinely shared while still respecting each person’s boundary.",
    ],
    asideLabel: "Working note",
    asideItems: [],
    note: "Pairing creates connection. It does not automatically create permission.",
  },
  dojonet: {
    title: "The shape of learning doesn’t compress into one number.",
    paragraphs: [
      "Progression in martial arts is not linear, binary, or a checklist. Someone can perform a technique correctly in drilling and still fail to recognize the same opportunity live. Someone can plateau for weeks and then have something click all at once.",
      "A single progress bar or completion percentage misrepresents that — not because the data is wrong, but because the shape of learning does not compress into one number.",
    ],
    quote: "I came to this as both the confused student and the instructor explaining the same idea six different ways.",
    asideLabel: "Why a bar lies",
    asideItems: ["Correct in drilling ≠ recognized live.", "Weeks of plateau, then it clicks all at once.", "Techniques do not finish. ‘Done’ is the wrong claim."],
  },
  "gundam-forge": {
    title: "Information about a trading card game is fragmented by nature.",
    paragraphs: [
      "Card text, cost, effects, restrictions, synergies with other cards, and deck legality are all technically available somewhere — usually spread across a rulebook, a card database, and whatever a player can hold in their head.",
      "Most deck-building tools respond by adding more panels, more stats, and more visible data. Gundam Forge tests a narrower premise instead: more information does not automatically create better decisions.",
    ],
    quote: "The interface should surface relationships and constraints — not make the strategic choice for the player.",
    asideLabel: "The premise, narrowed",
    asideItems: ["Not more panels — fewer, better-placed facts.", "Constraints appear at the moment they are relevant.", "The system never says which card to play."],
  },
};

function InvestigationHeroMap({ investigation }: { investigation: Investigation }) {
  if (investigation.slug === "withyou") {
    return (
      <aside className="investigation-hero__map investigation-hero__map--network" aria-label="Human capability network">
        <header><span>Capability network</span><span>Fig. 01</span></header>
        <div className="hero-capability-network">
          <svg viewBox="0 0 520 600" preserveAspectRatio="none" aria-hidden="true">
            <path d="M165 292 L165 108 L370 108" className="network-line network-line--relationships" />
            <path d="M165 292 L370 292" className="network-line network-line--learning" />
            <path d="M165 292 L98 292 L98 492" className="network-line network-line--decisions" />
          </svg>
          <div className="hero-capability-node hero-capability-node--relationships"><i /><span>Relationships</span></div>
          <div className="hero-capability-node hero-capability-node--center"><i /><span>Human capability</span></div>
          <div className="hero-capability-node hero-capability-node--learning"><i /><span>Learning</span></div>
          <div className="hero-capability-node hero-capability-node--decisions"><i /><span>Decisions</span></div>
        </div>
        <footer>Three investigations orbit one thesis. Orchid marks the active chamber.</footer>
      </aside>
    );
  }

  const panel = evidencePanels[investigation.slug];
  return (
    <aside className="investigation-hero__map" aria-label={`${investigation.name} evidence map`}>
      <header><span>{panel.title}</span><span>Fig. 01</span></header>
      <div>
        {panel.items.map((item) => (
          <section className={item.outcome ? "is-outcome" : undefined} key={item.label}>
            <span style={item.color ? { color: item.color } : undefined}>{item.color && <i className="map-status-dot" style={{ background: item.color }} />}{item.label}</span>
            <p>{item.detail}</p>
          </section>
        ))}
      </div>
      <footer>{panel.footer}</footer>
    </aside>
  );
}

function InvestigationHumanContext({ investigation }: { investigation: Investigation }) {
  const chapter = humanContextChapters[investigation.slug];
  return (
    <section className="investigation-context">
      <header className="investigation-context__heading"><span>Human context</span><i /></header>
      <div className="investigation-context__body">
        <h2>{chapter.title}</h2>
        {chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {chapter.quote && <blockquote>{chapter.quote}</blockquote>}
        <aside className="changed-mind"><span>Changed my mind</span><p>{investigation.changedMind}</p></aside>
      </div>
      <aside className={chapter.note ? "investigation-context__aside investigation-context__aside--note" : "investigation-context__aside"}>
        <span>{chapter.asideLabel}</span>
        {chapter.note ? <blockquote>{chapter.note}</blockquote> : chapter.asideItems.map((item) => <p key={item}>{item}</p>)}
      </aside>
    </section>
  );
}

export default function InvestigationPage() {
  const { slug } = useParams();
  const investigation = getInvestigation(slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  if (!investigation) return <Navigate to="/work" replace />;
  const next = investigations[(investigations.indexOf(investigation) + 1) % investigations.length];
  const Prototype = investigation.slug === "withyou" ? WithYouSharingPrototype : investigation.slug === "dojonet" ? DojoNetProgressPrototype : GundamForgeValidationPrototype;

  return (
    <div className="investigation-page" style={{ "--project-accent": investigation.accent, "--project-secondary": investigation.accentSecondary } as React.CSSProperties}>
      <SEO title={`${investigation.name} — ${investigation.theme} Investigation`} description={investigation.abstract.product} path={`/work/${investigation.slug}`} image={`/assets/projects/${investigation.slug}/social/og.svg`} />
      <header className="investigation-hero">
        <div className="investigation-hero__rail" aria-hidden="true"><span>{investigation.number} / {investigation.theme}</span><i /><b /></div>
        <div className="investigation-hero__copy">
          <Link className="investigation-hero__back" to="/work">← All investigations</Link>
          <p className="investigation-hero__meta"><i /><span>Investigation {investigation.number} — {investigation.name}</span></p>
          <h1>{investigation.question}</h1>
          <p className="investigation-hero__summary">{investigation.abstract.product}</p>
          <dl className="investigation-hero__facts">
            <div><dt>Role</dt><dd>{investigation.role}</dd></div>
            <div><dt>Stack</dt><dd>{investigation.stack.join(" · ")}</dd></div>
            <div><dt>Evidence</dt><dd>{investigation.evidence[0]}</dd></div>
          </dl>
        </div>
        <InvestigationHeroMap investigation={investigation} />
      </header>

      {investigation.slug === "gundam-forge" && <p className="fan-disclaimer">Independent, unofficial, non-commercial fan project. Not affiliated with or endorsed by Bandai, Sunrise, or the relevant rights holders. Portfolio visuals do not use official franchise artwork.</p>}

      <div id="investigation-content">
        <InvestigationHumanContext investigation={investigation} />
          <section className="technology-chamber section-shell"><SectionHeader label="Design tension" title="What the interface must hold at the same time." light /><div className="tension-grid">{investigation.tension.map((item, index) => <article key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.label}</h3><p>{item.detail}</p></article>)}</div></section>
          <section className="study-section section-shell"><SectionHeader label="Interaction decision" title="A product argument expressed as behavior." /><div className="decision-grid"><div><span>Interaction</span><p>{investigation.interactionDecision}</p></div><div><span>Technical consequence</span><p>{investigation.technicalConsequence}</p></div></div></section>
          <section className="prototype-section section-shell"><SectionHeader label="Interactive evidence" title="One focused prototype, not an embedded application." light /><Prototype /></section>
          <section className="study-section section-shell"><SectionHeader label="Implementation and evidence" title="What exists, what is partial, and what remains uncertain." /><div className="evidence-list">{investigation.implementation.map((item) => <div key={item.claim}><EvidenceBadge status={item.status} /><p>{item.claim}</p></div>)}</div><div className="evidence-boundary"><span>Evidence boundary</span>{investigation.evidence.map((item) => <p key={item}>{item}</p>)}</div></section>
          <section className="capture-section section-shell"><header className="capture-section__header"><h2>Field evidence — production screens</h2><span>Fig. E</span></header><div className="capture-grid">{investigation.captures.map((capture) => <figure key={capture.src}><ExpandableImage src={capture.src} alt={capture.alt} caption={`${investigation.name} — ${capture.caption}`} width={investigation.slug === "withyou" ? 390 : 1440} height={investigation.slug === "withyou" ? 844 : 900} /><figcaption><EvidenceBadge status={capture.label} /><span>{capture.caption}</span></figcaption></figure>)}</div></section>
          <section className="study-section section-shell"><SectionHeader label="Limitations and open questions" title="Working software is not a validated outcome." /><div className="limitations-grid"><div><span>Known limitations</span><ul>{investigation.limitations.map((item) => <li key={item}>{item}</li>)}</ul></div><div><span>Open questions</span><ol>{investigation.openQuestions.map((item) => <li key={item}>{item}</li>)}</ol></div><div><span>Proposed evaluation — not yet conducted</span><ul>{investigation.proposedMethods.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
      </div>

      <aside className="next-investigation"><span>Next investigation / {next.number}</span><h2>{next.name}</h2><p>{next.question}</p><Link className="button button--light" to={`/work/${next.slug}`}>Read {next.name}</Link></aside>
    </div>
  );
}

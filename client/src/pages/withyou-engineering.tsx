import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { EvidenceBadge } from "@/components/editorial/EvidenceBadge";
import { noteBrand, noteBrandStyle } from "@/data/noteBrands";
import { withYouEngineeringMeta } from "@/data/routeMeta/withyou";
import { architectureLayers, withYouEngineering as page } from "@/data/withyouEngineering";
import { AccessGate } from "@/components/access/AccessGate";
import type { LockedEngineeringNotes } from "@shared/engineeringNotes";
import "@/styles/field-notes.css";
import "@/styles/withyou-engineering.css";
import "@/styles/access-gate.css";

const contents = [
  ["architecture", "Architecture"],
  ["full-notes", "Full notes (on request)"],
] as const;

const lockedPreview = [
  "How data is kept or removed when a relationship ends",
  "The six-step AI safety pipeline",
  "Six architecture decisions and their trade-offs",
  "Quality evidence: verified, partial and not yet done",
  "Four real bugs and what each one taught me",
  "How I work with AI coding agents",
];

// The technical companion to /work/withyou. It reuses the Field Note frame (hero, sidebar,
// reading column) coloured by the WithYou brand, so it reads as part of the portfolio rather
// than a second case study. The overview is public; everything after it is behind AccessGate
// and comes from the access API, never from this bundle.
export default function WithYouEngineeringPage() {
  const brand = noteBrand("withyou");
  return (
    <article className={`field-note-page nb nb--${brand.key} wye-page`} style={noteBrandStyle(brand) as React.CSSProperties}>
      <SEO {...withYouEngineeringMeta} />
      <section className="field-note-hero">
        <div className="field-note-hero__rail">
          <Link to="/work/withyou" className="case-link case-link--light">← WithYou case study</Link>
          <span>Engineering notes</span>
        </div>
        <div className="field-note-hero__title">
          <p className="signal-label"><span /> Engineering notes / WithYou</p>
          <h1>{page.title}</h1>
        </div>
        <aside className="field-note-hero__context">
          <blockquote>{page.claim}</blockquote>
          <div><span>{page.date}</span><span>{page.readingTime} read</span><span>{page.repository}</span></div>
        </aside>
      </section>

      <div className="field-note-layout">
        <aside>
          <span>Evidence note</span>
          <p>Every claim here was checked against the code and the project's decision records. Known gaps are labeled as gaps. The overview is public; the full notes are shared on request.</p>
          <nav className="wye-toc" aria-label="On this page">
            <ol>{contents.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
          </nav>
        </aside>

        <div className="field-note-body">
          <section aria-label="Project at a glance">
            <dl className="wye-facts">
              {page.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
            </dl>
            <ul className="wye-chips" aria-label="Stack">{page.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section id="architecture" aria-labelledby="architecture-title">
            <h2 id="architecture-title">Architecture</h2>
            <p>One developer, a beta of about 100 couples, and free or hobby hosting tiers. The architecture had to stay small enough for one person to run and strict enough to protect two people's private data.</p>
            <ol className="wye-layers">
              {architectureLayers.map((layer) => <li key={layer.layer}><h3>{layer.layer}</h3><p>{layer.owns}</p></li>)}
            </ol>
          </section>

          <div id="full-notes">
            <AccessGate<LockedEngineeringNotes> document="withyou-engineering" preview={lockedPreview}>
              {(notes) => <LockedNotes notes={notes} />}
            </AccessGate>
          </div>
        </div>
      </div>

      <section className="field-note-footer">
        <span>Back to the product</span>
        <h2>See the brand, the design system and the privacy model this engineering supports.</h2>
        <Link className="button nb-button" to="/work/withyou">View the WithYou case study</Link>
      </section>
    </article>
  );
}

function LockedNotes({ notes }: { notes: LockedEngineeringNotes }) {
  return (
    <>
      <section id="data-lifecycle" aria-labelledby="data-lifecycle-title">
        <h2 id="data-lifecycle-title">What happens to data when a relationship ends?</h2>
        <p>That's the hardest data question in a two-person app. I defined four lifecycle patterns and tagged all 131 models with one of them.</p>
        <dl className="wye-patterns">
          {notes.lifecyclePatterns.map((pattern) => <div key={pattern.id}><dt>Pattern {pattern.id}</dt><dd>{pattern.rule}</dd></div>)}
        </dl>
      </section>

      <section id="ai-pipeline" aria-labelledby="ai-pipeline-title">
        <h2 id="ai-pipeline-title">AI safety pipeline</h2>
        <p>The AI helps with things like rewriting a tense message into gentler versions. People type sensitive things into it, so every request passes through deterministic checks before a model is considered.</p>
        <ol className="wye-pipeline">
          {notes.safetyPipeline.map((stage, index) => (
            <li key={stage.step}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{stage.step}</h3><p>{stage.does}</p></div>
            </li>
          ))}
        </ol>
        <ul>{notes.pipelineRules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
      </section>

      <section id="decisions" aria-labelledby="decisions-title">
        <h2 id="decisions-title">Key decisions</h2>
        <p>Six of the project's architecture decision records, in plain language. Each one shows what I chose, what I gave up, and when I'd change my mind.</p>
        <div className="wye-decisions">
          {notes.decisions.map((item) => (
            <article key={item.id} className="wye-card" aria-labelledby={`decision-${item.id}`}>
              <small>{item.source}</small>
              <h3 id={`decision-${item.id}`}>{item.title}</h3>
              <dl>
                <div><dt>Context</dt><dd>{item.context}</dd></div>
                <div><dt>Decision</dt><dd>{item.decision}</dd></div>
                <div><dt>What I gave up</dt><dd>{item.gaveUp}</dd></div>
                {item.revisit && <div><dt>I'd revisit when</dt><dd>{item.revisit}</dd></div>}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section id="quality" aria-labelledby="quality-title">
        <h2 id="quality-title">Quality and evidence</h2>
        <p>Passing automated checks is evidence, not proof. These are the checks that exist, the ones that are partial, and the ones not done yet.</p>
        <div className="wye-quality">
          {notes.quality.map((group) => (
            <div key={group.status}>
              <EvidenceBadge status={group.status} />
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section id="lessons" aria-labelledby="lessons-title">
        <h2 id="lessons-title">Challenges and lessons</h2>
        <div className="wye-decisions">
          {notes.lessons.map((item) => (
            <article key={item.id} className="wye-card" aria-labelledby={`lesson-${item.id}`}>
              <h3 id={`lesson-${item.id}`}>{item.title}</h3>
              <dl>
                <div><dt>What happened</dt><dd>{item.happened}</dd></div>
                <div><dt>How it was found</dt><dd>{item.found}</dd></div>
                <div><dt>What I did</dt><dd>{item.fix}</dd></div>
                <div><dt>Lesson</dt><dd>{item.lesson}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section id="ai-workflow" aria-labelledby="ai-workflow-title">
        <h2 id="ai-workflow-title">How I work with AI agents</h2>
        <ul>{notes.aiWorkflow.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section id="next" aria-labelledby="next-title">
        <h2 id="next-title">What I'd do next</h2>
        <ol className="wye-next">{notes.nextSteps.map((item) => <li key={item}>{item}</li>)}</ol>
      </section>
    </>
  );
}

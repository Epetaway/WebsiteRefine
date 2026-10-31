import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { dojonetMeta } from "@/data/routeMeta/dojonet";
import { Reveal } from "@/components/motion/Reveal";
import { DojoNetProgressPrototype } from "@/components/prototypes/DojoNetProgressPrototype";
import { KitCodeCard, KitEyebrow, KitStatusTag } from "@/components/case-study-kit/kit";
import { DnFigureView, DnPicture, DnWordmark } from "@/components/dojonet/parts";
import {
  architecture,
  auditFindings,
  buildFigures,
  chapters,
  codeHighlights,
  composerFigure,
  dojonet,
  dojonetRecord,
  fixFigures,
  ia,
  mobileFigures,
  modelPoints,
  overview,
  palette,
  parityFigures,
  privacyFinding,
  productIdea,
  productProblem,
  profileThemes,
  qaFigures,
  qaHistory,
  redsFinding,
  reflections,
  repository,
  roadmap,
  specPrinciples,
  stageFinding,
  stageNote,
  stages,
  statusLedger,
  systemDescription,
  systemSpecs,
  testRun,
  tokenAudit,
  typefaces,
} from "@/data/dojonet";
import { getNextWorkEntry } from "@/data/work";
import "@/styles/dojonet.css";

const sections = [
  ["overview", "Overview"],
  ["system", "01 System"],
  ["learning", "02 Learning"],
  ["engineering", "03 Engineering"],
  ["evidence", "Evidence"],
  ["reflection", "What's next"],
] as const;

function ChapterOpener({ index }: { index: number }) {
  const chapter = chapters[index];
  return (
    <section className="dn-chapter" id={chapter.id} aria-labelledby={`${chapter.id}-title`}>
      <span className="dn-chapter__number" aria-hidden="true">{chapter.number}</span>
      <div className="dn-chapter__copy">
        <KitEyebrow ns="dn" number="Chapter">{chapter.number} of 03</KitEyebrow>
        <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        <p>{chapter.line}</p>
        <KitStatusTag ns="dn" status={chapter.status} />
      </div>
    </section>
  );
}

/**
 * The stage control twice: as built (selected = the stage's colour on a 10% tint) and as I'd
 * build it now (selected = Matte Black on a stronger tint, a check mark, aria-pressed). The
 * proposal is interactive so the difference can be felt, not just read.
 */
function StageComparison() {
  const [selected, setSelected] = useState("practicing");
  return (
    <div className="dn-stagecompare">
      <figure className="dn-stagecard" aria-labelledby="dn-stage-asbuilt">
        <div className="dn-stagecard__head">
          <strong>Hip Escape</strong>
          <small>Use more hip drive.</small>
        </div>
        <div className="dn-stagecard__row" aria-hidden="true">
          {stages.map((stage) => (
            <span key={stage.id} className={`dn-chip dn-chip--asbuilt${stage.id === "practicing" ? " is-selected" : ""}`} style={{ "--stage": stage.hex } as React.CSSProperties}>
              {stage.label}
            </span>
          ))}
        </div>
        <figcaption id="dn-stage-asbuilt"><KitStatusTag ns="dn" status="RETROSPECTIVE ILLUSTRATION" /> As built: Practicing selected, amber on an amber tint — 2.0:1.</figcaption>
      </figure>
      <figure className="dn-stagecard dn-stagecard--proposed" aria-labelledby="dn-stage-proposed">
        <div className="dn-stagecard__head">
          <strong>Hip Escape</strong>
          <small>Use more hip drive.</small>
        </div>
        <div className="dn-stagecard__row" role="group" aria-label="Stage for Hip Escape">
          {stages.map((stage) => (
            <button
              key={stage.id}
              type="button"
              className={`dn-chip dn-chip--proposed${selected === stage.id ? " is-selected" : ""}`}
              style={{ "--stage": stage.hex } as React.CSSProperties}
              aria-pressed={selected === stage.id}
              onClick={() => setSelected(stage.id)}
            >
              <span aria-hidden="true">{selected === stage.id ? "✓" : ""}</span>
              {stage.label}
            </button>
          ))}
        </div>
        <p className="dn-stagecard__meaning" aria-live="polite">{stages.find((stage) => stage.id === selected)?.meaning}</p>
        <figcaption id="dn-stage-proposed"><KitStatusTag ns="dn" status="RETROSPECTIVE ILLUSTRATION" /> Proposed: Matte Black on a 22% tint (at least 13:1), a check mark, aria-pressed, and the stage's meaning under it. Try it.</figcaption>
      </figure>
    </div>
  );
}

export default function DojoNetCaseStudy() {
  const next = getNextWorkEntry(dojonet.slug);
  const record = dojonetRecord;

  return (
    <div className="dn-case case-study-page" style={{ "--project-accent": "#B71C1C" } as React.CSSProperties}>
      <SEO {...dojonetMeta} />

      {/* ------------------------------------------------------------ Hero */}
      <section className="dn-hero" aria-labelledby="dn-title">
        <div className="dn-hero__copy">
          <Link className="case-back" to="/work">← All work</Link>
          <p className="dn-kicker">Case study {dojonet.number} / {record.theme} · Product design · Web app</p>
          <DnWordmark decorative className="dn-hero__wordmark" />
          <h1 id="dn-title">
            <span className="sr-only">DojoNet — </span>
            {dojonet.heroLine}
          </h1>
          <p className="dn-hero__lead">{dojonet.heroLead}</p>
          <dl className="dn-hero__meta">
            <div><dt>My role</dt><dd>{dojonet.role}</dd></div>
            <div><dt>Disciplines</dt><dd>{dojonet.disciplines}</dd></div>
            <div><dt>When</dt><dd>{dojonet.when}</dd></div>
          </dl>
          <div className="dn-hero__actions">
            <a className="button dn-button" href="#overview">Read the case study <span aria-hidden="true">↓</span></a>
            <a className="button button--ghost" href="#prototype">Try the progression prototype <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="dn-hero__stage">
          <div className="dn-hero__screen">
            <i className="dn-browser-bar" aria-hidden="true"><b /><b /><b /></i>
            <DnPicture id="journal" alt="DojoNet's My Journal page: entries filed into White Belt Journey and Blue Belt chapters, with filters and stats" sizes="(max-width: 1050px) 90vw, 44vw" eager />
          </div>
          <div className="dn-hero__phone">
            <DnPicture id="m-dashboard" alt="The DojoNet dashboard on a phone with the composer and a feed post" sizes="(max-width: 1050px) 30vw, 13vw" eager />
          </div>
          <div className="dn-hero__chips" aria-hidden="true">
            {stages.map((stage, index) => <span key={stage.id} className={index === 1 ? "is-on" : undefined}>{stage.label}</span>)}
          </div>
        </div>
        <ul className="dn-ledger" aria-label="Current status">
          {statusLedger.map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <KitStatusTag ns="dn" status={item.status} />
            </li>
          ))}
        </ul>
      </section>

      <nav className="dn-subnav" aria-label="Case study sections">
        <ol>
          {sections.map(([id, label]) => (
            <li key={id}><a href={`#${id}`}>{label}</a></li>
          ))}
        </ol>
      </nav>

      {/* ------------------------------------------------------------ Overview */}
      <section className="dn-overview" id="overview" aria-labelledby="dn-overview-title">
        <header className="dn-section-head">
          <KitEyebrow ns="dn" number="00">Recruiter overview</KitEyebrow>
          <h2 id="dn-overview-title">The case in five minutes.</h2>
          <p>{record.abstract.product}</p>
        </header>
        <div className="dn-overview__grid">
          <article><h3>The problem</h3><p>{overview.problem}</p></article>
          <article><h3>What I did, and how</h3><p>{overview.role}</p></article>
          <article><h3>What exists</h3><p>{overview.exists}</p></article>
          <article><h3>Evidence boundary</h3><p>{overview.boundary}</p></article>
        </div>
        <ol className="dn-chapter-strip" aria-label="Three chapters">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a href={`#${chapter.id}`}>
                <span>{chapter.number}</span>
                <strong>{chapter.title}</strong>
                <small>{chapter.line}</small>
              </a>
              <KitStatusTag ns="dn" status={chapter.status} />
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------------------ Why */}
      <section className="dn-why" id="why" aria-labelledby="dn-why-title">
        <div className="dn-why__rail">
          <KitEyebrow ns="dn">The human tension</KitEyebrow>
          <p className="dn-why__belt" aria-hidden="true"><i /><i /><i /><i /><i /></p>
        </div>
        <div className="dn-why__body">
          <h2 id="dn-why-title">Repetition isn't <em>understanding.</em></h2>
          {record.humanContext.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <blockquote>{record.changedMind}</blockquote>
          <ul className="dn-tension" aria-label="What the interface has to hold at once">
            {record.tension.map((item, index) => (
              <li key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><p>{item.detail}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================ Chapter 01 */}
      <ChapterOpener index={0} />

      <section className="dn-idea" aria-labelledby="dn-idea-title">
        <header className="dn-section-head dn-section-head--dark">
          <KitEyebrow ns="dn" number="01.1">The idea</KitEyebrow>
          <h2 id="dn-idea-title">{productIdea.statement}</h2>
          <p>{productIdea.detail}</p>
        </header>
        <ol className="dn-principles">
          {specPrinciples.map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
          ))}
        </ol>
        <p className="dn-small dn-note dn-note--dark"><KitStatusTag ns="dn" status="DOCUMENTED DECISION" /> <span>{productIdea.source}</span></p>
      </section>

      <section className="dn-color" id="color" aria-labelledby="dn-color-title">
        <header className="dn-section-head">
          <KitEyebrow ns="dn" number="01.2">Colour</KitEyebrow>
          <h2 id="dn-color-title">Warm white, Matte Black, one Dojo Red.</h2>
          <p>“Spec v3” tokens from <code>src/index.css</code>, light and dark. Ratios are computed with the WCAG 2.x formula: text tokens against their surface, accents as text on white.</p>
        </header>
        <ul className="dn-palette" aria-label="Colour tokens">
          {palette.map((swatch) => (
            <li key={swatch.name}>
              <span className={`dn-swatch dn-swatch--${swatch.ink}`} style={{ "--swatch": swatch.hex, "--swatch-dark": swatch.dark ?? swatch.hex } as React.CSSProperties} aria-hidden="true">
                Aa{swatch.dark && <i />}
              </span>
              <strong>{swatch.name}</strong>
              <code>{swatch.hex}{swatch.dark ? ` · dark ${swatch.dark}` : ""}</code>
              <small>{swatch.token}</small>
              <span>{swatch.role}</span>
              <em>{swatch.contrast}</em>
            </li>
          ))}
        </ul>
        <div className="dn-callout">
          <div>
            <KitStatusTag ns="dn" status={redsFinding.status} />
            <h3>{redsFinding.title}</h3>
            <p>{redsFinding.detail}</p>
          </div>
          <ul className="dn-reds" aria-label="The three reds in the code">
            <li style={{ background: "#B71C1C" }}><code>#B71C1C</code><small>--accent-primary · 105 uses</small></li>
            <li style={{ background: "#E11D48" }}><code>#E11D48</code><small>Tailwind “brand” · 51 classes</small></li>
            <li style={{ background: "#EF4444" }}><code>#EF4444</code><small>red-500 · 57 classes</small></li>
          </ul>
        </div>
      </section>

      <section className="dn-type" aria-labelledby="dn-type-title">
        <header className="dn-section-head">
          <KitEyebrow ns="dn" number="01.3">Type</KitEyebrow>
          <h2 id="dn-type-title">A gym-wall display face, and Inter for everything else.</h2>
        </header>
        <div className="dn-faces">
          {typefaces.map((face) => (
            <article key={face.family} className={`dn-face dn-face--${face.className}`}>
              <p className="dn-face__sample">{face.sample}</p>
              <h3>{face.family}</h3>
              <p>{face.role}</p>
              <small>{face.spec}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="dn-components" aria-labelledby="dn-components-title">
        <header className="dn-section-head">
          <KitEyebrow ns="dn" number="01.4">Surfaces and components</KitEyebrow>
          <h2 id="dn-components-title">No borders. Shadow does the separating.</h2>
          <p>The spec's one strong opinion: <code>--color-border</code> is transparent, so every card floats on a single elevation token. The rest is a short component kit and four profile themes.</p>
        </header>
        <div className="dn-kit">
          <dl className="dn-specs">
            {systemSpecs.map((item) => (
              <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
            ))}
          </dl>
          <div className="dn-sheet" aria-labelledby="dn-sheet-caption">
            <div className="dn-sheet__card">
              <p className="dn-sheet__label">Button atom</p>
              <div className="dn-sheet__row" aria-hidden="true">
                <span className="dn-demo-btn dn-demo-btn--primary">Publish</span>
                <span className="dn-demo-btn dn-demo-btn--outline">Save Draft</span>
                <span className="dn-demo-btn dn-demo-btn--accent">Follow</span>
              </div>
              <p className="dn-sheet__label">Pill, badges and tags</p>
              <div className="dn-sheet__row" aria-hidden="true">
                <span className="dn-demo-pill">Blue Belt</span>
                <span className="dn-demo-badge dn-demo-badge--verified">Verified DojoNet Academy</span>
                <span className="dn-demo-badge">Pending</span>
                <span className="dn-demo-tag is-on">For You</span>
                <span className="dn-demo-tag">My Gym</span>
              </div>
              <p className="dn-sheet__label">Avatars · 24 · 32 · 48 · 64</p>
              <div className="dn-sheet__row dn-sheet__row--avatars" aria-hidden="true">
                {[24, 32, 48, 64].map((size) => <span key={size} className="dn-demo-avatar" style={{ width: size, height: size }} />)}
              </div>
            </div>
            <ul className="dn-themes" aria-label="Profile themes">
              {profileThemes.map((theme) => (
                <li key={theme.name} style={{ "--t1": theme.primary, "--t2": theme.secondary } as React.CSSProperties}>
                  <span aria-hidden="true" />
                  <strong>{theme.name}</strong>
                  <code>{theme.primary} · {theme.secondary}</code>
                </li>
              ))}
            </ul>
            <p id="dn-sheet-caption" className="dn-small dn-note"><KitStatusTag ns="dn" status="RETROSPECTIVE ILLUSTRATION" /> Drawn on this page from <code>index.css</code>, <code>Button.jsx</code> and the four presets in <code>ProfileHero.tsx</code>.</p>
          </div>
        </div>
      </section>

      <section className="dn-audit-section" aria-labelledby="dn-audit-title">
        <header className="dn-section-head dn-section-head--dark">
          <KitEyebrow ns="dn" number="01.5">The token audit</KitEyebrow>
          <h2 id="dn-audit-title">{tokenAudit.title}.</h2>
          <p>{tokenAudit.detail}</p>
        </header>
        <ul className="dn-counts" aria-label="Token counts at be2db53">
          <li><strong>{tokenAudit.defined}</strong><span>custom properties defined</span></li>
          <li><strong>{tokenAudit.undefinedNames.length}</strong><span>referenced, never defined</span></li>
          <li><strong>{tokenAudit.colorPrimaryUses}</strong><span>uses of --color-primary in {tokenAudit.colorPrimaryFiles} files</span></li>
          <li><strong>{tokenAudit.accentPrimaryUses}</strong><span>uses of the real one, --accent-primary</span></li>
        </ul>
        <ul className="dn-undefined" aria-label="Undefined custom properties">
          {tokenAudit.undefinedNames.map((name) => <li key={name}><code>{name}</code></li>)}
        </ul>
        {fixFigures.map((pair, index) => (
          <div key={pair.before.media} className={`dn-pair${index === 1 ? " dn-pair--phone" : ""}`}>
            <Reveal><DnFigureView figure={pair.before} frame={index === 1 ? "phone" : "browser"} zoom={index === 0} sizes={index === 1 ? "(max-width: 600px) 44vw, 260px" : "(max-width: 1050px) 100vw, 46vw"} /></Reveal>
            <span className="dn-pair__arrow" aria-hidden="true">→</span>
            <Reveal><DnFigureView figure={pair.after} frame={index === 1 ? "phone" : "browser"} zoom={index === 0} sizes={index === 1 ? "(max-width: 600px) 44vw, 260px" : "(max-width: 1050px) 100vw, 46vw"} /></Reveal>
          </div>
        ))}
      </section>

      {/* ============================================================ Chapter 02 */}
      <ChapterOpener index={1} />

      <section className="dn-model" aria-labelledby="dn-model-title">
        <header className="dn-section-head">
          <KitEyebrow ns="dn" number="02.1">The progression model</KitEyebrow>
          <h2 id="dn-model-title">Four stages. No percentage.</h2>
          <p>{record.interactionDecision}</p>
        </header>
        <blockquote className="dn-problem"><p>{productProblem}</p></blockquote>
        <ol className="dn-stages">
          {stages.map((stage, index) => (
            <li key={stage.id} style={{ "--stage": stage.hex } as React.CSSProperties}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{stage.label}</h3>
              <p>{stage.meaning}</p>
            </li>
          ))}
        </ol>
        <p className="dn-small dn-note">{stageNote}</p>
        <StageComparison />
        <div className="dn-callout dn-callout--light">
          <KitStatusTag ns="dn" status={stageFinding.status} />
          <h3>{stageFinding.title}</h3>
          <p>{stageFinding.detail}</p>
        </div>
        <ul className="dn-points">
          {modelPoints.map((point) => (
            <li key={point.title} className={point.status === "KNOWN GAP" ? "is-gap" : undefined}>
              <KitStatusTag ns="dn" status={point.status} />
              <h3>{point.title}</h3>
              <p>{point.body}</p>
              <code>{point.source}</code>
            </li>
          ))}
        </ul>
      </section>

      <section className="dn-ia" aria-labelledby="dn-ia-title">
        <header className="dn-section-head dn-section-head--dark">
          <KitEyebrow ns="dn" number="02.2">Information architecture</KitEyebrow>
          <h2 id="dn-ia-title">Journal first. Everything else around it.</h2>
          <p>The prototype grew a social network around the journal. This case study is about the journal; the rest is mapped so it's clear what's being left out.</p>
        </header>
        <ol className="dn-map">
          {ia.map((area) => (
            <li key={area.area} className={area.inScope ? "is-in" : undefined}>
              <h3>{area.area}</h3>
              <ul>{area.screens.map((screen) => <li key={screen}>{screen}</li>)}</ul>
              <small>{area.note}</small>
            </li>
          ))}
        </ol>
        <p className="dn-small dn-note dn-note--dark"><KitStatusTag ns="dn" status="RETROSPECTIVE ILLUSTRATION" /> Drawn for this page from the routes in <code>App.jsx</code> and the Training Journal's tabs. Highlighted areas are in scope.</p>
      </section>

      <section className="dn-composer" aria-labelledby="dn-composer-title">
        <header className="dn-section-head">
          <KitEyebrow ns="dn" number="02.3">Journal-first</KitEyebrow>
          <h2 id="dn-composer-title">Log the session, not just the post.</h2>
        </header>
        <div className="dn-composer__grid">
          <Reveal><DnFigureView figure={composerFigure} frame="browser" zoom sizes="(max-width: 1050px) 100vw, 60vw" /></Reveal>
          <div className="dn-callout dn-callout--light">
            <KitStatusTag ns="dn" status={privacyFinding.status} />
            <h3>{privacyFinding.title}</h3>
            <p>{privacyFinding.detail}</p>
          </div>
        </div>
      </section>

      <section className="dn-build" aria-labelledby="dn-build-title">
        <header className="dn-section-head">
          <KitEyebrow ns="dn" number="02.4">The build</KitEyebrow>
          <h2 id="dn-build-title">Dashboard, journal, technique, progress.</h2>
          <p>The two lower captures carry the one-line token fix from 01.5, so their controls are visible; nothing else is changed.</p>
        </header>
        <div className="dn-build__grid">
          {buildFigures.map((figure, index) => (
            <Reveal key={figure.media} className={index < 2 ? "dn-build__wide" : undefined}>
              <DnFigureView figure={figure} frame="browser" zoom sizes="(max-width: 1050px) 100vw, 46vw" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="dn-prototype-section" id="prototype" aria-labelledby="dn-prototype-title">
        <header className="dn-section-head dn-section-head--dark">
          <KitEyebrow ns="dn" number="02.5">Try it</KitEyebrow>
          <h2 id="dn-prototype-title">Record a session. Watch the history, not a bar.</h2>
          <p>A focused, deterministic version of the model, built for this portfolio with fictional data — not the app. It keeps everything in this tab and resets cleanly.</p>
        </header>
        <div className="dn-prototype">
          <DojoNetProgressPrototype />
        </div>
      </section>

      <section className="dn-parity" aria-labelledby="dn-parity-title">
        <header className="dn-section-head">
          <KitEyebrow ns="dn" number="02.6">Dark mode and small screens</KitEyebrow>
          <h2 id="dn-parity-title">Same names, different values.</h2>
        </header>
        <div className="dn-parity__grid">
          {parityFigures.map((figure) => (
            <Reveal key={figure.media}><DnFigureView figure={figure} frame="browser" zoom sizes="(max-width: 1050px) 100vw, 46vw" /></Reveal>
          ))}
        </div>
        <div className="dn-phones">
          {mobileFigures.map((figure) => (
            <DnFigureView key={figure.media} figure={figure} frame="phone" sizes="(max-width: 600px) 70vw, (max-width: 1050px) 30vw, 20vw" />
          ))}
        </div>
      </section>

      {/* ============================================================ Chapter 03 */}
      <ChapterOpener index={2} />

      <section className="dn-engineering" id="engineering-system" aria-labelledby="dn-eng-title">
        <header className="dn-section-head">
          <KitEyebrow ns="dn" number="03.1">System</KitEyebrow>
          <h2 id="dn-eng-title">A static demo with a backend sketched behind it.</h2>
          <p>{systemDescription}</p>
        </header>
        <figure className="dn-layers" aria-labelledby="dn-layers-caption">
          <ol>
            {architecture.map((layer, index) => (
              <li key={layer.layer} className={layer.status === "KNOWN GAP" ? "is-gap" : undefined}>
                <span className="dn-layers__step">{String(index + 1).padStart(2, "0")}</span>
                <h3>{layer.layer}</h3>
                <p>{layer.detail}</p>
                <code>{layer.source}</code>
                <KitStatusTag ns="dn" status={layer.status} />
              </li>
            ))}
          </ol>
          <figcaption id="dn-layers-caption"><KitStatusTag ns="dn" status="RETROSPECTIVE ILLUSTRATION" /> Drawn for this page from the repository at {repository.commit}.</figcaption>
        </figure>
        <div className="dn-stack">
          <div>
            <h3>Responsibilities</h3>
            <ul className="dn-rule-list">{record.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Constraints</h3>
            <ul className="dn-rule-list">{record.constraints.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Stack</h3>
            <ul className="dn-stack__chips">{dojonet.stack.map((item) => <li key={item}>{item}</li>)}</ul>
            <a className="dn-repo-link" href={repository.url} target="_blank" rel="noreferrer">{repository.name} on GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="dn-code-section" aria-labelledby="dn-code-title">
        <header className="dn-section-head dn-section-head--dark">
          <KitEyebrow ns="dn" number="03.2">The model in code</KitEyebrow>
          <h2 id="dn-code-title">Where it holds, and where it doesn't.</h2>
          <p>The repository is public, so every excerpt links to its exact lines at {repository.commit}.</p>
        </header>
        <div className="dn-code-list">
          {codeHighlights.map((item, index) => <KitCodeCard key={item.id} ns="dn" item={item} index={index} repo={repository} />)}
        </div>
      </section>

      <section className="dn-qa" aria-labelledby="dn-qa-title">
        <header className="dn-section-head">
          <KitEyebrow ns="dn" number="03.3">Testing and QA</KitEyebrow>
          <h2 id="dn-qa-title">What a fresh browser finds.</h2>
          <p>I rebuilt {repository.commit} on Oct 25, 2026, ran its tests, and walked it in a clean browser profile. Most of what follows I'd have caught with one more test or one more look.</p>
        </header>
        <ul className="dn-testrun" aria-label="Test run">
          {testRun.map((item) => (
            <li key={item.label}><span>{item.label}</span><strong>{item.value}</strong><KitStatusTag ns="dn" status={item.status} /></li>
          ))}
        </ul>
        <div className="dn-qa__figures">
          {qaFigures.map((figure) => (
            <Reveal key={figure.media}><DnFigureView figure={figure} frame="browser" zoom sizes="(max-width: 1050px) 100vw, 46vw" /></Reveal>
          ))}
        </div>
        <div className="dn-qa__grid">
          <div>
            <h3>Fixed while shipping the static demo</h3>
            <ol className="dn-qa__list">
              {qaHistory.map((item) => (
                <li key={item.source}><time>{item.date}, 2025</time><p>{item.finding}</p><small>{item.source}</small></li>
              ))}
            </ol>
          </div>
          <div>
            <h3>Found while preparing this page</h3>
            <ul className="dn-audit">
              {auditFindings.map((item) => (
                <li key={item.finding}><p>{item.finding}</p><small>{item.measure}</small><KitStatusTag ns="dn" status={item.status} /></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ Evidence */}
      <section className="dn-evidence" id="evidence" aria-labelledby="dn-evidence-title">
        <header className="dn-section-head">
          <KitEyebrow ns="dn" number="04">Results, evidence and limitations</KitEyebrow>
          <h2 id="dn-evidence-title">What exists — and what doesn't yet.</h2>
          <p>{record.evidence[record.evidence.length - 1]}</p>
        </header>
        <ul className="dn-ledger-list">
          {record.implementation.map((item) => (
            <li key={item.claim}><KitStatusTag ns="dn" status={item.status} /><p>{item.claim}</p></li>
          ))}
        </ul>
        <div className="dn-evidence__grid">
          <div>
            <h3>Testing evidence</h3>
            <ul className="dn-check-list">{record.testingEvidence.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Known limitations</h3>
            <ul className="dn-gap-list">{record.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Open research questions</h3>
            <ol className="dn-question-list">{record.openQuestions.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </div>
      </section>

      {/* ============================================================ Reflection */}
      <section className="dn-reflection" id="reflection" aria-labelledby="dn-reflection-title">
        <header className="dn-section-head dn-section-head--dark">
          <KitEyebrow ns="dn" number="05">Reflection and what's next</KitEyebrow>
          <h2 id="dn-reflection-title">What my earliest product taught the later ones.</h2>
        </header>
        <ol className="dn-reflections">
          {reflections.map((item, index) => (
            <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></li>
          ))}
        </ol>
        <div className="dn-roadmap">
          {roadmap.map((track) => (
            <div key={track.track}>
              <h3>{track.track}</h3>
              <ol>{track.items.map((item) => <li key={item}>{item}</li>)}</ol>
              {track.track === "Research" && <small>Proposed research — not completed testing.</small>}
            </div>
          ))}
        </div>
        <Link className="case-link case-link--light dn-related" to={record.relatedFieldNote.path}>
          Related note: {record.relatedFieldNote.title} <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className="dn-close" aria-label="Closing">
        <DnWordmark />
        <p className="dn-close__line">Progress isn't the same as <em>completion.</em></p>
        <a className="button dn-button" href="#prototype">Try the progression prototype <span aria-hidden="true">↑</span></a>
      </section>

      <aside className="next-investigation">
        <span>Next case study / {next.number}</span>
        <h2>{next.name}</h2>
        <p>{next.question}</p>
        <Link className="button button--light" to={next.path}>Read {next.name}</Link>
      </aside>
    </div>
  );
}

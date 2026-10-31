import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { gundamForgeMeta } from "@/data/routeMeta/gundamForge";
import { Reveal } from "@/components/motion/Reveal";
import { GundamForgeValidationPrototype } from "@/components/prototypes/GundamForgeValidationPrototype";
import { KitCodeCard, KitEyebrow, KitStatusTag } from "@/components/case-study-kit/kit";
import { GfCardFace, GfFigureView, GfLockup, GfPicture, type GfCardSpec } from "@/components/gundam-forge/parts";
import {
  architecture,
  auditFindings,
  buttonFinding,
  builderChanges,
  capDecision,
  cardColors,
  chapters,
  codeHighlights,
  decisionSequence,
  emptyStateFigure,
  gundamForge,
  gundamForgeRecord,
  identityTimeline,
  lightThemeFinding,
  motionTokens,
  overview,
  panelLevels,
  playtestFigures,
  principles,
  productProblem,
  qaHistory,
  reflections,
  repository,
  responsiveFigures,
  roadmap,
  ruleSet,
  signals,
  statusLedger,
  surfaceFigures,
  surfaces,
  systemDescription,
  systemRules,
  testRun,
  textLevels,
  themeFigures,
  tokenDrift,
  typefaces,
  typeScale,
  workflowFigures,
  type GfSwatch,
} from "@/data/gundamForge";
import { getNextWorkEntry } from "@/data/work";
import "@/styles/gundam-forge.css";

const sections = [
  ["overview", "Overview"],
  ["system", "01 System"],
  ["decision", "02 Decision"],
  ["engineering", "03 Engineering"],
  ["evidence", "Evidence"],
  ["reflection", "What's next"],
] as const;

// Fictional cards for the drawn illustrations — never official names or art.
const heroCards: GfCardSpec[] = [
  { name: "Vanguard Frame", type: "Unit", color: "Blue", cost: 3, level: 4, ap: 3, hp: 4, qty: 4 },
  { name: "Relay Station", type: "Base", color: "White", cost: 2, level: 3, ap: 0, hp: 5, qty: 2 },
  { name: "Signal Flare", type: "Command", color: "Red", cost: 1, level: 2, qty: 3 },
];
const colourCards: GfCardSpec[] = [
  { name: "Blue", type: "Unit", color: "Blue", cost: 3 },
  { name: "Red", type: "Unit", color: "Red", cost: 2 },
  { name: "Green", type: "Unit", color: "Green", cost: 4 },
  { name: "White", type: "Unit", color: "White", cost: 3 },
  { name: "Purple", type: "Unit", color: "Purple", cost: 5 },
  { name: "Colorless", type: "Base", color: "Colorless", cost: 0 },
];
const anatomyCard: GfCardSpec = { name: "Vanguard Frame", type: "Unit", color: "Blue", cost: 3, level: 4, ap: 3, hp: 4, qty: 4 };

function Swatches({ items, label }: { items: GfSwatch[]; label: string }) {
  return (
    <ul className="gf-swatches" aria-label={label}>
      {items.map((swatch) => (
        <li key={swatch.name}>
          <span className={`gf-swatch gf-swatch--${swatch.ink}`} style={{ background: swatch.hex }} aria-hidden="true">Aa</span>
          <strong>{swatch.name}</strong>
          <code>{swatch.hex}</code>
          <small>{swatch.token}</small>
          <span>{swatch.role}</span>
          <em>{swatch.contrast}</em>
        </li>
      ))}
    </ul>
  );
}

function ChapterOpener({ index }: { index: number }) {
  const chapter = chapters[index];
  return (
    <section className="gf-chapter" id={chapter.id} aria-labelledby={`${chapter.id}-title`}>
      <span className="gf-chapter__number" aria-hidden="true">{chapter.number}</span>
      <div className="gf-chapter__copy">
        <KitEyebrow ns="gf" number="Chapter">{chapter.number} of 03</KitEyebrow>
        <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        <p>{chapter.line}</p>
        <KitStatusTag ns="gf" status={chapter.status} />
      </div>
    </section>
  );
}

export default function GundamForgeCaseStudy() {
  const next = getNextWorkEntry(gundamForge.slug);
  const record = gundamForgeRecord;

  return (
    <div className="gf-case case-study-page" style={{ "--project-accent": "#2563eb" } as React.CSSProperties}>
      <SEO {...gundamForgeMeta} />

      {/* ------------------------------------------------------------ Hero */}
      <section className="gf-hero" aria-labelledby="gf-title">
        <div className="gf-hero__copy">
          <Link className="case-back" to="/work">← All work</Link>
          <p className="gf-kicker">Case study {gundamForge.number} / {record.theme} · Interface system · Web app</p>
          <GfLockup size={22} decorative className="gf-hero__lockup" />
          <h1 id="gf-title">
            <span className="sr-only">Gundam Forge — </span>
            {gundamForge.heroLine}
          </h1>
          <p className="gf-hero__lead">{gundamForge.heroLead}</p>
          <dl className="gf-hero__meta">
            <div><dt>My role</dt><dd>{gundamForge.role}</dd></div>
            <div><dt>Disciplines</dt><dd>{gundamForge.disciplines}</dd></div>
            <div><dt>When</dt><dd>{gundamForge.when}</dd></div>
          </dl>
          <div className="gf-hero__actions">
            <a className="button gf-button" href="#overview">Read the case study <span aria-hidden="true">↓</span></a>
            <a className="button button--ghost" href="#prototype">Try the validation prototype <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="gf-hero__stage">
          <div className="gf-hero__screen">
            <i className="gf-browser-bar" aria-hidden="true"><b /><b /><b /></i>
            <GfPicture id="forge-draft" alt="The Gundam Forge deck builder: catalog on the left, a draft deck of text-proxy cards in the centre, 49 of 50 cards counted and an Issues (2) button" sizes="(max-width: 1050px) 90vw, 44vw" eager />
          </div>
          <div className="gf-hero__phone">
            <GfPicture id="m-forge-issues" alt="The deck issues sheet on a phone listing one rule error and one piece of advice" sizes="(max-width: 1050px) 30vw, 13vw" eager />
          </div>
          <div className="gf-hero__cards" aria-hidden="true">
            {heroCards.map((card) => <GfCardFace key={card.name} card={card} />)}
          </div>
        </div>

        <ul className="gf-ledger" aria-label="Current status">
          {statusLedger.map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <KitStatusTag ns="gf" status={item.status} />
            </li>
          ))}
        </ul>
      </section>

      <nav className="gf-subnav" aria-label="Case study sections">
        <ol>
          {sections.map(([id, label]) => (
            <li key={id}><a href={`#${id}`}>{label}</a></li>
          ))}
        </ol>
      </nav>

      {/* ------------------------------------------------------------ Overview */}
      <section className="gf-overview gf-light" id="overview" aria-labelledby="gf-overview-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="00">Recruiter overview</KitEyebrow>
          <h2 id="gf-overview-title">The case in five minutes.</h2>
          <p>{record.abstract.product}</p>
        </header>
        <div className="gf-overview__grid">
          <article><h3>The problem</h3><p>{overview.problem}</p></article>
          <article><h3>What I did, and how</h3><p>{overview.role}</p></article>
          <article><h3>What exists</h3><p>{overview.exists}</p></article>
          <article><h3>Evidence boundary</h3><p>{overview.boundary}</p></article>
        </div>
        <ol className="gf-chapter-strip" aria-label="Three chapters">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a href={`#${chapter.id}`}>
                <span>{chapter.number}</span>
                <strong>{chapter.title}</strong>
                <small>{chapter.line}</small>
              </a>
              <KitStatusTag ns="gf" status={chapter.status} />
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------------------ Why */}
      <section className="gf-why gf-light" id="why" aria-labelledby="gf-why-title">
        <div className="gf-why__rail">
          <KitEyebrow ns="gf">The human tension</KitEyebrow>
          <div className="gf-why__cards" aria-hidden="true">
            <GfCardFace card={{ name: "Idea", type: "Freedom", color: "Blue", cost: 1 }} />
            <GfCardFace card={{ name: "Rule", type: "Constraint", color: "Red", cost: 2 }} />
          </div>
        </div>
        <div className="gf-why__body">
          <h2 id="gf-why-title">Information isn't the same as <em>understanding.</em></h2>
          {record.humanContext.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <blockquote>{record.changedMind}</blockquote>
          <ul className="gf-tension" aria-label="What the interface has to hold at once">
            {record.tension.map((item, index) => (
              <li key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><p>{item.detail}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================ Chapter 01 */}
      <ChapterOpener index={0} />

      <section className="gf-identity" aria-labelledby="gf-identity-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="01.1">Identity</KitEyebrow>
          <h2 id="gf-identity-title">Borrowed in the morning. Owned by the evening.</h2>
          <p>The first pass copied the official game site's look. Five hours later it was gone. A fan-built tool that dresses like the publisher's own invites exactly the confusion an unofficial project has to avoid.</p>
        </header>
        <div className="gf-grounds">
          <figure className="gf-ground gf-ground--dark"><GfLockup size={26} /><figcaption>Dark theme · the default</figcaption></figure>
          <figure className="gf-ground gf-ground--light"><GfLockup size={26} /><figcaption>Light theme</figcaption></figure>
          <figure className="gf-ground gf-ground--badge"><GfLockup size={44} className="gf-lockup--badge-only" /><figcaption>The badge alone · favicon scale</figcaption></figure>
        </div>
        <p className="gf-small gf-note"><KitStatusTag ns="gf" status="RETROSPECTIVE ILLUSTRATION" /> Redrawn on this page from the header in <code>AppShell.tsx</code>: the same type, tracking, border and glow.</p>
        <ol className="gf-timeline">
          {identityTimeline.map((step) => (
            <li key={step.date}>
              <small>{step.date}</small>
              <strong>{step.title}</strong>
              <p>{step.detail}</p>
              <span className="gf-timeline__meta"><KitStatusTag ns="gf" status={step.status} /><code>{step.source}</code></span>
            </li>
          ))}
        </ol>
      </section>

      <section className="gf-color" id="color" aria-labelledby="gf-color-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="01.2">Colour</KitEyebrow>
          <h2 id="gf-color-title">Steel for structure. Cobalt for intent.</h2>
          <p>The rendered tokens from <code>globals.css</code>. Ratios are computed with the WCAG 2.x formula against the surface they sit on. Every text level passes — even “subtle” clears 6.6:1.</p>
        </header>
        <h3 className="gf-subhead">Surfaces</h3>
        <Swatches items={surfaces} label="Surface tokens" />
        <h3 className="gf-subhead">Text levels</h3>
        <Swatches items={textLevels} label="Text tokens" />
        <h3 className="gf-subhead">Signals</h3>
        <Swatches items={signals} label="Signal tokens" />
        <h3 className="gf-subhead">The six card colours</h3>
        <ul className="gf-card-colours" aria-label="Card colour tokens with contrast on the surface">
          {cardColors.map((colour, index) => (
            <li key={colour.name}>
              <GfCardFace card={colourCards[index]} />
              <strong>{colour.name}</strong>
              <code>{colour.hex}</code>
              <small>{colour.contrast} on surface</small>
            </li>
          ))}
        </ul>
        <p className="gf-small gf-note gf-note--dark">Blue, Red and Purple sit just under 4.5:1 on the surface: fine for frames and pips (graphics need 3:1), not for small text. Green also shares its exact value with the success token — a collision worth separating.</p>
        <div className="gf-callout">
          <KitStatusTag ns="gf" status={tokenDrift.status} />
          <h3>{tokenDrift.title}</h3>
          <div className="gf-drift" aria-hidden="true">
            <span style={{ background: "#0e1116" }}><code>#0e1116</code><small>package · tokens.ts</small></span>
            <span style={{ background: "#091225" }}><code>#091225</code><small>rendered · globals.css</small></span>
          </div>
          <p>{tokenDrift.detail}</p>
        </div>
      </section>

      <section className="gf-type" aria-labelledby="gf-type-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="01.3">Type</KitEyebrow>
          <h2 id="gf-type-title">Three faces, three jobs.</h2>
          <p>Orbitron gives the tool its hardware feel, but only where a few words need to land. Exo 2 does the reading. JetBrains Mono carries every number a player compares.</p>
        </header>
        <div className="gf-faces">
          {typefaces.map((face) => (
            <article key={face.family} className={`gf-face gf-face--${face.className}`}>
              <p className="gf-face__sample">{face.sample}</p>
              <h3>{face.family}</h3>
              <p>{face.role}</p>
              <small>{face.spec}</small>
            </article>
          ))}
        </div>
        <dl className="gf-scale" aria-label="Type scale from typography.ts">
          {typeScale.map((step) => (
            <div key={step.name} className={`gf-scale__row gf-scale__row--${step.name}`}>
              <dt><code>{step.name}</code><small>{step.spec}</small></dt>
              <dd>Five rules, three pieces of advice.</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="gf-surfaces" aria-labelledby="gf-surfaces-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="01.4">Surfaces, motion and the card</KitEyebrow>
          <h2 id="gf-surfaces-title">The pieces every screen is built from.</h2>
        </header>
        <div className="gf-levels">
          {panelLevels.map((level, index) => (
            <div key={level.name} className={`gf-level gf-level--${index + 1}`}>
              <code>{level.name}</code>
              <p>{level.spec}</p>
              <small>{level.use}</small>
            </div>
          ))}
        </div>
        <div className="gf-anatomy">
          <figure className="gf-anatomy__card" aria-labelledby="gf-anatomy-caption">
            <GfCardFace card={anatomyCard} className="gf-card--large" />
            <ol className="gf-anatomy__labels" aria-label="Card tile anatomy">
              <li><b>01</b> Cost, in Orbitron, on the card's colour</li>
              <li><b>02</b> Copies in the deck</li>
              <li><b>03</b> Level, in mono</li>
              <li><b>04</b> Name in the primary text token</li>
              <li><b>05</b> Type, tracked caps, in the card colour</li>
              <li><b>06</b> AP / HP for units and bases</li>
            </ol>
            <figcaption id="gf-anatomy-caption"><KitStatusTag ns="gf" status="RETROSPECTIVE ILLUSTRATION" /> A fictional card drawn on this page in the 5 : 7 frame from <code>card-sizes.ts</code> — the same layout as the text proxies in every capture.</figcaption>
          </figure>
          <div className="gf-motion">
            <h3>Motion</h3>
            <ul className="gf-motion__list">
              {motionTokens.map((token) => (
                <li key={token.name} style={{ "--duration": token.value } as React.CSSProperties}>
                  <code>{token.name}</code>
                  <span className="gf-motion__track" aria-hidden="true"><i /></span>
                  <strong>{token.value}</strong>
                  <small>{token.use}</small>
                </li>
              ))}
            </ul>
            <ul className="gf-rule-list">{systemRules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
          </div>
        </div>
        <div className="gf-callout gf-callout--button">
          <div>
            <KitStatusTag ns="gf" status={buttonFinding.status} />
            <h3>{buttonFinding.title}</h3>
            <p>{buttonFinding.detail}</p>
          </div>
          <div className="gf-button-samples" aria-hidden="true">
            <span style={{ background: "#3b82f6" }}>Create Deck <b>3.68:1</b></span>
            <span style={{ background: "#2563eb" }}>Create Deck <b>5.17:1</b></span>
          </div>
        </div>
      </section>

      {/* ============================================================ Chapter 02 */}
      <ChapterOpener index={1} />

      <section className="gf-rules gf-light" aria-labelledby="gf-rules-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="02.1">Rules and advice</KitEyebrow>
          <h2 id="gf-rules-title">Five rules. Three pieces of advice. Never confused.</h2>
          <p>The validator in <code>packages/shared</code> keeps two lists, and the interface keeps them apart all the way to the screen.</p>
        </header>
        <blockquote className="gf-problem"><p>{productProblem}</p></blockquote>
        <div className="gf-rules__grid">
          <table className="gf-ruleset">
            <caption>What validateDeck() checks</caption>
            <thead><tr><th scope="col">Kind</th><th scope="col">Check</th><th scope="col">Source</th></tr></thead>
            <tbody>
              {ruleSet.map((rule) => (
                <tr key={rule.text} className={rule.kind === "Rule" ? "is-rule" : "is-advice"}>
                  <td><span>{rule.kind}</span></td>
                  <td>{rule.text}</td>
                  <td><code>{rule.source}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
          <ol className="gf-principles">
            {principles.map((item) => (
              <li key={item.id} className={item.id === "P2" ? "is-key" : undefined}>
                <span>{item.id}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.note && <p className="gf-principles__note">{item.note}</p>}
              </li>
            ))}
          </ol>
        </div>
        <p className="gf-small gf-note"><KitStatusTag ns="gf" status="RETROSPECTIVE ILLUSTRATION" /> The four principles are written for this page from what the code does; the rules and messages are the validator's own.</p>
      </section>

      <section className="gf-workflow" aria-labelledby="gf-workflow-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="02.2">Workflow</KitEyebrow>
          <h2 id="gf-workflow-title">Create. Build. View. Then play it.</h2>
          <p>Three screens with one job each, borrowed in shape from the deck builders players already know and rebuilt for this game's rules.</p>
        </header>
        <ol className="gf-steps">
          {workflowFigures.map((figure, index) => (
            <li key={figure.media}>
              <span className="gf-steps__number">{String(index + 1).padStart(2, "0")}</span>
              <Reveal><GfFigureView figure={figure} frame="browser" zoom sizes="(max-width: 1050px) 100vw, 32vw" /></Reveal>
            </li>
          ))}
        </ol>
        <h3 className="gf-subhead">How the builder changed — dated, with the reason</h3>
        <ol className="gf-changes">
          {builderChanges.map((item) => (
            <li key={item.source}>
              <time>{item.date}</time>
              <div><strong>{item.change}</strong><p>{item.why}</p></div>
              <code>{item.source}</code>
            </li>
          ))}
        </ol>
      </section>

      <section className="gf-sequence" id="sequence" aria-labelledby="gf-sequence-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="02.3">The decision, in the build</KitEyebrow>
          <h2 id="gf-sequence-title">Short, explained, recovered.</h2>
          <p>{record.interactionDecision}</p>
        </header>
        <ol className="gf-sequence__list">
          {decisionSequence.map((figure, index) => (
            <li key={`${figure.media}-${index}`}>
              <span className="gf-sequence__step">{String(index + 1).padStart(2, "0")}</span>
              <Reveal><GfFigureView figure={figure} frame="browser" zoom sizes="(max-width: 1050px) 100vw, 60vw" /></Reveal>
            </li>
          ))}
        </ol>
        <div className="gf-callout gf-callout--decision">
          <KitStatusTag ns="gf" status={capDecision.status} />
          <h3>{capDecision.title}</h3>
          <p>{capDecision.detail}</p>
        </div>
      </section>

      <section className="gf-prototype-section gf-light" id="prototype" aria-labelledby="gf-prototype-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="02.4">Try it</KitEyebrow>
          <h2 id="gf-prototype-title">Constraint, explanation, recovery.</h2>
          <p>A focused, deterministic version of the interaction, built for this portfolio with fictional cards — not the app itself. Push one card over its limit, read why, and choose the repair.</p>
        </header>
        <div className="gf-prototype">
          <GundamForgeValidationPrototype />
        </div>
      </section>

      <section className="gf-playtest" aria-labelledby="gf-playtest-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="02.5">Playtesting</KitEyebrow>
          <h2 id="gf-playtest-title">Every choice says what it costs.</h2>
          <p>The playtester follows the same rule as the builder: name the options and their consequences, then let the player decide. The bot is heuristic — a sparring partner that follows the rules, not an AI opponent.</p>
        </header>
        <div className="gf-playtest__grid">
          {playtestFigures.map((figure) => (
            <Reveal key={figure.media}><GfFigureView figure={figure} frame="browser" zoom sizes="(max-width: 1050px) 100vw, 46vw" /></Reveal>
          ))}
        </div>
      </section>

      <section className="gf-responsive" aria-labelledby="gf-responsive-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="02.6">Small screens and themes</KitEyebrow>
          <h2 id="gf-responsive-title">The counts survive the phone.</h2>
          <p>At 390 px the catalog moves behind a button, but the validation bar doesn't move at all. The issues sheet rises from the bottom edge.</p>
        </header>
        <div className="gf-phones">
          {responsiveFigures.map((figure) => (
            <GfFigureView key={figure.media} figure={figure} frame="phone" sizes="(max-width: 600px) 70vw, (max-width: 1050px) 30vw, 20vw" />
          ))}
        </div>
        <div className="gf-theme">
          <Reveal className="gf-theme__wide"><GfFigureView figure={themeFigures[0]} frame="browser" zoom sizes="(max-width: 1050px) 100vw, 60vw" /></Reveal>
          <GfFigureView figure={themeFigures[1]} frame="phone" sizes="(max-width: 600px) 70vw, 20vw" />
          <div className="gf-callout">
            <KitStatusTag ns="gf" status={lightThemeFinding.status} />
            <h3>{lightThemeFinding.title}</h3>
            <p>{lightThemeFinding.detail}</p>
          </div>
        </div>
      </section>

      <section className="gf-surfaces-more" aria-labelledby="gf-more-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="02.7">Around the builder</KitEyebrow>
          <h2 id="gf-more-title">Browse, arrive, recover.</h2>
        </header>
        <div className="gf-more">
          {surfaceFigures.map((figure) => (
            <Reveal key={figure.media}><GfFigureView figure={figure} frame="browser" zoom sizes="(max-width: 1050px) 100vw, 32vw" /></Reveal>
          ))}
        </div>
        <div className="gf-empty">
          <GfFigureView figure={emptyStateFigure} sizes="(max-width: 820px) 100vw, 50vw" />
        </div>
      </section>

      {/* ============================================================ Chapter 03 */}
      <ChapterOpener index={2} />

      <section className="gf-engineering gf-light" id="engineering-system" aria-labelledby="gf-eng-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="03.1">System</KitEyebrow>
          <h2 id="gf-eng-title">One validator, every surface.</h2>
          <p>{systemDescription}</p>
        </header>
        <figure className="gf-layers" aria-labelledby="gf-layers-caption">
          <ol>
            {architecture.map((layer, index) => (
              <li key={layer.layer}>
                <span className="gf-layers__step">{String(index + 1).padStart(2, "0")}</span>
                <h3>{layer.layer}</h3>
                <p>{layer.detail}</p>
                <code>{layer.source}</code>
                <KitStatusTag ns="gf" status={layer.status} />
              </li>
            ))}
          </ol>
          <figcaption id="gf-layers-caption"><KitStatusTag ns="gf" status="RETROSPECTIVE ILLUSTRATION" /> Drawn for this page from the repository layout at {repository.commit}. The builder, the playtester, the deck API route and the game's deck loader all import the same <code>validateDeck()</code>.</figcaption>
        </figure>
        <div className="gf-stack">
          <div>
            <h3>Responsibilities</h3>
            <ul className="gf-rule-list gf-rule-list--ink">{record.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Constraints</h3>
            <ul className="gf-rule-list gf-rule-list--ink">{record.constraints.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Stack</h3>
            <ul className="gf-stack__chips">{gundamForge.stack.map((item) => <li key={item}>{item}</li>)}</ul>
            <a className="gf-repo-link" href={repository.url} target="_blank" rel="noreferrer">{repository.name} on GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="gf-code-section" aria-labelledby="gf-code-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="03.2">The rules in code</KitEyebrow>
          <h2 id="gf-code-title">Where the decisions live.</h2>
          <p>The repository is public, so every excerpt links to its exact lines at {repository.commit}.</p>
        </header>
        <div className="gf-code-list">
          {codeHighlights.map((item, index) => <KitCodeCard key={item.id} ns="gf" item={item} index={index} repo={repository} />)}
        </div>
      </section>

      <section className="gf-qa" aria-labelledby="gf-qa-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="03.3">Testing and QA</KitEyebrow>
          <h2 id="gf-qa-title">Run again for this page.</h2>
          <p>I re-ran the suite, the type check and a production build on {repository.commit} on Oct 25, 2026, and measured the rendered contrast of the parts that matter most.</p>
        </header>
        <ul className="gf-testrun" aria-label="Test run">
          {testRun.map((item) => (
            <li key={item.label}><span>{item.label}</span><strong>{item.value}</strong><KitStatusTag ns="gf" status={item.status} /></li>
          ))}
        </ul>
        <div className="gf-qa__grid">
          <div>
            <h3>Caught during the build</h3>
            <ol className="gf-qa__list">
              {qaHistory.map((item) => (
                <li key={item.source}><time>{item.date}</time><p>{item.finding}</p><small>{item.source}</small></li>
              ))}
            </ol>
          </div>
          <div>
            <h3>Found while preparing this page</h3>
            <ul className="gf-audit">
              {auditFindings.map((item) => (
                <li key={item.finding}><p>{item.finding}</p><small>{item.measure}</small><KitStatusTag ns="gf" status={item.status} /></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ Evidence */}
      <section className="gf-evidence gf-light" id="evidence" aria-labelledby="gf-evidence-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="04">Results, evidence and limitations</KitEyebrow>
          <h2 id="gf-evidence-title">What exists — and what doesn't yet.</h2>
          <p>{record.evidence[record.evidence.length - 1]}</p>
        </header>
        <ul className="gf-ledger-list">
          {record.implementation.map((item) => (
            <li key={item.claim}><KitStatusTag ns="gf" status={item.status} /><p>{item.claim}</p></li>
          ))}
        </ul>
        <div className="gf-evidence__grid">
          <div>
            <h3>Testing evidence</h3>
            <ul className="gf-check-list">{record.testingEvidence.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Known limitations</h3>
            <ul className="gf-gap-list">{record.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Open research questions</h3>
            <ol className="gf-question-list">{record.openQuestions.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </div>
      </section>

      {/* ============================================================ Reflection */}
      <section className="gf-reflection" id="reflection" aria-labelledby="gf-reflection-title">
        <header className="gf-section-head">
          <KitEyebrow ns="gf" number="05">Reflection and what's next</KitEyebrow>
          <h2 id="gf-reflection-title">What a rules engine taught me about interfaces.</h2>
        </header>
        <ol className="gf-reflections">
          {reflections.map((item, index) => (
            <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></li>
          ))}
        </ol>
        <div className="gf-roadmap">
          {roadmap.map((track) => (
            <div key={track.track}>
              <h3>{track.track}</h3>
              <ol>{track.items.map((item) => <li key={item}>{item}</li>)}</ol>
              {track.track === "Research" && <small>Proposed research — not completed testing.</small>}
            </div>
          ))}
        </div>
        <Link className="case-link case-link--light gf-related" to={record.relatedFieldNote.path}>
          Related note: {record.relatedFieldNote.title} <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className="gf-close" aria-label="Closing">
        <GfLockup size={26} />
        <p className="gf-close__line">Show the rule while the player is <em>still deciding.</em></p>
        <p className="gf-close__note">Unofficial fan project. Not affiliated with or endorsed by Bandai.</p>
        <a className="button gf-button" href="#prototype">Try the validation prototype <span aria-hidden="true">↑</span></a>
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

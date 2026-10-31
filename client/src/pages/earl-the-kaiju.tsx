import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { earlTheKaijuMeta } from "@/data/routeMeta/earlTheKaiju";
import { Reveal } from "@/components/motion/Reveal";
import { EcosystemDiagram } from "@/components/earl-the-kaiju/EcosystemDiagram";
import {
  ChapterLabel,
  CodeHighlightCard,
  EvidenceFigure,
  Logo,
  Picture,
  Status,
} from "@/components/earl-the-kaiju/parts";
import {
  applicationFigures,
  applicationRequirements,
  audiences,
  brandIdea,
  caughtByTests,
  chapters,
  coachDesignNotes,
  coachFigures,
  coachLandscape,
  coachProblem,
  coachQaFindings,
  coachStatus,
  coachTests,
  coachingSite,
  codeHighlights,
  evolution,
  flagship,
  guidelineFigures,
  inquiryPipeline,
  lighthouse,
  limitations,
  overview,
  palette,
  processFigures,
  reasoning,
  reflections,
  repositories,
  roadmap,
  siteMap,
  sizeRules,
  statusLedger,
  symbolMap,
  teachingMoments,
  testingLadder,
  websiteAudienceNeeds,
  websiteDecisions,
  websiteFigures,
  websiteProblem,
  websiteTests,
  whyIBuiltIt,
} from "@/data/earlTheKaiju";
import { getNextWorkEntry } from "@/data/work";
import "@/styles/earl-the-kaiju.css";

const wideProcess = new Set(["proof-ceremonial-directions", "proof-patterns-from-references", "proof-horizontal-before-after"]);

const sections = [
  ["overview", "Overview"],
  ["identity", "01 Identity"],
  ["website", "02 Website"],
  ["coach", "03 Kaiju Coach"],
  ["ecosystem", "Ecosystem"],
  ["evidence", "Evidence"],
  ["reflection", "What's next"],
] as const;

function ChapterOpener({ index }: { index: number }) {
  const chapter = chapters[index];
  return (
    <section className="etk-chapter" id={chapter.id} aria-labelledby={`${chapter.id}-title`}>
      <span className="etk-chapter__number" aria-hidden="true">{chapter.number}</span>
      <div className="etk-chapter__copy">
        <ChapterLabel number="Chapter">{chapter.number} of 03</ChapterLabel>
        <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        <p>{chapter.line}</p>
        <Status status={chapter.status} />
      </div>
      <Logo id="eyes-mark-full-color" alt="" className="etk-chapter__mark" />
    </section>
  );
}

export default function EarlTheKaijuCaseStudy() {
  const next = getNextWorkEntry(flagship.slug);
  const website = codeHighlights.filter((item) => item.chapter === "website");
  const coach = codeHighlights.filter((item) => item.chapter === "coach");

  return (
    <div
      className="etk-case case-study-page"
      style={{ "--project-accent": flagship.accent, "--project-secondary": flagship.accentSecondary } as React.CSSProperties}
    >
      <SEO {...earlTheKaijuMeta} />

      {/* ------------------------------------------------------------ Hero */}
      <section className="etk-hero" aria-labelledby="etk-title">
        <div className="etk-hero__copy">
          <Link className="case-back" to="/work">← All work</Link>
          <p className="etk-kicker">Case study {flagship.number} / Flagship · Brand · Website · Android</p>
          <Logo id="lockup-horizontal-full-color" alt="" className="etk-hero__lockup" />
          <h1 id="etk-title">
            <span className="sr-only">Earl the Kaiju — </span>
            {flagship.heroLine}
          </h1>
          <p className="etk-hero__lead">{flagship.heroLead}</p>
          <dl className="etk-hero__meta">
            <div><dt>My role</dt><dd>{flagship.role}</dd></div>
            <div><dt>Disciplines</dt><dd>Brand identity · UX and product design · Web front end and back end · Android</dd></div>
            <div><dt>When</dt><dd>December 2023 — ongoing</dd></div>
          </dl>
          <div className="etk-hero__actions">
            <a className="button etk-button" href="#overview">Read the case study <span aria-hidden="true">↓</span></a>
            {coachingSite.liveUrl ? (
              <a className="button button--ghost" href={coachingSite.liveUrl} target="_blank" rel="noreferrer">
                Visit Earl the Kaiju <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <a className="button button--ghost" href="#website">Preview the coaching site <span aria-hidden="true">↓</span></a>
            )}
            <a className="case-link case-link--light" href={repositories.coach.url} target="_blank" rel="noreferrer">
              Kaiju Coach source on GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
          {!coachingSite.liveUrl && <p className="etk-site-note" data-testid="coaching-site-note">{coachingSite.note}</p>}
        </div>

        <div className="etk-hero__stage">
          <Logo id="crest-full-color" alt="The Earl the Kaiju crest: a black panther's face inside an upright gold and emerald triangle" className="etk-hero__crest" />
          <div className="etk-device etk-device--browser">
            <i className="etk-browser-bar" aria-hidden="true"><b /><b /><b /></i>
            <Picture id="site-home-desktop" alt="The instructor website's home page" sizes="(max-width: 1050px) 80vw, 46vw" eager />
          </div>
          <div className="etk-device etk-device--phone">
            <Picture id="coach-today" alt="Kaiju Coach's Today screen on a phone" sizes="(max-width: 1050px) 34vw, 14vw" eager />
          </div>
        </div>

        <ul className="etk-ledger" aria-label="Current status">
          {statusLedger.map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <Status status={item.status} />
            </li>
          ))}
        </ul>
      </section>

      <nav className="etk-subnav" aria-label="Case study sections">
        <ol>
          {sections.map(([id, label]) => (
            <li key={id}><a href={`#${id}`}>{label}</a></li>
          ))}
        </ol>
      </nav>

      {/* ------------------------------------------------------------ Overview */}
      <section className="etk-overview" id="overview" aria-labelledby="etk-overview-title">
        <header className="etk-section-head">
          <ChapterLabel number="00">Recruiter overview</ChapterLabel>
          <h2 id="etk-overview-title">The case in five minutes.</h2>
          <p>{flagship.summary}</p>
        </header>
        <div className="etk-overview__grid">
          <article><h3>The problem</h3><p>{overview.problem}</p></article>
          <article><h3>What I did, and how</h3><p>{overview.role}</p></article>
          <article><h3>What exists</h3><p>{overview.exists}</p></article>
          <article><h3>Evidence boundary</h3><p>{overview.boundary}</p></article>
        </div>
        <ol className="etk-chapter-strip" aria-label="Three chapters">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a href={`#${chapter.id}`}>
                <span>{chapter.number}</span>
                <strong>{chapter.title}</strong>
                <small>{chapter.line}</small>
              </a>
              <Status status={chapter.status} />
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------------------ Why */}
      <section className="etk-why" id="why" aria-labelledby="etk-why-title">
        <div className="etk-why__rail">
          <ChapterLabel>Why I built it</ChapterLabel>
          <Logo id="kanji-kaiju-vertical-gold" alt="怪獣 — kaiju, the Japanese word for a strange beast" className="etk-why__kanji" />
        </div>
        <div className="etk-why__body">
          <h2 id="etk-why-title">Start again, not start over.</h2>
          {whyIBuiltIt.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      {/* ============================================================ Chapter 01 */}
      <ChapterOpener index={0} />

      <section className="etk-strategy" aria-labelledby="etk-strategy-title">
        <header className="etk-section-head etk-section-head--dark">
          <ChapterLabel number="01.1">Brand strategy</ChapterLabel>
          <h2 id="etk-strategy-title">From a personal idea to a formal identity.</h2>
        </header>
        <div className="etk-idea">
          <blockquote>
            <p>{brandIdea.statement}</p>
          </blockquote>
          <div>
            <p>{brandIdea.explanation}</p>
            <p>{brandIdea.tension}</p>
          </div>
        </div>
        <div className="etk-strategy__grid">
          <div>
            <h3>Who it has to work for</h3>
            <ul className="etk-rule-list">
              {audiences.map((item) => <li key={item.name}><strong>{item.name}</strong><span>{item.need}</span></li>)}
            </ul>
          </div>
          <div>
            <h3>What each part carries</h3>
            <table className="etk-table">
              <thead><tr><th scope="col">Part</th><th scope="col">Meaning</th><th scope="col">Where it lives in the mark</th></tr></thead>
              <tbody>
                {symbolMap.map((row) => <tr key={row.part}><th scope="row">{row.part}</th><td>{row.meaning}</td><td>{row.carried}</td></tr>)}
              </tbody>
            </table>
            <p className="etk-small">The gi is entering the space; tying the belt is the choice to direct that strength with purpose. The crest is built to carry both.</p>
          </div>
        </div>
        <div className="etk-system-need">
          <div>
            <h3>Why a system, not a logo</h3>
            <p>A single good-looking mark fails most of the places this brand has to live. So the deliverable became a system: one crest, two lettering systems, a palette with tested contrast, a type pair, companion marks, patterns and written rules — 949 files in the v1.5 package.</p>
          </div>
          <ul>
            {applicationRequirements.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="etk-tagline">
          <Logo id="tagline-one-line-gold" alt="Gain Perspective Over Fear" className="etk-tagline__art" />
          <p>The only tagline, approved October 2026, in exactly those words. It keeps its full stop on its own and drops it beside a wordmark.</p>
        </div>
      </section>

      <section className="etk-process" id="process" aria-labelledby="etk-process-title">
        <header className="etk-section-head etk-section-head--dark">
          <ChapterLabel number="01.2">Graphic design process</ChapterLabel>
          <h2 id="etk-process-title">Measured, decided, approved — one proof at a time.</h2>
          <p>Each step below is a real review proof from the brand package's approval record. There are no surviving sketches or moodboards from before the concept board, so I'm not showing any.</p>
        </header>

        <figure className="etk-timeline" aria-labelledby="etk-timeline-caption">
          <ol>
            {evolution.map((step) => (
              <li key={step.version}>
                <span className="etk-timeline__version">{step.version}</span>
                <small>{step.date}</small>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
          <figcaption id="etk-timeline-caption"><Status status="RETROSPECTIVE ILLUSTRATION" /> Drawn for this page from the dated approval record (09-approval-record/decisions.md).</figcaption>
        </figure>

        <div className="etk-process__grid">
          {processFigures.map((figure, index) => {
            const layout = index === 0 ? "lead" : wideProcess.has(figure.media) ? "wide" : "half";
            return (
              <Reveal key={figure.media} className={`etk-process__item etk-process__item--${layout}`}>
                <EvidenceFigure figure={figure} zoom sizes={layout === "half" ? "(max-width: 820px) 100vw, 46vw" : "(max-width: 820px) 100vw, 80vw"} />
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="etk-reasoning" aria-labelledby="etk-reasoning-title">
        <header className="etk-section-head">
          <ChapterLabel number="01.3">The reasoning</ChapterLabel>
          <h2 id="etk-reasoning-title">Why it looks the way it does.</h2>
          <p>Design rationale, in my words, checked against the approved guidelines.</p>
        </header>
        <ol className="etk-reasoning__list">
          {reasoning.map((item, index) => (
            <li key={item.question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="etk-system" id="system" aria-labelledby="etk-system-title">
        <header className="etk-section-head etk-section-head--dark">
          <ChapterLabel number="01.4">The final identity</ChapterLabel>
          <h2 id="etk-system-title">One crest, two letterings, one palette.</h2>
          <p>Shown from the approved master files, not re-drawn.</p>
        </header>

        <div className="etk-crests">
          <figure className="etk-ground etk-ground--shadow"><Logo id="crest-full-color" alt="Full-color crest on Shadow" /><figcaption>Full color</figcaption></figure>
          <figure className="etk-ground etk-ground--shadow"><Logo id="crest-one-color-white" alt="One-color white crest on Shadow" /><figcaption>One ink, white</figcaption></figure>
          <figure className="etk-ground etk-ground--ivory"><Logo id="crest-one-color-black" alt="One-color black crest on Ivory" /><figcaption>One ink, black</figcaption></figure>
          <figure className="etk-ground etk-ground--shadow etk-ground--small">
            <div className="etk-small-marks">
              <Logo id="crest-simplified-full-color" alt="Simplified crest" />
              <Logo id="eyes-mark-full-color" alt="Eyes mark" />
            </div>
            <figcaption>Simplified crest 48–63px · eyes mark under 48px</figcaption>
          </figure>
        </div>

        <div className="etk-lockups">
          <figure className="etk-ground etk-ground--shadow etk-lockups__stacked"><Logo id="lockup-stacked-full-color" alt="Practical stacked lockup: the crest over EARL THE KAIJU" /><figcaption>Practical · stacked — the signature</figcaption></figure>
          <figure className="etk-ground etk-ground--shadow etk-lockups__horizontal"><Logo id="lockup-horizontal-full-color" alt="Practical horizontal lockup: the crest beside EARL THE over KAIJU" /><figcaption>Practical · horizontal — navigation and signatures</figcaption></figure>
          <figure className="etk-ground etk-ground--shadow etk-lockups__ceremonial"><Logo id="ceremonial-lockup-stacked-full-color" alt="Ceremonial stacked lockup with chevrons and drawn KAIJU lettering" /><figcaption>Ceremonial · stacked — promotions and apparel</figcaption></figure>
          <figure className="etk-ground etk-ground--shadow etk-lockups__companions">
            <div><Logo id="glyph-set-earl-gold" alt="The four Earl glyphs: Self, Adaptation, Resilience and Lineage" /><Logo id="kanji-kaiju-vertical-gold" alt="怪獣 set vertically" /></div>
            <figcaption>Companions — Earl glyphs and 怪獣</figcaption>
          </figure>
        </div>

        <div className="etk-type">
          <div className="etk-type__display">
            <span>Display · Barlow Condensed</span>
            <p>Technique that holds under pressure</p>
          </div>
          <div className="etk-type__text">
            <span>Text · Manrope</span>
            <p>I teach the details that make technique hold up under pressure.</p>
            <small>Both SIL Open Font License. Both wordmarks are artwork — the practical one traced from my art, the ceremonial one drawn — and never set in a font.</small>
          </div>
        </div>

        <ul className="etk-palette" aria-label="Color palette">
          {palette.map((color) => (
            <li key={color.name} className={`etk-swatch etk-swatch--${color.ink}`} style={{ "--swatch": color.hex } as React.CSSProperties}>
              <span className="etk-swatch__chip" aria-hidden="true" />
              <strong>{color.name}</strong>
              <code>{color.hex}</code>
              <span>{color.role}</span>
              <small>{color.contrast}</small>
            </li>
          ))}
        </ul>

        <div className="etk-sizes">
          <h3>Reproduction, labeled by how well it's known</h3>
          <div className="etk-table-wrap" tabIndex={0} role="region" aria-label="Minimum sizes table">
            <table className="etk-table etk-table--dark">
              <thead><tr><th scope="col">Mark</th><th scope="col">Screen · tested</th><th scope="col">Print · measured</th><th scope="col">Embroidery · estimate</th></tr></thead>
              <tbody>{sizeRules.map((row) => <tr key={row.mark}><th scope="row">{row.mark}</th><td>{row.screen}</td><td>{row.print}</td><td>{row.thread}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="etk-small">Tested means rendered at that pixel size and inspected. Measured means line widths compared with printer limits — a printer's proof confirms it. Estimate means compared with a 1mm satin stitch — only a stitched sample confirms it. Nothing has been embroidered or printed yet.</p>
        </div>

        <h3 className="etk-subhead">From the approved guidelines</h3>
        <div className="etk-guides">
          {guidelineFigures.map((figure) => <EvidenceFigure key={figure.media} figure={figure} zoom sizes="(max-width: 820px) 100vw, 33vw" />)}
        </div>

        <h3 className="etk-subhead">In use</h3>
        <div className="etk-applications">
          {applicationFigures.map((figure) => <EvidenceFigure key={figure.media} figure={figure} sizes="(max-width: 820px) 50vw, 25vw" />)}
        </div>
      </section>

      {/* ============================================================ Chapter 02 */}
      <ChapterOpener index={1} />

      <section className="etk-web" aria-labelledby="etk-web-title">
        <header className="etk-section-head etk-section-head--dark">
          <ChapterLabel number="02.1">Designing the instructor website</ChapterLabel>
          <h2 id="etk-web-title">An honest front door.</h2>
        </header>
        <blockquote className="etk-problem"><p>{websiteProblem}</p></blockquote>

        <div className="etk-web__intro">
          <div>
            <h3>What each visitor needs</h3>
            <ul className="etk-rule-list">
              {websiteAudienceNeeds.map((item) => <li key={item.audience}><strong>{item.audience}</strong><span>{item.need}</span></li>)}
            </ul>
          </div>
          <figure className="etk-sitemap" aria-labelledby="etk-sitemap-caption">
            <ol>
              {siteMap.map((item, index) => (
                <li key={item.page} className={index === siteMap.length - 1 ? "is-cta" : undefined}>
                  <strong>{item.page}</strong><span>{item.job}</span>
                </li>
              ))}
            </ol>
            <p className="etk-sitemap__after">→ Thank you · Privacy · 404</p>
            <figcaption id="etk-sitemap-caption"><Status status="RETROSPECTIVE ILLUSTRATION" /> Information architecture, drawn from the site's routes. One primary action, everywhere: Register Your Interest.</figcaption>
          </figure>
        </div>

        <div className="etk-screens">
          <EvidenceFigure figure={websiteFigures[0]} frame="browser" className="etk-screens__desktop" sizes="(max-width: 820px) 100vw, 64vw" />
          <EvidenceFigure figure={websiteFigures[1]} frame="phone" className="etk-screens__phone" sizes="(max-width: 820px) 60vw, 22vw" />
          <EvidenceFigure figure={websiteFigures[2]} frame="browser" className="etk-screens__desktop" sizes="(max-width: 820px) 100vw, 64vw" />
          <EvidenceFigure figure={websiteFigures[3]} frame="phone" className="etk-screens__phone" sizes="(max-width: 820px) 60vw, 22vw" />
        </div>

        <ol className="etk-decisions">
          {websiteDecisions.map((item, index) => (
            <li key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </li>
          ))}
        </ol>

        <div className="etk-screens etk-screens--form">
          <EvidenceFigure figure={websiteFigures[4]} frame="browser" className="etk-screens__desktop" sizes="(max-width: 820px) 100vw, 64vw" />
          <EvidenceFigure figure={websiteFigures[5]} frame="phone" className="etk-screens__phone" sizes="(max-width: 820px) 60vw, 22vw" />
        </div>
        <p className="etk-small etk-capture-note">Captured for this page from a local production build of the site's main branch (static export served locally, 2× resolution). The site isn't deployed, so there's no public URL to visit yet. The inner pages are getting the same redesign in an open pull request.</p>
      </section>

      <section className="etk-engineering" id="website-engineering" aria-labelledby="etk-web-eng-title">
        <header className="etk-section-head">
          <ChapterLabel number="02.2">Website engineering</ChapterLabel>
          <h2 id="etk-web-eng-title">Static pages, one small API.</h2>
          <p>Next.js 16 static export with React 19 and TypeScript strict, Tailwind CSS 4 mapped onto the brand tokens, and a single Cloudflare Worker for the form. Cloudflare's free plan allows commercial use; that constraint drove the shape.</p>
        </header>
        <figure className="etk-pipeline" aria-labelledby="etk-pipeline-caption">
          <ol>
            {inquiryPipeline.map((item, index) => (
              <li key={item.step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.step}</strong><small>{item.detail}</small></li>
            ))}
          </ol>
          <figcaption id="etk-pipeline-caption"><Status status="RETROSPECTIVE ILLUSTRATION" /> The order of checks in <code>worker/routes/inquiry.ts</code>. Cheap checks first; nothing is emailed before it's saved.</figcaption>
        </figure>
        <div className="etk-code-list">
          {website.map((item, index) => <CodeHighlightCard key={item.id} item={item} index={index} />)}
        </div>
      </section>

      {/* ============================================================ Chapter 03 */}
      <ChapterOpener index={2} />

      <section className="etk-coach" aria-labelledby="etk-coach-title">
        <header className="etk-section-head etk-section-head--dark">
          <ChapterLabel number="03.1">Kaiju Coach product design</ChapterLabel>
          <h2 id="etk-coach-title">Designed from the mat, not the desk.</h2>
        </header>
        <blockquote className="etk-problem"><p>{coachProblem}</p></blockquote>

        <div className="etk-table-wrap" tabIndex={0} role="region" aria-label="Teaching moments table">
          <table className="etk-table etk-table--dark etk-moments">
            <caption>My real teaching day, and what the app gives each moment</caption>
            <thead><tr><th scope="col">Moment</th><th scope="col">What I need</th><th scope="col">Where it lives</th></tr></thead>
            <tbody>{teachingMoments.map((row) => <tr key={row.moment}><th scope="row">{row.moment}</th><td>{row.need}</td><td>{row.answer}</td></tr>)}</tbody>
          </table>
        </div>

        <div className="etk-phones">
          {coachFigures.map((figure) => (
            <EvidenceFigure key={figure.media} figure={figure} frame="phone" sizes="(max-width: 600px) 46vw, (max-width: 1050px) 30vw, 18vw" />
          ))}
        </div>
        <EvidenceFigure figure={coachLandscape} frame="phone-landscape" className="etk-landscape" sizes="(max-width: 820px) 100vw, 56vw" />
        <p className="etk-small etk-capture-note">Rendered by CI from the real Compose code with fictional students and data, except the last phone, which is a full-screen capture from the emulator run. Screens from my own phone stay out of the repository because they show my status bar.</p>

        <div className="etk-coach__notes">
          <div>
            <h3>Design direction</h3>
            <ul className="etk-rule-list">
              {coachDesignNotes.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.detail}</span></li>)}
            </ul>
          </div>
          <div>
            <h3>What design and engineering QA caught</h3>
            <ul className="etk-check-list">
              {coachQaFindings.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="etk-status-matrix">
          {coachStatus.map((group) => (
            <div key={group.status}>
              <Status status={group.status} />
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="etk-engineering" id="coach-engineering" aria-labelledby="etk-coach-eng-title">
        <header className="etk-section-head">
          <ChapterLabel number="03.2">Kaiju Coach engineering</ChapterLabel>
          <h2 id="etk-coach-eng-title">Built to keep working when the gym's Wi-Fi doesn't.</h2>
          <p>Native Kotlin and Jetpack Compose, Room as the on-device source of truth, manual dependency injection, and GitHub Actions as the build machine: every push builds, tests, renders every screen and lints.</p>
        </header>
        <ol className="etk-ladder" aria-label="Testing ladder">
          {testingLadder.map((rung, index) => (
            <li key={rung.rung}><span>{String(index + 1).padStart(2, "0")}</span><p>{rung.rung}</p><strong>Found: {rung.found}</strong></li>
          ))}
        </ol>
        <div className="etk-code-list">
          {coach.map((item, index) => <CodeHighlightCard key={item.id} item={item} index={index + website.length} />)}
        </div>
      </section>

      {/* ============================================================ Ecosystem */}
      <section className="etk-ecosystem" id="ecosystem" aria-labelledby="etk-eco-title">
        <header className="etk-section-head etk-section-head--dark">
          <ChapterLabel number="04">The connected ecosystem</ChapterLabel>
          <h2 id="etk-eco-title">Two products, two jobs, one brand.</h2>
          <p>The website is public and its job is trust and interest. The app is private and its job is teaching. What's live, and what's still a plan:</p>
        </header>
        <EcosystemDiagram />
      </section>

      {/* ============================================================ Evidence */}
      <section className="etk-evidence" id="evidence" aria-labelledby="etk-evidence-title">
        <header className="etk-section-head">
          <ChapterLabel number="05">Results, evidence and limitations</ChapterLabel>
          <h2 id="etk-evidence-title">What exists — and what doesn't yet.</h2>
          <p>Development results, dated and sourced. No deployment results and no real-world outcomes exist yet, so none are claimed.</p>
        </header>
        <div className="etk-evidence__grid">
          <div>
            <h3>Instructor website tests</h3>
            <p className="etk-small">{websiteTests.date} · {websiteTests.source}</p>
            <dl className="etk-results">{websiteTests.rows.map((row) => <div key={row.suite}><dt>{row.suite}</dt><dd>{row.result}</dd></div>)}</dl>
          </div>
          <div>
            <h3>Kaiju Coach tests</h3>
            <p className="etk-small">{coachTests.date} · {coachTests.source}</p>
            <dl className="etk-results">{coachTests.rows.map((row) => <div key={row.suite}><dt>{row.suite}</dt><dd>{row.result}</dd></div>)}</dl>
          </div>
        </div>
        <div className="etk-lighthouse">
          <h3>Lighthouse</h3>
          <p className="etk-small">{lighthouse.label}</p>
          <div className="etk-table-wrap" tabIndex={0} role="region" aria-label="Lighthouse lab results">
            <table className="etk-table">
              <thead><tr><th scope="col">Page</th><th scope="col">Performance</th><th scope="col">Accessibility</th><th scope="col">Best practices</th><th scope="col">SEO</th></tr></thead>
              <tbody>{lighthouse.rows.map((row) => <tr key={row.page}><th scope="row">{row.page}</th><td>{row.performance}</td><td>{row.accessibility}</td><td>{row.bestPractices}</td><td>{row.seo}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="etk-small">{lighthouse.note}</p>
        </div>
        <div className="etk-evidence__grid">
          <div>
            <h3>Problems the tests caught</h3>
            <ul className="etk-check-list etk-check-list--light">{caughtByTests.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Known limitations</h3>
            <ul className="etk-gap-list">{limitations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* ============================================================ Reflection */}
      <section className="etk-reflection" id="reflection" aria-labelledby="etk-reflection-title">
        <header className="etk-section-head etk-section-head--dark">
          <ChapterLabel number="06">Reflection and what's next</ChapterLabel>
          <h2 id="etk-reflection-title">What building for myself taught me.</h2>
        </header>
        <ol className="etk-reflections">
          {reflections.map((item, index) => (
            <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></li>
          ))}
        </ol>
        <div className="etk-roadmap">
          {roadmap.map((track) => (
            <div key={track.track}>
              <h3>{track.track}</h3>
              <ol>{track.items.map((item) => <li key={item}>{item}</li>)}</ol>
            </div>
          ))}
        </div>
        <p className="etk-roadmap__long">The longer goal is my own academy. Its name isn't decided, and it'll be separate from Earl the Kaiju.</p>
      </section>

      <section className="etk-close" aria-label="Closing">
        <Logo id="lockup-stacked-full-color" alt="Earl the Kaiju stacked lockup" className="etk-close__lockup" />
        <p className="etk-close__line">Gain Perspective Over Fear.</p>
        <div className="etk-close__actions">
          {coachingSite.liveUrl ? (
            <a className="button etk-button" href={coachingSite.liveUrl} target="_blank" rel="noreferrer">Visit Earl the Kaiju <span aria-hidden="true">↗</span></a>
          ) : (
            <p className="etk-site-note">{coachingSite.status}</p>
          )}
          <a className="case-link case-link--light" href={repositories.coach.url} target="_blank" rel="noreferrer">Kaiju Coach on GitHub <span aria-hidden="true">↗</span></a>
        </div>
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

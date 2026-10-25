import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { Reveal } from "@/components/motion/Reveal";
import { WithYouSharingPrototype } from "@/components/prototypes/WithYouSharingPrototype";
import {
  WyBrandFile,
  WyCodeCard,
  WyEyebrow,
  WyFigureView,
  WyIcon,
  WyIllustration,
  WyLockup,
  WyMark,
  WyPicture,
  WyStatusTag,
} from "@/components/withyou/parts";
import {
  architectureFigure,
  brandIdea,
  campaignFigures,
  chapters,
  codeHighlights,
  comparisons,
  contrastFinding,
  designSystemFigures,
  flowFigures,
  gradients,
  handoffFigures,
  heroSlots,
  iconFiles,
  iconRules,
  illustrationCaptions,
  imageDirection,
  imageryDo,
  imageryDont,
  markEvolution,
  markGeometry,
  navigationEvolution,
  neverSound,
  onboardingBuild,
  overview,
  palette,
  photography,
  photoInProduct,
  photoLibrary,
  photoTreatment,
  platformFigures,
  principles,
  productProblem,
  qaCaught,
  reflections,
  repository,
  roadmap,
  sharingFigures,
  slotFinding,
  specFigures,
  statusLedger,
  svgErrorFigure,
  typeScale,
  visibilityLayers,
  voicePrinciples,
  withYou,
  withYouRecord,
  wyIcons,
  wyIllustrations,
  type WyIconId,
  type WyIllustrationId,
} from "@/data/withyou";
import { getNextWorkEntry } from "@/data/work";
import "@/styles/withyou.css";

const sections = [
  ["overview", "Overview"],
  ["brand", "01 Brand"],
  ["product", "02 Product"],
  ["engineering", "03 Engineering"],
  ["evidence", "Evidence"],
  ["reflection", "What's next"],
] as const;

const iconGroups = ["navigation", "actions", "features"] as const;
const iconGroupLabel: Record<(typeof iconGroups)[number], string> = {
  navigation: "Navigation · 5",
  actions: "Actions · 17",
  features: "Features · 17",
};

/** A drawn sample of the primary button, so the failing label can be shown as an illustration. */
function ButtonSample({ ink, ratio }: { ink: string; ratio: string }) {
  return (
    <svg className="wy-finding__btn" viewBox="0 0 214 48" focusable="false">
      <rect width="214" height="48" rx="24" fill="#ff6b6b" />
      <text x="22" y="29.5" fill={ink} className="wy-finding__label">Start check-in</text>
      <text x="192" y="29" fill={ink} textAnchor="end" className="wy-finding__ratio">{ratio}</text>
    </svg>
  );
}

function ChapterOpener({ index }: { index: number }) {
  const chapter = chapters[index];
  return (
    <section className="wy-chapter" id={chapter.id} aria-labelledby={`${chapter.id}-title`}>
      <span className="wy-chapter__number" aria-hidden="true">{chapter.number}</span>
      <div className="wy-chapter__copy">
        <WyEyebrow number="Chapter">{chapter.number} of 03</WyEyebrow>
        <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        <p>{chapter.line}</p>
        <WyStatusTag status={chapter.status} />
      </div>
      <WyMark size={96} className="wy-chapter__mark" />
    </section>
  );
}

export default function WithYouCaseStudy() {
  const next = getNextWorkEntry(withYou.slug);
  const record = withYouRecord;

  return (
    <div
      className="wy-case case-study-page"
      style={{ "--project-accent": record.accent, "--project-secondary": record.accentSecondary } as React.CSSProperties}
    >
      <SEO
        title="WithYou — Brand, Product and Privacy Engineering Case Study"
        description={record.abstract.product}
        path={withYou.path}
        image="/assets/projects/withyou/social/og.png"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: withYou.name,
          description: record.abstract.product,
          url: `https://ehicksonjr.com${withYou.path}`,
          author: { "@type": "Person", name: "Earl Hickson Jr.", url: "https://ehicksonjr.com" },
          genre: "Brand, UX and engineering case study",
          keywords: ["Brand identity", "Design system", "UX design", "React Native", "Privacy by design", ...withYou.stack],
          isAccessibleForFree: true,
        }}
      />

      {/* ------------------------------------------------------------ Hero */}
      <section className="wy-hero" aria-labelledby="wy-title">
        <div className="wy-hero__copy">
          <Link className="case-back" to="/work">← All work</Link>
          <p className="wy-kicker">Case study {withYou.number} / {record.theme} · Brand · Mobile · Privacy</p>
          <WyLockup size={46} className="wy-hero__lockup" decorative />
          <h1 id="wy-title">
            <span className="sr-only">WithYou — </span>
            {withYou.heroLine}
          </h1>
          <p className="wy-hero__lead">{withYou.heroLead}</p>
          <dl className="wy-hero__meta">
            <div><dt>My role</dt><dd>{withYou.role}</dd></div>
            <div><dt>Disciplines</dt><dd>{withYou.disciplines}</dd></div>
            <div><dt>When</dt><dd>{withYou.when}</dd></div>
          </dl>
          <div className="wy-hero__actions">
            <a className="button wy-button" href="#overview">Read the case study <span aria-hidden="true">↓</span></a>
            <a className="button button--ghost" href="#prototype">Try the sharing prototype <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="wy-hero__stage">
          <div className="wy-hero__orbit" aria-hidden="true"><WyMark size={520} /></div>
          <div className="wy-device wy-device--back">
            <WyPicture id="ios-home-dark" alt="WithYou's home screen on iOS in dark mode" sizes="(max-width: 1050px) 38vw, 17vw" eager />
          </div>
          <div className="wy-device wy-device--front">
            <WyPicture id="ios-home-light" alt="WithYou's home screen on iOS in light mode: a photo with a glass nudge card and today's check-in for both people" sizes="(max-width: 1050px) 42vw, 19vw" eager />
          </div>
          <div className="wy-hero__icon">
            <WyPicture id="app-icon" alt="The WithYou app icon: two interlocking coral and blush loops" sizes="96px" eager />
          </div>
        </div>

        <ul className="wy-ledger" aria-label="Current status">
          {statusLedger.map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <WyStatusTag status={item.status} />
            </li>
          ))}
        </ul>
      </section>

      <nav className="wy-subnav" aria-label="Case study sections">
        <ol>
          {sections.map(([id, label]) => (
            <li key={id}><a href={`#${id}`}>{label}</a></li>
          ))}
        </ol>
      </nav>

      {/* ------------------------------------------------------------ Overview */}
      <section className="wy-overview" id="overview" aria-labelledby="wy-overview-title">
        <header className="wy-section-head">
          <WyEyebrow number="00">Recruiter overview</WyEyebrow>
          <h2 id="wy-overview-title">The case in five minutes.</h2>
          <p>{record.abstract.product}</p>
        </header>
        <div className="wy-overview__grid">
          <article><h3>The problem</h3><p>{overview.problem}</p></article>
          <article><h3>What I did, and how</h3><p>{overview.role}</p></article>
          <article><h3>What exists</h3><p>{overview.exists}</p></article>
          <article><h3>Evidence boundary</h3><p>{overview.boundary}</p></article>
        </div>
        <ol className="wy-chapter-strip" aria-label="Three chapters">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a href={`#${chapter.id}`}>
                <span>{chapter.number}</span>
                <strong>{chapter.title}</strong>
                <small>{chapter.line}</small>
              </a>
              <WyStatusTag status={chapter.status} />
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------------------ Why */}
      <section className="wy-why" id="why" aria-labelledby="wy-why-title">
        <div className="wy-why__rail">
          <WyEyebrow>The human tension</WyEyebrow>
          <WyMark size={132} className="wy-why__mark" />
        </div>
        <div className="wy-why__body">
          <h2 id="wy-why-title">Closeness isn't the same as <em>access.</em></h2>
          {record.humanContext.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <blockquote>{record.changedMind}</blockquote>
          <ul className="wy-tension" aria-label="What the interface has to hold at once">
            {record.tension.map((item, index) => (
              <li key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><p>{item.detail}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================ Chapter 01 */}
      <ChapterOpener index={0} />

      <section className="wy-strategy" aria-labelledby="wy-strategy-title">
        <header className="wy-section-head wy-section-head--dark">
          <WyEyebrow number="01.1">Brand strategy and voice</WyEyebrow>
          <h2 id="wy-strategy-title">A thoughtful friend, not a wellness company.</h2>
        </header>
        <div className="wy-idea">
          <blockquote><p>Stay close, even when <em>life</em> gets busy.</p></blockquote>
          <div>
            <p>{brandIdea.explanation}</p>
            <p>{brandIdea.tension}</p>
          </div>
        </div>
        <ol className="wy-voice" aria-label="Voice principles">
          {voicePrinciples.map((item, index) => (
            <li key={item.rule}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.rule}</h3>
              <p className="wy-voice__yes"><b>We say</b>{item.yes}</p>
              <p className="wy-voice__no"><b>Not</b>{item.no}</p>
            </li>
          ))}
        </ol>
        <div className="wy-never">
          <h3>We never sound like this</h3>
          <ul>{neverSound.map((line) => <li key={line}>{line}</li>)}</ul>
          <p className="wy-small">From the design-system voice rules. Sentence case everywhere but the wordmark; no emoji in product UI; the partner's first name, never “your partner,” when it's known.</p>
        </div>
      </section>

      <section className="wy-mark-section" id="mark" aria-labelledby="wy-mark-title">
        <header className="wy-section-head">
          <WyEyebrow number="01.2">The mark</WyEyebrow>
          <h2 id="wy-mark-title">Two loops, each passing in front once.</h2>
          <p>Two people, joined but still two. The mark's geometry is the one part of the identity that never changed.</p>
        </header>

        <div className="wy-construction">
          <figure className="wy-construction__drawing" aria-labelledby="wy-construction-caption">
            <svg viewBox="-6 -6 72 68" role="img" aria-label="Construction drawing of the WithYou mark: two ellipses, each 32 by 44 units, tilted minus and plus ten degrees, with a vertical clip line at x equals 30">
              <defs>
                <pattern id="wy-grid" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M4 0H0V4" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.2" /></pattern>
                <clipPath id="wy-construction-clip"><rect x="30" y="0" width="30" height="56" /></clipPath>
              </defs>
              <rect x="0" y="0" width="60" height="56" fill="url(#wy-grid)" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.25" />
              <line x1="30" y1="-4" x2="30" y2="60" stroke="var(--wy-lavender)" strokeWidth="0.35" strokeDasharray="1.2 1" />
              <g transform="rotate(10 41 28)"><ellipse cx="41" cy="28" rx="16" ry="22" fill="none" stroke="var(--wy-blush)" strokeWidth="5.3" /></g>
              <g transform="rotate(-10 19 28)"><ellipse cx="19" cy="28" rx="16" ry="22" fill="none" stroke="var(--wy-coral)" strokeWidth="5.3" /></g>
              <g transform="rotate(10 41 28)" clipPath="url(#wy-construction-clip)"><ellipse cx="41" cy="28" rx="16" ry="22" fill="none" stroke="var(--wy-blush)" strokeWidth="5.3" /></g>
              <g transform="rotate(-10 19 28)"><ellipse cx="19" cy="28" rx="16" ry="22" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="0.8 0.8" /><line x1="19" y1="2" x2="19" y2="54" stroke="currentColor" strokeWidth="0.3" /></g>
              <g transform="rotate(10 41 28)"><ellipse cx="41" cy="28" rx="16" ry="22" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="0.8 0.8" /><line x1="41" y1="2" x2="41" y2="54" stroke="currentColor" strokeWidth="0.3" /></g>
              <circle cx="19" cy="28" r="0.9" fill="currentColor" /><circle cx="41" cy="28" r="0.9" fill="currentColor" />
              <text x="19" y="61.5" textAnchor="middle" fontSize="2.6" fill="currentColor">−10°</text>
              <text x="41" y="61.5" textAnchor="middle" fontSize="2.6" fill="currentColor">+10°</text>
              <text x="31" y="-2" fontSize="2.4" fill="var(--wy-lavender)">clip x = 30</text>
            </svg>
            <figcaption id="wy-construction-caption"><WyStatusTag status="RETROSPECTIVE ILLUSTRATION" /> Drawn for this page from the geometry in <code>Logo.tsx</code>.</figcaption>
          </figure>
          <dl className="wy-construction__specs">
            {markGeometry.map((item) => (
              <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
            ))}
          </dl>
        </div>

        <div className="wy-grounds">
          <figure className="wy-ground wy-ground--cream"><WyLockup size={38} /><figcaption>On Cream · light tokens</figcaption></figure>
          <figure className="wy-ground wy-ground--plum"><WyLockup size={38} /><figcaption>On Plum · dark tokens</figcaption></figure>
          <figure className="wy-ground wy-ground--cream wy-ground--stacked"><WyLockup size={30} stacked /><figcaption>Stacked</figcaption></figure>
          <figure className="wy-ground wy-ground--icon">
            <WyPicture id="app-icon" alt="The shipped app icon" sizes="160px" />
            <figcaption>App icon · as shipped</figcaption>
          </figure>
        </div>
        <p className="wy-small wy-note">Lockups above are drawn live on this page from the app's geometry and v4.2.1 tokens, so they switch exactly as the app does. The app icon is the shipped PNG.</p>

        <ul className="wy-app-icons" aria-label="App icon files">
          {iconFiles.map((file) => (
            <li key={file.id}>
              <div className={`wy-app-icons__art${file.id === "notification-icon" ? " is-glyph" : ""}`}><WyBrandFile id={file.id} alt={file.alt} /></div>
              <small>{file.date}</small>
              <span>{file.caption}</span>
              <WyStatusTag status={file.status} />
            </li>
          ))}
        </ul>

        <h3 className="wy-subhead">How the mark changed — and what didn't</h3>
        <ol className="wy-evolution">
          {markEvolution.map((step) => (
            <li key={step.date} className={step.files.length ? undefined : "is-current"}>
              <div className="wy-evolution__art">
                {step.files.length ? (
                  step.files.map((file) => <WyBrandFile key={file.id} id={file.id} alt={file.alt} />)
                ) : (
                  <WyLockup size={30} />
                )}
              </div>
              <small>{step.date}</small>
              <strong>{step.title}</strong>
              <p>{step.detail}</p>
              <WyStatusTag status={step.status} />
            </li>
          ))}
        </ol>
        <p className="wy-small wy-note">Every file above is copied byte for byte from <code>apps/mobile/assets</code>; dates are from the repository history.</p>
      </section>

      <section className="wy-color" id="color" aria-labelledby="wy-color-title">
        <header className="wy-section-head wy-section-head--dark">
          <WyEyebrow number="01.3">Color and type</WyEyebrow>
          <h2 id="wy-color-title">Warm, never bluish. Plum, never black.</h2>
          <p>v4.2.1 tokens from <code>tokens.ts</code>. Contrast ratios are computed for this page with the WCAG 2.x formula.</p>
        </header>
        <ul className="wy-palette" aria-label="Color palette">
          {palette.map((color) => (
            <li key={color.name} className={`wy-swatch wy-swatch--${color.ink}`}>
              <span className="wy-swatch__chip" style={{ "--swatch": color.hex, "--swatch-dark": color.dark ?? color.hex } as React.CSSProperties} aria-hidden="true">
                {color.dark && <i />}
              </span>
              <strong>{color.name}</strong>
              <code>{color.hex}{color.dark ? ` · dark ${color.dark}` : ""}</code>
              <span>{color.role}</span>
              <small>{color.contrast}</small>
            </li>
          ))}
        </ul>
        <ul className="wy-gradients" aria-label="Signature gradients">
          {gradients.map((gradient) => (
            <li key={gradient.name} style={{ "--g1": gradient.stops[0], "--g2": gradient.stops[1] } as React.CSSProperties}>
              <span aria-hidden="true" />
              <strong>{gradient.name}</strong>
              <small>{gradient.stops.join(" → ")} · {gradient.use}</small>
            </li>
          ))}
        </ul>

        <div className="wy-decision">
          <WyStatusTag status="DOCUMENTED DECISION" />
          <h3>Coral → plum → coral</h3>
          <p>The May 12 handoff made plum the primary button color and kept coral for accents. Five weeks later, v4.2.1 put coral back: “Coral is the primary action color. Plum is not a replacement primary; it is the dark-mode foundation.” Plum buttons scored better on contrast — white on plum is 13.8:1 — and that trade is still open below.</p>
        </div>

        <div className="wy-type">
          <div className="wy-type__head">
            <span>Inter · 400 / 500 / 600 / 700</span>
            <p className="wy-type__aa" aria-hidden="true">Aa</p>
            <small>Humanist and warm, with tight tracking at display sizes. JetBrains Mono only for short system labels.</small>
          </div>
          <dl className="wy-type__scale">
            {typeScale.map((style) => (
              <div key={style.name} className={`wy-type__row wy-type__row--${style.className}`}>
                <dt><strong>{style.name}</strong><small>{style.spec}</small></dt>
                <dd>{style.sample}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="wy-finding">
          <WyStatusTag status={contrastFinding.status} />
          <h3>{contrastFinding.title}</h3>
          <div className="wy-finding__demo" aria-hidden="true">
            <ButtonSample ink="#ffffff" ratio="2.78:1" />
            <ButtonSample ink="#1d2841" ratio="5.28:1" />
          </div>
          <p>{contrastFinding.detail}</p>
        </div>
      </section>

      <section className="wy-icons-section" id="icons" aria-labelledby="wy-icons-title">
        <header className="wy-section-head">
          <WyEyebrow number="01.4">Icons and illustration</WyEyebrow>
          <h2 id="wy-icons-title">A small, hand-tuned kit. No emoji.</h2>
          <p>All 39 product icons and the state illustrations, straight from the app's asset folders.</p>
        </header>
        <div className="wy-icon-board">
          {iconGroups.map((group) => (
            <div key={group} className="wy-icon-group">
              <h3>{iconGroupLabel[group]}</h3>
              <ul>
                {(Object.keys(wyIcons) as WyIconId[])
                  .filter((id) => wyIcons[id].group === group)
                  .map((id) => (
                    <li key={id} title={id}>
                      <WyIcon id={id} />
                      <span>{id.replace(/^(nav|action|feature)-/, "").replace(/-/g, " ")}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          <ul className="wy-rule-list wy-icon-rules">{iconRules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
        </div>

        <h3 className="wy-subhead wy-subhead--ink">Illustration: for the moments that go wrong</h3>
        <ul className="wy-illustrations">
          {(Object.keys(wyIllustrations) as WyIllustrationId[]).map((id) => (
            <li key={id}>
              <WyIllustration id={id} alt="" />
              <span>{illustrationCaptions[id]}</span>
            </li>
          ))}
        </ul>
        <p className="wy-small wy-note">Line illustrations on a 320 × 200 artboard, plum and coral only — empty, error and recovery states are designed states, not leftovers.</p>

      </section>

      <section className="wy-photo" id="photography" aria-labelledby="wy-photo-title">
        <div className="wy-photo__light">
          <header className="wy-section-head">
            <WyEyebrow number="01.5">Photography</WyEyebrow>
            <h2 id="wy-photo-title">{photography.statement}</h2>
            <p>{photography.lead}</p>
          </header>

          <ul className="wy-direction" aria-label="Image direction">
            {imageDirection.map((item) => (
              <li key={item.photo}>
                <WyPicture id={item.photo} alt={item.alt} sizes="(max-width: 600px) 92vw, (max-width: 1050px) 46vw, 31vw" />
                <div>
                  <strong>{item.scene}</strong>
                  <span>{item.direction}</span>
                </div>
                <code>{item.photo.replace("photo-", "")}</code>
              </li>
            ))}
          </ul>
          <div className="wy-dodont">
            <div>
              <h3>Do</h3>
              <ul>{imageryDo.map((rule) => <li key={rule}>{rule}</li>)}</ul>
            </div>
            <div>
              <h3>Don&apos;t</h3>
              <ul>{imageryDont.map((rule) => <li key={rule}>{rule}</li>)}</ul>
            </div>
            <p className="wy-dodont__source"><WyStatusTag status="DESIGN SOURCE" /> <small>{photography.source}</small></p>
          </div>

          <div className="wy-library">
            <div className="wy-library__head">
              <h3>Library · v1 <span>36 photos, pulled by id</span></h3>
              <WyStatusTag status="AI-GENERATED PLACEHOLDER" />
            </div>
            <ul className="wy-library__grid" aria-label="Contact sheet of the 36 library photos">
              {photoLibrary.map((id) => (
                <li key={id}>
                  <WyPicture id={id} alt="" sizes="(max-width: 600px) 30vw, (max-width: 1050px) 16vw, 110px" />
                  <span>{id.replace("photo-", "")}</span>
                </li>
              ))}
            </ul>
            <div className="wy-callout">
              <WyStatusTag status="AI-GENERATED PLACEHOLDER" />
              <p>{photography.placeholder}</p>
            </div>
          </div>
        </div>

        <div className="wy-photo__dark">
          <h3 className="wy-subhead">The treatment, layer by layer</h3>
          <ol className="wy-treatment">
            {photoTreatment.map((step, index) => (
              <li key={step.step}>
                <div className={`wy-photo-frame wy-treatment__frame${index > 0 ? " has-gradient" : ""}`} aria-hidden="true">
                  <WyPicture id="photo-a-01" alt="" sizes="(max-width: 820px) 60vw, 330px" />
                  {index === 2 && (
                    <div className="wy-glass">
                      <WyLockup size={15} decorative />
                      <p>Stay close, even when life gets busy.</p>
                    </div>
                  )}
                </div>
                <span className="wy-treatment__step">{step.step}</span>
                <h4>{step.title}</h4>
                <code>{step.spec}</code>
                <p>{step.note}</p>
              </li>
            ))}
          </ol>
          <p className="wy-small wy-note wy-note--dark"><WyStatusTag status="RETROSPECTIVE ILLUSTRATION" /> Rebuilt on this page in CSS from the spec values, over a-01 — the photo the asset manifest names as the redesign&apos;s primary hero.</p>

          <h3 className="wy-subhead">Every hero declares where type may go</h3>
          <ul className="wy-slots">
            {heroSlots.map((slot) => (
              <li key={slot.file}>
                <div className={`wy-photo-frame has-gradient wy-slot wy-slot--${slot.area}`}>
                  <WyPicture id={slot.photo} alt="" sizes="(max-width: 820px) 40vw, 200px" />
                  <i aria-hidden="true" />
                </div>
                <strong>{slot.screen}</strong>
                <span>{slot.zone}</span>
                <code>{slot.file}</code>
              </li>
            ))}
          </ul>
          <div className="wy-slotnote">
            <div>
              <WyStatusTag status={slotFinding.status} />
              <h4>{slotFinding.title}</h4>
            </div>
            <p>{slotFinding.detail}</p>
          </div>

          <div className="wy-inproduct">
            <div className="wy-inproduct__intro">
              <p className="wy-eyebrow">In the product</p>
              <h3>The rules, running.</h3>
              <p>Two platforms, two test runs. The glass card carries the welcome headline and Today&apos;s empty state; Us sets display type straight onto the gradient.</p>
            </div>
            {photoInProduct.map((figure) => (
              <Reveal key={figure.media}>
                <WyFigureView figure={figure} frame="phone" sizes="(max-width: 820px) 70vw, 300px" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wy-campaign" id="campaign" aria-labelledby="wy-campaign-title">
        <header className="wy-section-head">
          <WyEyebrow number="01.6">Campaign</WyEyebrow>
          <h2 id="wy-campaign-title">The same voice, <em>out in the world.</em></h2>
          <p>The marketing kit is built from the app&apos;s own parts — the lockup, the library, the gradient, the voice — so a landing page, three store panels and a social post read as one brand.</p>
        </header>
        <Reveal className="wy-campaign__hero">
          <WyFigureView figure={campaignFigures.landing} frame="browser" zoom sizes="(max-width: 1240px) 100vw, 1240px" />
        </Reveal>
        <div className="wy-campaign__pair">
          <Reveal>
            <WyFigureView figure={campaignFigures.appStore} zoom sizes="(max-width: 820px) 100vw, 46vw" />
          </Reveal>
          <Reveal>
            <WyFigureView figure={campaignFigures.social} zoom sizes="(max-width: 820px) 100vw, 46vw" />
          </Reveal>
        </div>
      </section>

      <section className="wy-system" id="system" aria-labelledby="wy-system-title">
        <header className="wy-section-head wy-section-head--dark">
          <WyEyebrow number="01.7">The design system</WyEyebrow>
          <h2 id="wy-system-title">One brand, two platforms, two themes.</h2>
          <p>Rendered from the design-system export. These boards predate v4.2.1, so a few values differ from the tokens above — cream was #FFF9F4 then.</p>
        </header>
        <div className="wy-boards">
          {designSystemFigures.map((figure) => (
            <Reveal key={figure.media} className="wy-boards__item">
              <WyFigureView figure={figure} zoom sizes="(max-width: 820px) 100vw, 46vw" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================ Chapter 02 */}
      <ChapterOpener index={1} />

      <section className="wy-principles" aria-labelledby="wy-principles-title">
        <header className="wy-section-head">
          <WyEyebrow number="02.1">Design principles</WyEyebrow>
          <h2 id="wy-principles-title">Six rules, written before the screens.</h2>
          <p>From the May 2026 design handoff. The case study's title is principle two.</p>
        </header>
        <blockquote className="wy-problem"><p>{productProblem}</p></blockquote>
        <ol className="wy-principles__list">
          {principles.map((item) => (
            <li key={item.id} className={item.id === "P2" ? "is-key" : undefined}>
              <span>{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              {item.note && <p className="wy-principles__note">{item.note}</p>}
            </li>
          ))}
        </ol>
      </section>

      <section className="wy-flows" aria-labelledby="wy-flows-title">
        <header className="wy-section-head wy-section-head--dark">
          <WyEyebrow number="02.2">Information architecture</WyEyebrow>
          <h2 id="wy-flows-title">Map the whole thing before drawing more of it.</h2>
        </header>
        <div className="wy-flows__grid">
          {flowFigures.map((figure, index) => (
            <Reveal key={figure.media} className={`wy-flows__item${index === 0 ? " wy-flows__item--lead" : ""}`}>
              <WyFigureView figure={figure} zoom sizes={index === 0 ? "(max-width: 820px) 100vw, 60vw" : "(max-width: 820px) 100vw, 46vw"} />
            </Reveal>
          ))}
        </div>
        <h3 className="wy-subhead">The tab bar changed three times. The privacy rule didn't.</h3>
        <ol className="wy-navs">
          {navigationEvolution.map((step) => (
            <li key={step.when}>
              <small>{step.when}</small>
              <div className="wy-navs__bar" aria-label={`Tabs: ${step.tabs.join(", ")}`}>
                {step.tabs.map((tab) => <span key={tab}>{tab}</span>)}
              </div>
              <p>{step.note}</p>
              <WyStatusTag status={step.status} />
            </li>
          ))}
        </ol>
      </section>

      <section className="wy-builds" aria-labelledby="wy-builds-title">
        <header className="wy-section-head wy-section-head--dark">
          <WyEyebrow number="02.3">Design to build</WyEyebrow>
          <h2 id="wy-builds-title">The prototype, then the app — side by side.</h2>
          <p>Prototype references are labeled as such. Builds are simulator and emulator captures with fictional test accounts.</p>
        </header>
        {comparisons.map((comparison) => (
          <article className="wy-compare" key={comparison.title} aria-labelledby={`compare-${comparison.title}`}>
            <h3 id={`compare-${comparison.title}`}>{comparison.title}</h3>
            <div className="wy-compare__row">
              <WyFigureView figure={comparison.design} frame="phone" className="wy-compare__design" sizes="(max-width: 820px) 46vw, 18vw" />
              <span className="wy-compare__arrow" aria-hidden="true">→</span>
              {comparison.build.map((figure) => (
                <WyFigureView key={figure.media} figure={figure} frame="phone" sizes="(max-width: 820px) 46vw, 18vw" />
              ))}
            </div>
            <p className="wy-compare__note">{comparison.note}</p>
          </article>
        ))}
      </section>

      <section className="wy-sharing" id="prototype" aria-labelledby="wy-sharing-title">
        <header className="wy-section-head">
          <WyEyebrow number="02.4">The sharing interaction</WyEyebrow>
          <h2 id="wy-sharing-title">One check-in, two rooms.</h2>
          <p>{record.interactionDecision}</p>
        </header>
        <div className="wy-sharing__pair">
          {sharingFigures.map((figure) => (
            <WyFigureView key={figure.media} figure={figure} frame="phone" sizes="(max-width: 820px) 70vw, 24vw" />
          ))}
          <ol className="wy-sharing__steps" aria-label="Core workflow">
            {record.coreWorkflow.map((step, index) => (
              <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>
            ))}
          </ol>
        </div>
        <div className="wy-prototype">
          <p className="wy-prototype__intro">A focused, deterministic version of the decision, built for this portfolio with fictional text — not the app itself. Try both choices.</p>
          <WithYouSharingPrototype />
        </div>
      </section>

      <section className="wy-platforms" aria-labelledby="wy-platforms-title">
        <header className="wy-section-head wy-section-head--dark">
          <WyEyebrow number="02.5">Platform and theme parity</WyEyebrow>
          <h2 id="wy-platforms-title">Same product. Only the chrome changes.</h2>
          <p>The rule from the design system: app components render the same on iOS and Android; only the operating system's chrome differs, and every screen ships light and dark.</p>
        </header>
        <div className="wy-phones">
          {platformFigures.map((figure) => (
            <WyFigureView key={figure.media} figure={figure} frame="phone" sizes="(max-width: 600px) 46vw, (max-width: 1050px) 24vw, 18vw" />
          ))}
        </div>
        <h3 className="wy-subhead">Onboarding as built — June 17, 2026</h3>
        <div className="wy-phones wy-phones--six">
          {onboardingBuild.map((figure) => (
            <WyFigureView key={figure.media} figure={figure} frame="phone" sizes="(max-width: 600px) 46vw, (max-width: 1050px) 30vw, 15vw" />
          ))}
        </div>
      </section>

      <section className="wy-handoff" aria-labelledby="wy-handoff-title">
        <header className="wy-section-head">
          <WyEyebrow number="02.6">Handoff and spec</WyEyebrow>
          <h2 id="wy-handoff-title">Design that engineering can test.</h2>
          <p>Each screen shipped with its components, API, states, copy and acceptance criteria — and the privacy rules as a test matrix.</p>
        </header>
        <div className="wy-handoff__grid">
          {handoffFigures.map((figure) => (
            <WyFigureView key={figure.media} figure={figure} frame="browser" zoom sizes="(max-width: 820px) 100vw, 46vw" />
          ))}
        </div>
        <div className="wy-specs">
          {specFigures.map((figure, index) => (
            <Reveal key={figure.media} className={`wy-specs__item wy-specs__item--${index}`}>
              <WyFigureView figure={figure} zoom sizes="(max-width: 820px) 100vw, 46vw" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================ Chapter 03 */}
      <ChapterOpener index={2} />

      <section className="wy-engineering" id="engineering-system" aria-labelledby="wy-eng-title">
        <header className="wy-section-head">
          <WyEyebrow number="03.1">System</WyEyebrow>
          <h2 id="wy-eng-title">The same promise at every layer.</h2>
          <p>{record.systemDescription}</p>
        </header>
        <figure className="wy-layers" aria-labelledby="wy-layers-caption">
          <ol>
            {visibilityLayers.map((layer, index) => (
              <li key={layer.layer}>
                <span className="wy-layers__step">{String(index + 1).padStart(2, "0")}</span>
                <h3>{layer.layer}</h3>
                <p>{layer.rule}</p>
                <small>{layer.source}</small>
                <WyStatusTag status={layer.status} />
              </li>
            ))}
          </ol>
          <figcaption id="wy-layers-caption"><WyStatusTag status="RETROSPECTIVE ILLUSTRATION" /> Drawn for this page from the architecture documents and the code. A compliant new route doesn't repair a legacy one; one rule shared by every read does.</figcaption>
        </figure>
        <WyFigureView figure={architectureFigure} frame="browser" zoom className="wy-architecture" sizes="(max-width: 820px) 100vw, 70vw" />
        <div className="wy-stack">
          <div>
            <h3>Responsibilities</h3>
            <ul className="wy-rule-list wy-rule-list--ink">{record.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Constraints</h3>
            <ul className="wy-rule-list wy-rule-list--ink">{record.constraints.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Stack</h3>
            <ul className="wy-stack__chips">{withYou.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="wy-code-section" aria-labelledby="wy-code-title">
        <header className="wy-section-head">
          <WyEyebrow number="03.2">Design in code</WyEyebrow>
          <h2 id="wy-code-title">Where the brand and the privacy model live.</h2>
        </header>
        <div className="wy-code-list">
          {codeHighlights.map((item, index) => <WyCodeCard key={item.id} item={item} index={index} repo={repository.name} />)}
        </div>
      </section>

      <section className="wy-qa" aria-labelledby="wy-qa-title">
        <header className="wy-section-head wy-section-head--dark">
          <WyEyebrow number="03.3">What QA caught</WyEyebrow>
          <h2 id="wy-qa-title">Found in testing, fixed in the open.</h2>
        </header>
        <div className="wy-qa__grid">
          <WyFigureView figure={svgErrorFigure} frame="phone" sizes="(max-width: 820px) 60vw, 22vw" />
          <ol className="wy-qa__list">
            {qaCaught.map((item) => (
              <li key={`${item.date}-${item.source}`}>
                <time>{item.date}</time>
                <p>{item.finding}</p>
                <small>{item.source}</small>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================ Evidence */}
      <section className="wy-evidence" id="evidence" aria-labelledby="wy-evidence-title">
        <header className="wy-section-head">
          <WyEyebrow number="04">Results, evidence and limitations</WyEyebrow>
          <h2 id="wy-evidence-title">What exists — and what doesn't yet.</h2>
          <p>{record.evidence[record.evidence.length - 1]}</p>
        </header>
        <ul className="wy-ledger-list">
          {record.implementation.map((item) => (
            <li key={item.claim}><WyStatusTag status={item.status} /><p>{item.claim}</p></li>
          ))}
        </ul>
        <div className="wy-evidence__grid">
          <div>
            <h3>Testing evidence</h3>
            <ul className="wy-check-list">{record.testingEvidence.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Known limitations</h3>
            <ul className="wy-gap-list">{record.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Open research questions</h3>
            <ol className="wy-question-list">{record.openQuestions.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </div>
      </section>

      {/* ============================================================ Reflection */}
      <section className="wy-reflection" id="reflection" aria-labelledby="wy-reflection-title">
        <header className="wy-section-head wy-section-head--dark">
          <WyEyebrow number="05">Reflection and what's next</WyEyebrow>
          <h2 id="wy-reflection-title">What a two-person product taught me.</h2>
        </header>
        <ol className="wy-reflections">
          {reflections.map((item, index) => (
            <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></li>
          ))}
        </ol>
        <div className="wy-roadmap">
          {roadmap.map((track) => (
            <div key={track.track}>
              <h3>{track.track}</h3>
              <ol>{track.items.map((item) => <li key={item}>{item}</li>)}</ol>
              {track.track === "Research" && <small>Proposed research — not completed testing.</small>}
            </div>
          ))}
        </div>
        <Link className="case-link case-link--light wy-related" to={record.relatedFieldNote.path}>
          Related note: {record.relatedFieldNote.title} <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className="wy-close" aria-label="Closing">
        <WyLockup size={34} stacked />
        <p className="wy-close__line">Stay close, even when <em>life</em> gets busy.</p>
        <a className="button wy-button" href="#prototype">Try the sharing prototype <span aria-hidden="true">↑</span></a>
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

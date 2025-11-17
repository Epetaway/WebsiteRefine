import { Helmet } from "react-helmet-async";

export default function ThemeDemo() {
  return (
    <div className="bg-bg-base min-h-screen">
      <Helmet>
        <title>Dark Theme Demo – Earl Hickson Jr.</title>
      </Helmet>

      {/* Hero Section */}
      <section id="summary" className="w-full flex justify-center px-4">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <p className="uppercase text-xs tracking-[0.2em] text-text-muted mb-4">
            SUMMARY
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-accent-yellow mb-6">
            Front-end developer building soulful, accessible web experiences.
          </h2>
          <p className="text-sm md:text-base text-text-secondary max-w-2xl">
            I specialize in modern front-end architectures, design systems, and
            accessibility-first interfaces—especially in healthcare and complex
            enterprise domains. My work blends disciplined engineering with a
            visually expressive, culturally grounded perspective.
          </p>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="w-full flex justify-center px-4">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <p className="uppercase text-xs tracking-[0.2em] text-text-muted mb-8">
            BUTTONS
          </p>
          <div className="flex flex-wrap gap-4">
            {/* Primary CTA */}
            <button className="
              inline-flex items-center justify-center
              rounded-pill px-5 py-2.5
              bg-accent-orange text-text-on-accent
              text-sm font-semibold
              shadow-soft-card
              transition-transform transition-colors
              hover:bg-[#e45834] hover:-translate-y-0.5
            ">
              View Projects
            </button>

            {/* Secondary CTA */}
            <button className="
              inline-flex items-center justify-center
              rounded-pill px-5 py-2.5
              border border-accent-yellow
              text-accent-yellow text-sm font-medium
              transition-colors transition-transform
              hover:bg-accent-yellow hover:text-text-on-accent hover:-translate-y-0.5
            ">
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* Experience Card Section */}
      <section className="w-full flex justify-center px-4">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <p className="uppercase text-xs tracking-[0.2em] text-text-muted mb-8">
            EXPERIENCE CARD (DARK)
          </p>
          
          <article className="
            bg-bg-panel border border-border-subtle
            rounded-card p-5 md:p-6
            shadow-soft-card/40
          ">
            <header className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
              <h3 className="font-display text-lg text-text-primary">
                Front-End Developer
              </h3>
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                Asembia · 2023 – 2024
              </p>
            </header>

            <p className="text-sm text-text-secondary mb-3">
              Built healthcare patient portal UIs with complex multi-step flows, accessibility, and enterprise patterns.
            </p>

            <ul className="list-disc text-sm text-text-secondary pl-5 space-y-1 mb-4">
              <li>Implemented multi-step registration and refill workflows.</li>
              <li>Improved form UX and validation based on stakeholder feedback.</li>
            </ul>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-pill bg-[rgba(61,169,167,0.16)] px-3 py-1 text-xs text-accent-teal">
                React
              </span>
              <span className="inline-flex items-center rounded-pill bg-[rgba(122,63,163,0.16)] px-3 py-1 text-xs text-accent-purple">
                TypeScript
              </span>
              <span className="inline-flex items-center rounded-pill bg-[rgba(242,185,49,0.16)] px-3 py-1 text-xs text-accent-yellow">
                Healthcare UI
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* Light Section Card */}
      <section className="w-full flex justify-center px-4">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <p className="uppercase text-xs tracking-[0.2em] text-text-muted mb-8">
            PROJECT CARD (LIGHT SECTION)
          </p>
          
          <article className="
            bg-bg-alt border border-[#E3DDD0]
            rounded-card p-5 md:p-6
            text-[#1B1B1B]
          ">
            <h3 className="font-display text-xl mb-2">
              Patient Engagement Portal – Demo
            </h3>
            <p className="text-sm text-[#4A4A4A] mb-3">
              SPA that mirrors enterprise-level healthcare patient portals with multi-step flows, auth, and payment UI.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-pill bg-[#EDE1CF] px-3 py-1 text-xs">
                JavaScript
              </span>
              <span className="rounded-pill bg-[#E0D4FF] px-3 py-1 text-xs">
                SPA Architecture
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <a className="text-accent-orange underline-offset-4 hover:underline" href="#">
                Live demo
              </a>
              <a className="text-accent-teal underline-offset-4 hover:underline" href="#">
                View code
              </a>
              <a className="text-text-secondary underline-offset-4 hover:underline" href="#">
                Case study
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Skills Progress Bars */}
      <section className="w-full flex justify-center px-4">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <p className="uppercase text-xs tracking-[0.2em] text-text-muted mb-8">
            SKILLS WITH PROGRESS BARS
          </p>
          
          <div className="space-y-4 max-w-xl">
            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>Frontend Engineering</span>
                <span>90%</span>
              </div>
              <div className="h-2 rounded-pill bg-[#262B31] overflow-hidden">
                <div className="h-full w-[90%] bg-accent-yellow"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>Accessibility & WCAG</span>
                <span>85%</span>
              </div>
              <div className="h-2 rounded-pill bg-[#262B31] overflow-hidden">
                <div className="h-full w-[85%] bg-accent-teal"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>Design Systems</span>
                <span>80%</span>
              </div>
              <div className="h-2 rounded-pill bg-[#262B31] overflow-hidden">
                <div className="h-full w-[80%] bg-accent-purple"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Reference */}
      <section className="w-full flex justify-center px-4">
        <div className="w-full max-w-content py-section-y">
          <h2 className="font-display text-3xl md:text-4xl text-accent-yellow tracking-tight mb-8">
            New Dark Theme Palette
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-text-primary font-display text-lg mb-4">Background Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-bg-base border border-border-subtle"></div>
                  <div>
                    <div className="text-text-primary text-sm">bg-base</div>
                    <div className="text-text-muted text-xs">#050608</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-bg-panel border border-border-subtle"></div>
                  <div>
                    <div className="text-text-primary text-sm">bg-panel</div>
                    <div className="text-text-muted text-xs">#0C1013</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-bg-alt border border-border-subtle"></div>
                  <div>
                    <div className="text-text-primary text-sm">bg-alt</div>
                    <div className="text-text-muted text-xs">#FDF6EC</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-text-primary font-display text-lg mb-4">Accent Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-accent-yellow"></div>
                  <div>
                    <div className="text-text-primary text-sm">accent-yellow</div>
                    <div className="text-text-muted text-xs">#F6B931</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-accent-orange"></div>
                  <div>
                    <div className="text-text-primary text-sm">accent-orange</div>
                    <div className="text-text-muted text-xs">#F2643D</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-accent-teal"></div>
                  <div>
                    <div className="text-text-primary text-sm">accent-teal</div>
                    <div className="text-text-muted text-xs">#3DA9A7</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-accent-purple"></div>
                  <div>
                    <div className="text-text-primary text-sm">accent-purple</div>
                    <div className="text-text-muted text-xs">#7A3FA3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

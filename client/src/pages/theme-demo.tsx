import { Helmet } from "react-helmet-async";

export default function ThemeDemo() {
  return (
    <div className="bg-bg-base min-h-screen">
      <Helmet>
        <title>Dark Theme Demo – Earl Hickson Jr.</title>
      </Helmet>

      {/* Hero Section with Gradient */}
      <section id="summary" className="w-full flex justify-center px-4 bg-gradient-to-br from-bg-base via-[#0A0E12] to-[#0D1419]">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <p className="uppercase text-xs tracking-[0.2em] text-accent-teal mb-4">
            SUMMARY
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-accent-yellow mb-6 leading-tight">
            Front-end developer building soulful, accessible web experiences.
          </h2>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl">
            I specialize in modern front-end architectures, design systems, and
            accessibility-first interfaces—especially in healthcare and complex
            enterprise domains. My work blends disciplined engineering with a
            visually expressive, culturally grounded perspective.
          </p>
        </div>
      </section>

      {/* Buttons Section with Purple Accent Background */}
      <section className="w-full flex justify-center px-4 bg-gradient-to-r from-accent-purple/10 to-accent-teal/10">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <p className="uppercase text-xs tracking-[0.2em] text-accent-purple mb-8">
            CALL TO ACTION BUTTONS
          </p>
          <div className="flex flex-wrap gap-4">
            {/* Primary CTA */}
            <button className="
              inline-flex items-center justify-center
              rounded-pill px-6 py-3
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
              rounded-pill px-6 py-3
              border-2 border-accent-yellow
              text-accent-yellow text-sm font-medium
              transition-colors transition-transform
              hover:bg-accent-yellow hover:text-text-on-accent hover:-translate-y-0.5
            ">
              Download Resume
            </button>

            {/* Teal CTA */}
            <button className="
              inline-flex items-center justify-center
              rounded-pill px-6 py-3
              bg-accent-teal text-text-on-accent
              text-sm font-semibold
              shadow-soft-card
              transition-transform transition-colors
              hover:bg-[#35918f] hover:-translate-y-0.5
            ">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
      {/* Experience Card Section with Orange Glow */}
      <section className="w-full flex justify-center px-4 bg-gradient-to-br from-bg-base to-accent-orange/5">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <p className="uppercase text-xs tracking-[0.2em] text-accent-orange mb-8">
            WORK EXPERIENCE SHOWCASE
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <article className="
              bg-bg-panel border border-accent-orange/30
              rounded-card p-5 md:p-6
              shadow-soft-card/40
              hover:border-accent-orange/60 transition-all duration-300
            ">
              <header className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                <h3 className="font-display text-lg text-text-primary">
                  Front-End Developer
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-accent-orange">
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
                <span className="inline-flex items-center rounded-pill bg-[rgba(242,100,61,0.16)] px-3 py-1 text-xs text-accent-orange">
                  Healthcare UI
                </span>
              </div>
            </article>

            <article className="
              bg-bg-panel border border-accent-teal/30
              rounded-card p-5 md:p-6
              shadow-soft-card/40
              hover:border-accent-teal/60 transition-all duration-300
            ">
              <header className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                <h3 className="font-display text-lg text-text-primary">
                  Senior UI Engineer
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-accent-teal">
                  Tech Corp · 2021 – 2023
                </p>
              </header>

              <p className="text-sm text-text-secondary mb-3">
                Led design system implementation across multiple products, ensuring consistency and accessibility.
              </p>

              <ul className="list-disc text-sm text-text-secondary pl-5 space-y-1 mb-4">
                <li>Built component library used by 50+ developers.</li>
                <li>Improved design-to-code workflow by 40%.</li>
              </ul>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-pill bg-[rgba(246,185,49,0.16)] px-3 py-1 text-xs text-accent-yellow">
                  Vue.js
                </span>
                <span className="inline-flex items-center rounded-pill bg-[rgba(61,169,167,0.16)] px-3 py-1 text-xs text-accent-teal">
                  Design Systems
                </span>
                <span className="inline-flex items-center rounded-pill bg-[rgba(122,63,163,0.16)] px-3 py-1 text-xs text-accent-purple">
                  Figma
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* Light Section Card with Yellow Accent */}
      <section className="w-full flex justify-center px-4 bg-gradient-to-bl from-accent-yellow/10 via-bg-base to-bg-base">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <p className="uppercase text-xs tracking-[0.2em] text-accent-yellow mb-8">
            FEATURED PROJECT
          </p>
          
          <article className="
            bg-bg-alt border border-accent-yellow/40
            rounded-card p-6 md:p-8
            text-[#1B1B1B]
            shadow-soft-card
          ">
            <h3 className="font-display text-2xl md:text-3xl mb-3">
              Patient Engagement Portal – Demo
            </h3>
            <p className="text-base text-[#4A4A4A] mb-4">
              SPA that mirrors enterprise-level healthcare patient portals with multi-step flows, auth, and payment UI.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="rounded-pill bg-[#EDE1CF] px-4 py-1.5 text-sm font-medium">
                JavaScript
              </span>
              <span className="rounded-pill bg-[#E0D4FF] px-4 py-1.5 text-sm font-medium">
                SPA Architecture
              </span>
              <span className="rounded-pill bg-[#FFE8D6] px-4 py-1.5 text-sm font-medium">
                Healthcare
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              <a className="text-accent-orange underline-offset-4 hover:underline flex items-center gap-1" href="#">
                <span>→</span> Live demo
              </a>
              <a className="text-accent-teal underline-offset-4 hover:underline flex items-center gap-1" href="#">
                <span>→</span> View code
              </a>
              <a className="text-accent-purple underline-offset-4 hover:underline flex items-center gap-1" href="#">
                <span>→</span> Case study
              </a>
            </div>
          </article>
        </div>
      </section>
      {/* Skills Progress Bars with Purple Gradient */}
      <section className="w-full flex justify-center px-4 bg-gradient-to-tr from-accent-purple/5 via-bg-base to-accent-teal/5">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <p className="uppercase text-xs tracking-[0.2em] text-accent-purple mb-8">
            TECHNICAL SKILLS & EXPERTISE
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-text-primary font-medium mb-2">
                  <span>Frontend Engineering</span>
                  <span className="text-accent-yellow">90%</span>
                </div>
                <div className="h-3 rounded-pill bg-[#262B31] overflow-hidden border border-border-subtle">
                  <div className="h-full w-[90%] bg-gradient-to-r from-accent-yellow to-accent-orange"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-text-primary font-medium mb-2">
                  <span>Accessibility & WCAG</span>
                  <span className="text-accent-teal">85%</span>
                </div>
                <div className="h-3 rounded-pill bg-[#262B31] overflow-hidden border border-border-subtle">
                  <div className="h-full w-[85%] bg-gradient-to-r from-accent-teal to-accent-purple"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-text-primary font-medium mb-2">
                  <span>Design Systems</span>
                  <span className="text-accent-purple">80%</span>
                </div>
                <div className="h-3 rounded-pill bg-[#262B31] overflow-hidden border border-border-subtle">
                  <div className="h-full w-[80%] bg-gradient-to-r from-accent-purple to-accent-yellow"></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-text-primary font-medium mb-2">
                  <span>Performance Optimization</span>
                  <span className="text-accent-orange">88%</span>
                </div>
                <div className="h-3 rounded-pill bg-[#262B31] overflow-hidden border border-border-subtle">
                  <div className="h-full w-[88%] bg-gradient-to-r from-accent-orange to-accent-yellow"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-text-primary font-medium mb-2">
                  <span>React/TypeScript</span>
                  <span className="text-accent-teal">92%</span>
                </div>
                <div className="h-3 rounded-pill bg-[#262B31] overflow-hidden border border-border-subtle">
                  <div className="h-full w-[92%] bg-gradient-to-r from-accent-teal to-accent-yellow"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-text-primary font-medium mb-2">
                  <span>UI/UX Implementation</span>
                  <span className="text-accent-yellow">87%</span>
                </div>
                <div className="h-3 rounded-pill bg-[#262B31] overflow-hidden border border-border-subtle">
                  <div className="h-full w-[87%] bg-gradient-to-r from-accent-yellow to-accent-teal"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Reference with Vibrant Display */}
      <section className="w-full flex justify-center px-4 bg-gradient-to-r from-accent-purple/10 via-accent-yellow/10 to-accent-teal/10">
        <div className="w-full max-w-content py-section-y">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-accent-yellow via-accent-orange to-accent-teal mb-4">
              Bold Dark Theme Palette
            </h2>
            <p className="text-text-secondary text-lg">Portfolio-grade color system designed to make an impact</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Yellow */}
            <div className="bg-bg-panel rounded-card p-6 border-2 border-accent-yellow/40 hover:border-accent-yellow transition-all duration-300">
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-accent-yellow to-accent-orange mb-4 shadow-lg"></div>
              <h4 className="font-display text-xl text-accent-yellow mb-2">Yellow</h4>
              <p className="text-text-muted text-sm mb-2">#F6B931</p>
              <p className="text-text-secondary text-xs">Headings, highlights, primary accents</p>
            </div>

            {/* Orange */}
            <div className="bg-bg-panel rounded-card p-6 border-2 border-accent-orange/40 hover:border-accent-orange transition-all duration-300">
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-accent-orange to-accent-yellow mb-4 shadow-lg"></div>
              <h4 className="font-display text-xl text-accent-orange mb-2">Orange</h4>
              <p className="text-text-muted text-sm mb-2">#F2643D</p>
              <p className="text-text-secondary text-xs">Primary CTAs, important actions</p>
            </div>

            {/* Teal */}
            <div className="bg-bg-panel rounded-card p-6 border-2 border-accent-teal/40 hover:border-accent-teal transition-all duration-300">
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-accent-teal to-accent-purple mb-4 shadow-lg"></div>
              <h4 className="font-display text-xl text-accent-teal mb-2">Teal</h4>
              <p className="text-text-muted text-sm mb-2">#3DA9A7</p>
              <p className="text-text-secondary text-xs">Links, secondary accents</p>
            </div>

            {/* Purple */}
            <div className="bg-bg-panel rounded-card p-6 border-2 border-accent-purple/40 hover:border-accent-purple transition-all duration-300">
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-accent-purple to-accent-teal mb-4 shadow-lg"></div>
              <h4 className="font-display text-xl text-accent-purple mb-2">Purple</h4>
              <p className="text-text-muted text-sm mb-2">#7A3FA3</p>
              <p className="text-text-secondary text-xs">Tags, special elements</p>
            </div>
          </div>

          {/* Background Samples */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-bg-base border border-border-subtle rounded-card p-6">
              <h4 className="font-display text-text-primary mb-2">Base Background</h4>
              <p className="text-text-muted text-sm">#050608</p>
              <p className="text-text-secondary text-xs mt-2">Main page background</p>
            </div>
            <div className="bg-bg-panel border border-border-subtle rounded-card p-6">
              <h4 className="font-display text-text-primary mb-2">Panel Background</h4>
              <p className="text-text-muted text-sm">#0C1013</p>
              <p className="text-text-secondary text-xs mt-2">Cards and elevated surfaces</p>
            </div>
            <div className="bg-bg-alt border border-accent-yellow/30 rounded-card p-6 text-[#1B1B1B]">
              <h4 className="font-display mb-2">Light Alt</h4>
              <p className="text-[#4A4A4A] text-sm">#FDF6EC</p>
              <p className="text-[#666] text-xs mt-2">Contrast sections</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

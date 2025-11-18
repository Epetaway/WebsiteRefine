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
      <section className="w-full flex justify-center px-4 bg-gradient-to-r from-accent-purple/10 to-accent-raspberry/10">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <p className="uppercase text-xs tracking-[0.2em] text-accent-purple mb-8">
            CALL TO ACTION BUTTONS
          </p>
          <div className="flex flex-wrap gap-4">
            {/* Primary CTA - Raspberry */}
            <button className="
              inline-flex items-center justify-center
              rounded-pill px-6 py-3
              bg-accent-raspberry text-text-primary
              text-sm font-semibold
              shadow-soft-card
              transition-transform transition-colors
              hover:bg-accent-red hover:-translate-y-0.5
            ">
              View Projects
            </button>

            {/* Secondary CTA - Yellow */}
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
              hover:bg-[#6a9d8e] hover:-translate-y-0.5
            ">
              Get In Touch
            </button>

            {/* Purple CTA */}
            <button className="
              inline-flex items-center justify-center
              rounded-pill px-6 py-3
              border-2 border-accent-purple
              text-accent-purple text-sm font-medium
              transition-colors transition-transform
              hover:bg-accent-purple hover:text-text-primary hover:-translate-y-0.5
            ">
              Learn More
            </button>
          </div>
        </div>
      </section>
      {/* Experience Card Section with Raspberry Glow */}
      <section className="w-full flex justify-center px-4 bg-gradient-to-br from-bg-base to-accent-raspberry/5">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <p className="uppercase text-xs tracking-[0.2em] text-accent-raspberry mb-8">
            WORK EXPERIENCE SHOWCASE
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <article className="
              bg-bg-panel border border-accent-raspberry/30
              rounded-card p-5 md:p-6
              shadow-soft-card/40
              hover:border-accent-raspberry/60 transition-all duration-300
            ">
              <header className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                <h3 className="font-display text-lg text-text-primary">
                  Front-End Developer
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-accent-raspberry">
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
                <span className="inline-flex items-center rounded-pill bg-accent-teal/20 px-3 py-1 text-xs text-accent-teal">
                  React
                </span>
                <span className="inline-flex items-center rounded-pill bg-accent-purple/20 px-3 py-1 text-xs text-accent-purple">
                  TypeScript
                </span>
                <span className="inline-flex items-center rounded-pill bg-accent-raspberry/20 px-3 py-1 text-xs text-accent-raspberry">
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
                <span className="inline-flex items-center rounded-pill bg-accent-yellow/20 px-3 py-1 text-xs text-accent-yellow">
                  Vue.js
                </span>
                <span className="inline-flex items-center rounded-pill bg-accent-teal/20 px-3 py-1 text-xs text-accent-teal">
                  Design Systems
                </span>
                <span className="inline-flex items-center rounded-pill bg-accent-purple/20 px-3 py-1 text-xs text-accent-purple">
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
              <a className="text-accent-raspberry underline-offset-4 hover:underline flex items-center gap-1" href="#">
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
      <section className="w-full flex justify-center px-4 bg-gradient-to-tr from-accent-purple/5 via-bg-base to-accent-raspberry/5">
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
                  <div className="h-full w-[90%] bg-gradient-to-r from-accent-yellow to-accent-yellow-light"></div>
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
                  <div className="h-full w-[80%] bg-gradient-to-r from-accent-purple to-accent-raspberry"></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-text-primary font-medium mb-2">
                  <span>Performance Optimization</span>
                  <span className="text-accent-raspberry">88%</span>
                </div>
                <div className="h-3 rounded-pill bg-[#262B31] overflow-hidden border border-border-subtle">
                  <div className="h-full w-[88%] bg-gradient-to-r from-accent-raspberry to-accent-red"></div>
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
      <section className="w-full flex justify-center px-4 bg-gradient-to-r from-accent-purple/10 via-accent-raspberry/10 to-accent-teal/10">
        <div className="w-full max-w-content py-section-y">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-accent-yellow via-accent-raspberry to-accent-teal mb-4">
              Refined Portfolio Color System
            </h2>
            <p className="text-text-secondary text-lg">Modern, sophisticated palette with intentional color choices</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Yellow */}
            <div className="bg-bg-panel rounded-card p-6 border-2 border-accent-yellow/40 hover:border-accent-yellow transition-all duration-300">
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-accent-yellow to-accent-yellow-light mb-4 shadow-lg"></div>
              <h4 className="font-display text-xl text-accent-yellow mb-2">Yellow</h4>
              <p className="text-text-muted text-sm mb-2">#F6C63F</p>
              <p className="text-text-secondary text-xs">Headings, highlights, primary accents</p>
            </div>

            {/* Yellow Light */}
            <div className="bg-bg-panel rounded-card p-6 border-2 border-accent-yellow-light/40 hover:border-accent-yellow-light transition-all duration-300">
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-accent-yellow-light to-accent-yellow mb-4 shadow-lg"></div>
              <h4 className="font-display text-xl text-accent-yellow-light mb-2">Yellow Light</h4>
              <p className="text-text-muted text-sm mb-2">#F4D25B</p>
              <p className="text-text-secondary text-xs">Soft highlights, gradients</p>
            </div>

            {/* Teal */}
            <div className="bg-bg-panel rounded-card p-6 border-2 border-accent-teal/40 hover:border-accent-teal transition-all duration-300">
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-accent-teal to-accent-purple mb-4 shadow-lg"></div>
              <h4 className="font-display text-xl text-accent-teal mb-2">Teal</h4>
              <p className="text-text-muted text-sm mb-2">#7DB5A5</p>
              <p className="text-text-secondary text-xs">Links, calm accents</p>
            </div>

            {/* Red */}
            <div className="bg-bg-panel rounded-card p-6 border-2 border-accent-red/40 hover:border-accent-red transition-all duration-300">
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-accent-red to-accent-raspberry mb-4 shadow-lg"></div>
              <h4 className="font-display text-xl text-accent-red mb-2">Red</h4>
              <p className="text-text-muted text-sm mb-2">#C73538</p>
              <p className="text-text-secondary text-xs">Alerts, strong emphasis</p>
            </div>

            {/* Purple */}
            <div className="bg-bg-panel rounded-card p-6 border-2 border-accent-purple/40 hover:border-accent-purple transition-all duration-300">
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-accent-purple to-accent-teal mb-4 shadow-lg"></div>
              <h4 className="font-display text-xl text-accent-purple mb-2">Purple</h4>
              <p className="text-text-muted text-sm mb-2">#7B3DDB</p>
              <p className="text-text-secondary text-xs">Tags, special elements</p>
            </div>

            {/* Raspberry */}
            <div className="bg-bg-panel rounded-card p-6 border-2 border-accent-raspberry/40 hover:border-accent-raspberry transition-all duration-300">
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-accent-raspberry to-accent-red mb-4 shadow-lg"></div>
              <h4 className="font-display text-xl text-accent-raspberry mb-2">Raspberry</h4>
              <p className="text-text-muted text-sm mb-2">#D94A66</p>
              <p className="text-text-secondary text-xs">Primary CTAs, important actions</p>
            </div>
          </div>

          {/* Background Samples */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-bg-base border border-border-subtle rounded-card p-6">
              <h4 className="font-display text-text-primary mb-2">Black Base</h4>
              <p className="text-text-muted text-sm">#0F0F0F</p>
              <p className="text-text-secondary text-xs mt-2">Main page background</p>
            </div>
            <div className="bg-bg-panel border border-border-subtle rounded-card p-6">
              <h4 className="font-display text-text-primary mb-2">Charcoal Panel</h4>
              <p className="text-text-muted text-sm">#1A1A1A</p>
              <p className="text-text-secondary text-xs mt-2">Cards and elevated surfaces</p>
            </div>
            <div className="bg-bg-alt border border-accent-yellow/30 rounded-card p-6 text-[#1B1B1B]">
              <h4 className="font-display mb-2">Offwhite Alt</h4>
              <p className="text-[#4A4A4A] text-sm">#F7F4E9</p>
              <p className="text-[#666] text-xs mt-2">Contrast sections</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

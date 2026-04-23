import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ui/ScrollReveal";
import aboutImage from "@/images/BLKBELT.png";
import { Mail, MapPin, Github, Linkedin, Twitter, Instagram, Youtube, Dribbble, ArrowRight } from "lucide-react";
import { RESUME_PATH } from "@/data/projects";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Earl Hickson Jr. | Senior Front-End Engineer | React · TypeScript</title>
        <meta
          name="description"
          content="Senior Front-End Engineer in Parsippany, NJ with 6+ years building scalable UI systems, accessible interfaces, and high-performance applications. BJJ instructor, designer, product thinker."
        />
        <link rel="canonical" href="https://www.ehicksonjr.com/about" />
        <meta property="og:title" content="About — Earl Hickson Jr. | Senior Front-End Engineer" />
        <meta property="og:description" content="Senior Front-End Engineer with 6+ years in React, TypeScript, and WCAG 2.1 AA accessible UIs. Healthcare portals, REST APIs, and performance-focused applications." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://www.ehicksonjr.com/about" />
        <meta property="og:image" content="/assets/og/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#0D0D0D] py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] w-full px-5">
          <ScrollReveal animation="slide-up" className="max-w-3xl">
            <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">About Me</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white -tracking-[0.03em] leading-[1.1] mb-6">
              Code, Culture,<br />
              <span className="text-violet-400">and Discipline.</span>
            </h1>
            <p className="text-xl text-[#B7B7B7] leading-relaxed">
              I'm a Senior Front-End Engineer based in Parsippany, NJ with 6+ years building modern, accessible interfaces. My background in graphic design and Brazilian Jiu-Jitsu gives me a structured, disciplined approach to UI engineering.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── BACKGROUND ───────────────────────────────────────────────────── */}
      <section className="bg-[#111111] py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] w-full px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="slide-up">
              <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">Background</p>
              <h2 className="font-display text-4xl font-bold text-white -tracking-[0.03em] leading-[1.1] mb-6">
                Designer turned engineer, always a student.
              </h2>
              <p className="text-[#B7B7B7] text-lg leading-relaxed mb-4">
                I started in graphic design before moving into front-end development, where I discovered how much I enjoy building interfaces that don't just look good — they feel good to use. My work spans healthcare, nonprofits, membership systems, and high-growth brands.
              </p>
              <p className="text-[#7A7A7A] leading-relaxed mb-6">
                Years of Brazilian Jiu-Jitsu training shaped my mindset: discipline, patience, refinement. The same approach fuels how I write code, architect components, and collaborate with teams under pressure.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={RESUME_PATH}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors"
                >
                  Download Resume <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/approach"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#363C42] hover:border-violet-500/60 text-[#B7B7B7] hover:text-white font-medium text-sm transition-colors"
                >
                  My Approach <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade" delay={120}>
              <div className="relative group">
                <img
                  src={aboutImage}
                  alt="Earl Hickson Jr. training Brazilian Jiu-Jitsu"
                  className="w-full rounded-xl object-cover aspect-[4/5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium text-violet-300">Black Belt, Brazilian Jiu-Jitsu</p>
                  <p className="text-xs text-[#B7B7B7]">Discipline in training, precision in code</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CAREER HIGHLIGHTS ────────────────────────────────────────────── */}
      <section className="bg-[#0D0D0D] py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] w-full px-5">
          <ScrollReveal animation="slide-up">
            <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">Experience</p>
            <h2 className="font-display text-4xl font-bold text-white -tracking-[0.03em] leading-[1.1] mb-10">
              Where I've built real things
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                company: "Asembia",
                role: "Front-End Developer",
                period: "Nov 2023 – Sep 2024",
                highlights: ["HIPAA-compliant patient portals", "WCAG 2.1 AA accessibility", "REST API integrations", "React + .NET environment"],
              },
              {
                company: "BroadcastMed",
                role: "Lead Designer & Front-End Developer",
                period: "Aug 2021 – Feb 2023",
                highlights: ["+18% lead submissions", "−25% email production time", "Healthcare marketing microsites", "Design system creation"],
              },
            ].map(({ company, role, period, highlights }, idx) => (
              <ScrollReveal key={idx} animation="slide-up" delay={idx * 60}>
                <div className="bg-[#111111] border border-[#20252A] rounded-xl p-6 hover:border-violet-500/40 smooth-card h-full">
                  <p className="text-xs text-violet-400 font-medium mb-1">{period}</p>
                  <h3 className="text-lg font-bold text-white mb-1">{company}</h3>
                  <p className="text-sm text-[#7A7A7A] mb-4">{role}</p>
                  <ul className="space-y-1.5">
                    {highlights.map((h) => (
                      <li key={h} className="text-sm text-[#B7B7B7] flex items-start gap-2">
                        <span className="text-violet-500 mt-0.5 flex-shrink-0">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONNECT ──────────────────────────────────────────────────────── */}
      <section className="bg-[#111111] py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] w-full px-5">
          <ScrollReveal animation="slide-up">
            <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">Get In Touch</p>
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Contact info */}
              <div>
                <h2 className="font-display text-4xl font-bold text-white -tracking-[0.03em] leading-[1.1] mb-6">
                  Let's connect.
                </h2>
                <div className="space-y-4 mb-8">
                  <a
                    href="mailto:e@ehicksonjr.com"
                    className="flex items-center gap-3 text-[#B7B7B7] hover:text-violet-400 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    e@ehicksonjr.com
                  </a>
                  <div className="flex items-center gap-3 text-[#7A7A7A]">
                    <MapPin className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    Parsippany, NJ
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="text-sm text-[#7A7A7A] mb-4">Find me online</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { icon: Github, label: "GitHub", href: "https://github.com/Epetaway" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/earlhicksonjr" },
                    { icon: Twitter, label: "X (Twitter)", href: "https://twitter.com/epetaway" },
                    { icon: Instagram, label: "Instagram", href: "https://instagram.com/earld.kaiju" },
                    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@earldkaiju" },
                    { icon: Dribbble, label: "Dribbble", href: "https://dribbble.com/earldkaiju" },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#363C42] text-[#B7B7B7] hover:border-violet-500/50 hover:text-white smooth-btn text-sm font-medium"
                    >
                      <Icon className="w-4 h-4 text-violet-400" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0D0D0D] via-violet-950/30 to-[#0D0D0D] border-t border-[#20252A]">
        <div className="mx-auto max-w-[1120px] w-full px-5 py-20">
          <ScrollReveal animation="slide-up">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h2 className="font-display text-4xl font-bold text-white -tracking-[0.03em] leading-[1.1]">
                  Let's work together.
                </h2>
                <p className="text-[#B7B7B7] text-lg leading-relaxed">
                  Open to senior front-end roles, contract work, and collaborations on products that care about accessibility, performance, and real impact.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
                >
                  Get In Touch <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#363C42] hover:border-violet-500/60 text-[#B7B7B7] hover:text-white font-medium transition-colors"
                >
                  View My Work <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

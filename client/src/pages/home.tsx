import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Section } from "@/components/layout/Section";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Zap, Accessibility, Layers, Shield, Code2, Monitor, Blocks, Scale, Users, ArrowRight } from "lucide-react";
import { RESUME_PATH } from "@/data/projects";
import { resolveCaseStudySlug } from "@/data/caseStudies";
import justMeImg from "@/images/justMe.png";
import { ProjectCardStandard, ProjectCardCTA } from "@/components/ui/ProjectCard";
import { GITHUB_USER } from "@/lib/projects";

const featuredCardProjects = [
  {
    slug: "Gundam-Forge",
    displayTitle: "Gundam Forge",
    shortTitle: "Gundam Forge",
    subtitle: "Deck Builder & Simulator",
    description: "A deck-building web app for Gundam card game players to create, test, and refine decks.",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    repoUrl: `https://github.com/${GITHUB_USER}/Gundam-Forge`,
    liveUrl: "https://epetaway.github.io/Gundam-Forge/",
    category: "Full-Stack",
    githubUser: GITHUB_USER,
    image: "/images/gundam-forge/gundam_card.png",
    caseStudySlug: resolveCaseStudySlug("Gundam-Forge"),
  },
  {
    slug: "DojoNet-Prototype-MAX",
    displayTitle: "DojoNet",
    shortTitle: "DojoNet",
    subtitle: "Martial Arts Portal",
    description: "A prototype membership and class scheduling system for martial arts schools.",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    repoUrl: `https://github.com/${GITHUB_USER}/DojoNet-Prototype-MAX`,
    liveUrl: "https://epetaway.github.io/DojoNet-Prototype-MAX/#/dashboard",
    category: "Front-End",
    githubUser: GITHUB_USER,
    image: "/images/dojonet/dojonet_card.png",
    caseStudySlug: resolveCaseStudySlug("DojoNet-Prototype-MAX"),
  },
  {
    slug: "WithYou",
    displayTitle: "WithYou",
    shortTitle: "WithYou",
    subtitle: "Relationship Wellness App",
    description: "A privacy-first relationship app built to encourage meaningful connection through intentional communication.",
    techStack: ["React Native", "Node.js", "PostgreSQL"],
    repoUrl: `https://github.com/${GITHUB_USER}/WithYou`,
    category: "Mobile / Full-Stack",
    githubUser: GITHUB_USER,
    image: "/images/withyou/withyou_card.png",
    caseStudySlug: resolveCaseStudySlug("WithYou"),
  },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Earl Hickson Jr. | Senior Front-End Engineer — React, TypeScript | Parsippany, NJ</title>
        <meta
          name="description"
          content="Senior Front-End Engineer with 6+ years building scalable UI systems, accessible interfaces, and high-performance applications across healthcare, media, and high-growth platforms. Based in Parsippany, NJ."
        />
        <link rel="canonical" href="https://www.ehicksonjr.com/" />
        <meta property="og:title" content="Earl Hickson Jr. | Senior Front-End Engineer — React, TypeScript" />
        <meta property="og:description" content="Senior Front-End Engineer specializing in scalable UI systems, performance optimization, and real-world product impact. 6+ years across healthcare, media, and high-growth platforms." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ehicksonjr.com/" />
        <meta property="og:image" content="/assets/og/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Earl Hickson Jr. | Senior Front-End Engineer — React, TypeScript" />
        <meta name="twitter:description" content="Senior Front-End Engineer specializing in scalable UI systems, performance optimization, and real-world product impact." />
        <meta name="twitter:image" content="/assets/og/og-image.jpg" />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0D0D0D] overflow-hidden lg:min-h-[92vh] lg:flex lg:items-center">
        {/* Photo — desktop only, absolutely positioned on right */}
        <ScrollReveal animation="fade" delay={100} className="absolute inset-y-0 right-0 w-[52%] hidden lg:block pointer-events-none select-none">
          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent z-10" />
          <img
            src={justMeImg}
            alt="Earl Hickson Jr."
            className="w-full h-full object-cover object-[center_15%]"
          />
        </ScrollReveal>

        {/* Content — text block + mobile portrait stacked */}
        <div className="relative z-10 mx-auto max-w-[1120px] w-full px-5 py-16 lg:py-24">
          <ScrollReveal animation="slide-up" className="space-y-6 max-w-[580px]">
            <p className="text-xs tracking-widest uppercase text-violet-400 font-medium">
              Front-End Engineer
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[64px] font-bold text-white leading-[1.05] -tracking-[0.03em]">
              Building high-performance interfaces that{" "}
              <span className="text-violet-400">actually move the business.</span>
            </h1>
            <p className="text-lg text-[#B7B7B7] leading-relaxed">
              Senior Front-End Engineer specializing in scalable UI systems, performance optimization, and real-world product impact.
            </p>
            <p className="text-base text-[#7A7A7A]">
              6+ years delivering production-ready experiences across healthcare, media, and high-growth platforms.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium smooth-btn"
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#363C42] hover:border-violet-500/60 text-[#B7B7B7] hover:text-white font-medium smooth-btn"
              >
                Let's Connect <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Portrait — mobile/tablet only, shown below CTA buttons */}
          <ScrollReveal animation="fade" delay={200} className="lg:hidden mt-10 -mx-5">
            <div className="relative w-full overflow-hidden">
              <img
                src={justMeImg}
                alt="Earl Hickson Jr."
                className="w-full h-[520px] sm:h-[640px] object-cover object-[center_15%]"
              />
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
      <section className="bg-[#0D0D0D]">
        <div className="mx-auto max-w-[1120px] w-full px-5 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Zap, metric: "18%", label: "Improved Lighthouse performance" },
              { icon: Accessibility, metric: "WCAG 2.1 AA", label: "Accessibility implementation" },
              { icon: Layers, metric: "Reusable", label: "Component systems across React & Angular" },
              { icon: Shield, metric: "HIPAA", label: "Healthcare dashboards & secure environments" },
            ].map(({ icon: Icon, metric, label }, idx) => (
              <ScrollReveal key={idx} animation="slide-up" delay={idx * 60}>
                <div className="border border-[#20252A] rounded-xl p-5 flex flex-col items-center text-center gap-2 hover:border-violet-500/40 smooth-card">
                  <Icon className="w-6 h-6 text-violet-400" />
                  <span className="text-xl font-bold text-white">{metric}</span>
                  <span className="text-xs text-[#7A7A7A] leading-snug">{label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT I DO ────────────────────────────────────────────────────── */}
      <Section className="bg-[#0D0D0D]">
        <ScrollReveal animation="slide-up">
          <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">What I Do</p>
          <div className="grid lg:grid-cols-2 gap-6 mb-12 items-end">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white -tracking-[0.03em] leading-[1.1]">
              I don't just build UIs — I build systems that scale.
            </h2>
            <p className="text-[#B7B7B7] text-lg leading-relaxed">
              I specialize in turning complex product requirements into clean, maintainable, and high-performing front-end architectures.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Code2,
              title: "Modern Front-End Development",
              desc: "Building responsive, production-grade applications using React, Angular, and TypeScript with a focus on performance and scalability.",
            },
            {
              icon: Monitor,
              title: "UI/UX Implementation",
              desc: "Translating design into polished, intuitive interfaces that feel smooth, intentional, and user-focused.",
            },
            {
              icon: Blocks,
              title: "Reusable Component Architecture",
              desc: "Creating systems—not one-offs—so teams can move faster, ship consistently, and scale without breaking things.",
            },
          ].map(({ icon: Icon, title, desc }, idx) => (
            <ScrollReveal key={idx} animation="slide-up" delay={idx * 80}>
              <div className="bg-[#111111] border border-[#20252A] rounded-xl p-6 hover:border-violet-500/40 smooth-card h-full">
                <Icon className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#7A7A7A] leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── FEATURED WORK ────────────────────────────────────────────────── */}
      <Section className="bg-[#0D0D0D]">
        <ScrollReveal animation="slide-up">
          <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-2">Featured Work</p>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white -tracking-[0.03em]">
              Selected Work
            </h2>
            <Link
              to="/projects"
              className="hidden md:inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
            >
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* 4-column card grid — 3 project cards + 1 CTA card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredCardProjects.map((project, idx) => (
            <ScrollReveal key={project.slug} animation="slide-up" delay={idx * 60}>
              <ProjectCardStandard project={project} />
            </ScrollReveal>
          ))}
          <ScrollReveal animation="slide-up" delay={featuredCardProjects.length * 60}>
            <ProjectCardCTA
              headline="Ready to see the full picture?"
              subline="Browse the complete project archive — case studies, demos, and live work."
              ctaLabel="View All Work"
              ctaHref="/projects"
            />
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fade" delay={200}>
          <div className="mt-8 md:hidden text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── HOW I THINK ──────────────────────────────────────────────────── */}
      <Section className="bg-[#0D0D0D]">
        <ScrollReveal animation="slide-up">
          <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">How I Think</p>
          <div className="grid lg:grid-cols-2 gap-6 mb-12 items-end">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white -tracking-[0.03em] leading-[1.1]">
              I think like a developer, designer, and product owner.
            </h2>
            <div className="space-y-2">
              <p className="text-[#B7B7B7] text-lg">I don't just take tickets and build screens.</p>
              <p className="text-[#7A7A7A]">I think about:</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Scale,
              text: "How this scales in 6 months",
            },
            {
              icon: Users,
              text: "How users actually interact with it",
            },
            {
              icon: Code2,
              text: "That mindset is what separates clean code from real product engineering.",
            },
          ].map(({ icon: Icon, text }, idx) => (
            <ScrollReveal key={idx} animation="slide-up" delay={idx * 80} className="h-full">
              <div className="bg-[#111111] border border-[#20252A] rounded-xl p-6 hover:border-violet-500/40 smooth-card flex gap-4 items-start h-full min-h-[100px]">
                <Icon className="w-6 h-6 text-violet-400 flex-shrink-0 mt-0.5" />
                <p className="text-[#B7B7B7] leading-relaxed">{text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── ABOUT PREVIEW ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[560px] sm:min-h-[640px] lg:min-h-[680px] flex items-end">
        {/* Mobile background (portrait) */}
        <div
          className="absolute inset-0 bg-cover bg-center lg:hidden"
          style={{ backgroundImage: "url('/images/about/more-than-just-mobile.png')" }}
        />
        {/* Desktop background (landscape) */}
        <div
          className="absolute inset-0 bg-cover bg-center hidden lg:block"
          style={{ backgroundImage: "url('/images/about/more-than-just-desktop.png')" }}
        />
        {/* Right-side overlay for text legibility on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:bg-gradient-to-l lg:from-black/55 lg:via-black/20 lg:to-transparent" />

        <div className="relative z-10 w-full px-5 py-10 lg:py-14">
          <div className="mx-auto max-w-[1320px] flex justify-center lg:justify-end">
            <ScrollReveal animation="slide-up" className="space-y-5 max-w-sm text-center lg:text-left lg:pr-10">
              <p className="text-white/90 text-lg leading-relaxed">
                I'm a front-end engineer, designer, and Brazilian Jiu-Jitsu instructor. I bring discipline, creativity, and problem-solving into everything I build—whether it's a UI system or a training session.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors"
              >
                View About Me <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0D0D0D] via-violet-950/30 to-[#0D0D0D]">
        <div className="mx-auto max-w-[1120px] w-full px-5 py-20">
          <ScrollReveal animation="slide-up">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white -tracking-[0.03em] leading-[1.1]">
                  Let's build something that actually works.
                </h2>
                <p className="text-[#B7B7B7] text-lg leading-relaxed">
                  If you're looking for someone who can deliver clean UI, strong architecture, and real impact—I'm ready.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium smooth-btn"
                >
                  Contact Me <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#363C42] hover:border-violet-500/60 text-[#B7B7B7] hover:text-white font-medium smooth-btn"
                >
                  View Resume
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

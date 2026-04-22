import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Section } from "@/components/layout/Section";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Zap, Accessibility, Layers, Shield, Code2, Monitor, Blocks, Scale, Users, ArrowRight } from "lucide-react";
import { RESUME_PATH } from "@/data/projects";
import { resolveCaseStudySlug } from "@/data/caseStudies";
import justMeImg from "@/images/justMe.png";
import earlBjjPhoto from "@/images/earl-bjj-photo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const featuredProjects = [
  {
    title: "Gundam Forge",
    description: "A deck-building web app for Gundam card game players to create, test, and refine decks.",
    tech: ["React", "TypeScript", "Firebase"],
    image: "https://opengraph.githubassets.com/1/Epetaway/Gundam-Forge",
    slug: "Gundam-Forge",
  },
  {
    title: "DojoNet",
    description: "A prototype membership and class scheduling system for martial arts schools, focused on UX clarity and clean front-end patterns.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    image: "https://opengraph.githubassets.com/1/Epetaway/DojoNet-Prototype-MAX",
    slug: "DojoNet-Prototype-MAX",
  },
  {
    title: "WithYou",
    description: "A privacy-first relationship app that encourages meaningful connection through intentional communication.",
    tech: ["React Native", "Node.js", "PostgreSQL"],
    image: "https://opengraph.githubassets.com/1/Epetaway/WithYou",
    slug: "WithYou",
  },
  {
    title: "AMA Fight Club",
    description: "Redesigned the website and marketing strategy resulting in significant SEO and lead growth.",
    tech: ["WordPress", "SEO", "Analytics"],
    image: null,
    slug: "ama-fight-club",
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
      <section className="relative bg-slate-950 min-h-[92vh] flex items-center overflow-hidden">
        {/* Photo — positioned absolutely, bleeds to the right edge */}
        <ScrollReveal animation="fade" delay={100} className="absolute inset-y-0 right-0 w-[52%] hidden lg:block pointer-events-none select-none">
          {/* Left fade — blends photo into page bg */}
          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
          <img
            src={justMeImg}
            alt="Earl Hickson Jr."
            className="w-full h-full object-cover object-[center_15%]"
          />
        </ScrollReveal>

        {/* Text — sits on top inside the container */}
        <div className="relative z-10 mx-auto max-w-[1120px] w-full px-5 py-24">
          <ScrollReveal animation="slide-up" className="space-y-6 max-w-[580px]">
            <p className="text-xs tracking-widest uppercase text-violet-400 font-medium">
              Front-End Engineer
            </p>
            <h1 className="text-5xl md:text-[64px] font-bold text-white leading-[1.05] -tracking-[0.03em]">
              Building high-performance interfaces that{" "}
              <span className="text-violet-400">actually move the business.</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Senior Front-End Engineer specializing in scalable UI systems, performance optimization, and real-world product impact.
            </p>
            <p className="text-base text-slate-400">
              6+ years delivering production-ready experiences across healthcare, media, and high-growth platforms.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 hover:border-violet-500/60 text-slate-300 hover:text-white font-medium transition-colors"
              >
                Let's Connect <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
      <section className="bg-slate-900 border-y border-slate-800">
        <div className="mx-auto max-w-[1120px] w-full px-5 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Zap, metric: "18%", label: "Improved Lighthouse performance" },
              { icon: Accessibility, metric: "WCAG 2.1 AA", label: "Accessibility implementation" },
              { icon: Layers, metric: "Reusable", label: "Component systems across React & Angular" },
              { icon: Shield, metric: "HIPAA", label: "Healthcare dashboards & secure environments" },
            ].map(({ icon: Icon, metric, label }, idx) => (
              <ScrollReveal key={idx} animation="slide-up" delay={idx * 60}>
                <div className="border border-slate-800 rounded-xl p-5 flex flex-col items-center text-center gap-2 hover:border-violet-500/40 transition-colors">
                  <Icon className="w-6 h-6 text-violet-400" />
                  <span className="text-xl font-bold text-white">{metric}</span>
                  <span className="text-xs text-slate-400 leading-snug">{label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT I DO ────────────────────────────────────────────────────── */}
      <Section className="bg-slate-950">
        <ScrollReveal animation="slide-up">
          <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">What I Do</p>
          <div className="grid lg:grid-cols-2 gap-6 mb-12 items-end">
            <h2 className="text-4xl md:text-5xl font-bold text-white -tracking-[0.03em] leading-[1.1]">
              I don't just build UIs — I build systems that scale.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
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
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-violet-500/40 transition-colors h-full">
                <Icon className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── FEATURED WORK ────────────────────────────────────────────────── */}
      <Section className="bg-slate-900">
        <ScrollReveal animation="slide-up">
          <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-2">Featured Work</p>
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white -tracking-[0.03em]">
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

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={false}
          className="pb-12"
        >
          {featuredProjects.map(({ title, description, tech, image, slug }, idx) => {
            const caseStudySlug = resolveCaseStudySlug(slug) ?? slug;

            return (
            <SwiperSlide key={idx} className="!w-auto">
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-violet-500/40 transition-colors group flex flex-col h-full min-h-[420px]">
                <div className="aspect-video bg-slate-800 overflow-hidden flex-shrink-0">
                  {image ? (
                    <img
                      src={image}
                      alt={`${title} preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-900/60 to-slate-800 flex items-center justify-center">
                      <span className="text-slate-500 text-sm font-medium">{title}</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tech.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/projects/${caseStudySlug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors"
                  >
                    View Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            );
          })}
        </Swiper>

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
      <Section className="bg-slate-950">
        <ScrollReveal animation="slide-up">
          <p className="text-xs tracking-widest uppercase text-violet-400 font-medium mb-4">How I Think</p>
          <div className="grid lg:grid-cols-2 gap-6 mb-12 items-end">
            <h2 className="text-4xl md:text-5xl font-bold text-white -tracking-[0.03em] leading-[1.1]">
              I think like a developer, designer, and product owner.
            </h2>
            <div className="space-y-2">
              <p className="text-slate-300 text-lg">I don't just take tickets and build screens.</p>
              <p className="text-slate-400">I think about:</p>
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
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-violet-500/40 transition-colors flex gap-4 items-start h-full min-h-[100px]">
                <Icon className="w-6 h-6 text-violet-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed">{text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── ABOUT PREVIEW ────────────────────────────────────────────────── */}
      <section className="bg-[#F7BC0A]">
        <div className="mx-auto max-w-[1320px] w-full px-5 py-10 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal animation="fade" delay={100}>
              <div className="overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                <img
                  src={earlBjjPhoto}
                  alt="Earl Hickson Jr."
                  className="w-full h-[440px] sm:h-[560px] lg:h-[720px] object-cover object-center"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" className="space-y-6 lg:pr-10">
              <p className="text-xs tracking-widest uppercase text-slate-800 font-medium">About Me</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 -tracking-[0.03em] leading-[1.1]">
                More than just code.
              </h2>
              <p className="text-slate-900/90 text-lg leading-relaxed max-w-xl">
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
      <section className="bg-gradient-to-br from-slate-950 via-violet-950/30 to-slate-950 border-t border-slate-800">
        <div className="mx-auto max-w-[1120px] w-full px-5 py-20">
          <ScrollReveal animation="slide-up">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white -tracking-[0.03em] leading-[1.1]">
                  Let's build something that actually works.
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  If you're looking for someone who can deliver clean UI, strong architecture, and real impact—I'm ready.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
                >
                  Contact Me <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 hover:border-violet-500/60 text-slate-300 hover:text-white font-medium transition-colors"
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

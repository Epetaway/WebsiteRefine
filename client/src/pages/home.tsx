import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/layout/Section";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/layout/SectionHeader";
import TypewriterCode from "@/components/ui/TypewriterCode";
import { Palette, Zap, Sparkles, Rocket, Github, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useMemo } from "react";
import { getFeaturedProjects, GITHUB_USER, type Project } from "@/lib/projects";
import { RESUME_PATH } from "@/data/projects";

/** FeaturedItem type for rendering project cards */
type FeaturedItem = {
  slug: string;
  title: string;
  description: string;
  link: string;
  image: string;
  tech: string[];
  kind: 'github' | 'brand';
  html_url: string;
  homepage: string | null;
  hasCaseStudy: boolean;
};

/**
 * Convert a Project from lib/projects to a FeaturedItem for display
 */
function projectToFeaturedItem(project: Project): FeaturedItem {
  return {
    slug: project.slug,
    title: project.displayTitle,
    description: project.description,
    link: project.repoUrl,
    image: `https://opengraph.githubassets.com/1/${GITHUB_USER}/${project.slug}`,
    tech: project.techStack.slice(0, 6),
    kind: 'github',
    html_url: project.repoUrl,
    homepage: project.liveUrl || null,
    hasCaseStudy: hasCaseStudy(project.slug),
  };
}

export default function Home() {
  const navigate = useNavigate();
  
  // Use centralized project data from lib/projects.ts
  const featured = useMemo<FeaturedItem[]>(() => {
    const projects = getFeaturedProjects(4);
    return projects.map(projectToFeaturedItem);
  }, []);
  return (
    <>
      <Helmet>
        <title>Earl Hickson | Full Stack Developer & Designer</title>
        <meta
          name="description"
          content="Full stack developer and designer crafting elegant digital experiences with code, creativity, and discipline."
        />
      </Helmet>

      {/* Hero Section */}
      <Section className="min-h-[90vh] flex items-center bg-gray-50 dark:bg-slate-950">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal animation="slide-up" className="space-y-6">
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
              Open to new opportunities
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-slate-50">
              Building digital experiences with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500 dark:from-blue-400 dark:to-emerald-400">
                code & creativity
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-slate-300 max-w-xl">
              Full stack developer and designer specializing in thoughtful brand identities, 
              robust web applications, and user experiences that resonate. Bringing discipline 
              from the jiu-jitsu mat to clean, maintainable code.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/contact" className="btn-secondary">
                Get in Touch
              </Link>
              <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="btn-primary" download>
                Get Resume
              </a>
            </div>
          </ScrollReveal>

          {/* Code Editor Card with float animation and typing effect */}
          <ScrollReveal animation="scale" delay={150}>
            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 p-1 shadow-2xl float-soft card-hover">
              <div className="bg-gray-50 dark:bg-slate-950 rounded-lg overflow-hidden">
                {/* Editor Header */}
                <div className="bg-gray-100 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-slate-400 ml-3 font-mono">earl-hickson.ts</span>
                </div>
                {/* Code Content with Typing Animation */}
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <TypewriterCode startDelay={800} charDelay={25}>
                    <div className="space-y-1">
                      <div>
                        <span className="text-purple-600 dark:text-purple-400">interface</span>{" "}
                        <span className="text-blue-600 dark:text-blue-400">Developer</span>{" "}
                        <span className="text-gray-500 dark:text-slate-500">{"{"}</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-gray-600 dark:text-slate-400">name:</span>{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">"Earl Hickson"</span>
                        <span className="text-gray-500 dark:text-slate-500">;</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-gray-600 dark:text-slate-400">role:</span>{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">"Full Stack Developer"</span>
                        <span className="text-gray-500 dark:text-slate-500">;</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-gray-600 dark:text-slate-400">skills:</span>{" "}
                        <span className="text-gray-500 dark:text-slate-500">{"["}</span>
                      </div>
                      <div className="pl-8">
                        <span className="text-emerald-600 dark:text-emerald-400">"React"</span>
                        <span className="text-gray-500 dark:text-slate-500">,</span>{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">"TypeScript"</span>
                        <span className="text-gray-500 dark:text-slate-500">,</span>
                      </div>
                      <div className="pl-8">
                        <span className="text-emerald-600 dark:text-emerald-400">"Node.js"</span>
                        <span className="text-gray-500 dark:text-slate-500">,</span>{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">"UI/UX Design"</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-gray-500 dark:text-slate-500">{"];"}</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-gray-600 dark:text-slate-400">passion:</span>{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">"Building & BJJ"</span>
                        <span className="text-gray-500 dark:text-slate-500">;</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-slate-500">{"}"}</span>
                      </div>
                    </div>
                  </TypewriterCode>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </Section>

      {/* Featured Work (GitHub Repos) - Carousel */}
      <Section className="bg-gray-100 dark:bg-slate-900">
        <ScrollReveal animation="slide-up">
          <SectionHeader 
            preLabel="// Featured Work"
            title="GitHub Pinned Repositories" 
            description="A few recent repositories from my GitHub"
          />
        </ScrollReveal>
        <ScrollReveal animation="fade" delay={100}>
          <Swiper
            spaceBetween={24}
            slidesPerView={1.05}
            breakpoints={{
              640: { slidesPerView: 1.4, spaceBetween: 24 },
              768: { slidesPerView: 2.1, spaceBetween: 24 },
              1024: { slidesPerView: 3.1, spaceBetween: 24 },
            }}
          >
            {featured.map((item, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <Card 
                  className={`bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-[#388d5d]/50 transition-all duration-300 overflow-hidden h-full flex flex-col max-w-[397px] mx-auto rounded-2xl card-hover group ${item.hasCaseStudy ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    if (item.hasCaseStudy) {
                      navigate(`/projects/${item.slug}`);
                    }
                  }}
                >
                  <div className="aspect-video bg-gray-100 dark:bg-slate-700/50 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={`${item.title} preview`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col min-h-[280px]">
                    {item.tech && (
                      <div className="flex flex-wrap gap-1.5 mb-3 min-h-[28px]">
                        {item.tech.slice(0, 3).map((t) => (
                          <span key={t} className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs text-slate-700 dark:text-slate-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors line-clamp-2 min-h-[56px]">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-300/90 mb-3 text-sm leading-relaxed line-clamp-3 min-h-[60px]">{item.description}</p>
                    {item.kind === 'github' && (
                      <div className="mt-auto flex flex-wrap gap-2">
                        <a 
                          href={item.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-3.5 w-3.5" />
                          View Code
                        </a>
                        {item.homepage && (
                          <a 
                            href={item.homepage} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </ScrollReveal>

        <ScrollReveal animation="fade" delay={200}>
          <div className="text-center mt-12">
            <Link to="/projects">
              <Button variant="outline" size="lg" className="border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800">
                View All Projects
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Section>

      {/* How I Work */}
      <Section className="bg-white dark:bg-slate-950">
        <ScrollReveal animation="slide-up">
          <SectionHeader 
            preLabel="// Approach & Services"
            title="Approach & Services" 
            description="Clear process. Practical engineering. Thoughtful design. Everything tuned for outcomes."
          />
        </ScrollReveal>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: How I Work */}
          <div className="space-y-4">
            {[
              { step: "01", title: "Discover", desc: "Align on goals, audience, and constraints. Surface risks early." },
              { step: "02", title: "Define", desc: "Shape scope, architecture, and success metrics that fit reality." },
              { step: "03", title: "Design & Build", desc: "Prototype quickly. Ship in tight loops. Test and refine." },
              { step: "04", title: "Launch & Iterate", desc: "Measure impact, improve performance, document, and support." },
            ].map((phase, idx) => (
              <ScrollReveal key={idx} animation="slide-up" delay={idx * 50}>
                <Card className="bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800 p-6 hover:border-[#388d5d]/40 transition-colors card-hover">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-0.5 w-10">{phase.step}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-1">{phase.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{phase.desc}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Right: What I Do */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Zap,
                title: "Product Engineering",
                description: "React, TypeScript, Node, Postgres. Fast, accessible, and maintainable by default.",
              },
              {
                icon: Sparkles,
                title: "UI/UX Design",
                description: "From wireframes to production visuals. Design systems that scale without noise.",
              },
              {
                icon: Palette,
                title: "Brand Systems",
                description: "Logos, typography, color, and usage. Cohesive identities with real-world rules.",
              },
              {
                icon: Rocket,
                title: "Growth & Ops",
                description: "Analytics, A/B testing, SEO, and CI/CD to keep velocity high and risk low.",
              },
            ].map((service, idx) => (
              <ScrollReveal key={idx} animation="slide-up" delay={idx * 50}>
                <Card className="bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800 p-6 hover:border-[#388d5d]/40 transition-colors card-hover">
                  <service.icon className="h-9 w-9 text-emerald-600 dark:text-emerald-400 mb-3" />
                  <h3 className="text-base font-semibold text-gray-900 dark:text-slate-50 mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{service.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* About Preview */}
      <Section className="bg-gray-100 dark:bg-slate-950">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal animation="slide-up">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-slate-50">
                Code, Culture, Discipline
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
                As a full stack developer and Brazilian Jiu-Jitsu practitioner, I bring 
                the same dedication to both crafts. The discipline, problem-solving, and 
                resilience from the mats translates directly to writing clean code and 
                building robust applications.
              </p>
              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
                Whether it's designing a brand identity or architecting a complex system, 
                I approach every project with thoughtfulness, precision, and a commitment 
                to continuous improvement.
              </p>
              <Link to="/about" className="btn-secondary">
                More About Me
              </Link>
            </div>
          </ScrollReveal>

          {/* Code Editor Card with float animation and typing effect */}
          <ScrollReveal animation="scale" delay={120}>
            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 p-1 shadow-xl card-hover float-soft">
            <div className="bg-gray-50 dark:bg-slate-950 rounded-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-slate-400 ml-3 font-mono">philosophy.ts</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed">
                <TypewriterCode startDelay={600} charDelay={30}>
                  <div className="space-y-1">
                    <div>
                      <span className="text-purple-600 dark:text-purple-400">const</span>{" "}
                      <span className="text-blue-600 dark:text-blue-400">approach</span>{" "}
                      <span className="text-gray-500 dark:text-slate-500">=</span>{" "}
                      <span className="text-gray-500 dark:text-slate-500">{"{"}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-gray-600 dark:text-slate-400">mindset:</span>{" "}
                      <span className="text-emerald-600 dark:text-emerald-400">"Continuous improvement"</span>
                      <span className="text-gray-500 dark:text-slate-500">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-gray-600 dark:text-slate-400">process:</span>{" "}
                      <span className="text-emerald-600 dark:text-emerald-400">"Deliberate practice"</span>
                      <span className="text-gray-500 dark:text-slate-500">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-gray-600 dark:text-slate-400">outcome:</span>{" "}
                      <span className="text-emerald-600 dark:text-emerald-400">"Quality over speed"</span>
                      <span className="text-gray-500 dark:text-slate-500">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-gray-600 dark:text-slate-400">values:</span>{" "}
                      <span className="text-gray-500 dark:text-slate-500">{"["}</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-emerald-600 dark:text-emerald-400">"Discipline"</span>
                      <span className="text-gray-500 dark:text-slate-500">,</span>{" "}
                      <span className="text-emerald-600 dark:text-emerald-400">"Craft"</span>
                      <span className="text-gray-500 dark:text-slate-500">,</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-emerald-600 dark:text-emerald-400">"Growth"</span>
                      <span className="text-gray-500 dark:text-slate-500">,</span>{" "}
                      <span className="text-emerald-600 dark:text-emerald-400">"Excellence"</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-gray-500 dark:text-slate-500">{"]"}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-slate-500">{"};"}</span>
                    </div>
                  </div>
                </TypewriterCode>
              </div>
            </div>
            </Card>
          </ScrollReveal>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-gradient-to-br from-blue-600 to-emerald-600">
        <ScrollReveal animation="slide-up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something Great
            </h2>
            <p className="text-xl text-blue-50 mb-8">
              Whether you need a brand identity, web application, or anything in between, 
              I'd love to help bring your vision to life.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 shadow-lg button-lift">
                Start a Conversation
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}

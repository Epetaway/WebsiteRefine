import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/layout/Section";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Palette, Zap, Sparkles, Rocket, Github, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from "react";

export default function Home() {
  type FeaturedItem = {
    title: string;
    description: string;
    link: string;
    image: string;
    tech?: string[];
    kind: 'github' | 'brand';
    // GitHub-only fields
    html_url?: string;
    homepage?: string | null;
  };

  const [featured, setFeatured] = useState<FeaturedItem[]>([]);

  function extractReadmeMeta(content: string) {
    // Simple parser: first H1 ("# Title") and first non-empty paragraph
    const lines = content.split(/\r?\n/);
    let title = undefined as string | undefined;
    let excerpt = undefined as string | undefined;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i].trim();
      if (!title && l.startsWith('# ')) {
        title = l.replace(/^#\s+/, '').trim();
        continue;
      }
      if (!excerpt && l && !l.startsWith('#')) {
        excerpt = l;
      }
      if (title && excerpt) break;
    }
    return { title, excerpt };
  }

  // Clean up README paragraph: strip images/badges, code fences, and markdown links
  function cleanupExcerpt(text: string) {
    let t = text.trim();
    // strip badges/images ![alt](url)
    t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
    // strip inline code fences/backticks
    t = t.replace(/```[\s\S]*?```/g, '');
    t = t.replace(/`([^`]*)`/g, '$1');
    // convert markdown links [label](url) -> label
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
    // collapse multiple spaces
    t = t.replace(/\s{2,}/g, ' ');
    return t.trim();
  }

  // GitHub README content is base64; ensure proper UTF-8 decoding
  function decodeReadmeBase64(b64: string) {
    try {
      const binary = atob(b64);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(bytes);
    } catch {
      // fallback
      try { return atob(b64); } catch { return ''; }
    }
  }

  useEffect(() => {
    // Pull top 4 repos for user, excluding the portfolio project
    fetch("https://api.github.com/users/Epetaway/repos?sort=updated")
      .then((r) => r.json())
      .then(async (data) => {
        if (!Array.isArray(data)) return;
        const excludeNames = new Set(["WebsiteRefine", "portfolio", "Portfolio", "website"]);
        const selected = data
          .filter((repo) => !repo.fork && !excludeNames.has(repo.name))
          .slice(0, 4);

        // For each repo, fetch README title/excerpt and topics
        const items: FeaturedItem[] = await Promise.all(
          selected.map(async (repo) => {
            let title = repo.name;
            let desc = repo.description || "";
            let tech: string[] = [];
            // README
            try {
              const res = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`);
              if (res.ok) {
                const json = await res.json();
                if (json && json.content) {
                  const decoded = decodeReadmeBase64(json.content);
                  const meta = extractReadmeMeta(decoded);
                  title = meta.title || title;
                  desc = meta.excerpt ? cleanupExcerpt(meta.excerpt) : desc;
                }
              }
            } catch { void 0; }
            // Topics
            try {
              const topicsRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/topics`, {
                headers: { Accept: 'application/vnd.github+json' },
              });
              if (topicsRes.ok) {
                const tj = await topicsRes.json();
                if (Array.isArray(tj.names)) tech = tj.names;
              }
            } catch { void 0; }
            // Ensure language is present in tech pills
            if (repo.language && !tech.includes(repo.language)) tech = [repo.language, ...tech];
            // de-dup and limit pills
            tech = Array.from(new Set(tech)).slice(0, 6);

            return {
              title,
              description: desc || "",
              link: repo.html_url,
              image: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
              tech,
              kind: 'github',
              html_url: repo.html_url,
              homepage: (() => {
                const hp = (repo.homepage || '').trim();
                if (hp) return hp;
                // Fallback to GitHub Pages URL if pages are enabled
                if (repo.has_pages && repo.owner?.login && repo.name) {
                  return `https://${repo.owner.login}.github.io/${repo.name}`;
                }
                return null;
              })(),
            } as FeaturedItem;
          })
        );
        setFeatured(items);
      })
      .catch(() => { void 0; });
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
      <Section className="min-h-[90vh] flex items-center bg-slate-950">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              Available for select projects
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-50">
              Building digital experiences with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                code & creativity
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              Full stack developer and designer specializing in thoughtful brand identities, 
              robust web applications, and user experiences that resonate. Bringing discipline 
              from the jiu-jitsu mat to clean, maintainable code.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/contact" className="btn-secondary">
                Get in Touch
              </Link>
              <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Get Resume
              </a>
            </div>
          </div>

          {/* Code Editor Card */}
          <Card className="bg-slate-900 border-slate-800 p-1 shadow-2xl">
            <div className="bg-slate-950 rounded-lg overflow-hidden">
              {/* Editor Header */}
              <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs text-slate-400 ml-3 font-mono">earl-hickson.ts</span>
              </div>
              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="space-y-1">
                  <div>
                    <span className="text-purple-400">interface</span>{" "}
                    <span className="text-blue-400">Developer</span>{" "}
                    <span className="text-slate-500">{"{"}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">name:</span>{" "}
                    <span className="text-emerald-400">"Earl Hickson"</span>
                    <span className="text-slate-500">;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">role:</span>{" "}
                    <span className="text-emerald-400">"Full Stack Developer"</span>
                    <span className="text-slate-500">;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">skills:</span>{" "}
                    <span className="text-slate-500">{"["}</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-emerald-400">"React"</span>
                    <span className="text-slate-500">,</span>{" "}
                    <span className="text-emerald-400">"TypeScript"</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-emerald-400">"Node.js"</span>
                    <span className="text-slate-500">,</span>{" "}
                    <span className="text-emerald-400">"UI/UX Design"</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-500">{"];"}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">passion:</span>{" "}
                    <span className="text-emerald-400">"Building & BJJ"</span>
                    <span className="text-slate-500">;</span>
                  </div>
                  <div>
                    <span className="text-slate-500">{"}"}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Featured Work (GitHub Repos) - Carousel */}
      <Section className="bg-slate-900">
        <SectionHeader 
          title="Featured Work" 
          description="A few recent repositories from my GitHub"
        />
        <Swiper
          spaceBetween={16}
          slidesPerView={1.05}
          breakpoints={{
            640: { slidesPerView: 1.4 },
            768: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.1 },
          }}
        >
          {featured.map((item, idx) => (
            <SwiperSlide key={idx}>
              <Link to={item.link} className="group block h-full">
                <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300 overflow-hidden h-full flex flex-col min-h-[460px]">
                  <div className="aspect-video bg-slate-700/50">
                    <img
                      src={item.image}
                      alt={`${item.title} preview`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col min-h-[220px]">
                    {item.tech && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tech.map((t) => (
                          <Badge key={t} className="bg-slate-700/80 text-slate-200 ring-1 ring-inset ring-slate-600/50">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300/90 mb-4">{(() => {
                      const txt = item.description;
                      return txt.length > 160 ? txt.slice(0, 157) + "…" : txt;
                    })()}</p>
                    {item.kind === 'github' && (
                      <div className="mt-auto flex gap-3">
                        {item.html_url && (
                          <a href={item.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-sm ring-1 ring-inset ring-indigo-600/40">
                            <Github className="h-4 w-4" />
                            View Code
                          </a>
                        )}
                        {item.homepage && (
                          <a href={item.homepage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-md border border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-300 shadow-sm">
                            <ExternalLink className="h-4 w-4" />
                            View Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-12">
          <Link to="/projects">
            <Button variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              View All Projects
            </Button>
          </Link>
        </div>
      </Section>

      {/* How I Work */}
      <Section className="bg-slate-950">
        <SectionHeader 
          title="Approach & Services" 
          description="Clear process. Practical engineering. Thoughtful design. Everything tuned for outcomes."
        />
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: How I Work */}
          <div className="space-y-4">
            {[
              { step: "01", title: "Discover", desc: "Align on goals, audience, and constraints. Surface risks early." },
              { step: "02", title: "Define", desc: "Shape scope, architecture, and success metrics that fit reality." },
              { step: "03", title: "Design & Build", desc: "Prototype quickly. Ship in tight loops. Test and refine." },
              { step: "04", title: "Launch & Iterate", desc: "Measure impact, improve performance, document, and support." },
            ].map((phase, idx) => (
              <ScrollReveal key={idx} animation="slide-up" delay={idx * 80}>
                <Card className="bg-slate-900 border-slate-800 p-6 hover:border-blue-500/30 transition-colors card-hover animate-scale-in">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl font-bold text-blue-400 mt-0.5 w-10">{phase.step}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-50 mb-1">{phase.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{phase.desc}</p>
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
              <ScrollReveal key={idx} animation="slide-up" delay={idx * 80}>
                <Card className="bg-slate-900 border-slate-800 p-6 hover:border-emerald-500/30 transition-colors card-hover animate-scale-in">
                  <service.icon className="h-9 w-9 text-emerald-400 mb-3" />
                  <h3 className="text-base font-semibold text-slate-50 mb-1">{service.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* About Preview */}
      <Section className="bg-slate-950">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal animation="slide-left">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-50">
                Code, Culture, Discipline
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                As a full stack developer and Brazilian Jiu-Jitsu practitioner, I bring 
                the same dedication to both crafts. The discipline, problem-solving, and 
                resilience from the mats translates directly to writing clean code and 
                building robust applications.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Whether it's designing a brand identity or architecting a complex system, 
                I approach every project with thoughtfulness, precision, and a commitment 
                to continuous improvement.
              </p>
              <Link to="/about" className="btn-secondary">
                More About Me
              </Link>
            </div>
          </ScrollReveal>

          {/* Code Editor Card */}
          <ScrollReveal animation="slide-right" delay={120}>
            <Card className="bg-slate-900 border-slate-800 p-1 shadow-xl card-hover animate-scale-in">
            <div className="bg-slate-950 rounded-lg overflow-hidden">
              <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs text-slate-400 ml-3 font-mono">philosophy.ts</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="space-y-1">
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-400">approach</span>{" "}
                    <span className="text-slate-500">=</span>{" "}
                    <span className="text-slate-500">{"{"}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">mindset:</span>{" "}
                    <span className="text-emerald-400">"Continuous improvement"</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">process:</span>{" "}
                    <span className="text-emerald-400">"Deliberate practice"</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">outcome:</span>{" "}
                    <span className="text-emerald-400">"Quality over speed"</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">values:</span>{" "}
                    <span className="text-slate-500">{"["}</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-emerald-400">"Discipline"</span>
                    <span className="text-slate-500">,</span>{" "}
                    <span className="text-emerald-400">"Craft"</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-emerald-400">"Growth"</span>
                    <span className="text-slate-500">,</span>{" "}
                    <span className="text-emerald-400">"Excellence"</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-500">{"]"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">{"};"}</span>
                  </div>
                </div>
              </div>
            </div>
            </Card>
          </ScrollReveal>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-gradient-to-br from-blue-600 to-emerald-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build Something Great
          </h2>
          <p className="text-xl text-blue-50 mb-8">
            Whether you need a brand identity, web application, or anything in between, 
            I'd love to help bring your vision to life.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 shadow-lg">
              Start a Conversation
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}

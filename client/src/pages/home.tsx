import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import LatestInsightsSection from "@/components/ui/latest-insights";
import WinTile from "@/components/ui/win-tile";
import TechBadge from "@/components/ui/tech-badge";
import { blogPosts } from "@/data/blog-posts";
import profileImage from "@/images/me.png";
import { projects as allProjects } from "@/data/projects";

const SITE = "https://www.ehicksonjr.com";

export default function Home() {
  // Use shared core projects for featured section
  const featuredProjects = [
    allProjects.find(p => p.id === "patient-engagement-portal"),
    allProjects.find(p => p.id === "dojonet-martial-arts-platform"),
    allProjects.find(p => p.id === "healthcare-portal-ui-redesign") || {
      title: "Healthcare Workflow UX Demo",
      summary: "A reconstructed demo focused on secure, accessible healthcare workflows and multi-step task flows inspired by real production systems.",
      tags: ["Healthcare", "UX", "Accessibility"],
      links: { repo: "#" },
      id: "healthcare-workflow-ux-demo",
      slug: "healthcare-workflow-ux-demo"
    }
  ].filter(Boolean);
  const title = "Prismora – Front-End Developer | Design Systems & UI";
  const description =
    "Portfolio of Prismora, a front-end developer focused on accessible, scalable, and high-performance UI for SaaS, healthcare, and marketing platforms.";

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : SITE} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : SITE} />
        <meta property="og:site_name" content="Earl Hickson Jr." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-24 bg-white">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-20 items-center">
            {/* Left: Prismora Hero Copy */}
            <div className="animate-slide-up space-y-8">
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] text-textPrimary tracking-tight">
                Building <span className="gradient-text">Accessible</span> UI for SaaS & Healthcare
              </h1>
              <p className="text-lg text-textSecondary">Remote & Hybrid – NJ/NYC</p>
              <p className="text-lg text-textSecondary leading-relaxed max-w-xl" data-testid="hero-description">
                I specialize in design systems, accessibility, and high-performance front-end engineering. My work powers digital experiences for startups, healthcare, and marketing teams.
              </p>
              {/* Social Icons */}
              <nav aria-label="Social links" className="flex gap-5 items-center">
                <a
                  href="https://github.com/Epetaway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-dominant transition-colors text-2xl"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  href="https://linkedin.com/in/earlhicksonjr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-dominant transition-colors text-2xl"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin" />
                </a>
                <a
                  href="https://twitter.com/epetaway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-dominant transition-colors text-2xl"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter" />
                </a>
              </nav>
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button asChild size="lg" className="bg-dominant hover:bg-blue-700 text-white rounded-pill px-10 py-6 text-base button-lift shadow-sm" data-testid="button-projects">
                  <Link to="/projects">View Projects</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white rounded-pill px-10 py-6 text-base button-lift" data-testid="button-contact">
                  <a href="mailto:e@ehicksonjr.com">Get in Touch</a>
                </Button>
              </div>
            </div>
            {/* Right: Profile Card */}
            <div className="animate-slide-up animation-delay-200">
              <div className="bg-white border border-gray-200 rounded-3xl p-10 card-hover shadow-sm">
                <img
                  src={profileImage}
                  alt="Prismora – Front-End Developer"
                  className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-gray-100"
                  data-testid="hero-image"
                />
                <h2 className="text-2xl font-bold text-center text-textPrimary mb-2">Prismora</h2>
                <p className="text-center text-dominant font-semibold mb-6 text-base">Front-End Developer</p>
                <p className="text-base text-textSecondary text-center leading-relaxed">
                  Delivering accessible, scalable UI for SaaS, healthcare, and marketing platforms. Focused on design systems, performance, and seamless handoff.
                </p>
              </div>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="grid grid-cols-3 gap-12 mt-28 pt-12 border-t border-gray-200 animate-slide-up animation-delay-400">
            <div className="text-center">
              <div className="text-5xl font-bold text-dominant mb-3">+37%</div>
              <div className="text-sm text-textSecondary font-medium">Lead Conversions</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-dominant mb-3">+25%</div>
              <div className="text-sm text-textSecondary font-medium">Organic Traffic</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-dominant mb-3">+75%</div>
              <div className="text-sm text-textSecondary font-medium">Livestream Engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section (Prismora, synced with Projects page) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20 animate-slide-up max-w-3xl mx-auto">
            <div className="text-xs text-dominant font-bold mb-2 uppercase tracking-wide">Explore</div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-textPrimary">
              my latest <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-textSecondary leading-relaxed">
              A snapshot of the front-end projects and demos I’m most proud of. These reflect real-world work I’ve done across healthcare and community spaces. Visit the Projects page for detailed breakdowns and developer view.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="block bg-white border border-gray-200 rounded-3xl p-0 overflow-hidden card-hover shadow-sm"
              >
                <div className="aspect-video bg-gradient-to-br from-dominant/10 to-dominant/5 flex items-center justify-center border-b border-gray-200">
                  <div className="text-7xl text-dominant/20">
                    <i className="fas fa-code" aria-hidden="true" />
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-xs text-dominant font-bold mb-3 uppercase tracking-wide">
                    {project.tags ? project.tags.join(" · ") : "Featured"}
                  </div>
                  <h3 className="font-bold text-2xl mb-4 text-textPrimary leading-tight">{project.title}</h3>
                  <p className="text-base text-textSecondary mb-6 leading-relaxed">{project.summary || project.description}</p>
                  <div className="flex gap-3 mt-2">
                    <Button asChild size="sm" variant="outline">
                      <Link to="/projects">View Project</Link>
                    </Button>
                    {project.links?.repo && (
                      <Button asChild size="sm" variant="ghost">
                        <a href={project.links.repo} target="_blank" rel="noopener noreferrer">View Code</a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button asChild variant="outline" size="lg" className="border-2 border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white rounded-pill px-10 py-6 text-base button-lift">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section (Prismora) */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20 animate-slide-up max-w-3xl mx-auto">
            <div className="text-xs text-dominant font-bold mb-2 uppercase tracking-wide">Services</div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-textPrimary">
              What I actually <span className="gradient-text">ship</span>
            </h2>
            <p className="text-xl text-textSecondary leading-relaxed">
              Front-end work that’s grounded in real-world product constraints, accessibility, and long-term maintainability.
            </p>
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 p-8 rounded-3xl flex items-start gap-6 card-hover shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-code text-dominant text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3 text-textPrimary">Front-End Engineering</h3>
                <p className="text-textSecondary text-base leading-relaxed">
                  React/Next.js/TypeScript UIs with clean architecture, reusable components, and robust state management.
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-3xl flex items-start gap-6 card-hover shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-layer-group text-dominant text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3 text-textPrimary">Design Systems & UI Libraries</h3>
                <p className="text-textSecondary text-base leading-relaxed">
                  Token-driven, accessible component libraries that keep teams aligned and interfaces consistent.
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-3xl flex items-start gap-6 card-hover shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-universal-access text-dominant text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3 text-textPrimary">Accessibility & UX Refinement</h3>
                <p className="text-textSecondary text-base leading-relaxed">
                  WCAG-minded audits, improved flows, and interface refinements that respect real end users.
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-3xl flex items-start gap-6 card-hover shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-globe text-dominant text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3 text-textPrimary">CMS & Marketing Sites</h3>
                <p className="text-textSecondary text-base leading-relaxed">
                  High-performing marketing sites and custom CMS setups for nonprofits, healthcare, and community brands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LatestInsightsSection />

      {/* Collaboration CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-textPrimary leading-tight">
                Let's <span className="gradient-text">Collaborate</span> Together
              </h2>
              <p className="text-xl text-textSecondary mb-10 leading-relaxed">
                Ready to turn your ideas into stunning digital experiences? Let's discuss how I can help create a standout digital presence for your project.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" size="lg" className="border-2 border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white rounded-pill px-10 py-6 text-base button-lift">
                  <a href="/assets/" target="_blank" rel="noopener noreferrer">
                    Download Resume
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-dominant hover:bg-blue-700 text-white rounded-pill px-10 py-6 text-base button-lift shadow-sm" data-testid="button-contact">
                  <a href="mailto:e@ehicksonjr.com">
                    Get In Touch
                  </a>
                </Button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-3xl flex items-start gap-6 card-hover shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-palette text-dominant text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3 text-textPrimary">Brand Design</h3>
                <p className="text-textSecondary text-base leading-relaxed">
                  Creating visual identities and developing brand strategies for tech companies that stand out in the market.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-3xl flex items-start gap-6 card-hover shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-cube text-dominant text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3 text-textPrimary">Product Design</h3>
                <p className="text-textSecondary text-base leading-relaxed">
                  End-to-end design process from ideation and wireframing to prototyping and usability testing.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-3xl flex items-start gap-6 card-hover shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-comments text-dominant text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3 text-textPrimary">Design Consultancy</h3>
                <p className="text-textSecondary text-base leading-relaxed">
                  Expert design consultancy for any digital product to ensure seamless user experiences and optimal results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LatestInsightsSection />

      {/* Collaboration CTA (Prismora) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-textPrimary leading-tight">
                Let’s build something that actually <span className="gradient-text">feels good to use</span>.
              </h2>
              <p className="text-xl text-textSecondary mb-10 leading-relaxed">
                Whether it’s a patient portal, an internal tool, or a new front-end system, I bring clarity, structure, and thoughtful engineering to every project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-dominant hover:bg-blue-700 text-white rounded-pill px-10 py-6 text-base button-lift shadow-sm">
                  <Link to="/projects">View Projects</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white rounded-pill px-10 py-6 text-base button-lift">
                  <Link to="/contact">Get In Touch</Link>
                </Button>
              </div>
            </div>
            <div className="animate-slide-up animation-delay-200">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <img
                  src={profileImage}
                  alt="Earl Hickson Jr."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

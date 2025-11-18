import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import LatestInsightsSection from "@/components/ui/latest-insights";
import WinTile from "@/components/ui/win-tile";
import TechBadge from "@/components/ui/tech-badge";
import { blogPosts } from "@/data/blog-posts";
import profileImage from "@/images/me.png";

const SITE = "https://www.ehicksonjr.com";

export default function Home() {
  const featuredPosts = useMemo(() => blogPosts.filter((post) => post.featured).slice(0, 2), []);
  const title = "Earl Hickson Jr – Front-End Developer | React, Angular, TypeScript";
  const description =
    "Portfolio of Earl Hickson Jr, a Front-End Developer specializing in accessible, responsive, and component-driven UI development across healthcare, marketing, and non-profit platforms.";

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

      {/* Top Banner */}
      <div className="bg-dominant text-textPrimary py-2 px-4 text-center text-sm">
        Available for Senior Front-End roles & select freelance projects.
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-base">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text + CTAs */}
            <div className="animate-slide-up space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-textPrimary">
                Front-End Developer{" "}
                <span className="gradient-text">with React</span>
              </h1>
              
              <p className="text-xl text-textSecondary mb-6">
                Parsippany, NJ
              </p>

              <p className="text-lg text-textSecondary leading-relaxed max-w-xl" data-testid="hero-description">
                I build fast, accessible, maintainable frontends. My work focuses on shipping real UI, solving real problems, and keeping complexity low.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 items-center">
                <a
                  href="https://github.com/Epetaway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-dominant transition-colors"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github text-2xl" />
                </a>
                <a
                  href="https://linkedin.com/in/earlhicksonjr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-dominant transition-colors"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin text-2xl" />
                </a>
                <a
                  href="https://twitter.com/epetaway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-dominant transition-colors"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter text-2xl" />
                </a>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-dominant hover:bg-opacity-90 text-white rounded-pill px-8 button-lift shadow-lg" data-testid="button-projects">
                  <Link to="/projects">
                    View Projects
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-dominant text-dominant hover:bg-dominant hover:text-white rounded-pill px-8 button-lift" data-testid="button-contact">
                  <a href="mailto:e@ehicksonjr.com">
                    Get in Touch
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Profile Card */}
            <div className="animate-slide-up animation-delay-200">
              <div className="bg-card border border-border rounded-card p-8 card-hover shadow-lg">
                <img
                  src={profileImage}
                  alt="Earl Hickson Jr. – Front-End Developer"
                  className="w-40 h-40 rounded-full mx-auto mb-6 object-cover"
                  data-testid="hero-image"
                />
                <h2 className="text-2xl font-bold text-center text-textPrimary mb-2">Earl Hickson Jr.</h2>
                <p className="text-center text-dominant font-semibold mb-4">Front-End Developer</p>
                <p className="text-sm text-textSecondary text-center leading-relaxed">
                  I've delivered production features across healthcare systems, oncology content platforms, marketing landing pages, and small-business apps.
                </p>
              </div>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="grid grid-cols-3 gap-8 mt-20 animate-slide-up animation-delay-400">
            <div className="text-center">
              <div className="text-4xl font-bold text-dominant mb-2">+37%</div>
              <div className="text-sm text-textSecondary">Lead Conversions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-dominant mb-2">+25%</div>
              <div className="text-sm text-textSecondary">Organic Traffic</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-dominant mb-2">+75%</div>
              <div className="text-sm text-textSecondary">Livestream Engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-textPrimary">
              Explore my latest <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
              Real-world front-end work demonstrating my commitment to crafting high-performance digital experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.length > 0 ? (
              featuredPosts.slice(0, 2).map((post, idx) => (
                <Link
                  key={idx}
                  to={`/blog/${post.slug}`}
                  className="block bg-card border border-border rounded-card p-0 overflow-hidden card-hover shadow-md"
                >
                  <div className="aspect-video bg-gradient-to-br from-dominant/10 to-dominant/5 flex items-center justify-center">
                    <div className="text-6xl text-dominant/20">
                      <i className="fas fa-code" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 text-textPrimary">{post.title}</h3>
                    <p className="text-sm text-textSecondary mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center text-dominant font-semibold">
                      View Project <i className="fas fa-arrow-right ml-2 text-sm" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <>
                <div className="bg-card border border-border rounded-card p-0 overflow-hidden card-hover shadow-md">
                  <div className="aspect-video bg-gradient-to-br from-dominant/10 to-dominant/5 flex items-center justify-center">
                    <div className="text-6xl text-dominant/20">
                      <i className="fas fa-hospital" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-dominant font-semibold mb-2">Healthcare Platform</div>
                    <h3 className="font-bold text-xl mb-3 text-textPrimary">Patient Engagement Portal</h3>
                    <p className="text-sm text-textSecondary mb-4">
                      Modernized healthcare portal with WCAG 2.1 compliance, improving accessibility scores by 18 points.
                    </p>
                    <div className="flex items-center text-dominant font-semibold">
                      View Project <i className="fas fa-arrow-right ml-2 text-sm" />
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-card p-0 overflow-hidden card-hover shadow-md">
                  <div className="aspect-video bg-gradient-to-br from-dominant/10 to-dominant/5 flex items-center justify-center">
                    <div className="text-6xl text-dominant/20">
                      <i className="fas fa-chart-line" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-dominant font-semibold mb-2">Marketing Platform</div>
                    <h3 className="font-bold text-xl mb-3 text-textPrimary">Landing Page System</h3>
                    <p className="text-sm text-textSecondary mb-4">
                      Built React component library for marketing pages, reducing build time by 60%.
                    </p>
                    <div className="flex items-center text-dominant font-semibold">
                      View Project <i className="fas fa-arrow-right ml-2 text-sm" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-2 border-dominant text-dominant hover:bg-dominant hover:text-white rounded-pill px-8 button-lift">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-base">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-textPrimary">
              Services made <span className="gradient-text">Effortless</span>
            </h2>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
              One complete service with everything included and no extra fees
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border p-6 rounded-card flex items-start gap-6 card-hover shadow-md">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-pencil-ruler text-dominant text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2 text-textPrimary">UI/UX Design</h3>
                <p className="text-textSecondary">
                  Crafting user-centered, visually stunning and intuitive interfaces that enhance user experience and drive engagement.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-card flex items-start gap-6 card-hover shadow-md">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-palette text-dominant text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2 text-textPrimary">Brand Design</h3>
                <p className="text-textSecondary">
                  Creating visual identities and developing brand strategies for tech companies that stand out in the market.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-card flex items-start gap-6 card-hover shadow-md">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-cube text-dominant text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2 text-textPrimary">Product Design</h3>
                <p className="text-textSecondary">
                  End-to-end design process from ideation and wireframing to prototyping and usability testing.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-card flex items-start gap-6 card-hover shadow-md">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-comments text-dominant text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2 text-textPrimary">Design Consultancy</h3>
                <p className="text-textSecondary">
                  Expert design consultancy for any digital product to ensure seamless user experiences and optimal results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LatestInsightsSection />

      {/* Collaboration CTA */}
      <section className="py-20 bg-muted">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-textPrimary">
                Let's <span className="gradient-text">Collaborate</span> Together
              </h2>
              <p className="text-xl text-textSecondary mb-8 leading-relaxed">
                Ready to turn your ideas into stunning digital experiences? Let's discuss how I can help create a standout digital presence for your project.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" size="lg" className="border-2 border-dominant text-dominant hover:bg-dominant hover:text-white rounded-pill px-8 button-lift">
                  <a href="/assets/" target="_blank" rel="noopener noreferrer">
                    Download Resume
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-dominant hover:bg-opacity-90 text-white rounded-pill px-8 button-lift shadow-lg" data-testid="button-contact">
                  <a href="mailto:e@ehicksonjr.com">
                    Get In Touch
                  </a>
                </Button>
              </div>
            </div>

            <div className="animate-slide-up animation-delay-200">
              <div className="aspect-square rounded-card overflow-hidden shadow-xl">
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

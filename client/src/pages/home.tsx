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

      {/* Hero Section */}
      <section className="pt-24 pb-24 bg-white">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-20 items-center">
            {/* Left: Text + CTAs */}
            <div className="animate-slide-up space-y-8">
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] text-textPrimary tracking-tight">
                Front-End Developer{" "}
                <span className="gradient-text">with React</span>
              </h1>
              
              <p className="text-lg text-textSecondary">
                Parsippany, NJ
              </p>

              <p className="text-lg text-textSecondary leading-relaxed max-w-xl" data-testid="hero-description">
                I build fast, accessible, maintainable frontends. My work focuses on shipping real UI, solving real problems, and keeping complexity low.
              </p>

              {/* Social Icons */}
              <div className="flex gap-5 items-center">
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
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button asChild size="lg" className="bg-dominant hover:bg-blue-700 text-white rounded-pill px-10 py-6 text-base button-lift shadow-sm" data-testid="button-projects">
                  <Link to="/projects">
                    View Projects
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white rounded-pill px-10 py-6 text-base button-lift" data-testid="button-contact">
                  <a href="mailto:e@ehicksonjr.com">
                    Get in Touch
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Profile Card */}
            <div className="animate-slide-up animation-delay-200">
              <div className="bg-white border border-gray-200 rounded-3xl p-10 card-hover shadow-sm">
                <img
                  src={profileImage}
                  alt="Earl Hickson Jr. – Front-End Developer"
                  className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-gray-100"
                  data-testid="hero-image"
                />
                <h2 className="text-2xl font-bold text-center text-textPrimary mb-2">Earl Hickson Jr.</h2>
                <p className="text-center text-dominant font-semibold mb-6 text-base">Front-End Developer</p>
                <p className="text-base text-textSecondary text-center leading-relaxed">
                  I've delivered production features across healthcare systems, oncology content platforms, marketing landing pages, and small-business apps.
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

      {/* Featured Projects Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20 animate-slide-up max-w-3xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-textPrimary">
              Explore my latest <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-textSecondary leading-relaxed">
              Real-world front-end work demonstrating my commitment to crafting high-performance digital experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {featuredPosts.length > 0 ? (
              featuredPosts.slice(0, 2).map((post, idx) => (
                <Link
                  key={idx}
                  to={`/blog/${post.slug}`}
                  className="block bg-white border border-gray-200 rounded-3xl p-0 overflow-hidden card-hover shadow-sm"
                >
                  <div className="aspect-video bg-gradient-to-br from-dominant/10 to-dominant/5 flex items-center justify-center border-b border-gray-200">
                    <div className="text-7xl text-dominant/20">
                      <i className="fas fa-code" />
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-2xl mb-4 text-textPrimary leading-tight">{post.title}</h3>
                    <p className="text-base text-textSecondary mb-6 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center text-dominant font-semibold text-base">
                      View Project <i className="fas fa-arrow-right ml-2 text-sm" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <>
                <div className="bg-white border border-gray-200 rounded-3xl p-0 overflow-hidden card-hover shadow-sm">
                  <div className="aspect-video bg-gradient-to-br from-dominant/10 to-dominant/5 flex items-center justify-center border-b border-gray-200">
                    <div className="text-7xl text-dominant/20">
                      <i className="fas fa-hospital" />
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-xs text-dominant font-bold mb-3 uppercase tracking-wide">Healthcare Platform</div>
                    <h3 className="font-bold text-2xl mb-4 text-textPrimary">Patient Engagement Portal</h3>
                    <p className="text-base text-textSecondary mb-6 leading-relaxed">
                      Modernized healthcare portal with WCAG 2.1 compliance, improving accessibility scores by 18 points.
                    </p>
                    <div className="flex items-center text-dominant font-semibold text-base">
                      View Project <i className="fas fa-arrow-right ml-2 text-sm" />
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-3xl p-0 overflow-hidden card-hover shadow-sm">
                  <div className="aspect-video bg-gradient-to-br from-dominant/10 to-dominant/5 flex items-center justify-center border-b border-gray-200">
                    <div className="text-7xl text-dominant/20">
                      <i className="fas fa-chart-line" />
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-xs text-dominant font-bold mb-3 uppercase tracking-wide">Marketing Platform</div>
                    <h3 className="font-bold text-2xl mb-4 text-textPrimary">Landing Page System</h3>
                    <p className="text-base text-textSecondary mb-6 leading-relaxed">
                      Built React component library for marketing pages, reducing build time by 60%.
                    </p>
                    <div className="flex items-center text-dominant font-semibold text-base">
                      View Project <i className="fas fa-arrow-right ml-2 text-sm" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-16">
            <Button asChild variant="outline" size="lg" className="border-2 border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white rounded-pill px-10 py-6 text-base button-lift">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20 animate-slide-up max-w-3xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-textPrimary">
              Services made <span className="gradient-text">Effortless</span>
            </h2>
            <p className="text-xl text-textSecondary leading-relaxed">
              One complete service with everything included and no extra fees
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 p-8 rounded-3xl flex items-start gap-6 card-hover shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-pencil-ruler text-dominant text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3 text-textPrimary">UI/UX Design</h3>
                <p className="text-textSecondary text-base leading-relaxed">
                  Crafting user-centered, visually stunning and intuitive interfaces that enhance user experience and drive engagement.
                </p>
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

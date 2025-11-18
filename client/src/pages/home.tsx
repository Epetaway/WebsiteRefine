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
      <section className="pt-16 pb-20 bg-base min-h-screen flex items-center">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text + Metrics + CTAs */}
            <div className="animate-slide-up">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4 text-textPrimary">
                Front-End Developer
              </h1>
              
              <p className="text-xl text-textSecondary mb-6">
                Parsippany, NJ
              </p>

              <p className="text-lg text-textSecondary mb-8 leading-relaxed" data-testid="hero-description">
                I build fast, accessible, maintainable frontends. My work focuses on shipping real UI, solving real problems, and keeping complexity low.
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-dominant">+37%</div>
                  <div className="text-sm text-textSecondary">Lead Conversions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-dominant">+25%</div>
                  <div className="text-sm text-textSecondary">Organic Traffic</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-dominant">+75%</div>
                  <div className="text-sm text-textSecondary">Livestream Engagement</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
                <Button asChild size="lg" className="bg-dominant hover:opacity-90 text-white" data-testid="button-projects">
                  <Link to="/projects">
                    View Front-End Projects
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2" data-testid="button-resume">
                  <a href="/assets/" target="_blank" rel="noopener noreferrer">
                    Download Resume (PDF)
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Profile Card */}
            <div className="animate-float">
              <div className="bg-card border border-border rounded-card p-6">
                <img
                  src={profileImage}
                  alt="Earl Hickson Jr. – Front-End Developer"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                  data-testid="hero-image"
                />
                <h2 className="text-xl font-bold text-center text-textPrimary mb-1">Earl Hickson Jr.</h2>
                <p className="text-center text-textSecondary mb-4">Front-End Developer</p>
                <p className="text-sm text-textSecondary text-center">
                  I've delivered production features across healthcare systems, oncology content platforms, marketing landing pages, and small-business apps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-base">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-textPrimary" data-testid="section-title-projects">
              Projects
            </h2>
            <p className="text-xl text-textSecondary">Real-world front-end work.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.length > 0 ? (
              featuredPosts.slice(0, 2).map((post, idx) => (
                <Link
                  key={idx}
                  to={`/blog/${post.slug}`}
                  className="block bg-card border border-border rounded-card p-6 hover:border-dominant transition-colors"
                >
                  <h3 className="font-bold text-lg mb-2 text-textPrimary">{post.title}</h3>
                  <p className="text-sm text-textSecondary mb-4">{post.excerpt}</p>
                  <div className="text-sm text-dominant">Read more →</div>
                </Link>
              ))
            ) : (
              <>
                <div className="bg-card border border-border rounded-card p-6">
                  <h3 className="font-bold text-lg mb-2 text-textPrimary">Patient Engagement Portal</h3>
                  <p className="text-sm text-textSecondary mb-2">Front-End Developer</p>
                  <p className="text-sm text-textSecondary mb-4">
                    Modernized healthcare portal with WCAG 2.1 compliance, improving accessibility scores by 18 points.
                  </p>
                  <div className="text-sm font-semibold text-dominant">+18pts accessibility score</div>
                </div>
                <div className="bg-card border border-border rounded-card p-6">
                  <h3 className="font-bold text-lg mb-2 text-textPrimary">Marketing Landing Page System</h3>
                  <p className="text-sm text-textSecondary mb-2">Front-End Developer</p>
                  <p className="text-sm text-textSecondary mb-4">
                    Built React component library for marketing pages, reducing build time by 60%.
                  </p>
                  <div className="text-sm font-semibold text-dominant">60% faster build time</div>
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="border-2">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-textPrimary" data-testid="section-title-services">
              Services & Expertise
            </h2>
            <p className="text-xl text-textSecondary">What I bring to your team</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border p-6 rounded-card">
              <i className="fas fa-cogs text-dominant text-2xl mb-4" />
              <h3 className="font-bold mb-2 text-textPrimary" data-testid="service-ui-engineering">Modern Front-End Development</h3>
              <p className="text-sm text-textSecondary">Component-driven UI development in React, Angular, and Vue. Building reusable patterns with clean, maintainable code.</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-card">
              <i className="fas fa-cubes text-dominant text-2xl mb-4" />
              <h3 className="font-bold mb-2 text-textPrimary" data-testid="service-design-systems">UI/UX Implementation</h3>
              <p className="text-sm text-textSecondary">Translating designs into production-ready code with consistent typography, spacing, and interaction patterns.</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-card">
              <i className="fas fa-universal-access text-dominant text-2xl mb-4" />
              <h3 className="font-bold mb-2 text-textPrimary" data-testid="service-accessibility">Accessible Design Systems</h3>
              <p className="text-sm text-textSecondary">WCAG 2.1 AA compliance with semantic HTML, ARIA labels, keyboard navigation, and proper color contrast.</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-card">
              <i className="fas fa-rocket text-dominant text-2xl mb-4" />
              <h3 className="font-bold mb-2 text-textPrimary" data-testid="service-performance">Angular / React / Next.js Expertise</h3>
              <p className="text-sm text-textSecondary">Deep experience with modern frameworks, performance optimization, and scalable architecture patterns.</p>
            </div>
          </div>
        </div>
      </section>

      <LatestInsightsSection />

      {/* Collaboration CTA */}
      <section className="py-20 bg-base">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-textPrimary" data-testid="cta-title">Let's Build Something Great</h2>
          <p className="text-xl text-textSecondary mb-12">Ready to collaborate on your next project?</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-accent hover:opacity-90 text-white" data-testid="button-contact">
              <a href="mailto:e@ehicksonjr.com">
                Contact Me
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2" data-testid="button-view-projects">
              <Link to="/projects">
                View Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

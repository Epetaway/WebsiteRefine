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
  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 2);
  const title = "Senior Front-End / UI Engineer – Earl Hickson Jr.";
  const description =
    "React & Angular specialist improving performance, accessibility, and UX. Delivered 20% faster responsiveness and +18 Lighthouse gains. Parsippany, NJ.";

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

      <section className="pt-16 pb-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-6">
                <i className="fas fa-code mr-2" />
                Open to Full-Time & Contract Opportunities
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="gradient-text" data-testid="hero-title-primary">
                  Senior Front-End / UI Engineer
                </span>
              </h1>

              <h3 className="text-xl lg:text-2xl text-gray-900 mb-6" data-testid="hero-title-secondary">
                React • Angular • TypeScript • JavaScript (ES6+) • HTML5 • CSS/SCSS • Accessibility
              </h3>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-testid="hero-description">
                Front-End focused developer with 6+ years building responsive, accessible, performance-minded web apps.
                Delivered portals with ~20% faster responsiveness and +18 Lighthouse score improvements.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600" data-testid="button-case-studies">
                  <Link to="/case-studies">
                    <i className="fas fa-rocket mr-2" />
                    View Case Studies
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-black text-white hover:bg-gray-900" data-testid="button-contact">
                  <a href="mailto:e@ehicksonjr.com">
                    <i className="fas fa-handshake mr-2" />
                    Let’s Talk
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" data-testid="button-resume">
                  <a href="/assets/Earl_Hickson_-_Front-End__UX_Engineer.pdf" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-download mr-2" />
                    Download Resume (PDF)
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <TechBadge name="React" color="blue" />
                <TechBadge name="Angular" color="red" />
                <TechBadge name="TypeScript" color="blue" />
                <TechBadge name="Accessibility (WCAG 2.1)" color="orange" />
                <TechBadge name="Performance" color="green" />
                <TechBadge name="HTML5" color="orange" />
                <TechBadge name="CSS/SCSS" color="blue" />
                <TechBadge name="API Integration" color="green" />
                <TechBadge name="Git/GitHub" color="black" />
              </div>
            </div>

            <div className="relative animate-float">
              <img
                src={profileImage}
                alt="Earl Hickson Jr. – Senior Front-End / UI Engineer"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                data-testid="hero-image"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl animate-bounce">
                <i className="fas fa-laptop-code" />
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            Parsippany, NJ •{" "}
            <a className="underline decoration-gray-300 hover:decoration-gray-500" href="mailto:e@ehicksonjr.com">
              e@ehicksonjr.com
            </a>{" "}
            •{" "}
            <a
              className="underline decoration-gray-300 hover:decoration-gray-500"
              href="https://www.linkedin.com/in/earlhicksonjr"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>{" "}
            •{" "}
            <a
              className="underline decoration-gray-300 hover:decoration-gray-500"
              href="https://github.com/Epetaway"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="section-title-results">
              Proven Results
            </h2>
            <p className="text-xl text-gray-600">Recent wins and measurable impact across projects</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <WinTile
              icon="fas fa-tachometer-alt"
              title="Performance Optimization"
              metric="Time to Interactive"
              improvement="44% ↓"
              description="Normalized API adapters and skeleton states reduced TTI from 2.1s to 1.2s."
              stack="Stack: React • TypeScript • Next.js"
              bgColor="bg-gradient-to-br from-green-50 to-emerald-50"
              iconColor="bg-green-500"
              metricColor="text-green-600"
            />
            <WinTile
              icon="fas fa-universal-access"
              title="Accessibility"
              metric="WCAG Alignment"
              improvement="AA"
              description="ARIA roles, keyboard navigation, and contrast improvements to achieve WCAG 2.1 AA."
              stack="Tools: axe-core • WAVE • VoiceOver"
              bgColor="bg-gradient-to-br from-blue-50 to-indigo-50"
              iconColor="bg-blue-500"
              metricColor="text-blue-600"
            />
            <WinTile
              icon="fas fa-compress-alt"
              title="Bundle Optimization"
              metric="Initial Bundle"
              improvement="73% ↓"
              description="Code splitting and tree shaking brought 1.2MB down to 320KB."
              stack="Tools: Vite • Webpack • Bundle Analyzer"
              bgColor="bg-gradient-to-br from-purple-50 to-violet-50"
              iconColor="bg-purple-500"
              metricColor="text-purple-600"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="section-title-services">
              Services & Expertise
            </h2>
            <p className="text-xl text-gray-600">What I bring to your team</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <i className="fas fa-cogs text-primary-500 text-2xl mb-4" />
              <h3 className="font-bold mb-2" data-testid="service-ui-engineering">UI Engineering</h3>
              <p className="text-sm text-gray-600">Reusable component libraries, design tokens, responsive systems.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <i className="fas fa-cubes text-primary-500 text-2xl mb-4" />
              <h3 className="font-bold mb-2" data-testid="service-design-systems">Design Systems</h3>
              <p className="text-sm text-gray-600">Scalable components, docs, governance, and adoption strategy.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <i className="fas fa-universal-access text-primary-500 text-2xl mb-4" />
              <h3 className="font-bold mb-2" data-testid="service-accessibility">Accessibility</h3>
              <p className="text-sm text-gray-600">WCAG 2.1 AA, screen reader testing, inclusive patterns.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <i className="fas fa-rocket text-primary-500 text-2xl mb-4" />
              <h3 className="font-bold mb-2" data-testid="service-performance">Performance</h3>
              <p className="text-sm text-gray-600">Core Web Vitals, bundle optimization, caching strategies.</p>
            </div>
          </div>
        </div>
      </section>

      <LatestInsightsSection />

      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" data-testid="cta-title">Ready to Work Together?</h2>
          <p className="text-xl text-gray-600 mb-12">Let’s discuss how I can help your team deliver accessible, reliable, and fast user experiences.</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600" data-testid="button-contact">
              <a href="mailto:e@ehicksonjr.com">
                <i className="fas fa-envelope mr-3" />
                Get In Touch
              </a>
            </Button>

            <div className="flex gap-4">
              <Button asChild variant="outline" size="lg" data-testid="button-linkedin">
                <a href="https://linkedin.com/in/earlhicksonjr" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin mr-3" />
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-github">
                <a href="https://github.com/Epetaway" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github mr-3" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

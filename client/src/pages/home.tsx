import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/projects";
import profileImage from "@/images/me.png";

const SITE = "https://www.ehicksonjr.com";

const experiences = [
  {
    title: "Front-End Development",
    years: "6+ Years",
    description:
      "React, Angular, Vue, TypeScript with focus on accessibility and performance.",
    icon: "💻",
  },
  {
    title: "Healthcare & Enterprise",
    years: "3+ Years",
    description:
      "Patient portals, HIPAA compliance, complex multi-step workflows.",
    icon: "🏥",
  },
  {
    title: "Design Systems",
    years: "4+ Years",
    description:
      "Building and maintaining component libraries and design tokens.",
    icon: "🎨",
  },
  {
    title: "WCAG 2.1 AA",
    years: "Certified",
    description:
      "Accessible interfaces with semantic HTML, ARIA, and keyboard navigation.",
    icon: "♿",
  },
];

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const title = "Earl Hickson Jr. – Senior Front-End Engineer";
  const description =
    "Senior Front-End Engineer building accessible, responsive, and performance-focused web interfaces. 6+ years with React, Angular, Vue, and TypeScript across healthcare, marketing, and enterprise domains. Based in Parsippany, NJ.";

  return (
    <div className="bg-base">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : SITE}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : SITE}
        />
        <meta property="og:site_name" content="Earl Hickson Jr." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Top Banner */}
      <div className="w-full bg-dominant text-white py-2 px-4 text-center">
        <p className="text-sm">
          Available for Senior Front-End roles & select freelance projects.
        </p>
      </div>

      {/* Hero Section */}
      <section className="w-full flex justify-center px-4 bg-base">
        <div className="w-full max-w-content py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-pill bg-dominant/10 text-dominant text-sm font-medium mb-6 border border-dominant/20">
                <span className="w-2 h-2 bg-dominant rounded-full mr-2 animate-pulse" />
                Available for Senior Front-End roles & select freelance projects
              </div>

              <h1
                className="font-display text-5xl md:text-6xl text-textPrimary mb-4 tracking-tight"
                data-testid="hero-title-primary"
              >
                Senior Front-End Engineer
              </h1>

              <p className="text-2xl lg:text-3xl text-gray-700 font-medium mb-6">
                React • Angular • TypeScript
              </p>

              <p className="text-textSecondary mb-2 text-sm">Parsippany, NJ</p>

              <div className="grid grid-cols-3 gap-4 my-8 p-6 bg-bg-panel rounded-card border border-border-subtle">
                <div>
                  <div className="text-2xl font-display text-accent mb-1">
                    +37%
                  </div>
                  <div className="text-xs text-textSecondary">
                    Lead Conversions
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-display text-accent mb-1">
                    +25%
                  </div>
                  <div className="text-xs text-textSecondary">
                    Organic Traffic
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-display text-accent mb-1">
                    +75%
                  </div>
                  <div className="text-xs text-textSecondary">
                    Livestream Engagement
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-pill bg-accent text-text-on-accent hover:bg-accent/90"
                  data-testid="button-case-studies"
                >
                  <Link to="/projects">View Front-End Case Studies</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-pill border-dominant text-dominant hover:bg-dominant hover:text-text-on-accent"
                  data-testid="button-resume"
                >
                  <a
                    href="/assets/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Resume (PDF)
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="bg-bg-panel border border-border-subtle rounded-card p-6 shadow-card max-w-sm w-full">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={profileImage}
                    alt="Earl Hickson Jr."
                    className="w-full h-full object-cover"
                    data-testid="hero-image"
                  />
                </div>
                <h2 className="font-display text-xl text-textPrimary mb-1">
                  Earl Hickson Jr.
                </h2>
                <p className="text-sm text-dominant mb-3">
                  Senior Front-End Engineer · BJJ Black Belt
                </p>
                <p className="text-sm text-textSecondary">
                  Building responsive, accessible, and performance-focused web
                  interfaces with modern front-end stacks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="w-full flex justify-center px-4 bg-base">
        <div className="w-full max-w-content py-section-y border-b border-border-subtle">
          <div className="text-center mb-12">
            <p className="uppercase text-xs tracking-[0.2em] text-textSecondary mb-4">
              PORTFOLIO
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-textPrimary mb-4 tracking-tight">
              Explore my latest Projects
            </h2>
            <p className="text-lg text-textSecondary max-w-2xl mx-auto">
              Real-world front-end work with measurable business impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="group block bg-base border border-border-subtle rounded-card p-6 shadow-card hover:shadow-cardHover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-video bg-bg-panel rounded-lg mb-4 overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%231A1A1A' width='400' height='300'/%3E%3C/svg%3E";
                    }}
                  />
                </div>

                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display text-xl text-textPrimary group-hover:text-dominant transition-colors">
                    {project.title}
                  </h3>
                  {project.year && (
                    <span className="text-xs uppercase tracking-wide text-textSecondary whitespace-nowrap">
                      {project.year}
                    </span>
                  )}
                </div>

                <p className="text-sm text-textSecondary mb-3">
                  {project.role}
                </p>

                <p className="text-sm text-accent font-semibold mb-4">
                  {project.impact}
                </p>

                {project.description && (
                  <p className="text-sm text-textSecondary mb-4 line-clamp-2">
                    {project.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 text-xs rounded-pill bg-dominant/10 text-dominant border border-dominant/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="w-full flex justify-center px-4 bg-bg-panel">
        <div className="w-full max-w-content py-section-y">
          <div className="text-center mb-12">
            <p className="uppercase text-xs tracking-[0.2em] text-textSecondary mb-4">
              EXPERIENCE
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-textPrimary mb-4 tracking-tight">
              Experience & Expertise
            </h2>
            <p className="text-lg text-textSecondary max-w-2xl mx-auto">
              Building web interfaces since 2018
            </p>
          </div>

          {/* Experience Layout with Featured Card */}
          <div className="grid lg:grid-cols-[1.3fr_2fr] gap-10 items-start mb-12">
            {/* Blue Gradient Experience Card */}
            <div className="bg-base border border-border-subtle rounded-card p-8 shadow-card hover:shadow-cardHover transition-all duration-300 gradient-animate text-white">
              <h3 className="font-display text-3xl md:text-4xl mb-4 font-bold">
                6+ years of experience
              </h3>
              <p className="text-lg leading-relaxed text-white/90">
                Delivering performant, conversion-focused web experiences for
                brands and products across healthcare, marketing, and enterprise
                domains.
              </p>
            </div>

            {/* Experience Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {experiences.map((exp) => (
                <div
                  key={exp.title}
                  className="bg-base border border-border-subtle rounded-card p-6 shadow-card hover:shadow-cardHover transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{exp.icon}</div>
                  <h3 className="font-display text-lg text-textPrimary mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-accent uppercase tracking-wide mb-3 font-semibold">
                    {exp.years}
                  </p>
                  <p className="text-sm text-textSecondary">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-pill bg-dominant text-text-on-accent hover:bg-dominant/90"
              data-testid="button-contact"
            >
              <Link to="/about">Learn more about me</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-pill border-accent text-accent hover:bg-accent hover:text-text-on-accent"
            >
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download my resume
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full flex justify-center px-4 bg-base">
        <div className="w-full max-w-content py-section-y">
          <div className="text-center">
            <h2 className="font-display text-4xl md:text-5xl text-textPrimary mb-6 tracking-tight">
              Let's Build Something Great
            </h2>
            <p className="text-lg text-textSecondary max-w-2xl mx-auto mb-8">
              I'm available for full-time senior front-end roles and select
              freelance projects. Let's discuss how I can help your team deliver
              accessible, reliable, and fast user experiences.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-pill bg-accent text-text-on-accent hover:bg-accent/90"
              >
                <a href="mailto:e@ehicksonjr.com">Contact Me</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-pill border-dominant text-dominant hover:bg-dominant hover:text-text-on-accent"
              >
                <Link to="/projects">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

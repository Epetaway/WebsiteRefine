import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import profileImage from "@/images/me.png";

const SITE = "https://www.ehicksonjr.com";

export default function Home() {
  const featuredProjects = [
    {
      id: "patient-engagement-portal",
      title: "Patient Engagement Portal – Healthcare UI Demo",
      summary: "Enterprise-style patient portal demo with multi-step registration, dashboards, and accessible form workflows based on real healthcare patterns.",
      tags: ["Healthcare", "UI", "Accessibility"],
      links: { repo: "https://github.com/epetaway/patient-portal-demo" },
      slug: "patient-engagement-portal"
    },
    {
      id: "dojonet-martial-arts-platform",
      title: "DojoNet Martial Arts Portal Prototype",
      summary: "A modern membership and scheduling portal for martial arts communities, featuring dynamic forms, event flows, and clean front-end architecture.",
      tags: ["React", "TypeScript", "Community Platform"],
      links: { repo: "https://github.com/epetaway/DojoNet-Prototype-MAX" },
      slug: "dojonet-martial-arts-platform"
    },
    {
      id: "healthcare-workflow-ux-demo",
      title: "Healthcare Workflow UX Demo",
      summary: "A reconstructed healthcare workflow demo focused on secure UI, accessible multi-step tasks, and enterprise-ready UX patterns.",
      tags: ["Healthcare", "UX", "Accessibility"],
      links: { repo: "#" },
      slug: "healthcare-workflow-ux-demo"
    }
  ];
  const title = "Earl Hickson Jr. – Front-End Developer | Design Systems & UI";
  const description =
    "Portfolio of Earl Hickson Jr., a front-end developer focused on accessible, scalable, and high-performance UI for SaaS, healthcare, and marketing platforms.";

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
            {/* Left: Hero Copy */}
            <div className="animate-slide-up space-y-8">
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] text-textPrimary tracking-tight">
                Front-End Developer Building <span className="gradient-text">Thoughtful, High-Impact</span> Web Experiences.
              </h1>
              <p className="text-lg text-textSecondary leading-relaxed max-w-xl" data-testid="hero-description">
                I specialize in modern front-end architecture, healthcare UI, and accessible design systems—turning complex requirements into interfaces that feel sharp, fast, and grounded.
              </p>
              <p className="text-base text-textSecondary">
                Healthcare &amp; Patient Portals · React / Next.js / TypeScript · Accessibility · WCAG 2.1 · Based in Parsippany, New Jersey
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
                <Button asChild variant="secondary" size="lg" className="border-2 border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white rounded-pill px-10 py-6 text-base button-lift">
                  <a href="/assets/Earl_Hickson_Jr_FrontEnd_Engineer.docx" download>Download Resume</a>
                </Button>
                <Button asChild variant="secondary" size="lg" className="border-2 border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white rounded-pill px-10 py-6 text-base button-lift" data-testid="button-contact">
                  <a href="mailto:e@ehicksonjr.com">Get In Touch</a>
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
                  Building thoughtful, high-impact web experiences with modern front-end architecture, healthcare UI, and accessible design systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20 animate-slide-up max-w-3xl mx-auto">
            <div className="text-xs text-dominant font-bold mb-2 uppercase tracking-wide">Explore</div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-textPrimary">
              Featured Front-End <span className="gradient-text">Work</span>
            </h2>
            <p className="text-xl text-textSecondary leading-relaxed">
              A snapshot of the front-end projects and demos I am most proud of. These reflect real-world work I have done across healthcare, nonprofit, and community spaces. Visit the full Projects page for detailed write-ups.
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
                    {project.tags.join(" · ")}
                  </div>
                  <h3 className="font-bold text-2xl mb-4 text-textPrimary leading-tight">{project.title}</h3>
                  <p className="text-base text-textSecondary mb-6 leading-relaxed">{project.summary}</p>
                  <div className="flex gap-3 mt-2">
                    <Button asChild size="sm" variant="secondary">
                      <Link to="/projects">View Project</Link>
                    </Button>
                    {project.links?.repo && (
                      <Button asChild size="sm" variant="secondary">
                        <a href={project.links.repo} target="_blank" rel="noopener noreferrer">View Code</a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button asChild variant="secondary" size="lg" className="border-2 border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white rounded-pill px-10 py-6 text-base button-lift">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How I Work With Teams Section */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-textPrimary">
              How I Work With Teams and Clients
            </h2>
            <p className="text-xl text-textSecondary mb-10 leading-relaxed">
              I build front-end experiences that emphasize clarity, accessibility, and strong technical structure. I collaborate closely with backend developers, designers, and product teams to turn complex workflows into intuitive interfaces—especially in healthcare and regulated environments. My focus is always on maintainability, performance, and clean communication.
            </p>
            <ul className="space-y-4 text-lg text-textSecondary">
              <li className="flex items-start gap-3">
                <i className="fas fa-check text-dominant mt-1" />
                <span>Turn complex workflows into clear front-end flows</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-check text-dominant mt-1" />
                <span>Balance design systems, performance, and business constraints</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-check text-dominant mt-1" />
                <span>Build maintainable, component-driven UIs</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-check text-dominant mt-1" />
                <span>Communicate clearly with technical and non-technical partners</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services Section - What I Actually Ship */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20 animate-slide-up max-w-3xl mx-auto">
            <div className="text-xs text-dominant font-bold mb-2 uppercase tracking-wide">What I Ship</div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-textPrimary">
              What I Actually <span className="gradient-text">Ship</span>
            </h2>
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 p-8 rounded-3xl flex items-start gap-6 card-hover shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-code text-dominant text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3 text-textPrimary">Front-End Engineering</h3>
                <p className="text-textSecondary text-base leading-relaxed">
                  Building modern, component-driven UIs with React, Next.js, and TypeScript.
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-3xl flex items-start gap-6 card-hover shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-layer-group text-dominant text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3 text-textPrimary">Design Systems &amp; UI Libraries</h3>
                <p className="text-textSecondary text-base leading-relaxed">
                  Creating scalable, token-driven systems shaped for growth and accessibility.
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-3xl flex items-start gap-6 card-hover shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-universal-access text-dominant text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3 text-textPrimary">Accessibility &amp; UX Refinement</h3>
                <p className="text-textSecondary text-base leading-relaxed">
                  Improving interfaces through WCAG 2.1 compliance, usability enhancements, and intentional design choices.
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-3xl flex items-start gap-6 card-hover shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-dominant/10 flex items-center justify-center">
                <i className="fas fa-globe text-dominant text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3 text-textPrimary">CMS &amp; Marketing Sites</h3>
                <p className="text-textSecondary text-base leading-relaxed">
                  High-performing marketing sites and custom CMS solutions with clean information architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code, Culture, and Discipline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
            <div className="animate-slide-up animation-delay-200">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <img
                  src={profileImage}
                  alt="Earl Hickson Jr."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="animate-slide-up">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-textPrimary leading-tight">
                Code, Culture, and Discipline.
              </h2>
              <p className="text-xl text-textSecondary mb-10 leading-relaxed">
                I am a front-end developer with a background in graphic design, healthcare UI, and martial arts. My work blends technical consistency with a grounded sense of culture, structure, and discipline shaped by Brazilian Jiu-Jitsu.
              </p>
              <Button asChild variant="secondary" size="lg" className="border-2 border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white rounded-pill px-10 py-6 text-base button-lift">
                <Link to="/about">Read My Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-textPrimary leading-tight">
                Let's Build Something That Actually Feels Good to Use.
              </h2>
              <p className="text-xl text-textSecondary mb-10 leading-relaxed">
                Whether it is a patient portal, an internal tool, or a modern front-end system, I bring clarity, structure, and thoughtful engineering to every project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-dominant hover:bg-blue-700 text-white rounded-pill px-10 py-6 text-base button-lift shadow-sm">
                  <Link to="/projects">View Projects</Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="border-2 border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white rounded-pill px-10 py-6 text-base button-lift">
                  <a href="mailto:e@ehicksonjr.com">Get In Touch</a>
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

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-textPrimary">
            Let's Collaborate Together
          </h2>
          <p className="text-xl text-textSecondary mb-10 leading-relaxed max-w-2xl mx-auto">
            Let's turn your ideas into stunning digital experiences with creativity and precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="border-2 border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white rounded-pill px-10 py-6 text-base button-lift">
              <a href="/assets/Earl_Hickson_Jr_FrontEnd_Engineer.docx" download>Get Template</a>
            </Button>
            <Button asChild size="lg" className="bg-dominant hover:bg-blue-700 text-white rounded-pill px-10 py-6 text-base button-lift shadow-sm">
              <a href="mailto:e@ehicksonjr.com">Get In Touch</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/lib/projects";
import { motion } from "framer-motion";
import profileImage from "@/images/me.png";

const SITE = "https://www.ehicksonjr.com";

const experiences = [
  {
    title: "Front-End Development",
    years: "6+ Years",
    description: "React, Angular, Vue, TypeScript with focus on accessibility and performance.",
    icon: "💻",
  },
  {
    title: "Healthcare & Enterprise",
    years: "3+ Years",
    description: "Patient portals, HIPAA compliance, complex multi-step workflows.",
    icon: "🏥",
  },
  {
    title: "Design Systems",
    years: "4+ Years",
    description: "Building and maintaining component libraries and design tokens.",
    icon: "🎨",
  },
  {
    title: "WCAG 2.1 AA",
    years: "Certified",
    description: "Accessible interfaces with semantic HTML, ARIA, and keyboard navigation.",
    icon: "♿",
  },
];

export default function Home() {
  const allProjects = getAllProjects();
  // Get the first 4 projects for the projects section
  const displayProjects = allProjects.slice(0, 4);
  
  const title = "Earl Hickson Jr. – Senior Front-End Engineer";
  const description =
    "Senior Front-End Engineer building accessible, responsive, and performance-focused web interfaces. 6+ years with React, Angular, Vue, and TypeScript across healthcare, marketing, and enterprise domains. Based in Parsippany, NJ.";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-base">
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
      <section className="w-full flex justify-center px-4 bg-base pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="w-full max-w-content">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center px-4 py-2 rounded-pill bg-dominant/10 text-dominant text-sm font-medium border border-dominant/20"
              >
                <span className="w-2 h-2 bg-dominant rounded-full mr-2 animate-pulse" />
                Available for Senior Front-End roles & select freelance projects
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-display text-5xl md:text-6xl lg:text-7xl text-textPrimary tracking-tight leading-tight"
                data-testid="hero-title-primary"
              >
                Senior Front-End Engineer
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl lg:text-2xl text-gray-600 font-medium"
              >
                React • Angular • TypeScript
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-textSecondary text-base"
              >
                Parsippany, NJ
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm"
              >
                <div>
                  <div className="text-2xl md:text-3xl font-display font-bold text-dominant mb-1">+37%</div>
                  <div className="text-xs text-textSecondary">Lead Conversions</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-display font-bold text-dominant mb-1">+25%</div>
                  <div className="text-xs text-textSecondary">Organic Traffic</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-display font-bold text-dominant mb-1">+75%</div>
                  <div className="text-xs text-textSecondary">Engagement</div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Button asChild size="lg" className="rounded-full bg-dominant text-white hover:bg-dominant/90 px-8 shadow-lg hover:shadow-xl transition-all" data-testid="button-case-studies">
                  <Link to="/projects">
                    View Projects
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-gray-300 hover:border-dominant hover:bg-dominant/5 px-8" data-testid="button-resume">
                  <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer">
                    Download Resume
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Profile Image */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md">
                {/* Decorative background elements */}
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-dominant/10 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" />
                
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-lg">
                    <img
                      src={profileImage}
                      alt="Earl Hickson Jr."
                      className="w-full h-full object-cover"
                      data-testid="hero-image"
                    />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-textPrimary mb-2 font-bold">
                      Earl Hickson Jr.
                    </h2>
                    <p className="text-sm text-dominant mb-3 font-semibold">
                      Senior Front-End Engineer · BJJ Black Belt
                    </p>
                    <p className="text-sm text-textSecondary leading-relaxed">
                      Building responsive, accessible, and performance-focused web interfaces with modern front-end stacks.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="w-full flex justify-center px-4 bg-gradient-to-b from-white to-gray-50 py-20 md:py-28">
        <div className="w-full max-w-content">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.p
              variants={itemVariants}
              className="uppercase text-xs tracking-[0.2em] text-textSecondary mb-4 font-semibold"
            >
              PROJECTS
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-textPrimary mb-6 tracking-tight font-bold"
            >
              Featured Work
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto"
            >
              Real-world front-end projects with measurable business impact
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {displayProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block h-full"
                >
                  <div className="h-full bg-white border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Project Image Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-dominant/20 via-dominant/10 to-accent/10 rounded-2xl mb-6 overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl opacity-20">
                          {index === 0 && "🏥"}
                          {index === 1 && "📱"}
                          {index === 2 && "🎨"}
                          {index === 3 && "⚡"}
                        </div>
                      </div>
                      {project.thumbnail && (
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-2xl text-textPrimary group-hover:text-dominant transition-colors font-bold">
                          {project.title}
                        </h3>
                        {project.year && (
                          <span className="text-xs uppercase tracking-wide text-textSecondary whitespace-nowrap px-3 py-1 bg-gray-100 rounded-full">
                            {project.year}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-dominant font-semibold">
                        {project.role}
                      </p>

                      <p className="text-base text-accent font-bold">
                        {project.impact}
                      </p>

                      {project.description && (
                        <p className="text-sm text-textSecondary leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-3 py-1.5 text-xs font-medium rounded-full bg-dominant/10 text-dominant border border-dominant/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" variant="outline" className="rounded-full border-2 border-dominant text-dominant hover:bg-dominant hover:text-white px-8 shadow-md hover:shadow-xl transition-all">
              <Link to="/projects">
                View All Projects →
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="w-full flex justify-center px-4 bg-white py-20 md:py-28">
        <div className="w-full max-w-content">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.p
              variants={itemVariants}
              className="uppercase text-xs tracking-[0.2em] text-textSecondary mb-4 font-semibold"
            >
              EXPERTISE
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-textPrimary mb-6 tracking-tight font-bold"
            >
              Experience & Skills
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto"
            >
              Building web interfaces since 2018
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-6">{exp.icon}</div>
                <h3 className="font-display text-xl text-textPrimary mb-2 font-bold">
                  {exp.title}
                </h3>
                <p className="text-sm text-dominant uppercase tracking-wide mb-4 font-bold">
                  {exp.years}
                </p>
                <p className="text-sm text-textSecondary leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button asChild size="lg" className="rounded-full bg-dominant text-white hover:bg-dominant/90 px-8 shadow-lg hover:shadow-xl transition-all" data-testid="button-contact">
              <Link to="/about">
                Learn More About Me
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-gray-300 hover:border-dominant hover:bg-dominant/5 px-8">
              <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full flex justify-center px-4 bg-gradient-to-br from-dominant/5 via-white to-accent/5 py-20 md:py-28">
        <div className="w-full max-w-content">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-textPrimary mb-6 tracking-tight font-bold"
            >
              Let's Build Something Great
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              I'm available for full-time senior front-end roles and select freelance projects. 
              Let's discuss how I can help your team deliver accessible, reliable, and fast user experiences.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg" className="rounded-full bg-accent text-white hover:bg-accent/90 px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-all">
                <a href="mailto:e@ehicksonjr.com">
                  Contact Me
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-dominant text-dominant hover:bg-dominant hover:text-white px-10 py-6 text-lg shadow-md hover:shadow-xl transition-all">
                <Link to="/projects">
                  View All Projects
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

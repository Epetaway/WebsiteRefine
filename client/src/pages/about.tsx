import { Helmet } from "react-helmet-async";
import { workExperience } from "@/data/experience";
import aboutImage from "@/images/BLKBELT.png";

export default function About() {
  const skills = [
    { name: "JavaScript/TypeScript", level: "Expert", color: "bg-green-100 text-green-700" },
    { name: "React/Angular", level: "Expert", color: "bg-green-100 text-green-700" },
    { name: "WCAG/Accessibility", level: "Expert", color: "bg-green-100 text-green-700" },
    { name: "Design Systems & UI Patterns", level: "Expert", color: "bg-green-100 text-green-700" },
    { name: "Vue.js", level: "Proficient", color: "bg-blue-100 text-blue-700" },
    { name: "Node.js/Express", level: "Proficient", color: "bg-blue-100 text-blue-700" },
    { name: "API Integration", level: "Proficient", color: "bg-blue-100 text-blue-700" },
    { name: "Performance Optimization", level: "Proficient", color: "bg-blue-100 text-blue-700" },
    { name: "WordPress (themes & plugins)", level: "Proficient", color: "bg-blue-100 text-blue-700" },
    { name: "GraphQL", level: "Familiar", color: "bg-yellow-100 text-yellow-700" },
    { name: "Python", level: "Familiar", color: "bg-yellow-100 text-yellow-700" },
  ];

  const bjjLessons = [
    {
      title: "Calm Under Pressure",
      description:
        "BJJ teaches you to breathe and think clearly in stressful situations—the same mindset I apply when debugging production issues or handling tight deadlines.",
    },
    {
      title: "Iterative Improvement",
      description:
        "Every roll refines technique. Likewise, every code review and sprint retrospective is a chance to improve delivery and quality.",
    },
    {
      title: "Teaching & Mentorship",
      description:
        "Coaching on the mat sharpened my ability to break down concepts, give clear feedback, and support junior engineers.",
    },
  ];

  // Render in the order provided (array already newest → oldest).
  const timeline = workExperience;

  return (
    <div className="">
      <Helmet>
        <title>About — Earl Hickson Jr. | Front-End Developer</title>
        <meta
          name="description"
          content="Front-End Developer in Parsippany, NJ. Building accessible, performance-focused user interfaces with React, Angular, Vue, and TypeScript. BJJ black belt and mentor."
        />
        <link rel="canonical" href="https://www.ehicksonjr.com/about" />
        <meta property="og:title" content="About — Earl Hickson Jr." />
        <meta
          property="og:description"
          content="Front-End Developer focused on React, Angular, accessibility and performance. BJJ black belt and mentor."
        />
        <meta property="og:type" content="profile" />
      </Helmet>

      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="page-title">
              About Earl
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I'm a Front-End Developer who cares about clarity, correctness, and shipping real value. I specialize in React, Angular, TypeScript, and modern JavaScript—building frontends that are responsive, accessible, and easy to maintain. I've worked across healthcare, oncology content, marketing technology, and small-business systems. My strengths are component architecture, accessibility, performance, and turning designs into scalable UI patterns.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6" data-testid="section-title-technical">
                Areas of Expertise
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Component Architecture</h3>
                  <p className="text-gray-700">
                    Feature-first frontends built with predictable file structures, reusable components, and clean separation of concerns.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Type Safety</h3>
                  <p className="text-gray-700">
                    TypeScript-driven workflows where UI, state, and API expectations are all explicit and correct.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                  <p className="text-gray-700">
                    WCAG 2.1 AA semantics, proper labeling, keyboard flows, safe colors, and real-world healthcare accessibility requirements.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Performance</h3>
                  <p className="text-gray-700">
                    Fast rendering, minimal re-renders, optimized bundle use, and responsive UX across devices.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Data-Driven UI</h3>
                  <p className="text-gray-700">
                    I use analytics, A/B tests, and user behavior to drive UI decisions and measure impact clearly.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 mt-8">Professional Snapshot</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Healthcare Portal Engineering (Asembia)</h4>
                  <p className="text-sm text-gray-600">
                    Shipped UI fixes, accessibility updates, and refactors across large patient/provider portals. Improved responsiveness, resolved 150+ UI issues, and elevated front-end quality while integrating with backend teams.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Development Workflow</h3>
              <p className="text-sm text-gray-600 mb-4">
                I work in an iterative, experiment-friendly way: breaking down work into small tickets, collaborating in Figma, building component-driven UIs, opening clear pull requests, and using analytics to validate design and UX decisions. I'm comfortable working in Agile teams, participating in standups, and improving the front-end architecture over time.
              </p>
              <div className="text-sm text-gray-600 space-y-2">
                <div data-testid="workflow-1">• Tickets → Feature branches → Pull requests → Code reviews</div>
                <div data-testid="workflow-2">• CI/CD with GitHub Actions & Vercel</div>
                <div data-testid="workflow-3">• Design collaboration in Figma & Storybook</div>
                <div data-testid="workflow-4">• Analytics & A/B testing to inform UI decisions</div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6" data-testid="section-title-bjj">
                The BJJ Connection
              </h2>

              <div className="mb-6">
                <img
                  src={aboutImage}
                  alt="Earl Hickson Jr. training Brazilian Jiu-Jitsu"
                  className="w-full rounded-xl mb-4"
                  data-testid="about-image"
                />
              </div>

              <p className="text-gray-700 mb-6" data-testid="bio-bjj">
                My journey into Brazilian Jiu-Jitsu began in 2015 and profoundly shaped my approach to engineering and
                leadership. Earning my black belt is my most meaningful milestone outside of becoming a father.
              </p>

              <div className="space-y-4">
                {bjjLessons.map((lesson, i) => (
                  <div key={i} className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold text-gray-900" data-testid={`lesson-title-${i}`}>
                      {lesson.title}
                    </h4>
                    <p className="text-sm text-gray-600" data-testid={`lesson-description-${i}`}>
                      {lesson.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8" data-testid="section-title-experience">
              Professional Experience
            </h2>

            <ol className="relative border-l border-gray-200 pl-4">
              {timeline.map((job, i) => (
                <li key={job.id} className="mb-10 ml-4">
                  <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-primary-500" aria-hidden="true" />
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-500 text-white flex items-center justify-center">
                      <i className="fas fa-laptop-code text-sm" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold" data-testid={`job-title-${i}`}>
                        {job.position}
                      </h3>
                      <p className="text-sm text-gray-600" data-testid={`job-company-${i}`}>
                        {job.company} • {job.duration}
                      </p>
                    </div>
                  </div>

                  {job.description && (
                    <p className="mt-2 text-sm text-gray-700" data-testid={`job-description-${i}`}>
                      {job.description}
                    </p>
                  )}

                  {job.technologies?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.technologies.slice(0, 6).map((t, k) => (
                        <span
                          key={k}
                          className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
                          data-testid={`job-tech-${i}-${k}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>

            <div className="mt-8 text-center space-y-3">
              <div>
                <a
                  href="/assets/Earl_Hickson_Jr_FrontEnd_Engineer.docx"
                  download="Earl_Hickson_Jr_FrontEnd_Engineer.docx"
                  className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600 mr-6"
                  data-testid="download-resume"
                >
                  <i className="fas fa-download mr-2"></i>
                  Download Resume
                </a>
                <a
                  href="https://www.linkedin.com/in/earl-hickson-jr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600"
                  data-testid="link-linkedin-full"
                >
                  <i className="fab fa-linkedin mr-2"></i>
                  View on LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Personal Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8" data-testid="section-title-personal">
              Personal Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <i className="fas fa-heart text-primary-500 text-3xl mb-4"></i>
                <h3 className="font-semibold mb-2">Family First</h3>
                <p className="text-sm text-gray-600">
                  Father and husband who brings the same dedication to family life as to professional projects
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <i className="fas fa-fist-raised text-primary-500 text-3xl mb-4"></i>
                <h3 className="font-semibold mb-2">Martial Arts</h3>
                <p className="text-sm text-gray-600">
                  BJJ black belt teaching discipline, patience, and continuous improvement
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <i className="fas fa-code text-primary-500 text-3xl mb-4"></i>
                <h3 className="font-semibold mb-2">Engineering</h3>
                <p className="text-sm text-gray-600">
                  Creating accessible, performant web experiences that make a real difference
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6" data-testid="section-title-connect">
              Let's Connect
            </h2>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.linkedin.com/in/earl-hickson-jr/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                data-testid="link-linkedin"
              >
                <i className="fab fa-linkedin text-xl" />
              </a>
              <a
                href="https://github.com/Epetaway"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
                data-testid="link-github"
              >
                <i className="fab fa-github text-xl" />
              </a>
              <a
                href="https://www.instagram.com/earld.kaiju/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                data-testid="link-instagram"
              >
                <i className="fab fa-instagram text-xl" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

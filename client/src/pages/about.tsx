import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import aboutImage from "@/images/BLKBELT.png";

const skillMatrix = {
  expert: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Accessibility (WCAG 2.1)"],
  proficient: ["Node.js / Express", "WordPress (Theme & Plugin Dev)", "REST / API Integration", "Bootstrap"],
  familiar: ["GraphQL", "PHP", "Python", ".NET Front-End Integrations"]
};

export default function About() {
  return (
    <div>
      <Helmet>
        <title>About — Earl Hickson Jr. | Front-End Developer</title>
        <meta
          name="description"
          content="Front-End Developer in Parsippany, NJ. Building accessible, performance-focused user interfaces with React, TypeScript, and modern JavaScript. BJJ black belt and mentor."
        />
        <link rel="canonical" href="https://www.ehicksonjr.com/about" />
        <meta property="og:title" content="About — Earl Hickson Jr." />
        <meta
          property="og:description"
          content="Front-End Developer focused on React, accessibility and performance. BJJ black belt and mentor."
        />
        <meta property="og:type" content="profile" />
      </Helmet>

      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="page-title">
              Code, Culture, and Discipline.
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I am a front-end developer based in Parsippany, NJ with over six years of experience building modern, accessible interfaces. My background in graphic design and Brazilian Jiu-Jitsu gives me a structured, disciplined approach to UI engineering. I have contributed to healthcare platforms, nonprofit campaigns, and community-focused brands—always with a focus on clarity and maintainability.
            </p>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6" data-testid="section-title-background">
                Background
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                I started in graphic design before moving into front-end development, where I discovered how much I enjoy building interfaces that do not just look good—they feel good to use. My work spans healthcare, nonprofits, membership systems, and community brands.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Years of Brazilian Jiu-Jitsu training shaped my mindset: discipline, patience, refinement. The same approach fuels how I write code, architect components, and collaborate with teams.
              </p>
            </div>

            <div>
              <img
                src={aboutImage}
                alt="Earl Hickson Jr. training Brazilian Jiu-Jitsu"
                className="w-full rounded-xl shadow-lg"
                data-testid="about-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skill Matrix */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" data-testid="section-title-skills">
            Skill Matrix
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Expert */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-green-700">Expert</h3>
              <ul className="space-y-2">
                {skillMatrix.expert.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Proficient */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Proficient</h3>
              <ul className="space-y-2">
                {skillMatrix.proficient.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Familiar */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-yellow-700">Familiar</h3>
              <ul className="space-y-2">
                {skillMatrix.familiar.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span className="text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-dominant hover:bg-blue-700 text-white rounded-xl px-8 py-4">
              <Link to="/projects">View Projects</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white rounded-xl px-8 py-4">
              <a href="mailto:e@ehicksonjr.com">Get In Touch</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

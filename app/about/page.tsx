import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: 'About Earl - Earl Hickson Jr.',
  description: 'Engineer, designer, Brazilian Jiu-Jitsu black belt, and lifelong learner based in Parsippany, New Jersey.',
};

export default function About() {
  const skills = [
    { category: "Frontend Frameworks", items: ["React 18", "Next.js 14", "TypeScript", "Vue.js"] },
    { category: "CSS & Styling", items: ["Tailwind CSS", "Styled Components", "SCSS", "Bootstrap"] },
    { category: "State Management", items: ["Redux Toolkit", "Zustand", "React Query", "Context API"] },
    { category: "Build Tools", items: ["Vite", "Webpack", "Rollup", "Turbo"] },
    { category: "Testing", items: ["Jest", "React Testing Library", "Cypress", "Playwright"] },
    { category: "Backend & Database", items: ["Node.js", "PostgreSQL", "MongoDB", "Prisma"] },
    { category: "DevOps & Deployment", items: ["Docker", "Vercel", "AWS", "GitHub Actions"] },
    { category: "Design & UX", items: ["Figma", "Adobe Creative Suite", "Accessibility", "Design Systems"] },
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text" data-testid="page-title">About Earl</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Engineer, designer, Brazilian Jiu-Jitsu black belt, and lifelong learner based in Parsippany, New Jersey
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold mb-8" data-testid="section-title-bio">Professional Journey</h2>
            
            <p className="text-gray-600 mb-6" data-testid="bio-paragraph-1">
              I'm a Senior Front-End Engineer with over 8 years of experience building scalable web applications 
              and user interfaces. My journey began with a passion for creating digital experiences that not only 
              look great but perform exceptionally and serve users of all abilities.
            </p>
            
            <p className="text-gray-600 mb-6" data-testid="bio-paragraph-2">
              I specialize in React ecosystem development, with deep expertise in TypeScript, Next.js, and modern 
              CSS frameworks. I'm particularly passionate about accessibility (WCAG compliance), performance 
              optimization, and building design systems that scale across organizations.
            </p>
            
            <p className="text-gray-600 mb-8" data-testid="bio-paragraph-3">
              Beyond coding, I'm a Brazilian Jiu-Jitsu black belt and instructor. The discipline, problem-solving, 
              and continuous learning mindset from martial arts directly translates to my approach in software 
              engineering—always seeking elegant solutions to complex problems.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" data-testid="section-title-skills">Technical Skills</h2>
            <p className="text-xl text-gray-600">Technologies and tools I work with daily</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-gray-900" data-testid={`skill-category-${index}`}>
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li 
                      key={skillIndex} 
                      className="text-gray-600 text-sm"
                      data-testid={`skill-${index}-${skillIndex}`}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" data-testid="section-title-values">Engineering Values</h2>
            <p className="text-xl text-gray-600">What drives my approach to software development</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3" data-testid="value-accessibility">Accessibility First</h3>
              <p className="text-gray-600">
                Building for everyone means considering all users from the start, not as an afterthought.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rocket text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3" data-testid="value-performance">Performance Matters</h3>
              <p className="text-gray-600">
                Every millisecond counts. Fast, efficient code improves user experience and business outcomes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-graduation-cap text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3" data-testid="value-learning">Continuous Learning</h3>
              <p className="text-gray-600">
                Technology evolves rapidly. Staying curious and adaptable is essential for long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" data-testid="section-title-fun-facts">Beyond the Code</h2>
            <p className="text-xl text-gray-600">A few things that make me who I am</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <i className="fas fa-fist-raised text-2xl text-yellow-600 mr-3"></i>
                <h3 className="text-xl font-bold" data-testid="fact-bjj">Brazilian Jiu-Jitsu Black Belt</h3>
              </div>
              <p className="text-gray-600">
                15+ years on the mats, competing and teaching. The problem-solving mindset and continuous 
                improvement philosophy directly influences my approach to engineering.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <i className="fas fa-palette text-2xl text-pink-600 mr-3"></i>
                <h3 className="text-xl font-bold" data-testid="fact-design">Design Background</h3>
              </div>
              <p className="text-gray-600">
                Started in graphic design before transitioning to development. This background helps bridge 
                the gap between design and engineering teams.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <i className="fas fa-mountain text-2xl text-green-600 mr-3"></i>
                <h3 className="text-xl font-bold" data-testid="fact-outdoors">Outdoor Enthusiast</h3>
              </div>
              <p className="text-gray-600">
                When I'm not coding or training, you'll find me hiking, camping, or exploring nature. 
                Fresh air helps clear the mind for creative problem-solving.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <i className="fas fa-book text-2xl text-blue-600 mr-3"></i>
                <h3 className="text-xl font-bold" data-testid="fact-learning">Lifelong Learner</h3>
              </div>
              <p className="text-gray-600">
                Always reading, whether it's technical documentation, industry blogs, or books on psychology 
                and human behavior to better understand user needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="cta-title">Let's Build Something Great</h2>
          <p className="text-xl text-gray-600 mb-8">
            Interested in working together? I'd love to hear about your project and explore how I can contribute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" data-testid="button-contact">
              <a href="mailto:e@ehicksonjr.com">
                <i className="fas fa-envelope mr-3"></i>
                Get In Touch
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" data-testid="button-linkedin">
              <a href="https://linkedin.com/in/earl-hickson-jr" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin mr-3"></i>
                Connect on LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
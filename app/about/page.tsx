import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'About Earl - Earl Hickson Jr.',
  description: 'Engineer, designer, Brazilian Jiu-Jitsu black belt, and lifelong learner based in Parsippany, New Jersey.',
};

export default function About() {
  return (
    <div className="parent" style={{fontFamily: "'Inter', sans-serif"}}>
      {/* Magic Pattern Background */}
      <div className="fixed inset-0 w-full h-full bg-white" style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'repeat',
        backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 2560 1440' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='b' x='0' y='0' width='2560' height='1440'%3E%3Cpath fill='url(%23a)' d='M0 0h2560v1440H0z'/%3E%3C/mask%3E%3Cpath fill='%23fff' d='M0 0h2560v1440H0z'/%3E%3Cg mask='url(%23b)'%3E%3Cg transform='scale(1.1)' style='transform-origin:center center'%3E%3Ccircle cx='366' cy='91.5' r='4.608'/%3E%3Ccircle cx='549' cy='91.5' r='4.608'/%3E%3Ccircle cx='732' cy='91.5' r='4.608'/%3E%3Ccircle cx='915' cy='91.5' r='4.608'/%3E%3Ccircle cx='1281' cy='91.5' r='4.608'/%3E%3Ccircle cx='1647' cy='91.5' r='4.608'/%3E%3Ccircle cx='1830' cy='91.5' r='4.608'/%3E%3Ccircle cx='2013' cy='91.5' r='4.608'/%3E%3Ccircle cx='2196' cy='91.5' r='4.608'/%3E%3Ccircle cx='2379' cy='91.5' r='4.608'/%3E%3Ccircle cx='2562' cy='91.5' r='4.608'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='a'%3E%3Cstop offset='0' stop-color='%23fff'/%3E%3Cstop offset='1' stop-color='%23fff'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")`
      }}></div>

      {/* Header Section */}
      <section className="relative section py-28 px-6 bg-white" id="about">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-white p-2 rounded" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
              About Earl
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto bg-white p-2 rounded">
              Engineer, designer, Brazilian Jiu-Jitsu black belt, and lifelong learner based in Parsippany, New Jersey
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="relative section py-28 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold mb-8 bg-white p-2 rounded" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
              Professional Journey
            </h2>
            
            <div className="space-y-6">
              <p className="text-black bg-white p-2 rounded text-lg">
                I'm a Senior Front-End Engineer with over 8 years of experience building scalable web applications 
                and user interfaces. My journey began with a passion for creating digital experiences that not only 
                look great but perform exceptionally and serve users of all abilities.
              </p>
              
              <p className="text-black bg-white p-2 rounded text-lg">
                I specialize in React ecosystem development, with deep expertise in TypeScript, Next.js, and modern 
                CSS frameworks. I'm particularly passionate about accessibility (WCAG compliance), performance 
                optimization, and building design systems that scale across organizations.
              </p>
              
              <p className="text-black bg-white p-2 rounded text-lg">
                Beyond coding, I'm a Brazilian Jiu-Jitsu black belt and instructor. The discipline, problem-solving, 
                and continuous learning mindset from martial arts directly translates to my approach in software 
                engineering—always seeking elegant solutions to complex problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="relative section py-28 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 bg-white p-2 rounded inline-block" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
              Technical Skills
            </h2>
            <p className="text-xl text-black bg-white p-2 rounded inline-block">Technologies and tools I work with daily</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "Frontend Frameworks",
                items: ["React 18", "Next.js 14", "TypeScript", "Vue.js"]
              },
              {
                category: "CSS & Styling", 
                items: ["Tailwind CSS", "Styled Components", "SCSS", "Bootstrap"]
              },
              {
                category: "State Management",
                items: ["Redux Toolkit", "Zustand", "React Query", "Context API"]
              },
              {
                category: "Build Tools",
                items: ["Vite", "Webpack", "Rollup", "Turbo"]
              },
              {
                category: "Testing",
                items: ["Jest", "React Testing Library", "Cypress", "Playwright"]
              },
              {
                category: "Backend & Database",
                items: ["Node.js", "PostgreSQL", "MongoDB", "Prisma"]
              },
              {
                category: "DevOps & Deployment",
                items: ["Docker", "Vercel", "AWS", "GitHub Actions"]
              },
              {
                category: "Design & UX",
                items: ["Figma", "Adobe Creative Suite", "Accessibility", "Design Systems"]
              }
            ].map((skillGroup, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-black" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-gray-700 flex items-center">
                      <i className="fas fa-check text-green-600 mr-2 text-sm"></i>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative section py-28 px-6 text-center text-black bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 bg-white p-2 rounded inline-block" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
            Ready to work together?
          </h2>
          <p className="text-xl mb-8 bg-white p-2 rounded inline-block">
            Let's build something amazing together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contact" className="inline-block px-8 py-4 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              Get In Touch
            </Link>
            <Link href="/case-studies" className="inline-block px-8 py-4 border-2 border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300">
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
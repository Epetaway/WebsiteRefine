import { workExperience } from "@/data/experience";
import aboutImage from "@/images/justMe.png";

export default function About() {
  const skills = [
    { name: "JavaScript/TypeScript", level: "Expert", color: "bg-green-100 text-green-700" },
    { name: "React/Angular", level: "Expert", color: "bg-green-100 text-green-700" },
    { name: "WCAG/Accessibility", level: "Expert", color: "bg-green-100 text-green-700" },
    { name: "Design Systems", level: "Expert", color: "bg-green-100 text-green-700" },
    { name: "Node.js/Express", level: "Proficient", color: "bg-blue-100 text-blue-700" },
    { name: "GraphQL", level: "Familiar", color: "bg-yellow-100 text-yellow-700" },
    { name: "Python", level: "Familiar", color: "bg-yellow-100 text-yellow-700" }
  ];

  const bjjLessons = [
    {
      title: "Calm Under Pressure",
      description: "BJJ teaches you to breathe and think clearly in stressful situations—the same mindset I apply when debugging critical production issues or handling tight deadlines."
    },
    {
      title: "Iterative Improvement",
      description: "Every roll is a chance to refine technique. Similarly, every code review and sprint retrospective is an opportunity to enhance our development process."
    },
    {
      title: "Teaching & Mentorship",
      description: "Coaching others on the mat improved my ability to break down complex concepts, give clear feedback, and support junior engineers' growth."
    }
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="page-title">About Earl</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Engineer, designer, Brazilian Jiu-Jitsu black belt, and lifelong learner based in Parsippany, New Jersey
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6" data-testid="section-title-technical">Technical Background</h2>
              <p className="text-gray-700 mb-6" data-testid="bio-technical">
                I'm a Front-End Engineer and Graphic Designer with a Bachelor of Arts in Graphic Design from Kean University and a Tech Degree in Front-End Web Development from Team Treehouse. I specialize in creating user-friendly, accessible web experiences that balance technical excellence with compelling design.
              </p>
              
              <h3 className="text-xl font-semibold mb-4">Skills Matrix</h3>
              <div className="space-y-3 mb-8">
                {skills.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium" data-testid={`skill-name-${index}`}>{skill.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${skill.color}`} data-testid={`skill-level-${index}`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-4">Development Workflow</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div data-testid="workflow-1">• Tickets → Feature branches → Pull requests → Code reviews</div>
                <div data-testid="workflow-2">• Test-driven development with Jest and Cypress</div>
                <div data-testid="workflow-3">• CI/CD pipelines with GitHub Actions and Vercel</div>
                <div data-testid="workflow-4">• Design collaboration with Figma and Storybook</div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6" data-testid="section-title-bjj">The BJJ Connection</h2>
              
              <div className="mb-6">
                <img 
                  src={aboutImage} 
                  alt="Earl Hickson Jr. at a professional event, showcasing his personal and professional development" 
                  className="w-full rounded-xl mb-4"
                  data-testid="about-image"
                />
              </div>

              <p className="text-gray-700 mb-6" data-testid="bio-bjj">
                My journey into Brazilian Jiu-Jitsu began in 2015 and has profoundly shaped both my personal development and professional approach. Earning my black belt is the most meaningful milestone of my life outside becoming a father.
              </p>

              <div className="space-y-4">
                {bjjLessons.map((lesson, index) => (
                  <div key={index} className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold text-gray-900" data-testid={`lesson-title-${index}`}>{lesson.title}</h4>
                    <p className="text-sm text-gray-600" data-testid={`lesson-description-${index}`}>{lesson.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8" data-testid="section-title-experience">Professional Experience</h2>
            <div className="space-y-6">
              {workExperience.slice(0, 5).map((job, index) => (
                <div key={job.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-laptop-code text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold" data-testid={`job-title-${index}`}>{job.position}</h3>
                    <p className="text-sm text-gray-600" data-testid={`job-company-${index}`}>{job.company} • {job.duration}</p>
                    {job.description && (
                      <p className="text-sm text-gray-700 mt-1" data-testid={`job-description-${index}`}>{job.description}</p>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="text-center">
                <a 
                  href="https://www.linkedin.com/in/earl-hickson-jr/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600"
                  data-testid="link-linkedin-full"
                >
                  <i className="fab fa-linkedin mr-2"></i>
                  View Full Resume on LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Personal Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8" data-testid="section-title-personal">Personal Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <i className="fas fa-heart text-primary-500 text-3xl mb-4"></i>
                <h3 className="font-semibold mb-2">Family First</h3>
                <p className="text-sm text-gray-600">Father and husband who brings the same dedication to family life as to professional projects</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <i className="fas fa-fist-raised text-primary-500 text-3xl mb-4"></i>
                <h3 className="font-semibold mb-2">Martial Arts</h3>
                <p className="text-sm text-gray-600">BJJ black belt teaching discipline, patience, and continuous improvement</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <i className="fas fa-code text-primary-500 text-3xl mb-4"></i>
                <h3 className="font-semibold mb-2">Engineering</h3>
                <p className="text-sm text-gray-600">Creating accessible, performant web experiences that make a real difference</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6" data-testid="section-title-connect">Let's Connect</h2>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://www.linkedin.com/in/earl-hickson-jr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                data-testid="link-linkedin"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a 
                href="https://github.com/ehicksonjr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
                data-testid="link-github"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a 
                href="https://www.instagram.com/earld.kaiju/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                data-testid="link-instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

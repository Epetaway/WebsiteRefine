import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Earl Hickson Jr. - Senior Front-End Engineer',
  description: 'Learn about Earl Hickson Jr., a Senior Front-End Engineer and Brazilian Jiu-Jitsu black belt based in Parsippany, New Jersey.',
}

export default function About() {
  const skills = [
    { name: "JavaScript/TypeScript", level: "Expert", color: "bg-green-100 text-green-700" },
    { name: "React/Angular", level: "Expert", color: "bg-green-100 text-green-700" },
    { name: "WCAG/Accessibility", level: "Expert", color: "bg-green-100 text-green-700" },
    { name: "Design Systems", level: "Expert", color: "bg-green-100 text-green-700" },
    { name: "Node.js/Express", level: "Proficient", color: "bg-blue-100 text-blue-700" },
    { name: "GraphQL", level: "Familiar", color: "bg-yellow-100 text-yellow-700" },
    { name: "Python", level: "Familiar", color: "bg-yellow-100 text-yellow-700" }
  ]

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
  ]

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
              <p className="text-gray-700 mb-6">
                Brazilian Jiu-Jitsu isn't just a hobby—it's shaped how I approach engineering challenges. 
                The principles of leverage, timing, and continuous improvement translate directly to writing clean, efficient code.
              </p>

              <div className="space-y-6">
                {bjjLessons.map((lesson, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-2" data-testid={`bjj-lesson-title-${index}`}>{lesson.title}</h4>
                    <p className="text-sm text-gray-600" data-testid={`bjj-lesson-description-${index}`}>
                      {lesson.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Currently Training</h4>
                <p className="text-sm text-gray-700">
                  Black belt in Brazilian Jiu-Jitsu, actively competing and teaching private lessons. 
                  The discipline and problem-solving skills from BJJ directly enhance my engineering work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
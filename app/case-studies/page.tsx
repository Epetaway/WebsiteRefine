import CaseStudyCard from "@/components/ui/case-study-card";
import { projects } from "@/data/projects";

export const metadata = {
  title: 'Case Studies - Earl Hickson Jr.',
  description: 'Real projects, measurable results, production code. See how I solve complex front-end challenges.',
};

export default function CaseStudies() {
  const featuredProject = projects.find(p => p.category === 'featured');
  const otherProjects = projects.filter(p => p.category !== 'featured');

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text" data-testid="page-title">Front-End Case Studies</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real projects, measurable results, production code. Here's how I solve complex front-end challenges 
              with modern frameworks, accessibility standards, and performance optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      {featuredProject && (
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <CaseStudyCard project={featuredProject} featured={true} />
          </div>
        </section>
      )}

      {/* Other Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12" data-testid="section-title-other">Other Case Studies</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {otherProjects.slice(0, 2).map((project) => (
              <CaseStudyCard key={project.id} project={project} featured={false} />
            ))}
          </div>

          {/* Additional Projects Grid */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8" data-testid="section-title-additional">Additional Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.slice(2).map((project) => (
                <div key={project.id} className="bg-gradient-to-br from-white to-blue-50/50 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 border border-blue-100/50">
                  <h4 className="font-bold mb-2 text-gray-900" data-testid={`project-title-${project.id}`}>{project.title}</h4>
                  <p className="text-sm text-gray-600 mb-4" data-testid={`project-description-${project.id}`}>
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium" data-testid={`project-stack-${project.id}`}>
                      {project.stack[0]}
                    </span>
                    <div className="flex gap-2">
                      {project.links.demo && (
                        <a 
                          href={project.links.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-500 text-sm hover:text-primary-600"
                          data-testid={`project-demo-${project.id}`}
                        >
                          Demo
                        </a>
                      )}
                      {project.links.repo && (
                        <a 
                          href={project.links.repo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 text-sm hover:text-gray-700"
                          data-testid={`project-repo-${project.id}`}
                        >
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="cta-title">Interested in Working Together?</h2>
          <p className="text-xl text-gray-600 mb-8">
            I'm available for senior front-end development roles and consulting projects. 
            Let's discuss how I can help your team build exceptional user experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:hello@ehicksonjr.com" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
              data-testid="button-contact"
            >
              <i className="fas fa-envelope mr-2"></i>
              Start a Conversation
            </a>
            <a 
              href="/api/resume" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-500 transition-colors"
              data-testid="button-resume"
            >
              <i className="fas fa-download mr-2"></i>
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
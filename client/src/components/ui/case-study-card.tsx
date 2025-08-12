import { Link } from "wouter";
import { Project } from "@/data/projects";

interface CaseStudyCardProps {
  project: Project;
  featured?: boolean;
}

export default function CaseStudyCard({ project, featured = false }: CaseStudyCardProps) {
  if (featured) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              <i className="fas fa-star mr-2"></i>
              Featured Project
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4" data-testid={`title-${project.id}`}>
              {project.title}
            </h3>
            <p className="text-lg text-gray-600 mb-6" data-testid={`description-${project.id}`}>
              {project.description}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  <i className="fas fa-exclamation-triangle text-red-600 text-xs"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Problem</h4>
                  <p className="text-gray-600 text-sm" data-testid={`problem-${project.id}`}>{project.problem}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  <i className="fas fa-cog text-blue-600 text-xs"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Solution</h4>
                  <p className="text-gray-600 text-sm" data-testid={`solution-${project.id}`}>{project.solution}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  <i className="fas fa-chart-line text-green-600 text-xs"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Result</h4>
                  <p className="text-gray-600 text-sm" data-testid={`result-${project.id}`}>{project.result}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              {project.links.demo && (
                <a 
                  href={project.links.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600"
                  data-testid={`link-demo-${project.id}`}
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  Live Demo
                </a>
              )}
              {project.links.repo && (
                <a 
                  href={project.links.repo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-600 font-semibold hover:text-gray-800"
                  data-testid={`link-repo-${project.id}`}
                >
                  <i className="fab fa-github mr-2"></i>
                  View Code
                </a>
              )}
            </div>
          </div>
          
          {/* Spec Sheet */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">Technical Specification</h4>
              <div className="space-y-3 text-sm">
                {project.stack.map((tech, index) => (
                  <div key={index}>
                    <span className="text-gray-500">
                      {index === 0 ? "Framework:" : index === 1 ? "Styling:" : index === 2 ? "APIs:" : "Other:"}
                    </span>
                    <span className="text-gray-900 ml-2" data-testid={`tech-${project.id}-${index}`}>{tech}</span>
                  </div>
                ))}
              </div>
              
              {project.features && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h5 className="font-semibold text-gray-900 mb-2">Key Features</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index} data-testid={`feature-${project.id}-${index}`}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-center">
      <div className="lg:col-span-2">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
          <i className="fas fa-palette mr-2"></i>
          {project.category}
        </div>
        <h3 className="text-xl lg:text-2xl font-bold mb-3" data-testid={`title-${project.id}`}>
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4" data-testid={`description-${project.id}`}>
          {project.description}
        </p>
        
        <div className="space-y-3 mb-6 text-sm">
          <div><strong>Challenge:</strong> <span data-testid={`problem-${project.id}`}>{project.problem}</span></div>
          <div><strong>Approach:</strong> <span data-testid={`solution-${project.id}`}>{project.solution}</span></div>
          <div><strong>Impact:</strong> <span data-testid={`result-${project.id}`}>{project.result}</span></div>
        </div>

        <div className="flex gap-4 mb-4">
          {project.links.demo && (
            <a 
              href={project.links.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500 font-medium hover:text-primary-600"
              data-testid={`link-demo-${project.id}`}
            >
              Live Site
            </a>
          )}
          {project.links.repo && (
            <a 
              href={project.links.repo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 font-medium hover:text-gray-800"
              data-testid={`link-repo-${project.id}`}
            >
              Repository
            </a>
          )}
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-2xl p-6">
        <div className="text-sm text-gray-600 mb-4">Tech Stack</div>
        <div className="space-y-2">
          {project.stack.slice(0, 4).map((tech, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-sm" data-testid={`tech-${project.id}-${index}`}>{tech}</span>
              <span className="text-xs text-gray-500">
                {index === 0 ? "Framework" : index === 1 ? "Styling" : index === 2 ? "Tools" : "Platform"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

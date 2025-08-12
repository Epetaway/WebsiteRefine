import Link from "next/link";
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

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="font-semibold mb-4">Tech Stack</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    data-testid={`tech-${project.id}-${index}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium" data-testid={`category-${project.id}`}>{project.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium">Frontend Application</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
            {project.category.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-3" data-testid={`title-${project.id}`}>
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4" data-testid={`description-${project.id}`}>
          {project.description}
        </p>
      </div>

      <div className="space-y-3 mb-6 text-sm">
        <div>
          <span className="font-medium text-gray-900">Problem:</span>
          <p className="text-gray-600 mt-1" data-testid={`problem-${project.id}`}>{project.problem}</p>
        </div>
        <div>
          <span className="font-medium text-gray-900">Result:</span>
          <p className="text-gray-600 mt-1" data-testid={`result-${project.id}`}>{project.result}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.slice(0, 3).map((tech, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            data-testid={`tech-${project.id}-${index}`}
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
            +{project.stack.length - 3} more
          </span>
        )}
      </div>

      <div className="flex gap-3">
        {project.links.demo && (
          <a 
            href={project.links.demo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-500 font-medium text-sm hover:text-primary-600"
            data-testid={`link-demo-${project.id}`}
          >
            <i className="fas fa-external-link-alt mr-1"></i>
            Demo
          </a>
        )}
        {project.links.repo && (
          <a 
            href={project.links.repo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 font-medium text-sm hover:text-gray-800"
            data-testid={`link-repo-${project.id}`}
          >
            <i className="fab fa-github mr-1"></i>
            Code
          </a>
        )}
      </div>
    </div>
  );
}
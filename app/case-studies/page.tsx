import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Front-End Case Studies - Earl Hickson Jr.',
  description: 'Real projects, measurable results, production code. How I solve complex front-end challenges with modern frameworks, accessibility standards, and performance optimization.',
}

export default function CaseStudies() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="page-title">Front-End Case Studies</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real projects, measurable results, production code. Here's how I solve complex front-end challenges 
              with modern frameworks, accessibility standards, and performance optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-rocket text-blue-600 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold mb-4">Case Studies Coming Soon</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              I'm currently documenting detailed case studies of recent projects, including performance optimizations, 
              accessibility improvements, and technical architecture decisions. Check back soon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/api/resume" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <i className="fas fa-download mr-2"></i>
                Download Resume
              </a>
              <a 
                href="https://github.com/EHickson-Jr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="fab fa-github mr-2"></i>
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
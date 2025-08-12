import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Earl Hickson Jr.',
  description: 'Get in touch with Earl Hickson Jr. for senior front-end engineering opportunities or Brazilian Jiu-Jitsu lessons.',
}

export default function Contact() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="page-title">Get In Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to discuss engineering opportunities or Brazilian Jiu-Jitsu lessons? Let's connect.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Professional Contact */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-briefcase text-blue-600 text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold mb-4">Engineering Opportunities</h2>
              <p className="text-gray-600 mb-6">
                Interested in discussing senior front-end engineering roles, consulting projects, or technical collaborations?
              </p>
              <a 
                href="mailto:e@ehicksonjr.com?subject=Engineering Opportunity"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-envelope mr-2"></i>
                Email for Engineering
              </a>
            </div>

            {/* BJJ Contact */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-fist-raised text-red-600 text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold mb-4">BJJ Private Lessons</h2>
              <p className="text-gray-600 mb-6">
                Want to learn Brazilian Jiu-Jitsu or book private lessons? Let's talk about your training goals.
              </p>
              <a 
                href="mailto:e@ehicksonjr.com?subject=BJJ Private Lesson Inquiry"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <i className="fas fa-envelope mr-2"></i>
                Email for BJJ Lessons
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-6">Other Ways to Connect</h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="https://linkedin.com/in/earlhicksonjr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <i className="fab fa-linkedin mr-2"></i>
                LinkedIn
              </a>
              <a 
                href="https://github.com/EHickson-Jr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <i className="fab fa-github mr-2"></i>
                GitHub
              </a>
              <span className="inline-flex items-center text-gray-600">
                <i className="fas fa-map-marker-alt mr-2"></i>
                Parsippany, New Jersey
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
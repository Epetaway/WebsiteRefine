import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-6">
                <i className="fas fa-code mr-2"></i>
                Available for Senior Front-End Engineering Roles
              </div>
              <h1 className="text-6xl lg:text-8xl font-bold leading-tight mb-6">
                <span className="gradient-text" data-testid="hero-title-primary">Senior Front-End Engineer</span>
              </h1>
              <h3 className="text-xl lg:text-2xl text-gray-900 mb-6" data-testid="hero-title-secondary">
                React • JavaScript • UI/UX • Expanding into Full-Stack
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-testid="hero-description">
                Versatile Front-End Engineer with 6+ years creating responsive, accessible, high-performing web applications. 
                Proven track record: +37% lead conversions, +25% organic traffic, +75% live stream engagement.
                Based in Parsippany, New Jersey.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600" data-testid="button-case-studies">
                  <Link href="/case-studies">
                    <i className="fas fa-rocket mr-2"></i>
                    View Front-End Case Studies
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" data-testid="button-resume">
                  <a href="/api/resume" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-download mr-2"></i>
                    Download Resume (PDF)
                  </a>
                </Button>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">React</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">JavaScript ES6+</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">HTML5/CSS3</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Bootstrap 5</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Node.js</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">TypeScript</span>
              </div>

              {/* Social Proof */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">6+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">+37%</div>
                    <div className="text-sm text-gray-600">Lead Conversions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">+25%</div>
                    <div className="text-sm text-gray-600">Organic Traffic</div>
                  </div>
                </div>
              </div>

              {/* Quick Access */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild variant="ghost" className="justify-start" data-testid="link-github">
                  <a href="https://github.com/EHickson-Jr" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github mr-2"></i>
                    GitHub Profile
                  </a>
                </Button>
                <Button asChild variant="ghost" className="justify-start" data-testid="link-linkedin">
                  <a href="https://linkedin.com/in/earlhicksonjr" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin mr-2"></i>
                    LinkedIn Profile
                  </a>
                </Button>
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative animate-float">
              <img 
                src="https://www.ehicksonjr.com/_next/static/media/me.edd8b1e7.jpeg" 
                alt="Earl Hickson Jr. - Professional headshot of a Front-End Engineer" 
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                data-testid="hero-image"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl animate-bounce">
                <i className="fas fa-code"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="section-title-explore">Explore My Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From technical case studies to Brazilian Jiu-Jitsu coaching, discover the different facets of my professional journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Case Studies */}
            <Link href="/case-studies" data-testid="card-case-studies">
              <a className="group block">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <i className="fas fa-rocket text-blue-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Case Studies</h3>
                  <p className="text-gray-600 text-sm">Real projects with measurable results and production code</p>
                </div>
              </a>
            </Link>

            {/* About */}
            <Link href="/about" data-testid="card-about">
              <a className="group block">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <i className="fas fa-user text-green-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">About</h3>
                  <p className="text-gray-600 text-sm">My background, skills, and the BJJ connection to engineering</p>
                </div>
              </a>
            </Link>

            {/* Blog */}
            <Link href="/blog" data-testid="card-blog">
              <a className="group block">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <i className="fas fa-pen text-purple-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Blog</h3>
                  <p className="text-gray-600 text-sm">Technical insights and lessons from the mat</p>
                </div>
              </a>
            </Link>

            {/* BJJ Lessons */}
            <Link href="/earldkaiju" data-testid="card-bjj">
              <a className="group block">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                    <i className="fas fa-fist-raised text-red-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">BJJ Lessons</h3>
                  <p className="text-gray-600 text-sm">Private Brazilian Jiu-Jitsu coaching with a black belt</p>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
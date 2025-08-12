import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import WinTile from "@/components/ui/win-tile";
import TechBadge from "@/components/ui/tech-badge";
import BlogCard from "@/components/ui/blog-card";
import { blogPosts } from "@/data/blog-posts";

export default function Home() {
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 2);

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
                Proven track record of delivering measurable results and performance improvements.
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
                <TechBadge name="React" color="blue" />
                <TechBadge name="JavaScript ES6+" color="yellow" />
                <TechBadge name="HTML5/CSS3" color="orange" />
                <TechBadge name="Bootstrap 5" color="purple" />
                <TechBadge name="Node.js" color="green" />
                <TechBadge name="MongoDB" color="green" />
                <TechBadge name="WCAG 2.1" color="orange" />
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative animate-float">
              <div className="w-full max-w-md mx-auto h-96 bg-gradient-to-br from-primary-100 via-blue-50 to-purple-50 rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white/50">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary-500 rounded-full flex items-center justify-center text-white text-4xl mb-4 mx-auto shadow-lg">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Earl Hickson Jr.</h3>
                  <p className="text-gray-600 font-medium">Senior Front-End Engineer</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl animate-bounce shadow-lg">
                <i className="fas fa-laptop-code"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Win Tiles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="section-title-results">Proven Results</h2>
            <p className="text-xl text-gray-600">Recent wins and measurable impact across projects</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <WinTile
              icon="fas fa-tachometer-alt"
              title="Performance Optimization"
              metric="Time to Interactive"
              improvement="44% ↓"
              description="Employee Directory: Normalized API adapters, suspense-friendly fetch patterns, and skeleton states reduced TTI from 2.1s to 1.2s"
              stack="Stack: Next.js • React • TypeScript"
              bgColor="bg-gradient-to-br from-green-50 to-emerald-50"
              iconColor="bg-green-500"
              metricColor="text-green-600"
            />
            
            <WinTile
              icon="fas fa-universal-access"
              title="WCAG Compliance"
              metric="Accessibility Score"
              improvement="AA Level"
              description="Implemented comprehensive a11y patterns: focus management, ARIA labels, keyboard navigation, and color contrast improvements"
              stack="Tools: axe-core • WAVE • VoiceOver"
              bgColor="bg-gradient-to-br from-blue-50 to-indigo-50"
              iconColor="bg-blue-500"
              metricColor="text-blue-600"
            />
            
            <WinTile
              icon="fas fa-compress-alt"
              title="Bundle Optimization"
              metric="Bundle Size Reduction"
              improvement="73% ↓"
              description="Code splitting, tree shaking, and dynamic imports reduced initial bundle from 1.2MB to 320KB across portfolio projects"
              stack="Tools: Webpack • Vite • Bundle Analyzer"
              bgColor="bg-gradient-to-br from-purple-50 to-violet-50"
              iconColor="bg-purple-500"
              metricColor="text-purple-600"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="section-title-services">Services & Expertise</h2>
            <p className="text-xl text-gray-600">What I bring to your engineering team</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <i className="fas fa-cogs text-primary-500 text-2xl mb-4"></i>
              <h3 className="font-bold mb-2" data-testid="service-ui-engineering">UI Engineering</h3>
              <p className="text-sm text-gray-600">Component libraries, design tokens, responsive systems</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <i className="fas fa-cubes text-primary-500 text-2xl mb-4"></i>
              <h3 className="font-bold mb-2" data-testid="service-design-systems">Design Systems</h3>
              <p className="text-sm text-gray-600">Scalable component architectures, documentation, governance</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <i className="fas fa-universal-access text-primary-500 text-2xl mb-4"></i>
              <h3 className="font-bold mb-2" data-testid="service-accessibility">Accessibility</h3>
              <p className="text-sm text-gray-600">WCAG compliance, screen reader support, inclusive design</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <i className="fas fa-rocket text-primary-500 text-2xl mb-4"></i>
              <h3 className="font-bold mb-2" data-testid="service-performance">Performance</h3>
              <p className="text-sm text-gray-600">Core Web Vitals, bundle optimization, caching strategies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="section-title-blog">Latest Insights</h2>
            <p className="text-xl text-gray-600">From the intersection of development and Brazilian Jiu-Jitsu</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} featured={true} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" data-testid="button-view-all-posts">
              <Link href="/blog">
                View All Posts
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" data-testid="cta-title">Ready to Work Together?</h2>
          <p className="text-xl text-gray-600 mb-12">
            Let's discuss how I can contribute to your development team and help build exceptional user experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600" data-testid="button-contact">
              <a href="mailto:e@ehicksonjr.com">
                <i className="fas fa-envelope mr-3"></i>
                Get In Touch
              </a>
            </Button>
            
            <div className="flex gap-4">
              <Button asChild variant="outline" size="lg" data-testid="button-linkedin">
                <a href="https://linkedin.com/in/earl-hickson-jr" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin mr-3"></i>
                  LinkedIn
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" data-testid="button-github">
                <a href="https://github.com/Epetaway" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github mr-3"></i>
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

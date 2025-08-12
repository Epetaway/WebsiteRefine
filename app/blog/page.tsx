import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - Earl Hickson Jr.',
  description: 'Technical insights and lessons from the mat - combining engineering expertise with Brazilian Jiu-Jitsu philosophy.',
}

export default function Blog() {
  const featuredPost = {
    title: "From White Belt to Black Belt: Engineering Lessons from the Mat",
    excerpt: "How the journey through Brazilian Jiu-Jitsu belt ranks mirrors the progression from junior to senior engineer.",
    slug: "white-belt-to-black-belt-engineering-lessons",
    category: "bjj",
    readTime: "8 min read",
    date: "December 2024"
  }

  const recentPosts = [
    {
      title: "Component Design Systems That Scale",
      excerpt: "Building maintainable React component libraries with TypeScript and Storybook.",
      category: "development",
      readTime: "12 min read",
      status: "Coming Soon"
    },
    {
      title: "WCAG Quick Wins",
      excerpt: "Low-effort, high-impact accessibility improvements every engineer should implement.",
      category: "accessibility", 
      readTime: "6 min read",
      status: "Coming Soon"
    },
    {
      title: "Performance Optimization in React",
      excerpt: "Practical strategies for improving Core Web Vitals and user experience.",
      category: "performance",
      readTime: "10 min read", 
      status: "Coming Soon"
    }
  ]

  const categoryColors: Record<string, string> = {
    bjj: "bg-red-100 text-red-700",
    development: "bg-blue-100 text-blue-700",
    accessibility: "bg-green-100 text-green-700",
    performance: "bg-purple-100 text-purple-700"
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="page-title">Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Technical insights and lessons from the mat—where engineering expertise meets Brazilian Jiu-Jitsu philosophy
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="mb-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full ${categoryColors[featuredPost.category]} text-sm font-medium mb-4`}>
                {featuredPost.category.toUpperCase()}
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4" data-testid="featured-post-title">
              <Link href={`/articles/${featuredPost.slug}`} className="hover:text-primary-600 transition-colors">
                {featuredPost.title}
              </Link>
            </h2>
            
            <p className="text-gray-600 mb-6 text-lg" data-testid="featured-post-excerpt">
              {featuredPost.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <span>{featuredPost.readTime}</span>
                <span className="mx-2">•</span>
                <span>{featuredPost.date}</span>
              </div>
              
              <Link 
                href={`/articles/${featuredPost.slug}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                data-testid="featured-post-link"
              >
                Read Article
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" data-testid="section-title-recent">Recent Posts</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className={`inline-flex items-center px-3 py-1 rounded-full ${categoryColors[post.category]} text-sm font-medium mb-4`}>
                  {post.category.toUpperCase()}
                </div>
                
                <h3 className="font-semibold mb-2" data-testid={`post-title-${index}`}>
                  {post.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3" data-testid={`post-excerpt-${index}`}>
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                  <span className="text-xs text-orange-500 font-medium">{post.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Get notified when I publish new articles about front-end engineering, Brazilian Jiu-Jitsu, and the intersection of both.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                data-testid="newsletter-email"
              />
              <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
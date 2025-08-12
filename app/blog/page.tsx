import BlogCard from "@/components/ui/blog-card";
import { blogPosts } from "@/data/blog-posts";

export const metadata = {
  title: 'Blog - Earl Hickson Jr.',
  description: 'Insights on front-end development, Brazilian Jiu-Jitsu, and the intersection of technical mastery and personal growth.',
};

export default function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text" data-testid="page-title">Latest Writings</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights on front-end development, Brazilian Jiu-Jitsu, and the intersection of technical mastery and personal growth
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 gradient-text" data-testid="section-title-featured">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} featured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-bold" data-testid="section-title-all">All Posts</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <BlogCard key={post.id} post={post} featured={false} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="cta-title">Want to discuss these topics?</h2>
          <p className="text-xl text-gray-600 mb-8">
            I'd love to hear your thoughts on development, Brazilian Jiu-Jitsu, or working together on projects.
          </p>
          <a 
            href="mailto:e@ehicksonjr.com" 
            className="inline-flex items-center px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            data-testid="button-contact"
          >
            <i className="fas fa-envelope mr-2"></i>
            Start a Conversation
          </a>
        </div>
      </section>
    </div>
  );
}
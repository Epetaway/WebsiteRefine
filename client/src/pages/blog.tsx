import { useState } from "react";
import { blogPosts } from "@/data/blog-posts";
import BlogCard from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const [filter, setFilter] = useState<'all' | 'bjj' | 'development' | 'general'>('all');
  
  // Temporarily disable real posts while under construction
  const underConstruction = true;

  const filteredPosts = filter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filter);

  const categories = [
    { key: 'all', label: 'All Posts', count: blogPosts.length },
    { key: 'bjj', label: 'Brazilian Jiu-Jitsu', count: blogPosts.filter(p => p.category === 'bjj').length },
    { key: 'development', label: 'Development', count: blogPosts.filter(p => p.category === 'development').length },
    { key: 'general', label: 'General', count: blogPosts.filter(p => p.category === 'general').length }
  ];

  if (underConstruction) {
    return (
      <div className="pt-32 pb-32 flex flex-col items-center justify-center text-center bg-gray-50 min-h-screen">
        <h1 className="text-5xl font-bold mb-4 text-primary-600">🚧 Under Construction</h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Our blog section is currently being built. Fresh insights on development, Brazilian Jiu-Jitsu, 
          and more will be available here soon — stay tuned!
        </p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="page-title">Latest Writings</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights on front-end development, Brazilian Jiu-Jitsu, and the intersection of technical mastery and personal growth
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={filter === category.key ? "default" : "outline"}
                onClick={() => setFilter(category.key as any)}
                className={filter === category.key ? "bg-primary-500 text-white" : ""}
                data-testid={`filter-${category.key}`}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" data-testid="section-title-featured">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {filteredPosts
              .filter(post => post.featured)
              .map((post) => (
                <BlogCard key={post.id} post={post} featured={true} />
              ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" data-testid="section-title-all">All Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500" data-testid="text-no-posts">No posts found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Dev Notes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="section-title-dev-notes">Dev Notes</h2>
            <p className="text-xl text-gray-600">Technical writeups and development insights coming soon</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold mb-2" data-testid="dev-note-angular">Angular 18 Signals in Production</h3>
              <p className="text-sm text-gray-600 mb-3">Real-world experiences migrating from RxJS to Angular Signals for state management.</p>
              <span className="text-xs text-gray-500">Coming Soon</span>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold mb-2" data-testid="dev-note-wcag">WCAG Quick Wins</h3>
              <p className="text-sm text-gray-600 mb-3">Low-effort, high-impact accessibility improvements every engineer should implement.</p>
              <span className="text-xs text-gray-500">Coming Soon</span>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold mb-2" data-testid="dev-note-tailwind">Tailwind Theming Strategy</h3>
              <p className="text-sm text-gray-600 mb-3">Building maintainable design systems with Tailwind CSS custom properties.</p>
              <span className="text-xs text-gray-500">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



import { useMemo, useState } from "react";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import BlogCard from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";

// Safe date parser (avoids NaN)
const asTime = (iso?: string) => {
  const t = iso ? Date.parse(iso) : NaN;
  return Number.isFinite(t) ? t : 0;
};

export default function Blog() {
  const [filter, setFilter] = useState<"all" | BlogPost["category"]>("all");

  // Build category chips from ALL posts (not filtered)
  const categories = useMemo(() => {
    const count = (key: BlogPost["category"]) => blogPosts.filter(p => p.category === key).length;
    return [
      { key: "all" as const, label: "All Posts", count: blogPosts.length },
      { key: "bjj" as const, label: "Brazilian Jiu-Jitsu", count: count("bjj") },
      { key: "development" as const, label: "Development", count: count("development") },
      { key: "general" as const, label: "General", count: count("general") },
    ];
  }, []);

  // Apply category filter first
  const filteredPosts = useMemo(() => {
    if (filter === "all") return blogPosts.slice();
    return blogPosts.filter(p => p.category === filter);
  }, [filter]);

  // Sort filtered posts by publishedAt DESC (most recent first)
  const sortedFiltered = useMemo(() => {
    return filteredPosts.slice().sort((a, b) => asTime(b.publishedAt) - asTime(a.publishedAt));
  }, [filteredPosts]);

  // The featured post is ALWAYS the most recent in the current view
  const featuredPost = sortedFiltered[0];
  const nonFeatured = useMemo(
    () => (featuredPost ? sortedFiltered.filter(p => p.id !== featuredPost.id) : sortedFiltered),
    [sortedFiltered, featuredPost]
  );

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="page-title">
              Latest Writings
            </h1>
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

      {/* Featured Post (most recent in the current filter) */}
      {featuredPost && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8" data-testid="section-title-featured">
              Featured Post
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <BlogCard key={featuredPost.id} post={featuredPost} featured />
            </div>
          </div>
        </section>
      )}

      {/* All Posts (rest of the list after removing the featured) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" data-testid="section-title-all">
            All Posts
          </h2>

          {nonFeatured.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nonFeatured.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500" data-testid="text-no-posts">
                No posts found for this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

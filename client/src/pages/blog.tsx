
import { useMemo, useState } from "react";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import BlogCard from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const [filter, setFilter] = useState<"all" | BlogPost["category"]>("all");

  // Flip to false to show the page live
  const underConstruction = false;

  const categories = useMemo(() => {
    const by = <T extends BlogPost["category"]>(key: T, label: string) => ({
      key,
      label,
      count: blogPosts.filter((p) => p.category === key).length,
    });
    return [
      { key: "all" as const, label: "All Posts", count: blogPosts.length },
      by("bjj", "Brazilian Jiu-Jitsu"),
      by("development", "Development"),
      by("general", "General"),
    ];
  }, []);

  const filteredPosts = useMemo(() => {
    return filter === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === filter);
  }, [filter]);

  const featuredPosts = filteredPosts.filter((p) => p.featured);
  const nonFeatured = filteredPosts.filter((p) => !p.featured);

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

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8" data-testid="section-title-featured">
              Featured Posts
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
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

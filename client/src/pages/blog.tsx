import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import BlogCard from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";

const asTime = (iso?: string) => {
  const t = iso ? Date.parse(iso) : NaN;
  return Number.isFinite(t) ? t : 0;
};

export default function Blog() {
  const [filter, setFilter] = useState<"all" | BlogPost["category"]>("all");

  const categories = useMemo(() => {
    const count = (key: BlogPost["category"]) => blogPosts.filter((p) => p.category === key).length;
    return [
      { key: "all" as const, label: "All Posts", count: blogPosts.length },
      { key: "bjj" as const, label: "Brazilian Jiu-Jitsu", count: count("bjj") },
      { key: "development" as const, label: "Development", count: count("development") },
      { key: "general" as const, label: "General", count: count("general") },
    ];
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? blogPosts.slice() : blogPosts.filter((p) => p.category === filter)),
    [filter]
  );

  const sorted = useMemo(
    () => filtered.slice().sort((a, b) => asTime(b.publishedAt) - asTime(a.publishedAt)),
    [filtered]
  );

  const featured = sorted[0];
  const others = featured ? sorted.filter((p) => p.id !== featured.id) : sorted;

  const title = "Blog – Front-End, Accessibility, BJJ | Earl Hickson Jr.";
  const description =
    "Notes on React, Angular, performance, and accessibility—plus Brazilian Jiu-Jitsu lessons that inform my engineering craft.";

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="page-title">Latest Writings</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Articles on front-end development, accessibility, performance, and how I think about building UI as a developer.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((c) => (
              <Button
                key={c.key}
                variant={filter === c.key ? "default" : "outline"}
                onClick={() => setFilter(c.key as any)}
                className={filter === c.key ? "bg-primary-500 text-white" : ""}
                data-testid={`filter-${c.key}`}
              >
                {c.label} ({c.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {featured && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8" data-testid="section-title-featured">Featured Post</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <BlogCard post={featured} />
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" data-testid="section-title-all">All Posts</h2>

          {others.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {others.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500" data-testid="text-no-posts">No posts found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

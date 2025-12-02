import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import BlogCard from "@/components/ui/blog-card";
import ScrollReveal from "@/components/ui/ScrollReveal";
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

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade" className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100" data-testid="page-title">
              Notes on Front-End, Systems, and the Stuff in Between.
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              I write about building better front-ends, designing for real people, improving workflow clarity, exploring healthcare technology, and staying sharp as a developer.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="slide-up" delay={100}>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((c) => (
                <Button
                  key={c.key}
                  variant={filter === c.key ? "default" : "outline"}
                  onClick={() => setFilter(c.key as any)}
                  className={filter === c.key ? "bg-purple-600 dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600" : "dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"}
                  data-testid={`filter-${c.key}`}
                >
                  {c.label} ({c.count})
                </Button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {featured && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="slide-up">
              <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100" data-testid="section-title-featured">
                Featured Post
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="scale" delay={100}>
              <div className="grid gap-8 md:grid-cols-2">
                <BlogCard post={featured} />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100" data-testid="section-title-all">
              All Posts
            </h2>
          </ScrollReveal>

          {others.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {others.map((post, idx) => (
                <ScrollReveal key={post.id} animation="scale" delay={idx * 50}>
                  <BlogCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400" data-testid="text-no-posts">
                No posts found for this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

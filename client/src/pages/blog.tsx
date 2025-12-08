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

  const allPosts = sorted;

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

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-[1120px] mx-auto px-5">
          <ScrollReveal animation="slide-up" className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100 tracking-tight leading-tight font-serif" data-testid="page-title">
              <span className="block text-emerald-600 dark:text-emerald-400">Notes on Front-End,</span>
              <span className="block">Systems, and the Stuff in Between.</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light italic">
              I write about building better front-ends, designing for real people, improving workflow clarity, exploring healthcare technology, and staying sharp as a developer.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade" delay={100}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((c) => (
                <Button
                  key={c.key}
                  variant={filter === c.key ? "primary" : "outline"}
                  onClick={() => setFilter(c.key as typeof filter)}
                  className={
                    filter === c.key 
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white hover:from-emerald-600 hover:to-emerald-700 dark:hover:from-emerald-700 dark:hover:to-emerald-800 shadow-md hover:shadow-lg transition-all duration-200 px-5 py-2.5 rounded-full font-semibold"
                      : "dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 px-5 py-2.5 rounded-full font-medium transition-all duration-200"
                  }
                  data-testid={`filter-${c.key}`}
                >
                  <span className="mr-2 text-emerald-400 dark:text-emerald-300">✧</span>{c.label} <span className="opacity-70">({c.count})</span>
                </Button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Large mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50 dark:from-purple-950/30 dark:via-blue-950/30 dark:to-emerald-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
        
        <div className="max-w-[1400px] mx-auto px-5 relative z-10">
          <ScrollReveal animation="slide-up">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 font-serif" data-testid="section-title-all">
              <span className="text-emerald-500 dark:text-emerald-400">All Posts</span>
            </h2>
          </ScrollReveal>

          {allPosts.length > 0 ? (
            <div 
              className={`grid gap-4 auto-rows-[280px] ${
                allPosts.length === 1 
                  ? "grid-cols-1" 
                  : allPosts.length === 2 
                  ? "grid-cols-1 md:grid-cols-2" 
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {allPosts.map((post, idx) => {
                // Adjust layout based on number of posts
                let sizeClass;
                
                if (allPosts.length === 1) {
                  // Single post: full width
                  sizeClass = "col-span-1 row-span-2";
                } else if (allPosts.length === 2) {
                  // Two posts: each takes one column
                  sizeClass = "md:col-span-1 md:row-span-2";
                } else {
                  // Multiple posts: bento grid with featured post
                  if (idx === 0) {
                    // Featured post - takes 2 columns and 2 rows
                    sizeClass = "md:col-span-2 md:row-span-2";
                  } else {
                    // Other posts follow a varied bento pattern
                    const patterns = [
                      "md:col-span-1 md:row-span-1", // Small
                      "md:col-span-1 md:row-span-2", // Tall
                      "md:col-span-2 md:row-span-1", // Wide
                      "md:col-span-1 md:row-span-1", // Small
                    ];
                    sizeClass = patterns[(idx - 1) % patterns.length];
                  }
                }

                return (
                  <ScrollReveal key={post.id} animation="fade" delay={idx * 30}>
                    <div className={`h-full ${sizeClass}`}>
                      <BlogCard post={post} variant={sizeClass.includes("col-span-2") || allPosts.length <= 2 ? "default" : "minimal"} />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <ScrollReveal animation="fade">
              <div className="text-center py-20 px-4">
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                      <span className="text-3xl text-gray-400 dark:text-gray-600">🔍</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-serif">
                    No posts found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 italic" data-testid="text-no-posts">
                    No articles match this category yet.<br />Check back soon or explore other topics.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFilter("all")}
                    className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    View All Posts
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}

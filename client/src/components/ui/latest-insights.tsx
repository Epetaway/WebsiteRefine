import { useEffect, useMemo, useRef, useState } from "react";
import { blogPosts } from "@/data/blog-posts";
import BlogCard from "@/components/ui/blog-card";

// safe date parse
const asTime = (iso?: string) => {
  const t = iso ? Date.parse(iso) : NaN;
  return Number.isFinite(t) ? t : 0;
};

export default function LatestInsightsSection() {
  const posts = useMemo(
    () => blogPosts.slice().sort((a, b) => asTime(b.publishedAt) - asTime(a.publishedAt)),
    []
  );

  const hasSlider = posts.length >= 5;

  if (!hasSlider) {
    // fallback: 1 / 2 / 4 grid, up to 4 posts
    return (
      <section aria-labelledby="latest-insights-heading" className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between">
            <h2 id="latest-insights-heading" className="text-2xl font-bold">
              Latest Insights
            </h2>
            <a href="#/blog" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              View all
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {posts.slice(0, 4).map((post) => (
              <BlogCard key={post.id} post={post} variant="minimal" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return <LatestInsightsSlider posts={posts} />;
}

function LatestInsightsSlider({ posts }: { posts: typeof blogPosts }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const calc = () => {
      const w = el.clientWidth;
      const pv = w >= 1024 ? 4 : w >= 768 ? 2 : 1;
      setPerView(pv);
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setActive(idx);
    };

    const ro = new ResizeObserver(calc);
    ro.observe(el);
    calc();
    return () => ro.disconnect();
  }, []);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(idx);
  };

  const totalPages = Math.max(1, Math.ceil(posts.length / perView));

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({
      left: Math.max(0, Math.min(el.scrollWidth, el.scrollLeft + dir * el.clientWidth)),
      behavior: "smooth",
    });
  };

  return (
    <section aria-labelledby="latest-insights-heading" className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="latest-insights-heading" className="text-2xl font-bold">
            Latest Insights
          </h2>
          <a href="#/blog" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
            View all
          </a>
        </div>

        <div className="relative">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />

          {/* Track */}
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="
              flex gap-6 overflow-x-auto scroll-smooth
              snap-x snap-mandatory
              [-ms-overflow-style:none] [scrollbar-width:none]
              pb-1
            "
            style={{ scrollbarWidth: "none" } as any}
          >
            {posts.map((post) => (
              <div
                key={post.id}
                className="snap-start shrink-0 w-[100%] md:w-[50%] lg:w-[25%]"
              >
                <BlogCard post={post} variant="minimal" />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    const el = trackRef.current;
                    if (!el) return;
                    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
                  }}
                  className={[
                    "h-2 w-2 rounded-full transition-colors",
                    i === active ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-400",
                  ].join(" ")}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => scrollByPage(-1)}
                className="inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50"
                aria-label="Previous"
              >
                ← Prev
              </button>
              <button
                onClick={() => scrollByPage(1)}
                className="inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50"
                aria-label="Next"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

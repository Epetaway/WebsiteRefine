import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog-posts";
import BlogCard from "@/components/ui/blog-card";

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
    return (
      <section aria-labelledby="latest-insights-heading" className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between">
            <h2 id="latest-insights-heading" className="text-2xl font-bold">
              Latest Insights
            </h2>
            <Link to="/blog" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              View all
            </Link>
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

function LatestInsightsSlider({
  posts,
}: {
  posts: Array<(typeof blogPosts)[number]>;
}) {
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
    const target = Math.round(el.scrollLeft / el.clientWidth) + dir;
    const page = Math.max(0, Math.min(totalPages - 1, target));
    el.scrollTo({ left: page * el.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  const goToPage = (page: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(totalPages - 1, page));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    setActive(clamped);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); scrollByPage(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); scrollByPage(-1); }
  };

  return (
    <section aria-labelledby="latest-insights-heading" className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="latest-insights-heading" className="text-2xl font-bold">
            Latest Insights
          </h2>
          <Link to="/blog" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
            View all
          </Link>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Latest blog posts"
          aria-live="polite"
          className="relative"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />

          <div
            ref={trackRef}
            onScroll={onScroll}
            onKeyDown={onKeyDown}
            tabIndex={0}
            aria-label="Slides"
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 outline-none [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollbarWidth: "none" } as any}
          >
            {posts.map((post) => (
              <div
                key={post.id}
                className="snap-start shrink-0 w-[100%] md:w-[50%] lg:w-[25%]"
                aria-roledescription="slide"
              >
                <BlogCard post={post} variant="minimal" />
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2" aria-label="Slide pagination">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => goToPage(i)}
                  className={[
                    "h-2 rounded-full transition-all",
                    i === active ? "bg-gray-900 w-6" : "bg-gray-300 w-2 hover:bg-gray-400",
                  ].join(" ")}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => scrollByPage(-1)}
                disabled={active <= 0}
                className="inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous"
              >
                ← Prev
              </button>
              <button
                onClick={() => scrollByPage(1)}
                disabled={active >= totalPages - 1}
                className="inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
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

function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

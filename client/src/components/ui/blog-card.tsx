import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/blog-posts";

type Variant = "minimal" | "default";

export default function BlogCard({
  post,
  variant = "minimal",
}: {
  post: BlogPost;
  variant?: Variant;
}) {
  const href = `/blog/${post.slug}`;

  // Respect Vite BASE_URL for GitHub Pages
  const base =
    (import.meta as any)?.env?.BASE_URL && typeof (import.meta as any).env.BASE_URL === "string"
      ? (import.meta as any).env.BASE_URL
      : "/";
  const raw = post.coverImage || "/images/blog/placeholder.jpg";
  const isHttp = /^https?:\/\//i.test(raw);
  const coverSrc = isHttp ? raw : `${base}${raw.replace(/^\/+/, "")}`;

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow",
        "hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] focus-within:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
      ].join(" ")}
      data-testid={`blog-card-${post.id}`}
    >
      <Link
        to={href}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label={`Open ${post.title}`}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={coverSrc}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 motion-reduce:duration-0 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {/* subtle top fade */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wide">
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
              {post.category}
            </span>
            <span className="text-gray-400">•</span>
            <time className="text-gray-500" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </time>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{post.readTime} min</span>
          </div>

          {/* SINGLE green gradient headline */}
          <h3
            className={[
              "font-semibold leading-snug line-clamp-2",
              "gradient-text",
              "text-base md:text-lg",
            ].join(" ")}
          >
            {post.title}
          </h3>


          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>

          <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gray-900">
            Read more
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}

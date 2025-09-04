import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/blog-posts";

type Variant = "minimal" | "default";

export default function BlogCard({
  post,
  variant = "minimal",
}: {
  post: BlogPost & { takeaway?: string };
  variant?: Variant;
}) {
  const href = `/blog/${post.slug}`;

  // Respect Vite BASE_URL (e.g., GitHub Pages)
  const base =
    (import.meta as any)?.env?.BASE_URL && typeof (import.meta as any).env.BASE_URL === "string"
      ? (import.meta as any).env.BASE_URL
      : "/";
  const raw = post.coverImage || "/images/blog/placeholder.jpg";
  const coverSrc = /^https?:\/\//i.test(raw) ? raw : `${base}${raw.replace(/^\/+/, "")}`;

  const dateLabel = new Date(post.publishedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const isDefault = variant === "default";

  return (
    <article
      role="article"
      aria-labelledby={`post-${post.id}-title`}
      className={[
        "group relative overflow-hidden rounded-2xl bg-white transition-shadow",
        "ring-1 ring-gray-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] focus-within:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
      ].join(" ")}
      data-testid={`blog-card-${post.id}`}
    >
      <Link
        to={href}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label={`Open blog post: ${post.title}`}
      >
        <div className={["relative overflow-hidden", isDefault ? "aspect-[16/9]" : "aspect-[4/3]"].join(" ")}>
          <img
            src={coverSrc}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 motion-reduce:duration-0 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
        </div>

        <div className={isDefault ? "p-5 sm:p-6" : "p-4"}>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide">
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{post.category}</span>
            <span className="text-gray-400">•</span>
            <time className="text-gray-500" dateTime={post.publishedAt}>
              {dateLabel}
            </time>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{post.readTime} min</span>
          </div>

          <h3
            id={`post-${post.id}-title`}
            className={[
              "font-semibold leading-snug line-clamp-2 gradient-text",
              isDefault ? "text-lg md:text-xl" : "text-base md:text-lg",
            ].join(" ")}
          >
            {post.title}
          </h3>

          <p className={["mt-2 text-sm text-gray-600", isDefault ? "line-clamp-3" : "line-clamp-2"].join(" ")}>
            {post.excerpt}
          </p>

          {isDefault && post.takeaway ? (
            <div className="mt-3 text-sm">
              <span className="font-semibold text-gray-900">Takeaway: </span>
              <span className="text-gray-700">{post.takeaway}</span>
            </div>
          ) : null}

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

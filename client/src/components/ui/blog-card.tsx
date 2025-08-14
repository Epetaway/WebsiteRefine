"use client";

import Link from "next/link";
import type { BlogPost } from "@/data/blog-posts";

export default function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const href = `/blog/${post.slug}`;

  // Build an asset URL that respects GitHub Pages base path
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
        "group relative overflow-hidden rounded-2xl border border-gray-200 bg-white",
        featured ? "md:col-span-2" : "",
      ].join(" ")}
      data-testid={`blog-card-${post.id}`}
    >
      {/* Media */}
      <Link href={href} className="block relative">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={coverSrc}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {/* Gradient overlay for readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Headline overlay (bottom-left) */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <span className="inline-flex items-center rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
                {post.readTime} min read
              </span>
            </div>
            <h3 className="text-white drop-shadow-md text-xl sm:text-2xl font-bold leading-snug">
              {post.title}
            </h3>
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 sm:p-5">
        <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </time>

          <Link
            href={href}
            className="inline-flex items-center gap-1 font-semibold text-primary-600 hover:text-primary-700"
            aria-label={`Read ${post.title}`}
          >
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
          </Link>
        </div>
      </div>
    </article>
  );
}

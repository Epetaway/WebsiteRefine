import { useMemo } from "react";
import { Link, useRoute } from "wouter";
import { blogPosts } from "@/data/blog-posts";

// lightweight markdown → html
function renderBasicMarkdown(md: string): string {
  let html = md.trim();

  // code fences
  html = html.replace(/```([\s\S]*?)```/g, (_m, code) => {
    const esc = code.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" } as any)[c]!);
    return `<pre class="overflow-auto rounded-lg border px-3 py-2 bg-gray-50"><code>${esc}</code></pre>`;
  });

  // headings
  html = html
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // bold/italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");

  // links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="text-primary-600 underline" href="$2">$1</a>');

  // unordered lists
  html = html.replace(/(?:^|\n)(?:- .*(?:\n|$))+?/g, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((l) => l.replace(/^- /, "").trim())
      .filter(Boolean)
      .map((t) => `<li>${t}</li>`)
      .join("");
    return `<ul class="list-disc pl-6 my-3">${items}</ul>`;
  });

  // paragraphs
  html = html
    .split(/\n{2,}/)
    .map((para) =>
      /^(<h\d|<ul|<pre|<blockquote|<img|<p|<hr)/.test(para.trim())
        ? para
        : `<p>${para.replace(/\n/g, "<br/>")}</p>`
    )
    .join("\n");

  return html;
}

export default function BlogPost() {
  // Read :slug from the URL using Wouter
  const [, params] = useRoute<{ slug: string }>("/blog/:slug");
  const slug = params?.slug;

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  if (!post) {
    return (
      <div className="min-h-screen grid place-items-center p-8 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Post not found</h1>
          <Link href="/blog" className="inline-flex items-center rounded-xl border px-4 py-2 font-semibold hover:bg-gray-50">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Build cover image URL honoring Vite's BASE_URL (for GitHub Pages)
  const base =
    (import.meta as any)?.env?.BASE_URL && typeof (import.meta as any).env.BASE_URL === "string"
      ? (import.meta as any).env.BASE_URL
      : "/";
  const raw = post.coverImage || "/images/blog/placeholder.jpg";
  const isHttp = /^https?:\/\//i.test(raw);
  const coverSrc = isHttp ? raw : `${base}${raw.replace(/^\/+/, "")}`;

  return (
    <article className="pt-16">
      {/* Hero with bottom-left overlay */}
      <section className="relative bg-white">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img src={coverSrc} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <span className="inline-flex items-center rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
                {post.readTime} min read
              </span>
            </div>
            {/* Headline: at least display-3 (Tailwind ~ text-5xl); larger on lg */}
            <h1 className="text-white drop-shadow-md text-5xl lg:text-6xl font-extrabold leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-xs text-gray-500 mb-6">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </time>
            {post.updatedAt && (
              <>
                {" • Updated "}
                <time dateTime={post.updatedAt}>
                  {new Date(post.updatedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </time>
              </>
            )}
          </div>

          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: renderBasicMarkdown(post.content) }}
          />
        </div>
      </section>
    </article>
  );
}

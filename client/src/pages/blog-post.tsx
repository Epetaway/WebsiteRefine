import { useMemo } from "react";
import { Link, useRoute } from "wouter";
import { blogPosts } from "@/data/blog-posts";

// minimal markdown → html
function renderBasicMarkdown(md: string): string {
  let html = md.trim();
  html = html.replace(/```([\s\S]*?)```/g, (_m, code) => {
    const esc = code.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" } as any)[c]!);
    return `<pre class="overflow-auto rounded-lg border px-3 py-2 bg-gray-50"><code>${esc}</code></pre>`;
  });
  html = html
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="text-primary-600 underline" href="$2">$1</a>');
  html = html.replace(/(?:^|\n)(?:- .*(?:\n|$))+?/g, (block) => {
    const items = block.trim().split("\n").map((l) => l.replace(/^- /, "").trim()).filter(Boolean).map((t) => `<li>${t}</li>`).join("");
    return `<ul class="list-disc pl-6 my-3">${items}</ul>`;
  });
  html = html.split(/\n{2,}/).map((para) =>
    /^(<h\d|<ul|<pre|<blockquote|<img|<p|<hr)/.test(para.trim())
      ? para
      : `<p>${para.replace(/\n/g, "<br/>")}</p>`
  ).join("\n");
  return html;
}

export default function BlogPost() {
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

  // Image url respecting BASE_URL (GitHub Pages)
  const base =
    (import.meta as any)?.env?.BASE_URL && typeof (import.meta as any).env.BASE_URL === "string"
      ? (import.meta as any).env.BASE_URL
      : "/";
  const raw = post.coverImage || "/images/blog/placeholder.jpg";
  const isHttp = /^https?:\/\//i.test(raw);
  const coverSrc = isHttp ? raw : `${base}${raw.replace(/^\/+/, "")}`;

  return (
    <article className="bg-white">
      {/* Top hero — clean, minimal, like Superchat industries pages */}
      <section className="pt-20 pb-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Eyebrow / breadcrumb-lite */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <Link href="/blog" className="hover:text-gray-700">Blog</Link>
            <span>•</span>
            <span className="capitalize">{post.category}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })}
            </time>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>

          {/* Big gradient headline on white */}
          <h1
            className={[
              "bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-200 bg-clip-text text-transparent",
              "text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight",
            ].join(" ")}
          >
            {post.title}
          </h1>

          {/* Optional intro (use excerpt for a crisp subhead) */}
          {post.excerpt && (
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Image card — rounded, subtle border, no heavy overlay */}
      <section className="pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <img
              src={coverSrc}
              alt={post.title}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Content — comfy width, clean prose */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-slate max-w-none prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3"
            dangerouslySetInnerHTML={{ __html: renderBasicMarkdown(post.content) }}
          />
        </div>
      </section>
    </article>
  );
}

import { useEffect, useMemo } from "react";
import { Link, useRoute } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import ShareBar from "@/components/ui/share-bar"; // <-- new share component

// Minimal markdown → html with internal-link fix (history routing, no #)
// If content includes /blog/... links, we keep them as-is (no hash).
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

  // links (keep internal /blog/... links as-is; no hash router)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, url) => {
    const u = String(url);
    const safeUrl = u; // history routing — do not add '#'
    return `<a class="text-primary-600 underline" href="${safeUrl}">${text}</a>`;
  });

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

// Lightweight OG/Twitter meta setter (SPA-friendly)
function setMetaTags({
  title,
  excerpt,
  cover,
  url,
}: {
  title: string;
  excerpt: string;
  cover?: string;
  url: string;
}) {
  const ensure = (name: string, attr: "name" | "property", content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  document.title = title;

  ensure("description", "name", excerpt);
  ensure("og:title", "property", title);
  ensure("og:description", "property", excerpt);
  ensure("og:type", "property", "article");
  ensure("og:url", "property", url);
  if (cover) ensure("og:image", "property", cover);

  ensure("twitter:card", "name", cover ? "summary_large_image" : "summary");
  ensure("twitter:title", "name", title);
  ensure("twitter:description", "name", excerpt);
  if (cover) ensure("twitter:image", "name", cover);
}

export default function BlogPost() {
  const [, params] = useRoute<{ slug: string }>("/blog/:slug");
  const slug = params?.slug;

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  // Compute cover with BASE_URL (GitHub Pages project-site base)
  const base =
    (import.meta as any)?.env?.BASE_URL && typeof (import.meta as any).env.BASE_URL === "string"
      ? (import.meta as any).env.BASE_URL
      : "/";
  const raw = post?.coverImage || "/images/blog/placeholder.jpg";
  const isHttp = /^https?:\/\//i.test(raw);
  const coverSrc = isHttp ? raw : `${base}${raw.replace(/^\/+/, "")}`;

  // Set dynamic meta tags for better sharing previews
  useEffect(() => {
    if (!post) return;
    const origin = window.location.origin;
    const absoluteCover = post.coverImage
      ? post.coverImage.startsWith("http")
        ? post.coverImage
        : `${origin}${post.coverImage.startsWith("/") ? "" : "/"}${post.coverImage}`
      : undefined;
    const url = `${origin}/blog/${post.slug}`;
    setMetaTags({ title: post.title, excerpt: post.excerpt, cover: absoluteCover, url });
  }, [post]);

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

  return (
    <article className="bg-white">
      {/* Top hero — clean, minimal */}
      <section className="pt-20 pb-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <Link href="/blog" className="hover:text-gray-700">Blog</Link>
            <span>•</span>
            <span className="capitalize">{post.category}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </time>
            {post.readTime ? (
              <>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </>
            ) : null}
          </div>

          {/* Unified green gradient headline */}
          <h1
            className={[
              "gradient-text",
              "text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight",
            ].join(" ")}
          >
            {post.title}
          </h1>

          {/* Optional intro */}
          {post.excerpt && (
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Share bar — near the top for visibility */}
      <section className="pb-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ShareBar
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
            utm={{ source: "site", medium: "blog", campaign: post.slug }}
          />
        </div>
      </section>

      {/* Image card */}
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

      {/* Content */}
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

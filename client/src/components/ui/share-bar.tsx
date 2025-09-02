import { useMemo, useState } from "react";

type ShareBarProps = {
  title: string;
  excerpt?: string;
  slug: string; // e.g. "ai-ease-developer-anxiety"
  utm?: { source?: string; medium?: string; campaign?: string };
};

function buildUrl(slug: string, utm?: ShareBarProps["utm"]) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://ehicksonjr.com";
  const basePath = "/blog"; // your blog route base
  const url = new URL(`${origin}${basePath}/${slug}`);
  if (utm?.source) url.searchParams.set("utm_source", utm.source);
  if (utm?.medium) url.searchParams.set("utm_medium", utm.medium);
  if (utm?.campaign) url.searchParams.set("utm_campaign", utm.campaign);
  return url.toString();
}

export default function ShareBar({ title, excerpt, slug, utm }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => buildUrl(slug, utm), [slug, utm]);
  const shareText = `${title}`;

  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  const canWebShare =
    typeof navigator !== "undefined" &&
    typeof (navigator as any).share === "function" &&
    (typeof (navigator as any).canShare !== "function" ||
      (navigator as any).canShare({ url: shareUrl, title: shareText }));

  async function handleNativeShare() {
    try {
      await (navigator as any).share?.({ title: shareText, text: excerpt, url: shareUrl });
    } catch {
      /* user canceled or unsupported */
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="text-sm font-semibold text-gray-700">Share:</span>

        {canWebShare && (
          <button
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-gray-50"
            aria-label="Share using device dialog"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12v7a1 1 0 0 0 1 1h14" stroke="currentColor" strokeWidth="2" />
              <path
                d="M16 6l-4-4-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 2v13" stroke="currentColor" strokeWidth="2" />
            </svg>
            Share
          </button>
        )}

        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-gray-50"
          aria-label="Share on LinkedIn"
        >
          <i className="fab fa-linkedin" aria-hidden="true" />
          LinkedIn
        </a>

        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-gray-50"
          aria-label="Share on Facebook"
        >
          <i className="fab fa-facebook" aria-hidden="true" />
          Facebook
        </a>

        <div className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-700">
          <i className="fab fa-instagram" aria-hidden="true" />
          Instagram/Threads: use <span className="font-semibold">Share</span> or{" "}
          <span className="font-semibold">Copy link</span>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          aria-label="Copy link"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90" fill="none" aria-hidden="true">
            <path
              d="M10 14l-2 2a4 4 0 1 1-5.657-5.657l3-3A4 4 0 0 1 10 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M14 10l2-2a4 4 0 1 1 5.657 5.657l-3 3A4 4 0 0 1 14 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        On mobile, <strong>Share</strong> opens your device dialog. On desktop, use <strong>Copy link</strong>.
      </p>
    </div>
  );
}

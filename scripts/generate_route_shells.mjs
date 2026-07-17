import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist", "public");
const baseHtml = readFileSync(path.join(output, "index.html"), "utf8");
const siteUrl = "https://ehicksonjr.com";

// HCEPS handoff documents and standalone prototype exports are source-only
// reference artifacts. Keeping them out of dist prevents superseded identity,
// resume, and evidence claims from becoming publicly addressable.
for (const archive of ["hceps", "prototypes"]) {
  rmSync(path.join(output, archive), { recursive: true, force: true });
}

const routes = [
  { path: "/", title: "Earl Hickson Jr. - UX Engineer", description: "UX Engineer designing and building human-centered systems across interaction design, frontend engineering, and full-stack product development.", image: "/assets/brand/social/og-home.svg" },
  { path: "/work", title: "Investigations - Earl Hickson Jr.", description: "Three open human-centered product investigations by Earl Hickson Jr.", image: "/assets/brand/social/og-investigations.svg" },
  { path: "/work/withyou", title: "WithYou - Relationships Investigation", description: "A private relationship application exploring intentional connection, pairing, and field-level information visibility.", image: "/assets/projects/withyou/social/og.svg" },
  { path: "/work/dojonet", title: "DojoNet - Learning Investigation", description: "A martial arts learning investigation centered on practice history, reflection, and qualitative progression.", image: "/assets/projects/dojonet/social/og.svg" },
  { path: "/work/gundam-forge", title: "Gundam Forge - Decision Support Investigation", description: "An unofficial deck-building and playtesting investigation into continuous validation and player decision support.", image: "/assets/projects/gundam-forge/social/og.svg" },
  { path: "/research", title: "Research - Earl Hickson Jr.", description: "Independent human-centered product inquiry across relationships, learning, privacy, and decision support.", image: "/assets/brand/social/og-research.svg" },
  { path: "/field-notes", title: "Field Notes - Earl Hickson Jr.", description: "Editorial notes on learning, relationships, consent, decision support, design, and engineering.", image: "/assets/field-notes/og-writing.svg" },
  { path: "/field-notes/teaching-jiu-jitsu-and-ux", title: "Teaching Jiu-Jitsu Changed the Way I Think About UX - Earl Hickson Jr.", description: "How teaching martial arts changed the way I understand feedback, progression, and what it means to help someone build a capability.", image: "/assets/field-notes/og-teaching-jiu-jitsu-and-ux.svg", type: "article", datePublished: "2026-07-14" },
  { path: "/field-notes/designing-consent", title: "Designing Consent Into Digital Products - Earl Hickson Jr.", description: "What building a relationship-centered application taught me about the difference between a privacy promise and a privacy architecture.", image: "/assets/field-notes/og-designing-consent.svg", type: "article", datePublished: "2026-07-14" },
  { path: "/field-notes/information-architecture-and-card-games", title: "What Trading Card Games Teach Us About Information Architecture - Earl Hickson Jr.", description: "Why access to information is not the same as being able to use it, and what a physical card table reveals about how people think.", image: "/assets/field-notes/og-information-architecture-and-card-games.svg", type: "article", datePublished: "2026-07-14" },
  { path: "/about", title: "About - Earl Hickson Jr.", description: "How Earl Hickson Jr. moved from visual communication to UX engineering and human-centered product inquiry.", image: "/assets/brand/social/og-about.svg" },
  { path: "/resume", title: "Resume - Earl Hickson Jr., UX Engineer", description: "Earl Hickson Jr. - UX Engineer working across design, frontend engineering, accessibility, and full-stack product development.", image: "/assets/brand/social/og-resume.svg" },
  { path: "/contact", title: "Contact - Earl Hickson Jr.", description: "Contact Earl Hickson Jr. about UX Engineering, Design Engineering, Product Engineering, and frontend product roles.", image: "/assets/brand/social/og-contact.svg" },
  { path: "/graduate-review", title: "HCI Graduate Review - Earl Hickson Jr.", description: "A focused admissions-review path through HCI motivation, independent investigations, technical preparation, and research direction.", image: "/assets/brand/social/og-research.svg", noIndex: true },
];

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function routeHtml(route) {
  const canonical = new URL(route.path, siteUrl).toString();
  const image = new URL(route.image, siteUrl).toString();
  let html = baseHtml
    .replace(/<title[^>]*>.*?<\/title>/, `<title data-rh="true">${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(route.description)}" data-rh="true" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" data-rh="true" />`)
    .replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${route.noIndex ? "noindex,nofollow" : "index,follow"}" data-rh="true" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(route.title)}" data-rh="true" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(route.description)}" data-rh="true" />`)
    .replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${route.type ?? "website"}" data-rh="true" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" data-rh="true" />`)
    .replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${image}" data-rh="true" />`)
    .replace(/<meta property="og:image:alt"[^>]*>/, `<meta property="og:image:alt" content="${escapeHtml(route.title)}" data-rh="true" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(route.title)}" data-rh="true" />`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(route.description)}" data-rh="true" />`)
    .replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${image}" data-rh="true" />`);

  if (route.type === "article") {
    const article = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: route.title.replace(" - Earl Hickson Jr.", ""),
      description: route.description,
      datePublished: route.datePublished,
      author: { "@type": "Person", name: "Earl Hickson Jr.", url: siteUrl },
      mainEntityOfPage: canonical,
    };
    html = html.replace("</head>", `    <script type="application/ld+json" data-rh="true">${JSON.stringify(article)}</script>\n  </head>`);
  }
  return html;
}

for (const route of routes) {
  if (route.path === "/") continue;
  const directory = path.join(output, route.path.slice(1));
  mkdirSync(directory, { recursive: true });
  writeFileSync(path.join(directory, "index.html"), routeHtml(route));
}

for (const route of routes) {
  const file = route.path === "/" ? path.join(output, "index.html") : path.join(output, route.path.slice(1), "index.html");
  const html = route.path === "/" ? routeHtml(route) : readFileSync(file, "utf8");
  if (route.path === "/") writeFileSync(file, html);
  const canonical = new URL(route.path, siteUrl).toString();
  if (!html.includes(`<title data-rh="true">${escapeHtml(route.title)}</title>`) || !html.includes(`href="${canonical}"`)) {
    throw new Error(`Route metadata shell validation failed for ${route.path}`);
  }
}

for (const archive of ["hceps", "prototypes"]) {
  if (existsSync(path.join(output, archive))) {
    throw new Error(`Source-only archive was copied into the production output: ${archive}`);
  }
}

console.log(`generated ${routes.length} route metadata shells; excluded source-only archives`);

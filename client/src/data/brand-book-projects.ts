export type MediaKind =
  | "logo"
  | "palette"
  | "typography"
  | "application"
  | "campaign"
  | "concept";

export interface BrandImage {
  src: string; // "/images/design/<brand>/file.webp"
  alt: string;
  kind: MediaKind;
  notes?: string;
  aspect?: "16:9" | "1:1" | "4:5" | "3:2";
}

export interface BrandColor {
  name: string;
  hex: string;
  rgb?: string;
  cmyk?: string;
  usage?: string;
}

export interface BrandFont {
  family: string;
  role: "Display" | "Heading" | "Body" | "UI" | "Caption";
  example?: string;
  weights?: number[];
  trackingNote?: string;
}

export interface GridSpec {
  columns: number;
  gutter: number;
  margin: number;
}

export interface ContrastPair {
  fg: string;
  bg: string;
  ratio: string;
  note?: string;
}

export interface BrandProject {
  id: string;
  title: string;
  role: "Brand Identity" | "Campaign Design" | "Visual System" | "Rebrand";
  year?: string;
  overview: {
    summary: string;
    industry?: string;
    audience?: string;
    personality?: string[];
    cover?: BrandImage;
  };

  logos: {
    rationale?: string;
    images: BrandImage[]; // 2–3
  };

  colors: {
    palette: BrandColor[]; // 3–6
    paletteImage?: BrandImage; // 1 (optional)
    rationale?: string;
  };

  typography: {
    fonts: BrandFont[]; // 2–3 (heading + body)
    specimenImage?: BrandImage; // 1 (optional)
    rationale?: string;
  };

  usage: {
    notes?: string[];
    examples?: BrandImage[]; // 2–3
  };

  applications: {
    images: BrandImage[]; // 3–4
    notes?: string;
  };

  campaigns?: {
    images: BrandImage[]; // 2–3
    notes?: string;
  };

  principles?: {
    bullets: string[];
  };
  grid?: GridSpec;
  accessibility?: {
    notes?: string[];
    contrast?: ContrastPair[];
  };
  imagery?: {
    styleNotes?: string;
    examples?: BrandImage[];
  };
  iconography?: {
    notes?: string;
    examples?: BrandImage[];
  };
  motion?: {
    rules?: string[];
  };
  voice?: {
    adjectives?: string[];
    headlineRules?: string[];
    microcopyRules?: string[];
  };
}

/* -------------------------------------------
   Minimal validator to catch missing sections
-------------------------------------------- */
export function validateBrandProject(p: BrandProject): string[] {
  const errs: string[] = [];
  if (!p.overview?.summary) errs.push(`${p.id}: overview.summary missing`);
  if (!p.logos?.images || p.logos.images.length < 2)
    errs.push(`${p.id}: logos.images should have at least 2`);
  if (!p.colors?.palette || p.colors.palette.length < 3)
    errs.push(`${p.id}: colors.palette should have at least 3`);
  if (!p.typography?.fonts || p.typography.fonts.length < 2)
    errs.push(`${p.id}: typography.fonts should include heading + body`);
  if (!p.usage?.examples || p.usage.examples.length < 2)
    errs.push(`${p.id}: usage.examples should include 2–3`);
  if (!p.applications?.images || p.applications.images.length < 3)
    errs.push(`${p.id}: applications.images should include 3–4`);
  return errs;
}

/* =========================================================
   REAL PROJECTS
   ========================================================= */

export const brandProjects: BrandProject[] = [
  /* ---------------------------- ULTRA JITSU ---------------------------- */
  {
    id: "ultra-jitsu",
    title: "Ultra Jitsu",
    role: "Brand Identity",
    year: "2025",
    overview: {
      summary:
        "A bold martial arts identity centered on a panther in a BJJ gi with a black belt (red bar), built for dynamic, edgy presentation across web, apparel, and promos.",
      industry: "Martial Arts / Fitness",
      audience: "Beginners, families, hobbyists, and competitors in Morris County, NJ",
      personality: ["fierce", "disciplined", "approachable", "modern"],
      cover: {
        src: "/images/design/ultra-jitsu/cover-hero.webp",
        alt: "Ultra Jitsu hero: circle logo, full-body panther in gi, and dark variant",
        kind: "application",
        aspect: "16:9",
      },
    },

    logos: {
      rationale:
        "Primary circular patch for instant recognition; full-body mascot and dark variant support apparel, signage, and digital contexts.",
      images: [
        {
          src: "/images/design/ultra-jitsu/usage-correct.png",
          alt: "Primary circle logo with panther in gi and text lockup",
          kind: "logo",
          notes: "on light",
          aspect: "1:1",
        },
        {
          src: "/images/design/ultra-jitsu/usage-dark.png",
          alt: "Primary circle logo on black background",
          kind: "logo",
          notes: "on dark",
          aspect: "1:1",
        },
        {
          src: "/images/design/ultra-jitsu/logo-full-body.png",
          alt: "Full-body panther in gi with BJJ black belt and red bar",
          kind: "logo",
          notes: "mascot / full figure",
          aspect: "3:2",
        },
      ],
    },

    colors: {
      rationale:
        "Athletic green signals growth and resilience; black/white/gray provide high-contrast structure for legibility across merch and web.",
      palette: [
        { name: "Ultra Green", hex: "#1C8C5E", rgb: "28,140,94", cmyk: "82,0,33,45", usage: "Primary accent" },
        { name: "Jet Black", hex: "#000000", rgb: "0,0,0", cmyk: "0,0,0,100", usage: "Text / Background" },
        { name: "Pure White", hex: "#FFFFFF", rgb: "255,255,255", cmyk: "0,0,0,0", usage: "Background / Contrast" },
        { name: "Iron Gray", hex: "#4A4A4A", rgb: "74,74,74", cmyk: "0,0,0,71", usage: "Secondary text / UI" },
        { name: "Steel Light", hex: "#C9C9C9", rgb: "201,201,201", cmyk: "0,0,0,21", usage: "Borders / Surfaces" },
      ],
      paletteImage: {
        src: "/images/design/ultra-jitsu/palette-swatches.png",
        alt: "Ultra Jitsu color swatches grid",
        kind: "palette",
        aspect: "16:9",
      },
    },

    typography: {
      rationale:
        "Strong geometric headings signal confidence; body font prioritizes clarity for schedules, offers, and long-form info.",
      fonts: [
        {
          family: "Montserrat",
          role: "Heading",
          example: "Train with Power. Train Ultra.",
          weights: [700, 800],
          trackingNote: "tight for display",
        },
        {
          family: "Roboto",
          role: "Body",
          example:
            "Ultra Jitsu welcomes beginners and competitors with safe, technical training in Parsippany, New Jersey.",
          weights: [400, 500],
          trackingNote: "normal for readability",
        },
      ],
      specimenImage: {
        src: "/images/design/ultra-jitsu/type-specimen.png",
        alt: "Ultra Jitsu typography specimen with heading and body examples",
        kind: "typography",
        aspect: "16:9",
      },
    },

    usage: {
      notes: [
        "Maintain clear space around circular mark equal to the height of the red bar.",
        "Avoid over-texturing behind the logo to preserve clarity.",
      ],
      examples: [
        {
          src: "/images/design/ultra-jitsu/usage-correct.png",
          alt: "Correct usage on light backgrounds with ample clear space",
          kind: "application",
          aspect: "1:1",
        },
        {
          src: "/images/design/ultra-jitsu/mockup-social-cta.png",
          alt: "Social post example with correct color/contrast",
          kind: "application",
          notes: "IG square",
          aspect: "1:1",
        },
        {
          src: "/images/design/ultra-jitsu/mockup-gi-rashguard.png",
          alt: "Gi/rashguard usage example with patch placement",
          kind: "application",
          aspect: "3:2",
        },
      ],
    },

    applications: {
      notes: "Dynamic/edgy treatment for cards, socials, site hero, and apparel.",
      images: [
        {
          src: "/images/design/ultra-jitsu/mockup-business-cards.png",
          alt: "Angled black/green business cards with Ultra Jitsu mark",
          kind: "application",
          aspect: "3:2",
        },
        {
          src: "/images/design/ultra-jitsu/mockup-social-cta.png",
          alt: "Instagram square post: Lock in your first class free",
          kind: "application",
          notes: "IG square",
          aspect: "1:1",
        },
        {
          src: "/images/design/ultra-jitsu/mockup-website-desktop-mobile.png",
          alt: "Website landing hero preview in desktop and mobile",
          kind: "application",
          aspect: "16:9",
        },
        {
          src: "/images/design/ultra-jitsu/mockup-gi-rashguard.png",
          alt: "Black gi and rashguard concept with Ultra Jitsu patch",
          kind: "application",
          aspect: "3:2",
        },
      ],
    },

    campaigns: {
      notes: "Brand in context for launch posters and digital ads.",
      images: [
        {
          src: "/images/design/ultra-jitsu/campaign-composite.png",
          alt: "Poster, digital banner, and signage composite for Ultra Jitsu",
          kind: "campaign",
          aspect: "16:9",
        },
        {
          src: "/images/design/ultra-jitsu/campaign-flyer.png",
          alt: "Gym wall flyer with bold call to action",
          kind: "campaign",
          aspect: "3:2",
        },
      ],
    },

    principles: {
      bullets: [
        "Bold iconography with clear silhouette",
        "High-contrast color pairing for legibility",
        "WCAG-aware typography scale",
        "Edgy textures used sparingly to retain clarity",
      ],
    },
    grid: { columns: 12, gutter: 24, margin: 80 },
    accessibility: {
      notes: ["Maintain AA for body on light/dark; ensure button contrast ≥ 4.5:1."],
      contrast: [
        { fg: "#000000", bg: "#FFFFFF", ratio: "21:1", note: "Text on white" },
        { fg: "#FFFFFF", bg: "#000000", ratio: "21:1", note: "Text on black" },
        { fg: "#1C8C5E", bg: "#FFFFFF", ratio: "4.8:1", note: "Accent on white" },
      ],
    },
    imagery: {
      styleNotes: "High-contrast, athletic lighting; gritty but clean backdrops.",
    },
    iconography: {
      notes: "Bold, filled shapes with minimal inner detail for patch-readability.",
    },
    motion: {
      rules: ["200ms ease-out for entrances", "Respect reduced motion", "Subtle CTA pulses only"],
    },
    voice: {
      adjectives: ["confident", "welcoming", "technical"],
      headlineRules: ["verbs first", "impactful, 3–6 words"],
      microcopyRules: ["plain, safety-first, direct benefits"],
    },
  },

  /* --------------------------- LEGACY PULLS ---------------------------- */
  {
    id: "legacy-pulls",
    title: "Legacy Pulls",
    role: "Visual System",
    year: "2025",
    overview: {
      summary:
        "Premium black-and-gold identity for a live trading card auction platform, featuring a stacked-cards emblem and web-first UI mockups.",
      industry: "Trading Cards / Live Commerce",
      audience: "TCG collectors, stream viewers, and auction participants",
      personality: ["premium", "modern", "bold", "collectible"],
      cover: {
        src: "/images/design/legacy-pulls/cover-hero.png",
        alt: "Legacy Pulls emblem with gold accent over dark UI mockups",
        kind: "application",
        aspect: "16:9",
      },
    },

    logos: {
      rationale:
        "Stacked card emblem communicates collecting and pulls; gold accent conveys rarity and premium value.",
      images: [
        {
          src: "/images/design/legacy-pulls/logo-emblem-tagline-light.png",
          alt: "Stacked card emblem with tagline 'Pull Your Legacy' on light",
          kind: "logo",
          aspect: "1:1",
        },
        {
          src: "/images/design/legacy-pulls/logo-emblem-tagline-dark.png",
          alt: "Gold stacked card emblem with tagline on black",
          kind: "logo",
          aspect: "1:1",
        },
        {
          src: "/images/design/legacy-pulls/logo-emblem-mark.png",
          alt: "Mark-only stacked card icon in gold/white",
          kind: "logo",
          notes: "for avatars/favicons",
          aspect: "1:1",
        },
      ],
    },

    colors: {
      rationale:
        "Black/white provide clarity and hierarchy; metallic gold (#D4AF37) signals premium rarity and highlight states.",
      palette: [
        { name: "Jet Black", hex: "#000000", rgb: "0,0,0", cmyk: "0,0,0,100", usage: "Primary background" },
        { name: "Pure White", hex: "#FFFFFF", rgb: "255,255,255", cmyk: "0,0,0,0", usage: "Content / Contrast" },
        { name: "Metallic Gold", hex: "#D4AF37", rgb: "212,175,55", cmyk: "20,30,90,10", usage: "Accents, CTAs, rare highlights" },
      ],
      paletteImage: {
        src: "/images/design/legacy-pulls/palette-swatches.png",
        alt: "Legacy Pulls gold/black/white palette swatches",
        kind: "palette",
        aspect: "16:9",
      },
    },

    typography: {
      rationale:
        "Geometric display face for authority in headers; clean sans for readable UI and chat/bid panels.",
      fonts: [
        {
          family: "League Spartan",
          role: "Heading",
          example: "PULL YOUR LEGACY",
          weights: [700, 800],
          trackingNote: "tight for hero headings",
        },
        {
          family: "Inter",
          role: "Body",
          example: "Live trading card openings & auctions with real-time chat and bids.",
          weights: [400, 500, 600],
          trackingNote: "neutral for UI",
        },
      ],
      specimenImage: {
        src: "/images/design/legacy-pulls/type-specimen.png",
        alt: "Legacy Pulls type specimen showing heading and body styles",
        kind: "typography",
        aspect: "16:9",
      },
    },

    usage: {
      notes: [
        "Gold is for accents and CTAs—avoid long body copy in gold.",
        "Keep emblem legible at small sizes; prefer mark-only for favicons/avatars.",
      ],
      examples: [
        {
          src: "/images/design/legacy-pulls/logo-emblem-tagline-dark.png",
          alt: "Correct usage of emblem on black background with clear space",
          kind: "application",
          aspect: "1:1",
        },
        {
          src: "/images/design/legacy-pulls/mockup-mobile-2up.png",
          alt: "Mobile UI usage example showing live auction and dashboard",
          kind: "application",
          aspect: "3:2",
        },
        {
          src: "/images/design/legacy-pulls/cover-hero.png",
          alt: "Desktop UI banner usage with emblem and gold accents",
          kind: "application",
          aspect: "16:9",
        },
      ],
    },

    applications: {
      images: [
        {
          src: "/images/design/legacy-pulls/mockup-wireframes-3up.png",
          alt: "Three key screens: Dashboard, Live Auction, Collections with footers",
          kind: "application",
          aspect: "16:9",
        },
        {
          src: "/images/design/legacy-pulls/mockup-mobile-2up.png",
          alt: "Mobile mockups: Dashboard and Live Auction inside smartphone frames",
          kind: "application",
          aspect: "3:2",
        },
        {
          src: "/images/design/legacy-pulls/cover-hero.png",
          alt: "Desktop hero application with emblem over dark UI",
          kind: "application",
          aspect: "16:9",
        },
      ],
      notes: "Web-first artifacts complemented by collector-culture touchpoints.",
    },

    campaigns: {
      images: [
        {
          src: "/images/design/legacy-pulls/campaign-live-now-story.png",
          alt: "Vertical story/ad with LIVE NOW and CTA",
          kind: "campaign",
          aspect: "4:5",
        },
      ],
      notes: "Optimized for IG/Whatnot/TikTok placements.",
    },

    principles: {
      bullets: [
        "Content first: video, bids, chat take priority",
        "Gold as a rarity signal, not a background",
        "Scales cleanly from mobile to desktop",
        "High contrast for fast-moving live UX",
      ],
    },
    grid: { columns: 12, gutter: 24, margin: 72 },
    accessibility: {
      notes: ["Gold on black used for accents; avoid gold for long body copy."],
      contrast: [
        { fg: "#FFFFFF", bg: "#000000", ratio: "21:1", note: "Body on dark" },
        { fg: "#000000", bg: "#FFFFFF", ratio: "21:1", note: "Body on light" },
        { fg: "#D4AF37", bg: "#000000", ratio: "5.7:1", note: "CTA on dark" },
      ],
    },
    imagery: {
      styleNotes: "Dark UI with crisp highlights; minimal noise; product-first crops.",
    },
    iconography: {
      notes: "Rounded-rect card silhouette; 2px stroke, 24px grid.",
    },
    motion: {
      rules: ["180–220ms ease-out", "Snappy hover for bids", "No parallax in live views"],
    },
    voice: {
      adjectives: ["premium", "clear", "energetic"],
      headlineRules: ["benefit up front", "3–6 words", "avoid jargon"],
      microcopyRules: ["short labels", "numbers over adjectives", "confirmations with next step"],
    },
  },
];

/* Dev-only validation */
if (import.meta.env?.DEV) {
  brandProjects.forEach((p) => {
    const errs = validateBrandProject(p);
    if (errs.length) {
      // eslint-disable-next-line no-console
      console.warn("[brand-projects] validation:", errs);
    }
  });
}

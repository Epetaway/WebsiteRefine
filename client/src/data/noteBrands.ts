// How a Field Note looks: the portfolio's frame, coloured by the project the note discusses.
//
// The portfolio always supplies the structure, typography (Manrope, JetBrains Mono), evidence note,
// figure system and reading column. A project brand supplies only colour, the hero's glow, the
// figure frame's corner radius and its own lockup. A note with no project uses the portfolio brand.
//
// Colours come from each case study's tokens (client/src/styles/{withyou,dojonet,gundam-forge,
// earl-the-kaiju}.css). Every text pairing below meets WCAG AA 4.5:1:
//   accent / accent2 / muted on surface, ink on paper and paper2, surface text on accent.
// Checked Oct 31, 2026; re-check when changing a value.

export type NoteBrandKey = "portfolio" | "withyou" | "dojonet" | "gundam-forge" | "earl-the-kaiju";

export type NoteBrand = {
  key: NoteBrandKey;
  /** Project name, as its brand writes it. */
  name: string;
  /** Case study the note links to, if any. */
  caseStudy?: string;
  tokens: {
    /** Dark hero, footer and figure-frame surface. */
    surface: string;
    surface2: string;
    /** Text on surface. */
    text: string;
    /** Primary accent on surface. */
    accent: string;
    /** Secondary accent on surface (labels, the claim). */
    accent2: string;
    muted: string;
    /** Two radial glows layered over the surface, as each case-study hero does. */
    glowA: string;
    glowB: string;
    /** Reading surface and its second tone. */
    paper: string;
    paper2: string;
    /** Accent for text and rules on paper. */
    ink: string;
    /** Corner radius for figure frames, in the brand's own vocabulary. */
    radius: string;
  };
};

export const noteBrands: Record<NoteBrandKey, NoteBrand> = {
  portfolio: {
    key: "portfolio",
    name: "Earl Hickson Jr.",
    tokens: {
      surface: "#0b0d12",
      surface2: "#151923",
      text: "#f7f3eb",
      accent: "#f6b51d",
      accent2: "#f6b51d",
      muted: "#aeb4bf",
      glowA: "rgba(246, 181, 29, 0.14)",
      glowB: "rgba(174, 180, 191, 0.08)",
      paper: "#f4efe6",
      paper2: "#e8e1d5",
      ink: "#6c4700",
      radius: "22px",
    },
  },
  withyou: {
    key: "withyou",
    name: "WithYou",
    caseStudy: "/work/withyou",
    tokens: {
      surface: "#1a1422",
      surface2: "#251d30",
      text: "#f5efe6",
      accent: "#ff8587",
      accent2: "#ffcbc4",
      muted: "#b9afc2",
      glowA: "rgba(255, 107, 107, 0.24)",
      glowB: "rgba(167, 139, 250, 0.2)",
      paper: "#fbf4ec",
      paper2: "#f4eadd",
      ink: "#b03f46",
      radius: "26px",
    },
  },
  dojonet: {
    key: "dojonet",
    name: "DojoNet",
    caseStudy: "/work/dojonet",
    tokens: {
      surface: "#0b0c0f",
      surface2: "#121418",
      text: "#f3f4f6",
      accent: "#f87171",
      accent2: "#f59e0b",
      muted: "#9ca3af",
      glowA: "rgba(239, 68, 68, 0.2)",
      glowB: "rgba(0, 150, 136, 0.16)",
      paper: "#f9f9f9",
      paper2: "#f2f2f2",
      ink: "#b71c1c",
      radius: "16px",
    },
  },
  "gundam-forge": {
    key: "gundam-forge",
    name: "Gundam Forge",
    caseStudy: "/work/gundam-forge",
    tokens: {
      surface: "#091225",
      surface2: "#141f34",
      text: "#e9eff7",
      accent: "#60a5fa",
      accent2: "#93c5fd",
      muted: "#bdc8db",
      glowA: "rgba(60, 131, 246, 0.28)",
      glowB: "rgba(139, 92, 246, 0.16)",
      paper: "#f2f5f7",
      paper2: "#e6ebf0",
      ink: "#1d4ed8",
      radius: "12px",
    },
  },
  "earl-the-kaiju": {
    key: "earl-the-kaiju",
    name: "Earl the Kaiju",
    caseStudy: "/work/earl-the-kaiju",
    tokens: {
      surface: "#0b0f0e",
      surface2: "#121916",
      text: "#f4f1e9",
      accent: "#17d190",
      accent2: "#d4af37",
      muted: "#a3b0a9",
      glowA: "rgba(11, 122, 98, 0.3)",
      glowB: "rgba(212, 175, 55, 0.16)",
      paper: "#f4f1e9",
      paper2: "#e8e4d9",
      ink: "#0f5b4b",
      radius: "0px",
    },
  },
};

export const noteBrand = (key: NoteBrandKey | undefined) => noteBrands[key ?? "portfolio"];

/** The brand as CSS custom properties, set on the note's root element. */
export function noteBrandStyle(brand: NoteBrand): Record<string, string> {
  const t = brand.tokens;
  return {
    "--nb-surface": t.surface,
    "--nb-surface-2": t.surface2,
    "--nb-text": t.text,
    "--nb-accent": t.accent,
    "--nb-accent-2": t.accent2,
    "--nb-muted": t.muted,
    "--nb-glow-a": t.glowA,
    "--nb-glow-b": t.glowB,
    "--nb-paper": t.paper,
    "--nb-paper-2": t.paper2,
    "--nb-ink": t.ink,
    "--nb-radius": t.radius,
    // Existing Field Note rules read --note-accent; on paper it must be the readable ink.
    "--note-accent": t.ink,
  };
}

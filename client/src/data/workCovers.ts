// Cover art for the case-study cards on /work and Home.
//
// Each card is a small version of its case study's hero: a main screen in a browser frame and a
// phone screen floating over its inner corner, on the project's own dark surface. The images come
// from each case study's media record, so they are the same captures the case study shows. Home
// and /work get different pairs so the two pages don't repeat each other.
//
// Colours come from noteBrands, whose text pairings are contrast-tested in note-brands.test.tsx.

import type { KitMediaItem } from "@/components/case-study-kit/kit";
import { noteBrands, type NoteBrandKey } from "./noteBrands";
import withYouMedia from "./withyou.media.json";
import kaijuMedia from "./earlTheKaiju.media.json";
import forgeMedia from "./gundamForge.media.json";
import dojoMedia from "./dojonet.media.json";

export type WorkCoverImage = {
  item: KitMediaItem;
  alt: string;
};

export type WorkCoverPair = {
  /** Wide screen: a website or desktop app, shown whole in a browser frame. */
  main: WorkCoverImage;
  /** Phone screen floating over the main screen's inner corner. */
  float: WorkCoverImage;
};

export type WorkCoverPlacement = "work" | "home";

export type WorkCover = { brand: NoteBrandKey } & Record<WorkCoverPlacement, WorkCoverPair>;

type MediaRecord = { media: Record<string, KitMediaItem> };

const pick = (record: MediaRecord, id: string): KitMediaItem => {
  const item = record.media[id];
  if (!item) throw new Error(`Unknown work cover media: ${id}`);
  return item;
};

export const workCovers: Record<string, WorkCover> = {
  withyou: {
    brand: "withyou",
    work: {
      main: {
        item: pick(withYouMedia as MediaRecord, "mk-landing-hero"),
        alt: "The WithYou landing page: the headline Say what you need. Stay close, always. beside a photo of a couple cooking, with a phone showing the Today screen",
      },
      float: {
        item: pick(withYouMedia as MediaRecord, "ios-home-dark"),
        alt: "WithYou's home screen on iOS in dark mode",
      },
    },
    home: {
      main: {
        item: pick(withYouMedia as MediaRecord, "handoff-android-dark-welcome"),
        alt: "WithYou's design handoff viewer on Android in dark mode: the onboarding flow list, the Welcome screen and the spec panel's platform notes",
      },
      float: {
        item: pick(withYouMedia as MediaRecord, "ios-home-light"),
        alt: "WithYou's home screen on iOS in light mode: a photo with a gentle nudge card and today's check-in for both people",
      },
    },
  },
  "earl-the-kaiju": {
    brand: "earl-the-kaiju",
    work: {
      main: {
        item: pick(kaijuMedia as MediaRecord, "site-home-desktop"),
        alt: "The instructor website's home page on desktop: Earl in a black gi, his name in large condensed type and a Register Your Interest button",
      },
      float: {
        item: pick(kaijuMedia as MediaRecord, "coach-class-mode"),
        alt: "Kaiju Coach's Class Mode on a phone: segment 2 of 4, Guard Retention Concepts, with 14:20 left, what's next and a Next segment button",
      },
    },
    home: {
      main: {
        item: pick(kaijuMedia as MediaRecord, "site-about-desktop"),
        alt: "The instructor website's Meet Earl page on desktop: the heading Meet Earl beside a documentary photo of Earl smiling on the mats in a black gi",
      },
      float: {
        item: pick(kaijuMedia as MediaRecord, "coach-timer-work"),
        alt: "Kaiju Coach's round timer on a phone: TRAIN, round 2 of 5, 4:19 remaining, with the next rest and a Pause button",
      },
    },
  },
  "gundam-forge": {
    brand: "gundam-forge",
    work: {
      main: {
        item: pick(forgeMedia as MediaRecord, "forge-draft"),
        alt: "The Gundam Forge deck builder: catalog on the left, a draft deck of text-proxy cards in the centre, 49 of 50 cards counted and an Issues (2) button",
      },
      float: {
        item: pick(forgeMedia as MediaRecord, "m-forge-issues"),
        alt: "The deck issues sheet on a phone listing one rule error and one piece of advice",
      },
    },
    home: {
      main: {
        item: pick(forgeMedia as MediaRecord, "deck-view"),
        alt: "Gundam Forge's deck viewer for a seed deck: card stacks, a cost curve, a colour split chart and deck analytics with Playtest, Share and Export actions",
      },
      float: {
        item: pick(forgeMedia as MediaRecord, "m-cards"),
        alt: "The Gundam Forge Cards page on a phone: search, sort, filters and a two-column grid of text-proxy cards",
      },
    },
  },
  dojonet: {
    brand: "dojonet",
    work: {
      main: {
        item: pick(dojoMedia as MediaRecord, "dark-dashboard"),
        alt: "The DojoNet dashboard in dark mode: the post composer, a feed post and a progress panel with streak, hours and sessions",
      },
      float: {
        item: pick(dojoMedia as MediaRecord, "m-journal"),
        alt: "My Journal on a phone with a red New Entry button, belt-chapter tabs and filters",
      },
    },
    home: {
      main: {
        item: pick(dojoMedia as MediaRecord, "composer-journal"),
        alt: "DojoNet's composer switched to Journal: title, notes, discipline, session type, duration, techniques, mood, energy, intensity and recovery sliders, and a visibility menu",
      },
      float: {
        item: pick(dojoMedia as MediaRecord, "m-dashboard"),
        alt: "The DojoNet dashboard on a phone with the composer and a feed post",
      },
    },
  },
};

export const getWorkCover = (slug: string): WorkCover => {
  const cover = workCovers[slug];
  if (!cover) throw new Error(`No work cover for case study: ${slug}`);
  return cover;
};

/** The project's brand colours as CSS custom properties for a work card. */
export function workCoverStyle(cover: WorkCover): Record<string, string> {
  const t = noteBrands[cover.brand].tokens;
  return {
    "--wc-surface": t.surface,
    "--wc-surface-2": t.surface2,
    "--wc-text": t.text,
    "--wc-accent": t.accent,
    "--wc-accent-2": t.accent2,
    "--wc-muted": t.muted,
    "--wc-glow-a": t.glowA,
    "--wc-glow-b": t.glowB,
  };
}

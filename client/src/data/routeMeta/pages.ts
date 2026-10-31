import { profile } from "../professional";
import type { RouteMeta } from "./types";

// Head metadata for the site's static pages. Kept apart from the case-study metadata so a page
// like /about doesn't pull case-study data into its bundle.

export const homeMeta: RouteMeta = {
  path: "/",
  title: `Earl Hickson Jr. — ${profile.publicTitle}`,
  description:
    "Lead front-end engineer with a BFA in graphic design and 6+ years building production interfaces for healthcare, financial services, and digital media.",
  image: "/assets/brand/social/og-home.png",
};

export const workMeta: RouteMeta = {
  path: "/work",
  title: "Work — Earl Hickson Jr.",
  description:
    "Case studies and professional front-end work by Earl Hickson Jr., lead front-end engineer.",
  image: "/assets/brand/social/og-investigations.png",
};

export const researchMeta: RouteMeta = {
  path: "/research",
  title: "Research — Earl Hickson Jr.",
  description:
    "Independent human-centered product inquiry across relationships, learning, and decision support.",
  image: "/assets/brand/social/og-research.png",
};

export const fieldNotesIndexMeta: RouteMeta = {
  path: "/field-notes",
  title: "Field Notes — Earl Hickson Jr.",
  description:
    "Editorial notes on learning, relationships, consent, decision support, design, and engineering.",
  image: "/assets/field-notes/og-writing.png",
};

export const aboutMeta: RouteMeta = {
  path: "/about",
  title: "About — Earl Hickson Jr.",
  description:
    "Earl Hickson Jr. is a lead front-end engineer with a graphic-design foundation, working where design systems, accessibility, and engineering meet.",
  image: "/assets/brand/social/og-about.png",
};

export const resumeMeta: RouteMeta = {
  path: "/resume",
  title: `Resume — Earl Hickson Jr., ${profile.publicTitle}`,
  description:
    "Earl Hickson Jr. — lead front-end engineer: design systems, accessibility, and healthcare UI, with 6+ years of production front-end work.",
  image: "/assets/brand/social/og-resume.png",
};

export const contactMeta: RouteMeta = {
  path: "/contact",
  title: "Contact — Earl Hickson Jr.",
  description:
    "Contact Earl Hickson Jr. about full-time lead and senior front-end engineering roles.",
  image: "/assets/brand/social/og-contact.png",
};

export const graduateReviewMeta: RouteMeta = {
  path: "/graduate-review",
  title: `Graduate Review — Earl Hickson Jr., ${profile.publicTitle}`,
  description:
    "A five-minute HCI admissions review of Earl Hickson Jr.'s preparation, independent case studies, research interests, writing, and graduate CV.",
  image: "/assets/brand/social/og-graduate-review.png",
};

/** Used by the 404 view and the static 404.html fallback. Not a canonical route. */
export const notFoundMeta: RouteMeta = {
  path: "/404",
  title: "Page not found — Earl Hickson Jr.",
  description: "The requested page could not be found.",
};

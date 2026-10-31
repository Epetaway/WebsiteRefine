// Every canonical route's head metadata in one list. Only build scripts and tests import this
// file; pages import their own entry from the per-area modules so case-study data stays out of
// unrelated bundles.
import { fieldNotes } from "../fieldNotes";
import { dojonetMeta } from "./dojonet";
import { earlTheKaijuMeta } from "./earlTheKaiju";
import { fieldNoteMeta } from "./fieldNotes";
import { gundamForgeMeta } from "./gundamForge";
import {
  aboutMeta,
  contactMeta,
  fieldNotesIndexMeta,
  graduateReviewMeta,
  homeMeta,
  researchMeta,
  resumeMeta,
  workMeta,
} from "./pages";
import { withYouMeta } from "./withyou";
import type { RouteMeta } from "./types";

export { notFoundMeta } from "./pages";
export { legacyRedirects } from "../legacyRoutes";
export * from "./types";

export const routeMeta: RouteMeta[] = [
  homeMeta,
  workMeta,
  withYouMeta,
  earlTheKaijuMeta,
  gundamForgeMeta,
  dojonetMeta,
  researchMeta,
  fieldNotesIndexMeta,
  ...fieldNotes.map(fieldNoteMeta),
  aboutMeta,
  resumeMeta,
  contactMeta,
  graduateReviewMeta,
];

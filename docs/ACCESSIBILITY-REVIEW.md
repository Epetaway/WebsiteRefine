# Accessibility Review

Review date: 2026-07-17

The release candidate is an accessibility-focused implementation. This review does not claim formal WCAG conformance or replace an independent audit with assistive-technology users.

## Tests run

- `npm run qa:browser` against the production build.
- 135 rendered route/view states across nine viewport widths.
- axe-core tags: WCAG 2 A/AA, WCAG 2.1 A/AA, and WCAG 2.2 AA.
- Abstract and expanded modes for WithYou, DojoNet, and Gundam Forge.
- Keyboard skip-link activation.
- Mobile-dialog focus entry, focus containment, Escape close, and focus return.
- Landmark, heading, accessible-name, duplicate-ID, image-alt, and document-title checks.
- Reduced-motion browser preference for the full matrix.
- Mobile landscape, 200%-zoom-equivalent reflow, and enlarged-default-text overflow checks.
- Primary interactive-target height check.

## Pages checked

Home, Work, all three investigations, Research, Field Notes index, a full Field Note, About, Resume, Contact, Graduate Review, legacy redirects, unknown-route 404, public résumé delivery, and graduate CV delivery.

## Issues found and fixed

- Removed nested/duplicate landmark risks from reusable section and Field Note structures.
- Added a visible skip link and one focusable main target.
- Rebuilt the mobile menu as an accessible modal dialog with focus management.
- Replaced low-contrast brand and metadata colors with accessible variants; dark panels derive lighter accent colors.
- Added intrinsic image dimensions, meaningful alt text, and figure captions.
- Kept interactive prototypes as semantic buttons, inputs, fieldsets, and live state announcements.
- Added reduced-motion handling and removed the iframe document boundary.
- Ensured route-specific document titles contain Earl’s name.
- Ensured all checked primary controls are at least 44 px high.

## Final automated result

| Check | Result |
| --- | --- |
| Axe violations | 0 across 135 states |
| Horizontal overflow | 0 |
| Landmark/heading failures | 0 |
| Duplicate IDs | 0 |
| Broken images or missing alt | 0 |
| Console/runtime errors | 0 |
| Keyboard focus checks | 6/6 passed |
| Mobile landscape checks | 3/3 passed |
| 200%-zoom-equivalent checks | 3/3 passed |
| Enlarged default text | Passed |
| Undersized primary targets | 0 |
| Lighthouse accessibility | 100 on all 15 final runs |

## Known remaining limitations

- VoiceOver, NVDA, JAWS, TalkBack, switch-control, and voice-control testing require physical assistive-technology sessions.
- The 200% check uses the equivalent reduced CSS viewport plus a stricter 320 px reflow check; a human browser-zoom review remains advisable before a formal conformance claim.
- Color, focus, and semantics passed automation, but cognitive accessibility and prose comprehension should be evaluated with representative readers.

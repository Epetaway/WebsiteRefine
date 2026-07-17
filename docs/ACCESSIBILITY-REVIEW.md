# Accessibility Review

Review date: 2026-07-16

Positioning: accessibility-focused implementation; no formal conformance claim.

## Implemented

- Native semantic pages replace iframe documents on every canonical route.
- A first-focus skip link targets the main landmark.
- Shared header, main, footer, navigation, article, section, and figure semantics
  provide consistent landmarks.
- Pages maintain one `h1`; section headings follow beneath it.
- Desktop and mobile navigation have accessible names and active-route state.
- The mobile menu is a modal dialog with initial focus, focus containment,
  Escape-to-close, backdrop close, scroll lock, and trigger focus return.
- Focus indicators are visible and do not rely on color alone.
- Prototype controls use native buttons, fields, radios, `aria-pressed`, status
  text, alert semantics where required, and polite live announcements.
- Prototype state labels include text; color is supplementary.
- Figures have meaningful alt text and captions; editorial art is identified as
  conceptual and implementation captures are labeled separately.
- Contact is direct email with a native mail link and a keyboard-operable
  copy-address button; there is no public form or scheduling widget.
- Reduced-motion preferences disable smooth scrolling and transitions.
- Small-screen and landscape rules avoid fixed-height content traps.
- Field Notes use a readable single-column body and explicit evidence-type labels.

## Automated coverage

- Navigation keyboard behavior and focus return.
- Canonical route landmarks, one `h1`, skip link, and absence of iframes.
- Native prototype keyboard controls, reset behavior, and state consequences.
- Accessible names for resume, graduate-review, and contact actions.

## Manual/browser checks

The QA matrix covers keyboard navigation, mobile menu behavior, responsive
layouts, 200% zoom, long headings, contact actions, all three prototypes, resume, and the
graduate review path. Results are recorded in `RESPONSIVE-QA.md`.

## Remaining limitations

- No independent assistive-technology audit has been completed.
- No formal WCAG 2.2 conformance evaluation has been completed.
- PDF text is selectable and reading order is intentionally simple, but the
  generated PDFs are not tagged PDFs.
- Color contrast should be rechecked whenever tokens or project accents change.

// Where a route's prerendered HTML lives inside dist/public.
//
// GitHub Pages serves `about.html` at `/about` with a 200 and no redirect, while `about/index.html`
// answers `/about` with a 301 to `/about/`. The site's canonical URLs have no trailing slash, so
// every route is written as `<path>.html`. A route that is also a parent of other routes works the
// same way: `/field-notes` is `field-notes.html`, and `/field-notes/<slug>` is
// `field-notes/<slug>.html` beside it. The homepage is `index.html`.

export function routeFile(routePath: string) {
  if (routePath === "/") return "index.html";
  if (!/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(routePath)) {
    throw new Error(`Route path can't be written as a static file: ${routePath}`);
  }
  return `${routePath.slice(1)}.html`;
}

import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The build writes one HTML file per route (scripts/prerender-route-meta.ts): /about is
// about.html, /field-notes/<slug> is field-notes/<slug>.html. Only plain route-shaped paths
// are looked up, so nothing outside dist/public can be reached.
const routePathPattern = /^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/;

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Before express.static, which would otherwise answer /field-notes (also a directory) with
  // a redirect to /field-notes/.
  app.get(routePathPattern, (req, res, next) => {
    const file = path.join(distPath, `${req.path.slice(1)}.html`);
    if (fs.existsSync(file)) res.sendFile(file);
    else next();
  });

  app.use(express.static(distPath));

  // Unknown paths get the SPA fallback with a real 404 status when the build wrote one.
  const notFoundPage = path.resolve(distPath, "404.html");
  app.use("*", (_req, res) => {
    if (fs.existsSync(notFoundPage)) res.status(404).sendFile(notFoundPage);
    else res.sendFile(path.resolve(distPath, "index.html"));
  });
}

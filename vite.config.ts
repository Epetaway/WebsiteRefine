import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(async () => {
  const professionalFacts = JSON.parse(
    readFileSync(path.resolve(__dirname, "client", "src", "data", "professionalFacts.json"), "utf8"),
  );
  const profile = professionalFacts.profile;
  const plugins = [
    react(),
    {
      name: "canonical-professional-facts",
      transformIndexHtml(html: string) {
        return html
          .replaceAll("__PROFILE_NAME__", profile.name)
          .replaceAll("__PROFILE_TITLE__", profile.title)
          .replaceAll("__PROFILE_TAGLINE__", profile.tagline)
          .replaceAll("__PROFILE_SUMMARY__", profile.summary)
          .replaceAll("__PROFILE_EMAIL__", profile.links.email)
          .replaceAll("__PROFILE_LINKEDIN__", profile.links.linkedin)
          .replaceAll("__PROFILE_GITHUB__", profile.links.github);
      },
    },
  ];

  return {
    // Since we're using a custom domain (ehicksonjr.com), base is always "/"
    base: "/",
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});

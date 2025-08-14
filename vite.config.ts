import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT for GitHub Pages project sites:
// Set this to your REPO name with leading/trailing slashes.
export default defineConfig({
  plugins: [react()],
  base: "/WebsiteRefine/",
});

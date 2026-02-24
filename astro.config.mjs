import { defineConfig } from "astro/config";

// For GitHub Pages: set site to your GitHub Pages URL.
// If using a project repo (username.github.io/repo-name), also set base.
// If using a custom domain or username.github.io root, remove base.
export default defineConfig({
  output: "static",
  site: "https://vladisslaww.github.io",
  base: "/verbs-verbs-verbs",
});

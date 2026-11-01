import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

// On GitHub Actions the repo name and owner come from the environment, so a
// renamed repo keeps working. REPO_NAME is only the fallback for local builds.
const REPO_NAME = "McAdvent2026";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? REPO_NAME;
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const base = `/${repo}/`;
const siteUrl = owner ? `https://${owner}.github.io${base}` : base;

// Social cards need absolute image URLs, which depend on the deployed address.
function siteUrlInHtml(): Plugin {
  return {
    name: "site-url-in-html",
    transformIndexHtml: (html) => html.replaceAll("__SITE_URL__", siteUrl),
  };
}

// Hashed bundle names are only known after the build, so they are written into
// the service worker here. This lets the first visit cache the whole app.
function precacheManifest(): Plugin {
  let files: string[] = [];
  return {
    name: "precache-manifest",
    apply: "build",
    generateBundle(_options, bundle) {
      files = Object.keys(bundle);
    },
    closeBundle() {
      const path = resolve("dist/sw.js");
      const version = createHash("sha256").update(files.sort().join()).digest("hex").slice(0, 10);
      const sw = readFileSync(path, "utf8")
        .replace('"__VERSION__"', JSON.stringify(version))
        .replace('["__FILES__"]', JSON.stringify(files));
      writeFileSync(path, sw);
    },
  };
}

export default defineConfig({
  base,
  plugins: [siteUrlInHtml(), precacheManifest()],
});

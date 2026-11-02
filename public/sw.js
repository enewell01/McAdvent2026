// The build fills in VERSION and FILES (see precacheManifest in vite.config.ts).
const VERSION = "__VERSION__";
const FILES = ["__FILES__"];
const CACHE = `blocky-advent-${VERSION}`;
const FONT_CACHE = "blocky-advent-fonts";
const SHELL = [".", "index.html", "bedrock.html", "manifest.json", "icons/icon-192.png", "icons/icon-512.png"];

self.addEventListener("install", (event) => {
  const files = [...new Set([...SHELL, ...FILES])];
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(files)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE && key !== FONT_CACHE).map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) (await caches.open(CACHE)).put(request, response.clone());
    return response;
  } catch {
    return (await caches.match(request)) ?? caches.match("index.html");
  }
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok || response.type === "opaque") (await caches.open(cacheName)).put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(cacheFirst(request, FONT_CACHE));
  } else if (url.origin === location.origin) {
    event.respondWith(request.mode === "navigate" ? networkFirst(request) : cacheFirst(request, CACHE));
  }
});

const CACHE = "khem-v5";

const BASE = self.location.pathname.replace(/\/sw\.js$/, "") || "";

const PRECACHE_PATHS = ["/", "/abstract", "/brief", "/compare", "/dua", "/forum", "/method", "/manifest.json", "/og-image.svg"].map(
  (p) => BASE + p
);

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE_PATHS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  const isMapTile = url.hostname.includes("tile") || url.hostname.includes("cartocdn") || url.hostname.includes("openstreetmap");
  if (isMapTile) return;
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).then((res) => {
      if (url.origin === self.location.origin && res.ok) {
        const clone = res.clone();
        caches.open(CACHE).then((cache) => cache.put(e.request, clone));
      }
      return res;
    }).catch(() => new Response("Offline", { status: 408 })))
  );
});

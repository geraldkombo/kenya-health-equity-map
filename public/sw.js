const CACHE = "ke-health-v6";
const DATA_CACHE = "ke-data-v1";

const PRECACHE_ROUTES = [
  "/",
  "/brief",
  "/compare",
  "/method",
  "/forum",
  "/dua",
  "/sitemap.xml",
  "/manifest.json",
  "/icon.svg",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ROUTES).catch((err) => {
        console.warn("SW: some precache routes failed", err);
      });
    }).then(() => {
      // Cache data snapshots for offline use
      return caches.open(DATA_CACHE).then((dataCache) => {
        return Promise.allSettled([
          "/data/snapshots/counties.json",
          "/data/snapshots/county_indicators.json",
          "/data/snapshots/facilities.json",
        ].map((p) =>
          fetch(p).then((res) => {
            if (res.ok) dataCache.put(p, res);
          }).catch(() => {})
        ));
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE && k !== DATA_CACHE).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const path = url.pathname;

  // Data files: cache-first with network fallback
  if (path.includes("/data/") || path.includes(".pmtiles")) {
    event.respondWith(
      caches.open(DATA_CACHE).then((cache) => {
        return cache.match(event.request).then((cached) => {
          return cached || fetch(event.request).then((response) => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached);
        });
      })
    );
    return;
  }

  // Navigation requests: cache-first
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.open(CACHE).then((cache) => {
        return cache.match(event.request).then((cached) => {
          return cached || fetch(event.request).then((response) => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(() => cache.match("/"));
        });
      })
    );
    return;
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        if (response.ok) {
          caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
        }
        return response;
      });
    })
  );
});

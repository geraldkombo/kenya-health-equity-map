const CACHE = "ke-health-v6";
const DATA_CACHE = "ke-data-v1";
const BASE = self.location.pathname.replace(/\/sw\.js$/, "");

const PRECACHE_ROUTES = [
  BASE + "/",
  BASE + "/brief",
  BASE + "/compare",
  BASE + "/method",
  BASE + "/forum",
  BASE + "/dua",
  BASE + "/sitemap.xml",
  BASE + "/manifest.json",
  BASE + "/icon.svg",
  BASE + "/icons/icon-192x192.png",
  BASE + "/icons/icon-512x512.png",
];

const DATA_ROUTES = [
  BASE + "/data/snapshots/counties.json",
  BASE + "/data/snapshots/county_indicators.json",
  BASE + "/data/snapshots/facilities.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ROUTES).catch((err) => {
        console.warn("SW: some precache routes failed", err);
      });
    }).then(() => {
      return caches.open(DATA_CACHE).then((dataCache) => {
        return Promise.allSettled(
          DATA_ROUTES.map((p) =>
            fetch(p).then((res) => {
              if (res.ok) dataCache.put(p, res);
            }).catch(() => {})
          )
        );
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
  if (path.startsWith(BASE + "/data/") || path.includes(".pmtiles")) {
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
          }).catch(() => cache.match(BASE + "/"));
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

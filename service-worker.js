const CACHE_NAME = "jarvis-cache-v6"; // 🟢 এখানে v3 করে দিও
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest-Jarvis.json"
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // 🟢 নতুন কোড আসলে সাথে সাথে ইনস্টল করবে
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // 🟢 নতুন কোড দখল নেবে
  );
});

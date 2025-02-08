// service-worker.js
const CACHE_NAME = 'truck-tracker-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',  // Cache your main HTML file
  '/style.css',  // And your CSS
  '/script.js'   // And your JavaScript
  // Add other assets you want to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Basic fetch handling (for offline access)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

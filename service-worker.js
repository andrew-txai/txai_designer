const CACHE_NAME = 'txai-cache-v1';
const FILES_TO_CACHE = ['/', '/index.html', '/style.css', '/app.js'];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
});

self.addEventListener('fetch', evt => {
  evt.respondWith(caches.match(evt.request).then(res => res || fetch(evt.request)));
});

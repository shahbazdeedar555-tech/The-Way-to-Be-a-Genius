

const CACHE_NAME = "genius-book-v2";

const FILES_TO_CACHE = [
    "/The-Way-to-Be-a-Genius/",
    "/The-Way-to-Be-a-Genius/index.html",
    "/The-Way-to-Be-a-Genius/style.css",
    "/The-Way-to-Be-a-Genius/script.js",
    "/The-Way-to-Be-a-Genius/dictionary.js",
    "/The-Way-to-Be-a-Genius/manifest.json",
    "/The-Way-to-Be-a-Genius/1.png",
    "/The-Way-to-Be-a-Genius/2.png"
];

// Install Service Worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

// Activate Service Worker
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );

    self.clients.claim();
});

// Fetch files
self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});

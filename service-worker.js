
const CACHE_NAME = "genius-book-v4";

const FILES_TO_CACHE = [
    "/The-Way-to-Be-a-Genius/",
    "/The-Way-to-Be-a-Genius/index.html",
    "/The-Way-to-Be-a-Genius/style.css",
    "/The-Way-to-Be-a-Genius/script.js",
    "/The-Way-to-Be-a-Genius/dictionary.js",
    "/The-Way-to-Be-a-Genius/manifest.json",
    "/The-Way-to-Be-a-Genius/logo.png",
    "/The-Way-to-Be-a-Genius/logo-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    // Always fetch the downloadable logo directly.
    if (
        url.pathname === "/The-Way-to-Be-a-Genius/logo.png"
    ) {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

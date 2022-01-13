const CACHE_STATIC_NAME = 'pwa-static';

const urlsToCache = [
    '/',
    '/index.html',
    '/js/app.js',
    '/styles.css',
    'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap',
    'https://pro.fontawesome.com/releases/v5.10.0/css/all.css',
    'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css',
    '/assets/images/photo-1530789253388-582c481c54b0.jpeg',
];

const cacheResources = async() => {
    const cache = await caches.open(CACHE_STATIC_NAME)
    return cache.addAll(urlsToCache)
}

self.addEventListener('install', (event) => event.waitUntil(cacheResources()));

self.addEventListener('activate', (event) => {
    return self.clients.claim(); // service workers are loaded pertfectly.
});

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        if (response) {
            return response;
        } else {
            return fetch(event.request);
        }
    }));
});
const CACHE_STATIC_NAME = 'pwa-static-v4';
const CACHE_DYNAMIC_NAME = 'pwa-dynamic-v4';

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

self.addEventListener('install', (event) => {
    console.log('service worker: installing... ', event);
    event.waitUntil(cacheResources());
});

// clean old caches
const cleanCache = async() => {
    const keyList = await caches.keys()
    return Promise.all(
        keyList.map((key) => {
            if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                console.log('service workers: deleting cache with key... ', key);
                return caches.delete(key);
            }
        })
    )
}

self.addEventListener('activate', (event) => {
    console.log('service workers: activating, ', event);
    event.waitUntil(cleanCache());
    return self.clients.claim(); // service workers are loaded pertfectly.
});

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        if (response) {
            console.log('service workers: serve from cache... ', event.request);
            return response;
        } else {
            return fetch(event.request).then(res => {
                return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
                    console.log('service workers: caching dynamic... ', event.request);
                    cache.put(event.request.url, res.clone());
                    return res;
                });
            }).catch((err) => {
                console.error(err);
            });
        }
    }));
});
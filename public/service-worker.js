self.addEventListener('install', (event) => {

});

self.addEventListener('activate', (event) => {
    return self.clients.claim(); // service workers are loaded pertfectly.
});

self.addEventListener('fetch', (event) => {});
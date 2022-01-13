// register a service worker
navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log('Service worker resgistered!');
}).catch((err) => {
    console.error(err);
});
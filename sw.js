
// TODO adjust service worker scope and move this file to js folder

// Service Worker to cache files already visited
// Remember service worker default scope = its location
self.addEventListener('install', event => {
    console.log('Service worker was installed: ', event);
});

self.addEventListener('fetch', event => {
    console.log('Fetch event occurred: ', event);
});
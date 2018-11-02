
// CREDIT for the starter code used to develop this file:
// Udacity Front-End Engineering Nanodegree course on Service Workers
// 31 October 2018
// https://classroom.udacity.com/nanodegrees/nd001/parts/b29af831-fa50-4fe9-b30d-ad48476664d1/modules/83c4bddc-b362-4e71-8fa1-91f30ba57ab0/lessons/6381510081/concepts/63885494660923

// TODO adjust service worker scope and move this file to js folder

// NOTES
// Remember service worker default scope = its location
// Helpful note from MDN at https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// "A real service worker implementation would use caching and onfetch rather than the deprecated XMLHttpRequest API. Those features are not used here so that you can focus on understanding Promises."

let STATIC_CACHE = 'restaurant-static-v1';
let HOME_URL = 'http://localhost:8000/';

// Start caching
// Event fires when service worker installed for the first time
self.addEventListener('install', event => {
    // Confirm the event happened
    console.log('Service worker was installed: ', event);

    // // TODO Figure out how to add entire folders at a time
    // // Cache a list of items
    // event.waitUntil(
    //     caches.open(STATIC_CACHE).then(function (cache) {
    //         return cache.addAll([
    //             '/',
    //             '/img/2.jpg',
    //             '/js/dbhelper.js',
    //             '/js/main.js',
    //             '/js/restaurant_info.js',
    //             '/data/restaurants.json'
    //         ]);
    //     })
    // );
});

// Delete old cache (after new one is in use)
// Event fires when service worker activated & ready for use
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.delete('restaurant-static-v0')
    );

    // // TODO fix the following code if ever need to make this process more sustainable
    // event.waitUntil(
    //     caches.keys().then(function (cacheNames) {
    //         return Promise.all(
    //             cacheNames.filter(function (cacheName) {
    //                 return cacheName.startsWith('restaurant-static') && cacheName != STATIC_CACHE;
    //             }).map(function (cacheName) {
    //                 return cache.delete(cacheName);
    //             })
    //         );
    //     })
    // );
});

self.addEventListener('fetch', event => {

    // Confirm the event happened
    console.log('Fetch event occurred: ', event.request.url);

    // Load from cache if already available, otherwise save to cache
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function (response) {
            // Note the option to ignore the search!
            // more info @ https://developer.mozilla.org/en-US/docs/Web/API/Cache/match
            if (response) {
                // Return the item if it is already there
                // console.log('2', event.request.url);
                return response;
            } else if (event.request.url.startsWith(HOME_URL)) {
                // If not, cache the item
                // console.log('3', event.request.url);
                caches.open(STATIC_CACHE).then(function (cache) {
                    return cache.add(event.request.url);
                })
            }
            return fetch(event.request);
        }).catch(function (e) {
            console.log(e);
        })
    );

    // // Example HTML response
    // let html = '<html>It\'s <strong class="a winner is me">me!</strong></html>';
    // event.respondWith(
    //     new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
    // );

    // // Example image response #1
    // event.respondWith(
    //     fetch('/img/1.jpg')
    // );

    // // Example image response #2; intercept all images & replace with 1.jpg
    // if (event.request.url.endsWith('.jpg')) {
    //     event.respondWith(
    //         fetch('/img/1.jpg')
    //     );
    // }

    // // Example #3
    // event.respondWith(
    //     fetch(event.request).then(function (response) {
    //         if (response.status == 404) {
    //             return new Response("Whoops, not found");
    //         }
    //         return response;
    //     }).catch(function () {
    //         return new Response("Uh oh, that totally failed");
    //     })
    // );

});

// TODO adjust service worker scope and move this file to js folder

// Service Worker to cache files already visited
// Remember service worker default scope = its location
self.addEventListener('install', event => {

    // Confirm the event happened
    console.log('Service worker was installed: ', event);

    // Cache all local requests
    event.waitUntil(
        caches.open('restaurant-static-v1').then(function (cache) {
            return cache.addAll([
                '/',
                '/img/2.jpg',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/data/restaurants.json'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {

    // Confirm the event happened
    console.log('Fetch event occurred: ', event.request.url);

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

    // Example #4: load from cache if already available
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            return fetch(event.request);
        })
    );

    // // Define variables
    // let requestedURL = event.request.url;
    // let windowURLRegex = new RegExp(`^${window.location.href}(.+)`);

    // // Give initial feedback
    // console.log('Fetch event occurred: ', requestedURL);

    // // Cache the file if requestedURL begins with windowURL
    // if (requestedURL == windowURLRegex) {
    //     console.log("local");
    // }

});



// Helpful note from MDN at https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// "A real service worker implementation would use caching and onfetch rather than the deprecated XMLHttpRequest API. Those features are not used here so that you can focus on understanding Promises."

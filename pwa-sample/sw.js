'use strict';

var CACHE_NAME = 'pw-sample';

var cacheList = [
  '/index.html'
];

self.addEventListener('install', function(event) {
  console.log('install event');

  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(cacheList);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('fetch event');

  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      console.log('Cache hit - return response');
      // Cache hit - return response
      if (response) {
        return response;
      }

      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        }
      );
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('activate event');
});

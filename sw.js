importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

/**
 * Workbox 3.1.0
 * Workbox - https://developers.google.com/web/tools/workbox/
 * Codelab - https://codelabs.developers.google.com/codelabs/workbox-lab/
 */

if (workbox) {
  console.log(`[DEBUG] Workbox is loaded.`);

  workbox.setConfig({ debug: false });

  workbox.precaching.precacheAndRoute([
    {
      "url": "css/styles.css",
      "revision": "0e7f7120891b6609730d747c2c78b306"
    },
    {
      "url": "data/restaurants.json",
      "revision": "a294ed676e9bb2d3d50019ecb4292eaf"
    },
    {
      "url": "index.html",
      "revision": "375469cbd761d5ad336110b9d73b5686"
    },
    {
      "url": "js/dbhelper.js",
      "revision": "81e76e9572140f26622ea4fe428cc9eb"
    },
    {
      "url": "js/main.js",
      "revision": "957d7bbef08fe20de2e0a31131219be1"
    },
    {
      "url": "js/restaurant_info.js",
      "revision": "a798d8a9e1f3e1ca8709f2fb8cc010ae"
    },
    {
      "url": "restaurant.html",
      "revision": "ef524a681d8e0c52cdd55e6c0bb53ec3"
    }
  ]);

  workbox.routing.registerRoute(
    new RegExp('(.*).(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pwa-cache-googleapis',
      cacheExpiration: {
        maxEntries: 20
      },
      cacheableResponse: {statuses: [0, 200]}
    })
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'pwa-cache-images',

      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        })
      ]
    })
  );

  workbox.routing.registerRoute(
    new RegExp('restaurant.html(.*)'),
    workbox.strategies.networkFirst({
      cacheName: 'pwa-cache-restaurants',
  
      cacheableResponse: {statuses: [0, 200]}
    })
  );

} else {
  console.log(`[DEBUG] Workbox didn't load.`);
}

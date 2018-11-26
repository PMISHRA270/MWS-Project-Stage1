importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

/**
 * Workbox 3.1.0
 * Workbox - https://developers.google.com/web/tools/workbox/
 * Codelab - https://codelabs.developers.google.com/codelabs/workbox-lab/
 */

if (workbox) {
  console.log(`[DEBUG] Workbox is loaded.`);

  workbox.setConfig({ debug: false });

  workbox.precaching.precacheAndRoute([]);

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

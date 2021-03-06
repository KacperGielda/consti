
importScripts('https://cdnjs.cloudflare.com/ajax/libs/localforage/1.9.0/localforage.js');

workbox.core.setCacheNameDetails({prefix: "client"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("index.html"));

 workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
 );
 
 workbox.routing.registerRoute(
  "https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.esm.js",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'ionic-icons',
  })
 );
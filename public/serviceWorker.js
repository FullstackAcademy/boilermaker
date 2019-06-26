const FILES_TO_CACHE = ['/offline.html']

evt.waitUntil(
  caches.open(CACHE_NAME).then(cache => {
    console.log('[ServiceWorker] Pre-caching offline page')
    return cache.addAll(FILES_TO_CACHE)
  })
)

evt.waitUntil(
  caches.keys().then(keyList => {
    return Promise.all(
      keyList.map(key => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key)
          return caches.delete(key)
        }
      })
    )
  })
)

if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  return
}
evt.respondWith(
  fetch(evt.request).catch(() => {
    return caches.open(CACHE_NAME).then(cache => {
      return cache.match('offline.html')
    })
  })
)

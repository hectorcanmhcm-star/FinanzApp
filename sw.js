const CACHE_NAME = 'finanzapp-cache-v1';
const urlsToCache = [
  '/FinanzApp/',
  '/FinanzApp/index.html',
  '/FinanzApp/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instala y guarda en la memoria del celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Cuando no hay red (o bloquean los datos), saca los archivos de la memoria local
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

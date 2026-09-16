/* ==========================================================================
   Service Worker — Aaradhya Dev Tamrakar Portfolio (v54.6)
   Provides offline capability & asset caching for fast return visits.
   ========================================================================== */

const CACHE_NAME = 'aaradhya-portfolio-v54.6';

const STATIC_ASSETS = [
  './',
  './index.html',
  './about.html',
  './projects.html',
  './experience.html',
  './achievements.html',
  './journey.html',
  './contact.html',
  './privacy.html',
  './terms.html',
  './404.html',
  './site.webmanifest',
  './llms.txt',
  './llms-full.txt',
  './assets/css/modules/tokens.css',
  './assets/css/modules/base.css',
  './assets/css/modules/layout.css',
  './assets/css/modules/components.css',
  './assets/css/modules/cmdk.css',
  './assets/css/modules/access.css',
  './assets/css/modules/terminal.css',
  './assets/css/modules/tour.css',
  './assets/css/modules/graph-modal.css',
  './assets/css/modules/print.css',
  './assets/js/script.js',
  './assets/js/bg-animations.js',
  './assets/js/data/releases.js',
  './assets/js/data/search-index.js',
  './assets/js/data/resume-data.js',
  './assets/js/data/graph-data.js',
  './assets/js/modules/constants.js',
  './assets/js/modules/core.js',
  './assets/js/modules/tour.js',
  './assets/js/modules/cmdk.js',
  './assets/js/modules/ui.js',
  './assets/js/modules/shortcuts.js',
  './assets/js/modules/access.js',
  './assets/js/modules/audio.js',
  './assets/js/modules/terminal.js',
  './assets/js/modules/graph-modal.js',
  './assets/js/modules/haptics.js',
  './assets/js/modules/evidence.js',
  './assets/js/modules/home-widgets.js',
  './data/quantitative-claims.json',
  './assets/images/photo.webp',
  './assets/images/og-image.jpg',
  './assets/images/icon-192.png',
  './assets/images/icon-512.png',
  './assets/images/logos/ieee-kec.webp',
  './assets/images/logos/nssr.webp',
  './assets/images/logos/epc-club.webp',
  './assets/images/logos/fusemachines.webp',
  './assets/images/logos/makerspace.webp'
];

// Install: precache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: purge old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-first for HTML, Cache-first for static assets
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Skip non-GET requests and cross-origin requests
  if (req.method !== 'GET' || url.origin !== location.origin) {
    return;
  }

  // HTML navigation requests: Network-first, fallback to cache
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((response) => {
          if (response.status === 200) {
            const resClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(req).then((cached) => cached || caches.match('./404.html'));
        })
    );
    return;
  }

  // Static assets (CSS, JS, images): Cache-first, fallback to network
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        // Background revalidate
        fetch(req).then((response) => {
          if (response.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, response));
          }
        }).catch(() => {/* ignore offline network failures */ });
        return cached;
      }
      return fetch(req).then((response) => {
        if (response.status === 200) {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        }
        return response;
      });
    })
  );
});

// Push Notifications: dynamic background push event handler
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (_) {
      data = { title: 'Aaradhya Dev Tamrakar', body: event.data.text() };
    }
  } else {
    data = {
      title: 'Aaradhya Dev Tamrakar',
      body: 'New update available on the portfolio website!'
    };
  }

  const options = {
    body: data.body || 'Check out recent engineering projects and updates.',
    icon: data.icon || './assets/images/photo.webp',
    badge: data.badge || './assets/images/photo.webp',
    data: {
      url: data.url || './projects.html'
    },
    vibrate: [100, 50, 100],
    actions: data.actions || [
      { action: 'explore', title: 'Explore' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Aaradhya Dev Tamrakar', options)
  );
});

// Notification click event handler: focus matching tab or open destination
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || './';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

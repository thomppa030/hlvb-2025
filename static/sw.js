// Service Worker for HLVB-2025
const CACHE_NAME = 'hlvb-2025-v1';
const STATIC_CACHE = 'hlvb-static-v1';
const DYNAMIC_CACHE = 'hlvb-dynamic-v1';

// Cache static assets
const staticAssets = [
  '/',
  '/manifest.json',
  '/cropped-Logo-Taupe.webp',
  '/hlvb_backside_header.webp',
  // Add more static assets as needed
];

// Cache strategies
const cacheStrategies = {
  // Cache first for static assets
  static: [
    /\.(css|js|woff2?|webp|jpg|jpeg|png|svg)$/,
    /\/cropped-Logo-Taupe\.webp$/,
    /\/hlvb_backside_header\.webp$/
  ],
  
  // Network first for HTML and API calls
  networkFirst: [
    /\/api\//,
    /\.html$/,
    /\/$/,
    /\/en\/?$/
  ],
  
  // Stale while revalidate for other content
  staleWhileRevalidate: [
    /https:\/\/fonts\.(googleapis|gstatic)\.com/,
    /https:\/\/.*\.prismic\.io/
  ]
};

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(staticAssets);
    })
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('hlvb-') && cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-HTTP requests
  if (!url.protocol.startsWith('http')) return;

  // Apply caching strategy
  if (matchesPattern(request.url, cacheStrategies.static)) {
    event.respondWith(cacheFirst(request));
  } else if (matchesPattern(request.url, cacheStrategies.networkFirst)) {
    event.respondWith(networkFirst(request));
  } else if (matchesPattern(request.url, cacheStrategies.staleWhileRevalidate)) {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

// Cache first strategy
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('Network failed, no cache available:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network first strategy
async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    console.log('Network failed, no cache available:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });
  
  return cached || fetchPromise;
}

// Helper function to match URL patterns
function matchesPattern(url, patterns) {
  return patterns.some(pattern => pattern.test(url));
}
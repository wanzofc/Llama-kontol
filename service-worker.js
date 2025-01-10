const CACHE_NAME = 'v1';
const OFFLINE_URL = '/offline.html';

// Install event - Caching resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/package.json',
                '/server.js',
                OFFLINE_URL, // Offline fallback page
                'https://img101.pixhost.to/images/341/551056071_wanzofc.jpg', // Image for offline
            ]);
        })
    );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cache) => {
                    if (!cacheWhitelist.includes(cache)) {
                        return caches.delete(cache);
                    }
                })
            )
        )
    );
    return self.clients.claim();
});

// Fetch event - Serve resources from cache or network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return (
                response ||
                fetch(event.request).catch(() => {
                    if (event.request.mode === 'navigate') {
                        return caches.match(OFFLINE_URL);
                    }
                })
            );
        })
    );
});

// Background Sync - Sync data when online
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncDataToServer());
    }
});

async function syncDataToServer() {
    // Example: Sync pending data to server
    console.log('Syncing data to server...');
    const data = await getPendingDataFromIndexedDB();
    if (data) {
        return fetch('/api/sync', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// Push Notification - Show notification
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const options = {
        body: data.body || 'Anda memiliki notifikasi baru!',
        icon: '/icon.png',
        badge: '/badge.png',
    };
    event.waitUntil(
        self.registration.showNotification(data.title || 'Notifikasi', options)
    );
});

// Periodic Background Sync - Update data periodically
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'update-news') {
        event.waitUntil(fetchAndCacheLatestNews());
    }
});

async function fetchAndCacheLatestNews() {
    const response = await fetch('/api/news');
    const data = await response.json();
    const cache = await caches.open(CACHE_NAME);
    await cache.put('/api/news', new Response(JSON.stringify(data)));
}

// Stale-While-Revalidate Caching Strategy
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((response) => {
                const fetchPromise = fetch(event.request).then(
                    (networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    }
                );
                return response || fetchPromise;
            });
        })
    );
});

// Utility: Get pending data from IndexedDB (example for Background Sync)
async function getPendingDataFromIndexedDB() {
    // Simulate getting data from IndexedDB (replace with actual logic)
    return { id: 1, content: 'Pending data example' };
}

### Offline Storage & PWA Strategy

- IndexedDB stores content pack manifests, user counters/deltas, analytics queues, favorites, preferences, and auth tokens; it offers strong persistence even across long offline periods
- Cache Storage holds media assets (letters, later words) and application shell resources; the service worker proactively caches required assets and retries failed downloads to surface progress to the user; new service worker deployments automatically clear outdated page caches while preserving versioned asset caches so repeat visits stay fast without re-downloading stable media;
- Cache eviction is browser-dependent; The app replays the caching loop when it detects missing assets, keeping gameplay functional; If IndexedDB quota is exceeded during a content pack install the user sees a notification with retry guidance; smaller write failures during normal play are handled silently and retried later
- Dynamic pages (modules, lessons, games) render from cached shell plus IndexedDB data; static marketing/legal pages are cached directly for offline reading
- Add-to-home-screen, fullscreen mode, and optional background update flows follow PWA best practices without compromising the offline-first requirement

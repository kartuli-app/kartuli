// Cache version - increment when making breaking changes
const CACHE_VERSION = 'v6';
const CACHE_NAMES = {
  routes: `kartuli-routes-${CACHE_VERSION}`,
  assets: `kartuli-assets-${CACHE_VERSION}`,
};

// All routes to cache for offline access
// Static routes
const STATIC_ROUTES = [
  '/',
  '/landing',
  '/app',
  '/app/freestyle',
  '/app/search',
  '/app/saved',
  '/app/profile',
  '/app/resources',
  '/app/terms',
  '/app/privacy',
];

// Dynamic routes - lesson IDs from library.ts
const LESSON_IDS = [
  'lesson-alphabet-vowels',
  'lesson-alphabet-sounds-you-know',
  'lesson-alphabet-more-easy-sounds',
  'lesson-alphabet-puff-and-pop',
  'lesson-alphabet-k-family',
  'lesson-alphabet-hissing-sounds',
  'lesson-alphabet-buzzing-sounds',
];

// Generate all dynamic routes
const LESSON_ROUTES = LESSON_IDS.map((id) => `/app/lesson/${id}`);
const GAME_ROUTES = LESSON_IDS.map((id) => `/app/game/${id}`);

// All routes combined
const ALL_ROUTES = [...STATIC_ROUTES, ...LESSON_ROUTES, ...GAME_ROUTES];

// Helper: Strip query params from URL for matching
function stripQueryParams(url) {
  try {
    const urlObj = new URL(url, self.location.origin);
    return urlObj.pathname;
  } catch {
    return url.split('?')[0];
  }
}

// Helper: Match request URL to known route
function matchRoute(url) {
  const pathname = stripQueryParams(url);
  return ALL_ROUTES.includes(pathname);
}

// Helper: Get route path from full URL
function getRouteFromURL(url) {
  return stripQueryParams(url);
}

// Helper: Extract all asset URLs from HTML
function extractAllAssetUrls(html, baseUrl) {
  const assets = {
    scripts: [],
    stylesheets: [],
    images: [],
    fonts: [],
    links: [],
  };

  // Extract script tags
  const scriptRegex = /<script[^>]+src=["']([^"']+)["']/gi;
  let match = scriptRegex.exec(html);
  while (match !== null) {
    assets.scripts.push(resolveUrl(match[1], baseUrl));
    match = scriptRegex.exec(html);
  }

  // Extract link tags (CSS, preload, etc.)
  const linkRegex = /<link[^>]+href=["']([^"']+)["']/gi;
  match = linkRegex.exec(html);
  while (match !== null) {
    const href = match[1];
    const relMatch = html.substring(match.index, match.index + 200).match(/rel=["']([^"']+)["']/i);
    const rel = relMatch ? relMatch[1] : '';
    if (rel.includes('stylesheet') || href.endsWith('.css')) {
      assets.stylesheets.push(resolveUrl(href, baseUrl));
    } else if (rel.includes('preload') || rel.includes('prefetch')) {
      // Preload/prefetch resources
      const asMatch = html.substring(match.index, match.index + 200).match(/as=["']([^"']+)["']/i);
      const as = asMatch ? asMatch[1] : '';
      if (as === 'font' || href.match(/\.(woff2?|ttf|otf|eot)$/i)) {
        assets.fonts.push(resolveUrl(href, baseUrl));
      } else if (as === 'image' || href.match(/\.(png|jpg|jpeg|gif|webp|svg|avif)$/i)) {
        assets.images.push(resolveUrl(href, baseUrl));
      }
    }
    match = linkRegex.exec(html);
  }

  // Extract img tags
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  match = imgRegex.exec(html);
  while (match !== null) {
    assets.images.push(resolveUrl(match[1], baseUrl));
    match = imgRegex.exec(html);
  }

  // Extract source tags (for picture elements)
  const sourceRegex = /<source[^>]+srcset=["']([^"']+)["']/gi;
  match = sourceRegex.exec(html);
  while (match !== null) {
    // srcset can have multiple URLs, extract the first one
    const srcset = match[1].split(',')[0].trim().split(/\s+/)[0];
    assets.images.push(resolveUrl(srcset, baseUrl));
    match = sourceRegex.exec(html);
  }

  // Extract link tags for navigation (for pre-caching)
  const navLinkRegex = /<a[^>]+href=["']([^"']+)["']/gi;
  match = navLinkRegex.exec(html);
  while (match !== null) {
    const href = match[1];
    // Only cache same-origin links
    if (href.startsWith('/') || href.startsWith(self.location.origin)) {
      assets.links.push(resolveUrl(href, baseUrl));
    }
    match = navLinkRegex.exec(html);
  }

  return assets;
}

// Helper: Resolve relative URLs to absolute
function resolveUrl(url, baseUrl) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('//')) {
    return self.location.protocol + url;
  }
  if (url.startsWith('/')) {
    return self.location.origin + url;
  }
  // Relative URL
  try {
    return new URL(url, baseUrl).href;
  } catch {
    return `${self.location.origin}/${url}`;
  }
}

// Helper: Cache all assets from HTML (extracted to avoid duplication)
async function cacheAllAssetsFromHTML(html, baseUrl) {
  const assetsCache = await caches.open(CACHE_NAMES.assets);
  const routesCache = await caches.open(CACHE_NAMES.routes);
  const allAssets = extractAllAssetUrls(html, baseUrl);
  const routePath = getRouteFromURL(baseUrl);

  const cachePromises = [];

  // Cache all scripts
  for (const scriptUrl of allAssets.scripts) {
    cachePromises.push(
      fetch(scriptUrl)
        .then((response) => {
          if (response.ok) {
            return assetsCache.put(scriptUrl, response.clone());
          }
        })
        .catch(() => null),
    );
  }

  // Cache all stylesheets and their fonts
  for (const cssUrl of allAssets.stylesheets) {
    cachePromises.push(
      fetch(cssUrl)
        .then(async (cssResponse) => {
          if (cssResponse.ok) {
            await assetsCache.put(cssUrl, cssResponse.clone());
            // Extract fonts from CSS
            const fontUrls = await extractFontUrlsFromCSS(cssUrl);
            for (const fontUrl of fontUrls) {
              cachePromises.push(
                fetch(fontUrl)
                  .then((fontResponse) => {
                    if (fontResponse.ok) {
                      return assetsCache.put(fontUrl, fontResponse.clone());
                    }
                  })
                  .catch(() => null),
              );
            }
          }
        })
        .catch(() => null),
    );
  }

  // Cache all images
  for (const imgUrl of allAssets.images) {
    cachePromises.push(
      fetch(imgUrl)
        .then((response) => {
          if (response.ok) {
            return assetsCache.put(imgUrl, response.clone());
          }
        })
        .catch(() => null),
    );
  }

  // Cache all fonts
  for (const fontUrl of allAssets.fonts) {
    cachePromises.push(
      fetch(fontUrl)
        .then((response) => {
          if (response.ok) {
            return assetsCache.put(fontUrl, response.clone());
          }
        })
        .catch(() => null),
    );
  }

  // Pre-cache linked pages (best-effort, limit to avoid too many requests)
  const linksToCache = allAssets.links
    .filter((linkUrl) => {
      const linkPath = getRouteFromURL(linkUrl);
      return matchRoute(linkUrl) && linkPath !== routePath;
    })
    .slice(0, 10); // Limit to 10 links to avoid overwhelming

  for (const linkUrl of linksToCache) {
    cachePromises.push(
      fetch(linkUrl)
        .then((response) => {
          if (response.ok) {
            return routesCache.put(linkUrl, response.clone());
          }
        })
        .catch(() => null),
    );
  }

  // Cache all assets (best-effort, don't wait for all)
  return Promise.allSettled(cachePromises);
}

// Helper: Extract font URLs from CSS
async function extractFontUrlsFromCSS(cssUrl) {
  try {
    const response = await fetch(cssUrl);
    if (!response.ok) return [];
    const css = await response.text();
    const fontUrls = [];
    // Match @font-face src: url(...)
    const fontRegex = /url\(["']?([^"')]+\.(woff2?|ttf|otf|eot))["']?\)/gi;
    let match = fontRegex.exec(css);
    while (match !== null) {
      let fontUrl = match[1];
      // Handle relative URLs
      if (fontUrl.startsWith('/')) {
        fontUrls.push(fontUrl);
      } else if (fontUrl.startsWith('../')) {
        // Resolve relative to CSS file location
        const cssPath = new URL(cssUrl, self.location.origin).pathname;
        const cssDir = cssPath.substring(0, cssPath.lastIndexOf('/'));
        fontUrl = fontUrl.replace(/\.\.\//g, '');
        fontUrls.push(`${cssDir}/${fontUrl}`);
      } else {
        fontUrls.push(fontUrl);
      }
      match = fontRegex.exec(css);
    }
    return fontUrls;
  } catch {
    return [];
  }
}

// Helper: Cache a route and its assets
async function cacheRouteWithAssets(route, routesCache, assetsCache) {
  try {
    // Fetch the route
    const response = await fetch(route);
    if (!response.ok) {
      return null;
    }

    // Cache the HTML
    await routesCache.put(route, response.clone());

    // Extract and cache ALL assets from HTML
    const html = await response.text();
    const allAssets = extractAllAssetUrls(html, route);

    const cachePromises = [];

    // Cache all scripts
    for (const scriptUrl of allAssets.scripts) {
      cachePromises.push(
        fetch(scriptUrl)
          .then((scriptResponse) => {
            if (scriptResponse.ok) {
              return assetsCache.put(scriptUrl, scriptResponse.clone());
            }
          })
          .catch(() => null),
      );
    }

    // Cache all stylesheets and their fonts
    for (const cssUrl of allAssets.stylesheets) {
      cachePromises.push(
        fetch(cssUrl)
          .then(async (cssResponse) => {
            if (cssResponse.ok) {
              await assetsCache.put(cssUrl, cssResponse.clone());
              // Extract fonts from CSS
              const fontUrls = await extractFontUrlsFromCSS(cssUrl);
              for (const fontUrl of fontUrls) {
                cachePromises.push(
                  fetch(fontUrl)
                    .then((fontResponse) => {
                      if (fontResponse.ok) {
                        return assetsCache.put(fontUrl, fontResponse.clone());
                      }
                    })
                    .catch(() => null),
                );
              }
            }
          })
          .catch(() => null),
      );
    }

    // Cache all images
    for (const imgUrl of allAssets.images) {
      cachePromises.push(
        fetch(imgUrl)
          .then((imgResponse) => {
            if (imgResponse.ok) {
              return assetsCache.put(imgUrl, imgResponse.clone());
            }
          })
          .catch(() => null),
      );
    }

    // Cache all fonts
    for (const fontUrl of allAssets.fonts) {
      cachePromises.push(
        fetch(fontUrl)
          .then((fontResponse) => {
            if (fontResponse.ok) {
              return assetsCache.put(fontUrl, fontResponse.clone());
            }
          })
          .catch(() => null),
      );
    }

    // Cache all assets (best-effort, don't fail if some are missing)
    await Promise.allSettled(cachePromises);

    return response;
  } catch (error) {
    console.warn(`Failed to cache route ${route}:`, error);
    return null;
  }
}

// Install event - cache all routes individually (resilient to failures)
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache routes and their assets
      Promise.all([caches.open(CACHE_NAMES.routes), caches.open(CACHE_NAMES.assets)]).then(
        ([routesCache, assetsCache]) => {
          // Cache each route individually (don't fail all if one fails)
          return Promise.allSettled(
            ALL_ROUTES.map((route) => cacheRouteWithAssets(route, routesCache, assetsCache)),
          );
        },
      ),
      // Cache critical static assets
      caches
        .open(CACHE_NAMES.assets)
        .then((cache) => {
          const criticalAssets = [
            '/manifest.webmanifest',
            '/icon-192x192.png',
            '/icon-512x512.png',
            '/mascot-64.webp',
            '/mascot-64.png',
            '/icon.svg',
            '/illustrations/work-in-progress.svg',
          ];
          return Promise.allSettled(
            criticalAssets.map((asset) =>
              cache.add(asset).catch(() => {
                // Silently ignore missing assets
                return null;
              }),
            ),
          );
        }),
    ])
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker install failed:', error);
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete caches that don't match current version
            const isCurrentCache = Object.values(CACHE_NAMES).includes(cacheName);
            if (!isCurrentCache && cacheName.startsWith('kartuli-')) {
              return caches.delete(cacheName);
            }
            return Promise.resolve();
          }),
        );
      })
      .then(() => {
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('Service Worker activate failed:', error);
      }),
  );
});

// Fetch event - network-first when online, cache-first when offline
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const url = event.request.url;
  const routePath = getRouteFromURL(url);
  const isRoute = matchRoute(url);
  const isSameOrigin = url.startsWith(self.location.origin);

  // Only intercept same-origin requests
  if (!isSameOrigin) {
    return;
  }

  // Always respond - don't let requests bypass the service worker
  event.respondWith(
    // Try cache first for better offline experience
    caches
      .match(event.request)
      .then((cachedResponse) => {
        // If we have a cached response, use it but also try to update in background
        if (cachedResponse) {
          // Try to update cache in background (don't wait)
          fetch(event.request.clone())
            .then((networkResponse) => {
              if (
                networkResponse &&
                networkResponse.status >= 200 &&
                networkResponse.status < 300
              ) {
                const cacheName = isRoute ? CACHE_NAMES.routes : CACHE_NAMES.assets;
                caches.open(cacheName).then((cache) => {
                  cache.put(event.request, networkResponse.clone());
                  // If HTML, also extract and cache assets
                  if (
                    isRoute &&
                    networkResponse.headers.get('content-type')?.includes('text/html')
                  ) {
                    networkResponse
                      .clone()
                      .text()
                      .then(async (html) => {
                        await cacheAllAssetsFromHTML(html, url);
                      })
                      .catch(() => null);
                  }
                });
              }
            })
            .catch(() => {
              // Network failed, that's OK - we have cache
            });
          return cachedResponse;
        }

        // No cache - try network
        return fetch(event.request.clone())
          .then((networkResponse) => {
            // Cache successful responses (status 200-299, any type)
            if (networkResponse && networkResponse.status >= 200 && networkResponse.status < 300) {
              const responseToCache = networkResponse.clone();
              const cacheName = isRoute ? CACHE_NAMES.routes : CACHE_NAMES.assets;

              // Cache the response (best-effort, ignore errors)
              caches
                .open(cacheName)
                .then((cache) => {
                  // Cache with full URL (including query params)
                  cache.put(event.request, responseToCache);
                  // Also cache without query params for easier matching
                  if (url !== routePath) {
                    const requestWithoutQuery = new Request(routePath, {
                      method: 'GET',
                      headers: event.request.headers,
                    });
                    cache.put(requestWithoutQuery, responseToCache.clone());
                  }

                  // If this is an HTML route, extract and cache ALL assets
                  if (
                    isRoute &&
                    networkResponse.headers.get('content-type')?.includes('text/html')
                  ) {
                    networkResponse
                      .clone()
                      .text()
                      .then(async (html) => {
                        await cacheAllAssetsFromHTML(html, url);
                      })
                      .catch(() => {
                        // Silently ignore errors
                      });
                  }
                })
                .catch(() => {
                  // Silently ignore cache errors
                });
            }

            return networkResponse;
          })
          .catch((_error) => {
            // Network failed - try cache with multiple strategies
            return caches
              .match(event.request)
              .then((cachedResponse) => {
                if (cachedResponse) {
                  return cachedResponse;
                }

                // Try matching by pathname (without query params) for both routes and assets
                return caches.match(routePath).then((pathCached) => {
                  if (pathCached) {
                    return pathCached;
                  }

                  // For routes, try fallback
                  if (isRoute) {
                    return caches.match('/app/freestyle').then((fallbackResponse) => {
                      if (fallbackResponse) {
                        return fallbackResponse;
                      }
                    });
                  }

                  // For assets, try searching all caches
                  return Promise.all([
                    caches.open(CACHE_NAMES.routes),
                    caches.open(CACHE_NAMES.assets),
                  ]).then(([routesCache, assetsCache]) => {
                    return (
                      assetsCache.match(routePath) ||
                      routesCache.match(routePath) ||
                      assetsCache.match(event.request) ||
                      routesCache.match(event.request)
                    );
                  });
                });
              })
              .then((cachedResponse) => {
                if (cachedResponse) {
                  return cachedResponse;
                }

                // No cache available - handle based on request type
                if (event.request.mode === 'navigate') {
                  // Navigation request: return fallback page
                  return caches.match('/app/freestyle').then((fallbackResponse) => {
                    if (fallbackResponse) {
                      return fallbackResponse;
                    }
                    // If even fallback is not available, return a basic offline page
                    return new Response('Offline', {
                      status: 200,
                      headers: { 'Content-Type': 'text/html' },
                    });
                  });
                }

                // For non-navigation requests (assets), return a minimal response
                // This prevents 408 errors but assets will be missing (broken images, etc)
                // The page will still function, just without those assets
                return new Response('', {
                  status: 404,
                  statusText: 'Not Found',
                });
              });
          });
      }),
  );
});

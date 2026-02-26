/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { defaultCache } from '@serwist/turbopack/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: false, // we serve precached shell for /en and /en/*, so preload is unused and would be cancelled
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: '/~offline',
        matcher({ request }) {
          return request.destination === 'document';
        },
      },
    ],
  },
});

// Run in capture phase so we handle /en and /en/* before Serwist's handler (which does fetch() and would no-response when offline).
// Redirect / to /en (same as Next.js redirects when online). Shell at /en will handle locale later.
self.addEventListener(
  'fetch',
  (event) => {
    const url = new URL(event.request.url);
    const isRootDocument =
      url.origin === self.location.origin &&
      url.pathname === '/' &&
      (event.request.mode === 'navigate' || event.request.destination === 'document');
    if (isRootDocument) {
      event.respondWith(Response.redirect(`${url.origin}/en`, 302));
      return;
    }

    // Serve the single precached shell for all same-origin GETs to /en and /en/* (navigate, prefetch, or any mode) to avoid no-response when offline.
    const isInShellGet =
      event.request.method === 'GET' &&
      url.origin === self.location.origin &&
      (url.pathname === '/en' || url.pathname.startsWith('/en/'));
    if (isInShellGet) {
      event.respondWith(
        serwist.matchPrecache('/en').then((r) => {
          if (r) return r;
          return fetch(event.request).catch(() =>
            serwist.matchPrecache('/~offline').then(
              (offline) =>
                offline ??
                new Response('Offline', {
                  status: 503,
                  statusText: 'Service Unavailable',
                }),
            ),
          );
        }),
      );
    }
  },
  { capture: true },
);

serwist.addEventListeners();

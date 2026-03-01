/**
 * Service worker script. Runs in a separate thread (WorkerGlobalScope); no DOM or window.
 *
 * Responsibilities:
 * - Precaches the app shell (/en), offline page, icons, and fonts so the app works offline
 * - On fetch: for navigation to /, serves precached / if available (offline) else fetches so the app loads and I18nShell can redirect from localStorage. For /en and /en/*, serves precached shell or offline fallback.
 * - Listens for SKIP_WAITING from the page so the user can activate a waiting update
 * - Notifies the page via postMessage when: a new worker is waiting (SW_WAITING), or this worker is ready (SW_READY_OFFLINE)
 */

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { defaultCache } from '@serwist/turbopack/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';
import { SKIP_WAITING, SW_READY_OFFLINE, SW_WAITING } from './service-worker-messages';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    /** Injected at build time by the Serwist route from additionalPrecacheEntries. */
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

/** Serwist handles install (precache), activate, and runtime caching. We add our own fetch and message logic. */
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

// --- Fetch: serve / from precache or network so app can redirect; serve /en and /en/* from precache or offline ---
// We use capture: true so this runs before Serwist's fetch handler (which would try fetch() and fail when offline).
self.addEventListener(
  'fetch',
  (event) => {
    const url = new URL(event.request.url);

    // Navigation to /: serve precached / if available (offline), else fetch. App loads and I18nShell redirects to preferred locale.
    const isRootDocument =
      event.request.method === 'GET' &&
      url.origin === self.location.origin &&
      url.pathname === '/' &&
      (event.request.mode === 'navigate' || event.request.destination === 'document');
    if (isRootDocument) {
      event.respondWith(
        serwist.matchPrecache('/').then((r) => {
          if (r) return r.clone();
          return fetch(event.request)
            .then((res) =>
              res.ok ? res : Promise.reject(new Error(`Non-ok response: ${res.status}`)),
            )
            .catch(() =>
              serwist.matchPrecache('/~offline').then(
                (offline) =>
                  offline?.clone() ??
                  new Response('Offline', {
                    status: 503,
                    statusText: 'Service Unavailable',
                  }),
              ),
            );
        }),
      );
      event.stopImmediatePropagation();
      return;
    }

    // Navigation to /en or /en/*: serve precached shell if available; if fetch fails (offline), serve /~offline.
    const isInShellGet =
      event.request.method === 'GET' &&
      url.origin === self.location.origin &&
      (url.pathname === '/en' || url.pathname.startsWith('/en/')) &&
      (event.request.mode === 'navigate' || event.request.destination === 'document');
    if (isInShellGet) {
      event.respondWith(
        serwist.matchPrecache('/en').then((r) => {
          if (r) return r.clone();
          return fetch(event.request)
            .then((res) =>
              res.ok ? res : Promise.reject(new Error(`Non-ok response: ${res.status}`)),
            )
            .catch(() =>
              serwist.matchPrecache('/~offline').then(
                (offline) =>
                  offline?.clone() ??
                  new Response('Offline', {
                    status: 503,
                    statusText: 'Service Unavailable',
                  }),
              ),
            );
        }),
      );
      event.stopImmediatePropagation();
    }
  },
  { capture: true },
);

// --- Messages from the page (client → SW) ---
// When the user clicks "Go to next version", the page sends SKIP_WAITING so this (waiting) worker calls skipWaiting() and activates.
self.addEventListener('message', (event) => {
  if (event.data?.type === SKIP_WAITING) {
    self.skipWaiting();
  }
});

// --- Lifecycle: notify the page (SW → client) ---
// Install: if we are the new waiting worker (there is already an active worker), tell all clients so they can show "update available".
self.addEventListener('install', (event) => {
  console.warn('[service-worker] install event');
  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      if (self.registration.active != null && clients.length > 0) {
        for (const client of clients) {
          client.postMessage({ type: SW_WAITING });
        }
      }
    }),
  );
});

// Activate: once we have claimed clients, tell them we are ready so they can show "ready for offline".
self.addEventListener('activate', (event) => {
  console.warn('[service-worker] activate event');
  event.waitUntil(
    self.clients
      .claim()
      .then(() => self.clients.matchAll())
      .then((clients) => {
        for (const client of clients) {
          client.postMessage({ type: SW_READY_OFFLINE });
        }
      }),
  );
});

serwist.addEventListeners();

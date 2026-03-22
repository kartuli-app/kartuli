/**
 * Service worker script. Runs in a separate thread (WorkerGlobalScope); no DOM or window.
 *
 * Responsibilities:
 * - Precaches shells, emergency /~offline, icons, and fonts.
 * - Document navigations: shell-first SPA — same precached HTML for almost all paths; URL bar unchanged; client normalizes locale and routes.
 * - `/` uses precached `/` so I18nShell can redirect to preferred locale.
 * - `/~offline` serves the minimal emergency page (not the SPA), when that URL is requested or when shell delivery fails.
 * - Listens for SKIP_WAITING; posts SW_WAITING / SW_READY_OFFLINE to clients.
 */

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { defaultLng } from '@game-client/i18n/default-locale';
import { defaultCache } from '@serwist/turbopack/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';
import { SKIP_WAITING, SW_READY_OFFLINE, SW_WAITING } from './service-worker-messages';

const DEFAULT_SHELL_PATH = `/${defaultLng}`;

const OFFLINE_FALLBACK = new Response('Offline', {
  status: 503,
  statusText: 'Service Unavailable',
});

/**
 * Serves a navigation request: try precached shell at precachePath, then network, then /~offline.
 */
function serveShellOrOffline(request: Request, precachePath: string): Promise<Response> {
  return serwist.matchPrecache(precachePath).then((r) => {
    if (r) return r.clone();
    return fetch(request)
      .then((res) => (res.ok ? res : Promise.reject(new Error(`Non-ok response: ${res.status}`))))
      .catch(() =>
        serwist
          .matchPrecache('/~offline')
          .then((offline) => offline?.clone() ?? OFFLINE_FALLBACK.clone()),
      );
  });
}

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    /** Injected at build time by the Serwist route from additionalPrecacheEntries. */
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: false,
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

function isSameOriginDocumentNavigation(event: FetchEvent, url: URL): boolean {
  return (
    event.request.method === 'GET' &&
    url.origin === self.location.origin &&
    (event.request.mode === 'navigate' || event.request.destination === 'document')
  );
}

// Capture phase before Serwist: shell-first for documents (offline-safe).
self.addEventListener(
  'fetch',
  (event) => {
    const url = new URL(event.request.url);
    if (!isSameOriginDocumentNavigation(event, url)) return;

    // Root: precached `/` for locale redirect in the shell.
    if (url.pathname === '/') {
      event.respondWith(serveShellOrOffline(event.request, '/'));
      event.stopImmediatePropagation();
      return;
    }

    // Emergency offline page only (not the SPA shell).
    if (url.pathname === '/~offline') {
      event.respondWith(serveShellOrOffline(event.request, '/~offline'));
      event.stopImmediatePropagation();
      return;
    }

    // All other navigations: one stable default-locale shell; client reads real pathname.
    event.respondWith(serveShellOrOffline(event.request, DEFAULT_SHELL_PATH));
    event.stopImmediatePropagation();
  },
  { capture: true },
);

self.addEventListener('message', (event) => {
  if (event.data?.type === SKIP_WAITING) {
    self.skipWaiting();
  }
});

self.addEventListener('install', (event) => {
  console.warn('[sw] install event');
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

self.addEventListener('activate', (event) => {
  console.warn('[sw] activate event');
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

'use client';

/**
 * Wraps the app with SerwistProvider so the service worker is registered (swUrl).
 * In development we disable registration so no SW is installed and local changes are visible.
 * In production we optionally log when a SW is registered (for debugging).
 */
import { SerwistProvider } from '@serwist/turbopack/react';
import { useEffect } from 'react';
import { SERVICE_WORKER_SCRIPT_URL } from './service-worker-script-url';

export function ServiceWorkerProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .getRegistration(SERVICE_WORKER_SCRIPT_URL)
      .then((registration) => {
        if (registration) {
          console.warn(
            '[ServiceWorkerProvider] Service worker registered for scope:',
            registration.scope,
          );
        }
      })
      .catch((error) => {
        console.error('[ServiceWorkerProvider] Error getting service worker registration:', error);
      });
  }, []);

  return (
    <SerwistProvider
      swUrl={SERVICE_WORKER_SCRIPT_URL}
      disable={process.env.NODE_ENV === 'development'}
    >
      {children}
    </SerwistProvider>
  );
}

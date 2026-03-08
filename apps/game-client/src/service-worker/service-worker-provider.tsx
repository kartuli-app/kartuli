'use client';

/**
 * Wraps the app with SerwistProvider so the service worker is registered (swUrl).
 * In development we disable registration so no SW is installed and local changes are visible.
 */
import { SerwistProvider } from '@serwist/turbopack/react';
import { SERVICE_WORKER_SCRIPT_URL } from './service-worker-script-url';

export function ServiceWorkerProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SerwistProvider
      swUrl={SERVICE_WORKER_SCRIPT_URL}
      disable={process.env.NODE_ENV === 'development'}
    >
      {children}
    </SerwistProvider>
  );
}

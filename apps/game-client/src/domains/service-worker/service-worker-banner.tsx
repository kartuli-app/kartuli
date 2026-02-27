'use client';

/**
 * Banner that shows service worker status and actions:
 * - Dev: "A service worker is installed" + Unregister button (so local changes are visible)
 * - First install: "Ready to be played offline" (once ever; dismiss stores a flag so we don't show again)
 * - Update: "A new version is available" + "Go to next version" (sends SKIP_WAITING to waiting worker, then reloads)
 */
import { useCallback, useEffect, useState } from 'react';
import { getServiceWorkerContainer, reloadWindow } from '../utils/browser';
import {
  isSWToClientMessage,
  SKIP_WAITING,
  SW_READY_OFFLINE,
  SW_WAITING,
} from './service-worker-messages';
import { SERVICE_WORKER_SCRIPT_URL } from './service-worker-script-url';

/** localStorage key: we set this when the user dismisses "ready for offline" so we only show that message once. */
const STORAGE_KEY_READY_INFORMED = 'sw_ready_offline_informed';

type BannerMode = 'dev' | 'first-install' | 'update' | null;

function useServiceWorkerBannerState() {
  const [mode, setMode] = useState<BannerMode>(null);
  const [dismissed, setDismissed] = useState(false);

  /** True if we have already shown "ready for offline" and the user dismissed (one-time flag). */
  const isReadyInformed = useCallback(() => {
    if (typeof localStorage === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY_READY_INFORMED) === 'true';
  }, []);

  /** If there is an active registration and no waiting worker, show "ready for offline" once (unless already informed). */
  const showReadyIfNotInformed = useCallback(() => {
    const sw = getServiceWorkerContainer();
    if (!sw) return;
    sw.getRegistration(SERVICE_WORKER_SCRIPT_URL).then((registration) => {
      if (!registration || registration.waiting) return;
      if (!isReadyInformed()) setMode('first-install');
    });
  }, [isReadyInformed]);

  /** Decide banner mode from current SW state: no SW → null; dev + any registration → dev; waiting worker → update; else not informed → first-install. */
  const evaluate = useCallback(() => {
    const sw = getServiceWorkerContainer();
    if (!sw) {
      setMode(null);
      return;
    }

    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
      sw.getRegistrations().then((regs) => {
        setMode(regs.length > 0 ? 'dev' : null);
      });
      return;
    }

    sw.getRegistration(SERVICE_WORKER_SCRIPT_URL).then((registration) => {
      if (!registration) {
        setMode(null);
        return;
      }

      if (registration.waiting) {
        setMode('update');
        return;
      }

      if (!isReadyInformed()) {
        setMode('first-install');
        return;
      }

      setMode(null);
    });
  }, [isReadyInformed]);

  useEffect(() => {
    evaluate();
  }, [evaluate]);

  // Listen for SW→client messages (SW_WAITING, SW_READY_OFFLINE) and for updatefound; also run showReadyIfNotInformed when sw.ready resolves so we show "ready for offline" even if the message was missed.
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    const sw = getServiceWorkerContainer();
    if (!sw) return;

    const onMessage = (event: MessageEvent) => {
      if (!isSWToClientMessage(event.data)) return;
      if (event.data.type === SW_WAITING) setMode('update');
      if (event.data.type === SW_READY_OFFLINE && !isReadyInformed()) setMode('first-install');
    };
    sw.addEventListener('message', onMessage);

    sw.ready.then(() => showReadyIfNotInformed());

    function handleUpdateFound(
      registration: ServiceWorkerRegistration,
      container: NonNullable<ReturnType<typeof getServiceWorkerContainer>>,
    ) {
      const newWorker = registration.installing ?? registration.waiting;
      if (!newWorker) return;
      const checkState = () => {
        if (newWorker.state === 'installed' && container.controller) setMode('update');
      };
      newWorker.addEventListener('statechange', checkState);
      checkState();
    }

    let removeUpdateFound: (() => void) | null = null;
    sw.getRegistration(SERVICE_WORKER_SCRIPT_URL).then((registration) => {
      if (!registration) return;
      const onUpdateFound = () => handleUpdateFound(registration, sw);
      registration.addEventListener('updatefound', onUpdateFound);
      removeUpdateFound = () => registration.removeEventListener('updatefound', onUpdateFound);
    });

    return () => {
      sw.removeEventListener('message', onMessage);
      removeUpdateFound?.();
    };
  }, [isReadyInformed, showReadyIfNotInformed]);

  const dismiss = useCallback(() => {
    setDismissed(true);
    if (mode === 'first-install' && typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_READY_INFORMED, 'true');
    }
  }, [mode]);

  const unregister = useCallback(() => {
    const sw = getServiceWorkerContainer();
    if (!sw) return;
    sw.getRegistrations().then((regs) => {
      Promise.all(regs.map((reg) => reg.unregister())).then(() => {
        setMode(null);
        setDismissed(true);
        reloadWindow();
      });
    });
  }, []);

  /** Tell the waiting worker to skipWaiting(); when controllerchange fires we reload so the page runs under the new SW. */
  const reloadToUpdate = useCallback(() => {
    const sw = getServiceWorkerContainer();
    if (!sw) {
      reloadWindow();
      return;
    }
    sw.getRegistration(SERVICE_WORKER_SCRIPT_URL).then((registration) => {
      if (!registration?.waiting) {
        reloadWindow();
        return;
      }
      const once = () => {
        sw.removeEventListener('controllerchange', once);
        reloadWindow();
      };
      sw.addEventListener('controllerchange', once);
      registration.waiting.postMessage({ type: SKIP_WAITING });
    });
  }, []);

  return {
    mode,
    dismissed,
    dismiss,
    unregister,
    reloadToUpdate,
  };
}

export function ServiceWorkerBanner() {
  const { mode, dismissed, dismiss, unregister, reloadToUpdate } = useServiceWorkerBannerState();

  if (mode === null || dismissed) return null;

  return (
    <output
      data-testid="sw-banner"
      className="border-2 border-black bg-black text-white p-4 flex flex-wrap items-center gap-3"
      aria-live="polite"
    >
      <div className="flex-1 min-w-0">
        {mode === 'dev' && (
          <p className="font-bold text-xl">
            Development mode: a service worker is installed and may hide your local changes.
          </p>
        )}
        {mode === 'first-install' && (
          <p className="font-bold text-xl">The game is ready to be played offline.</p>
        )}
        {mode === 'update' && <p className="font-bold text-xl">A new version is available.</p>}
      </div>
      <div className="flex items-center gap-2">
        {mode === 'dev' && (
          <button
            type="button"
            onClick={unregister}
            className="px-3 py-1.5 border border-white rounded hover:bg-white hover:text-black"
          >
            Unregister
          </button>
        )}
        {mode === 'update' && (
          <button
            type="button"
            onClick={reloadToUpdate}
            className="px-3 py-1.5 border border-white rounded hover:bg-white hover:text-black"
          >
            Go to next version
          </button>
        )}
        <button
          type="button"
          onClick={dismiss}
          className="px-3 py-1.5 border border-white rounded hover:bg-white hover:text-black"
          aria-label="Dismiss"
        >
          Dismiss
        </button>
      </div>
    </output>
  );
}

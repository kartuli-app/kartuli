/**
 * Typed messages between the page (client) and the service worker.
 * Shared by the SW script and the banner so both sides use the same types and constants.
 *
 * - Client → SW: page sends SKIP_WAITING to tell the waiting worker to activate.
 * - SW → Client: worker sends SW_WAITING ("new version installed, waiting") or SW_READY_OFFLINE ("I'm active, precache done").
 */

// --- Client → Service worker (page sends to worker) ---

/** Sent by the banner when the user clicks "Go to next version"; the waiting SW calls skipWaiting(). */
export const SKIP_WAITING = 'SKIP_WAITING' as const;

export type ClientToSWMessage = {
  type: typeof SKIP_WAITING;
};

// --- Service worker → Client (worker sends to page) ---

/** Sent in install when we are the new waiting worker; page shows "A new version is available". */
export const SW_WAITING = 'SW_WAITING' as const;
/** Sent in activate when this worker is active and precache is done; page can show "Ready for offline". */
export const SW_READY_OFFLINE = 'SW_READY_OFFLINE' as const;

export type SWToClientMessage = { type: typeof SW_WAITING } | { type: typeof SW_READY_OFFLINE };

/** Type guard for event.data in the page's message listener; filters to our SW→client message shapes. */
export function isSWToClientMessage(data: unknown): data is SWToClientMessage {
  if (typeof data !== 'object' || data === null || !('type' in data)) return false;
  const type = (data as SWToClientMessage).type;
  return type === SW_WAITING || type === SW_READY_OFFLINE;
}

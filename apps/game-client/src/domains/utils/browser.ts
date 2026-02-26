/**
 * Type-safe browser globals for environments where DOM lib isn't guaranteed (avoids "window not found" / globalThis index signature issues).
 * Use these instead of `window` or `globalThis.history` / `globalThis.location` directly.
 */

export interface BrowserGlobal {
  location: { pathname: string };
  history: { pushState: (data: null, unused: string, url: string) => void; back(): void };
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
}

const globalCast = globalThis as unknown as {
  window?: { location: { pathname: string }; navigator?: Navigator };
  history?: { back(): void; pushState: (data: null, unused: string, url: string) => void };
  location?: { pathname: string };
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

/** Returns a typed browser-like global, or null if not in a browser environment. */
export function getBrowserGlobal(): BrowserGlobal | null {
  if (typeof globalThis === 'undefined') return null;
  const g = globalCast;
  if (
    g.location &&
    g.history &&
    typeof g.addEventListener === 'function' &&
    typeof g.removeEventListener === 'function'
  ) {
    return g as BrowserGlobal;
  }
  return null;
}

/** Returns current pathname from the URL (for router sync). Undefined if not in a browser-like environment. */
export function getLocationPathname(): string | undefined {
  return globalCast.window?.location?.pathname ?? globalCast.location?.pathname;
}

/** Calls history.back(). No-op if not in a browser-like environment. */
export function navigateBack(): void {
  globalCast.history?.back?.();
}

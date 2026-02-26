'use client';

import { createContext, type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

export interface RouterContextValue {
  path: string;
  navigate: (path: string) => void;
  /** False until we have synced path from URL (avoids flash of wrong page on direct load). */
  hasSyncedFromUrl: boolean;
}

export const RouterContext = createContext<RouterContextValue | null>(null);

interface RouterProviderProps {
  readonly initialPath: string;
  readonly children: ReactNode;
}

export function RouterProvider({ initialPath, children }: RouterProviderProps) {
  const [path, setPath] = useState(initialPath);
  const [hasSyncedFromUrl, setHasSyncedFromUrl] = useState(false);

  interface BrowserGlobal {
    location: { pathname: string };
    history: { pushState: (data: null, unused: string, url: string) => void };
    addEventListener: (type: string, listener: () => void) => void;
    removeEventListener: (type: string, listener: () => void) => void;
  }
  const win =
    typeof globalThis !== 'undefined' ? (globalThis as unknown as BrowserGlobal | null) : null;
  useEffect(() => {
    if (!win) return;
    const handlePopState = () => setPath(win.location.pathname);
    win.addEventListener('popstate', handlePopState);
    return () => win.removeEventListener('popstate', handlePopState);
  }, [win]);

  // Sync to real URL after mount so direct loads to /en/game/lesson-1 (e.g. from SW shell) show the correct page without hydration mismatch
  useEffect(() => {
    const g = globalThis as unknown as { window?: { location: { pathname: string } } };
    const fromUrl = g.window?.location.pathname;
    if (fromUrl?.startsWith('/en')) setPath(fromUrl);
    setHasSyncedFromUrl(true);
  }, []);

  const navigate = useCallback(
    (newPath: string) => {
      win?.history.pushState(null, '', newPath);
      setPath(newPath);
    },
    [win],
  );

  const value = useMemo(
    () => ({ path, navigate, hasSyncedFromUrl }),
    [path, navigate, hasSyncedFromUrl],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

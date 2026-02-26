'use client';

import { createContext, type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { getBrowserGlobal, getLocationPathname } from '../utils/browser';

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

  const win = getBrowserGlobal();
  useEffect(() => {
    if (!win) return;
    const handlePopState = () => setPath(win.location.pathname);
    win.addEventListener('popstate', handlePopState);
    return () => win.removeEventListener('popstate', handlePopState);
  }, [win]);

  // Sync to real URL after mount so direct loads to /en/game/lesson-1 (e.g. from SW shell) show the correct page without hydration mismatch
  useEffect(() => {
    const fromUrl = getLocationPathname();
    if (fromUrl) setPath(fromUrl);
    setHasSyncedFromUrl(true);
  }, []);

  const navigate = useCallback(
    (newPath: string) => {
      const nextPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
      if (nextPath === path) return;
      win?.history.pushState(null, '', nextPath);
      setPath(nextPath);
    },
    [win, path],
  );

  const value = useMemo(
    () => ({ path, navigate, hasSyncedFromUrl }),
    [path, navigate, hasSyncedFromUrl],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

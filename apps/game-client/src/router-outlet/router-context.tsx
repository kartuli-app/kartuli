'use client';

import { getPreferredLocaleFromStorage } from '@game-client/local-storage/get-preferred-locale-from-storage';
import { normalizeUnlocalizedPath } from '@game-client/routing/path-normalization';
import { getBrowserGlobal, getLocationPathname } from '@game-client/utils/browser';
import { createContext, type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

export interface RouterContextValue {
  path: string;
  navigate: (path: string) => void;
  replaceNavigate: (path: string) => void;
  /** True after pathname is synced from the URL and unlocalized paths are normalized. */
  isRouterReady: boolean;
}

export const RouterContext = createContext<RouterContextValue | null>(null);

interface RouterProviderProps {
  readonly initialPath: string;
  readonly children: ReactNode;
}

function applyNormalizedPath(
  win: NonNullable<ReturnType<typeof getBrowserGlobal>>,
  pathname: string,
  preferred: ReturnType<typeof getPreferredLocaleFromStorage>,
): string {
  const normalized = normalizeUnlocalizedPath(pathname, preferred);
  if (normalized !== pathname) {
    win.history.replaceState(null, '', normalized);
  }
  return normalized;
}

export function RouterProvider({ initialPath, children }: RouterProviderProps) {
  const [path, setPath] = useState(initialPath);
  const [isRouterReady, setIsRouterReady] = useState(false);

  const win = getBrowserGlobal();

  useEffect(() => {
    if (!win) return;
    const handlePopState = () => {
      const pathname = win.location.pathname;
      const preferred = getPreferredLocaleFromStorage();
      const next = applyNormalizedPath(win, pathname, preferred);
      setPath(next);
    };
    win.addEventListener('popstate', handlePopState);
    return () => win.removeEventListener('popstate', handlePopState);
  }, [win]);

  useEffect(() => {
    if (!win) {
      setIsRouterReady(true);
      return;
    }
    const fromUrl = getLocationPathname() ?? initialPath;
    const preferred = getPreferredLocaleFromStorage();
    const next = applyNormalizedPath(win, fromUrl, preferred);
    setPath(next);
    setIsRouterReady(true);
  }, [win, initialPath]);

  const navigate = useCallback(
    (newPath: string) => {
      const nextPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
      if (nextPath === path) return;
      win?.history.pushState(null, '', nextPath);
      setPath(nextPath);
    },
    [win, path],
  );

  const replaceNavigate = useCallback(
    (newPath: string) => {
      const nextPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
      if (nextPath === path) return;
      win?.history.replaceState(null, '', nextPath);
      setPath(nextPath);
    },
    [win, path],
  );

  const value = useMemo(
    () => ({ path, navigate, replaceNavigate, isRouterReady }),
    [path, navigate, replaceNavigate, isRouterReady],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

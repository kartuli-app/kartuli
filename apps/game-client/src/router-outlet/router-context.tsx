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

function toHistoryUrl(
  pathname: string,
  win: NonNullable<ReturnType<typeof getBrowserGlobal>>,
): string {
  const { search = '', hash = '' } = win.location;
  return `${pathname}${search}${hash}`;
}

/**
 * Unlocalized → `/${preferred}/…`; root `/` → `/${preferred}` so `isRouterReady` never leaves a transient `/` that would render router 404.
 * Preserves `location.search` and `location.hash` when calling `replaceState`.
 */
function resolveSyncedPathname(
  win: NonNullable<ReturnType<typeof getBrowserGlobal>>,
  pathname: string,
  preferred: ReturnType<typeof getPreferredLocaleFromStorage>,
): string {
  let next = normalizeUnlocalizedPath(pathname, preferred);
  if (next === '/') {
    next = `/${preferred}`;
    win.history.replaceState(null, '', toHistoryUrl(next, win));
    return next;
  }
  if (next !== pathname) {
    win.history.replaceState(null, '', toHistoryUrl(next, win));
  }
  return next;
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
      const next = resolveSyncedPathname(win, pathname, preferred);
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
    const next = resolveSyncedPathname(win, fromUrl, preferred);
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

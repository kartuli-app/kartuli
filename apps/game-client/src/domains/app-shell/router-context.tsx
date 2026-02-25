'use client';

import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react';

export interface RouterContextValue {
  path: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export function useRouterContext(): RouterContextValue {
  const value = useContext(RouterContext);
  if (!value) {
    throw new Error('useRouterContext must be used within RouterProvider');
  }
  return value;
}

interface RouterProviderProps {
  readonly initialPath: string;
  readonly children: ReactNode;
}

export function RouterProvider({ initialPath, children }: RouterProviderProps) {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const handlePopState = () => setPath(globalThis.location.pathname);
    globalThis.addEventListener('popstate', handlePopState);
    return () => globalThis.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((newPath: string) => {
    globalThis.history.pushState(null, '', newPath);
    setPath(newPath);
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

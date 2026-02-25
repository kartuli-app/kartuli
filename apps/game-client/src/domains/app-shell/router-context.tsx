'use client';

import { createContext, type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

export interface RouterContextValue {
  path: string;
  navigate: (path: string) => void;
}

export const RouterContext = createContext<RouterContextValue | null>(null);

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

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

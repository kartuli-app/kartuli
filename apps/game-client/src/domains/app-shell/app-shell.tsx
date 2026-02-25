'use client';

import { useEffect, useState } from 'react';
import { DebugPage } from '../debug/debug-page';
import { HomePage } from '../home/home-page';

function getView(path: string) {
  if (path === '/en/debug') return 'debug';
  if (path === '/en') return 'home';
  return null;
}

interface AppShellProps {
  readonly initialPath: string;
}

export function AppShell({ initialPath }: AppShellProps) {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const handlePopState = () => setPath(globalThis.location.pathname);
    globalThis.addEventListener('popstate', handlePopState);
    return () => globalThis.removeEventListener('popstate', handlePopState);
  }, []);

  const view = getView(path);

  if (view === 'home') {
    return <HomePage />;
  }
  if (view === 'debug') {
    return <DebugPage />;
  }
  return <HomePage />;
}

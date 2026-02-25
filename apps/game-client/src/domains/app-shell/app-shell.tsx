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
  initialPath: string;
}

export function AppShell({ initialPath }: AppShellProps) {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const view = getView(path);

  if (view === 'home') {
    return <HomePage />;
  }
  if (view === 'debug') {
    return <DebugPage />;
  }
  return null;
}

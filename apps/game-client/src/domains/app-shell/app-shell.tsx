'use client';

import { DebugPage } from '../debug/debug-page';
import { GamePage } from '../game/game-page';
import { HomePage } from '../home/home-page';
import { LearnPage } from '../learn/learn-page';
import { UserPage } from '../user/user-page';
import { parseRoute } from './route-utils';
import { RouterProvider } from './router-context';
import { useRouterContext } from './use-router-context';

interface AppShellProps {
  readonly initialPath: string;
}

function RouteLoading() {
  return <div className="flex grow" aria-busy="true" />;
}

function AppShellOutlet() {
  const { path, hasSyncedFromUrl } = useRouterContext();
  if (!hasSyncedFromUrl) return <RouteLoading />;

  const route = parseRoute(path);
  if (!route) return <HomePage />;

  switch (route.view) {
    case 'home':
      return <HomePage />;
    case 'learn':
      return <LearnPage lessonId={route.lessonId ?? ''} />;
    case 'game':
      return <GamePage lessonId={route.lessonId ?? ''} />;
    case 'user':
      return <UserPage />;
    case 'debug':
      return <DebugPage />;
    default:
      return <HomePage />;
  }
}

export function AppShell({ initialPath }: AppShellProps) {
  return (
    <RouterProvider initialPath={initialPath}>
      <AppShellOutlet />
    </RouterProvider>
  );
}

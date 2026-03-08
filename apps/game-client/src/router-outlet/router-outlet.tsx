'use client';

import { parseRoute } from '@game-client/router-outlet/route-utils';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import { DebugPage } from '@game-client/screens/debug/debug-page';
import { GamePage } from '@game-client/screens/game/game-page';
import { HomePage } from '@game-client/screens/home/home-page';
import { LearnPage } from '@game-client/screens/learn/learn-page';
import { UserPage } from '@game-client/screens/user/user-page';

function RouteLoading() {
  return <div className="flex grow" aria-busy="true" />;
}

export function RouterOutlet() {
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

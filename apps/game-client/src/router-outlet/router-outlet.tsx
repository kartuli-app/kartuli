'use client';

import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import { parseAppRoute } from '@game-client/routing/parse-app-route';
import { DebugPage } from '@game-client/screens/debug/debug-page';
import { GamePage } from '@game-client/screens/game/game-page';
import { HomePage } from '@game-client/screens/home/home-page';
import { LearnPage } from '@game-client/screens/learn/learn-page';
import { PageNotFound } from '@game-client/screens/page-not-found/page-not-found';
import { UserPage } from '@game-client/screens/user/user-page';

function RouteLoading() {
  return <div className="flex grow" aria-busy="true" />;
}

export function RouterOutlet() {
  const { path, isRouterReady } = useRouterContext();
  if (!isRouterReady) return <RouteLoading />;

  const route = parseAppRoute(path);
  if (!route) return <PageNotFound attemptedPath={path} />;

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
  }
}

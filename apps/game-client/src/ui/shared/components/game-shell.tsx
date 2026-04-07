import { GameAppBar } from '@game-client/ui/shared/components/game-app-bar';
import { AppContent } from '@kartuli/ui/components/layout/app-content';
import { AppScreen } from '@kartuli/ui/components/layout/app-screen';
import { GameAppDock } from './game-app-dock';

export function GameShell({
  children,
}: Readonly<{
  readonly children: React.ReactNode;
}>) {
  return (
    <AppScreen>
      <GameAppBar />
      <AppContent>{children}</AppContent>
      <GameAppDock />
    </AppScreen>
  );
}

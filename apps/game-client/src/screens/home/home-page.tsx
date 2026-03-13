import { AppBar } from '@kartuli/ui/components/layout/app-bar';
import { AppContent } from '@kartuli/ui/components/layout/app-content';
import { AppScreen } from '@kartuli/ui/components/layout/app-screen';
import { HomeBarContent } from './home-bar-content';
import { HomeHeading } from './home-heading';
import { ModulesList } from './modules-list';

export function HomePage() {
  return (
    <AppScreen testId="game-home">
      <AppBar isSticky>
        <HomeBarContent />
      </AppBar>

      <AppContent>
        <HomeHeading />
        <ModulesList />
      </AppContent>
    </AppScreen>
  );
}

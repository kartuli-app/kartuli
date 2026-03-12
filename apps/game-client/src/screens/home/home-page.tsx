import { AppBar } from '@kartuli/ui/components/layout/app-bar';
import { AppContent } from './app-content';
import { HomeBarContent } from './home-bar-content';
import { HomeHeading } from './home-heading';
import { ModulesList } from './modules-list';
import { PageWrapper } from './page-wrapper';

export function HomePage() {
  return (
    <PageWrapper testId="game-home">
      <AppBar isSticky>
        <HomeBarContent />
      </AppBar>

      <AppContent>
        <HomeHeading />
        <ModulesList />
      </AppContent>
    </PageWrapper>
  );
}

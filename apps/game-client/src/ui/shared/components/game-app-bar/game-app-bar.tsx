import { Mascot } from '@game-client/ui/shared/components/game-app-bar/mascot';
import { OfflineIndicator } from '@game-client/ui/shared/components/game-app-bar/offline-indicator';
import { AppBar } from '@kartuli/ui/components/layout/app-bar';
import { AnimatedBackButton } from './animated-back-button';
import { LanguageSelector } from './language-selector';
import { Title } from './title';

export function GameAppBar() {
  return (
    <AppBar isSticky>
      <div className="flex items-center gap-ds1-spacing-regular grow">
        <div className="flex gap-0">
          <AnimatedBackButton />
          <Mascot />
        </div>
        <OfflineIndicator />
        <Title />
      </div>
      {/* right area */}
      <div className="flex gap-ds1-spacing-regular shrink-0">
        <LanguageSelector />
      </div>
    </AppBar>
  );
}

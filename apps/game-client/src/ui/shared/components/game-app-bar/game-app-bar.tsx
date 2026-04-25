import { Mascot } from '@game-client/ui/shared/components/game-app-bar/mascot';
import { OfflineIndicator } from '@game-client/ui/shared/components/game-app-bar/offline-indicator';
import { SoundToggle } from '@game-client/ui/shared/components/game-app-bar/sound-toggle';
import { AppBar } from '@kartuli/ui/components/layout/app-bar';
import { AnimatedBackButton } from './animated-back-button';
import { LanguageSelector } from './language-selector';
import { Title } from './title';

export function GameAppBar() {
  return (
    <AppBar isSticky>
      <div className="flex items-center gap-brand-regular grow">
        <div className="flex gap-0">
          <AnimatedBackButton />
          <Mascot />
        </div>
        <OfflineIndicator />
        <Title />
      </div>
      {/* right area */}
      <div className="flex gap-brand-regular shrink-0">
        <SoundToggle />
        <LanguageSelector />
      </div>
    </AppBar>
  );
}

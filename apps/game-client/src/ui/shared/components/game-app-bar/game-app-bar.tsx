import { Mascot } from '@game-client/ui/shared/components/game-app-bar/mascot';
import { OfflineIndicator } from '@game-client/ui/shared/components/game-app-bar/offline-indicator';
import { SoundToggle } from '@game-client/ui/shared/components/game-app-bar/sound-toggle';
import { AppBar } from '@kartuli/ui/components/layout/app-bar';
import clsx from 'clsx';
import { AnimatedBackButton } from './animated-back-button';
import { LanguageSelector } from './language-selector';
import { Title } from './title';

export function GameAppBar() {
  return (
    <AppBar isSticky>
      <div className={clsx('flex items-center gap-brand-small')}>
        <AnimatedBackButton />
        <Mascot />
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

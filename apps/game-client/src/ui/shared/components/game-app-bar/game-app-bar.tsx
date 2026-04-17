import { Mascot } from '@game-client/ui/shared/components/game-app-bar/mascot';
import { OfflineIndicator } from '@game-client/ui/shared/components/game-app-bar/offline-indicator';
import { SoundToggle } from '@game-client/ui/shared/components/game-app-bar/sound-toggle';
import { AppBar } from '@kartuli/ui/components/layout/app-bar';
import { cn } from '@kartuli/ui/utils/cn';
import { AnimatedBackButton } from './animated-back-button';
import { LanguageSelector } from './language-selector';
import { SearchButton } from './search-button';
import { Title } from './title';

export function GameAppBar() {
  return (
    <AppBar isSticky>
      <div className={cn('flex items-center gap-brand-regular grow')}>
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
        <SearchButton />
      </div>
    </AppBar>
  );
}

import { GameAppBarIconLink } from '@game-client/ui/components/layout/app-bar-icon-action';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { ExploreAlphabetScreen } from './explore-alphabet-screen';

export function ExploreAlphabetPage() {
  return (
    <AppShell
      appBar={
        <GameClientAppBar
          title="Alphabet"
          eyeBrow="kartuli.app"
          action={
            <GameAppBarIconLink href="/explore/search" label="Search" icon={PiMagnifyingGlass} />
          }
        />
      }
      startRailContent={<GameClientDock activeItemId="learn" />}
      endRailContent={<RailPatternAlphabet />}
    >
      <ExploreAlphabetScreen />
    </AppShell>
  );
}

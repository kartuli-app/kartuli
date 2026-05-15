import { GameAppBarIconLink } from '@game-client/ui/components/layout/app-bar-icon-action';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { AlphabetLessonsList } from './alphabet-lessons-list';
import { ContextAwareGreeting } from './context-aware-greeting';

function ExploreAlphabetScreen() {
  return (
    <div className="flex flex-col gap-8">
      {/* screen support copy */}
      <ContextAwareGreeting />
      <AlphabetLessonsList />
    </div>
  );
}

function ExploreAlphabetPage() {
  return (
    <AppShell
      appBar={
        <GameClientAppBar
          title="Learn: Alphabet"
          context="kartuli.app"
          action={
            <GameAppBarIconLink href="/explore/search" label="Search" icon={PiMagnifyingGlass} />
          }
        />
      }
      startRail={<GameClientDock activeItemId="learn" />}
      endRail={<RailPatternAlphabet />}
    >
      <ExploreAlphabetScreen />
    </AppShell>
  );
}

export default ExploreAlphabetPage;

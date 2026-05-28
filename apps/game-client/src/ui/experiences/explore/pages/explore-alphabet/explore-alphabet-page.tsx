import { getMessagesForLocale, type SupportedLocale } from '@game-client/i18n';
import { GameClientAppBar } from '@game-client/ui/components/layout/app-bar/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/dock/game-client-dock';
import { AppShell } from '@game-client/ui/components/layout/shell/app-shell';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/shell/rail-pattern-alphabet';
import { ExploreAlphabetScreen } from './explore-alphabet-screen';

export function ExploreAlphabetPage({ locale }: Readonly<{ locale: SupportedLocale }>) {
  const commonMessages = getMessagesForLocale(locale, 'common');
  const alphabetMessages = getMessagesForLocale(locale, 'alphabet');

  return (
    <AppShell
      appBar={
        <GameClientAppBar title={alphabetMessages.title} eyeBrow={commonMessages.appBar.brand} />
      }
      startRailContent={<GameClientDock activeItemId="learn" />}
      endRailContent={<RailPatternAlphabet />}
    >
      <ExploreAlphabetScreen locale={locale} />
    </AppShell>
  );
}

import { getMessagesForLocale, type SupportedLocale } from '@game-client/i18n';
import { getLibraryServer } from '@game-client/learning-content';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { TranslitClient } from './translit-client';

export async function TranslitPageServer({ locale }: Readonly<{ locale: SupportedLocale }>) {
  const commonMessages = getMessagesForLocale(locale, 'common');
  const library = await getLibraryServer(locale);
  return (
    <AppShell
      appBar={
        <GameClientAppBar
          title={commonMessages.dock.translit}
          eyeBrow={commonMessages.appBar.brand}
          backHref={`/${locale}/explore/alphabet`}
        />
      }
      startRailContent={<GameClientDock activeItemId="translit" />}
      endRailContent={<RailPatternAlphabet />}
    >
      <TranslitClient library={library} />
    </AppShell>
  );
}

import { getMessagesForLocale, type SupportedLocale } from '@game-client/i18n';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { SettingsClient } from './settings-client';

export function SettingsPageServer({ locale }: Readonly<{ locale: SupportedLocale }>) {
  const commonMessages = getMessagesForLocale(locale, 'common');

  return (
    <AppShell
      appBar={
        <GameClientAppBar
          title={commonMessages.dock.settings}
          eyeBrow={commonMessages.appBar.brand}
          backHref={`/${locale}/explore/alphabet`}
        />
      }
      startRailContent={<GameClientDock activeItemId="settings" />}
      endRailContent={<RailPatternAlphabet />}
    >
      <SettingsClient />
    </AppShell>
  );
}

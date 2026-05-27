import {
  getLocalizedRouteParams,
  getMessagesForLocale,
  type RouteParamsWithLocalePromise,
} from '@game-client/i18n';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { SettingsClient } from '@game-client/ui/experiences/settings/components/settings-client';

export async function SettingsPage({
  params,
}: Readonly<{
  params: RouteParamsWithLocalePromise;
}>) {
  const { locale } = await getLocalizedRouteParams(params);
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

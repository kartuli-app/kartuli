import { type SupportedLocale, supportedLocales } from '@game-client/i18n';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { SettingsClient } from './settings-client';

export async function SettingsPageServer({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const initialLocale = supportedLocales.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : supportedLocales[0];

  return (
    <AppShell
      appBar={
        <GameClientAppBar title="Settings" context="kartuli.app" backHref="/en/explore/alphabet" />
      }
      startRailContent={<GameClientDock activeItemId="settings" />}
      endRailContent={<RailPatternAlphabet />}
    >
      <SettingsClient initialLocale={initialLocale} />
    </AppShell>
  );
}

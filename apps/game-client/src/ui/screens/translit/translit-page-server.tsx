import { getLibraryServer } from '@game-client/learning-content';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { TranslitClient } from './translit-client';

export async function TranslitPageServer({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const library = await getLibraryServer(locale);
  return (
    <AppShell
      appBar={
        <GameClientAppBar title="Translit" eyeBrow="kartuli.app" backHref="/en/explore/alphabet" />
      }
      startRailContent={<GameClientDock activeItemId="translit" />}
      endRailContent={<RailPatternAlphabet />}
    >
      <TranslitClient library={library} />
    </AppShell>
  );
}

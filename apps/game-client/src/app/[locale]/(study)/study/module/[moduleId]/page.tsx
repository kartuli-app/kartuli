import { getLibraryServer } from '@game-client/learning-content/library/get-library-server';
import type { LetterItem } from '@game-client/learning-content/library/library';
import { GameAppBarIconLink } from '@game-client/ui/components/layout/app-bar-icon-action';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { notFound } from 'next/navigation';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { StudyScreen } from '../../../study-screen';

export default async function ModuleStudyPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string; moduleId: string }>;
}>) {
  const { locale, moduleId } = await params;
  const library = await getLibraryServer(locale);
  const module = library.modulesById.get(moduleId);
  if (!module) notFound();

  const seenIds = new Set<string>();
  const items = module.lessonIds
    .flatMap((lessonId) => {
      const lesson = library.lessonsById.get(lessonId);
      return lesson?.itemIds ?? [];
    })
    .map((id) => library.letterItemsById.get(id))
    .filter((item): item is LetterItem => item !== undefined)
    .filter((item) => {
      if (seenIds.has(item.id)) return false;
      seenIds.add(item.id);
      return true;
    });

  return (
    <AppShell
      appBar={
        <GameClientAppBar
          title={module.title}
          context="Study Alphabet"
          backHref={`/${locale}/explore/alphabet`}
          action={
            <GameAppBarIconLink href="/explore/search" label="Search" icon={PiMagnifyingGlass} />
          }
        />
      }
      startRailContent={<GameClientDock />}
      endRailContent={<RailPatternAlphabet />}
    >
      <StudyScreen items={items} />
    </AppShell>
  );
}

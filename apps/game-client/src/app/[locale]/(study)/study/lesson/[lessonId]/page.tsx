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

export default async function LessonStudyPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string; lessonId: string }>;
}>) {
  const { locale, lessonId } = await params;
  const library = await getLibraryServer(locale);
  const lesson = library.lessonsById.get(lessonId);
  if (!lesson) notFound();

  const items = lesson.itemIds
    .map((id) => library.letterItemsById.get(id))
    .filter((item): item is LetterItem => item !== undefined);

  return (
    <AppShell
      appBar={
        <GameClientAppBar
          title={lesson.title}
          eyeBrow="Alphabet"
          backHref={`/${locale}/explore/alphabet`}
          trailing={
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

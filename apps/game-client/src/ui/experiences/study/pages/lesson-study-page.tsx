import {
  getLocalizedRouteParams,
  getMessagesForLocale,
  type RouteParamsWithLocalePromise,
} from '@game-client/i18n';
import { getLibraryServer } from '@game-client/learning-content/library/get-library-server';
import type { LetterItem } from '@game-client/learning-content/library/library';
import { AppShell } from '@game-client/ui/components/layout/app-shell';
import { GameClientAppBar } from '@game-client/ui/components/layout/game-client-app-bar';
import { GameClientDock } from '@game-client/ui/components/layout/game-client-dock';
import { RailPatternAlphabet } from '@game-client/ui/components/layout/rail-pattern-alphabet';
import { StudyScreen } from '@game-client/ui/experiences/study/components/study-screen';
import { notFound } from 'next/navigation';

export async function LessonStudyPage({
  params,
}: Readonly<{
  params: RouteParamsWithLocalePromise<{ lessonId: string }>;
}>) {
  const { locale, lessonId } = await getLocalizedRouteParams(params);
  const alphabetMessages = getMessagesForLocale(locale, 'alphabet');
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
          eyeBrow={alphabetMessages.title}
          backHref={`/${locale}/explore/alphabet`}
        />
      }
      startRailContent={<GameClientDock />}
      endRailContent={<RailPatternAlphabet />}
    >
      <StudyScreen items={items} />
    </AppShell>
  );
}

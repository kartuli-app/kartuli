import {
  generateMetadataForSupportedLocale,
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
import { notFound } from 'next/navigation';
import { StudyScreen } from '../../../study-screen';

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: RouteParamsWithLocalePromise<{ moduleId: string }>;
}>) {
  const { locale, moduleId } = await getLocalizedRouteParams(params);
  const alphabetMessages = getMessagesForLocale(locale, 'alphabet');
  const library = await getLibraryServer(locale);
  const module = library.modulesById.get(moduleId);

  return generateMetadataForSupportedLocale(locale, {
    pathSegments: [locale, 'study', 'module', moduleId],
    pageTitle: module?.title ?? alphabetMessages.title,
  });
}

export default async function ModuleStudyPage({
  params,
}: Readonly<{
  params: RouteParamsWithLocalePromise<{ moduleId: string }>;
}>) {
  const { locale, moduleId } = await getLocalizedRouteParams(params);
  const alphabetMessages = getMessagesForLocale(locale, 'alphabet');
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

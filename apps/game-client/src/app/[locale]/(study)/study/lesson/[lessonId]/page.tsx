import {
  generateMetadataForSupportedLocale,
  getLocalizedRouteParams,
  getMessagesForLocale,
  type RouteParamsWithLocalePromise,
} from '@game-client/i18n';
import { getLibraryServer } from '@game-client/learning-content/library/get-library-server';

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: RouteParamsWithLocalePromise<{ lessonId: string }>;
}>) {
  const { locale, lessonId } = await getLocalizedRouteParams(params);
  const alphabetMessages = getMessagesForLocale(locale, 'alphabet');
  const library = await getLibraryServer(locale);
  const lesson = library.lessonsById.get(lessonId);

  return generateMetadataForSupportedLocale(locale, {
    pathSegments: [locale, 'study', 'lesson', lessonId],
    pageTitle: lesson?.title ?? alphabetMessages.title,
  });
}

export { LessonStudyPage as default } from '@game-client/ui/experiences/study/pages/lesson-study-page';

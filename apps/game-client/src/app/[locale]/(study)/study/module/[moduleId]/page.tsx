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

export { ModuleStudyPage as default } from '@game-client/ui/experiences/study/pages/module-study-page';

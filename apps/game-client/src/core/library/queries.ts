import type { LibraryContentRepository } from './repository';
import { getDefaultRepository } from './repository';
import type {
  AppLocale,
  HomeLessonCardView,
  HomeLessonPreviewItem,
  HomeModuleView,
  LibraryItemRecord,
} from './types';

function projectItemToPreview(item: LibraryItemRecord): HomeLessonPreviewItem | null {
  switch (item.type) {
    case 'letter':
      return { id: item.id, type: 'letter', text: item.targetScript };
    case 'word':
      return { id: item.id, type: 'word', imageUrl: item.imageUrl, alt: '' };
    case 'rule':
      return { id: item.id, type: 'rule', label: '' };
    default:
      return null;
  }
}

export async function getHomeModulesView(
  repository: LibraryContentRepository,
  locale: AppLocale,
): Promise<HomeModuleView[]> {
  const [modules, localePack] = await Promise.all([
    repository.getAllModules(),
    repository.getLocalePack(locale),
  ]);

  const result: HomeModuleView[] = [];

  for (const module of modules) {
    const lessons = await repository.getLessonsByIds(module.lessonIds);
    const lessonViews: HomeLessonCardView[] = [];

    for (const lesson of lessons) {
      const items = await repository.getItemsByIds(lesson.itemIds);
      const previewItems = items
        .map(projectItemToPreview)
        .filter((p: HomeLessonPreviewItem | null): p is HomeLessonPreviewItem => p !== null);

      const lessonText = localePack.lessons[lesson.id];
      lessonViews.push({
        id: lesson.id,
        title: lessonText?.title ?? lesson.id,
        previewItems,
      });
    }

    const moduleText = localePack.modules[module.id];
    result.push({
      id: module.id,
      title: moduleText?.title ?? module.id,
      lessons: lessonViews,
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return result;
}

/** Test/E2E helper: first lesson id and English title. Resolves asynchronously. */
export async function getFirstLessonFixtureEn(): Promise<{
  firstLessonId: string;
  firstLessonTitleEn: string;
}> {
  const repo = getDefaultRepository();
  const view = await getHomeModulesView(repo, 'en');
  const firstLesson = view[0]?.lessons[0];
  if (!firstLesson) {
    throw new Error('Library has no modules or lessons');
  }
  return {
    firstLessonId: firstLesson.id,
    firstLessonTitleEn: firstLesson.title,
  };
}

import type { LibraryContentRepository } from './repository';
import type {
  AppLocale,
  HomeLessonCardView,
  HomeLessonPreviewItem,
  HomeModuleView,
  LessonRecord,
  LibraryItemRecord,
  LibraryLocalePack,
  ModuleRecord,
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

function isItemAvailableInLocale(item: LibraryItemRecord, localePack: LibraryLocalePack): boolean {
  const localized = localePack.items[item.id];
  if (!localized) return false;

  switch (item.type) {
    case 'letter':
      return (
        typeof (localized as { nativeName?: string }).nativeName === 'string' &&
        (localized as { nativeName: string }).nativeName.trim() !== '' &&
        typeof (localized as { pronunciationHint?: string }).pronunciationHint === 'string' &&
        (localized as { pronunciationHint: string }).pronunciationHint.trim() !== ''
      );
    case 'word':
      return (
        typeof (localized as { label?: string }).label === 'string' &&
        (localized as { label: string }).label.trim() !== ''
      );
    case 'rule':
      return (
        typeof (localized as { title?: string }).title === 'string' &&
        (localized as { title: string }).title.trim() !== ''
      );
    default:
      return false;
  }
}

function isLessonAvailableInLocale(
  lesson: LessonRecord,
  items: LibraryItemRecord[],
  localePack: LibraryLocalePack,
): boolean {
  const lessonText = localePack.lessons[lesson.id];
  if (!lessonText || typeof lessonText.title !== 'string' || lessonText.title.trim() === '') {
    return false;
  }

  if (items.length !== lesson.itemIds.length) {
    return false;
  }

  for (const item of items) {
    if (!isItemAvailableInLocale(item, localePack)) {
      return false;
    }
  }

  return true;
}

function isModuleAvailableInLocale(module: ModuleRecord, localePack: LibraryLocalePack): boolean {
  const moduleText = localePack.modules[module.id];
  return !!moduleText && typeof moduleText.title === 'string' && moduleText.title.trim() !== '';
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
      if (!isLessonAvailableInLocale(lesson, items, localePack)) {
        continue;
      }

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

    if (!isModuleAvailableInLocale(module, localePack) || lessonViews.length === 0) {
      continue;
    }

    const moduleText = localePack.modules[module.id];
    result.push({
      id: module.id,
      title: moduleText?.title ?? module.id,
      lessons: lessonViews,
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  return result;
}

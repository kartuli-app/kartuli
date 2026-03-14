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
      return {
        id: item.id,
        type: 'letter',
        text: item.targetScript,
        transliteration: item.transliteration,
      };
    case 'word':
      return { id: item.id, type: 'word', imageUrl: item.imageUrl, alt: '' };
    case 'rule':
      return { id: item.id, type: 'rule', label: '' };
    default:
      return null;
  }
}

/** Returns true if the item has locale text in the pack. Uses only localePack (no repository I/O). */
function isItemIdAvailableInLocale(itemId: string, localePack: LibraryLocalePack): boolean {
  const localized = localePack.items[itemId];
  if (!localized) return false;

  if (
    'nativeName' in localized &&
    'pronunciationHint' in localized &&
    typeof localized.nativeName === 'string' &&
    localized.nativeName.trim() !== '' &&
    typeof localized.pronunciationHint === 'string' &&
    localized.pronunciationHint.trim() !== ''
  ) {
    return true;
  }
  if (
    'label' in localized &&
    typeof localized.label === 'string' &&
    localized.label.trim() !== ''
  ) {
    return true;
  }
  if (
    'title' in localized &&
    typeof localized.title === 'string' &&
    localized.title.trim() !== ''
  ) {
    return true;
  }
  return false;
}

/** Checks lesson availability using only localePack (no repository getItemsByIds). */
function isLessonAvailableInLocaleWithoutFetch(
  lesson: LessonRecord,
  localePack: LibraryLocalePack,
): boolean {
  const lessonText = localePack.lessons[lesson.id];
  if (!lessonText || typeof lessonText.title !== 'string' || lessonText.title.trim() === '') {
    return false;
  }
  for (const itemId of lesson.itemIds) {
    if (!isItemIdAvailableInLocale(itemId, localePack)) {
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
      if (!isLessonAvailableInLocaleWithoutFetch(lesson, localePack)) {
        continue;
      }
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

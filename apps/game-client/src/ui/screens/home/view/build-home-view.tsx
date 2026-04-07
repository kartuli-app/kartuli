import type { Lesson, Library, Module, WordItem } from '@game-client/learning-content/';
import { logger } from '@game-client/logging/dev-logger';
import type { HomeItem, HomeLesson, HomeModule, HomeView } from './home-view';

function toHomeItem(item: Library['letterItems'][number] | WordItem): HomeItem {
  if (item.type === 'letter') {
    return {
      id: item.id,
      targetScript: item.targetScript,
      transliteration: item.transliteration,
      type: item.type,
    };
  }

  return {
    id: item.id,
    targetScript: item.targetScript,
    transliteration: item.transliteration,
    translation: item.translation,
    type: item.type,
  };
}

function getLessonItems(lesson: Lesson, library: Library): HomeItem[] {
  return lesson.itemIds.reduce((acc, itemId) => {
    const item = library.letterItemsById.get(itemId) ?? library.wordItemsById.get(itemId);
    if (!item) {
      logger.log('library', 'lesson item id not found in library', {
        lessonId: lesson.id,
        itemId,
      });
      return acc;
    }
    acc.push(toHomeItem(item));
    return acc;
  }, [] as HomeItem[]);
}

function buildLesson(lessonId: string, library: Library): HomeLesson | null {
  const lesson = library.lessonsById.get(lessonId);
  if (!lesson) {
    logger.log('library', 'lesson id not found in library', lessonId);
    return null;
  }

  const items = getLessonItems(lesson, library);
  if (items.length === 0) {
    logger.log('library', 'lesson has no resolvable items for home page', lesson.id);
    return null;
  }

  return {
    id: lesson.id,
    title: lesson.title,
    items,
  };
}

function buildModule(module: Module, library: Library): HomeModule | null {
  const lessons = module.lessonIds.reduce((acc, lessonId) => {
    const lesson = buildLesson(lessonId, library);
    if (!lesson) return acc;
    acc.push(lesson);
    return acc;
  }, [] as HomeLesson[]);

  if (lessons.length === 0) {
    logger.log('library', 'module has no resolvable lessons for home page', module.id);
    return null;
  }

  return {
    id: module.id,
    title: module.title,
    lessons,
  };
}

export async function buildHomeView(library: Library): Promise<HomeView> {
  const modules = library.modules.reduce((acc, module) => {
    const homeModule = buildModule(module, library);
    if (!homeModule) return acc;
    acc.push(homeModule);
    return acc;
  }, [] as HomeModule[]);

  return { modules };
}

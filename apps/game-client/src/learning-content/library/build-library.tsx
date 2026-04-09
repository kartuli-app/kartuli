import type {
  CommonData,
  CommonLesson,
  CommonLetterItem,
  CommonModule,
  CommonWordItem,
} from '@game-client/learning-content/ingestion/common-data/common-data';
import type {
  LocalizedData,
  LocalizedLesson,
  LocalizedLetterItem,
  LocalizedModule,
  LocalizedWordItem,
} from '@game-client/learning-content/ingestion/localized-data/localized-data';
import { logger } from '@game-client/logging/dev-logger';
import type { Lesson, LetterItem, Library, Module, WordItem } from './library';

const getWordTransliterationFromCommonLettersByTargetScript = (
  commonLetterItemsByTargetScript: Map<string, CommonLetterItem>,
  word: CommonWordItem,
): string => {
  const characters = word.targetScript.split('');
  let transliteration = '';
  for (const character of characters) {
    const letter = commonLetterItemsByTargetScript.get(character);
    transliteration = `${transliteration}${letter?.transliteration || character}`;
  }
  return transliteration;
};

const indexById = <T extends { id: string }>(items: T[]): Map<string, T> =>
  new Map<string, T>(items.map((item) => [item.id, item]));

const buildLetterItems = (
  commonLetterItems: CommonLetterItem[],
  localizedLetterItemsById: Map<string, LocalizedLetterItem>,
): {
  letterItems: LetterItem[];
  letterItemsById: Map<string, LetterItem>;
  commonLetterItemsByTargetScript: Map<string, CommonLetterItem>;
} => {
  const commonLetterItemsByTargetScript = new Map<string, CommonLetterItem>();
  const letterItemsById = new Map<string, LetterItem>();
  const letterItems: LetterItem[] = [];

  for (const commonLetterItem of commonLetterItems) {
    commonLetterItemsByTargetScript.set(commonLetterItem.targetScript, commonLetterItem);

    const localizedLetterItem = localizedLetterItemsById.get(commonLetterItem.id);
    if (!localizedLetterItem) {
      logger.log('library', 'letter item not found in localized data', commonLetterItem.id);
      continue;
    }

    const letterItem: LetterItem = {
      id: commonLetterItem.id,
      targetScript: commonLetterItem.targetScript,
      transliteration: commonLetterItem.transliteration,
      pronunciationHint: localizedLetterItem.pronunciationHint,
      soundCategory: commonLetterItem.soundCategory,
      type: 'letter',
      commonSource: commonLetterItem.source,
      localizedSource: localizedLetterItem.source,
    };
    letterItemsById.set(commonLetterItem.id, letterItem);
    letterItems.push(letterItem);
  }

  return {
    letterItems,
    letterItemsById,
    commonLetterItemsByTargetScript,
  };
};

const buildWordItems = (
  commonWordItems: CommonWordItem[],
  localizedWordItemsById: Map<string, LocalizedWordItem>,
  commonLetterItemsByTargetScript: Map<string, CommonLetterItem>,
): {
  wordItems: WordItem[];
  wordItemsById: Map<string, WordItem>;
} => {
  const wordItemsById = new Map<string, WordItem>();
  const wordItems: WordItem[] = [];

  for (const commonWordItem of commonWordItems) {
    const localizedWordItem = localizedWordItemsById.get(commonWordItem.id);
    if (!localizedWordItem) {
      logger.log('library', 'word item not found in localized data', commonWordItem.id);
      continue;
    }

    const wordItem: WordItem = {
      id: commonWordItem.id,
      targetScript: commonWordItem.targetScript,
      transliteration: getWordTransliterationFromCommonLettersByTargetScript(
        commonLetterItemsByTargetScript,
        commonWordItem,
      ),
      translation: localizedWordItem.translation,
      type: 'word',
      commonSource: commonWordItem.source,
      localizedSource: localizedWordItem.source,
    };
    wordItemsById.set(commonWordItem.id, wordItem);
    wordItems.push(wordItem);
  }

  return {
    wordItems,
    wordItemsById,
  };
};

const buildLessons = (
  commonLessons: CommonLesson[],
  localizedLessonsById: Map<string, LocalizedLesson>,
  itemsById: Map<string, LetterItem | WordItem>,
): {
  lessons: Lesson[];
  lessonsById: Map<string, Lesson>;
} => {
  const lessonsById = new Map<string, Lesson>();
  const lessons: Lesson[] = [];

  for (const commonLesson of commonLessons) {
    const localizedLesson = localizedLessonsById.get(commonLesson.id);
    if (!localizedLesson) {
      logger.log('library', 'lesson not found in localized data', commonLesson.id);
      continue;
    }

    const lessonItemIds = commonLesson.itemIds.filter((itemId) => itemsById.has(itemId));
    if (lessonItemIds.length === 0) {
      logger.log('library', 'lesson has no items', commonLesson.id);
      continue;
    }

    const lesson: Lesson = {
      id: commonLesson.id,
      title: localizedLesson.title,
      commonSource: commonLesson.source,
      localizedSource: localizedLesson.source,
      itemIds: lessonItemIds,
    };
    lessonsById.set(commonLesson.id, lesson);
    lessons.push(lesson);
  }

  return {
    lessons,
    lessonsById,
  };
};

const buildModules = (
  commonModules: CommonModule[],
  localizedModulesById: Map<string, LocalizedModule>,
  lessonsById: Map<string, Lesson>,
): {
  modules: Module[];
  modulesById: Map<string, Module>;
} => {
  const modulesById = new Map<string, Module>();
  const modules: Module[] = [];

  for (const commonModule of commonModules) {
    const localizedModule = localizedModulesById.get(commonModule.id);
    if (!localizedModule) {
      logger.log('library', 'module not found in localized data', commonModule.id);
      continue;
    }

    const moduleLessonIds = commonModule.lessonIds.filter((lessonId) => lessonsById.has(lessonId));
    if (moduleLessonIds.length === 0) {
      logger.log('library', 'module has no lessons', commonModule.id);
      continue;
    }

    const module: Module = {
      id: commonModule.id,
      title: localizedModule.title,
      commonSource: commonModule.source,
      localizedSource: localizedModule.source,
      lessonIds: moduleLessonIds,
    };
    modulesById.set(commonModule.id, module);
    modules.push(module);
  }

  return {
    modules,
    modulesById,
  };
};

export const buildLibrary = (commonData: CommonData, localizedData: LocalizedData): Library => {
  // counts of all common items (if students know an item, they know it, doesnt matter if is available in the current locale)
  const totalLettersCount = commonData.commonLetterItems.length;
  const totalWordsCount = commonData.commonWordItems.length;

  const localizedLetterItemsById = indexById(localizedData.localizedLetterItems);
  const localizedWordItemsById = indexById(localizedData.localizedWordItems);
  const localizedLessonsById = indexById(localizedData.localizedLessons);
  const localizedModulesById = indexById(localizedData.localizedModules);

  const { letterItems, letterItemsById, commonLetterItemsByTargetScript } = buildLetterItems(
    commonData.commonLetterItems,
    localizedLetterItemsById,
  );
  const { wordItems, wordItemsById } = buildWordItems(
    commonData.commonWordItems,
    localizedWordItemsById,
    commonLetterItemsByTargetScript,
  );
  const itemsById = new Map<string, LetterItem | WordItem>([...letterItemsById, ...wordItemsById]);
  const { lessons, lessonsById } = buildLessons(
    commonData.commonLessons,
    localizedLessonsById,
    itemsById,
  );
  const { modules, modulesById } = buildModules(
    commonData.commonModules,
    localizedModulesById,
    lessonsById,
  );

  return {
    totalLettersCount,
    totalWordsCount,
    letterItems,
    letterItemsById,
    wordItems,
    wordItemsById,
    lessons,
    lessonsById,
    modules,
    modulesById,
  };
};

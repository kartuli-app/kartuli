import type { LocalizedContentData } from '../localized-content-data/localized-content-data';

function mergeById<T extends { id: string }>(defaultItems: T[], extendedItems: T[]): T[] {
  const map = new Map<string, T>();
  for (const item of defaultItems) {
    map.set(item.id, item);
  }
  for (const item of extendedItems) {
    map.set(item.id, item);
  }
  return Array.from(map.values());
}

export function mergeLocalizedContentData(
  defaultData: LocalizedContentData,
  extendedData: LocalizedContentData,
): LocalizedContentData {
  return {
    localizedModules: mergeById(defaultData.localizedModules, extendedData.localizedModules),
    localizedLessons: mergeById(defaultData.localizedLessons, extendedData.localizedLessons),
    localizedAlphabetItems: mergeById(
      defaultData.localizedAlphabetItems,
      extendedData.localizedAlphabetItems,
    ),
    localizedVocabularyItems: mergeById(
      defaultData.localizedVocabularyItems,
      extendedData.localizedVocabularyItems,
    ),
  };
}

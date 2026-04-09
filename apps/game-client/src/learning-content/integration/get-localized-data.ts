import type { LocalizedData } from '@game-client/learning-content/ingestion/localized-data/localized-data';
import { defaultLocalizedDataRepository } from '../ingestion/localized-data/default-localized-data-repository';
import { extendedLocalizedDataRepository } from '../ingestion/localized-data/extended-localized-data-repository';

function mergeLocalizedData(localizedDataSources: LocalizedData[]): LocalizedData {
  // combine modules and flat them into rows
  const mergedLocalizedModules = localizedDataSources.flatMap((data) => data.localizedModules);

  // combine lessons and flat them into rows
  const mergedLocalizedLessons = localizedDataSources.flatMap((data) => data.localizedLessons);
  // combine letter items and flat them into rows
  const mergedLocalizedLetterItems = localizedDataSources.flatMap(
    (data) => data.localizedLetterItems,
  );
  // combine word items and flat them into rows
  const mergedLocalizedWordItems = localizedDataSources.flatMap((data) => data.localizedWordItems);

  return {
    localizedModules: mergedLocalizedModules,
    localizedLessons: mergedLocalizedLessons,
    localizedLetterItems: mergedLocalizedLetterItems,
    localizedWordItems: mergedLocalizedWordItems,
  };
}

export async function getLocalizedData(locale: string): Promise<LocalizedData> {
  const defaultDataRepository = defaultLocalizedDataRepository();
  const extendedDataRepository = extendedLocalizedDataRepository();
  const defaultData = defaultDataRepository.get(locale);
  const extendedData = extendedDataRepository.get(locale);
  const localizedDataSources = [defaultData, extendedData];
  return mergeLocalizedData(localizedDataSources);
}

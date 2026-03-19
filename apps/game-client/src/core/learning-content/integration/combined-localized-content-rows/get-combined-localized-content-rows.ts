import { defaultLocalizedContentDataRepository } from '@game-client/core/learning-content/ingestion/default-data/default-localized-content-data-repository';
import { extendedLocalizedContentDataRepository } from '@game-client/core/learning-content/ingestion/extended-data/extended-localized-content-data-repository';
import type { LocalizedContentData } from '@game-client/core/learning-content/ingestion/localized-content-data/localized-content-data';
import type { CombinedLocalizedContentRows } from './combined-localized-content-rows';

function mergeLocalizedContentData(
  defaultData: LocalizedContentData,
  extendedData: LocalizedContentData,
  locale: string,
): CombinedLocalizedContentRows {
  // combine modules and flat them into rows
  const combinedLocalizedModulesRows = [
    ...defaultData.localizedModules,
    ...extendedData.localizedModules,
  ];

  // combine lessons and flat them into rows
  const combinedLocalizedLessonsRows = [
    ...defaultData.localizedLessons,
    ...extendedData.localizedLessons,
  ];
  // combine alphabet items and flat them into rows
  const combinedLocalizedItemsRows = [
    ...defaultData.localizedItems,
    ...extendedData.localizedItems,
  ];
  return {
    locale,
    combinedLocalizedModulesRows,
    combinedLocalizedLessonsRows,
    combinedLocalizedItemsRows,
  };
}

export async function getCombinedLocalizedContentRows(
  locale: string,
): Promise<CombinedLocalizedContentRows> {
  console.info('📖 [integration] 📖 getCombinedLocalizedContentRows locale:', locale);
  const defaultDataRepository = defaultLocalizedContentDataRepository();
  const extendedDataRepository = extendedLocalizedContentDataRepository();
  const [defaultData, extendedData] = await Promise.all([
    defaultDataRepository.get(locale),
    extendedDataRepository.get(locale),
  ]);
  return mergeLocalizedContentData(defaultData, extendedData, locale);
}

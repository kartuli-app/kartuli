import type { CommonData } from '../ingestion/common-data/common-data';
import { defaultCommonDataRepository } from '../ingestion/common-data/default-common-data-repository';
import { extendedCommonDataRepository } from '../ingestion/common-data/extended-common-data-repository';

function mergeCommonData(commonDataSources: CommonData[]): CommonData {
  // combine modules and flat them into rows
  const mergedCommonModules = commonDataSources.flatMap((data) => data.commonModules);
  // combine lessons and flat them into rows
  const mergedCommonLessons = commonDataSources.flatMap((data) => data.commonLessons);
  // combine letter items and flat them into rows
  const mergedCommonLetterItems = commonDataSources.flatMap((data) => data.commonLetterItems);
  // combine word items and flat them into rows
  const mergedCommonWordItems = commonDataSources.flatMap((data) => data.commonWordItems);

  return {
    commonModules: mergedCommonModules,
    commonLessons: mergedCommonLessons,
    commonLetterItems: mergedCommonLetterItems,
    commonWordItems: mergedCommonWordItems,
  };
}

export async function getCommonData(): Promise<CommonData> {
  const defaultDataRepository = defaultCommonDataRepository();
  const extendedDataRepository = extendedCommonDataRepository();
  const defaultData = defaultDataRepository.get();
  const extendedData = extendedDataRepository.get();
  const commonDataSources = [defaultData, extendedData];
  return mergeCommonData(commonDataSources);
}

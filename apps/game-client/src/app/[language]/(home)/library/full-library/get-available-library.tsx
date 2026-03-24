import { getCombinedLocalizedContentRows } from '@game-client/core/learning-content/integration/combined-localized-content-rows/get-combined-localized-content-rows';
import { getCombinedSharedContentRows } from '@game-client/core/learning-content/integration/combined-shared-content-rows/get-combined-shared-content-rows';
import { getAvailableLibrary } from '../available-library/get-available-library';
import type { FullLibrary } from './full-library';

export const getFullLibrary = async (locale: string): Promise<FullLibrary> => {
  const [sharedData, localizedData] = await Promise.all([
    getCombinedSharedContentRows(),
    getCombinedLocalizedContentRows(locale),
  ]);
  const availableLibrary = getAvailableLibrary(sharedData, localizedData);
  return {
    sharedData,
    localizedData,
    availableLibrary,
  };
};

import type { SupportedLocale } from '@game-client/i18n';
import { getCommonData } from '@game-client/learning-content/integration/get-common-data';
import { getLocalizedData } from '@game-client/learning-content/integration/get-localized-data';
import { buildLibrary } from './build-library';
import type { Library } from './library';

export const getLibraryServer = (locale: SupportedLocale): Library => {
  const commonData = getCommonData();
  const localizedData = getLocalizedData(locale);
  return buildLibrary(commonData, localizedData);
};

'use client';

import { useCombinedLocalizedContentDataGetQuery } from '@game-client/core/learning-content/combined-data/combined-localized-content-data-get-query';
import { useCombinedSharedContentDataGetQuery } from '@game-client/core/learning-content/combined-data/combined-shared-content-data-get-query';
import { useLang } from '@game-client/i18n/use-lang';

export function NewModulesList() {
  const lang = useLang();
  const { data: dataShared } = useCombinedSharedContentDataGetQuery();
  const { data: dataLocalized } = useCombinedLocalizedContentDataGetQuery(lang);

  console.info('combined shared', dataShared);
  console.info('combined localized', dataLocalized);

  return null;
}

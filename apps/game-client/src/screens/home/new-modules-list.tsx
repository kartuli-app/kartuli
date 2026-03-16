'use client';

import { useCombinedLocalizedContentDataGetQuery } from '@game-client/core/learning-content/integration/combined-localized-content-data-get-query';
import { useCombinedSharedContentDataGetQuery } from '@game-client/core/learning-content/integration/combined-shared-content-data-get-query';
import { useLang } from '@game-client/i18n/use-lang';
export function NewModulesList() {
  const lang = useLang();
  const { data: combinedSharedContentRows, isLoading: isCombinedSharedContentRowsLoading } =
    useCombinedSharedContentDataGetQuery();
  const { data: combinedLocalizedContentRows, isLoading: isCombinedLocalizedContentRowsLoading } =
    useCombinedLocalizedContentDataGetQuery(lang);

  if (!isCombinedSharedContentRowsLoading && !isCombinedLocalizedContentRowsLoading) {
    console.info('🚀 ~ NewModulesList ~ combinedSharedContentRows:', combinedSharedContentRows);
    console.info(
      '🚀 ~ NewModulesList ~ combinedLocalizedContentRows:',
      combinedLocalizedContentRows,
    );
  }

  return null;
}

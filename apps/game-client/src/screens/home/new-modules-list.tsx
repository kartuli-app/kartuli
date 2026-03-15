'use client';

import { useDefaultLocalizedContentDataGetQuery } from '@game-client/core/learning-content/default-data/default-localized-content-data-get-query';
import { useDefaultSharedContentDataGetQuery } from '@game-client/core/learning-content/default-data/default-shared-content-data-get-query';
import { useLang } from '@game-client/i18n/use-lang';

export function NewModulesList() {
  const lang = useLang();
  const { data: dataShared, isLoading, error } = useDefaultSharedContentDataGetQuery();
  const {
    data: dataLocalized,
    isLoading: isLoadingLocalized,
    error: errorLocalized,
  } = useDefaultLocalizedContentDataGetQuery(lang);
  console.log('🚀 ~ NewModulesList ~ error:', error);
  console.log('🚀 ~ NewModulesList ~ isLoading:', isLoading);
  console.log('🚀 ~ NewModulesList ~ data:', dataShared);
  console.log('🚀 ~ NewModulesList ~ isLoadingLocalized:', isLoadingLocalized);
  console.log('🚀 ~ NewModulesList ~ errorLocalized:', errorLocalized);
  console.log('🚀 ~ NewModulesList ~ dataLocalized:', dataLocalized);

  return (
    <div>
      <h1>New Modules List</h1>
    </div>
  );
}

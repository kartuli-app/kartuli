'use client';

import { useHomeModulesView } from '@game-client/core/learning-content/db/views/home-modules-view/use-home-modules-view';
import { useLang } from '@game-client/i18n/use-lang';

export function NewModulesList() {
  const locale = useLang();
  const contentRevision = '1.0.0';

  const { data, isLoading, isError } = useHomeModulesView({ locale, contentRevision });

  console.info('🚀 ~ useNewModulesList ~ data:', data);
  console.info('🚀 ~ useNewModulesList ~ isLoading:', isLoading);
  console.info('🚀 ~ useNewModulesList ~ isError:', isError);
  return null;
}

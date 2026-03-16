'use client';

import { useHomeModulesView } from '@game-client/core/learning-content/db/home-modules-view/use-home-modules-view';
import { useLang } from '@game-client/i18n/use-lang';
export function NewModulesList() {
  const lang = useLang();
  const { data, isLoading, isError } = useHomeModulesView(lang);
  console.info('🚀 ~ NewModulesList ~ isError:', isError);
  console.info('🚀 ~ NewModulesList ~ isLoading:', isLoading);
  console.info('🚀 ~ NewModulesList ~ data:', data);

  return null;
}

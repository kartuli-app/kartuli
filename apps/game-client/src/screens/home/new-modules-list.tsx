'use client';

import { useHomeModulesView } from '@game-client/core/learning-content/collections/views/home-modules-view/use-home-modules-view';
import { StudentItemActivityStateDebug } from '@game-client/core/student/item-activity-state/student-item-activity-state-debug';
import { useLang } from '@game-client/i18n/use-lang';

export function NewModulesList() {
  const locale = useLang();
  const contentRevision = '1.0.0';

  const { data, isLoading } = useHomeModulesView({ locale, contentRevision });
  console.info('🚀 ~ NewModulesList ~ data:', data);
  if (isLoading) {
    return null;
  }

  return <StudentItemActivityStateDebug />;
}

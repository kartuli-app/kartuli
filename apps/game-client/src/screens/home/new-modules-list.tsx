'use client';

import { StudentItemActivityEventsDebug } from '@game-client/core/learning-content/db/student/students-thing';
import { useHomeModulesView } from '@game-client/core/learning-content/db/views/home-modules-view/use-home-modules-view';
import { useLang } from '@game-client/i18n/use-lang';

export function NewModulesList() {
  const locale = useLang();
  const contentRevision = '1.0.0';

  const { data, isLoading } = useHomeModulesView({ locale, contentRevision });
  console.info('🚀 ~ NewModulesList ~ data:', data);
  if (isLoading) {
    return null;
  }

  return <StudentItemActivityEventsDebug />;
}

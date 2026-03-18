'use client';

import { useStudentItemActivityEventsCollection } from '@game-client/core/learning-content/db/student/item-activity-events-collection/use-student-item-activity-events-collection';
import { useHomeModulesView } from '@game-client/core/learning-content/db/views/home-modules-view/use-home-modules-view';
import { useLang } from '@game-client/i18n/use-lang';
import { useLiveQuery } from '@tanstack/react-db';

export function NewModulesList() {
  const locale = useLang();
  const contentRevision = '1.0.0';

  const { data, isLoading } = useHomeModulesView({ locale, contentRevision });

  const studentItemActivityEventsCollection = useStudentItemActivityEventsCollection();
  const { data: studentItemActivityEvents, isLoading: isLoadingStudentItemActivityEvents } =
    useLiveQuery(studentItemActivityEventsCollection);
  if (isLoadingStudentItemActivityEvents || isLoading) {
    return null;
  }
  const onClick = () => {
    studentItemActivityEventsCollection.utils.writeInsert({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      itemId: 'letter-ani',
      eventType: 'click',
    });
  };
  console.info('🚀 ~ NewModulesList ~ data:', data);
  console.info('🚀 ~ NewModulesList ~ studentItemActivityEvents:', studentItemActivityEvents);
  return (
    <button type="button" onClick={onClick}>
      Add item activity event
    </button>
  );
}

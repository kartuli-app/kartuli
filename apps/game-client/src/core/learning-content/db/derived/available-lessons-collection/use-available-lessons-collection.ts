import { useMemo } from 'react';
import { useLessonTextsCollection } from '../../base/lesson-texts-collection/use-lesson-texts-collection';
import { useLessonsCollection } from '../../base/lessons-collection/use-lessons-collection';
import { createAvailableLessonsCollection } from './create-available-lessons-collection';

export function useAvailableLessonsCollection({
  contentRevision,
  locale,
}: {
  contentRevision: string;
  locale: string;
}) {
  const lessonsCollection = useLessonsCollection({ contentRevision });
  const lessonTextsCollection = useLessonTextsCollection({ contentRevision, locale });

  return useMemo(() => {
    return createAvailableLessonsCollection({ lessonsCollection, lessonTextsCollection });
  }, [contentRevision, locale]);
}

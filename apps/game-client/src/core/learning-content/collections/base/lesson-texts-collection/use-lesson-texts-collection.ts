import { createLessonTextsCollection } from '@game-client/core/learning-content/collections/base/lesson-texts-collection/create-lesson-texts-collection';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useLessonTextsCollection({
  contentRevision,
  locale,
}: {
  contentRevision: string;
  locale: string;
}) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createLessonTextsCollection({ queryClient, contentRevision, locale });
  }, [queryClient, contentRevision, locale]);
}

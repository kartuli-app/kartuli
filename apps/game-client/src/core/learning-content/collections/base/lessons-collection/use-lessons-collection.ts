import { createLessonsCollection } from '@game-client/core/learning-content/collections/base/lessons-collection/create-lessons-collection';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useLessonsCollection({ contentRevision }: { contentRevision: string }) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createLessonsCollection({ queryClient, contentRevision });
  }, [queryClient, contentRevision]);
}

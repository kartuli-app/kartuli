import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createLessonsCollection } from './create-lessons-collection';

export function useLessonsCollection({ contentRevision }: { contentRevision: string }) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createLessonsCollection({ queryClient, contentRevision });
  }, [queryClient, contentRevision]);
}

import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createLocalizedLessonsCollection } from './create-localized-lessons-collection';

export function useLocalizedLessonsCollection({
  contentRevision,
  locale,
}: {
  contentRevision: string;
  locale: string;
}) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    return createLocalizedLessonsCollection({ queryClient, contentRevision, locale });
  }, [queryClient, contentRevision, locale]);
}

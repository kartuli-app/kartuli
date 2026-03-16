'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createLessonsCollection } from './lessons-collection';
import { createLocalizedLessonsCollection } from './localized-lessons-collection';
import { createSharedLessonsCollection } from './shared-lessons-collection';

/**
 * Returns the joined lessons collection (shared + localized inner-joined on id)
 * for the given locale.
 */
export function useLessonsCollection(locale: string) {
  const queryClient = useQueryClient();

  return useMemo(() => {
    const sharedLessons = createSharedLessonsCollection(queryClient);
    const localizedLessons = createLocalizedLessonsCollection(queryClient, locale);
    return createLessonsCollection(sharedLessons, localizedLessons);
  }, [queryClient, locale]);
}

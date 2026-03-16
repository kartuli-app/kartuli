'use client';

import { useLang } from '@game-client/i18n/use-lang';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createLocalizedVocabularyCollection } from './localized-vocabulary-collection';
import { createSharedVocabularyCollection } from './shared-vocabulary-collection';
import { createVocabularyCollection } from './vocabulary-collection';

/**
 * Returns the joined vocabulary collection (shared + localized inner-joined on id),
 * keyed by the current locale.
 */
export function useVocabularyCollection() {
  const queryClient = useQueryClient();
  const locale = useLang();

  return useMemo(() => {
    const sharedVocabulary = createSharedVocabularyCollection(queryClient);
    const localizedVocabulary = createLocalizedVocabularyCollection(queryClient, locale);
    return createVocabularyCollection(sharedVocabulary, localizedVocabulary);
  }, [queryClient, locale]);
}

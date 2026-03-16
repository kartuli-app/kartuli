'use client';

import { useLang } from '@game-client/i18n/use-lang';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createAlphabetCollection } from './alphabet-collection';
import { createLocalizedAlphabetCollection } from './localized-alphabet-collection';
import { createSharedAlphabetCollection } from './shared-alphabet-collection';

/**
 * Returns the joined alphabet collection (shared + localized inner-joined on id),
 * keyed by the current locale. When locale changes, the localized and joined collections
 * are recreated so data refetches for the new language.
 */
export function useAlphabetCollection() {
  const queryClient = useQueryClient();
  const locale = useLang();

  return useMemo(() => {
    const sharedAlphabet = createSharedAlphabetCollection(queryClient);
    const localizedAlphabet = createLocalizedAlphabetCollection(queryClient, locale);
    return createAlphabetCollection(sharedAlphabet, localizedAlphabet);
  }, [queryClient, locale]);
}

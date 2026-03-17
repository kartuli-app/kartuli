'use client';

import { useItemsCollection } from '@game-client/core/learning-content/base-collections/items-collection/use-items-collection';
import { useModuleToLessonEdgesCollection } from '@game-client/core/learning-content/base-collections/module-to-lesson-edges-collection/use-module-to-lesson-edges-collection';
import { useCombinedLocalizedContentDataGetQuery } from '@game-client/core/learning-content/integration/combined-localized-content-data-get-query';
import { useCombinedSharedContentDataGetQuery } from '@game-client/core/learning-content/integration/combined-shared-content-data-get-query';
import { useLang } from '@game-client/i18n/use-lang';
import { eq, useLiveQuery } from '@tanstack/react-db';

export function NewModulesList() {
  const lang = useLang();
  const { data: combinedSharedContentRows, isLoading: isCombinedSharedContentRowsLoading } =
    useCombinedSharedContentDataGetQuery({ contentRevision: '1.0.0' });
  const { data: combinedLocalizedContentRows, isLoading: isCombinedLocalizedContentRowsLoading } =
    useCombinedLocalizedContentDataGetQuery({ locale: lang, contentRevision: '1.0.0' });

  const itemsCollection = useItemsCollection();
  const { data: alphabetItemsRows, isLoading: isAlphabetItemsRowsLoading } = useLiveQuery((q) =>
    q.from({ items: itemsCollection }).where(({ items }) => eq(items.type, 'letter')),
  );

  const { data: vocabularyItemsRows, isLoading: isVocabularyItemsRowsLoading } = useLiveQuery((q) =>
    q.from({ items: itemsCollection }).where(({ items }) => eq(items.type, 'word')),
  );

  const moduleToLessonEdgesCollection = useModuleToLessonEdgesCollection();
  const { data: moduleToLessonEdgesRows, isLoading: isModuleToLessonEdgesRowsLoading } =
    useLiveQuery((q) =>
      q
        .from({ moduleToLessonEdges: moduleToLessonEdgesCollection })
        .orderBy(({ moduleToLessonEdges }) => moduleToLessonEdges.moduleId)
        .orderBy(({ moduleToLessonEdges }) => moduleToLessonEdges.order),
    );

  if (
    !isCombinedSharedContentRowsLoading &&
    !isCombinedLocalizedContentRowsLoading &&
    !isAlphabetItemsRowsLoading &&
    !isVocabularyItemsRowsLoading &&
    !isModuleToLessonEdgesRowsLoading
  ) {
    console.info('🚀 ~ NewModulesList ~ combinedSharedContentRows:', combinedSharedContentRows);
    console.info(
      '🚀 ~ NewModulesList ~ combinedLocalizedContentRows:',
      combinedLocalizedContentRows,
    );
    console.info('🚀 ~ NewModulesList ~ alphabetItemsRows:', alphabetItemsRows);
    console.info('🚀 ~ NewModulesList ~ vocabularyItemsRows:', vocabularyItemsRows);
    console.info('🚀 ~ NewModulesList ~ moduleToLessonEdgesRows:', moduleToLessonEdgesRows);
  }

  return null;
}

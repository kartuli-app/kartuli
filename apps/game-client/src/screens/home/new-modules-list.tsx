'use client';

import { useLocalizedItemsCollection } from '@game-client/core/learning-content/base-collections/localized/localized-items-collection/use-localized-items-collection';
import { useLocalizedLessonsCollection } from '@game-client/core/learning-content/base-collections/localized/localized-lessons-collection/use-localized-lessons-collection';
import { useLocalizedModulesCollection } from '@game-client/core/learning-content/base-collections/localized/localized-modules-collection/use-localized-modules-collection';
import { useItemsCollection } from '@game-client/core/learning-content/base-collections/shared/items-collection/use-items-collection';
import { useLessonToItemEdgesCollection } from '@game-client/core/learning-content/base-collections/shared/lesson-to-item-edges-collection/use-lesson-to-item-edges-collection';
import { useLessonsCollection } from '@game-client/core/learning-content/base-collections/shared/lessons-collection/use-lessons-collection';
import { useModuleToLessonEdgesCollection } from '@game-client/core/learning-content/base-collections/shared/module-to-lesson-edges-collection/use-module-to-lesson-edges-collection';
import { useModulesCollection } from '@game-client/core/learning-content/base-collections/shared/modules-collection/use-modules-collection';
import { useCombinedLocalizedContentDataGetQuery } from '@game-client/core/learning-content/integration/combined-localized-content-data-get-query';
import { useCombinedSharedContentDataGetQuery } from '@game-client/core/learning-content/integration/combined-shared-content-data-get-query';
import { useLang } from '@game-client/i18n/use-lang';
import { eq, useLiveQuery } from '@tanstack/react-db';

export function NewModulesList() {
  const lang = useLang();
  const contentRevision = '1.0.0';
  const { data: combinedSharedContentRows, isLoading: isCombinedSharedContentRowsLoading } =
    useCombinedSharedContentDataGetQuery({ contentRevision });
  const { data: combinedLocalizedContentRows, isLoading: isCombinedLocalizedContentRowsLoading } =
    useCombinedLocalizedContentDataGetQuery({ locale: lang, contentRevision });

  const itemsCollection = useItemsCollection({ contentRevision });
  const { data: alphabetItemsRows, isLoading: isAlphabetItemsRowsLoading } = useLiveQuery((q) =>
    q.from({ items: itemsCollection }).where(({ items }) => eq(items.type, 'letter')),
  );

  const { data: vocabularyItemsRows, isLoading: isVocabularyItemsRowsLoading } = useLiveQuery((q) =>
    q.from({ items: itemsCollection }).where(({ items }) => eq(items.type, 'word')),
  );

  const lessonsCollection = useLessonsCollection({ contentRevision });
  const { data: lessonsRows, isLoading: isLessonsRowsLoading } = useLiveQuery((q) =>
    q.from({ lessons: lessonsCollection }).orderBy(({ lessons }) => lessons.id),
  );

  const modulesCollection = useModulesCollection({ contentRevision });
  const { data: modulesRows, isLoading: isModulesRowsLoading } = useLiveQuery((q) =>
    q.from({ modules: modulesCollection }).orderBy(({ modules }) => modules.id),
  );

  const moduleToLessonEdgesCollection = useModuleToLessonEdgesCollection({ contentRevision });
  const { data: moduleToLessonEdgesRows, isLoading: isModuleToLessonEdgesRowsLoading } =
    useLiveQuery((q) =>
      q
        .from({ moduleToLessonEdges: moduleToLessonEdgesCollection })
        .orderBy(({ moduleToLessonEdges }) => moduleToLessonEdges.moduleId)
        .orderBy(({ moduleToLessonEdges }) => moduleToLessonEdges.order),
    );

  const lessonToItemEdgesCollection = useLessonToItemEdgesCollection({ contentRevision });
  const { data: lessonToItemEdgesRows, isLoading: isLessonToItemEdgesRowsLoading } = useLiveQuery(
    (q) =>
      q
        .from({ lessonToItemEdges: lessonToItemEdgesCollection })
        .orderBy(({ lessonToItemEdges }) => lessonToItemEdges.lessonId)
        .orderBy(({ lessonToItemEdges }) => lessonToItemEdges.order),
  );

  const localizedItemsCollection = useLocalizedItemsCollection({ contentRevision, locale: lang });
  const { data: localizedItemsRows, isLoading: isLocalizedItemsRowsLoading } = useLiveQuery((q) =>
    q.from({ items: localizedItemsCollection }).orderBy(({ items }) => items.id),
  );

  const localizedModulesCollection = useLocalizedModulesCollection({
    contentRevision,
    locale: lang,
  });
  const { data: localizedModulesRows, isLoading: isLocalizedModulesRowsLoading } = useLiveQuery(
    (q) => q.from({ modules: localizedModulesCollection }).orderBy(({ modules }) => modules.id),
  );

  const localizedLessonsCollection = useLocalizedLessonsCollection({
    contentRevision,
    locale: lang,
  });
  const { data: localizedLessonsRows, isLoading: isLocalizedLessonsRowsLoading } = useLiveQuery(
    (q) => q.from({ lessons: localizedLessonsCollection }).orderBy(({ lessons }) => lessons.id),
  );

  if (
    !isCombinedSharedContentRowsLoading &&
    !isCombinedLocalizedContentRowsLoading &&
    !isAlphabetItemsRowsLoading &&
    !isVocabularyItemsRowsLoading &&
    !isModuleToLessonEdgesRowsLoading &&
    !isLessonToItemEdgesRowsLoading &&
    !isLessonsRowsLoading &&
    !isModulesRowsLoading &&
    !isLocalizedItemsRowsLoading &&
    !isLocalizedModulesRowsLoading &&
    !isLocalizedLessonsRowsLoading
  ) {
    console.info(
      '🚀🚀🚀🚀🚀 ~ NewModulesList ~ combinedSharedContentRows:',
      combinedSharedContentRows,
    );
    console.info(
      '🚀 ~ NewModulesList ~ combinedLocalizedContentRows:',
      combinedLocalizedContentRows,
    );
    console.info('🚀 ~ NewModulesList ~ alphabetItemsRows:', alphabetItemsRows);
    console.info('🚀 ~ NewModulesList ~ vocabularyItemsRows:', vocabularyItemsRows);
    console.info('🚀 ~ NewModulesList ~ moduleToLessonEdgesRows:', moduleToLessonEdgesRows);
    console.info('🚀 ~ NewModulesList ~ lessonToItemEdgesRows:', lessonToItemEdgesRows);
    console.info('🚀 ~ NewModulesList ~ lessonsRows:', lessonsRows);
    console.info('🚀 ~ NewModulesList ~ modulesRows:', modulesRows);
    console.info('🚀 ~ NewModulesList ~ localizedItemsRows:', localizedItemsRows);
    console.info('🚀 ~ NewModulesList ~ localizedModulesRows:', localizedModulesRows);
    console.info('🚀 ~ NewModulesList ~ localizedLessonsRows:', localizedLessonsRows);
  }

  return null;
}

import type { Collection } from '@tanstack/db';
import { createLiveQueryCollection, eq } from '@tanstack/db';
import type { LocalizedLesson } from '../../localized-content-data/localized-content-data';
import type { SharedLesson } from '../../shared-content-data/shared-content-data';

/**
 * Result row type of the joined lessons collection (inner join).
 */
export interface LessonsCollectionRow {
  sharedLesson: SharedLesson;
  localizedLesson: LocalizedLesson;
}

/**
 * Creates a live-query collection that inner-joins shared and localized lessons on `id`.
 */
export function createLessonsCollection(
  sharedLessonsCollection: Collection<SharedLesson>,
  localizedLessonsCollection: Collection<LocalizedLesson>,
) {
  return createLiveQueryCollection((q) =>
    q
      .from({ sharedLesson: sharedLessonsCollection })
      .innerJoin(
        { localizedLesson: localizedLessonsCollection },
        ({ sharedLesson, localizedLesson }) => eq(sharedLesson.id, localizedLesson.id),
      ),
  );
}

import type { CombinedLocalizedLessonRow } from '@game-client/core/learning-content/integration/combined-localized-content-rows/combined-localized-content-rows';
import type { CombinedSharedLessonRow } from '@game-client/core/learning-content/integration/combined-shared-content-rows/combined-shared-content-rows';
import { type Collection, createLiveQueryCollection, eq } from '@tanstack/db';

export type AvailableLessonRow = {
  sharedLesson: CombinedSharedLessonRow;
  localizedLesson: CombinedLocalizedLessonRow;
};

export function createAvailableLessonsCollection({
  lessonsCollection,
  lessonTextsCollection,
}: {
  lessonsCollection: Collection<CombinedSharedLessonRow>;
  lessonTextsCollection: Collection<CombinedLocalizedLessonRow>;
}) {
  return createLiveQueryCollection((q) =>
    q
      .from({ sharedLesson: lessonsCollection })
      .innerJoin({ localizedLesson: lessonTextsCollection }, (q) =>
        eq(q.sharedLesson.id, q.localizedLesson.id),
      ),
  );
}

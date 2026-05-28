'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import { LetterStudyDetailContent } from '@game-client/ui/experiences/study/components/detail/letter-study-detail-content';
import { StudyDetailFrame } from '@game-client/ui/experiences/study/components/detail/study-detail-frame';

export function LetterStudyDetailSlide({ item }: Readonly<{ item: LetterItem }>) {
  return (
    <StudyDetailFrame>
      <LetterStudyDetailContent item={item} />
    </StudyDetailFrame>
  );
}

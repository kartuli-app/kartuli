'use client';

import type { LetterItem } from '@game-client/learning-content';
import {
  InfoTextNotesSection,
  PronunciationHintSection,
  RuntimeExamplesSection,
} from '@game-client/ui/experiences/study/components/detail/letter-study-note-sections';
import { cn } from '@kartuli/ui/utils/cn';
import { useTranslation } from 'react-i18next';

export function LetterStudyNotes({
  item,
}: Readonly<{
  item: Pick<LetterItem, 'id' | 'targetScript' | 'notes'>;
}>) {
  return <InfoTextNotesSection notes={item.notes} />;
}

export function LetterStudyExamples({
  item,
}: Readonly<{
  item: Pick<LetterItem, 'id' | 'targetScript' | 'notes'>;
}>) {
  const { t } = useTranslation('study');

  return (
    <div
      className={cn(
        //
        'grid min-h-0 w-full grid-cols-2 gap-p-spacing-2',
        // 'border',
      )}
    >
      <PronunciationHintSection badgeLabel={t('notes.badges.like_in')} notes={item.notes} />
      <RuntimeExamplesSection badgeLabel={t('notes.badges.examples')} item={item} />
    </div>
  );
}

'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import {
  LetterStudyExamples,
  LetterStudyNotes,
} from '@game-client/ui/experiences/study/components/detail/letter-study-notes';
import { cn } from '@kartuli/ui/utils/cn';
import { useTranslation } from 'react-i18next';
import { DetailIdentityHero } from './detail-identity-hero';
import { DetailMetaBar } from './detail-meta-bar';

interface LetterStudyDetailContentProps {
  item: LetterItem;
}

export function LetterStudyDetailContent({ item }: Readonly<LetterStudyDetailContentProps>) {
  const { t } = useTranslation('study');

  return (
    <div
      className={cn(
        'grid h-full w-full min-h-0 grid-rows-[auto_minmax(0,1.35fr)_auto_auto]',
        'gap-p-spacing-2',
        'p-p-spacing-2',
      )}
    >
      <DetailMetaBar
        labels={{
          addFavorite: t('notes.favorite.add_label'),
          newBadge: t('detail.badges.status_new'),
          playAudio: t('notes.audio.play_label'),
          removeFavorite: t('notes.favorite.remove_label'),
          stopAudio: t('notes.audio.stop_label'),
        }}
        messages={{
          favoriteAdded: t('notes.favorite.toast_added', { letter: item.targetScript }),
          favoriteRemoved: t('notes.favorite.toast_removed', { letter: item.targetScript }),
        }}
      />
      <DetailIdentityHero targetScript={item.targetScript} transliteration={item.transliteration} />
      <LetterStudyNotes item={item} />
      <LetterStudyExamples item={item} />
    </div>
  );
}

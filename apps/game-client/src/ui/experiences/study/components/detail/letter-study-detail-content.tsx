'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import { PanelActionButton } from '@game-client/ui/components/actions/panel-action-button';
import { showNotification } from '@game-client/ui/components/feedback/notifications';
import {
  LetterStudyExamples,
  LetterStudyNotes,
} from '@game-client/ui/experiences/study/components/detail/letter-study-notes';
import { cn } from '@kartuli/ui/utils/cn';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuAudioLines } from 'react-icons/lu';
import { PiHeartFill, PiPauseFill } from 'react-icons/pi';

interface LetterStudyDetailContentProps {
  item: LetterItem;
}

const MOCK_AUDIO_DURATION_MS = 1200;

function DetailBadge({
  children,
  className,
}: Readonly<{
  children: string;
  className?: string;
}>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-p-radius-1 px-p-spacing-4 py-p-spacing-1',
        'bg-s-color-panel-status-badge-bg text-s-color-panel-status-badge-content-primary',
        'font-bold uppercase',
        'text-sm md:text-xl',
        className,
      )}
    >
      {children}
    </span>
  );
}

function DetailMetaBar({
  item,
}: Readonly<{
  item: Pick<LetterItem, 'targetScript'>;
}>) {
  const { t } = useTranslation('study');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timeoutId = globalThis.setTimeout(() => {
      setIsPlaying(false);
    }, MOCK_AUDIO_DURATION_MS);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [isPlaying]);

  const AudioIcon = isPlaying ? PiPauseFill : LuAudioLines;
  const FavoriteIcon = PiHeartFill;
  const audioLabel = isPlaying ? t('notes.audio.stop_label') : t('notes.audio.play_label');
  const favoriteLabel = isFavorite
    ? t('notes.favorite.remove_label')
    : t('notes.favorite.add_label');
  const favoriteToastDescription = isFavorite
    ? t('notes.favorite.toast_removed', { letter: item.targetScript })
    : t('notes.favorite.toast_added', { letter: item.targetScript });

  const handleFavoriteToggle = () => {
    setIsFavorite((currentValue) => !currentValue);
    showNotification({
      description: favoriteToastDescription,
      timeout: 2200,
    });
  };

  return (
    <div
      className={cn(
        'flex',
        'items-start',
        'justify-between',
        'gap-p-spacing-2',
        'w-full',
        'min-h-0',
        // 'border',
      )}
    >
      <div className={cn('flex min-w-0 flex-1 items-start justify-start gap-p-spacing-2')}>
        <DetailBadge className="bg-s-color-panel-detail-status-new-bg text-s-color-panel-detail-status-new-content">
          {t('detail.badges.status_new')}
        </DetailBadge>
      </div>

      <div className={cn('flex items-center justify-end gap-p-spacing-2')}>
        <PanelActionButton
          aria-label={audioLabel}
          aria-pressed={isPlaying}
          className="size-11 md:size-14"
          side="bottom"
          tooltipLabel={audioLabel}
          variant="default"
          onClick={() => setIsPlaying((currentValue) => !currentValue)}
        >
          <AudioIcon
            className={cn('size-5 md:size-8 text-inherit', isPlaying && 'animate-pulse')}
            aria-hidden="true"
          />
        </PanelActionButton>

        <PanelActionButton
          aria-label={favoriteLabel}
          aria-pressed={isFavorite}
          className={cn(
            'size-11 md:size-14',
            isFavorite &&
              'text-s-color-panel-detail-favorite-content hover:text-s-color-panel-detail-favorite-hover-content active:text-s-color-panel-detail-favorite-hover-content',
          )}
          side="bottom"
          tooltipLabel={favoriteLabel}
          variant="default"
          onClick={handleFavoriteToggle}
        >
          <FavoriteIcon className="size-5 md:size-8 text-inherit" aria-hidden="true" />
        </PanelActionButton>
      </div>
    </div>
  );
}

function DetailIdentityHero({
  targetScript,
  transliteration,
}: Readonly<Pick<LetterItem, 'targetScript' | 'transliteration'>>) {
  return (
    <div
      className={cn(
        'grid min-h-0 w-full flex-1 grid-rows-[minmax(0,7fr)_minmax(0,2fr)] overflow-hidden',
        // 'border',
      )}
    >
      <div className="flex items-center justify-center w-full h-full @container-size relative max-w-[60%] mx-auto">
        <span className="absolute top-6/20 left-0 z-10 h-[2cqh] w-full bg-s-color-panel-content-notebook-line"></span>
        <span className="absolute top-13/20 left-0 z-10 h-[2cqh] w-full bg-s-color-panel-content-notebook-line"></span>
        <span className="font-georgian text-[70cqh] leading-none z-20 h-full w-full items-center justify-center flex">
          {targetScript}
        </span>
      </div>
      <div className="relative z-20 flex min-h-0 items-start justify-center @container-size">
        <div className="flex items-center justify-center text-[70cqh] leading-none">
          <span className="text-s-color-panel-content-transliteration-bracket">[</span>
          <span>{transliteration}</span>
          <span className="text-s-color-panel-content-transliteration-bracket">]</span>
        </div>
      </div>
    </div>
  );
}

export function LetterStudyDetailContent({ item }: Readonly<LetterStudyDetailContentProps>) {
  return (
    <div
      className={cn(
        'grid h-full w-full min-h-0 grid-rows-[auto_minmax(0,1.35fr)_auto_auto]',
        'gap-p-spacing-2',
        'p-p-spacing-2',
      )}
    >
      <DetailMetaBar item={item} />
      <DetailIdentityHero targetScript={item.targetScript} transliteration={item.transliteration} />
      <LetterStudyNotes item={item} />
      <LetterStudyExamples item={item} />
    </div>
  );
}

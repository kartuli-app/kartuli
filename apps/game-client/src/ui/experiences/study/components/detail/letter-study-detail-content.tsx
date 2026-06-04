'use client';

import type { LetterItem } from '@game-client/learning-content/library/library';
import { ShellActionButton } from '@game-client/ui/components/actions/shell-action';
import { Tooltip } from '@game-client/ui/components/overlay/tooltip';
import {
  LetterStudyExamples,
  LetterStudyNotes,
} from '@game-client/ui/experiences/study/components/detail/letter-study-notes';
import { cn } from '@kartuli/ui/utils/cn';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiHeart, PiHeartFill, PiPauseFill, PiPlayFill } from 'react-icons/pi';

interface LetterStudyDetailContentProps {
  item: LetterItem;
}

function LetterDetailTargetScriptSection({
  targetScript,
}: Readonly<Pick<LetterItem, 'targetScript'>>) {
  const { t } = useTranslation('study');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const AudioIcon = isPlaying ? PiPauseFill : PiPlayFill;
  const FavoriteIcon = isFavorite ? PiHeartFill : PiHeart;
  const audioLabel = isPlaying ? t('notes.audio.stop_label') : t('notes.audio.play_label');
  const favoriteLabel = isFavorite
    ? t('notes.favorite.remove_label')
    : t('notes.favorite.add_label');

  return (
    <div
      className={cn(
        'row-span-9',
        'grid',
        'w-full',
        'min-h-0',
        'grid-cols-20',
        'grid-rows-2',
        // 'gap-x-p-spacing-2',
        // 'gap-y-p-spacing-2',
        'border',
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          //
          'row-span-2 col-span-4',
        )}
      />

      <div
        className={cn(
          'row-span-2',
          'col-span-12',
          'relative',
          'grid',
          'h-full',
          'place-items-center',
          'w-full',
          // 'max-w-[80%] mx-auto',
          '@container-size',
          'border',
        )}
      >
        <span className="absolute top-3/10 left-0 z-10 h-[4cqh] w-full bg-s-color-panel-content-notebook-line"></span>
        <span className="absolute top-6/10 left-0 z-10 h-[4cqh] w-full bg-s-color-panel-content-notebook-line"></span>
        <span className="relative z-50 block font-georgian text-[56cqh] leading-none text-s-color-panel-content-primary">
          {targetScript}
        </span>
      </div>

      <div
        className={cn(
          'row-span-2',
          'col-span-4',
          'grid',
          'min-h-0',
          'grid-rows-2',
          'justify-items-center',
          'gap-p-spacing-2',
          'border',
        )}
      >
        <Tooltip content={audioLabel}>
          <ShellActionButton
            aria-label={audioLabel}
            aria-pressed={isPlaying}
            className="self-center size-11 md:size-12"
            size="icon"
            variant="secondary"
            onClick={() => setIsPlaying((currentValue) => !currentValue)}
          >
            <AudioIcon
              className={cn('size-5 text-inherit', isPlaying && 'animate-pulse')}
              aria-hidden="true"
            />
          </ShellActionButton>
        </Tooltip>

        <Tooltip content={favoriteLabel}>
          <ShellActionButton
            aria-label={favoriteLabel}
            aria-pressed={isFavorite}
            className="self-center size-11 md:size-12"
            size="icon"
            variant="secondary"
            onClick={() => setIsFavorite((currentValue) => !currentValue)}
          >
            <FavoriteIcon className="size-5 text-inherit" aria-hidden="true" />
          </ShellActionButton>
        </Tooltip>
      </div>
    </div>
  );
}

export function LetterStudyDetailContent({ item }: Readonly<LetterStudyDetailContentProps>) {
  return (
    <div
      className={cn('grid h-full w-full min-h-0 grid-rows-20', 'gap-p-spacing-2', 'p-p-spacing-2')}
    >
      <LetterDetailTargetScriptSection targetScript={item.targetScript} />
      <div
        className={cn(
          'row-span-3',
          'flex',
          'items-center',
          'justify-center',
          'text-s-color-panel-content-primary',
          '@container-size',
          'border',
        )}
      >
        <span className="text-s-color-panel-content-transliteration-bracket text-[60cqh]">[</span>
        <span className="flex text-[60cqh]">{item.transliteration}</span>
        <span className="text-s-color-panel-content-transliteration-bracket text-[60cqh]">]</span>
      </div>
      <div
        className={cn(
          //
          'row-span-4',
          'flex',
          'min-h-0',
          'w-full',
          'border',
        )}
      >
        <LetterStudyNotes item={item} />
      </div>
      <div
        className={cn(
          //
          'row-span-6',
          'flex',
          'min-h-0',
          'w-full',
          'border',
        )}
      >
        <LetterStudyExamples item={item} />
      </div>
    </div>
  );
}

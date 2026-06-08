'use client';
import { PanelActionButton } from '@game-client/ui/components/actions/panel-action-button';
import { PanelBadge } from '@game-client/ui/components/badge/panel-badge';
import { showNotification } from '@game-client/ui/components/feedback/notifications';
import { cn } from '@kartuli/ui/utils/cn';
import { useEffect, useState } from 'react';
import { LuAudioLines } from 'react-icons/lu';
import { PiHeartFill, PiPauseFill } from 'react-icons/pi';

const MOCK_AUDIO_DURATION_MS = 1200;

export interface DetailMetaBarLabels {
  addFavorite: string;
  newBadge: string;
  playAudio: string;
  removeFavorite: string;
  stopAudio: string;
}

export interface DetailMetaBarMessages {
  favoriteAdded: string;
  favoriteRemoved: string;
}

export function DetailMetaBar({
  labels,
  messages,
}: Readonly<{
  labels: DetailMetaBarLabels;
  messages: DetailMetaBarMessages;
}>) {
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
  const audioLabel = isPlaying ? labels.stopAudio : labels.playAudio;
  const favoriteLabel = isFavorite ? labels.removeFavorite : labels.addFavorite;

  const handleFavoriteToggle = () => {
    const nextIsFavorite = !isFavorite;

    setIsFavorite(nextIsFavorite);
    showNotification({
      description: nextIsFavorite ? messages.favoriteAdded : messages.favoriteRemoved,
      timeout: 2200,
    });
  };

  return (
    <div className={cn('flex min-h-0 w-full items-start justify-between gap-p-spacing-2')}>
      <div className={cn('flex min-w-0 flex-1 items-start justify-start gap-p-spacing-2')}>
        <PanelBadge shape="rounded" variant="positive">
          {labels.newBadge}
        </PanelBadge>
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
            className={cn('size-5 text-inherit md:size-8', isPlaying && 'animate-pulse')}
            aria-hidden="true"
          />
        </PanelActionButton>

        <PanelActionButton
          aria-label={favoriteLabel}
          aria-pressed={isFavorite}
          className={cn(
            'size-11 md:size-14',
            isFavorite &&
              'text-s-color-panel-content-danger hover:text-s-color-panel-content-danger-strong active:text-s-color-panel-content-danger-strong',
          )}
          side="bottom"
          tooltipLabel={favoriteLabel}
          variant="default"
          onClick={handleFavoriteToggle}
        >
          <FavoriteIcon className="size-5 text-inherit md:size-8" aria-hidden="true" />
        </PanelActionButton>
      </div>
    </div>
  );
}

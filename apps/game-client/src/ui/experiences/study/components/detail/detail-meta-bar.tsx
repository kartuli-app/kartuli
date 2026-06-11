'use client';
import { PanelActionButton } from '@game-client/ui/components/actions/panel-action-button';
import { PanelBadge } from '@game-client/ui/components/badge/panel-badge';
import { showNotification } from '@game-client/ui/components/feedback/notifications';
import { cn } from '@kartuli/ui/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { LuAudioLines } from 'react-icons/lu';
import { PiHeartFill, PiPauseFill } from 'react-icons/pi';

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
  audioSrc,
  labels,
  messages,
}: Readonly<{
  audioSrc?: string;
  labels: DetailMetaBarLabels;
  messages: DetailMetaBarMessages;
}>) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsPlaying(false);

    if (!audioSrc) {
      audioRef.current = null;
      return;
    }

    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

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

  const handleAudioToggle = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    try {
      audio.currentTime = 0;
      await audio.play();
      setIsPlaying(true);
    } catch {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
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
          disabled={!audioSrc}
          side="bottom"
          tooltipLabel={audioLabel}
          variant="secondary"
          onClick={() => {
            void handleAudioToggle();
          }}
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
              'text-s-color-panel-content-favorite hover:text-s-color-panel-content-favorite-strong active:text-s-color-panel-content-favorite-strong',
          )}
          side="bottom"
          tooltipLabel={favoriteLabel}
          variant="secondary"
          onClick={handleFavoriteToggle}
        >
          <FavoriteIcon className="size-5 text-inherit md:size-8" aria-hidden="true" />
        </PanelActionButton>
      </div>
    </div>
  );
}

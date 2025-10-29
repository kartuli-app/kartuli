'use client';

import { clsx } from 'clsx';
import { useMascot } from './mascot-context';
import {
  GAME_RECOMMENDATION_METADATA,
  GAME_RECOMMENDATION_SEQUENCE,
  INITIAL_SEQUENCE,
  START_GAME_METADATA,
  START_GAME_SEQUENCE,
} from './sequences';

export function RecommendedGameCard() {
  const { isPlaying, playSequence, getSequenceDuration } = useMascot();
  const handleStartNow = async () => {
    await playSequence(START_GAME_SEQUENCE, START_GAME_METADATA);
  };
  const handleNewRecomendation = () => {
    playSequence(GAME_RECOMMENDATION_SEQUENCE, GAME_RECOMMENDATION_METADATA);
  };
  const initialSeQuenceDuration = getSequenceDuration(INITIAL_SEQUENCE);
  console.log('🚀 ~ RecommendedGameCard ~ initialSeQuenceDuration:', initialSeQuenceDuration);
  return (
    <div
      className={clsx(
        'flex flex-col max-w-xll w-full bg-slate-100 ml-auto mr-auto',
        'border-1 border-slate-300 shadow-xs rounded-lg',
      )}
    >
      {/* game labels */}
      <div className={clsx('flex p-4 border-b border-slate-300 gap-2')}>
        <div
          className={clsx(
            'p-1 px-3 rounded-lg',
            'font-bold',
            'text-xs bg-ds-primary-700 text-white',
            'w-auto',
          )}
        >
          NEW ITEMS
        </div>
        <div
          className={clsx(
            'p-1 px-3 rounded-lg',
            'font-bold',
            'text-xs bg-ds-primary-700 text-white',
            'w-auto',
          )}
        >
          NOT COMPLETED
        </div>
        <div
          className={clsx(
            'p-1 px-3 rounded-lg',
            'font-bold',
            'text-xs bg-ds-primary-700 text-white',
            'w-auto',
          )}
        >
          LEVEL UP
        </div>
      </div>

      {/* game title and description */}
      <div className={clsx('flex flex-col p-4 border-b border-slate-300 gap-1')}>
        <h1 className={clsx('text-xl text-slate-700', 'font-bold')}>
          Introduction lesson: the essentials
        </h1>
        <div className={clsx('flex flex-col', 'gap-0')}>
          <h3 className={clsx('text-lg text-slate-700', 'font-medium')}>
            The most important words in any language:
          </h3>
          <h3 className={clsx('text-lg text-slate-700', 'font-bold')}>
            hello, goodbye, please, thank you
          </h3>
        </div>
      </div>

      {/* game actions */}
      <div className={clsx('flex p-4 border-b border-slate-300 gap-4 flex-col')}>
        <button
          disabled={isPlaying}
          type="button"
          onClick={handleStartNow}
          className={clsx(
            'disabled:opacity-50',
            'disabled:cursor-not-allowed',
            'p-4 mx-auto rounded-lg',
            'text-2xl bg-ds-primary-700 text-white',
            'hover:bg-ds-primary-800',
            'active:bg-ds-primary-800',
            'disabled:bg-ds-primary-400 disabled:cursor-not-allowed',
            'border-1 border-ds-primary-700',
            'transparent focus:border-ds-primary-100',
            'font-bold',
            'flex items-center justify-center',
            'w-64',
            'cursor-pointer',
          )}
        >
          START NOW
        </button>
        <button
          disabled={isPlaying}
          type="button"
          onClick={handleNewRecomendation}
          className={clsx(
            'disabled:opacity-50',
            'disabled:cursor-not-allowed',
            'px-2 py-1 mx-auto max-w-xs rounded-lg',
            'text-sm border-1 border-slate-300 text-slate-700',
            'hover:bg-slate-200',
            'active:bg-slate-200',
            'disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed',
            'font-bold',
            'flex items-center justify-center',
            'w-48',
            'cursor-pointer',
          )}
        >
          PLAY NOW
        </button>
      </div>
    </div>
  );
}

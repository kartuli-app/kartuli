'use client';

import { useTranslation } from 'react-i18next';
import { navigateBack } from '../utils/browser';

interface GamePageProps {
  readonly lessonId: string;
}

export function GamePage({ lessonId }: GamePageProps) {
  const { t } = useTranslation(['game', 'common']);

  return (
    <div data-testid="game-game" className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">{t('game:title')}</h1>
      <p className="text-xl" data-testid="game-lesson-id">
        {lessonId}
      </p>
      <button
        type="button"
        onClick={() => navigateBack()}
        className="rounded border border-input bg-background px-4 py-2"
      >
        {t('common:back')}
      </button>
    </div>
  );
}

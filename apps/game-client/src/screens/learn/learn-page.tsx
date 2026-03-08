'use client';

import { useLang } from '@game-client/i18n/use-lang';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import { navigateBack } from '@game-client/utils/browser';
import { useTranslation } from 'react-i18next';

interface LearnPageProps {
  readonly lessonId: string;
}

export function LearnPage({ lessonId }: LearnPageProps) {
  const { t } = useTranslation('learn');
  const lang = useLang();
  const { navigate } = useRouterContext();

  return (
    <div data-testid="game-learn" className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="text-xl" data-testid="learn-lesson-id">
        {lessonId}
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => navigate(`/${lang}/game/${lessonId}`)}
          className="rounded border border-gray-700 bg-gray-700 px-4 py-2 text-white"
        >
          {t('play')}
        </button>
        <button
          type="button"
          onClick={() => navigateBack()}
          className="rounded border border-input bg-background px-4 py-2"
        >
          {t('back')}
        </button>
      </div>
    </div>
  );
}

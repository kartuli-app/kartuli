'use client';

import { useLang } from '@game-client/i18n/use-lang';
import { useRouterContext } from '@game-client/router-outlet/use-router-context';
import { useTranslation } from 'react-i18next';

const LESSON_IDS = ['lesson-1', 'lesson-2'] as const;

export function HomePage() {
  const { t } = useTranslation('common');
  const lang = useLang();
  const { navigate } = useRouterContext();

  return (
    <div data-testid="game-home" className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">{t('home')}</h1>
      <ul className="flex flex-col gap-2">
        {LESSON_IDS.map((id) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => navigate(`/${lang}/learn/${encodeURIComponent(id)}`)}
              className="text-lg underline hover:no-underline"
            >
              {id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

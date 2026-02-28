'use client';

import { useTranslation } from 'react-i18next';
import { useRouterContext } from '../app-shell/use-router-context';
import { useLang } from '../i18n/use-lang';

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

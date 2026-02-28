'use client';

import { useTranslation } from 'react-i18next';
import { navigateBack } from '../utils/browser';

export function UserPage() {
  const { t } = useTranslation('common');

  return (
    <div data-testid="game-user" className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">{t('user')}</h1>
      <p className="text-xl">{t('anonymousUser')}</p>
      <button
        type="button"
        onClick={() => navigateBack()}
        className="rounded border border-input bg-background px-4 py-2"
      >
        {t('back')}
      </button>
    </div>
  );
}

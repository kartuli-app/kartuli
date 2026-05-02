'use client';

import { useNavigation } from '@game-client/navigation/navigation-context';
import { useTranslation } from 'react-i18next';

export function NotFoundClient() {
  const { localizedPathname } = useNavigation();
  const { t } = useTranslation('notFound');

  return (
    <main className="px-6 py-10 sm:px-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('heading')}</h1>
        <p className="break-all font-mono text-sm sm:text-base">{localizedPathname}</p>
        <p className="max-w-2xl text-base text-gray-700 sm:text-lg">{t('message')}</p>
      </div>
    </main>
  );
}

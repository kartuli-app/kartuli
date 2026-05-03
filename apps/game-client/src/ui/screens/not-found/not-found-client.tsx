'use client';

import { useNavigation } from '@game-client/navigation/navigation-context';
import { useTranslation } from 'react-i18next';

export function NotFoundClient() {
  const { localizedPathname } = useNavigation();
  const { t } = useTranslation('notFound');

  return (
    <main>
      <h1>{t('heading')}</h1>
      <p>{localizedPathname}</p>
      <p>{t('message')}</p>
    </main>
  );
}

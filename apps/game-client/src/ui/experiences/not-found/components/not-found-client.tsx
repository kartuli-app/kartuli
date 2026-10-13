'use client';

import { useNavigation } from '@game-client/navigation/navigation-context';
import { NotFoundContent } from '@game-client/ui/experiences/not-found/components/not-found-content';
import { useTranslation } from 'react-i18next';

export function NotFoundClient() {
  const { localizedPathname } = useNavigation();
  const { t } = useTranslation('notFound');

  return (
    <NotFoundContent heading={t('heading')} message={t('message')} pathname={localizedPathname} />
  );
}

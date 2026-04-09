'use client';

import { useNavigation } from '@game-client/navigation/navigation-context';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { RiWifiOffLine } from 'react-icons/ri';

export function OfflineIndicator() {
  const { navigationMode } = useNavigation();
  const { t } = useTranslation('common');
  if (navigationMode === 'next') return null;
  return (
    <div
      className={clsx(
        //
        'absolute',
        'top-0',
        'left-0 right-0',
        'flex justify-end items-center',
        'text-brand-primary-500',
      )}
    >
      <RiWifiOffLine
        className="size-5 text-brand-primary-500"
        aria-label={t('app_bar.offline_indicator')}
        title={t('app_bar.offline_indicator')}
      />
    </div>
  );
}

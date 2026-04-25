'use client';
import { useNavigation } from '@game-client/navigation/navigation-context';
import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function NotFoundClient() {
  const { localizedPathname } = useNavigation();
  const { t } = useTranslation('notFound');
  return (
    <ResponsiveContainer
      className={clsx('justify-center', 'py-ds1-spacing-xlarge', 'sm:py-ds1-spacing-2xlarge')}
    >
      <div className={clsx('flex flex-col', 'gap-ds1-spacing-large')}>
        <h2 className={clsx('text-3xl', 'text-center')}>{t('heading')}</h2>
        <h3 className={clsx('text-xl font-bold pb-ds1-spacing-2xlarge', 'text-center')}>
          {localizedPathname}
        </h3>
        <picture>
          <source srcSet="/images/not-found.svg" type="image/svg+xml" />
          <img src="/images/not-found.svg" alt={t('heading')} className="max-h-[40vh] mx-auto" />
        </picture>
      </div>
    </ResponsiveContainer>
  );
}

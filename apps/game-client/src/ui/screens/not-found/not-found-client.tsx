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
      className={clsx('justify-center', 'py-brand-xlarge', 'sm:py-brand-2xlarge')}
    >
      <div className={clsx('flex flex-col', 'gap-brand-large')}>
        <h1 className={clsx('text-3xl', 'text-center')}>{t('heading')}</h1>
        <h2 className={clsx('text-xl font-bold pb-brand-2xlarge', 'text-center')}>
          {localizedPathname}
        </h2>
        <picture>
          <source srcSet="/images/not-found.svg" type="image/svg+xml" />
          <img src="/images/not-found.svg" alt={t('heading')} className="max-h-[50vh] mx-auto" />
        </picture>
      </div>
    </ResponsiveContainer>
  );
}

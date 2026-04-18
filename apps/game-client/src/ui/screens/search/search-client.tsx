'use client';
import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function SearchClient() {
  const { t } = useTranslation('search');
  return (
    <ResponsiveContainer
      className={clsx('justify-center', 'py-brand-xlarge', 'sm:py-brand-2xlarge')}
    >
      <div className={clsx('flex flex-col', 'gap-brand-large')}>
        <h2 className={clsx('text-3xl pb-brand-2xlarge', 'text-center')}>{t('heading')}</h2>
        <picture>
          <source srcSet="/images/search.svg" type="image/svg+xml" />
          <img src="/images/search.svg" alt={t('heading')} className="max-h-[50vh] mx-auto" />
        </picture>
      </div>
    </ResponsiveContainer>
  );
}

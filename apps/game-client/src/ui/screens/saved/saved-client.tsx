'use client';
import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function SavedClient() {
  const { t } = useTranslation('saved');
  return (
    <ResponsiveContainer
      className={clsx('justify-center', 'py-brand-xlarge', 'sm:py-brand-2xlarge')}
    >
      <div className={clsx('flex flex-col', 'gap-brand-large')}>
        <h2 className={clsx('text-3xl pb-brand-2xlarge', 'text-center')}>{t('heading')}</h2>
        <picture>
          <source srcSet="/images/saved.svg" type="image/svg+xml" />
          <img src="/images/saved.svg" alt={t('heading')} className="max-h-[40vh] mx-auto" />
        </picture>
      </div>
    </ResponsiveContainer>
  );
}

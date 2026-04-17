'use client';
import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function PrivacyClient() {
  const { t } = useTranslation('privacy');
  return (
    <ResponsiveContainer
      className={clsx('justify-center', 'py-brand-xlarge', 'sm:py-brand-2xlarge')}
    >
      <div className={clsx('flex flex-col', 'gap-brand-large')}>
        <h1 className={clsx('text-3xl pb-brand-2xlarge', 'text-center')}>{t('heading')}</h1>
        <picture>
          <source srcSet="/images/privacy.svg" type="image/svg+xml" />
          <img src="/images/privacy.svg" alt={t('heading')} className="max-h-[40vh] mx-auto" />
        </picture>
      </div>
    </ResponsiveContainer>
  );
}

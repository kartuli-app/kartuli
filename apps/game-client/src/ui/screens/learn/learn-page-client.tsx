'use client';
import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function LearnClient() {
  const { t } = useTranslation('learn');
  return (
    <ResponsiveContainer
      className={clsx('justify-center', 'py-ds1-spacing-xlarge', 'sm:py-ds1-spacing-2xlarge')}
    >
      <div className={clsx('flex flex-col', 'gap-ds1-spacing-large')}>
        <h2 className={clsx('text-3xl', 'text-center')}>{t('heading')}</h2>
      </div>
    </ResponsiveContainer>
  );
}

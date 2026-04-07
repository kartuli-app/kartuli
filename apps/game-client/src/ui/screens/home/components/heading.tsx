'use client';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function Heading() {
  const { t } = useTranslation('home');

  return (
    <div className={clsx('flex flex-col', 'gap-brand-large')}>
      <h1 className={clsx('text-5xl', 'text-center')}>👋 გამარჯობა {t('anon')}</h1>
      <h2 className={clsx('text-3xl font-bold', 'text-center')}>{t('heading')}</h2>
    </div>
  );
}

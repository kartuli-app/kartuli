'use client';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function Heading() {
  const { t } = useTranslation('home');

  return (
    <div className={clsx('flex flex-col', 'gap-ds1-spacing-large')}>
      <h2 className={clsx('text-5xl', 'text-center')}>
        👋 <span className="font-georgian">გამარჯობა</span> {t('anon')}
      </h2>
      <h3 className={clsx('text-3xl font-bold', 'text-center')}>{t('heading')}</h3>
    </div>
  );
}

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function HomeHeading({ className }: { className?: string }) {
  const { t } = useTranslation('common');
  return (
    <div className={clsx('flex flex-col', 'gap-brand-regular', className)}>
      <h1 className={clsx('text-5xl')}>გამარჯობა anon</h1>
      <h2 className={clsx('text-3xl font-bold')}>{t('homeHeading')}</h2>
    </div>
  );
}

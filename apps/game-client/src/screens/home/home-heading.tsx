import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function HomeHeading() {
  const { t } = useTranslation('common');
  return (
    <div className={clsx('flex flex-col', 'gap-brand-regular')}>
      <h1 className={clsx('text-5xl', 'text-center')}>გამარჯობა {t('anon')}</h1>
      <h2 className={clsx('text-3xl font-bold', 'text-center')}>{t('homeHeading')}</h2>
    </div>
  );
}

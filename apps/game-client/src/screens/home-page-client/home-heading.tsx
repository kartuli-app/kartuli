import type { SupportedLng } from '@game-client/i18n/supported-locales';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export function HomeHeading({ language }: Readonly<{ language: SupportedLng }>) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const handleLearnClick = () => {
    router.push(`/${language}/learn`);
  };

  return (
    <div className={clsx('flex flex-col', 'gap-brand-regular')}>
      <h1 className={clsx('text-5xl', 'text-center')}>გამარჯობა {t('anon')}</h1>
      <h2 className={clsx('text-3xl font-bold', 'text-center')}>{t('homeHeading')}</h2>
      <button type="button" onClick={handleLearnClick}>
        Go to learn page
      </button>
    </div>
  );
}

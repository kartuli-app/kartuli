'use client';
import { LanguageSelectHybrid } from '@game-client/i18n/language-select-hybrid';
import type { SupportedLng } from '@game-client/i18n/supported-locales';
import clsx from 'clsx';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export function LearnBarContentHybrid({ language }: Readonly<{ readonly language: SupportedLng }>) {
  const router = useRouter();
  const handleBack = () => {
    router.push(`/${language}`);
  };
  const { t } = useTranslation('learn');

  return (
    <>
      <div className="flex items-center gap-4">
        <button type="button" onClick={handleBack}>
          <ArrowLeftIcon className="size-4" />
        </button>
        <div className={clsx('text-3xl', 'font-bold')}>kartuli.app / {t('title')}</div>
      </div>
      <div className="flex gap-brand-regular">
        <LanguageSelectHybrid language={language} />
      </div>
    </>
  );
}

import { LanguageSelectHybrid } from '@game-client/i18n/language-select-hybrid';
import type { SupportedLng } from '@game-client/i18n/supported-locales';
import clsx from 'clsx';

export function HomeBarContentHybrid({ language }: Readonly<{ readonly language: SupportedLng }>) {
  return (
    <>
      <div className={clsx('text-3xl', 'font-bold')}>kartuli.app</div>
      <div className="flex gap-brand-regular">
        <LanguageSelectHybrid language={language} />
      </div>
    </>
  );
}

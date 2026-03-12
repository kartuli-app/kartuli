import { LanguageSelect } from '@game-client/i18n/language-select';
import clsx from 'clsx';

export function HomeBarContent() {
  return (
    <>
      <div className={clsx('text-3xl', 'font-bold')}>kartuli.app</div>
      <div className="flex gap-brand-regular">
        <LanguageSelect />
      </div>
    </>
  );
}

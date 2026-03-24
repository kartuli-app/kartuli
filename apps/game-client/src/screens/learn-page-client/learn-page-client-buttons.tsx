'use client';

import { useTranslation } from 'react-i18next';

export function LearnPageClientButtons() {
  const { t } = useTranslation('learn');
  const handlePlay = () => {
    console.warn('🚨 play button clicked');
  };
  return (
    <button
      type="button"
      onClick={handlePlay}
      className="rounded border border-gray-700 bg-gray-700 px-4 py-2 text-white"
    >
      {t('play')}
    </button>
  );
}

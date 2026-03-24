'use client';

import { useTranslation } from 'react-i18next';

export function LearnPageClientButtons() {
  const { t } = useTranslation('learn');
  const handlePLay = () => {
    alert('play');
  };
  return (
    <button
      type="button"
      onClick={handlePLay}
      className="rounded border border-gray-700 bg-gray-700 px-4 py-2 text-white"
    >
      {t('play')}
    </button>
  );
}

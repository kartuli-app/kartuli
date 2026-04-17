'use client';

import {
  buttonIconClassNames,
  iconClassNames,
} from '@game-client/ui/shared/components/game-app-bar/game-app-bar-elements';
import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6';

export function SoundToggle() {
  const { t } = useTranslation('common');
  const [isVolumeMuted, setIsVolumeMuted] = useState(false);
  const actionLabel = isVolumeMuted ? t('app_bar.enable_sound') : t('app_bar.disable_sound');
  return (
    <button
      className={clsx(iconClassNames, buttonIconClassNames)}
      type="button"
      onClick={() => setIsVolumeMuted(!isVolumeMuted)}
      aria-pressed={isVolumeMuted}
      aria-label={actionLabel}
      title={actionLabel}
    >
      {isVolumeMuted ? <FaVolumeXmark className="size-5" /> : <FaVolumeHigh className="size-5" />}
    </button>
  );
}

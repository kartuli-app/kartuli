import { iconClassNames } from '@game-client/ui/shared/components/game-app-bar/game-app-bar-elements';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function Mascot() {
  const { t } = useTranslation('common');
  return (
    <div className={clsx(iconClassNames)}>
      <picture>
        <source srcSet="/images/mascot-64.webp" type="image/webp" />
        <img
          className="scale-110 sm:scale-140 size-11"
          src="/images/mascot-64.png"
          alt={t('app_bar.mascot')}
        />
      </picture>
    </div>
  );
}

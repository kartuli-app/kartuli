'use client';

import { useNavigation } from '@game-client/navigation/navigation-context';
import {
  buttonIconClassNames,
  iconClassNames,
} from '@game-client/ui/shared/components/game-app-bar/game-app-bar-elements';
import { cn } from '@kartuli/ui/utils/cn';
import { useTranslation } from 'react-i18next';
import { BiSearchAlt } from 'react-icons/bi';

export function SearchButton() {
  const { NavigationLink } = useNavigation();
  const { i18n, t } = useTranslation('common');
  const currentLocale = i18n.resolvedLanguage;
  return (
    <div className={cn('overflow-hidden')}>
      <NavigationLink
        className={cn(iconClassNames, buttonIconClassNames)}
        href={`/${currentLocale}/search`}
        aria-label={t('app_bar.search')}
      >
        <BiSearchAlt className="size-5" />
      </NavigationLink>
    </div>
  );
}

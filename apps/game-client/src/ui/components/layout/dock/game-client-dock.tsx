'use client';

import { getLocalizedPathnameForLocale } from '@game-client/i18n/locale-utils';
import { useCurrentRouteLocale, useNavigation } from '@game-client/navigation';
import {
  type GameClientDockItemId,
  gameClientDockItems,
} from '@game-client/ui/components/layout/dock/game-client-dock-items';
import { Dock } from '@kartuli/ui/components/layout/dock/dock';
import { DockItem } from '@kartuli/ui/components/layout/dock/dock-item';
import { useTranslation } from 'react-i18next';

export interface GameClientDockProps {
  activeItemId?: GameClientDockItemId;
}

export function GameClientDock({ activeItemId }: Readonly<GameClientDockProps>) {
  const { t } = useTranslation('common');
  const locale = useCurrentRouteLocale();
  const { NavigationLink } = useNavigation();

  return (
    <Dock aria-label={t('dock.navigation')}>
      {gameClientDockItems.map((item) => {
        const localizedHref = getLocalizedPathnameForLocale(item.href, locale);
        const label = t(`dock.${item.id}`);
        return (
          <DockItem
            key={item.id}
            label={label}
            href={localizedHref}
            icon={item.icon}
            activeIcon={item.activeIcon}
            active={item.id === activeItemId}
            linkComponent={NavigationLink}
          />
        );
      })}
    </Dock>
  );
}

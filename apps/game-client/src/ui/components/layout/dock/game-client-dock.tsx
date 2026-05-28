'use client';

import { getLocalizedPathnameForLocale } from '@game-client/i18n/locale-utils';
import { useCurrentRouteLocale } from '@game-client/navigation';
import { Dock } from '@game-client/ui/components/layout/dock/dock';
import { DockItem } from '@game-client/ui/components/layout/dock/dock-item';
import {
  type GameClientDockItemId,
  gameClientDockItems,
} from '@game-client/ui/components/layout/dock/game-client-dock-items';
import { useTranslation } from 'react-i18next';

export interface GameClientDockProps {
  activeItemId?: GameClientDockItemId;
}

export function GameClientDock({ activeItemId }: Readonly<GameClientDockProps>) {
  const { t } = useTranslation('common');
  const locale = useCurrentRouteLocale();

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
          />
        );
      })}
    </Dock>
  );
}

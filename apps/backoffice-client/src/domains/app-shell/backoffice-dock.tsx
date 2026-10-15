'use client';

import { Dock } from '@kartuli/ui/components/layout/dock/dock';
import { DockItem, type DockItemLinkProps } from '@kartuli/ui/components/layout/dock/dock-item';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { backofficeNavigationItems } from './backoffice-navigation';

function BackofficeLink({ children, ...props }: Readonly<DockItemLinkProps>) {
  return <NextLink {...props}>{children}</NextLink>;
}

export function BackofficeDock() {
  const pathname = usePathname();

  return (
    <Dock ariaLabel="Primary navigation">
      {backofficeNavigationItems.map((item) => (
        <DockItem
          key={item.id}
          href={item.href}
          label={item.label}
          icon={item.icon}
          activeIcon={item.activeIcon}
          active={pathname === item.href}
          linkComponent={BackofficeLink}
        />
      ))}
    </Dock>
  );
}

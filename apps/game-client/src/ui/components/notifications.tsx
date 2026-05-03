'use client';

import { Toast } from '@base-ui/react/toast';
import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';

const notificationManager = Toast.createToastManager();

interface ShowNotificationOptions {
  description: ReactNode;
  timeout?: number;
}

export function showNotification({
  description,
  timeout = 3200,
}: Readonly<ShowNotificationOptions>) {
  notificationManager.add({ description, timeout });
}

function NotificationViewport() {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport className={cn('pointer-events-none', 'fixed', 'inset-0', 'z-50')}>
        {toasts.map((toast) => (
          <Toast.Positioner
            align="center"
            side="top"
            sideOffset={16}
            key={toast.id}
            toast={toast}
            className={cn('pointer-events-none')}
          >
            <Toast.Root toast={toast}>
              <Toast.Content className={cn('pointer-events-auto', 'border', 'bg-white', 'p-2')}>
                <Toast.Description />
              </Toast.Content>
            </Toast.Root>
          </Toast.Positioner>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export function Notifications({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Toast.Provider toastManager={notificationManager}>
      {children}
      <NotificationViewport />
    </Toast.Provider>
  );
}

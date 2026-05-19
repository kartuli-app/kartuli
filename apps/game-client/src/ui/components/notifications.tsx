'use client';

import { Toast } from '@base-ui/react/toast';
import { cn } from '@kartuli/ui/utils/cn';
import type { ReactNode } from 'react';
import { floatingSurfaceClassName } from './floating-surface';

const notificationManager = Toast.createToastManager();

interface ShowNotificationOptions {
  description: ReactNode;
  timeout?: number;
}

export function showNotification({
  description,
  timeout = 32000,
}: Readonly<ShowNotificationOptions>) {
  notificationManager.add({ description, timeout });
}

function NotificationViewport() {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport
        className={cn(
          'pointer-events-none',
          'fixed',
          'inset-0',
          'z-50',
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'gap-p-spacing-3',
          'p-p-spacing-4',
        )}
      >
        {toasts.map((toast) => (
          <Toast.Root key={toast.id} toast={toast} className={cn('pointer-events-auto', 'w-auto')}>
            <Toast.Content
              className={cn(
                floatingSurfaceClassName,
                'overflow-hidden',
                'p-2',
                'rounded-p-radius-1',
                'text-xl',
              )}
            >
              <Toast.Description />
            </Toast.Content>
          </Toast.Root>
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

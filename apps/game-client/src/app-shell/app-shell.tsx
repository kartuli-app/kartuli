import { I18nShell } from '@game-client/i18n/I18n-shell';
import { RouterProvider } from '@game-client/router-outlet/router-context';
import { RouterOutlet } from '@game-client/router-outlet/router-outlet';
import { PWANotifications } from '@game-client/service-worker/pwa-notifications/pwa-notifications';

interface AppShellProps {
  readonly initialPath: string;
}

export function AppShell({ initialPath }: AppShellProps) {
  return (
    <div className="flex flex-1 flex-col">
      <RouterProvider initialPath={initialPath}>
        <I18nShell>
          <PWANotifications />
          <RouterOutlet />
        </I18nShell>
      </RouterProvider>
    </div>
  );
}

'use client';
import { I18nShell } from '@game-client/i18n/I18n-shell';
import { RouterProvider } from '@game-client/router-outlet/router-context';
import { RouterOutlet } from '@game-client/router-outlet/router-outlet';
import { PWANotifications } from '@game-client/service-worker/pwa-notifications/pwa-notifications';
import { Banner, BannerMessage } from '@kartuli/ui/components/banner/banner';

interface SpaShellProps {
  readonly initialPath: string;
}

export function SpaShell({ initialPath }: SpaShellProps) {
  return (
    <div className="flex flex-1 flex-col">
      <RouterProvider initialPath={initialPath}>
        <I18nShell>
          <Banner
            onDismiss={() => {}}
            dismissLabel="Dismiss"
            testId="test-banner"
            actions={[{ label: 'Action test', onClick: () => {} }]}
          >
            <BannerMessage>Action test</BannerMessage>
          </Banner>
          <PWANotifications />
          <RouterOutlet />
        </I18nShell>
      </RouterProvider>
    </div>
  );
}

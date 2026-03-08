import { I18nShell } from '@game-client/i18n/I18n-shell';
import { LanguageSwitcher } from '@game-client/i18n/language-switcher';
import { RouterProvider } from '@game-client/router-outlet/router-context';
import { RouterOutlet } from '@game-client/router-outlet/router-outlet';
import { ServiceWorkerBanner } from '@game-client/service-worker/service-worker-banner';

interface AppShellProps {
  readonly initialPath: string;
}

export function AppShell({ initialPath }: AppShellProps) {
  return (
    <div className="flex flex-1 flex-col">
      <RouterProvider initialPath={initialPath}>
        <I18nShell>
          <ServiceWorkerBanner />
          <header className="flex shrink-0 justify-end border-b border-border px-4 py-2">
            <LanguageSwitcher />
          </header>
          <RouterOutlet />
        </I18nShell>
      </RouterProvider>
    </div>
  );
}

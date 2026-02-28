import { I18nShell } from '../i18n/I18nShell';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { ServiceWorkerBanner } from '../service-worker/service-worker-banner';
import { AppShellOutlet } from './app-shell-outlet';
import { RouterProvider } from './router-context';

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
          <AppShellOutlet />
        </I18nShell>
      </RouterProvider>
    </div>
  );
}

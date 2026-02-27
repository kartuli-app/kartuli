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
        <ServiceWorkerBanner />
        <AppShellOutlet />
      </RouterProvider>
    </div>
  );
}

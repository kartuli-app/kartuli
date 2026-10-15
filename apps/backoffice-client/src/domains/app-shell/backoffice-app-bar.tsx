import { AppBar } from '@kartuli/ui/components/layout/app-bar/app-bar';

export function BackofficeAppBar() {
  return (
    <AppBar
      title={
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center uppercase">
          <div className="text-s-color-shell-content-secondary w-full truncate text-xs font-bold">
            kartuli.app
          </div>
          <div className="text-s-color-shell-content-primary w-full truncate text-lg font-black">
            Backoffice
          </div>
        </div>
      }
    />
  );
}

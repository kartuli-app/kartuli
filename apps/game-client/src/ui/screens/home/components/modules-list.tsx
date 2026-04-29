import type { HomeModule } from '@game-client/ui/screens/home/view/home-view';
import clsx from 'clsx';
import { ModuleCard } from './module-card';

export function ModulesList({ homeModules }: Readonly<{ homeModules: HomeModule[] }>) {
  return (
    <div
      className={clsx(
        //
        'flex flex-col',
        'gap-ds1-spacing-xlarge',
        'w-full',
      )}
    >
      {homeModules.map((module) => {
        return <ModuleCard key={module.id} homeModule={module} />;
      })}
    </div>
  );
}

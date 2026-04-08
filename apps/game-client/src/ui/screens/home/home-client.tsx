import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
import { cn } from '@kartuli/ui/utils/cn';
import { Heading } from './components/heading';
import { ModulesList } from './components/modules-list';
import type { HomeView } from './view/home-view';

export function HomeClient({
  homeView,
}: Readonly<{
  readonly homeView: HomeView;
}>) {
  return (
    <>
      <ResponsiveContainer
        className={cn('justify-center', 'py-brand-xlarge', 'sm:py-brand-3xlarge')}
      >
        <Heading />
      </ResponsiveContainer>
      <ResponsiveContainer className={cn('pb-brand-xlarge')}>
        <ModulesList homeModules={homeView.modules} />
      </ResponsiveContainer>
    </>
  );
}

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
        className={cn('justify-center', 'py-ds1-spacing-xlarge', 'sm:py-ds1-spacing-3xlarge')}
      >
        <Heading />
      </ResponsiveContainer>
      <ResponsiveContainer className={cn('pb-ds1-spacing-xlarge')}>
        <ModulesList homeModules={homeView.modules} />
      </ResponsiveContainer>
    </>
  );
}

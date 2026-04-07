import { ResponsiveContainer } from '@kartuli/ui/components/containers/responsive-container';
import clsx from 'clsx';
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
        className={clsx('justify-center', 'py-brand-xlarge', 'sm:py-brand-2xlarge')}
      >
        <Heading />
      </ResponsiveContainer>
      <ResponsiveContainer className={clsx('pb-brand-xlarge')}>
        <ModulesList homeModules={homeView.modules} />
      </ResponsiveContainer>
    </>
  );
}

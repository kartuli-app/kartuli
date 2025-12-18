import { clsx } from 'clsx';
import { Box } from '@/domains/shared/components/box';
import { Container } from '@/domains/shared/components/container';
import { AppDockLinks } from './app-dock-links';
import { AppDockMenu } from './app-dock-menu';

export function AppDock() {
  return (
    <Container
      className={clsx(
        'justify-center items-center',
        'lg:items-start',
        'lg:absolute',
        'lg:w-auto',
        'lg:h-full',
        'lg:left-0',
        'lg:top-0',
        'bg-slate-800',
      )}
    >
      <Box
        className={clsx(
          'bg-slate-800',
          'w-auto',
          'py-1',
          'lg:px-2 lg:py-0',
          'border',
          'justify-center',
          //
          'lg:flex-col',
          'lg:justify-start',
          'lg:items-center',
          // 'gap-4',
          'gap-2',
        )}
      >
        <AppDockLinks />
        <AppDockMenu />
      </Box>
    </Container>
  );
}

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
        'p-1',
        'lg:items-start',
        'lg:absolute',
        'lg:w-auto',
        'lg:h-auto',
        'lg:left-0',
        'lg:top-0',
        'bg-slate-800',
      )}
    >
      <Box
        className={clsx(
          'bg-slate-800',
          'w-auto',
          'rounded-xl',
          'px-4 py-1',
          'lg:px-2 lg:py-4',
          'border',
          'justify-center',
          //
          'lg:flex-col',
          'lg:justify-start',
          'lg:items-center',
          // 'gap-4',
          'gap-1',
        )}
      >
        <AppDockLinks />
        <AppDockMenu />
      </Box>
    </Container>
  );
}

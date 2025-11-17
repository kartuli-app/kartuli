import { clsx } from 'clsx';
import { Box } from '@/app/app/box';
import { Container } from '@/app/app/container';
import { AppDockLinks } from './app-dock-links';
import { AppDockMenu } from './app-dock-menu';

export function AppDock() {
  return (
    <Container
      className={clsx(
        'justify-center items-center',
        'p-2',
        'lg:items-start',
        'lg:absolute',
        'lg:w-auto',
        'lg:h-auto',
        'lg:left-0',
        'lg:top-0',
      )}
    >
      <Box
        className={clsx(
          'w-full',
          // 'border',
          'justify-between',
          //
          'lg:flex-col',
          'lg:justify-start',
          'lg:items-center',
          'gap-4',
        )}
      >
        <AppDockMenu />
        <AppDockLinks />
      </Box>
    </Container>
  );
}

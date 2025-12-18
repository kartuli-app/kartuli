'use client';
import { clsx } from 'clsx';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { Box } from '@/domains/shared/components/box';
import { Container } from '@/domains/shared/components/container';
import { routeUtils } from '@/domains/app/routes/route-utils';
import { ResponsiveContainer } from '@/domains/shared/components/responsive-container';
import { AppBarBackButton } from './app-bar-back-button';
import { AppBarMascot } from './app-bar-mascot';
import { AppBarSoundToggle } from './app-bar-sound-toggle';
import { AppBarTitle } from './app-bar-title';

export function AppBar() {
  const pathname = usePathname();
  const showBackButton = routeUtils.shouldShowBackButton(pathname);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Container
      className={clsx(
        //
        'bg-red-600',
        'p-2',
      )}
    >
      <ResponsiveContainer
        className={clsx(
          //
          'bg-red-300',
        )}
      >
        {/* left side: back button, mascot, title */}
        <motion.div layout className="flex w-7/8 items-center gap-2">
          <AnimatePresence initial={false}>
            {showBackButton && (
              <motion.div
                key="app-bar-back-button"
                layout
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: -12,
                      }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        x: 0,
                      }
                }
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: -12,
                      }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.1,
                  ease: 'easeOut',
                }}
              >
                <AppBarBackButton />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div layout>
            <AppBarMascot />
          </motion.div>
          <motion.div layout className="w-full">
            <AppBarTitle />
          </motion.div>
        </motion.div>
        {/* right side: sound toggle */}
        <Box
          className={clsx(
            //
            'w-1/8',
            'justify-end',
            // 'border',
          )}
        >
          <AppBarSoundToggle />
        </Box>
      </ResponsiveContainer>
    </Container>
  );
}

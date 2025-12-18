'use client';

import { clsx } from 'clsx';
import { motion, useAnimationControls, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { Activity, useLayoutEffect, useMemo, useRef } from 'react';
import { Container } from '@/domains/shared/components/container';
import { HubModeSwitch } from '@/domains/app/components/hub-mode-switch';
import { routeUtils } from '@/domains/app/routes/route-utils';
import { ROUTES } from '@/domains/app/routes/routes';
import { ForYouPage } from '@/domains/app/pages/for-you-page';
import { FreestylePage } from '@/domains/app/pages/freestyle-page';
import { ProfilePage } from '@/domains/app/pages/profile-page';
import { SavedPage } from '@/domains/app/pages/saved-page';
import { SearchPage } from '@/domains/app/pages/search-page';

const activityVariants = {
  exit: {
    opacity: 0,
    y: 200,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
};

const animatedWrapperClassName =
  'w-full h-full flex flex-1 flex-col overflow-y-auto px-2 py-2 pb-4 lg:pb-2';

function AnimatedActivityWrapper({
  route,
  pathname,
  controls,
  className,
  children,
}: {
  route: string;
  pathname: string;
  controls: ReturnType<typeof useAnimationControls> | null;
  className?: string;
  children: React.ReactNode;
}) {
  if (!controls) return null;

  return (
    <motion.div
      animate={controls}
      variants={activityVariants}
      initial={pathname !== route ? { opacity: 0 } : undefined}
      style={{ willChange: 'opacity' }}
      className={clsx(animatedWrapperClassName, className)}
    >
      {children}
    </motion.div>
  );
}

function AnimatedPageWrapper({
  pathname,
  controls,
  className,
  children,
}: {
  pathname: string;
  controls: ReturnType<typeof useAnimationControls>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key={pathname}
      animate={controls}
      variants={activityVariants}
      style={{ willChange: 'opacity' }}
      className={clsx(animatedWrapperClassName, className)}
    >
      {children}
    </motion.div>
  );
}

interface ContentProps {
  children: React.ReactNode;
}

export function AppContent({ children }: ContentProps) {
  const pathname = usePathname();
  const activityRoutes = routeUtils.getActivityRoutes();
  const isActivityRoute = activityRoutes.includes(pathname);
  const prefersReducedMotion = useReducedMotion();

  const forYouControls = useAnimationControls();
  const freestyleControls = useAnimationControls();
  const profileControls = useAnimationControls();
  const savedControls = useAnimationControls();
  const searchControls = useAnimationControls();

  const regularPageControls = useAnimationControls();

  const controlsMap = useMemo(
    () =>
      new Map([
        [ROUTES.FOR_YOU.path, forYouControls],
        [ROUTES.FREESTYLE.path, freestyleControls],
        [ROUTES.PROFILE.path, profileControls],
        [ROUTES.SAVED.path, savedControls],
        [ROUTES.SEARCH.path, searchControls],
      ]),
    [forYouControls, freestyleControls, profileControls, savedControls, searchControls],
  );

  const getControlsForRoute = (route: string): ReturnType<typeof useAnimationControls> => {
    return controlsMap.get(route as Parameters<typeof controlsMap.get>[0]) ?? regularPageControls;
  };

  const isInitialMount = useRef(true);
  const isAnimatingRef = useRef(false);
  const previousPathnameRef = useRef(pathname);

  useLayoutEffect(() => {
    if (isInitialMount.current) {
      activityRoutes.forEach((route) => {
        const controls = getControlsForRoute(route);
        if (route === pathname) {
          controls.set({ opacity: 1 });
        } else {
          controls.set({ opacity: 0 });
        }
      });

      if (!isActivityRoute) {
        regularPageControls.set({ opacity: 1 });
      } else {
        regularPageControls.set({ opacity: 0 });
      }

      isInitialMount.current = false;
      previousPathnameRef.current = pathname;
      return;
    }

    if (previousPathnameRef.current === pathname) return;

    const previousRoute = previousPathnameRef.current;
    const previousIsActivity = activityRoutes.includes(previousRoute);
    const currentIsActivity = activityRoutes.includes(pathname);

    if (isAnimatingRef.current) return;

    const previousControls = getControlsForRoute(previousRoute);
    const currentControls = getControlsForRoute(pathname);

    if (prefersReducedMotion) {
      previousControls?.stop();
      currentControls?.stop();
      previousControls?.set({ opacity: 0 });
      currentControls?.set({ opacity: 1 });
      previousPathnameRef.current = pathname;
      return;
    }

    if (previousControls && currentControls) {
      if (!previousIsActivity && !currentIsActivity) {
        currentControls.stop();
        currentControls.set({ opacity: 0 });

        isAnimatingRef.current = true;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            currentControls
              .start('enter', {
                duration: 0.3,
                ease: 'easeInOut',
              })
              .then(() => {
                isAnimatingRef.current = false;
              })
              .catch(() => {
                isAnimatingRef.current = false;
              });
          });
        });
      } else {
        isAnimatingRef.current = true;

        currentControls.set({ opacity: 0 });

        previousControls
          .start('exit', {
            duration: 0.2,
            ease: 'easeInOut',
          })
          .then(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                currentControls
                  .start('enter', {
                    duration: 0.3,
                    ease: 'easeInOut',
                  })
                  .then(() => {
                    isAnimatingRef.current = false;
                  });
              });
            });
          });
      }
    }

    previousPathnameRef.current = pathname;
  }, [
    pathname,
    controlsMap,
    isActivityRoute,
    regularPageControls,
    prefersReducedMotion,
    activityRoutes,
  ]);

  const showHubModeSwitch = routeUtils.isHubPage(pathname);

  return (
    <Container
      className={clsx(
        //
        // 'bg-orange-100',
        //
        'flex-col',
        'flex-1 overflow-hidden',
      )}
    >
      {showHubModeSwitch && <HubModeSwitch />}

      <Activity mode={pathname === ROUTES.FOR_YOU.path ? 'visible' : 'hidden'}>
        <AnimatedActivityWrapper
          route={ROUTES.FOR_YOU.path}
          pathname={pathname}
          controls={getControlsForRoute(ROUTES.FOR_YOU.path)}
        >
          <ForYouPage />
        </AnimatedActivityWrapper>
      </Activity>
      <Activity mode={pathname === ROUTES.FREESTYLE.path ? 'visible' : 'hidden'}>
        <AnimatedActivityWrapper
          route={ROUTES.FREESTYLE.path}
          pathname={pathname}
          controls={getControlsForRoute(ROUTES.FREESTYLE.path)}
        >
          <FreestylePage />
        </AnimatedActivityWrapper>
      </Activity>
      <Activity mode={pathname === ROUTES.PROFILE.path ? 'visible' : 'hidden'}>
        <AnimatedActivityWrapper
          route={ROUTES.PROFILE.path}
          pathname={pathname}
          controls={getControlsForRoute(ROUTES.PROFILE.path)}
        >
          <ProfilePage />
        </AnimatedActivityWrapper>
      </Activity>
      <Activity mode={pathname === ROUTES.SAVED.path ? 'visible' : 'hidden'}>
        <AnimatedActivityWrapper
          route={ROUTES.SAVED.path}
          pathname={pathname}
          controls={getControlsForRoute(ROUTES.SAVED.path)}
        >
          <SavedPage />
        </AnimatedActivityWrapper>
      </Activity>
      <Activity mode={pathname === ROUTES.SEARCH.path ? 'visible' : 'hidden'}>
        <AnimatedActivityWrapper
          route={ROUTES.SEARCH.path}
          pathname={pathname}
          controls={getControlsForRoute(ROUTES.SEARCH.path)}
        >
          <SearchPage />
        </AnimatedActivityWrapper>
      </Activity>

      {!isActivityRoute && (
        <AnimatedPageWrapper key={pathname} pathname={pathname} controls={regularPageControls}>
          {children}
        </AnimatedPageWrapper>
      )}
    </Container>
  );
}

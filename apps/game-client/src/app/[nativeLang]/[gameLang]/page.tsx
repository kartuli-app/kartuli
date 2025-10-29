'use client';

import { clsx } from 'clsx';
import { useEffect } from 'react';
import { Mascot } from './mascot';
import { useMascot } from './mascot-context';
import { RecommendedGameCard } from './recommended-game-card';
import { INITIAL_METADATA, INITIAL_SEQUENCE } from './sequences';

export default function Page() {
  console.log('Page');
  const { playSequence, shouldPlayInitialSequence } = useMascot();

  // Trigger initial sequence only once (across all navigation)
  useEffect(() => {
    if (shouldPlayInitialSequence()) {
      console.log('useEffect call to playSequence (first time)');
      playSequence(INITIAL_SEQUENCE, INITIAL_METADATA);
    } else {
      console.log('useEffect skipped - initial sequence already played');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={clsx('flex flex-col w-full', 'p-2', 'justify-start', 'items-center', 'gap-4')}>
      {/* Mascot Component */}
      <Mascot />

      {/* Existing Cards */}
      <RecommendedGameCard />
    </div>
  );
}

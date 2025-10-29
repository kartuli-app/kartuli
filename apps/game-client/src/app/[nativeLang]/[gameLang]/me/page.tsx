'use client';

import { clsx } from 'clsx';
import { RecommendedGameCard } from '../recommended-game-card';

export default function Page() {
  console.log('Me page');
  return (
    <div className={clsx('flex flex-col w-full pt-15 flex-1 h-full')}>
      <img
        src="/undraw_loving-it_hspq.svg"
        className={clsx('w-64', 'h-64', 'bg-transparent', 'mx-auto')}
        alt="Loving It"
        aria-label="Loving It"
      />
      <h1 className={clsx('text-3xl p-4', 'font-bold')}>Profile</h1>
      <RecommendedGameCard />
    </div>
  );
}

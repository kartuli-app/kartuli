'use client';

import { clsx } from 'clsx';

export default function Page() {
  return (
    <div className={clsx('flex flex-col w-full')}>
      <img
        src="/undraw_loving-it_hspq.svg"
        className={clsx('w-full', 'h-64', 'bg-yellow-500')}
        alt="Loving It"
        aria-label="Loving It"
      />
      <h1 className={clsx('text-3xl p-4', 'font-bold')}>More</h1>
    </div>
  );
}

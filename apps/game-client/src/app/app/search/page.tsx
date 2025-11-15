'use client';

import { clsx } from 'clsx';
import { useState } from 'react';
import { ResponsiveContainer } from '../responsive-container';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <ResponsiveContainer className={clsx('justify-center items-center flex-col', 'flex-1')}>
      <div className={clsx('w-full h-full max-h-96')}>
        <div className={clsx('w-full h-full max-h-96')}>
          <img src="/search.svg" alt="Search" className={clsx('w-full h-full')} />
        </div>
      </div>
      <div className={clsx('w-full max-w-md mt-6')}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type to test activity state…"
          className={clsx(
            'w-full rounded-md border border-white/40 bg-white/10 p-3 text-base text-white',
            'placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white',
          )}
          type="text"
        />
      </div>
    </ResponsiveContainer>
  );
}

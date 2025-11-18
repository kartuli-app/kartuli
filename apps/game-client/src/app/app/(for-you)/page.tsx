'use client';

import { clsx } from 'clsx';
import { ResponsiveContainer } from '../responsive-container';

export default function ForYouPage() {
  return (
    <ResponsiveContainer
      className={clsx(
        //
        'flex-col',
        'flex-1',
        'p-2',
      )}
    >
      {/* content wrapper */}
      <div
        className={clsx(
          //
          'flex-1 flex flex-col',
          'justify-center items-center',
          'border',
        )}
      >
        <h1>Hello new premium layout</h1>
        {/* <Stats/> */}
        {/* <RecommendedGame/> */}
        {/* <Actions/> */}
      </div>
    </ResponsiveContainer>
  );
}

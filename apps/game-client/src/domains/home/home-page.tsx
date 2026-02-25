'use client';

import { useRouterContext } from '../app-shell/router-context';

const LESSON_IDS = ['lesson-1', 'lesson-2'] as const;

export function HomePage() {
  const { navigate } = useRouterContext();

  return (
    <div data-testid="game-home" className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Home</h1>
      <ul className="flex flex-col gap-2">
        {LESSON_IDS.map((id) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => navigate(`/en/learn/${id}`)}
              className="text-lg underline hover:no-underline"
            >
              {id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

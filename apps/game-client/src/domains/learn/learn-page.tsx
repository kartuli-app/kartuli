'use client';

import { useRouterContext } from '../app-shell/router-context';

interface LearnPageProps {
  readonly lessonId: string;
}

export function LearnPage({ lessonId }: LearnPageProps) {
  const { navigate } = useRouterContext();

  return (
    <div data-testid="game-learn" className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Learn</h1>
      <p className="text-xl" data-testid="learn-lesson-id">
        {lessonId}
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => navigate(`/en/game/${lessonId}`)}
          className="rounded border border-gray-700 bg-gray-700 px-4 py-2 text-white"
        >
          Play
        </button>
        <button
          type="button"
          onClick={() => globalThis.history.back()}
          className="rounded border border-input bg-background px-4 py-2"
        >
          Back
        </button>
      </div>
    </div>
  );
}

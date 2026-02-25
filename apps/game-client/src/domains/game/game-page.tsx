'use client';

interface GamePageProps {
  readonly lessonId: string;
}

export function GamePage({ lessonId }: GamePageProps) {
  return (
    <div data-testid="game-game" className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Game</h1>
      <p className="text-xl" data-testid="game-lesson-id">
        {lessonId}
      </p>
      <button
        type="button"
        onClick={() => globalThis.history.back()}
        className="rounded border border-input bg-background px-4 py-2"
      >
        Back
      </button>
    </div>
  );
}

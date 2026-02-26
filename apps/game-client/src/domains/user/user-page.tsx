'use client';

export function UserPage() {
  return (
    <div data-testid="game-user" className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">User</h1>
      <p className="text-xl">anonymous user</p>
      <button
        type="button"
        onClick={() => (globalThis as unknown as { history: { back(): void } }).history.back()}
        className="rounded border border-input bg-background px-4 py-2"
      >
        Back
      </button>
    </div>
  );
}

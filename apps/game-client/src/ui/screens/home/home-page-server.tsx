export function HomePageServer() {
  return (
    <main className="flex min-h-dvh flex-col gap-6 px-6 py-10 sm:px-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Kartuli is in cleanup mode
        </h1>
        <p className="max-w-2xl text-base text-ds1-color-text-700 sm:text-lg">
          The old home screen has been removed so the new route structure can be rebuilt with less
          noise.
        </p>
        <p className="max-w-2xl text-base text-ds1-color-text-700 sm:text-lg">
          Translit, settings, locale behavior, and the learning-content system are still in the
          repo. The home route is intentionally a temporary placeholder for Phase 1.
        </p>
      </div>
    </main>
  );
}

export function HomePage() {
  return (
    <main className="flex max-w-2xl flex-col gap-p-spacing-4" data-testid="backoffice-home">
      <p className="text-s-color-shell-content-secondary text-sm font-bold uppercase">
        Kartuli Backoffice
      </p>
      <h1 className="text-s-color-shell-content-primary text-4xl font-black">Home</h1>
      <p className="text-s-color-shell-content-secondary text-lg">
        Shared shell integration proof.
      </p>
    </main>
  );
}

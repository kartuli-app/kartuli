/**
 * Keeps a stable arbitrary-value utility in `packages/ui/src` so app-level Tailwind integration
 * tests can verify that consumer `@source` scanning still includes shared UI files.
 */
export function TailwindScanFixture() {
  return <div className="bg-[rebeccapurple]" />;
}

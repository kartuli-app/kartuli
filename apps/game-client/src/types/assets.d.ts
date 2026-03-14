/**
 * Type declarations for static asset imports (e.g. SVG).
 * Ensures typecheck passes in CI when next-env.d.ts is not present (it is gitignored).
 */
declare module '*.svg' {
  const content: { src: string; height?: number; width?: number };
  export default content;
}

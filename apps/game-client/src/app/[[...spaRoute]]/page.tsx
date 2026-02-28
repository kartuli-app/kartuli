/** Minimal static paths for SSG: root and locale roots only. Other routes work client-side. */
const STATIC_PATHS: { spaRoute: string[] }[] = [
  { spaRoute: [] }, // /
  { spaRoute: ['en'] },
  { spaRoute: ['ru'] },
];

export function generateStaticParams() {
  return STATIC_PATHS;
}

export { SpaRoutePage as default } from '../../domains/spa-route/spa-route-page';

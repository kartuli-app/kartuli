/** Single shell per locale for SSG; SW will serve this for all in-shell routes. Add ['ru'] when i18n is added. */
const STATIC_PATHS: { spaRoute: string[] }[] = [{ spaRoute: ['en'] }];

export function generateStaticParams() {
  return STATIC_PATHS;
}

export { SpaRoutePage as default } from '../../domains/spa-route/spa-route-page';

import { AppShell } from '../../domains/app-shell/app-shell';

function pathFromSegments(segments: string[] | undefined): string {
  if (!segments?.length) return '/en';
  return `/${segments.join('/')}`;
}

interface PageProps {
  readonly params: Promise<{ spaRoute?: string[] }>;
}

/** Single shell per locale for SSG; SW will serve this for all in-shell routes. Add ['ru'] when i18n is added. */
const STATIC_PATHS: { spaRoute: string[] }[] = [{ spaRoute: ['en'] }];

export function generateStaticParams() {
  return STATIC_PATHS;
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const segments = resolved.spaRoute;
  const initialPath = pathFromSegments(segments);
  return <AppShell initialPath={initialPath} />;
}

import { SpaShell } from '@game-client/spa-shell/spa-shell';

function pathFromSegments(segments: string[] | undefined): string {
  if (!segments?.length) return '/';
  return `/${segments.join('/')}`;
}

interface SpaRoutePageProps {
  readonly params: Promise<{ spaRoute?: string[] }>;
}

export async function SpaRoutePage({ params }: SpaRoutePageProps) {
  const resolved = await params;
  const segments = resolved.spaRoute;
  const initialPath = pathFromSegments(segments);
  return <SpaShell initialPath={initialPath} />;
}

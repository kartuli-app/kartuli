import { AppShell } from '../app-shell/app-shell';

function pathFromSegments(segments: string[] | undefined): string {
  if (!segments?.length) return '/en';
  return `/${segments.join('/')}`;
}

interface SpaRoutePageProps {
  readonly params: Promise<{ spaRoute?: string[] }>;
}

export async function SpaRoutePage({ params }: SpaRoutePageProps) {
  const resolved = await params;
  const segments = resolved.spaRoute;
  const initialPath = pathFromSegments(segments);
  return <AppShell initialPath={initialPath} />;
}

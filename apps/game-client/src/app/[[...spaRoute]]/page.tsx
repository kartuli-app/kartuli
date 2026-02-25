import { AppShell } from '../../domains/app-shell/app-shell';

function pathFromSegments(segments: string[] | undefined): string {
  if (!segments?.length) return '/en';
  return `/${segments.join('/')}`;
}

interface PageProps {
  readonly params: Promise<{ spaRoute?: string[] }>;
}

export function generateStaticParams() {
  return [{ spaRoute: ['en'] }, { spaRoute: ['en', 'debug'] }];
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const segments = resolved.spaRoute;
  const initialPath = pathFromSegments(segments);
  return <AppShell initialPath={initialPath} />;
}

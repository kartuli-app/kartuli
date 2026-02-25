import { AppShell } from '../../domains/app-shell/app-shell';

function pathFromSegments(segments: string[] | undefined): string {
  if (!segments?.length) return '/en';
  return `/${segments.join('/')}`;
}

interface PageProps {
  readonly params: Promise<{ spaRoute?: string[] }>;
}

const STATIC_PATHS: { spaRoute: string[] }[] = [
  { spaRoute: ['en'] },
  { spaRoute: ['en', 'debug'] },
  { spaRoute: ['en', 'user'] },
  { spaRoute: ['en', 'learn', 'lesson-1'] },
  { spaRoute: ['en', 'learn', 'lesson-2'] },
  { spaRoute: ['en', 'game', 'lesson-1'] },
  { spaRoute: ['en', 'game', 'lesson-2'] },
];

export function generateStaticParams() {
  return STATIC_PATHS;
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const segments = resolved.spaRoute;
  const initialPath = pathFromSegments(segments);
  return <AppShell initialPath={initialPath} />;
}

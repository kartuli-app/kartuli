import { PosterLessonCard } from '@game-client/ui/screens/poster/poster-lesson-card';
import { posterLesson } from '@game-client/ui/screens/poster/poster-lesson-data';
import clsx from 'clsx';
import Link from 'next/link';

type PosterPageProps = {
  searchParams: Promise<{
    print?: string | string[];
  }>;
};

function isPrintMode(printParam: string | string[] | undefined) {
  if (Array.isArray(printParam)) {
    return printParam.includes('1');
  }
  return printParam === '1';
}

export default async function PosterPage({ searchParams }: PosterPageProps) {
  const resolvedSearchParams = await searchParams;
  const printMode = isPrintMode(resolvedSearchParams.print);

  return (
    <>
      <style>{`
        @page {
          size: 90cm 60cm;
          margin: 0;
        }

        html,
        body {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }

        @media print {
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>
      <main
        className={clsx(
          'w-full',
          printMode ? 'bg-[#f7f1e3]' : 'min-h-dvh overflow-auto bg-stone-200 px-4 py-6 sm:px-6',
        )}
      >
        {printMode ? null : (
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold text-slate-900">Poster Preview</h1>
              <p className="text-sm text-slate-600">90cm × 60cm, landscape, 3:2 ratio</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/poster?print=1"
                className={clsx(
                  'rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700',
                  'transition hover:border-slate-400 hover:text-slate-900',
                )}
              >
                Open Clean View
              </Link>
              <Link
                href="/poster/print"
                className={clsx(
                  'rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white',
                  'transition hover:bg-slate-700',
                )}
              >
                Download PDF
              </Link>
            </div>
          </div>
        )}
        <div className={clsx('mx-auto', printMode ? '' : 'mt-6 max-w-7xl')}>
          <div
            data-poster-canvas="kartuli-alphabet-poster"
            className={clsx(
              'overflow-hidden bg-[#f7f1e3]',
              printMode
                ? ''
                : 'mx-auto shadow-[0_30px_80px_rgba(15,23,42,0.18)] ring-1 ring-black/10',
            )}
            style={
              printMode
                ? {
                    width: '90cm',
                    height: '60cm',
                  }
                : {
                    width: 'min(92vw, 1200px)',
                    aspectRatio: '3 / 2',
                  }
            }
          >
            <div
              className="h-full w-full"
              style={{
                padding: printMode ? '1.7cm' : 'clamp(20px, 3vw, 56px)',
              }}
            >
              <PosterLessonCard homeLesson={posterLesson} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

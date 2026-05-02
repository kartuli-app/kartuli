export function DebugPage() {
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION ?? 'unknown';
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL_ENV ?? 'local';

  return (
    <main
      data-testid="backoffice-debug"
      className="flex min-h-dvh w-full justify-center px-6 py-10 sm:px-10"
    >
      <section className="flex w-full max-w-3xl flex-col gap-6 rounded-3xl border border-slate-300 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Backoffice debug</h1>
          <p className="text-sm text-slate-600">
            Minimal local debug surface kept during the cleanup transition.
          </p>
        </div>

        <dl className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              App
            </dt>
            <dd className="text-base font-medium text-slate-950">@kartuli/backoffice-client</dd>
          </div>

          <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Version
            </dt>
            <dd className="text-base font-medium text-slate-950">{appVersion}</dd>
          </div>

          <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Environment
            </dt>
            <dd className="text-base font-medium text-slate-950">{nodeEnv}</dd>
          </div>

          <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-3">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Vercel Env
            </dt>
            <dd className="text-base font-medium text-slate-950">{vercelEnv}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface PageNotFoundProps {
  readonly attemptedPath: string;
}

export function PageNotFound({ attemptedPath }: PageNotFoundProps) {
  const { t } = useTranslation('notFound');

  useEffect(() => {
    document.title = `${t('title')} | Kartuli`;
  }, [t]);

  return (
    <div
      data-testid="page-not-found"
      className="flex grow flex-col items-center justify-center gap-4 px-4 text-center"
    >
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="text-lg text-muted-foreground max-w-lg">
        {t('description', { path: attemptedPath })}
      </p>
    </div>
  );
}

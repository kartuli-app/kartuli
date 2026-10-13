import { getMessagesForLocale, type SupportedLocale } from '@game-client/i18n';
import { NotFoundContent } from '@game-client/ui/experiences/not-found/components/not-found-content';

interface NotFoundPageProps {
  readonly locale: SupportedLocale;
  readonly pathname: string;
}

export function NotFoundPage({ locale, pathname }: NotFoundPageProps) {
  const messages = getMessagesForLocale(locale, 'notFound');
  return <NotFoundContent {...messages} pathname={pathname} />;
}

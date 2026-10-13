import { getMessagesForLocale, type SupportedLocale } from '@game-client/i18n';
import { NotFoundContent } from '@game-client/ui/experiences/not-found/components/not-found-content';

interface NotFoundPageProps {
  locale: SupportedLocale;
  pathname: string;
}

export function NotFoundPage({ locale, pathname }: NotFoundPageProps) {
  const messages = getMessagesForLocale(locale, 'notFound');
  return <NotFoundContent {...messages} pathname={pathname} />;
}

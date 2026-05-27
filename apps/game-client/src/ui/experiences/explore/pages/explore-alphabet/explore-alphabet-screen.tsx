import type { SupportedLocale } from '@game-client/i18n';
import { ContextAwareGreeting } from '@game-client/ui/experiences/explore/components/context-aware-greeting';
import { AlphabetExploreContent } from './alphabet-explore-content';

export function ExploreAlphabetScreen({ locale }: Readonly<{ locale: SupportedLocale }>) {
  return (
    <main className="flex flex-col gap-8">
      <ContextAwareGreeting locale={locale} />
      <AlphabetExploreContent locale={locale} />
    </main>
  );
}

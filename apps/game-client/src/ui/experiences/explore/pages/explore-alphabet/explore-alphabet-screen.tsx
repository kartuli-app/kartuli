import { ContextAwareGreeting } from '@game-client/ui/experiences/explore/components/context-aware-greeting';
import { AlphabetExploreContent } from './alphabet-explore-content';

export function ExploreAlphabetScreen() {
  return (
    <div className="flex flex-col gap-8">
      <ContextAwareGreeting />
      <AlphabetExploreContent />
    </div>
  );
}

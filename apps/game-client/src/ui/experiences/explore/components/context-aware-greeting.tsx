import { getMessagesForLocale, type SupportedLocale } from '@game-client/i18n';

export function ContextAwareGreeting({ locale }: Readonly<{ locale: SupportedLocale }>) {
  const homeMessages = getMessagesForLocale(locale, 'home');
  const greetings = [
    'გამარჯობა ჩემო მეგობარო', // hello my friend
    'დილა მშვიდობისა', // good morning
    'საღამო მშვიდობისა', // good afternoon
  ];
  const contextAwareGreeting = greetings[1];
  return (
    <div className="flex justify-center py-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl text-center">👋</h2>
        <h2 className="text-4xl text-center text-s-color-shell-content-secondary">
          <span className="font-georgian">{contextAwareGreeting}</span>
        </h2>
        <h3 className="text-2xl text-s-color-shell-content-primary text-center">
          {homeMessages.heading}
        </h3>
      </div>
    </div>
  );
}

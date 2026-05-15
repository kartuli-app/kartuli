export function ContextAwareGreeting() {
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
        <h2 className="text-4xl text-center text-kartuli-color-primitive-neutral-500">
          <span className="font-georgian">{contextAwareGreeting}</span>
        </h2>
        <h3 className="text-2xl text-kartuli-color-primitive-neutral-900 text-center">
          Lets learn Georgian!
        </h3>
      </div>
    </div>
  );
}

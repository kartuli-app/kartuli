import * as React from 'react';

type ViewTransitionClass =
  | 'auto'
  | 'none'
  | (string & {})
  | Record<'default' | (string & {}), 'auto' | 'none' | (string & {})>;

type SafeViewTransitionProps = Readonly<{
  children?: React.ReactNode;
  default?: ViewTransitionClass;
  enter?: ViewTransitionClass;
  exit?: ViewTransitionClass;
  name?: 'auto' | (string & {});
  share?: ViewTransitionClass;
  update?: ViewTransitionClass;
}>;

const ViewTransitionComponent: React.ComponentType<SafeViewTransitionProps> | undefined =
  React.ViewTransition;

export function SafeViewTransition({
  children,
  default: defaultTransition,
  enter,
  exit,
  name,
  share,
  update,
}: SafeViewTransitionProps) {
  // Storybook and other non-Next renderers may not expose React.ViewTransition
  // yet. In that case, render the content normally instead of crashing.
  if (!ViewTransitionComponent) {
    return <>{children}</>;
  }

  return (
    <ViewTransitionComponent
      default={defaultTransition}
      enter={enter}
      exit={exit}
      name={name}
      share={share}
      update={update}
    >
      {children}
    </ViewTransitionComponent>
  );
}

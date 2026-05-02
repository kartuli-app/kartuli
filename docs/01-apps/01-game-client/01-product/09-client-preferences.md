---
description: Client-side preference registry and shared resolution model for the game client.
---

# Client Preferences

This document owns the registry of client-side preferences and the shared model they follow.

It does not own the full behavior of any specific preference. Each preference points to its canonical behavior docs.

## What a client preference is

A client preference is an app-level preference that is persisted on the device and resolved in browser runtime.

The current client preferences are:

- preferred language
- sound enabled
- privacy consent

## Shared resolution model

Client preferences resolve after the app can read client-side storage.

That means:

- an unresolved boot-time state is not a user-facing preference value
- server-rendered or static output should avoid showing the wrong final preference state and then flipping immediately after hydration
- preference-backed UI may show a stable neutral placeholder until the real stored value is known

This document defines that shared resolution model once. The specific behavior of each preference lives elsewhere.

## Preference registry

### Preferred language

Purpose:

- controls the UI language
- affects localized route resolution and localized navigation

Canonical docs:

- [Core](./05-core.md)
- [Routing and Flows](./06-routing-and-flows.md)
- [Screens](./07-screens.md)

### Sound enabled

Purpose:

- controls whether audio-capable behavior is available across browse preview audio, Study audio, and Play audio

Canonical docs:

- [Audio and Sound](./10-audio-and-sound.md)
- [Screens](./07-screens.md)
- [Ui System](./08-ui-system.md)

### Privacy consent

Purpose:

- controls optional analytics behavior

Canonical docs:

- [Privacy and Analytics](./11-privacy-and-analytics.md)
- [Screens](./07-screens.md)
- [Ui System](./08-ui-system.md)

## Related note

Settings exposes these preferences in the UI, but Settings does not own their behavior model.


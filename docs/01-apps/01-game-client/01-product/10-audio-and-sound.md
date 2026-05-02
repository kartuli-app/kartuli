---
description: Global sound behavior, muted interaction rules, and listening-round behavior for the game client.
---

# Audio and Sound

This document owns product behavior related to sound and audio-capable practice.

## Global sound preference

The app has one global sound preference with two states:

- `enabled`
- `disabled`

The preference is persisted client-side and can be changed from Settings and relevant audio-capable screens.

When sound is disabled, automatic and manual playback is suppressed across:

- alphabet preview audio
- Study audio
- Play audio

When sound is enabled, audio-capable screens may autoplay or expose replay controls according to their own screen rules.

## Muted interaction behavior

Muted behavior depends on whether the audio affordance is lightweight preview behavior or an explicit audio control.

### Lightweight preview audio

Alphabet preview audio behaves as a lightweight preview affordance.

When sound is disabled:

- tapping an alphabet preview does not play audio
- that interaction fails silently

### Explicit audio controls

Explicit audio controls in Study and Play stay visible when sound is disabled.

When sound is disabled:

- the controls remain tappable
- they explain why playback is unavailable
- they do not behave like true disabled controls

Example lightweight feedback:

- `Turn sound on to listen`

Turning sound off while audio is playing stops that playback immediately.

## Listening rounds

Global sound and listening rounds are related, but they are not the same concept.

Listening rounds are a Play-session choice that is prepared in the Lobby.

Rules:

- global sound disabled means newly prepared audio-capable sessions start with listening rounds off
- the Play Lobby is the last place where listening-round inclusion can change
- once a session starts, listening-round inclusion stays fixed until the user returns to the Lobby or leaves the session
- changing global sound during an active session affects playback immediately
- changing global sound during an active session does not regenerate the prepared round sequence

Screen-specific presentation for these rules lives in [Screens](./07-screens.md).


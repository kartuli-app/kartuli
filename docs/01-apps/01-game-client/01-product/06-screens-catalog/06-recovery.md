---
description: Recovery route states for invalid URLs and unavailable Study or Play resources.
---

# Recovery Screens

## Purpose

Recovery screens handle invalid URLs and valid routes that cannot resolve the resource they need.

Recovery screens are separate from the normal `Study` and `Play` experiences.

## States

- Global not found
- Study resource unavailable
- Play resource unavailable

## Shared Behavior

- Recovery screens do not show the dock.
- Recovery screens use a safe return destination.
- The safe return destination is `/{locale}/explore`.
- Recovery screens should stay calm, clear, and easy to exit.
- Route-owned unavailable states stay distinct from global not found.

## Layout

- top bar with back arrow to `/{locale}/explore`
- recovery content area
- primary recovery action

## Actions

- back arrow -> `/{locale}/explore`
- primary action: `Choose something else` -> `/{locale}/explore`

## Global Not Found

- Trigger: the requested URL does not match a controlled route pattern after locale handling
- This state is for invalid route intent.
- It is not used for valid routes that fail to load their data.
- The screen should show:
  - short title
  - short explanation
  - primary recovery action
- The UI should not expose the raw attempted URL.

## Study Resource Unavailable

- Trigger: a valid Study route cannot resolve its lesson or module review set
- Routes:
  - `/{locale}/lessons/{lessonId}/study`
  - `/{locale}/modules/{moduleId}/review/study`
- This state is not part of the normal Study screen.
- The screen should show:
  - short title
  - short explanation
  - primary recovery action
- The UI should not expose raw resource ids.
- The screen should not show:
  - study navigation bar
  - summary card
  - detail card
  - persistent `Play` button

## Play Resource Unavailable

- Trigger: a valid Play route cannot resolve its lesson or module review set
- Routes:
  - `/{locale}/lessons/{lessonId}/play`
  - `/{locale}/modules/{moduleId}/review/play`
- This state is not part of the normal Play flow.
- The screen should show:
  - short title
  - short explanation
  - primary recovery action
- The UI should not expose raw resource ids.
- The screen should not show:
  - play lobby
  - round
  - results
  - mistakes review

## Notes

- A valid route with missing data should not collapse into global not found.
- Recovery copy should guide the student toward choosing another resource.

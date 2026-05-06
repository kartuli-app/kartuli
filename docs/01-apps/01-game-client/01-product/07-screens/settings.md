---
description: Per-screen implementation contract for the Settings utility screen in the game client.
---

# Settings Screen

## Summary

- Role: provide global app utilities and metadata in a simple, low-frequency control surface
- Entry point: `/{locale}/app/settings`
- Route binding: `/{locale}/app/settings`
- Screen type: route screen
- Primary user question: how do I adjust app-wide preferences and view app information quickly?
- Primary decision: update a global preference now

## Source links

- Routing: [Routing and Flows](../06-routing-and-flows.md)
- UI system: [Ui System](../08-ui-system.md)
- Component catalog: [Component Catalog](../12-component-catalog.md)
- Client preferences: [Client Preferences](../09-client-preferences.md)
- Audio: [Audio and Sound](../10-audio-and-sound.md)
- Privacy: [Privacy and Analytics](../11-privacy-and-analytics.md)

## Layout regions

| Region | Required | Components | Notes |
|---|---:|---|---|
| Top bar | yes | `TopBar` | Back target returns to Learn |
| Main settings area | yes | `SettingsSection` | Single-column layout with Language, Sound, Privacy, and About sections |
| Dock | yes | `BottomDock` | Settings active |

## Component inventory

| Component | Usage | Variants / states | Catalog link |
|---|---|---|---|
| `TopBar` | Route-level chrome for the utility screen | Settings title pattern with return action | [Component Catalog](../12-component-catalog.md) |
| `SettingsSection` | Section wrapper and inline action surface for each settings group | Language, Sound, Privacy, About | [Component Catalog](../12-component-catalog.md) |
| `BottomDock` | Top-level navigation | Settings active | [Component Catalog](../12-component-catalog.md) |

## Screen states

| State | Trigger | UI changes | Notes |
|---|---|---|---|
| preferences resolved | stored client preferences are available | show current Language, Sound, and Privacy values | Preference resolution model is owned by Client Preferences |
| privacy consent unknown | consent state is `unknown` | show `not chosen yet` status in the Privacy section | `unknown` is a pre-decision state, not an intentional long-term preference |
| privacy consent granted | consent state is `granted` | show accepted status in the Privacy section | Analytics behavior is owned by Privacy and Analytics |
| privacy consent rejected | consent state is `rejected` | show rejected status in the Privacy section | Analytics behavior is owned by Privacy and Analytics |

## Actions

| Action | Trigger | Result | Owner |
|---|---|---|---|
| Change UI language | choose a different language in the Language section | update the stored preferred language immediately and navigate to the equivalent localized route | [Routing and Flows](../06-routing-and-flows.md) |
| Toggle global sound | change the Sound section control | update the stored global sound preference | [Audio and Sound](../10-audio-and-sound.md) |
| Accept optional analytics | choose the accept action in the Privacy section | set privacy consent to `granted` | [Privacy and Analytics](../11-privacy-and-analytics.md) |
| Reject optional analytics | choose the reject action in the Privacy section | set privacy consent to `rejected` | [Privacy and Analytics](../11-privacy-and-analytics.md) |
| Open Privacy page | activate the Privacy section link | open the Privacy page | [Routing and Flows](../06-routing-and-flows.md) |
| Open project GitHub link | activate the About section project link | open the project repository | This screen |
| Return to Learn | activate the top-bar back action | return to `/{locale}/app/learn` | [Routing and Flows](../06-routing-and-flows.md) |

## Content

- Settings uses sections for:
  - Language
  - Sound
  - Privacy
  - About
- Language changes apply immediately.
- Sound applies globally across browse preview, Study, and Play audio.
- The Privacy section distinguishes essential storage from optional analytics.
- Consent status is shown as `not chosen yet`, `accepted`, or `rejected`.
- Settings does not offer a reset-to-unknown control.
- About includes app version, content version, and project link.

## Behavior notes

- Settings exposes app-level client preferences, but it does not own their behavior model. Canonical preference ownership lives in [Client Preferences](../09-client-preferences.md).
- Changing language updates the stored preference immediately and navigates to the equivalent localized route. Canonical route behavior lives in [Routing and Flows](../06-routing-and-flows.md).
- The global sound preference is persisted client-side and applies across browse preview audio, Study audio, and Play audio. Canonical sound behavior lives in [Audio and Sound](../10-audio-and-sound.md).
- Privacy consent is a client-side preference with `unknown`, `granted`, and `rejected` states. Canonical consent and analytics behavior lives in [Privacy and Analytics](../11-privacy-and-analytics.md).

## Design notes

- Use a conservative, practical utility presentation.
- Keep the same layout behavior across devices.
- Inline actions inside sections should feel low-friction rather than CTA-heavy.

## Accessibility notes

- Section boundaries and labels should remain easy to scan in a single-column layout.
- Current preference values should remain understandable without relying on position or color alone.
- External-link and page-link actions in About and Privacy should remain distinct from preference toggles.

## Not this

- Do not add a sticky CTA region.
- Do not offer a reset-to-unknown privacy control.
- Do not frame essential storage as optional analytics.
- Do not make Settings the owner of language, sound, or privacy behavior models.

## Storybook coverage

- Settings composition
- `SettingsSection`: Language
- `SettingsSection`: Sound
- `SettingsSection`: Privacy with `unknown`
- `SettingsSection`: Privacy with `granted`
- `SettingsSection`: Privacy with `rejected`
- `SettingsSection`: About
- `BottomDock`: Settings active

## Open questions

- Exact microcopy that explains essential storage versus optional analytics.
- Exact GitHub URL.
- Exact format for hardcoded app and content version strings.

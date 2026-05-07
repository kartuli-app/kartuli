---
description: Route catalog and internationalization rules for the game client.
---

# Routes

This document owns the route catalog and internationalization rules for the game client.

## Route notation

Use route patterns in this document, not framework file-path syntax.

Notation rules:

- use `/` for the non-localized root route
- use `/{locale}/...` for localized route patterns
- use `{paramName}` for dynamic segments such as `{lessonId}` and `{moduleId}`
- use actual URLs only as concrete examples when helpful

Examples:

- route pattern: `/`
  - actual URL: `/`
- route pattern: `/{locale}/settings`
  - actual URL: `/en/settings`
- route pattern: `/{locale}/lessons/{lessonId}/study`
  - actual URL: `/en/lessons/the-five-vowels/study`

## Route catalog

| Route  | Name | Type | 
| ------------- | ------------- | ------------- |
| `/`  |  Root redirect | [Root route locale redirect](#root-route-locale-redirect) |
| **Explore routes** | | | 
| `/{locale}/explore`  | Explore entry  (***localized initial route***) | Custom ([Explore Entry Screen](./07-screens/explore-entry.md)) |
| `/{locale}/explore/alphabet`  | Explore Alphabet   | [Browse](#browse-routes) |
| `/{locale}/explore/vocabulary`  | Explore Vocabulary   | [Browse](#browse-routes) |
| **Study routes** | | |
| `/{locale}/lessons/{lessonId}/study`  | Lesson Study   | [Study](#study-routes) |
| `/{locale}/modules/{moduleId}/review/study`  | Module review Study   | [Study](#study-routes) |
| **Play routes** | | |
| `/{locale}/lessons/{lessonId}/play`  | Lesson Play   | [Play](#play-routes) |
| `/{locale}/modules/{moduleId}/review/play`  | Module review Play   | [Play](#play-routes) |
| **Utilities routes** | | |
| `/{locale}/translit`  | Translit   | Custom ([Translit Screen](./07-screens/translit.md)) |
| `/{locale}/settings`  | Settings   | Custom ([Settings Screen](./07-screens/settings.md)) |


## Route types

### Custom routes

These are routes that define their own behavior, documented on the route screen documentation.

### Browse routes

These are routes that share the same `Browse` experience, documented in [Browse Screen](./07-screens/browse.md).

The route decides which content family is loaded and which title the shared screen receives.

- `/{locale}/explore/alphabet`
  - experience: `Browse`
  - title: `Alphabet`
  - content family: `alphabet`
  - source: authored alphabet lessons and alphabet module review
- `/{locale}/explore/vocabulary`
  - experience: `Browse`
  - title: `Vocabulary`
  - content family: `vocabulary`
  - source: authored vocabulary lessons and vocabulary module review

### Study routes

These are routes that share the same `Study` experience, documented in [Study Screen](./07-screens/study.md).

The route provides the title, item set, content family, and back target for the shared screen.

- `/{locale}/lessons/{lessonId}/study`
  - experience: `Study`
  - title: lesson title
  - set: lesson items
  - content family: from the lesson
  - back target: relevant Browse route
- `/{locale}/modules/{moduleId}/review/study`
  - experience: `Study`
  - title: `Full review`
  - set: module review items
  - content family: from the module
  - back target: relevant Browse route

### Play routes

These are routes that share the same "play" experience, documented on TODO: add link to the play screen documentation.

## Internationalization

### Suported locales

The game client supports this supported locales:

- English (`en`)
- Russian (`ru`)

### Default locale

The default locale is English (`en`).

### Root route locale redirect

The root route `/` is non-localized, it detects the most appropiate locale, and redirects to the `localized initial route` for that locale. 

The `localized initial route` is the `Explore entry` route for the detected locale.

### Preferred locale resolution

The preferred locale is resolved in this order:

- preferred locale cookie (stored in a client-side cookie)
- browser `Accept-Language` header
- default locale

### Supported locale-prefixed routes

All other routes are localized, they use the `/{locale}/...` pattern

### Unsupported locale handing

When the locale is not supported, the app would replace the wrong locale with the default locale, and route will 
be resolved normally, delegating non existing routes to global not-found handling

- if the user attemps to visit a existing page with an unsupported locale, such as `/it/settings`, the app would redirect to the same page with the user preferred locale, such as `/ru/settings` and the user would see the settings page in russian

- if the user attemps to visit a non-existing page, such as `/it/non-existing-page`, the app would redirect to the same page with the user preferred locale, such as `/ru/non-existing-page` and the user would see the the global not-found page in russian

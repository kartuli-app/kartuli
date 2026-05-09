---
description: End-of-game Play outcome screen with stable next-step actions and an optional entry into Mistakes review.
---

# Play Results Screen

## Purpose

Results closes the game, shows the outcome, and offers the next useful actions.

## Entry

- after the last round resolves

## Layout

- results header
- outcome block
- stable CTA area

## Results Model

- Results are based on rounds that were marked failed on the first wrong answer.
- Failed items are deduplicated before they are offered for review.
- The game also stores wrong-attempt counts for failed rounds.

## Outcome Block Variants

### Perfect Result

- shows outcome content for a game with no failed items

### Result With Mistakes

- shows outcome content for a game with one or more failed items
- includes the `Review mistakes` action
- the `Review mistakes` action opens [Mistakes Review Screen](./04-mistakes-review.md)

## Actions

- `Play again` returns to the Lobby for the same resource
- `Back to Study` returns to the relevant Study route
- `Choose something else` returns to `/{locale}/explore`

## Notes

- Results does not own the failed-item review flow.
- Failed-item review lives in [Mistakes Review Screen](./04-mistakes-review.md).
- The stable CTA area stays available regardless of the outcome variant.

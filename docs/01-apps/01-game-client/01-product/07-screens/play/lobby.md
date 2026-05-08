---
description: First visible Play state after game generation and before the first round begins.
---

# Play Lobby Screen

## Purpose

The Lobby is the first visible Play state after Play has generated a game.

It presents the generated game and lets the student start it.

## Entry

- after game generation
- after leaving an active game
- before the first round

## Layout

- top bar
- game summary
- game preview
- set facts
- utility action
- primary `Start` action
- secondary `Back to Study` action

## Top Bar

- back arrow to the relevant Study route
- fixed subtitle `Game`
- route-provided title

## Game Summary

- exact round count
- estimated duration

## Game Preview

- one fixed row of preview visual assets from the generated game
- each slot represents the correct-answer item for one upcoming round
- the preview follows round order, not set order
- no scroll
- if the game has more previewed rounds than the row can show, the last slot becomes an accumulator visual asset with `+X`
- the preview visual asset follows the same content-family rules as Browse and Study

## Set Facts

- one row per content family in the route-provided set
- each row combines the item count and family label, such as `5 letters` or `10 words`
- single-family sets use the same list format

## Actions

- `New game` requests a new generated game for the same route-provided set
- `Start` begins the generated game from the first round
- `Back to Study` returns to the relevant Study route

## Notes

- The Lobby does not generate the game. It presents a game that Play already generated.
- `New game` asks Play to regenerate the game while keeping the same route-provided set.
- If the student leaves an active game, the Lobby presents that same generated game again from the beginning unless `New game` is requested.
- `Start` begins the generated game instead of creating it.

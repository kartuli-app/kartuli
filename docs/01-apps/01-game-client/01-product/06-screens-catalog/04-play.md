---
description: Shared Play experience for practicing a route-provided item set through a generated game.
---

# Play Experience

## Purpose

Play is the shared experience for practicing a route-provided item set through a generated game.

The route resolves the set and passes it into Play.

Play generates the game, shows the Lobby, runs the round loop, and ends in Results.

## Route Inputs

- title
- content family
- item set
- back target

## Game Generation

- Game generation happens before the Lobby is shown.
- Game generation belongs to Play, not to the route and not to the Lobby.
- Play uses the route-provided item set to generate the game.

### Inputs

- content family
- item set
- compatible minigame variants
- answer-option rules

### Output

- ordered rounds
- answer options for each round
- total round count
- estimated duration
- game preview order

### Default Game Generation Strategy

The default game generation strategy can change over time without changing the Play contract.

Its role is still the same: take the route-provided set and output a generated game.

#### Round Count Policy

- target at least `30` rounds
- if the set has fewer than `10` items, schedule each item as the correct answer at least `3` times
- otherwise, schedule each item as the correct answer at least `1` time
- the default round count is the larger of `30` and `item count x minimum correct appearances per item`

#### Correct-Answer Scheduling Policy

- assign one correct item to each round
- satisfy the minimum appearance rule first
- distribute extra round slots across the set when needed
- shuffle the resulting order so the same item does not cluster too tightly

#### Distractor Selection Policy

- use items from the same set whenever possible
- exclude the correct item
- avoid duplicate distractors inside the same round
- rotate distractors so the same wrong answers are not overused
- if the set is too small to support the default answer count, use the largest valid answer count for that set

#### Minigame Assignment Policy

- assign a compatible minigame variant after the round order is built
- avoid repetitive streaks when more than one compatible variant exists
- minigame assignment stays separate from round scheduling even when all rounds use the same minigame family

### Regeneration

- Play generates the first game before the Lobby is shown
- the Lobby can request a new game for the same route-provided set
- regeneration keeps the same route inputs and back target
- regeneration rebuilds round order, answer options, minigame distribution, and game preview order

## Flow

- game generation
- [Lobby](./05-play-screens/01-lobby.md)
- Round loop
- [Results](./05-play-screens/03-results.md)
- optional [Mistakes review](./05-play-screens/04-mistakes-review.md)

The Round loop includes:

- active attempt
- corrective attempt when needed
- resolved pause before auto-advance

Results include entry into Mistakes review when the completed game has failed items.

## Round Outcome Model

- A round is clean when the first selected answer is correct.
- A round is failed on the first wrong answer.
- A failed round still resolves through corrective attempts inside the same round.
- Play stores the wrong-attempt count for each failed round inside the game.
- Results focus on rounds that were marked failed.

## Shared Interaction Rules

- Answer buttons submit immediately.
- Play does not use a separate confirm step before submission.
- Play does not use a skip control after resolution.
- Every resolved round locks briefly before Play advances.
- Leaving an active game requires confirmation.
- The leave confirmation uses a blocking bottom sheet with an overlay.
- Confirming `Leave game` abandons the current game progress and returns to the Play Lobby for the current route.

## Notes

- Play is agnostic to whether the current set came from a lesson or a module review.
- The route decides the inputs. Play owns the game.

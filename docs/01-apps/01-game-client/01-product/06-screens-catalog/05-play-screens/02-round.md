---
description: Play round lifecycle with immediate answer submission, corrective elimination, and a brief resolved pause before auto-advance.
---

# Play Round Screen

## Purpose

The Round screen presents one Play round and accepts immediate answers.

The same round shell is used for the full round lifecycle:

- active attempt
- corrective attempt after wrong answers
- resolved pause before auto-advance

## Entry

- when the next prepared round becomes active

## Layout

- round header with leave action and progress
- cue area
- answer options area
- blocking leave confirmation sheet

## Round Header

- close button instead of a back arrow
- progress bar with no visible numeric label

The progress bar fills as rounds are completed.

Selecting the close button opens the blocking leave confirmation sheet.

## Answer Model

- Each answer option is a button.
- Selecting an answer submits immediately.
- Play does not use a separate confirm button.
- Desktop answer bindings use `1`, `2`, `3`, and `4`.

## Round States

### Active Attempt

- all answer options are enabled
- selecting the correct answer resolves the round cleanly
- selecting a wrong answer marks the round failed and enters the corrective attempt state

### Corrective Attempt

- the selected wrong answer becomes `wrong` and disabled
- remaining wrong answers stay available until chosen
- the correct answer stays available
- each additional wrong answer becomes `wrong` and disabled
- each additional wrong answer increments the wrong-attempt count for the round
- selecting the correct answer resolves the round and enters the resolved pause
- if only one answer remains, the round auto-resolves to correct

### Resolved Pause

The resolved pause is the final state of the current round.

It keeps the same round shell visible, locks the answer set briefly, and then auto-advances to the next round or Results.

- the round header remains visible
- the cue remains visible
- the resolved answer set remains visible
- the leave confirmation overlay is still available

#### Clean Resolution

- the selected correct answer is shown in the `success` state
- all other answers are disabled
- the round pauses briefly
- Play auto-advances to the next round or Results

#### Corrected Resolution

- wrong attempts remain visible in the `wrong` state
- the correct answer is shown in the `success` state
- all answers are locked
- the round pauses briefly
- Play auto-advances to the next round or Results

## Actions

- select answer
- select answer by keyboard
- open leave confirmation
- `Resume game`
- `Leave game` abandons the current game progress and returns to the Play Lobby

## Notes

- The cue stays visible through active, corrective, and resolved round states.
- The first wrong answer marks the round as failed for Results, even if the student later resolves it.
- The resolved pause does not use a separate `Continue` button.
- The resolved pause does not use a skip action.
- The brief locked pause helps prevent accidental carry-over taps into the next round.
- The close action is not standard navigation. It is an exit action for the current game.
- Confirming `Leave game` returns to the Play Lobby for the current route.

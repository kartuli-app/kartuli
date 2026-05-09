---
description: Play flow screen for reviewing failed items after Results by reusing review mechanics without becoming Study.
---

# Play Mistakes Review Screen

## Purpose

Mistakes review is a Play flow screen for reviewing the failed items from the completed game.

It reuses review mechanics from Study without becoming the Study screen.

## Entry

- from [Play Results Screen](./03-results.md) when the completed game has one or more failed items

## Layout

- top bar
- review navigation bar
- review summary or detail card

## Top Bar

- back arrow to [Play Results Screen](./03-results.md)
- fixed subtitle `Mistakes review`
- route-provided title

## Review Navigation

- uses the same navigation pattern as Study
- summary control returns to the review summary
- previous and next move through the failed-item details
- status shows item count in summary and position in detail

## Review Summary

- review summary is specific to failed-item review
- it is not the same surface as the Study summary
- it reuses item preview language while reflecting that the source set is the failed-item set

## Detail Cards

- detail cards reuse the same item-detail families as Study
- the failed-item set determines which items appear in review

## Entry Rules

- if the failed-item set has `1` item, open directly on detail
- if the failed-item set has `2` or more items, open on review summary first

## Actions

- open one failed item from the review summary
- return to review summary
- move to previous failed item
- move to next failed item
- go back to Results

## Notes

- Mistakes review is a Play flow screen, not a route.
- Mistakes review is separate from the stable CTA area in Results.
- Main next-step actions such as `Play again` and `Choose something else` stay in Results.

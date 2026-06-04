---
description: Stable conceptual model and sectioned glossary for learning content, student activity, and app experience.
---

# Core

This document owns the stable conceptual model of the product.

## Learning content

### Curated learning content

The authored learning content of the product.

It defines the items, lessons, and modules that the student can learn from.

### Content family

A learning-content family.

The product model recognizes `alphabet`, `vocabulary`, and `grammar` content families.

### Item

The smallest learnable unit in curated learning content.

Every item belongs to one content family.

### Letter

An alphabet item.

A letter carries Georgian script, transliteration, and structured localized notes.

### Word

A vocabulary item.

A word carries Georgian script, transliteration, and translation.

### Rule

A grammar item.

A rule carries the grammar concept the student learns or reviews.

### Lesson

An authored set of items from curated learning content.

A lesson is a first-class set.

### Module

An authored set of lessons from curated learning content.

A module defines lesson grouping and lesson order.

### Module review

A generated set derived from one authored module.

Its items are collected from the module's lessons, deduped, and kept in authored lesson order.

### Set

A collection of items used by Study and Play.

A set may be authored or generated.

This abstraction keeps Study and Play independent from how the set was produced.

## Student activity

### Student activity

The stored record of what the student has done with learning items.

Student activity is factual data, not interpretation.

### Item activity

The stored activity record for one item in one student context.

It stores counts and timestamps for views, successes, and failures.

### Item activity summary

An aggregate view of item activity for one student and one item.

### Mastery

A derived interpretation of student activity for one item or one set.

Mastery is not a stored activity fact.

### Recommendation

A derived suggestion about which set the student should study or play next.

Recommendation is not a stored activity fact.

## App experience

### Explore

The experience where the student chooses what to learn.

Explore is about selecting a set.

### Study

The experience where the student reviews a chosen set.

Study works with sets.

### Play

The experience where the student practices a chosen set through a game.

Play works with sets.

### Game

A generated Play game for one chosen set.

A game has a lobby, rounds, and results.

### Translit

The utility experience for Georgian <-> Latin transliteration.

### Settings

The utility experience for changing app preferences.

### Global not found

The recovery state for a URL that does not map to a controlled route.

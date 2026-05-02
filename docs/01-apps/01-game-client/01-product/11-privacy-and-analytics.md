---
description: Essential storage, privacy-consent behavior, and optional analytics rules for the game client.
---

# Privacy and Analytics

This document owns storage, privacy-consent behavior, and analytics behavior.

## Core distinction

The product distinguishes between:

- essential client-side storage needed for product behavior
- local learning-state storage needed for product functionality
- optional analytics

These are related, but they are not the same thing.

## Essential client-side storage

The app always uses a small amount of client-side storage for core behavior.

That includes:

- preferred UI language
- privacy consent
- global sound preference

This storage is essential to the product experience and is not controlled by analytics consent.

## Local learning-state storage

The product stores learning-related state locally on the device.

That includes:

- item activity state
- anonymous local identifiers used to keep local state coherent

This is product-functionality storage, not optional analytics.

## Privacy consent

Privacy consent is a client-side preference with three states:

- `unknown`
- `granted`
- `rejected`

Rules:

- first-time behavior starts from `unknown`
- the consent state is persisted client-side
- consent can be changed later from Settings
- `unknown` is the pre-decision state; it is not an intentional long-term preference state

## Analytics behavior

Analytics are optional.

Rules:

- when consent is `unknown`, analytics stay off
- when consent is `granted`, analytics turn on
- when consent is `rejected`, analytics stay off
- there is no cookieless analytics fallback
- changing consent affects subsequent analytics behavior only

The privacy banner and Settings UI are specified in [Screens](./07-screens.md) and [Ui System](./08-ui-system.md).


---
description: Learning-content validation schemas, inferred types and schema-change workflow.
status: implemented
intent: reference
---

# Zod

## Role and boundary

Zod validates bundled learning-content JSON at ingestion boundaries. `src/learning-content/ingestion/common-data/common-data-json-schema.ts` defines common modules, lessons, letters and words; localized ingestion has a separate schema. Types such as `CommonDataJson` are inferred from the runtime schema, keeping parsed data and TypeScript expectations related.

## Current contract

Common modules contain IDs and lesson ID arrays; lessons contain item IDs. Letter items include target script, transliteration and sound category; word items include target script. Localized data provides locale-specific material. A primitive string check alone does not prove referential integrity between modules, lessons and items; inspect the downstream library-building logic too.

## Adding or changing content

Update the schema, bundled JSON sources, inferred-type consumers and library construction together. Decide whether an added field is required for all existing content or genuinely optional. Do not use optional fields merely to suppress a content migration error. Keep validation at the boundary so UI components consume established domain shapes.

Run ingestion/library tests with representative valid and invalid content, then check relevant app routes. For locale-related schema changes, update both languages and verify fallback/recovery behavior. A passing TypeScript check cannot validate the contents of every external JSON payload at runtime.

Sources: Game Client `src/learning-content/ingestion`, `src/learning-content/library/build-library.tsx`, associated tests. No backend request-validation layer is claimed here; adopting one later requires its own boundary documentation.

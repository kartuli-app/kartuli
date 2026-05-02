## 1. Overall verdict

**Yes — stable enough to keep using, with cleanup.**

The document is already useful as a working product source of truth: it has clear product rules, defined route patterns, screen contracts, UI direction, release scope, and a decisions log. It also explicitly says unconfirmed items should be marked as open questions, TODOs, or future directions, which is the right rule for future product work. 

The main risk is **not incompleteness**. The main risk is that future readers or AI tools may treat future/candidate ideas as already committed, especially where MVP behavior, future behavior, and implementation-like details appear close together.

---

## 2. Problems in the current document

### Ambiguities

**Product overview → Product principles**
The principle says students choose what to practice through “two ways: explore or recommended,” but Recommended is later described as only a candidate, and the Learn route currently redirects to Explore with selection logic not defined. This could make AI tools assume Recommended already exists. **Priority: High.**   

**Privacy, storage, and analytics → Listening rounds versus global sound / Game Lobby flow screen**
The sound/listening relationship is mostly clear, but the Lobby section says turning global sound on “may default back on,” then says turning sound on does not force listening rounds back on if they were off. The intended distinction may be “auto-off because sound was disabled” versus “manually turned off by the student,” but that is not explicit. **Priority: Medium.**  

**Document rules**
The document uses several status words: `Direction`, `Future direction`, `Additional route candidates`, `Open question`, `Future work`, and `Ideas / backlog`. These are reasonable, but their authority levels are not defined. A future reader may not know whether “Direction” means committed, likely, or just recommended. **Priority: Medium.** 

---

### Contradictions

**Concepts → Module review set / Decisions log**
The Concepts section says a module review set is “not a fake authored lesson,” but the Decisions log says every module generates exactly one “synthetic `Full review` lesson.” Those two descriptions point in different modeling directions: resource versus lesson. **Priority: High.**  

**Settings screen / Releases → MVP**
The Settings screen includes Language, Sound, Privacy, and About, and lists toggling global sound as a primary action. The MVP release list says “Settings utility page for language, privacy, and about,” omitting sound. This creates release-scope ambiguity. **Priority: Medium.**  

**Learning flows / Decisions log**
The main learning flow includes “Explore or Recommended,” while the Decisions log says recommendation mode is postponed. This is probably intended as a future-compatible flow, but it currently reads like part of the active product model. **Priority: Medium.**  

---

### Naming / terminology issues

**Module browser screen pattern / Alphabet catalog screen / Vocabulary catalog screen / Components catalog**
The same concept appears as `selected study-resource surface`, `selected lesson surface`, and `selected-resource-drawer`. Alphabet also says the surface opens a lesson “or module review set,” while still naming it a lesson surface. This can lead implementation and AI tools to create separate concepts when there should probably be one. **Priority: High.**   

**Concepts → Module review set / Module browser screen pattern / Game Lobby flow screen**
The document alternates between `module review set`, `generated full-review resource`, `generated review lesson`, `Full review card`, and `{module name}: Full review`. Some of these are UI labels and some are product-model concepts. The distinction should be made more explicit. **Priority: High.**   

**Concepts → Grammar (rule items)**
“Second-class learning content type” is understandable informally, but it may be misread as a technical status or lower-quality content category. “Post-MVP dependent content type” or “future dependent content type” would be safer. **Priority: Low.**

---

### Duplication / redundancy

**Sound / Play flow / Play screen / Game Lobby flow screen / Decisions log**
Global sound and listening-round rules are repeated across several sections. The repetition is mostly consistent, but it increases drift risk. The Lobby should probably own session-preparation details, while Concepts should own only the core model distinction. **Priority: Medium.**   

**Module review behavior across Concepts, Module browser, Vocabulary catalog, and Decisions log**
The generated review resource, deduplication, ordering, card labeling, and route behavior appear in multiple places. This is an important concept, so duplication is understandable, but it should have one canonical definition and only short references elsewhere. **Priority: Medium.**   

**Responsive card layout in Screens and UI**
Alphabet/Vocabulary screens repeat mobile/tablet/desktop card counts, while the UI section also defines the responsive module-browser rule model. This is low-risk now, but the UI section should be the canonical place for reusable responsive rules. **Priority: Low.**  

---

### Misplaced information

**Privacy, storage, and analytics → Listening rounds versus global sound**
This subsection is about Play-session behavior, not privacy, storage, or analytics. It belongs under Sound or Play concepts. Its current placement makes the privacy section carry unrelated product mechanics. **Priority: Medium.** 

**Concepts → Metadata, discovery, and sharing**
This is partly a routing/indexability concern and partly a metadata policy. Since route-specific indexability is defined in the routes catalog, this section may fit better near Information architecture / Routes, or later as a separate metadata doc. **Priority: Low.** 

**Screens catalog**
Some reusable visual rules are embedded in screen descriptions, such as responsive grid counts and repeated card behavior. The document rules already say reusable visual/system decisions should live in UI, so these should eventually be moved or replaced with references. **Priority: Low.** 

---

### Sections too vague to be useful

**Concepts → Student activity**
The section says item-level activity tracking exists and tracks item view count, but does not define what counts as a view, when it increments, whether Study and Play both count, or whether repeated views count. That may be enough for product direction, but weak for AI-assisted coding. **Priority: Medium.** 

**Concepts → Mastery tracking**
The section is correctly labeled early, but the candidate concepts are too undefined to guide implementation. This is acceptable if kept as future thinking, but it should not sit too close to committed tracking decisions without a stronger “future only” label. **Priority: Low.** 

**Releases → Ideas / backlog**
The section says it “can hold future ideas” but currently does not add useful source-of-truth value. Empty sections are fine, but this one should either stay as a placeholder explicitly or move to a future backlog file later. **Priority: Low.** 

---

## 3. Smallest useful cleanup pass

1. **Add a “status vocabulary” under Document rules.**
   Define what `Confirmed`, `Direction`, `Open question`, `Future direction`, `Candidate`, and `Post-MVP` mean.

2. **Fix the Recommended wording.**
   Change the Product principle and Learning flow so they say Explore is current/MVP, Recommended is future/post-MVP.

3. **Normalize the module review terminology.**
   Pick one model term: probably `module review set`. Use `Full review` only as the user-facing label. Remove or reword “synthetic Full review lesson.”

4. **Normalize the selected-resource surface terminology.**
   Use one product term, such as `selected study-resource surface`, and one component term, such as `selected-resource-drawer`. Avoid `selected lesson surface` where module review sets are also selectable.

5. **Move or relabel “Listening rounds versus global sound.”**
   Put it under Sound or Play, and clarify the manual-off versus auto-off behavior.

6. **Patch MVP Settings scope.**
   Add Sound to the Releases → MVP Settings bullet.

7. **Reduce duplicated canonical rules.**
   Keep module review ordering and listening-round behavior canonical in one place each, then use short references elsewhere.

---

## 4. Suggested future document split

### `PRODUCT_CORE.md`

**What belongs there:**
Product definition, core promise, product principles, glossary, learning content model, sound model, privacy/storage/analytics model, student activity basics.

**Move out of current master:**
Most of `Product overview` and `Concepts`, except route-specific metadata and deeply screen-specific behavior.

**Why it reduces confusion:**
It gives future readers one place to understand the stable product model without wading through route catalogs, screen layouts, or UI components.

---

### `IA_AND_ROUTES.md`

**What belongs there:**
Sections, route notation, routing model, routes catalog, not-found handling, navigation model, metadata/indexability rules.

**Move out of current master:**
`Information architecture`, `Routes catalog`, `Navigation model`, and probably `Metadata, discovery, and sharing`.

**Why it reduces confusion:**
Routes, canonical URLs, redirects, dock visibility, and not-found behavior are tightly related. Keeping them together prevents route behavior from being scattered across Concepts, Screens, and Releases.

---

### `SCREENS_AND_FLOWS.md`

**What belongs there:**
Learning flows, utility flows, screen contract template, Screens catalog, Play flow screens.

**Move out of current master:**
`Flows` and `Screens`.

**Why it reduces confusion:**
This would become the main reference for product behavior at the screen level. It would also keep screen-specific content separate from reusable UI-system rules, matching the document’s own rule. 

---

### `UI_SYSTEM.md`

**What belongs there:**
Screen anatomy, navigation chrome, action placement, overlay system, preview grid system, design system, component catalog, UI open questions.

**Move out of current master:**
The full `UI` section.

**Why it reduces confusion:**
Reusable UI decisions are extensive enough to deserve their own file. This also reduces the chance that screen-specific docs and UI-system docs duplicate each other.

---

### `RELEASES_AND_DECISIONS.md`

**What belongs there:**
MVP scope, next releases, future work, ideas/backlog, decisions log.

**Move out of current master:**
`Releases` and `Decisions log`.

**Why it reduces confusion:**
Release scope and decisions are time-sensitive compared with core product concepts. Keeping them separate makes it easier to update scope without accidentally changing the product model.

---

## 5. Recommended migration order

1. **First clean terminology in the current master.**
   Do not split yet. Fix Recommended, module review naming, selected-resource naming, and Settings release scope first.

2. **Then separate `IA_AND_ROUTES.md`.**
   Routing is already well-structured and naturally separable. This is likely the safest first split.

3. **Then separate `UI_SYSTEM.md`.**
   The UI section is large and internally coherent, so moving it out would reduce document weight without losing meaning.

4. **Then separate `SCREENS_AND_FLOWS.md`.**
   Do this after UI is separate, so screen docs can reference UI-system rules instead of duplicating them.

5. **Then separate `RELEASES_AND_DECISIONS.md`.**
   This should happen once the stable product docs are clean, because release scope depends on the cleaned terminology.

6. **Keep `PRODUCT_CORE.md` or a slim `PRODUCT.md` as the master index.**
   The master should retain the product promise, core concepts, status vocabulary, and links to the split docs.

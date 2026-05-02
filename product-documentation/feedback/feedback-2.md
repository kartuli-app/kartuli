## 1. Overall verdict
- Yes, but as a working monolith rather than a long-term master.
- The document is detailed enough to keep using for MVP product work, and explicit incompleteness is not the problem. The main risk is authority drift: current rules, future candidates, route specs, screen specs, and design-system detail are mixed together and often restated.

## 2. Problems in the current document
References below are to sections in [PRODUCT.md](/home/viktor/Downloads/personal/repos/kartuli/PRODUCT.md:1).

### Ambiguities
- `Product principles`, `Recommended`, `/{locale}/app/learn`, `Future work (prioritized)`, and `Decisions log`: the doc says students choose what to practice in 2 ways, `Explore` and `Recommended`, but routing, release scope, and the decisions log treat `Recommended` as deferred. That makes current-state versus future-direction unclear, and a reader or AI tool could assume a missing MVP route/state already exists. Priority: high.
- `Study screen`, `Play screen`, `Game Lobby flow screen`, and `Play leave confirmation surface`: several rules say return to the “source catalog/browser route” or “source Study route,” while the doc also allows direct entry into Study or Play. The fallback target when there is no tracked source is not defined, so back/leave behavior is underspecified where deterministic rules matter most. Priority: high.
- `Modules`, `Module browser screen pattern`, `Alphabet catalog screen`, and the module review routes: the model clearly uses module-style review resources for both alphabet and vocabulary, but `Modules` frames modules as especially important for vocabulary. That leaves it unclear whether modules are a general content-model concept or mainly a vocabulary concept with an alphabet exception. Priority: medium.

### Contradictions
- `Document rules` versus `Flows` and `Decisions log`: the file says screen-specific details should live in `Screens` and reusable visual/system decisions should live in `UI`, but equivalent behavior rules are restated in `Flows` and again in `Decisions log`. Even when the content agrees, the document does not follow its own placement rules. Priority: high.
- `Screen contract template` versus `Screens catalog` and `Remaining open questions`: the template says each screen should define `Open questions`, but most actual screen entries omit that field and unresolved items are centralized later. That creates an inconsistent contract and makes in-context uncertainty harder to spot. Priority: medium.

### Naming / terminology issues
- `Not found` versus `Not-found handling`, `Study resource unavailable screen`, and `Play resource unavailable screen`: the glossary makes `Not found` sound like one broad family, while IA later separates global not-found from route-owned unavailable states. That can cause readers to collapse two different failure modes into one. Priority: high.
- `Module review set`, `generated full-review resource`, `synthetic Full review lesson`, and `full review card`: one concept has too many labels, and one of them says `lesson` while another section explicitly says it is not an authored lesson. This is the biggest terminology drift in the file. Priority: high.
- `Flow screen` versus `Flow Step`, and `selected study-resource surface` versus `selected-resource-drawer`: the doc switches labels for the same concepts, which weakens consistency and makes extraction into implementation/component names less reliable. Priority: medium.

### Duplication / redundancy
- `Listening rounds versus global sound`, `Play flow`, `Play screen`, `Game Lobby flow screen`, and `Decisions log`: the same listening-round and sound-toggle rules are described repeatedly. A future behavior change would need updates in many places, which makes drift likely. Priority: high.
- `Module review set`, `Module browser screen pattern`, `Alphabet catalog screen`, `Vocabulary catalog screen`, `Routes catalog`, and `Decisions log`: full-review behavior, ordering, and naming are repeated across concept, routing, screen, and decision sections. It is hard to tell where the canonical definition lives. Priority: high.
- `Decisions log`: most entries restate live spec text rather than logging only non-obvious decisions or decision history. In practice it behaves like a second flatter version of the main doc. Priority: high.

### Misplaced information
- `Client-side preference resolution`: the policy part belongs here, but SSR/hydration placeholder guidance reads like implementation architecture rather than product source-of-truth material. Priority: medium.
- `Design system` through `Components catalog`: this is valuable material, but it is detailed enough to be a standalone design-system spec. In the product master it overwhelms the product model and blurs authority boundaries. Priority: high.

### Sections too vague to be useful
- `Additional section candidates` and `Additional route candidates`: these sit close to authoritative IA/routing sections but do not clearly say whether they are ideas, deferred scope, or likely next steps. That makes them risky for future readers and AI tools to over-interpret. Priority: medium.
- `Remaining open questions`: centralizing open questions is fine, but the list is not tied back to owning routes/screens/components. As the file grows, this will be hard to maintain and easy to desynchronize. Priority: medium.

## 3. Smallest useful cleanup pass
- Add a simple status label wherever current and future are mixed: `Current MVP`, `Future candidate`, or `Open question`.
- Define one explicit fallback navigation rule for direct-entry `Study` and `Play`, including what “Back to Study” means if Study was never opened first.
- Pick one canonical term for the generated review resource, add one alias note once, and normalize the rest of the document to that term.
- Collapse repeated sound/listening-round rules into one canonical section and replace restatements elsewhere with short references.
- Shrink `Decisions log` so it only keeps cross-cutting or surprising decisions, or convert it into pointer bullets that reference the owning section instead of repeating spec text.
- Add one authority note near `UI` explaining whether this section is the source of truth or whether a derivative design doc is intended to become authoritative.

## 4. Suggested future document split
- `PRODUCT.md` as the master: keep `Product overview`, core glossary, learning-content model, localization, brand/tone, sound/privacy/storage rules, and other stable cross-cutting product policies. Remove route-by-route, screen-by-screen, UI token/component catalogs, and release/backlog detail. This keeps the master readable and makes it clearer what the product fundamentally is.
- `ROUTING.md`: put `Information architecture`, routing model, routes catalog, navigation model, metadata/indexability-by-route, and route-owned unavailable-state definitions here. Move those sections out of the master. This reduces confusion by giving URL behavior one clear home.
- `SCREENS.md`: put `Flows`, `Screen contract template`, the full `Screens catalog`, and flow-screen specs here. Move screen-level behavior out of the master. This reduces repetition because screen behavior no longer has to compete with routing and product-model sections.
- `DESIGN.md`: make [DESIGN.md](/home/viktor/Downloads/personal/repos/kartuli/DESIGN.md:1) authoritative for the current `UI` section, including screen anatomy, overlay families, preview-grid rules, design-system roles, and component catalog. Remove that material from the master. This reduces the biggest boundary blur in the current setup.
- `RELEASES.md` or `ROADMAP.md`: move `MVP`, `Next releases`, `Future work`, and backlog material here. Remove time-based scope from the master except for a short summary link. This separates “what the product is” from “what ships when.”

A separate `DECISIONS.md` is optional later, but I would not split it yet. First reduce repetition inside the main docs.

## 5. Recommended migration order
1. First make `DESIGN.md` authoritative and move the `UI` section there, because it is already the most standalone material and gives the biggest size reduction with the least product-risk.
2. Then separate `ROUTING.md`, because the route catalog and navigation rules are already structured and can stand alone cleanly.
3. Then separate `SCREENS.md`, so flow and screen behavior can reference routing instead of repeating it.
4. Then separate `RELEASES.md` or `ROADMAP.md`, because that is useful but less urgent than fixing authority boundaries.
5. Keep `PRODUCT.md` as the compact master, and only then decide whether the `Decisions log` should stay as a tiny appendix or become its own historical document.
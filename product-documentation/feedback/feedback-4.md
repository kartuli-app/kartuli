## 1. Overall verdict
**Stable enough to continue using.**  
The document is thorough, mostly self-consistent, and covers product definition, routing, flows, screens, and UI with clear rules. It’s a usable source of truth for today’s work. The main risk over time is divergence between the body and the trailing decisions log, plus a few naming ghosts. Those are manageable with a small cleanup pass now, and splitting can wait until the content volume makes a single file harder to edit.

---

## 2. Problems in the current document

### Ambiguities
- **Section:** *Listening rounds versus global sound* (Concepts) → *Play flow* → *Game Lobby flow screen*  
  **Why it’s a problem:** It’s not fully spelled out what happens in the Lobby UI when global sound is disabled and the student tries to toggle “Include listening rounds.” The text says “listening rounds cannot be enabled until sound is enabled again” but never says whether the toggle is visually disabled, tappable-with-a-message, or hidden. An implementer could guess, but the doc should own that decision.  
  **Priority:** Medium  

### Contradictions
None found strong enough to flag. The document appears internally consistent.

### Naming / terminology issues
- **Section:** *Alphabet catalog screen* vs *Module browser screen pattern*  
  **Why it’s a problem:** The alphabet screen’s content block calls its selection area “Selected lesson surface,” while the shared module-browser pattern defines “selected study-resource surface” (which also covers the full-review card). This creates two names for the same concept and could trip up an AI tool generating per-screen specs.  
  **Priority:** Low  

- **Section:** *Decisions log* uses phrase “selected-lesson surface” while the component catalog calls it `selected-resource-drawer`. The log inherited old wording.  
  **Why it’s a problem:** Future readers may wonder if “selected-lesson surface” is a different thing.  
  **Priority:** Low  

### Duplication / redundancy
- **Section:** *Decisions log* (last section)  
  **Why it’s a problem:** The log is essentially an unstructured rephrasing of decisions already embedded in the Concepts, Flows, Screens, and UI sections. It’s already out of sync in tone and at risk of becoming stale. Two sources of truth for the same decisions is a maintenance hazard.  
  **Priority:** High  

- **Section:** *Sound* and *Play flow / Lobby*  
  **Why it’s a problem:** The listening-rounds hierarchy (global sound → lobby toggle → session fixity) is explained in three places. Not contradictory, but each restatement adds bulk. If a rule changes, all must be found and updated.  
  **Priority:** Low  

### Misplaced information
- **Section:** *Typography rules* inside *UI* includes font-family foundations (`font-ui`, `font-georgian`) but the rest of the design system uses abstract numeric foundations. That’s fine, but the same section later defines a full typography role catalog; that catalog reads more like a component-typo mapping than a design-system token map. It’s hard for someone maintaining tokens to know whether to own all those roles in the system or let them live closer to components.  
  **Priority:** Medium (because later component work will need clear answers)

### Sections too vague to be useful
- **Section:** *Mastery tracking*  
  **Why it’s a problem:** It says “This section is still early” with a few candidate concepts. That’s intentional and acceptable for now. No change needed at this stage.

- **Section:** *Ideas / backlog*  
  **Why it’s a problem:** Same as above; it’s a placeholder list. Acceptable.

---

## 3. Smallest useful cleanup pass
The following edits would improve the document without restructuring:

1. **Delete the Decisions log section.**  
   All important decisions are already part of the feature sections. Removing the log eliminates duplication and the risk of drift.

2. **Rename the alphabet catalog’s “Selected lesson surface” to “Selected study-resource surface”** to match the module browser pattern and component catalog.

3. **Clarify one sentence in *Game Lobby flow screen*:**  
   “If global sound is disabled, the listening-rounds toggle is visible but cannot be switched on; tapping it shows the same enable-sound feedback used for explicit audio controls.” That closes the ambiguity.

4. **Mark the typography role catalog as a working list that lives with the UI Components section**, not with the design-token model. Add a short note: “These roles are used by the component library and may map to the shared type foundations; final mapping is deferred.”

These are four low-risk changes that keep the document coherent.

---

## 4. Suggested future document split
When the volume grows too large or separate teams need independent files, split as follows:

### Document A: `PRODUCT-CORE.md`
- **What belongs there:** Product definition, Core promise, Principles, Concepts (but only the definitional ones, not flows or routing), Localization, Brand/Tone, Metadata model, Privacy/storage consent concepts (not flows), Sound preference concepts, Mastery tracking placeholders, and the Terminology/Glossary.
- **Removes from current master:** All of the above, leaving the master for flows, routing, screens, and UI.
- **Why:** Keeps the “what and why” separate from the “how”. Reduces confusion for new contributors who only need product strategy.

### Document B: `ROUTES-AND-FLOWS.md`
- **What belongs there:** Information architecture, Routing model, Routes catalog (with redirects, not-found, unavailable states), Navigation model (dock, back button), all Flows (Learning flows, Utility flows).
- **Removes from master:** The entire IA/routing section and flow descriptions.
- **Why:** Routing and navigation change together; flows explain transitions. A single file for the “where and how to move” prevents screen docs from being cluttered with URL details.

### Document C: `SCREENS.md`
- **What belongs there:** The entire Screens section (screen contract catalog), with screen definitions and their flow screens.
- **Remains in master?** No, moved out.
- **Why:** Screens are the largest section and will grow fastest. Isolating them keeps AI-assisted coding (route → screen) focused.

### Document D: `UI-SYSTEM.md`
- **What belongs there:** Screen anatomy rules, Navigation chrome rules, Action placement, Overlay/feedback system, Preview grid system, Global UI surfaces (banner, leave confirmation), Design system principles, Color palette roles, Typography foundations and roles, Layout principles, Depth/elevation, Responsive rules, Component catalog, Cross-product guardrails.
- **Removes from master:** The entire UI section.
- **Why:** Design decisions and component structure evolve with the implementation layer and should be referenced by both product and engineering without needing the full product spec.

### Keep in the master (after splits):  
`RELEASES.md` (Releases section) plus any remaining boilerplate (Document rules). The master document becomes a short integration index that links to the split files and explains the purpose of each.

---

## 5. Recommended migration order
If you split later, do it in this order to minimise disruption:

1. **First, separate `ROUTES-AND-FLOWS.md`** – routing and navigation underpin all screen definitions; extracting them early ensures screen files never reference stale patterns.  
2. **Next, separate `SCREENS.md`** – once routing is stable, screen definitions can move without breaking cross-references.  
3. **Then, separate `UI-SYSTEM.md`** – the UI decisions are referenced by screens, so moving them after screens reduces the chance of orphan references.  
4. **Finally, separate `PRODUCT-CORE.md`** – the core concepts remain the most stable; moving them last completes the set.  
5. **Keep `RELEASES.md` in the master** as a slim scope document. The master then acts as a map of the split.
# AI Agent Instructions

## Documentation Structure
- All documentation lives in `/docs/` with numbered folders and files
- Format: `XX-folder-name/` and `XX-document-name.md`
- README files contain only navigation links
- Maintain zero-padded numbering for proper sorting

## Maintenance Rules

### Adding, Removing, or Updating Documentation Files
**CRITICAL CHECKLIST** when modifying .md files in /docs/:

**If ADDING a new document:**
- [ ] Create document with proper zero-padded numbering
- [ ] Update immediate folder's README.md with new link
- [ ] Update parent folder's README.md (if nested like /docs/07-technology/01-shared/)
- [ ] Update /docs/README.md (if adding new top-level sections)
- [ ] Verify all README links work from root to leaf

**If RENAMING a document:**
- [ ] Update filename with proper numbering
- [ ] Update all references in immediate folder's README.md
- [ ] Update all references in parent folder's README.md (if nested)
- [ ] Update cross-references in other documents that link to this file
- [ ] Verify all links still work

**If DELETING a document:**
- [ ] Remove from immediate folder's README.md
- [ ] Remove from parent folder's README.md (if nested)
- [ ] Check for and update cross-references in other documents
- [ ] Verify no broken links remain

**If REORDERING documents:**
- [ ] Rename files to maintain zero-padded numbering
- [ ] Update all affected README.md files
- [ ] Maintain logical order within folders

**When changing code:**
- [ ] Update relevant documentation
- [ ] README files are excluded from LLM document generation

## File Naming Convention
- Folders: `XX-folder-name/` (zero-padded numbers)
- Documents: `XX-document-name.md` (zero-padded numbers)
- READMEs: `README.md` (no numbering)

## Code-Documentation Sync
- Update architecture docs when changing APIs or data flow
- Update product docs when changing user experience
- Update infrastructure docs when changing services or dependencies
- Update learning system docs when changing content or data models
- Always update relevant README.md files when adding/removing documents

# AI Agent Instructions

## Documentation Structure
- All documentation lives in `/docs/` with numbered folders and files
- Format: `XX-folder-name/` and `XX-document-name.md`
- README files contain only navigation links
- Maintain zero-padded numbering for proper sorting

## Maintenance Rules
1. When adding documents: Update relevant README.md with new link
2. When reordering: Rename files and update all affected README.md files
3. When removing: Remove file and update README.md
4. When changing code: Update relevant documentation
5. README files are excluded from LLM document generation

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

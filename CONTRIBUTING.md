# Contributing to Kartuli

## Documentation Structure

Our documentation follows a numbered folder structure in `/docs/`:

### Adding New Documents
1. Create document with zero-padded numbering: `XX-document-name.md`
2. Update the relevant folder's `README.md` with a link to the new document
3. Maintain logical order within folders

### Reordering Documents
1. Rename files to maintain zero-padded numbering
2. Update all `README.md` files that reference the moved documents
3. Update any cross-references in other documents

### Code-Documentation Synchronization
- Update architecture documentation when changing APIs or data flow
- Update product documentation when changing user experience
- Update infrastructure documentation when changing services or dependencies
- Update learning system documentation when changing content or data models
- Always update relevant README.md files when adding/removing documents

### Folder Structure
- `01-mission-vision/` - Project mission and vision
- `02-business-strategy/` - Business model and strategy
- `03-glossary/` - Key terms and definitions
- `04-roadmap/` - Project phases and milestones
- `05-learning-system/` - Learning system architecture
- `06-product/` - Product experience and design
- `07-technology/` - Technical implementation details

See `/docs/README.md` for complete structure.

## Development Workflow
1. Create feature branch
2. Make changes
3. Update relevant documentation
4. Test changes
5. Submit pull request

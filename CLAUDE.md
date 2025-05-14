**IMPORTANT FOR CLAUDE: Reference this file before implementing anything**

# Project: Kannotban

## Project Overview

Kannotban is a collaborative Kanban board application for managing tasks across "To Do", "Doing", and "Done" columns with drag-and-drop functionality and localStorage persistence.

## Tech Stack

- Languages: TypeScript
- Frameworks: SvelteKit
- Tools: npm, Tailwind CSS
- Storage: localStorage

## Code Style & Conventions

### Import/Module Standards

- Sort imports alphabetically within groups
- Group imports by: (1) SvelteKit/Svelte, (2) external libraries, (3) internal modules
- Use path aliases via `$lib/` for internal imports
- No side effects in import statements

### Naming Conventions

- Functions: camelCase, descriptive verbs (e.g., `createTask`, `moveTask`)
- Classes/Components: PascalCase (e.g., `TaskCard`, `BoardColumn`)
- Constants: camelCase for exported, UPPER_SNAKE_CASE for internal
- Files: kebab-case.svelte for components, kebab-case.ts for utilities

### Patterns to Follow

- Flat component hierarchy with self-contained components
- Use Svelte stores for application state management
- Component props for passing data down
- Events for communicating up from child to parent
- Use TypeScript interfaces for data models

## Development Workflow

- Branch strategy: feature branches from main
- Commit message format: Conventional Commits (`feat(board): add drag and drop`)
- PR requirements: Passes manual testing, follows coding standards

## Testing Strategy

- Manual testing focused on user flows
- Visual verification of component rendering
- Test tasks: creation, editing, dragging between columns, persistence

## Environment Setup

- Required environment variables: None (local-only application)
- Setup commands: See "Common Commands"
- Local development server: `npm run dev`

## Common Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check types
npm run check
```

## Project Structure

Key directories and their purpose:

- `/src/routes` - SvelteKit file-based routing
- `/src/lib/components` - Reusable UI components
- `/src/lib/stores` - State management
- `/src/lib/models` - TypeScript interfaces/types
- `/src/lib/actions` - Svelte actions for custom directives
- `/src/lib/utils` - Helper functions

## Review Process Guidelines

Before submitting any code, ensure the following steps are completed:

1. **Run all check commands**

2. **Review outputs and iterate until all issues are resolved**

3. **Assess compliance**:
   For each standard, explicitly state ✅ or ❌ and explain why:

   - Code style and formatting
   - Naming conventions
   - Architecture patterns (refer to `ARCHITECTURE.md`)
   - Error handling
   - Documentation

4. **Self-review checklist**:
   - [ ] Code follows flat component hierarchy pattern
   - [ ] No debug/commented code
   - [ ] Global error handling implemented
   - [ ] Manual testing completed
   - [ ] TypeScript interfaces properly defined
   - [ ] Accessibility standards met
   - [ ] `svelte-check` warnings addressed
   - [ ] Forms have proper validation

## Accessibility Standards

- Dialogs with role="dialog" must have tabindex="-1"
- Elements with click events must have keyboard event handlers
- Use appropriate ARIA attributes (aria-labelledby, aria-modal, etc.)
- Manage focus when modals open/close
- Ensure keyboard navigation with ESC key support for closing dialogs

## Known Issues & Workarounds

- localStorage limits (5-10MB): Keep task data compact
- localStorage is synchronous: Avoid excessive reads/writes
- Drag and drop requires polyfill for older browsers
- Temporal API `until` method requires careful implementation

## References

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Svelte Drag and Drop Examples](https://svelte.dev/repl/e0e437cbb1dc4eb9b97bcabc3d093761)
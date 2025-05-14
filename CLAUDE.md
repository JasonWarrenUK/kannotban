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

- `/src/routes
# Kannotban: Architecture Specification

## Technology Stack

- **Language**: TypeScript
- **Framework**: SvelteKit
- **Package Manager**: npm
- **Styling**: Tailwind CSS
- **Data Storage**: localStorage
- **Date/Time**: Temporal API (via @js-temporal/polyfill)
- **Build/Dev Tools**: Vite (included with SvelteKit)

## Project Structure

Following SvelteKit's route-based structure:

```
kannotban/
├── src/
│   ├── app.html              # SvelteKit app template
│   ├── app.css               # Global styles with Tailwind directives
│   ├── routes/               # SvelteKit routes
│   │   ├── +page.svelte      # Main board view
│   │   ├── +page.ts          # Data loading
│   │   ├── +layout.svelte    # App layout wrapper
│   │   └── +error.svelte     # Error page
│   ├── lib/                  # Shared code
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/           # Generic UI components
│   │   │   └── board/        # Board-specific components
│   │   ├── stores/           # Svelte stores for state management
│   │   ├── models/           # TypeScript interfaces/types
│   │   ├── actions/          # Svelte actions (for drag/drop)
│   │   └── utils/            # Helper utilities
│   └── app.d.ts              # TypeScript declarations
├── static/                   # Static assets
├── tailwind.config.js        # Tailwind configuration
├── svelte.config.js          # Svelte configuration
├── vite.config.ts            # Vite configuration
└── tsconfig.json             # TypeScript configuration
```

## Component Architecture

Using a flat component hierarchy with self-contained components:

### Core Components

1. **BoardLayout**: Overall container for the Kanban board
2. **Column**: Container for task cards within a status category
3. **TaskCard**: Individual task representation
4. **TaskForm**: Form for creating/editing tasks
5. **ConfirmDialog**: Reusable confirmation modal

### Component Relationships

```
BoardLayout
├── Column (To Do)
│   └── TaskCard (multiple)
├── Column (Doing)
│   └── TaskCard (multiple)
├── Column (Done)
│   └── TaskCard (multiple)
└── TaskForm (shown/hidden as needed)
```

## Data Model

### Task Interface

```typescript
export interface Task {
  id: string;              // Unique identifier
  title: string;           // Task title
  description?: string;    // Optional description
  status: Status;          // Current column
  createdAt: number;       // Timestamp
  updatedAt: number;       // Timestamp
  
  // Enhanced features (target)
  assignee?: string;       // Person assigned to the task
  priority?: Priority;     // Priority level
  dueDate?: number;        // Timestamp for due date
  
  // Advanced features (stretch)
  comments?: Comments;     // Array of comments
  attachments?: Attachments; // Array of attachments
}

export type Status = "todo" | "doing" | "done";
export type Priority = "low" | "medium" | "high";
export type Comments = Comment[];
export type Attachments = Attachment[];

export interface Comment {
  id: string;
  text: string;
  createdAt: number;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  createdAt: number;
}
```

## State Management

Using Svelte stores for application state:

```typescript
// Tasks store
export const tasks = writable<Task[]>([]);

// UI state store (for modals, active task, etc.)
export const uiState = writable({
  isTaskFormOpen: false,
  activeTaskId: null,
  isConfirmDialogOpen: false,
  confirmAction: null
});
```

## Storage Implementation

```typescript
const STORAGE_KEY = 'kannotban-tasks';

// Save tasks to localStorage
export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
    throw new Error('Failed to save tasks. Storage might be full or unavailable.');
  }
}

// Load tasks from localStorage
export function loadTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return [];
  }
}

// Clear all tasks from localStorage
export function clearTasks(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear tasks from localStorage:', error);
    throw new Error('Failed to clear tasks. Storage might be unavailable.');
  }
}

// Check if localStorage is available
export function isStorageAvailable(): boolean {
  try {
    const testKey = 'kannotban-storage-test';
    localStorage.setItem(testKey, 'test');
    const result = localStorage.getItem(testKey) === 'test';
    localStorage.removeItem(testKey);
    return result;
  } catch (error) {
    return false;
  }
}
```

## Date Utilities

```typescript
import { Temporal } from '@js-temporal/polyfill';

// Get current timestamp as a number
export function getCurrentTimestamp(): number {
  return Temporal.Now.instant().epochMilliseconds;
}

// Format a timestamp to a readable date string
export function formatTimestamp(timestamp: number): string {
  const instant = Temporal.Instant.fromEpochMilliseconds(timestamp);
  const zonedDateTime = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId());
  
  return zonedDateTime.toLocaleString(undefined, {
    year: 'num
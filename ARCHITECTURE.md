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
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Check if a due date is in the past
export function isDueDatePast(dueDate: number): boolean {
  const now = Temporal.Now.instant();
  const due = Temporal.Instant.fromEpochMilliseconds(dueDate);
  
  return Temporal.Instant.compare(due, now) < 0;
}

// Check if a due date is approaching (within 24 hours)
export function isDueDateApproaching(dueDate: number): boolean {
  const now = Temporal.Now.instant();
  const due = Temporal.Instant.fromEpochMilliseconds(dueDate);
  const diffInHours = Temporal.Instant.until(now, due, { largestUnit: 'hour' }).hours;
  
  return diffInHours > 0 && diffInHours <= 24;
}
```

## Interactions and Events

### Drag and Drop

Implementing drag and drop using Svelte actions:

```typescript
// src/lib/actions/draggable.ts
export function draggable(node: HTMLElement) {
  // Implementation for making elements draggable
}

// src/lib/actions/dropzone.ts
export function dropzone(node: HTMLElement, options: DropzoneOptions) {
  // Implementation for creating drop zones
}
```

## Error Handling

Using a global error handler to capture and display errors:

```typescript
// In the root +layout.svelte
let errorToast: { message: string, type: 'error' | 'warning' | 'info' } | null = null;

// Set up error handler
onMount(() => {
  window.addEventListener('error', (event) => {
    errorToast = { message: event.message, type: 'error' };
    setTimeout(() => errorToast = null, 5000);
  });
});
```

## Performance Considerations

1. **Minimize rerenders**: Use Svelte's reactivity system efficiently
2. **Debounce save operations**: Avoid excessive localStorage writes
3. **Lazy load components**: Use dynamic imports for non-critical components
4. **Optimize drag operations**: Use requestAnimationFrame for smooth animations

## Accessibility Features

1. **Keyboard navigation**: Ensure all functions are accessible without mouse
2. **ARIA attributes**: Add proper ARIA roles and attributes to components
3. **Color contrast**: Ensure text meets WCAG guidelines
4. **Screen reader support**: Provide appropriate text alternatives

## Implementation Approach

1. Begin with core board structure and basic task card implementation
2. Add drag and drop functionality
3. Implement data persistence with localStorage
4. Add task creation, editing, and deletion
5. Enhance visual design and feedback
6. Add additional features based on milestone priorities
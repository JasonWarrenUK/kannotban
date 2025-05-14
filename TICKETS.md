# Kannotban Project Tickets

This document outlines the development tickets for the Kannotban project, organized by dependencies and assigned to specific developers.

## Project Setup Tickets

### SETUP-1: Initialize SvelteKit Project

- **Description**: Set up the initial SvelteKit project with TypeScript and Tailwind CSS
- **Deliverables**:
  - Initialized SvelteKit project with TypeScript
  - Configured Tailwind CSS
  - Set up project structure according to ARCHITECTURE.md
  - Added basic route structure
- **Dependencies**: None
- **Assignee**: Ryan
- **Definition of Done**: Project can be built and run with `npm run dev`

### SETUP-2: Create Basic Component Structure

- **Description**: Create the shell components defined in the architecture
- **Deliverables**:
  - Create empty component files for BoardLayout, Column, TaskCard, TaskForm, and ConfirmDialog
  - Set up basic styling with Tailwind
  - Add component exports and imports
- **Dependencies**: SETUP-1
- **Assignee**: Ryan
- **Definition of Done**: All components are created and importable

## Data Layer Tickets

### DATA-1: Implement Data Models and Storage

- **Description**: Create TypeScript interfaces for data models and implement localStorage utilities
- **Deliverables**:
  - Create Task interface in models directory
  - Implement localStorage save/load utilities
  - Add error handling for storage operations
- **Dependencies**: SETUP-1
- **Assignee**: Jason
- **Definition of Done**: Task interface is defined and storage utilities can save/load data

### DATA-2: Create Svelte Stores

- **Description**: Implement Svelte stores for state management
- **Deliverables**:
  - Create tasks store
  - Create UI state store
  - Add derived stores for filtering tasks by status
- **Dependencies**: DATA-1
- **Assignee**: Jason
- **Definition of Done**: Stores are implemented and can be subscribed to

## UI Implementation Tickets

### UI-1: Implement Board Layout

- **Description**: Complete the board layout with three columns
- **Deliverables**:
  - Implement BoardLayout component
  - Add Column components with appropriate styling
  - Ensure responsive layout
- **Dependencies**: SETUP-2
- **Assignee**: Alex
- **Definition of Done**: Board displays with three correctly styled columns

### UI-2: Implement Basic Task Cards

- **Description**: Create the TaskCard component with basic information display
- **Deliverables**:
  - Implement TaskCard component with title and description
  - Add styling for different states (hover, drag, etc.)
  - Visual indicator of status based on column
- **Dependencies**: UI-1, DATA-2
- **Assignee**: Alex
- **Definition of Done**: Task cards can be rendered with sample data

### UI-3: Implement Task Form

- **Description**: Create form for adding and editing tasks
- **Deliverables**:
  - Implement TaskForm component
  - Add validation for required fields
  - Style form elements consistently
- **Dependencies**: SETUP-2, DATA-2
- **Assignee**: Ryan
- **Definition of Done**: Form can be opened, filled out, and submitted

### UI-4: Implement Confirmation Dialog

- **Description**: Create reusable confirmation dialog
- **Deliverables**:
  - Implement ConfirmDialog component
  - Add animations for dialog appearance/disappearance
  - Ensure keyboard accessibility
- **Dependencies**: SETUP-2
- **Assignee**: Alex
- **Definition of Done**: Dialog can be opened, confirmed, or cancelled

## Functionality Tickets

### FUNC-1: Implement Task CRUD Operations

- **Description**: Implement task creation, reading, updating, and deletion
- **Deliverables**:
  - Add task creation functionality
  - Add task update functionality
  - Add task deletion with confirmation
  - Connect operations to localStorage
- **Dependencies**: DATA-2, UI-3, UI-4
- **Assignee**: Jason
- **Definition of Done**: All CRUD operations work and persist to localStorage

### FUNC-2: Implement Drag and Drop

- **Description**: Implement drag and drop functionality for moving tasks between columns
- **Deliverables**:
  - Create draggable action for TaskCard
  - Create dropzone action for Column
  - Implement status update logic when a task is moved
  - Add visual feedback during drag operations
- **Dependencies**: UI-2, DATA-2
- **Assignee**: Ryan
- **Definition of Done**: Tasks can be dragged between columns with appropriate visual feedback

## Enhanced Features Tickets

### ENH-1: Add Assignee and Priority to Tasks

- **Description**: Extend the Task model and UI to include assignee and priority
- **Deliverables**:
  - Update Task model
  - Update TaskForm to include new fields
  - Update TaskCard to display new information
  - Update storage utilities
- **Dependencies**: FUNC-1
- **Assignee**: Jason
- **Definition of Done**: Tasks can be created and updated with assignee and priority information

### ENH-2: Add Due Date Functionality

- **Description**: Implement due date feature with visual indicators
- **Deliverables**:
  - Update Task model
  - Add date picker to TaskForm
  - Add due date display to TaskCard
  - Add visual indicators for approaching/past dates
- **Dependencies**: ENH-1
- **Assignee**: Alex
- **Definition of Done**: Tasks can have due dates with appropriate visual indicators

### ENH-3: Implement Filtering and Sorting

- **Description**: Add ability to filter and sort tasks
- **Deliverables**:
  - Add filter controls to UI
  - Implement filter logic in stores
  - Add sorting options
  - Preserve filter/sort preferences in localStorage
- **Dependencies**: FUNC-1
- **Assignee**: Ryan
- **Definition of Done**: Tasks can be filtered and sorted by various criteria

## Testing and Finalization Tickets

### TEST-1: Manual Testing and Bug Fixes

- **Description**: Test all user flows and fix identified issues
- **Deliverables**:
  - Test all user flows defined in FUNCTIONAL.md
  - Fix identified bugs
  - Ensure responsive behavior on different screen sizes
- **Dependencies**: All UI and FUNC tickets
- **Assignee**: Alex
- **Definition of Done**: All user flows work as expected with no obvious bugs

### FINAL-1: Finalize Styling and Accessibility

- **Description**: Polish UI and ensure accessibility compliance
- **Deliverables**:
  - Add final polish to UI components
  - Ensure consistent styling
  - Implement keyboard navigation
  - Add appropriate ARIA attributes
  - Verify color contrast
- **Dependencies**: All UI tickets
- **Assignee**: Ryan
- **Definition of Done**: UI is polished and meets basic accessibility requirements

### FINAL-2: Documentation and Deployment

- **Description**: Document codebase and prepare for deployment
- **Deliverables**:
  - Update README with usage instructions
  - Add comments to complex code sections
  - Prepare build for production
  - Test production build
- **Dependencies**: All tickets
- **Assignee**: Jason
- **Definition of Done**: Documentation is complete and production build works as expected

## Ticket Dependencies Graph

```src
SETUP-1 ─┬─ SETUP-2 ─┬─ UI-1 ─── UI-2 ────────┬─ FUNC-2
         │           │                        │
         │           └─ UI-3 ───┐             │
         │                      │             │
         │           ┌─ UI-4 ───┼─ FUNC-1 ─┬─ TEST-1
         │           │          │          │
         └─ DATA-1 ─ DATA-2 ────┘          ├─ ENH-1 ─── ENH-2 ─┐
                                           │                   │
                                           └─ ENH-3 ───────────┼─ FINAL-1
                                                               │
                                                               └─ FINAL-2
```

## Developer Workload

### Ryan

- **SETUP-1**: Initialize SvelteKit Project
- **SETUP-2**: Create Basic Component Structure  
- **UI-3**: Implement Task Form
- **FUNC-2**: Implement Drag and Drop
- **ENH-3**: Implement Filtering and Sorting
- **FINAL-1**: Finalize Styling and Accessibility

### Jason

- **DATA-1**: Implement Data Models and Storage
- **DATA-2**: Create Svelte Stores
- **FUNC-1**: Implement Task CRUD Operations
- **ENH-1**: Add Assignee and Priority to Tasks
- **FINAL-2**: Documentation and Deployment

### Alex

- **UI-1**: Implement Board Layout
- **UI-2**: Implement Basic Task Cards
- **UI-4**: Implement Confirmation Dialog
- **ENH-2**: Add Due Date Functionality
- **TEST-1**: Manual Testing and Bug Fixes

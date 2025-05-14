# Kannotban Project Tickets (REVISED)

This document outlines the revised development tickets for the Kannotban project, with bottlenecks identified and resolved through task subdivision.

## Current Progress Status

### ✅ Completed Tickets

- SETUP-1: Initialize SvelteKit Project (Ryan)
- SETUP-2: Create Basic Component Structure (Ryan)
- DATA-1: Implement Data Models and Storage (Jason)

### 🔄 In Progress Tickets

- UI components have been scaffolded but need data connection

### ❌ Blocked Tickets

- Most functionality tickets are blocked by DATA-2 (Svelte Stores)

## Bottleneck Analysis

The primary bottleneck is DATA-2 (Create Svelte Stores), which blocks UI-2, UI-3, and FUNC-1. This creates a cascading effect that blocks many downstream tasks.

## Revised Tickets (Breaking up bottlenecks)

### DATA-2: Create Svelte Stores (SUBDIVIDED)

#### DATA-2A: Implement Basic Tasks Store

- **Description**: Create the core tasks store for basic application functionality
- **Deliverables**:
  - Create tasks store with basic CRUD operations
  - Connect to localStorage via utility functions
- **Dependencies**: DATA-1
- **Assignee**: Jason
- **Definition of Done**: Basic store is implemented and can be subscribed to

#### DATA-2B: Implement UI State Store

- **Description**: Create the UI state store for application interface state
- **Deliverables**:
  - Create UI state store (active modal, editing task, etc.)
- **Dependencies**: DATA-2A
- **Assignee**: Jason
- **Definition of Done**: UI state store is implemented

#### DATA-2C: Implement Derived Stores

- **Description**: Create derived stores for filtering tasks by status
- **Deliverables**:
  - Create derived stores that filter tasks by column
- **Dependencies**: DATA-2A
- **Assignee**: Jason
- **Definition of Done**: Derived stores are implemented and can be subscribed to

### UI-1: Implement Board Layout (MODIFIED)

- **Description**: Complete the board layout with three columns
- **Deliverables**:
  - Implement BoardLayout component
  - Add Column components with appropriate styling
  - Ensure responsive layout
  - Connect to basic tasks store (DATA-2A)
- **Dependencies**: SETUP-2, DATA-2A
- **Assignee**: Alex
- **Definition of Done**: Board displays with three correctly styled columns, connected to data store

### UI-2: Implement Basic Task Cards (INDEPENDENT)

- **Description**: Create the TaskCard component with basic information display
- **Deliverables**:
  - Implement TaskCard component with title and description
  - Add styling for different states (hover, drag, etc.)
  - Visual indicator of status based on column
- **Dependencies**: UI-1
- **Assignee**: Alex
- **Definition of Done**: Task cards can be rendered with actual data from the store

### UI-3: Implement Task Form (INDEPENDENT)

- **Description**: Create form for adding and editing tasks
- **Deliverables**:
  - Implement TaskForm component
  - Add validation for required fields
  - Style form elements consistently
  - Connect to UI state store
- **Dependencies**: SETUP-2, DATA-2B
- **Assignee**: Ryan
- **Definition of Done**: Form can be opened, filled out, and submitted

### UI-4: Implement Confirmation Dialog (INDEPENDENT)

- **Description**: Create reusable confirmation dialog
- **Deliverables**:
  - Implement ConfirmDialog component
  - Add animations for dialog appearance/disappearance
  - Ensure keyboard accessibility
  - Connect to UI state store
- **Dependencies**: SETUP-2, DATA-2B
- **Assignee**: Alex
- **Definition of Done**: Dialog can be opened, confirmed, or cancelled

### FUNC-1: Implement Task CRUD Operations (SUBDIVIDED)

#### FUNC-1A: Implement Task Creation

- **Description**: Implement task creation functionality
- **Deliverables**:
  - Add task creation functionality connected to store
  - Connect to TaskForm component
- **Dependencies**: DATA-2A, UI-3
- **Assignee**: Jason
- **Definition of Done**: Tasks can be created and persisted to localStorage

#### FUNC-1B: Implement Task Update and Delete

- **Description**: Implement task updating and deletion functionality
- **Deliverables**:
  - Add task update functionality
  - Add task deletion with confirmation
  - Connect operations to localStorage
- **Dependencies**: FUNC-1A, UI-4
- **Assignee**: Jason
- **Definition of Done**: Tasks can be updated and deleted with persistence to localStorage

### FUNC-2: Implement Drag and Drop

- **Description**: Implement drag and drop functionality for moving tasks between columns
- **Deliverables**:
  - Create draggable action for TaskCard
  - Create dropzone action for Column
  - Implement status update logic when a task is moved
  - Add visual feedback during drag operations
- **Dependencies**: UI-2, DATA-2A
- **Assignee**: Ryan
- **Definition of Done**: Tasks can be dragged between columns with appropriate visual feedback

## Revised Ticket Dependencies Graph

```src
SETUP-1 ─┬─ SETUP-2 ────── UI-4 ────────────────────┐
         │                                          │
         │                               ┌── UI-3 ──┼─ FUNC-1A ── FUNC-1B ── ENH-1 ── ENH-2 ── TEST-1
         │                               │          │
         └─ DATA-1 ─┬─ DATA-2A ── UI-1 ─ UI-2 ──────┼─ FUNC-2 ── ENH-3 ─────────────┘
                    │                               │
                    └─ DATA-2B ───────────────┘     │
                    │                               │
                    └─ DATA-2C ───────────────────┘ │
                                                     │
                                                     └─ FINAL-1
                                                     
                                                     └─ FINAL-2
```

## Revised Developer Workload

### Ryan

- ✅ SETUP-1: Initialize SvelteKit Project
- ✅ SETUP-2: Create Basic Component Structure  
- 🔄 UI-3: Implement Task Form
- 🔄 FUNC-2: Implement Drag and Drop
- ❌ ENH-3: Implement Filtering and Sorting
- ❌ FINAL-1: Finalize Styling and Accessibility

### Jason

- ✅ DATA-1: Implement Data Models and Storage
- 🔄 DATA-2A: Implement Basic Tasks Store
- 🔄 DATA-2B: Implement UI State Store
- 🔄 DATA-2C: Implement Derived Stores
- 🔄 FUNC-1A: Implement Task Creation
- 🔄 FUNC-1B: Implement Task Update and Delete
- ❌ ENH-1: Add Assignee and Priority to Tasks
- ❌ FINAL-2: Documentation and Deployment

### Alex

- 🔄 UI-1: Implement Board Layout
- 🔄 UI-2: Implement Basic Task Cards
- 🔄 UI-4: Implement Confirmation Dialog
- ❌ ENH-2: Add Due Date Functionality
- ❌ TEST-1: Manual Testing and Bug Fixes

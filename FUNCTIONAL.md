# Kannotban: Functional Specification

## Overview

Kannotban is a collaborative Kanban board application that enables users to manage tasks by adding, updating, and moving them between columns. This local web application provides a simple yet effective way to visualize work progress.

## Core Features

### 1. Board Structure

- Three fixed columns: "To Do", "Doing", and "Done"
- Responsive layout that adapts to different screen sizes
- Visual distinction between columns

### 2. Task Management

#### 2.1 Task Cards (MVP - Standard)
- Title (required)
- Description (optional)
- Visual indicator of current status based on column
- Draggable between columns

#### 2.2 Enhanced Task Features (Target)
- Assignee selection
- Priority level (Low, Medium, High)
- Due date with visual indicators for approaching/past dates

#### 2.3 Advanced Task Features (Stretch)
- Comments section
- Attachments
- Task history/activity log

### 3. User Interactions

- Drag and drop tasks between columns
- Add new tasks via a form interface
- Edit existing task details
- Delete tasks with confirmation
- Visual feedback during interactions (hover states, drag shadows)

### 4. Data Persistence

- Store task data in browser's localStorage
- Automatic saving of changes
- Data persistence between browser sessions
- JSON structure for data storage

## User Flows

### 1. Creating a New Task

1. User clicks "Add Task" button
2. Form appears with fields for task details
3. User enters required information
4. User submits form
5. Task appears in the "To Do" column
6. Data is saved to localStorage

### 2. Moving a Task

1. User drags a task card
2. Visual indicator shows potential drop zones
3. User drops the card in desired column
4. Task updates to reflect new status
5. Data is saved to localStorage

### 3. Editing a Task

1. User clicks on a task card
2. Edit form appears with current task details
3. User modifies information
4. User saves changes
5. Task updates with new information
6. Data is saved to localStorage

### 4. Deleting a Task

1. User clicks delete icon/button on a task
2. Confirmation prompt appears
3. User confirms deletion
4. Task is removed from the board
5. Data is saved to localStorage

## Implementation Milestones

### Milestone 1: MVP (Standard)
- Complete board layout with three columns
- Basic task cards with title and description
- Drag and drop functionality
- localStorage persistence
- CRUD operations for tasks

### Milestone 2: Enhanced Features
- Add assignee, priority, and due date to task cards
- Improved visual design and feedback
- Filtering or sorting capabilities

### Milestone 3: Advanced Features
- Comments functionality
- Attachments support
- Task history tracking

## Non-Requirements

- User authentication/authorization
- Multi-user collaboration features
- Server-side deployment
- Mobile application version

## Success Criteria

A successful implementation will:
- Display tasks in appropriate columns
- Allow task creation, editing, and deletion
- Enable drag-and-drop movement between columns
- Persist data between browser sessions
- Provide intuitive, responsive user interface
- Complete at minimum Milestone 1 fully rather than partial implementation of multiple milestones
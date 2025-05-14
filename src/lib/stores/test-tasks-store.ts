// This is a temporary test file to verify the tasks store works
import { tasksStore } from '.';
import { getCurrentTimestamp } from '../utils';
import type { Task } from '../models';

// Log initial state 
console.log('Initial state:', JSON.stringify($state));

// Subscribe to track changes
const unsubscribe = tasksStore.subscribe(tasks => {
  console.log('Store updated:', tasks);
});

// Test adding a task
const newTask: Task = {
  id: 'test-task-1',
  title: 'Test Task',
  description: 'This is a test task',
  status: 'todo',
  createdAt: getCurrentTimestamp(),
  updatedAt: getCurrentTimestamp()
};

// Update the store with a new task
tasksStore.update(tasks => [...tasks, newTask]);

// Check localStorage to verify persistence
console.log('LocalStorage after update:', localStorage.getItem('kannotban-tasks'));

// Clean up subscription to prevent memory leaks
unsubscribe();

// Note: This file is for testing only and can be removed after verification
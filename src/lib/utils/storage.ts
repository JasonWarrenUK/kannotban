import type { Task } from '../models';

const STORAGE_KEY = 'kannotban-tasks';

/**
 * Save tasks to localStorage
 */
export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
    throw new Error('Failed to save tasks. Storage might be full or unavailable.');
  }
}

/**
 * Load tasks from localStorage
 */
export function loadTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return [];
  }
}
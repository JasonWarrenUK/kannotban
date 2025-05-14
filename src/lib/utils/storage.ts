import type { Task } from '../models';

const STORAGE_KEY = 'kannotban-tasks';

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
    throw new Error('Failed to save tasks. Storage might be full or unavailable.');
  }
}

export function loadTasks(): Task[] 
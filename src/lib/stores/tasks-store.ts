import { writable } from 'svelte/store';
import type { Task } from '../models';
import { loadTasks, saveTasks } from '../utils';

// Create a writable store with initial value from localStorage
const tasksStore = writable<Task[]>(loadTasks());

// Subscribe to changes and save to localStorage when store updates
tasksStore.subscribe((tasks) => {
  saveTasks(tasks);
});

export default tasksStore;
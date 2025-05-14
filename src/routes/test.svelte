<script>
  import { tasksStore } from '../lib/stores';
  import { getCurrentTimestamp } from '../lib/utils';
  import type { Task } from '../lib/models';

  let tasks = [];
  
  // Subscribe to the store
  tasksStore.subscribe(value => {
    tasks = value;
    console.log('Tasks updated:', tasks);
  });

  // Function to add a test task
  function addTestTask() {
    const newTask = {
      id: `task-${Date.now()}`,
      title: 'Test Task',
      description: 'This is a test task created at ' + new Date().toLocaleTimeString(),
      status: 'todo',
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    };
    
    tasksStore.update(currentTasks => [...currentTasks, newTask]);
  }

  // Function to clear all tasks
  function clearAllTasks() {
    tasksStore.set([]);
  }
</script>

<div class="p-4">
  <h1 class="text-2xl font-bold mb-4">Tasks Store Test</h1>
  
  <div class="mb-4 flex gap-2">
    <button 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      on:click={addTestTask}
    >
      Add Test Task
    </button>
    
    <button 
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      on:click={clearAllTasks}
    >
      Clear All Tasks
    </button>
  </div>
  
  <div class="bg-gray-100 p-4 rounded">
    <h2 class="text-xl font-semibold mb-2">Current Tasks ({tasks.length})</h2>
    
    {#if tasks.length === 0}
      <p class="text-gray-500">No tasks available. Click "Add Test Task" to create one.</p>
    {:else}
      <ul class="space-y-2">
        {#each tasks as task}
          <li class="bg-white p-3 rounded shadow">
            <div class="font-bold">{task.title}</div>
            <div class="text-sm text-gray-600">{task.description}</div>
            <div class="text-xs text-gray-500 mt-1">Status: {task.status}</div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
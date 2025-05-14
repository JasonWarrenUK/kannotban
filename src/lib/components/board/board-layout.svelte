<script lang="ts">
  // BoardLayout: Overall container for the Kanban board
  import Column from './column.svelte';
  import TaskCard from './task-card.svelte';
  import type { Task } from '$lib/models/task';
  
  export let tasks: Task[] = [];
  
  $: todoTasks = tasks.filter(task => task.status === 'todo');
  $: doingTasks = tasks.filter(task => task.status === 'doing');
  $: doneTasks = tasks.filter(task => task.status === 'done');
</script>

<div class="flex flex-col h-full w-full">
  <header class="bg-slate-800 text-white p-4 shadow-md">
    <h1 class="text-2xl font-bold">Kannotban</h1>
  </header>
  
  <main class="flex-1 p-4 bg-slate-100 overflow-hidden">
    <div class="flex gap-4 h-full overflow-x-auto">
      <Column title="To Do" status="todo">
        {#each todoTasks as task (task.id)}
          <TaskCard 
            id={task.id} 
            title={task.title} 
            description={task.description || ''} 
            status={task.status} 
          />
        {/each}
      </Column>
      
      <Column title="Doing" status="doing">
        {#each doingTasks as task (task.id)}
          <TaskCard 
            id={task.id} 
            title={task.title} 
            description={task.description || ''} 
            status={task.status} 
          />
        {/each}
      </Column>
      
      <Column title="Done" status="done">
        {#each doneTasks as task (task.id)}
          <TaskCard 
            id={task.id} 
            title={task.title} 
            description={task.description || ''} 
            status={task.status} 
          />
        {/each}
      </Column>
    </div>
  </main>
  
  <footer class="bg-slate-800 text-white p-2 text-center text-sm">
    <p>Kannotban - A simple Kanban board</p>
  </footer>
</div>
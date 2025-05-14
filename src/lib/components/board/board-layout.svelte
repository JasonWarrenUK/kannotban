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
  <header class="bg-slate-800 text-white p-3 sm:p-4 shadow-md">
    <h1 class="text-xl sm:text-2xl font-bold">Kannotban</h1>
  </header>
  
  <main class="flex-1 p-2 sm:p-4 bg-slate-100 overflow-hidden mx-auto">
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 h-full overflow-y-auto sm:overflow-y-hidden sm:overflow-x-auto">
      <Column title="To Do" status="todo">
        <svelte:fragment slot="count">{todoTasks.length}</svelte:fragment>
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
        <svelte:fragment slot="count">{doingTasks.length}</svelte:fragment>
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
        <svelte:fragment slot="count">{doneTasks.length}</svelte:fragment>
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
  
  <footer class="bg-slate-800 text-white p-1 sm:p-2 text-center text-xs sm:text-sm">
    <p>Kannotban - A simple Kanban board</p>
  </footer>
</div>
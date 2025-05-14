<script lang="ts">
  // TaskCard: Individual task representation
  export let id: string;
  export let title: string;
  export let description: string = '';
  export let status: 'todo' | 'doing' | 'done';
</script>

<div class="bg-white p-3 rounded shadow border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
  <h3 class="font-medium text-slate-800 mb-1">{title}</h3>
  
  {#if description}
    <p class="text-sm text-slate-600 mb-2">{description}</p>
  {/if}
  
  <div class="flex justify-between items-center text-xs">
    <span class="px-2 py-1 rounded-full text-xs"
      class:bg-blue-100={status === 'todo'}
      class:text-blue-800={status === 'todo'}
      class:bg-yellow-100={status === 'doing'}
      class:text-yellow-800={status === 'doing'}
      class:bg-green-100={status === 'done'}
      class:text-green-800={status === 'done'}
    >
      {status}
    </span>
    
    <div class="flex space-x-1">
      <button class="p-1 hover:text-blue-600" aria-label="Edit task">
        ✏️
      </button>
      <button class="p-1 hover:text-red-600" aria-label="Delete task">
        🗑️
      </button>
    </div>
  </div>
</div>
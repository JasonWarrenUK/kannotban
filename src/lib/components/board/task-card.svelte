<script lang="ts">
  // TaskCard: Individual task representation
  export let id: string;
  export let title: string;
  export let description: string = '';
  export let status: 'todo' | 'doing' | 'done';
</script>

<div class="bg-white p-2 sm:p-3 rounded shadow border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
  <h3 class="font-medium text-slate-800 text-sm sm:text-base mb-0.5 sm:mb-1 line-clamp-2">{title}</h3>
  
  {#if description}
    <p class="text-xs sm:text-sm text-slate-600 mb-1.5 sm:mb-2 line-clamp-3">{description}</p>
  {/if}
  
  <div class="flex justify-between items-center text-xs">
    <span class="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs"
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
      <button class="p-0.5 sm:p-1 hover:text-blue-600 text-sm sm:text-base" aria-label="Edit task">
        ✏️
      </button>
      <button class="p-0.5 sm:p-1 hover:text-red-600 text-sm sm:text-base" aria-label="Delete task">
        🗑️
      </button>
    </div>
  </div>
</div>
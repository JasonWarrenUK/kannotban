<script lang="ts">
  // Column: Container for task cards within a status category
  export let title: string;
  export let status: 'todo' | 'doing' | 'done';
</script>

<div class="flex flex-col w-full sm:w-72 md:w-80 h-full bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0">
  <div class="p-2 sm:p-3 font-bold text-base sm:text-lg bg-slate-200 border-b border-slate-300 flex items-center justify-between">
    <span>{title}</span>
    <span class="text-xs bg-slate-300 rounded-full px-2 py-0.5">
      <slot name="count" />
    </span>
  </div>
  
  <div class="flex-1 p-1 sm:p-2 overflow-y-auto">
    <div class="space-y-1 sm:space-y-2 min-h-full">
      <slot />
    </div>
  </div>
</div>
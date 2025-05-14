<script lang="ts">
  // Column: Container for task cards within a status category
  export let title: string;
  export let status: 'todo' | 'doing' | 'done';
</script>

<div class="flex flex-col w-80 h-full bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0">
  <div class="p-3 font-bold text-lg bg-slate-200 border-b border-slate-300">
    {title}
  </div>
  
  <div class="flex-1 p-2 overflow-y-auto">
    <div class="space-y-2 min-h-full">
      <slot />
    </div>
  </div>
</div>
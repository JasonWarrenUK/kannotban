<script lang="ts">
  // BoardLayout: Overall container for the Kanban board
</script>

<div class="flex flex-col h-full w-full">
  <header class="bg-slate-800 text-white p-4 shadow-md">
    <h1 class="text-2xl font-bold">Kannotban</h1>
  </header>
  
  <main class="flex-1 p-4 bg-slate-100 overflow-hidden">
    <div class="flex gap-4 h-full overflow-x-auto">
      <slot />
    </div>
  </main>
  
  <footer class="bg-slate-800 text-white p-2 text-center text-sm">
    <p>Kannotban - A simple Kanban board</p>
  </footer>
</div>
<script lang="ts">
  // TaskForm: Form for creating/editing tasks
  export let task: { id?: string; title: string; description: string; status: 'todo' | 'doing' | 'done' } = {
    title: '',
    description: '',
    status: 'todo'
  };
  export let isEditing = false;
  export let onSubmit: (task: typeof task) => void;
  export let onCancel: () => void;
</script>

<div class="fixed inset-0 bg-slate-800/50 flex items-center justify-center z-10 p-3 sm:p-4">
  <div class="bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto p-3 sm:p-4 animate-fade-in">
    <h2 class="text-lg sm:text-xl font-bold mb-2 sm:mb-4">{isEditing ? 'Edit' : 'Create'} Task</h2>
    
    <form on:submit|preventDefault={() => onSubmit(task)} class="space-y-3 sm:space-y-4">
      <div>
        <label for="title" class="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Title*</label>
        <input
          type="text"
          id="title"
          bind:value={task.title}
          placeholder="Task title"
          required
          class="w-full p-1.5 sm:p-2 text-sm sm:text-base border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label for="description" class="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea
          id="description"
          bind:value={task.description}
          placeholder="Task description"
          rows="2"
          class="w-full p-1.5 sm:p-2 text-sm sm:text-base border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      
      <div>
        <label for="status" class="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Status</label>
        <select
          id="status"
          bind:value={task.status}
          class="w-full p-1.5 sm:p-2 text-sm sm:text-base border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      
      <div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
        <button
          type="button"
          on:click={onCancel}
          class="order-last sm:order-first w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm border border-slate-300 text-slate-700 rounded hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isEditing ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  </div>
</div>
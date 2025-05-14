<script lang="ts">
  import { getCurrentTimestamp } from '$lib/utils/date';
  import type { Task, Status, Priority } from '$lib/models';
  
  // Default empty task
  const defaultTask = {
    title: '',
    description: '',
    status: 'todo' as Status,
    priority: undefined as Priority | undefined,
    assignee: undefined as string | undefined,
    dueDate: undefined as number | undefined
  };
  
  // TaskForm: Form for creating/editing tasks
  export let task: Partial<Task> = { ...defaultTask };
  export let isEditing = false;
  export let onSubmit: (task: Partial<Task>) => void;
  export let onCancel: () => void;
  
  // Form error state
  let errors: { [key: string]: string } = {};
  let isSubmitting = false;
  
  // Validate form before submission
  function validateForm(): boolean {
    errors = {};
    
    if (!task.title?.trim()) {
      errors.title = 'Title is required';
    } else if (task.title.length > 100) {
      errors.title = 'Title cannot exceed 100 characters';
    }
    
    if (task.description && task.description.length > 500) {
      errors.description = 'Description cannot exceed 500 characters';
    }
    
    return Object.keys(errors).length === 0;
  }
  
  // Handle form submission
  function handleSubmit() {
    if (validateForm()) {
      isSubmitting = true;
      
      try {
        // Prepare the task with timestamps
        const now = getCurrentTimestamp();
        const preparedTask = {
          ...task,
          updatedAt: now
        };
        
        if (!isEditing) {
          // Add createdAt only for new tasks
          preparedTask.createdAt = now;
        }
        
        // Add timeout to simulate network delay and test spinner
        setTimeout(() => {
          onSubmit(preparedTask);
          isSubmitting = false;
        }, 2000); // 2 second delay
      } catch (error) {
        console.error('Error submitting task:', error);
        errors.form = 'Failed to save task. Please try again.';
        isSubmitting = false;
      }
    }
  }
  
  import { onMount } from 'svelte';
  
  // Handle escape key press to close the form
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onCancel();
    }
  }
  
  // Reference to the modal dialog
  let modalElement: HTMLDivElement;
  
  // Focus on the form when it's mounted and set up global ESC handler
  onMount(() => {
    // Set focus to the first input when the form opens
    const firstInput = document.getElementById('title');
    if (firstInput) {
      firstInput.focus();
    }
    
    // Add a global keydown event listener for the ESC key
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    
    window.addEventListener('keydown', handleGlobalKeydown);
    
    return () => {
      window.removeEventListener('keydown', handleGlobalKeydown);
    };
  });
</script>


<div 
     bind:this={modalElement}
     class="fixed inset-0 bg-slate-800/50 flex items-center justify-center z-10" 
     on:click|self={onCancel} 
     on:keydown={handleKeydown}
     role="dialog"
     tabindex="-1"
     aria-labelledby="formTitle"
     aria-modal="true">
  <div 
    class="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
    <h2 id="formTitle" class="text-xl font-bold mb-4">{isEditing ? 'Edit' : 'Create'} Task</h2>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-slate-700 mb-1">Title*</label>
        <input
          type="text"
          id="title"
          bind:value={task.title}
          placeholder="Task title"
          aria-required="true"
          aria-invalid={!!errors.title}
          class="w-full p-2 border {errors.title ? 'border-red-500' : 'border-slate-300'} rounded focus:outline-none focus:ring-2 {errors.title ? 'focus:ring-red-500' : 'focus:ring-blue-500'}"
        />
        {#if errors.title}
          <p class="text-red-500 text-xs mt-1">{errors.title}</p>
        {/if}
      </div>
      
      <div>
        <label for="description" class="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea
          id="description"
          bind:value={task.description}
          placeholder="Task description"
          rows="3"
          aria-invalid={!!errors.description}
          class="w-full p-2 border {errors.description ? 'border-red-500' : 'border-slate-300'} rounded focus:outline-none focus:ring-2 {errors.description ? 'focus:ring-red-500' : 'focus:ring-blue-500'}"
        ></textarea>
        {#if errors.description}
          <p class="text-red-500 text-xs mt-1">{errors.description}</p>
        {/if}
      </div>
      
      <div>
        <label for="status" class="block text-sm font-medium text-slate-700 mb-1">Status</label>
        <select
          id="status"
          bind:value={task.status}
          class="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      
      <!-- Priority selection -->
      <div>
        <label for="priority" class="block text-sm font-medium text-slate-700 mb-1">Priority</label>
        <select
          id="priority"
          bind:value={task.priority}
          class="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">None</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <!-- Assignee field -->
      <div>
        <label for="assignee" class="block text-sm font-medium text-slate-700 mb-1">Assignee</label>
        <input
          type="text"
          id="assignee"
          bind:value={task.assignee}
          placeholder="Assignee name"
          class="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {#if errors.form}
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span class="block sm:inline">{errors.form}</span>
        </div>
      {/if}
      
      <div class="flex justify-end space-x-2 pt-2">
        <button
          type="button"
          on:click={onCancel}
          disabled={isSubmitting}
          class="px-4 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
        >
          {#if isSubmitting}
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {isEditing ? 'Updating...' : 'Creating...'}
          {:else}
            {isEditing ? 'Update' : 'Create'}
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>
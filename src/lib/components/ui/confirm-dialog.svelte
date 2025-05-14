<script lang="ts">
  // ConfirmDialog: Reusable confirmation modal
  export let title: string = 'Confirm Action';
  export let message: string;
  export let confirmText: string = 'Confirm';
  export let cancelText: string = 'Cancel';
  export let onConfirm: () => void;
  export let onCancel: () => void;
</script>

<div class="fixed inset-0 bg-slate-800/50 flex items-center justify-center z-20">
  <div class="bg-white rounded-lg shadow-lg w-full max-w-sm mx-auto p-4 animate-fade-in">
    <h2 class="text-xl font-bold mb-2">{title}</h2>
    <p class="text-slate-600 mb-4">{message}</p>
    
    <div class="flex justify-end space-x-2">
      <button
        type="button"
        on:click={onCancel}
        class="px-4 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50"
      >
        {cancelText}
      </button>
      <button
        type="button"
        on:click={onConfirm}
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        {confirmText}
      </button>
    </div>
  </div>
</div>
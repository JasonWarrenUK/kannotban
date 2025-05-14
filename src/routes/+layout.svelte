<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="h-screen flex flex-col bg-slate-50">
	{@render children()}
</div>

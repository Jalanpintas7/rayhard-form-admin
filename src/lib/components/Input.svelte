<script>
	export let type = 'text';
	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let error = '';
	export let required = false;
	export let disabled = false;
	export let fullWidth = false;
	export let id = '';
	
	// Bind value
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	function handleInput(event) {
		dispatch('input', event.target.value);
	}
</script>

<div class="{fullWidth ? 'w-full' : ''}">
	{#if label}
		<label for={id || 'input-' + Math.random().toString(36).substr(2, 9)} class="block text-sm font-medium text-gray-700 mb-2">
			{label}
			{#if required}
				<span class="text-red-500">*</span>
			{/if}
		</label>
	{/if}
	
	<input
		{type}
		{placeholder}
		{value}
		{required}
		{disabled}
		{id}
		on:input={handleInput}
		class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-[#921E8D] disabled:bg-gray-50 disabled:text-gray-500 {error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}"
	/>
	
	{#if error}
		<p class="mt-1 text-sm text-red-600">{error}</p>
	{/if}
</div>

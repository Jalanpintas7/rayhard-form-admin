<script>
	export let title = '';
	export let subtitle = '';
</script>

<div class="mb-6 sm:mb-8">
	<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
	{#if subtitle}
		<p class="text-gray-600 mt-1 text-sm sm:text-base">{subtitle}</p>
	{/if}
</div>

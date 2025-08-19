<script>
	export let title = '';
	export let subtitle = '';
</script>

<div class="card-primary">
	<div class="p-4 sm:p-6">
		{#if title}
			<div class="mb-4 sm:mb-6">
				<h3 class="text-lg font-semibold text-gray-900">{title}</h3>
				{#if subtitle}
					<p class="text-sm text-gray-600 mt-1">{subtitle}</p>
				{/if}
			</div>
		{/if}
		<slot />
	</div>
</div>

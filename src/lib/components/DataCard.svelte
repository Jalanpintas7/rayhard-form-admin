<script>
	export let title = '';
	export let subtitle = '';
	export let icon = '';
	export let iconColor = 'text-secondary-500';
	export let iconBgColor = 'bg-gradient-to-r from-primary-600 to-[#AC2EAC]';
	export let actions = [];
</script>

<div class="card-primary">
	<div class="p-4 sm:p-6">
		<div class="flex items-start justify-between">
			<div class="flex items-center space-x-3 flex-1 min-w-0">
				{#if icon}
					<div class="p-2 {iconBgColor} rounded-lg flex-shrink-0">
						<svg class="w-5 h-5 {iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icon}></path>
						</svg>
					</div>
				{/if}
				<div class="flex-1 min-w-0">
					<h3 class="text-lg font-semibold text-gray-900 truncate">{title}</h3>
					{#if subtitle}
						<p class="text-sm text-gray-600 mt-1 truncate">{subtitle}</p>
					{/if}
				</div>
			</div>
			
			{#if actions.length > 0}
				<div class="flex items-center space-x-2 ml-4">
					{#each actions as action}
						<button 
							on:click={action.onClick}
							class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
							title={action.title}
							aria-label={action.title}
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={action.icon}></path>
							</svg>
						</button>
					{/each}
				</div>
			{/if}
		</div>
		
		<div class="mt-4">
			<slot />
		</div>
	</div>
</div>

<script>
	import Icon from '../icons.svelte';
	
	export let destinations = [];
</script>

<div class="card-primary">
	<div class="p-2 sm:p-5">
		<h3 class="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Destinasi TerPopular</h3>
		<div class="space-y-3 sm:space-y-4">
			{#each destinations as destination}
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-3 min-w-0 flex-1">
						<div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-primary-600 to-[#AC2EAC] flex items-center justify-center flex-shrink-0">
							<Icon name="map-pin" size="16" color="#FFF00C" />
						</div>
						<div class="min-w-0 flex-1">
							<p class="font-medium text-gray-900 truncate">{destination.name}</p>
							<p class="text-sm text-gray-500 truncate">{destination.type}</p>
						</div>
					</div>
					<div class="text-right flex-shrink-0 ml-4">
						<p class="font-semibold text-gray-900">{destination.customers}</p>
						<p class="text-sm text-gray-500">{destination.percentage}%</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

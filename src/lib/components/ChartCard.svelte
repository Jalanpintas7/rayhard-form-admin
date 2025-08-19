<script>
	export let title = '';
	export let legend = [];
	export let data = [];
	export let type = 'bar'; // bar, line, pie
</script>

<div class="card-primary">
	<!-- Header -->
	<div class="flex items-center justify-between mb-3 sm:mb-4">
		<h3 class="text-lg font-semibold text-gray-900">{title}</h3>
		{#if legend.length > 0}
			<div class="flex items-center gap-3 sm:gap-4">
				{#each legend as item}
					<div class="flex items-center gap-2">
						<div class="w-2.5 h-2.5 {item.color} rounded-full ring-2 ring-white"></div>
						<span class="text-sm text-gray-600 hidden sm:inline">{item.label}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Chart area -->
	<div class="relative h-52 sm:h-64 bg-gray-50/70 rounded-lg ring-1 ring-gray-100 p-3 sm:p-4 overflow-x-auto">
		{#if type === 'bar'}
			<div class="h-full flex items-end gap-1.5 sm:gap-2 w-max sm:w-full">
				{#each data as item}
					<div class="flex flex-col items-center h-full flex-none w-6 sm:flex-1 sm:w-auto">
						<div class="w-full flex flex-col items-center justify-end h-40 sm:h-48 space-y-1">
							<div 
								class="bg-primary-600 rounded-sm w-full sm:max-w-8" 
								style="height: {Math.min(item.umrah * 1.7, 90)}px;"
								title="Umrah: {item.umrah}"
							></div>
							<div 
								class="bg-secondary-500 rounded-sm w-full sm:max-w-8" 
								style="height: {Math.min(item.Pelancongan * 1.7, 90)}px;"
								title="Pelancongan: {item.Pelancongan}"
							></div>
						</div>
						<span class="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 font-medium leading-none whitespace-nowrap h-4 sm:h-5 flex items-center justify-center">{item.month}</span>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Grid lines untuk panduan visual -->
		<div class="pointer-events-none absolute inset-0">
			<div class="absolute inset-x-3 sm:inset-x-4 top-0 bottom-8 sm:bottom-10 flex flex-col justify-between">
				{#each [0, 1, 2, 3] as _}
					<div class="border-t border-gray-200/70"></div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Scale indicator -->
	<div class="flex justify-between text-xs text-gray-400 mt-2 px-1 sm:px-2">
		<span>0</span>
		<span>50</span>
		<span>100+</span>
	</div>
</div>

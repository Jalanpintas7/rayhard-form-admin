<script>
	import Icon from '$lib/icons.svelte';

	// Props
	export let stats = {
		totalCustomers: 0,
		umrahCustomers: 0,
		PelanconganCustomers: 0,
		popularDestinations: 0,
		growthRate: 0,
		lastMonthGrowth: 0
	};
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
	<!-- Total Customers -->
	<div class="card-primary">
		<div class="p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Total Pelanggan</p>
					<p class="text-2xl font-bold text-gray-900">{stats.totalCustomers.toLocaleString()}</p>
					<div class="flex items-center mt-2">
						{#if stats.growthRate > 0}
							<Icon name="trending-up" size="16" color="#10b981" class_name="mr-1" />
							<span class="text-sm text-green-600">+{stats.growthRate}%</span>
						{:else}
							<Icon name="trending-down" size="16" color="#ef4444" class_name="mr-1" />
							<span class="text-sm text-red-600">{stats.growthRate}%</span>
						{/if}
						<span class="text-sm text-gray-500 ml-1">dari bulan lepas</span>
					</div>
				</div>
				<div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
					<Icon name="users" size="24" color="white" />
				</div>
			</div>
		</div>
	</div>

	<!-- Umrah Customers -->
	<div class="card-primary">
		<div class="p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Pelanggan Umrah</p>
					<p class="text-2xl font-bold text-gray-900">{stats.umrahCustomers.toLocaleString()}</p>
					<div class="flex items-center mt-2">
						<span class="text-sm text-gray-500">
							{((stats.umrahCustomers / stats.totalCustomers) * 100).toFixed(1)}% dari total
						</span>
					</div>
				</div>
				<div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
					<Icon name="map-pin" size="24" color="white" />
				</div>
			</div>
		</div>
	</div>

	<!-- Pelancongan Customers -->
	<div class="card-primary">
		<div class="p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Pelanggan Pelancongan</p>
					<p class="text-2xl font-bold text-gray-900">{stats.PelanconganCustomers.toLocaleString()}</p>
					<div class="flex items-center mt-2">
						<span class="text-sm text-gray-500">
							{((stats.PelanconganCustomers / stats.totalCustomers) * 100).toFixed(1)}% dari total
						</span>
					</div>
				</div>
				<div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
					<Icon name="globe" size="24" color="white" />
				</div>
			</div>
		</div>
	</div>

	<!-- Popular Destinations -->
	<div class="card-primary">
		<div class="p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Destinasi Popular</p>
					<p class="text-2xl font-bold text-gray-900">{stats.popularDestinations}</p>
					<div class="flex items-center mt-2">
						{#if stats.lastMonthGrowth > 0}
							<Icon name="trending-up" size="16" color="#10b981" class_name="mr-1" />
							<span class="text-sm text-green-600">+{stats.lastMonthGrowth}%</span>
						{:else}
							<Icon name="trending-down" size="16" color="#ef4444" class_name="mr-1" />
							<span class="text-sm text-red-600">{stats.lastMonthGrowth}%</span>
						{/if}
						<span class="text-sm text-gray-500 ml-1">dari bulan lepas</span>
					</div>
				</div>
				<div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
					<Icon name="star" size="24" color="white" />
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	import Icon from '../../../lib/icons.svelte';

	// Data Season Umrah
	let umrahSeasons = [
		{
			id: 1,
			branch: 'Jakarta Pusat',
			seasonName: 'Ramadan 2024',
			startDate: '2024-03-01',
			endDate: '2024-04-30',
			type: 'umrah',
			status: 'Active'
		},
		{
			id: 2,
			branch: 'Bandung',
			seasonName: 'Syawal 2024',
			startDate: '2024-04-15',
			endDate: '2024-06-15',
			type: 'umrah',
			status: 'Active'
		},
		{
			id: 3,
			branch: 'Surabaya',
			seasonName: 'Dzulhijjah 2024',
			startDate: '2024-06-01',
			endDate: '2024-07-31',
			type: 'umrah',
			status: 'Upcoming'
		}
	];

	// Data Kategori untuk setiap season
	let umrahCategories = [
		{
			id: 1,
			seasonId: 1,
			name: 'Premium',
			isActive: true,
			description: 'Paket Premium dengan hotel bintang 5',
			days: 15,
			customers: 45
		},
		{
			id: 2,
			seasonId: 1,
			name: 'Regular',
			isActive: true,
			description: 'Paket Regular dengan hotel bintang 4',
			days: 12,
			customers: 32
		},
		{
			id: 3,
			seasonId: 1,
			name: 'VIP',
			isActive: false,
			description: 'Paket VIP dengan layanan premium',
			days: 18,
			customers: 8
		},
		{
			id: 4,
			seasonId: 2,
			name: 'Ekonomi',
			isActive: true,
			description: 'Paket hemat untuk keluarga',
			days: 10,
			customers: 28
		},
		{
			id: 5,
			seasonId: 2,
			name: 'Bisnis',
			isActive: true,
			description: 'Paket bisnis dengan jadwal fleksibel',
			days: 14,
			customers: 15
		},
		{
			id: 6,
			seasonId: 3,
			name: 'Premium',
			isActive: true,
			description: 'Paket Premium Dzulhijjah',
			days: 16,
			customers: 0
		}
	];

	let searchTerm = '';
	let selectedBranch = '';
	let selectedStatus = '';
	let selectedSeason = null;

	// Filter seasons
	$: filteredSeasons = umrahSeasons.filter(season => {
		const matchesSearch = season.seasonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 season.branch.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesBranch = !selectedBranch || season.branch === selectedBranch;
		const matchesStatus = !selectedStatus || season.status === selectedStatus;
		
		return matchesSearch && matchesBranch && matchesStatus;
	});

	// Get categories for a specific season
	function getCategoriesForSeason(seasonId) {
		return umrahCategories.filter(cat => cat.seasonId === seasonId);
	}

	// Get total customers for a season
	function getTotalCustomers(seasonId) {
		return umrahCategories
			.filter(cat => cat.seasonId === seasonId)
			.reduce((sum, cat) => sum + cat.customers, 0);
	}

	// Get active categories count for a season
	function getActiveCategoriesCount(seasonId) {
		return umrahCategories
			.filter(cat => cat.seasonId === seasonId && cat.isActive)
			.length;
	}

	function deleteSeason(id) {
		if (confirm('Apakah Anda yakin ingin menghapus season ini? Semua kategori di dalamnya akan ikut terhapus.')) {
			umrahSeasons = umrahSeasons.filter(item => item.id !== id);
			umrahCategories = umrahCategories.filter(item => item.seasonId !== id);
		}
	}

	function toggleSeasonStatus(id) {
		umrahSeasons = umrahSeasons.map(item => {
			if (item.id === id) {
				return {
					...item,
					status: item.status === 'Active' ? 'Inactive' : 'Active'
				};
			}
			return item;
		});
	}

	function toggleCategoryActive(id) {
		umrahCategories = umrahCategories.map(item => {
			if (item.id === id) {
				return { ...item, isActive: !item.isActive };
			}
			return item;
		});
	}

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function getStatusColor(status) {
		switch(status) {
			case 'Active': return 'bg-green-100 text-green-800';
			case 'Inactive': return 'bg-red-100 text-red-800';
			case 'Upcoming': return 'bg-blue-100 text-blue-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	}

	function getCategoryColor(category) {
		switch(category) {
			case 'Premium': return 'bg-purple-100 text-purple-800';
			case 'VIP': return 'bg-yellow-100 text-yellow-800';
			case 'Regular': return 'bg-blue-100 text-blue-800';
			case 'Ekonomi': return 'bg-green-100 text-green-800';
			case 'Bisnis': return 'bg-indigo-100 text-indigo-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	}
</script>

<svelte:head>
	<title>Data Umrah - Rayhar Travel Admin</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Data Umrah</h1>
				<p class="text-gray-600 mt-1">Kelola data paket Umrah</p>
			</div>
			<a href="/admin/input" class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
				Tambah Data Umrah
			</a>
		</div>
	</div>

	<!-- Filters -->
	<div class="card mb-6">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div>
				<label for="search" class="block text-sm font-medium text-gray-700 mb-1">Cari</label>
				<input 
					type="text" 
					id="search"
					bind:value={searchTerm}
					placeholder="Cari season atau branch..."
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
				/>
			</div>
			<div>
				<label for="branch-filter" class="block text-sm font-medium text-gray-700 mb-1">Branch</label>
				<select 
					id="branch-filter"
					bind:value={selectedBranch}
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
				>
					<option value="">Semua Branch</option>
					<option value="Jakarta Pusat">Jakarta Pusat</option>
					<option value="Jakarta Selatan">Jakarta Selatan</option>
					<option value="Bandung">Bandung</option>
					<option value="Surabaya">Surabaya</option>
					<option value="Medan">Medan</option>
					<option value="Makassar">Makassar</option>
					<option value="Palembang">Palembang</option>
					<option value="Semarang">Semarang</option>
				</select>
			</div>
			<div>
				<label for="status-filter" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
				<select 
					id="status-filter"
					bind:value={selectedStatus}
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
				>
					<option value="">Semua Status</option>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option>
					<option value="Upcoming">Upcoming</option>
				</select>
			</div>
		</div>
	</div>

	<!-- Data berdasarkan Season -->
	<div class="space-y-6">
		{#each filteredSeasons as season}
			{@const categories = getCategoriesForSeason(season.id)}
			{@const totalCustomers = getTotalCustomers(season.id)}
			{@const activeCategoriesCount = getActiveCategoriesCount(season.id)}
			
			<div class="card">
				<!-- Season Header -->
				<div class="border-b border-gray-200 pb-4 mb-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-4">
							<div class="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
								<Icon name="map-pin" size="24" color="white" />
							</div>
							<div>
								<h3 class="text-xl font-semibold text-gray-900">{season.seasonName}</h3>
								<div class="flex items-center space-x-4 mt-1">
									<span class="text-sm text-gray-600">{season.branch}</span>
									<span class="text-sm text-gray-600">
										{formatDate(season.startDate)} - {formatDate(season.endDate)}
									</span>
									<button 
										on:click={() => toggleSeasonStatus(season.id)}
										class="inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer {getStatusColor(season.status)} hover:opacity-80"
									>
										{season.status}
									</button>
								</div>
							</div>
						</div>
						<div class="flex items-center space-x-4">
							<div class="text-right">
								<p class="text-sm text-gray-600">Total Pelanggan</p>
								<p class="text-lg font-semibold text-gray-900">{totalCustomers}</p>
							</div>
							<div class="text-right">
								<p class="text-sm text-gray-600">Kategori Aktif</p>
								<p class="text-lg font-semibold text-gray-900">{activeCategoriesCount}/{categories.length}</p>
							</div>
							<button 
								on:click={() => deleteSeason(season.id)}
								class="text-red-600 hover:text-red-800"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>

				<!-- Categories dalam Season -->
				{#if categories.length > 0}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each categories as category}
							<div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
								<div class="flex justify-between items-start mb-2">
									<h4 class="font-medium text-gray-900">{category.name}</h4>
									<button 
										on:click={() => toggleCategoryActive(category.id)}
										class="inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer {category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}"
									>
										{category.isActive ? 'Aktif' : 'Nonaktif'}
									</button>
								</div>
								<div class="space-y-1">
									<p class="text-sm text-gray-600">Durasi: {category.days} hari</p>
									<div class="flex items-center">
										<Icon name="users" size="14" color="#6b7280" />
										<span class="text-sm text-gray-600 ml-1">{category.customers} pelanggan</span>
									</div>
									{#if category.description}
										<p class="text-sm text-gray-500 mt-2">{category.description}</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="text-center py-8 text-gray-500">
						<Icon name="star" size="48" color="#9ca3af" />
						<p class="mt-2 text-sm">Belum ada kategori dalam season ini</p>
						<p class="text-xs">Tambahkan kategori melalui halaman Input Data</p>
					</div>
				{/if}
			</div>
		{/each}

		{#if filteredSeasons.length === 0}
			<div class="card">
				<div class="text-center py-12 text-gray-500">
					<Icon name="map-pin" size="64" color="#9ca3af" />
					<h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada season</h3>
					<p class="mt-1 text-sm text-gray-500">
						{searchTerm || selectedBranch || selectedStatus ? 'Tidak ada season yang sesuai dengan filter.' : 'Belum ada season Umrah.'}
					</p>
					<div class="mt-6">
						<a href="/admin/input" class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
							Buat Season Baru
						</a>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

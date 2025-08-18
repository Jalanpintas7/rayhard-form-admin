<script>
	import Icon from '../../../lib/icons.svelte';

	// Data untuk form Season Umrah
	let seasonForm = {
		branch: '',
		seasonName: '',
		startDate: '',
		endDate: ''
	};

	// Data untuk dropdown
	let adminBranches = [
		'Jakarta Pusat',
		'Jakarta Selatan',
		'Bandung',
		'Surabaya',
		'Medan',
		'Makassar',
		'Palembang',
		'Semarang'
	];

	// Data season Umrah yang sudah dibuat
	let seasonsData = [
		{
			id: 1,
			branch: 'Jakarta Pusat',
			seasonName: 'Ramadan 2024',
			startDate: '2024-03-01',
			endDate: '2024-04-30',
			status: 'Active'
		},
		{
			id: 2,
			branch: 'Surabaya',
			seasonName: 'Syawal 2024',
			startDate: '2024-04-15',
			endDate: '2024-06-15',
			status: 'Upcoming'
		},
		{
			id: 3,
			branch: 'Bandung',
			seasonName: 'Dzulhijjah 2024',
			startDate: '2024-06-01',
			endDate: '2024-07-30',
			status: 'Active'
		}
	];

	// Filter
	let searchTerm = '';
	let selectedBranch = '';
	let selectedStatus = '';

	// Filter seasons (hanya untuk Umrah sekarang)
	$: filteredSeasons = seasonsData.filter(season => {
		const matchesSearch = season.seasonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 season.branch.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesBranch = !selectedBranch || season.branch === selectedBranch;
		const matchesStatus = !selectedStatus || season.status === selectedStatus;
		
		return matchesSearch && matchesBranch && matchesStatus;
	});

	function submitSeason() {
		if (seasonForm.branch && seasonForm.seasonName && seasonForm.startDate && seasonForm.endDate) {
			const newSeason = {
				id: seasonsData.length + 1,
				...seasonForm,
				status: 'Active'
			};
			seasonsData = [...seasonsData, newSeason];
			
			// Reset form
			seasonForm = {
				branch: '',
				seasonName: '',
				startDate: '',
				endDate: ''
			};
			
			alert('Season berhasil ditambahkan!');
		} else {
			alert('Mohon lengkapi semua field yang wajib diisi!');
		}
	}

	function deleteSeason(id) {
		if (confirm('Apakah Anda yakin ingin menghapus season ini?')) {
			seasonsData = seasonsData.filter(item => item.id !== id);
		}
	}

	function toggleSeasonStatus(id) {
		seasonsData = seasonsData.map(item => {
			if (item.id === id) {
				return {
					...item,
					status: item.status === 'Active' ? 'Inactive' : 'Active'
				};
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
</script>

<svelte:head>
	<title>Kelola Season - Rayhar Travel Admin</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Kelola Season Umrah</h1>
				<p class="text-gray-600 mt-1">Tambah dan kelola season untuk Umrah</p>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Form Input Season -->
		<div class="card">
			<div class="flex items-center mb-6">
				<div class="p-2 bg-purple-100 rounded-lg mr-3">
					<Icon name="calendar" size="20" color="#622369" />
				</div>
				<h2 class="text-xl font-semibold text-gray-900">Buat Season Baru</h2>
			</div>

			<form on:submit|preventDefault={submitSeason} class="space-y-4">
				<div>
					<label for="branch" class="block text-sm font-medium text-gray-700 mb-1">
						Branch *
					</label>
					<select 
						id="branch"
						bind:value={seasonForm.branch}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
						required
					>
						<option value="">Pilih Branch</option>
						{#each adminBranches as branch}
							<option value={branch}>{branch}</option>
						{/each}
					</select>
				</div>



				<div>
					<label for="season-name" class="block text-sm font-medium text-gray-700 mb-1">
						Nama Season *
					</label>
					<input 
						type="text" 
						id="season-name"
						bind:value={seasonForm.seasonName}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
						placeholder="Contoh: Ramadan 2024, Syawal 2024"
						required
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="start-date" class="block text-sm font-medium text-gray-700 mb-1">
							Start Date *
						</label>
						<input 
							type="date" 
							id="start-date"
							bind:value={seasonForm.startDate}
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
							required
						/>
					</div>
					<div>
						<label for="end-date" class="block text-sm font-medium text-gray-700 mb-1">
							End Date *
						</label>
						<input 
							type="date" 
							id="end-date"
							bind:value={seasonForm.endDate}
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
							required
						/>
					</div>
				</div>

				<button 
					type="submit"
					class="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
				>
					Buat Season
				</button>
			</form>
		</div>

		<!-- Summary -->
		<div class="space-y-6">
			<!-- Stats Cards -->
			<div class="grid grid-cols-2 gap-4">
				<div class="stat-card">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-600">Total Season</p>
							<p class="text-2xl font-bold text-gray-900">{seasonsData.length}</p>
						</div>
						<div class="p-3 bg-purple-600 rounded-lg">
							<Icon name="calendar" size="20" color="white" />
						</div>
					</div>
				</div>
				<div class="stat-card-success">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-600">Season Aktif</p>
							<p class="text-2xl font-bold text-gray-900">{seasonsData.filter(s => s.status === 'Active').length}</p>
						</div>
						<div class="p-3 bg-green-500 rounded-lg">
							<Icon name="trending-up" size="20" color="white" />
						</div>
					</div>
				</div>
			</div>

			<!-- Quick Info -->
			<div class="card">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">Info Season</h3>
				<div class="space-y-3">
					<div class="flex justify-between">
						<span class="text-sm text-gray-600">Total Season</span>
						<span class="text-sm font-medium text-gray-900">{seasonsData.length} season</span>
					</div>
					<div class="flex justify-between">
						<span class="text-sm text-gray-600">Active</span>
						<span class="text-sm font-medium text-gray-900">{seasonsData.filter(s => s.status === 'Active').length} season</span>
					</div>
					<div class="flex justify-between">
						<span class="text-sm text-gray-600">Upcoming</span>
						<span class="text-sm font-medium text-gray-900">{seasonsData.filter(s => s.status === 'Upcoming').length} season</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Filters -->
	<div class="card mt-8 mb-6">
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
					{#each adminBranches as branch}
						<option value={branch}>{branch}</option>
					{/each}
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

	<!-- Daftar Season -->
	<div class="card">
		<div class="flex items-center justify-between mb-6">
			<h3 class="text-lg font-semibold text-gray-900">Daftar Season</h3>
			<span class="text-sm text-gray-500">{filteredSeasons.length} dari {seasonsData.length} season</span>
		</div>
		
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>

						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each filteredSeasons as season}
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="flex items-center">
									<div class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
										<Icon name="map-pin" size="16" color="white" />
									</div>
									<div class="ml-4">
										<div class="text-sm font-medium text-gray-900">{season.seasonName}</div>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{season.branch}</td>

							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{formatDate(season.startDate)} - {formatDate(season.endDate)}
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<button 
									on:click={() => toggleSeasonStatus(season.id)}
									class="inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer {getStatusColor(season.status)} hover:opacity-80"
								>
									{season.status}
								</button>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
								<div class="flex items-center space-x-2">
									<a href="/admin/umrah-input" class="text-purple-600 hover:text-purple-900" aria-label="Kelola kategori">
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
										</svg>
									</a>
									<button 
										on:click={() => deleteSeason(season.id)}
										class="text-red-600 hover:text-red-900"
										aria-label="Hapus season"
									>
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
										</svg>
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if filteredSeasons.length === 0}
			<div class="text-center py-12 text-gray-500">
				<Icon name="calendar" size="48" color="#9ca3af" />
				<h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada season</h3>
				<p class="mt-1 text-sm text-gray-500">
					{searchTerm || selectedBranch || selectedStatus ? 'Tidak ada season yang sesuai dengan filter.' : 'Belum ada season yang dibuat.'}
				</p>
			</div>
		{/if}
	</div>
</div>

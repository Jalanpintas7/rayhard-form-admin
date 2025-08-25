<script>
	import Icon from '../../../lib/icons.svelte';
	import Dropdown from '../../../lib/components/Dropdown.svelte';

	// Data untuk form Musim Umrah
	let seasonForm = {
		branch: '',
		seasonName: '',
		startDate: '',
		endDate: ''
	};

	// Data untuk dropdown
	let adminCawanganes = [
		'Kuala Lumpur',
		'Shah Alam',
		'Kuantan',
		'Melaka',
		'Bandar Baru Bangi',
		'Seremban',
		'Batu Pahat',
		'Kota Kinabalu',
		'Kota Bharu',
		'Kota Tinggi'
	];

	// Data season Umrah yang sudah dibuat
	let seasonsData = [
		{
			id: 1,
			branch: 'Kuala Lumpur',
			seasonName: 'Ramadan 2024',
			startDate: '2024-03-01',
			endDate: '2024-04-30',
			status: 'Active'
		},
		{
			id: 2,
			branch: 'Shah Alam',
			seasonName: 'Syawal 2024',
			startDate: '2024-04-15',
			endDate: '2024-06-15',
			status: 'Upcoming'
		},
		{
			id: 3,
			branch: 'Kuantan',
			seasonName: 'Dzulhijjah 2024',
			startDate: '2024-06-01',
			endDate: '2024-07-30',
			status: 'Active'
		}
	];

	// Filter
	let searchTerm = '';
	let selectedCawangan = '';
	let selectedStatus = '';

	// Filter seasons (hanya untuk Umrah sekarang)
	$: filteredMusims = seasonsData.filter(season => {
		const matchesSearch = season.seasonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 season.branch.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCawangan = !selectedCawangan || season.branch === selectedCawangan;
		const matchesStatus = !selectedStatus || season.status === selectedStatus;
		
		return matchesSearch && matchesCawangan && matchesStatus;
	});

	function submitMusim() {
		if (seasonForm.branch && seasonForm.seasonName && seasonForm.startDate && seasonForm.endDate) {
			const newMusim = {
				id: seasonsData.length + 1,
				...seasonForm,
				status: 'Active'
			};
			seasonsData = [...seasonsData, newMusim];
			
			// Reset form
			seasonForm = {
				branch: '',
				seasonName: '',
				startDate: '',
				endDate: ''
			};
			
			alert('Musim berhasil ditambahkan!');
		} else {
			alert('Sila lengkapkan semua medan yang wajib diisi!');
		}
	}

	function deleteMusim(id) {
		if (confirm('Apakah Anda yakin ingin menghapus season ini?')) {
			seasonsData = seasonsData.filter(item => item.id !== id);
		}
	}

	function toggleMusimStatus(id) {
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
		return new Date(dateString).toLocaleDateString('ms-MY', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function getStatusColor(status) {
		switch(status) {
			case 'Active': return 'bg-green-100 text-green-800';
			case 'Inactive': return 'bg-red-100 text-red-800';
			case 'Upcoming': return 'bg-secondary-100 text-[#9A8F00]';
			default: return 'bg-gray-100 text-gray-800';
		}
	}
</script>

<svelte:head>
	<title>Management Musim - Rayhar Travel Admin</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Management Musim Umrah</h1>
				<p class="text-gray-600 mt-1">Tambah dan Management season untuk Umrah</p>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Form Input Musim -->
		<div class="card-primary">
			<div class="p-2 sm:p-6">
				<div class="flex items-center mb-6">
					<div class="p-2 bg-primary-100 rounded-lg mr-3">
						<Icon name="calendar" size="20" color="#921E8D" />
					</div>
					<h2 class="text-xl font-semibold text-gray-900">Pakej Baru</h2>
				</div>

				<form on:submit|preventDefault={submitMusim} class="space-y-4">
					

					<div>
						<label for="season-name" class="block text-sm font-medium text-gray-700 mb-1">
							Nama Musim *
						</label>
						<input 
							type="text" 
							id="season-name"
							bind:value={seasonForm.seasonName}
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
							placeholder="Contoh: Ramadan 2024, Syawal 2024"
							required
						/>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label for="start-date" class="block text-sm font-medium text-gray-700 mb-1">
								Start Date *
							</label>
							<input 
								type="date" 
								id="start-date"
								bind:value={seasonForm.startDate}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
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
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
								required
							/>
						</div>
					</div>

					<button 
						type="submit"
						class="w-full btn-primary"
					>
						Daftar Pakej
					</button>
				</form>
			</div>
		</div>

		<!-- Summary -->
		<div class="space-y-6">
			<!-- Stats Cards -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div class="card-primary">
					<div class="p-4">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium text-gray-600">Total Musim</p>
								<p class="text-2xl font-bold text-gray-900">{seasonsData.length}</p>
							</div>
							<div class="p-3 bg-[#921E8D] rounded-lg">
								<Icon name="calendar" size="20" color="white" />
							</div>
						</div>
					</div>
				</div>
				<div class="card-primary">
					<div class="p-4">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium text-gray-600">Musim Aktif</p>
								<p class="text-2xl font-bold text-gray-900">{seasonsData.filter(s => s.status === 'Active').length}</p>
							</div>
							<div class="p-3 bg-secondary  rounded-lg">
								<Icon name="Trendding-up" size="20" color="#1F2937" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Quick Info -->
			<div class="card-primary">
				<div class="p-2 sm:p-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Info Musim</h3>
					<div class="space-y-3">
						<div class="flex justify-between">
							<span class="text-sm text-gray-600">Total Musim</span>
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
	</div>

	<!-- Filters -->
	<div class="card-primary mt-8 mb-6">
		<div class="p-2 sm:p-6">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<label for="search" class="block text-sm font-medium text-gray-700 mb-1">Cari</label>
					<input 
						type="text" 
						id="search"
						bind:value={searchTerm}
						placeholder="Cari season atau branch..."
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
					/>
				</div>
				<div>
					<label for="cawangan-dropdown" class="block text-sm font-medium text-gray-700 mb-1">Cawangan</label>
					<Dropdown
						id="cawangan-dropdown"
						options={[{value: '', label: 'Semua Cawangan'}, ...adminCawanganes.map(branch => ({value: branch, label: branch}))]}
						bind:value={selectedCawangan}
						placeholder="Pilih cawangan"
						searchable={true}
						size="medium"
						variant="default"
					/>
				</div>

				<div>
					<label for="status-dropdown" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
					<Dropdown
						id="status-dropdown"
						options={[
							{value: '', label: 'Semua Status'},
							{value: 'Active', label: 'Active'},
							{value: 'Inactive', label: 'Inactive'},
							{value: 'Upcoming', label: 'Upcoming'}
						]}
						bind:value={selectedStatus}
						placeholder="Pilih status"
						searchable={false}
						size="medium"
						variant="default"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Daftar Musim -->
	<div class="card-primary">
		<div class="p-2 sm:p-6">
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-lg font-semibold text-gray-900">Daftar Musim</h3>
				<span class="text-sm text-gray-500">{filteredMusims.length} dari {seasonsData.length} season</span>
			</div>
			
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Musim</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cawangan</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempoh</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tindakan</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each filteredMusims as season}
							<tr class="hover:bg-gray-50 transition-colors">
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div class="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-[#AC2EAC] flex items-center justify-center">
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
										on:click={() => toggleMusimStatus(season.id)}
										class="inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer {getStatusColor(season.status)} hover:opacity-80 transition-opacity"
									>
										{season.status}
									</button>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<div class="flex items-center space-x-2">
										<a href="/admin/umrah-input" class="text-[#921E8D] hover:text-[#7B1D7B] transition-colors" aria-label="Management kategori">
											<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
											</svg>
										</a>
										<button 
											on:click={() => deleteMusim(season.id)}
											class="text-red-600 hover:text-red-900 transition-colors"
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

			{#if filteredMusims.length === 0}
				<div class="text-center py-12 text-gray-500">
					<Icon name="calendar" size="48" color="#9ca3af" />
					<h3 class="mt-2 text-sm font-medium text-gray-900">Tiada musim</h3>
					<p class="mt-1 text-sm text-gray-500">
						{searchTerm || selectedCawangan || selectedStatus ? 'Tiada musim yang sesuai dengan penapis.' : 'Belum ada musim yang dibuat.'}
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>

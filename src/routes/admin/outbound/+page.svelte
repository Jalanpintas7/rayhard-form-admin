<script>
	import Icon from '../../../lib/icons.svelte';

	// Data destinasi outbound
	let availableDestinations = [
		'Tokyo - Japan',
		'Paris - France',
		'London - England',
		'Seoul - South Korea',
		'Bangkok - Thailand',
		'Singapore - Singapore',
		'Dubai - UAE',
		'Istanbul - Turkey',
		'Sydney - Australia',
		'New York - USA'
	];

	// Data outbound tours yang sudah dibuat
	let outboundTours = [
		{
			id: 1,
			destination: 'Istanbul - Turkey',
			name: '10 Oktober - 12 Desember',
			startDate: '2024-10-10',
			endDate: '2024-12-12',
			branch: 'Jakarta Pusat',
			price: 15000000,
			description: 'Tour warisan budaya Istanbul musim gugur',
			isActive: true
		},
		{
			id: 2,
			destination: 'Istanbul - Turkey',
			name: '15 Januari - 28 Februari',
			startDate: '2025-01-15',
			endDate: '2025-02-28',
			branch: 'Bandung',
			price: 18000000,
			description: 'Tour musim dingin Istanbul',
			isActive: true
		},
		{
			id: 3,
			destination: 'Tokyo - Japan',
			name: '5 Maret - 20 Maret',
			startDate: '2025-03-05',
			endDate: '2025-03-20',
			branch: 'Jakarta Pusat',
			price: 25000000,
			description: 'Tour Sakura Tokyo musim semi',
			isActive: true
		},
		{
			id: 4,
			destination: 'Paris - France',
			name: '1 Juni - 15 Juni',
			startDate: '2025-06-01',
			endDate: '2025-06-15',
			branch: 'Surabaya',
			price: 35000000,
			description: 'Tour Paris musim panas',
			isActive: false
		},
		{
			id: 5,
			destination: 'Seoul - South Korea',
			name: '10 April - 25 April',
			startDate: '2025-04-10',
			endDate: '2025-04-25',
			branch: 'Jakarta Selatan',
			price: 22000000,
			description: 'Tour Seoul musim semi',
			isActive: true
		}
	];

	// Filters
	let searchTerm = '';
	let selectedDestination = '';
	let selectedBranch = '';
	let selectedStatus = '';

	// Filter tours
	$: filteredTours = outboundTours.filter(tour => {
		const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 tour.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 tour.branch.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesDestination = !selectedDestination || tour.destination === selectedDestination;
		const matchesBranch = !selectedBranch || tour.branch === selectedBranch;
		const matchesStatus = !selectedStatus || (selectedStatus === 'active' ? tour.isActive : !tour.isActive);
		
		return matchesSearch && matchesDestination && matchesBranch && matchesStatus;
	});

	// Group tours by destination for display
	$: toursByDestination = filteredTours.reduce((acc, tour) => {
		if (!acc[tour.destination]) {
			acc[tour.destination] = [];
		}
		acc[tour.destination].push(tour);
		return acc;
	}, {});

	function deleteTour(id) {
		if (confirm('Apakah Anda yakin ingin menghapus tour ini?')) {
			outboundTours = outboundTours.filter(item => item.id !== id);
		}
	}

	function toggleTourStatus(id) {
		outboundTours = outboundTours.map(item => {
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

	function formatPrice(price) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(price);
	}
</script>

<svelte:head>
	<title>Data Outbound - Rayhar Travel Admin</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Data Outbound</h1>
				<p class="text-gray-600 mt-1">Kelola data tour outbound berdasarkan destinasi dan periode</p>
			</div>
			<a href="/admin/destinations" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
				Tambah Tour Outbound
			</a>
		</div>
	</div>

	<!-- Filters -->
	<div class="card mb-6">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
			<div>
				<label for="search" class="block text-sm font-medium text-gray-700 mb-1">Cari</label>
				<input 
					type="text" 
					id="search"
					bind:value={searchTerm}
					placeholder="Cari tour, destinasi, atau branch..."
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
				/>
			</div>
			<div>
				<label for="destination-filter" class="block text-sm font-medium text-gray-700 mb-1">Destinasi</label>
				<select 
					id="destination-filter"
					bind:value={selectedDestination}
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
				>
					<option value="">Semua Destinasi</option>
					{#each availableDestinations as destination}
						<option value={destination}>{destination}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="branch-filter" class="block text-sm font-medium text-gray-700 mb-1">Branch</label>
				<select 
					id="branch-filter"
					bind:value={selectedBranch}
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
				>
					<option value="">Semua Status</option>
					<option value="active">Aktif</option>
					<option value="inactive">Nonaktif</option>
				</select>
			</div>
		</div>
	</div>

	<!-- Tours by Destination -->
	<div class="space-y-6">
		{#each Object.entries(toursByDestination) as [destination, tours]}
			<div class="card">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-semibold text-gray-900 flex items-center">
						<Icon name="map-pin" size="20" color="#4f46e5" class_name="mr-2" />
						{destination}
					</h3>
					<span class="text-sm text-gray-500">{tours.length} tour</span>
				</div>
				
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{#each tours as tour}
						<div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
							<div class="flex justify-between items-start mb-3">
								<h4 class="font-medium text-gray-900">{tour.name}</h4>
								<button 
									on:click={() => toggleTourStatus(tour.id)}
									class="inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer {tour.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}"
								>
									{tour.isActive ? 'Aktif' : 'Nonaktif'}
								</button>
							</div>
							
							<div class="space-y-2 text-sm text-gray-600">
								<p><strong>Branch:</strong> {tour.branch}</p>
								<p><strong>Periode:</strong> {formatDate(tour.startDate)} - {formatDate(tour.endDate)}</p>
								{#if tour.price}
									<p><strong>Harga:</strong> {formatPrice(tour.price)} / orang</p>
								{/if}
								{#if tour.description}
									<p class="text-gray-500">{tour.description}</p>
								{/if}
							</div>
							
							<div class="flex justify-end mt-3">
								<button 
									on:click={() => deleteTour(tour.id)}
									class="text-red-600 hover:text-red-800"
									aria-label="Hapus tour"
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
									</svg>
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}

		{#if Object.keys(toursByDestination).length === 0}
			<div class="card text-center py-12 text-gray-500">
				<Icon name="plane" size="48" color="#9ca3af" />
				<h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada tour outbound</h3>
				<p class="mt-1 text-sm text-gray-500">
					{searchTerm || selectedDestination || selectedBranch || selectedStatus ? 'Tidak ada tour yang sesuai dengan filter.' : 'Belum ada tour outbound yang dibuat.'}
				</p>
				<div class="mt-6">
					<a href="/admin/destinations" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
						Buat Tour Baru
					</a>
				</div>
			</div>
		{/if}
	</div>
</div>

<script>
	import Icon from '../../../lib/icons.svelte';
	import Dropdown from '../../../lib/components/Dropdown.svelte';

	// Data destinasi Pelancongan
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

	// Data Pelancongan Trips yang sudah dibuat
	let PelanconganTrips = [
		{
			id: 1,
			destination: 'Istanbul - Turkey',
			name: '10 Oktober - 12 Disember',
			startDate: '2024-10-10',
			endDate: '2024-12-12',
			branch: 'Kuala Lumpur',
			price: 4350,
			description: 'Trip warisan budaya Istanbul musim gugur',
			isActive: true
		},
		{
			id: 2,
			destination: 'Istanbul - Turkey',
			name: '15 Januari - 28 Februari',
			startDate: '2025-01-15',
			endDate: '2025-02-28',
			branch: 'Shah Alam',
			price: 5220,
			description: 'Trip musim dingin Istanbul',
			isActive: true
		},
		{
			id: 3,
			destination: 'Tokyo - Japan',
			name: '5 Mac - 20 Mac',
			startDate: '2025-03-05',
			endDate: '2025-03-20',
			branch: 'Kuantan',
			price: 7250,
			description: 'Trip Sakura Tokyo musim semi',
			isActive: true
		},
		{
			id: 4,
			destination: 'Paris - France',
			name: '1 Jun - 15 Jun',
			startDate: '2025-06-01',
			endDate: '2025-06-15',
			branch: 'Melaka',
			price: 10150,
			description: 'Trip Paris musim panas',
			isActive: false
		},
		{
			id: 5,
			destination: 'Seoul - South Korea',
			name: '10 April - 25 April',
			startDate: '2025-04-10',
			endDate: '2025-04-25',
			branch: 'Seremban',
			price: 6380,
			description: 'Trip Seoul musim semi',
			isActive: true
		}
	];

	// Filters
	let searchTerm = '';
	let selectedDestination = '';
	let selectedCawangan = '';
	let selectedStatus = '';

	// Filter Trips
	$: filteredTrips = PelanconganTrips.filter(Trip => {
		const matchesSearch = Trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 Trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 Trip.branch.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesDestination = !selectedDestination || Trip.destination === selectedDestination;
		const matchesCawangan = !selectedCawangan || Trip.branch === selectedCawangan;
		const matchesStatus = !selectedStatus || (selectedStatus === 'active' ? Trip.isActive : !Trip.isActive);
		
		return matchesSearch && matchesDestination && matchesCawangan && matchesStatus;
	});

	// Group Trips by destination for display
	$: TripsByDestination = filteredTrips.reduce((acc, Trip) => {
		if (!acc[Trip.destination]) {
			acc[Trip.destination] = [];
		}
		acc[Trip.destination].push(Trip);
		return acc;
	}, {});

	function deleteTrip(id) {
		if (confirm('Apakah Anda yakin ingin menghapus Trip ini?')) {
			PelanconganTrips = PelanconganTrips.filter(item => item.id !== id);
		}
	}

	function toggleTripStatus(id) {
		PelanconganTrips = PelanconganTrips.map(item => {
			if (item.id === id) {
				return { ...item, isActive: !item.isActive };
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

	function formatPrice(price) {
		return new Intl.NumberFormat('ms-MY', {
			style: 'currency',
			currency: 'MYR',
			minimumFractionDigits: 0
		}).format(price);
	}
</script>

<svelte:head>
	<title>Data Pelancongan - Rayhar Travel Admin</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Data Pelancongan</h1>
				<p class="text-gray-600 mt-1">Management data Trip Pelancongan berdasarkan destinasi dan Tempoh</p>
			</div>
			<a href="/admin/destinations" class="w-full sm:w-auto text-center btn-secondary">
				Tambah Trip Pelancongan
			</a>
		</div>
	</div>

	<!-- Filters -->
	<div class="card-primary mb-6">
		<div class="p-2 sm:p-6">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div>
					<label for="search" class="block text-sm font-medium text-gray-700 mb-1">Cari</label>
					<input 
						type="text" 
						id="search"
						bind:value={searchTerm}
						placeholder="Cari Trip, destinasi, atau branch..."
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors"
					/>
				</div>
				<div>
					<label for="destination-dropdown" class="block text-sm font-medium text-gray-700 mb-1">Destinasi</label>
					<Dropdown
						id="destination-dropdown"
						options={[{value: '', label: 'Semua Destinasi'}, ...availableDestinations.map(dest => ({value: dest, label: dest}))]}
						bind:value={selectedDestination}
						placeholder="Pilih destinasi"
						searchable={true}
						size="medium"
						variant="default"
					/>
				</div>
				<div>
					<label for="cawangan-dropdown" class="block text-sm font-medium text-gray-700 mb-1">Cawangan</label>
					<Dropdown
						id="cawangan-dropdown"
						options={[
							{value: '', label: 'Semua Cawangan'},
							{value: 'Kuala Lumpur', label: 'Kuala Lumpur'},
							{value: 'Shah Alam', label: 'Shah Alam'},
							{value: 'Kuantan', label: 'Kuantan'},
							{value: 'Melaka', label: 'Melaka'},
							{value: 'Bandar Baru Bangi', label: 'Bandar Baru Bangi'},
							{value: 'Seremban', label: 'Seremban'},
							{value: 'Batu Pahat', label: 'Batu Pahat'},
							{value: 'Kota Kinabalu', label: 'Kota Kinabalu'},
							{value: 'Kota Bharu', label: 'Kota Bharu'},
							{value: 'Kota Tinggi', label: 'Kota Tinggi'}
						]}
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
							{value: 'active', label: 'Aktif'},
							{value: 'inactive', label: 'Nonaktif'}
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

	<!-- Trips by Destination -->
	<div class="space-y-6">
		{#each Object.entries(TripsByDestination) as [destination, Trips]}
			<div class="card-primary">
				<div class="p-2 sm:p-6">
					<div class="flex items-center justify-between mb-4">
						<h3 class="text-lg font-semibold text-gray-900 flex items-center">
							<Icon name="map-pin" size="20" color="#9A8F00" class_name="mr-2" />
							{destination}
						</h3>
						<span class="text-sm text-gray-500">{Trips.length} Trip</span>
					</div>
					
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each Trips as Trip}
							<div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
								<div class="flex justify-between items-start mb-3">
									<h4 class="font-medium text-gray-900">{Trip.name}</h4>
									<button 
										on:click={() => toggleTripStatus(Trip.id)}
										class="inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer {Trip.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} transition-opacity"
									>
										{Trip.isActive ? 'Aktif' : 'Nonaktif'}
									</button>
								</div>
								
								<div class="space-y-2 text-sm text-gray-600">
									<p><strong>Cawangan:</strong> {Trip.branch}</p>
									<p><strong>Tempoh:</strong> {formatDate(Trip.startDate)} - {formatDate(Trip.endDate)}</p>
									{#if Trip.price}
										<p><strong>Harga:</strong> {formatPrice(Trip.price)} / Pax</p>
									{/if}
									{#if Trip.description}
										<p class="text-gray-500">{Trip.description}</p>
									{/if}
								</div>
								
								<div class="flex justify-end mt-3">
									<button 
										on:click={() => deleteTrip(Trip.id)}
										class="text-red-600 hover:text-red-800 transition-colors"
										aria-label="Hapus Trip"
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
			</div>
		{/each}

		{#if Object.keys(TripsByDestination).length === 0}
			<div class="card-primary text-center py-12 text-gray-500">
				<div class="p-2 sm:p-6">
					<Icon name="plane" size="48" color="#9ca3af" />
					<h3 class="mt-2 text-sm font-medium text-gray-900">Tiada Trip Pelancongan</h3>
					<p class="mt-1 text-sm text-gray-500">
						{searchTerm || selectedDestination || selectedCawangan || selectedStatus ? 'Tiada Trip yang sesuai dengan penapis.' : 'Belum ada Trip Pelancongan yang dibuat.'}
					</p>
					<div class="mt-6">
						<a href="/admin/destinations" class="btn-secondary">
							Buat Trip Baru
						</a>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

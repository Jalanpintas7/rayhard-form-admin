<script>
	import Icon from '../../../lib/icons.svelte';
	import Dropdown from '../../../lib/components/Dropdown.svelte';

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

	// Form untuk Trip Pelancongan baru
	let TripForm = {
		destination: '',
		startDate: '',
		endDate: '',
		branch: '',
		price: 0,
		description: '',
		isActive: true
	};

	// Form untuk destinasi baru
	let newDestinationForm = {
		name: '',
		description: ''
	};

	// Modal state
	let showAddDestinationModal = false;

	function submitTrip() {
		if (TripForm.destination && TripForm.startDate && TripForm.endDate && TripForm.branch) {
			// Generate nama dari date range
			const startDateFormatted = formatDateForName(TripForm.startDate);
			const endDateFormatted = formatDateForName(TripForm.endDate);
			const generatedName = `${startDateFormatted} - ${endDateFormatted}`;
			
			const newTrip = {
				id: PelanconganTrips.length + 1,
				name: generatedName,
				...TripForm
			};
			PelanconganTrips = [...PelanconganTrips, newTrip];
			
			// Reset form
			TripForm = {
				destination: '',
				startDate: '',
				endDate: '',
				branch: '',
				price: 0,
				description: '',
				isActive: true
			};
			
			alert('Trip Pelancongan berhasil ditambahkan!');
		} else {
			alert('Mohon lengkapi destinasi, start date, end date, dan branch!');
		}
	}

	function submitNewDestination() {
		if (newDestinationForm.name.trim()) {
			// Semak jika destinasi sudah ada
			if (availableDestinations.includes(newDestinationForm.name.trim())) {
				alert('Destinasi sudah ada dalam senarai!');
				return;
			}
			
			// Tambah destinasi baru ke array
			availableDestinations = [...availableDestinations, newDestinationForm.name.trim()];
			
			// Reset form dan tutup modal
			newDestinationForm = {
				name: '',
				description: ''
			};
			showAddDestinationModal = false;
			
			alert('Destinasi baru berhasil ditambahkan!');
		} else {
			alert('Mohon masukkan nama destinasi!');
		}
	}

	function openAddDestinationModal() {
		showAddDestinationModal = true;
	}

	function closeAddDestinationModal() {
		showAddDestinationModal = false;
		newDestinationForm = {
			name: '',
			description: ''
		};
	}

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('ms-MY', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function formatDateForName(dateString) {
		return new Date(dateString).toLocaleDateString('ms-MY', {
			day: 'numeric',
			month: 'long'
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
	<title>Destinasi Pelancongan - Rayhar Travel Admin</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Input Trip Pelancongan</h1>
				<p class="text-gray-600 mt-1">Tambah Trip Pelancongan baru berdasarkan destinasi dan Tempoh</p>
			</div>
			<a href="/admin/Pelancongan" class="w-full sm:w-auto text-center btn-secondary">
				Lihat Data Pelancongan
			</a>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Form Input Trip Pelancongan -->
		<div class="card-primary">
			<div class="p-2 sm:p-6">
				<div class="flex items-center mb-6">
					<div class="p-2 bg-secondary-100 rounded-lg mr-3">
						<Icon name="plane" size="20" color="#9A8F00" />
					</div>
					<h2 class="text-xl font-semibold text-gray-900">Tambah Trip Pelancongan</h2>
				</div>

				<form on:submit|preventDefault={submitTrip} class="space-y-4">
					<div>
						<label for="branch" class="block text-sm font-medium text-gray-700 mb-1">
							Cawangan *
						</label>
						<Dropdown
						options={adminCawanganes.map(branch => ({value: branch, label: branch}))}
						bind:value={TripForm.branch}
						placeholder="Pilih Cawangan"
						searchable={true}
						size="medium"
						variant="default"
					/>
					</div>

					<div>
						<div class="flex items-center justify-between mb-1">
							<label for="destination" class="block text-sm font-medium text-gray-700">
								Destinasi *
							</label>
							<button 
								type="button"
								on:click={openAddDestinationModal}
								class="text-xs text-[#9A8F00] hover:text-[#7A7400] font-medium transition-colors"
							>
								+ Tambah Destinasi
							</button>
						</div>
						<Dropdown
						options={availableDestinations.map(dest => ({value: dest, label: dest}))}
						bind:value={TripForm.destination}
						placeholder="Pilih Destinasi"
						searchable={true}
						size="medium"
						variant="default"
					/>
					</div>

					<!-- Date Range Section -->
					<div class="bg-secondary-100 rounded-lg p-4 border border-secondary-200">
						<h4 class="text-sm font-semibold text-[#9A8F00] mb-3">Tempoh Trip</h4>
						<div class="grid grid-cols-2 gap-3">
							<div>
								<label for="start-date" class="block text-xs font-medium text-gray-700 mb-1">
									Start Date *
								</label>
								<input 
									type="date" 
									id="start-date"
									bind:value={TripForm.startDate}
									class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-secondary-500 transition-colors"
									required
								/>
							</div>
							<div>
								<label for="end-date" class="block text-xs font-medium text-gray-700 mb-1">
									End Date *
								</label>
								<input 
									type="date" 
									id="end-date"
									bind:value={TripForm.endDate}
									class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-secondary-500 transition-colors"
									required
								/>
							</div>
						</div>
						{#if TripForm.startDate && TripForm.endDate}
							<div class="mt-3 p-2 bg-white rounded border border-secondary-300">
								<p class="text-xs text-[#9A8F00]">
									<strong>Nama Trip:</strong> 
									{formatDateForName(TripForm.startDate)} - {formatDateForName(TripForm.endDate)}
								</p>
							</div>
						{/if}
					</div>

					<!-- Price Section -->
					<div class="bg-secondary-100 rounded-lg p-4 border border-secondary-200">
						<h4 class="text-sm font-semibold text-[#9A8F00] mb-3">Harga Trip</h4>
						<div>
							<label for="price" class="block text-sm font-medium text-gray-700 mb-1">
								Harga Per Pax
							</label>
							<input 
								type="number" 
								id="price"
								bind:value={TripForm.price}
								min="0"
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors"
								placeholder="0"
							/>
						</div>
					</div>

					<div>
						<label for="description" class="block text-sm font-medium text-gray-700 mb-1">
							Description Trip
						</label>
						<textarea 
							id="description"
							bind:value={TripForm.description}
							rows="3"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors"
							placeholder="Masukkan Description Trip Pelancongan..."
						></textarea>
					</div>

					<div class="flex items-center">
						<input 
							type="checkbox" 
							id="Trip-active"
							bind:checked={TripForm.isActive}
							class="rounded border-gray-300 text-[#9A8F00] focus:ring-secondary-500"
						/>
						<label for="Trip-active" class="ml-2 text-sm text-gray-700">
							Aktif
						</label>
					</div>

					<button 
						type="submit"
						class="w-full btn-secondary"
					>
						Tambah Trip Pelancongan
					</button>
				</form>
			</div>
		</div>

		<!-- Summary -->
		<div class="space-y-6">
			<!-- Stats Cards -->
			<div class="grid grid-cols-2 gap-4">
				<div class="card-primary">
					<div class="p-4">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium text-gray-600">Total Trip</p>
								<p class="text-2xl font-bold text-gray-900">{PelanconganTrips.length}</p>
							</div>
							<div class="p-3 bg-[#9A8F00] rounded-lg">
								<Icon name="plane" size="20" color="white" />
							</div>
						</div>
					</div>
				</div>
				<div class="card-primary">
					<div class="p-4">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium text-gray-600">Trip Aktif</p>
								<p class="text-2xl font-bold text-gray-900">{PelanconganTrips.filter(t => t.isActive).length}</p>
							</div>
							<div class="p-3 bg-[#FFF00C] rounded-lg">
								<Icon name="Trendding-up" size="20" color="#1F2937" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Destinasi Tersedia -->
			<div class="card-primary">
				<div class="p-2 sm:p-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Destinasi Tersedia</h3>
					<div class="space-y-2">
						{#each availableDestinations.slice(0, 5) as destination}
							<div class="flex items-center">
								<Icon name="map-pin" size="14" color="#6b7280" />
								<span class="text-sm text-gray-600 ml-2">{destination}</span>
							</div>
						{/each}
						{#if availableDestinations.length > 5}
							<p class="text-xs text-gray-500 mt-2">Dan {availableDestinations.length - 5} destinasi lainnya...</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Modal Tambah Destinasi -->
{#if showAddDestinationModal}
	<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
		<div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
			<div class="mt-3">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-semibold text-gray-900">Tambah Destinasi Baru</h3>
					<button 
						on:click={closeAddDestinationModal}
						class="text-gray-400 hover:text-gray-600 transition-colors"
						aria-label="Tutup modal"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>
				</div>
				
				<form on:submit|preventDefault={submitNewDestination} class="space-y-4">
					<div>
						<label for="new-destination-name" class="block text-sm font-medium text-gray-700 mb-1">
							Nama Destinasi *
						</label>
						<input 
							type="text" 
							id="new-destination-name"
							bind:value={newDestinationForm.name}
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors"
							placeholder="Contoh: Hanoi - Vietnam"
							required
						/>
					</div>

					<div>
						<label for="new-destination-description" class="block text-sm font-medium text-gray-700 mb-1">
							Description (Opsional)
						</label>
						<textarea 
							id="new-destination-description"
							bind:value={newDestinationForm.description}
							rows="3"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors"
							placeholder="Description singkat tentang destinasi..."
						></textarea>
					</div>

					<div class="flex items-center justify-end space-x-3 pt-4">
						<button 
							type="button"
							on:click={closeAddDestinationModal}
							class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
						>
							Batal
						</button>
						<button 
							type="submit"
							class="btn-secondary"
						>
							Tambah Destinasi
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

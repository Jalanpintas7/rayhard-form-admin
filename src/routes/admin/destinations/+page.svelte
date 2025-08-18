<script>
	import Icon from '../../../lib/icons.svelte';

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

	// Form untuk tour outbound baru
	let tourForm = {
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



	function submitTour() {
		if (tourForm.destination && tourForm.startDate && tourForm.endDate && tourForm.branch) {
			// Generate nama dari date range
			const startDateFormatted = formatDateForName(tourForm.startDate);
			const endDateFormatted = formatDateForName(tourForm.endDate);
			const generatedName = `${startDateFormatted} - ${endDateFormatted}`;
			
			const newTour = {
				id: outboundTours.length + 1,
				name: generatedName,
				...tourForm
			};
			outboundTours = [...outboundTours, newTour];
			
			// Reset form
			tourForm = {
				destination: '',
				startDate: '',
				endDate: '',
				branch: '',
				price: 0,
				description: '',
				isActive: true
			};
			
			alert('Tour Outbound berhasil ditambahkan!');
		} else {
			alert('Mohon lengkapi destinasi, start date, end date, dan branch!');
		}
	}

	function submitNewDestination() {
		if (newDestinationForm.name.trim()) {
			// Cek jika destinasi sudah ada
			if (availableDestinations.includes(newDestinationForm.name.trim())) {
				alert('Destinasi sudah ada dalam daftar!');
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
		return new Date(dateString).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function formatDateForName(dateString) {
		return new Date(dateString).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long'
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
	<title>Destinasi Outbound - Rayhar Travel Admin</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Input Tour Outbound</h1>
				<p class="text-gray-600 mt-1">Tambah tour outbound baru berdasarkan destinasi dan periode</p>
			</div>
			<a href="/admin/outbound" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
				Lihat Data Outbound
			</a>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Form Input Tour Outbound -->
		<div class="card">
			<div class="flex items-center mb-6">
				<div class="p-2 bg-indigo-100 rounded-lg mr-3">
					<Icon name="plane" size="20" color="#4f46e5" />
				</div>
				<h2 class="text-xl font-semibold text-gray-900">Tambah Tour Outbound</h2>
			</div>

			<form on:submit|preventDefault={submitTour} class="space-y-4">
				<div>
					<label for="branch" class="block text-sm font-medium text-gray-700 mb-1">
						Branch *
					</label>
					<select 
						id="branch"
						bind:value={tourForm.branch}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
						required
					>
						<option value="">Pilih Branch</option>
						{#each adminBranches as branch}
							<option value={branch}>{branch}</option>
						{/each}
					</select>
				</div>

				<div>
					<div class="flex items-center justify-between mb-1">
						<label for="destination" class="block text-sm font-medium text-gray-700">
							Destinasi *
						</label>
						<button 
							type="button"
							on:click={openAddDestinationModal}
							class="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
						>
							+ Tambah Destinasi
						</button>
					</div>
					<select 
						id="destination"
						bind:value={tourForm.destination}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
						required
					>
						<option value="">Pilih Destinasi</option>
						{#each availableDestinations as destination}
							<option value={destination}>{destination}</option>
						{/each}
					</select>
				</div>

				<!-- Date Range Section -->
				<div class="bg-indigo-50 rounded-lg p-4">
					<h4 class="text-sm font-semibold text-indigo-900 mb-3">Periode Tour</h4>
					<div class="grid grid-cols-2 gap-3">
						<div>
							<label for="start-date" class="block text-xs font-medium text-gray-700 mb-1">
								Start Date *
							</label>
							<input 
								type="date" 
								id="start-date"
								bind:value={tourForm.startDate}
								class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
								bind:value={tourForm.endDate}
								class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
								required
							/>
						</div>
					</div>
					{#if tourForm.startDate && tourForm.endDate}
						<div class="mt-3 p-2 bg-white rounded border border-indigo-200">
							<p class="text-xs text-indigo-700">
								<strong>Nama Tour:</strong> 
								{formatDateForName(tourForm.startDate)} - {formatDateForName(tourForm.endDate)}
							</p>
						</div>
					{/if}
				</div>

				<!-- Price Section -->
				<div class="bg-indigo-50 rounded-lg p-4">
					<h4 class="text-sm font-semibold text-indigo-900 mb-3">Harga Tour</h4>
					<div>
						<label for="price" class="block text-sm font-medium text-gray-700 mb-1">
							Harga Per Orang
						</label>
						<input 
							type="number" 
							id="price"
							bind:value={tourForm.price}
							min="0"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
							placeholder="0"
						/>
					</div>
				</div>

				<div>
					<label for="description" class="block text-sm font-medium text-gray-700 mb-1">
						Deskripsi Tour
					</label>
					<textarea 
						id="description"
						bind:value={tourForm.description}
						rows="3"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
						placeholder="Masukkan deskripsi tour outbound..."
					></textarea>
				</div>

				<div class="flex items-center">
					<input 
						type="checkbox" 
						id="tour-active"
						bind:checked={tourForm.isActive}
						class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
					/>
					<label for="tour-active" class="ml-2 text-sm text-gray-700">
						Aktif
					</label>
				</div>

				<button 
					type="submit"
					class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
				>
					Tambah Tour Outbound
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
							<p class="text-sm font-medium text-gray-600">Total Tour</p>
							<p class="text-2xl font-bold text-gray-900">{outboundTours.length}</p>
						</div>
						<div class="p-3 bg-indigo-600 rounded-lg">
							<Icon name="plane" size="20" color="white" />
						</div>
					</div>
				</div>
				<div class="stat-card-success">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-600">Tour Aktif</p>
							<p class="text-2xl font-bold text-gray-900">{outboundTours.filter(t => t.isActive).length}</p>
						</div>
						<div class="p-3 bg-green-500 rounded-lg">
							<Icon name="trending-up" size="20" color="white" />
						</div>
					</div>
				</div>
			</div>

			<!-- Destinasi Tersedia -->
			<div class="card">
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

<!-- Modal Tambah Destinasi -->
{#if showAddDestinationModal}
	<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
		<div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
			<div class="mt-3">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-semibold text-gray-900">Tambah Destinasi Baru</h3>
					<button 
						on:click={closeAddDestinationModal}
						class="text-gray-400 hover:text-gray-600"
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
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
							placeholder="Contoh: Hanoi - Vietnam"
							required
						/>
					</div>

					<div>
						<label for="new-destination-description" class="block text-sm font-medium text-gray-700 mb-1">
							Deskripsi (Opsional)
						</label>
						<textarea 
							id="new-destination-description"
							bind:value={newDestinationForm.description}
							rows="3"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
							placeholder="Deskripsi singkat tentang destinasi..."
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
							class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
						>
							Tambah Destinasi
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

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
	let outboundDestinations = [
		'Turki',
		'Eropa (Paris, London, Amsterdam)',
		'Jepang (Tokyo, Osaka, Kyoto)',
		'Korea Selatan (Seoul, Busan)',
		'Singapura & Malaysia',
		'Thailand (Bangkok, Phuket)',
		'China (Beijing, Shanghai)',
		'India (Delhi, Mumbai, Agra)',
		'Australia (Sydney, Melbourne)',
		'Amerika (New York, Los Angeles)'
	];

	// Data season yang sudah dibuat
	let seasonsData = [
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
			seasonName: 'Turki Heritage 2024',
			startDate: '2024-06-01',
			endDate: '2024-06-30',
			type: 'outbound',
			status: 'Active'
		}
	];

	// Selected season
	let selectedSeason = null;

	// Data kategori untuk setiap season
	let categoriesData = [
		{
			id: 1,
			seasonId: 1,
			name: 'Premium',
			isActive: true,
			description: 'Paket Premium dengan hotel bintang 5',
			days: 15,
			type: 'umrah',
			pricing: {
				double: 25000000,
				triple: 22000000,
				quadruple: 20000000,
				quintuple: 18000000
			}
		},
		{
			id: 2,
			seasonId: 1,
			name: 'Regular',
			isActive: true,
			description: 'Paket Regular dengan hotel bintang 4',
			days: 12,
			type: 'umrah',
			pricing: {
				double: 20000000,
				triple: 18000000,
				quadruple: 16000000,
				quintuple: 15000000
			}
		},
		{
			id: 3,
			seasonId: 2,
			name: '10 Oktober - 12 Desember',
			destination: 'Turki',
			startDate: '2024-10-10',
			endDate: '2024-12-12',
			isActive: true,
			description: 'Tour warisan budaya Turki musim gugur',
			type: 'outbound',
			price: 15000000
		},
		{
			id: 4,
			seasonId: 2,
			name: '15 Januari - 28 Februari',
			destination: 'Turki',
			startDate: '2025-01-15',
			endDate: '2025-02-28',
			isActive: true,
			description: 'Tour musim dingin Turki',
			type: 'outbound',
			price: 18000000
		}
	];

	// Form untuk kategori Umrah
	let umrahCategoryForm = {
		name: '',
		isActive: true,
		description: '',
		days: 7,
		pricing: {
			double: 0,
			triple: 0,
			quadruple: 0,
			quintuple: 0
		}
	};

	// Form untuk kategori Outbound
	let outboundCategoryForm = {
		destination: '',
		startDate: '',
		endDate: '',
		isActive: true,
		description: '',
		price: 0
	};



	// Functions untuk kategori
	function submitUmrahCategory() {
		if (umrahCategoryForm.name && umrahCategoryForm.days > 0) {
			const newCategory = {
				id: categoriesData.length + 1,
				seasonId: selectedSeason.id,
				type: 'umrah',
				...umrahCategoryForm
			};
			categoriesData = [...categoriesData, newCategory];
			
			// Reset form
			umrahCategoryForm = {
				name: '',
				isActive: true,
				description: '',
				days: 7,
				pricing: {
					double: 0,
					triple: 0,
					quadruple: 0,
					quintuple: 0
				}
			};
			
			alert('Kategori Umrah berhasil ditambahkan!');
		} else {
			alert('Mohon lengkapi nama kategori dan durasi!');
		}
	}

	function submitOutboundCategory() {
		if (outboundCategoryForm.destination && outboundCategoryForm.startDate && outboundCategoryForm.endDate) {
			// Generate nama dari date range
			const startDateFormatted = formatDateForName(outboundCategoryForm.startDate);
			const endDateFormatted = formatDateForName(outboundCategoryForm.endDate);
			const generatedName = `${startDateFormatted} - ${endDateFormatted}`;
			
			const newCategory = {
				id: categoriesData.length + 1,
				seasonId: selectedSeason.id,
				type: 'outbound',
				name: generatedName,
				...outboundCategoryForm
			};
			categoriesData = [...categoriesData, newCategory];
			
			// Reset form
			outboundCategoryForm = {
				destination: '',
				startDate: '',
				endDate: '',
				isActive: true,
				description: '',
				price: 0
			};
			
			alert('Kategori Outbound berhasil ditambahkan!');
		} else {
			alert('Mohon lengkapi destinasi, start date, dan end date!');
		}
	}

	function deleteCategory(id) {
		if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
			categoriesData = categoriesData.filter(item => item.id !== id);
		}
	}

	function toggleCategoryActive(id) {
		categoriesData = categoriesData.map(item => {
			if (item.id === id) {
				return { ...item, isActive: !item.isActive };
			}
			return item;
		});
	}

	// Get categories for selected season
	$: currentCategories = selectedSeason ? categoriesData.filter(cat => cat.seasonId === selectedSeason.id) : [];

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

	function formatDateForName(dateString) {
		return new Date(dateString).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long'
		});
	}
</script>

<svelte:head>
	<title>Input Data - Rayhar Travel Admin</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">
					{#if selectedSeason}
						Kelola Kategori - {selectedSeason.seasonName}
					{:else}
						Pilih Season & Kelola Kategori
					{/if}
				</h1>
				<p class="text-gray-600 mt-1">
					{#if selectedSeason}
						Tambah dan kelola kategori untuk season yang dipilih
					{:else}
						Pilih season dari dropdown untuk mengelola kategori
					{/if}
				</p>
			</div>
			{#if selectedSeason}
				<button 
					on:click={() => selectedSeason = null}
					class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
				>
					← Kembali ke Pilih Season
				</button>
			{:else}
				<a href="/admin/seasons" class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
					Kelola Season
				</a>
			{/if}
		</div>
	</div>

	{#if !selectedSeason}
		<!-- Step 1: Pilih Season -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Dropdown Pilih Season -->
			<div class="card">
				<div class="flex items-center mb-6">
					<div class="p-2 bg-purple-100 rounded-lg mr-3">
						<Icon name="calendar" size="20" color="#622369" />
					</div>
					<h2 class="text-xl font-semibold text-gray-900">Pilih Season</h2>
				</div>

				<div class="space-y-4">
					<div>
						<label for="season-select" class="block text-sm font-medium text-gray-700 mb-1">
							Pilih Season yang Tersedia *
						</label>
						<select 
							id="season-select"
							on:change={(e) => {
								const seasonId = parseInt(e.target.value);
								if (seasonId) {
									selectedSeason = seasonsData.find(s => s.id === seasonId);
								}
							}}
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
						>
							<option value="">-- Pilih Season --</option>
							{#each seasonsData as season}
								<option value={season.id}>
									{season.seasonName} ({season.branch}) - {season.type === 'umrah' ? 'Umrah' : 'Outbound'}
								</option>
							{/each}
						</select>
					</div>

					<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
						<div class="flex items-start">
							<Icon name="eye" size="16" color="#2563eb" />
							<div class="ml-2">
								<h4 class="text-sm font-medium text-blue-800">Info</h4>
								<p class="text-sm text-blue-700 mt-1">Pilih season untuk mulai mengelola kategori di dalamnya. Jika belum ada season, buat terlebih dahulu di halaman "Kelola Season".</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Info Season -->
			<div class="card">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">Season yang Tersedia</h3>
				<div class="space-y-3 max-h-80 overflow-y-auto">
					{#each seasonsData as season}
						<div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
							<div class="flex justify-between items-start">
								<div class="flex-1">
									<div class="flex items-center space-x-2 mb-2">
										<h4 class="font-medium text-gray-900">{season.seasonName}</h4>
										<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {season.type === 'umrah' ? 'bg-purple-100 text-purple-800' : 'bg-indigo-100 text-indigo-800'}">
											{season.type === 'umrah' ? 'Umrah' : 'Outbound'}
										</span>
									</div>
									<p class="text-sm text-gray-600">{season.branch}</p>
									<p class="text-sm text-gray-600">{formatDate(season.startDate)} - {formatDate(season.endDate)}</p>
								</div>
								<button 
									on:click={() => selectedSeason = season}
									class="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition-colors"
								>
									Pilih
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

	{:else}
		<!-- Step 2: Category Management -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Form Input Kategori -->
			<div class="card">
				<div class="flex items-center mb-6">
					<div class="p-2 {selectedSeason.type === 'umrah' ? 'bg-purple-100' : 'bg-indigo-100'} rounded-lg mr-3">
						<Icon name={selectedSeason.type === 'umrah' ? 'map-pin' : 'plane'} size="20" color={selectedSeason.type === 'umrah' ? '#622369' : '#4f46e5'} />
					</div>
					<h2 class="text-xl font-semibold text-gray-900">
						Tambah Kategori {selectedSeason.type === 'umrah' ? 'Umrah' : 'Outbound'}
					</h2>
				</div>

				{#if selectedSeason.type === 'umrah'}
					<!-- Form Umrah -->
					<form on:submit|preventDefault={submitUmrahCategory} class="space-y-4">
						<div>
							<label for="umrah-category-name" class="block text-sm font-medium text-gray-700 mb-1">
								Nama Kategori *
							</label>
							<input 
								type="text" 
								id="umrah-category-name"
								bind:value={umrahCategoryForm.name}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
								placeholder="Contoh: Premium, Regular, VIP"
								required
							/>
						</div>

						<div>
							<label for="umrah-category-days" class="block text-sm font-medium text-gray-700 mb-1">
								Durasi (Hari) *
							</label>
							<input 
								type="number" 
								id="umrah-category-days"
								bind:value={umrahCategoryForm.days}
								min="1"
								max="365"
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
								required
							/>
						</div>

						<!-- Pricing Section for Umrah -->
						<div class="bg-purple-50 rounded-lg p-4">
							<h4 class="text-sm font-semibold text-purple-900 mb-3">Harga Per Tipe </h4>
							<div class="grid grid-cols-2 gap-3">
								<div>
									<label for="price-double" class="block text-xs font-medium text-gray-700 mb-1">
										Double
									</label>
									<input 
										type="number" 
										id="price-double"
										bind:value={umrahCategoryForm.pricing.double}
										min="0"
										class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
										placeholder="0"
									/>
								</div>
								<div>
									<label for="price-triple" class="block text-xs font-medium text-gray-700 mb-1">
										Triple
									</label>
									<input 
										type="number" 
										id="price-triple"
										bind:value={umrahCategoryForm.pricing.triple}
										min="0"
										class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
										placeholder="0"
									/>
								</div>
								<div>
									<label for="price-quadruple" class="block text-xs font-medium text-gray-700 mb-1">
										Quadruple
									</label>
									<input 
										type="number" 
										id="price-quadruple"
										bind:value={umrahCategoryForm.pricing.quadruple}
										min="0"
										class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
										placeholder="0"
									/>
								</div>
								<div>
									<label for="price-quintuple" class="block text-xs font-medium text-gray-700 mb-1">
										Quintuple
									</label>
									<input 
										type="number" 
										id="price-quintuple"
										bind:value={umrahCategoryForm.pricing.quintuple}
										min="0"
										class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
										placeholder="0"
									/>
								</div>
							</div>
						</div>

						<div>
							<label for="umrah-category-description" class="block text-sm font-medium text-gray-700 mb-1">
								Deskripsi
							</label>
							<textarea 
								id="umrah-category-description"
								bind:value={umrahCategoryForm.description}
								rows="3"
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
								placeholder="Masukkan deskripsi kategori umrah..."
							></textarea>
						</div>

						<div class="flex items-center">
							<input 
								type="checkbox" 
								id="umrah-category-active"
								bind:checked={umrahCategoryForm.isActive}
								class="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
							/>
							<label for="umrah-category-active" class="ml-2 text-sm text-gray-700">
								Aktif
							</label>
						</div>

						<button 
							type="submit"
							class="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
						>
							Tambah Kategori Umrah
						</button>
					</form>
				{:else}
					<!-- Form Outbound -->
					<form on:submit|preventDefault={submitOutboundCategory} class="space-y-4">
						<div>
							<label for="outbound-destination" class="block text-sm font-medium text-gray-700 mb-1">
								Destinasi *
							</label>
							<select 
								id="outbound-destination"
								bind:value={outboundCategoryForm.destination}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								required
							>
								<option value="">Pilih Destinasi</option>
								{#each outboundDestinations as destination}
									<option value={destination}>{destination}</option>
								{/each}
							</select>
						</div>

						<!-- Date Range Section -->
						<div class="bg-indigo-50 rounded-lg p-4">
							<h4 class="text-sm font-semibold text-indigo-900 mb-3">Periode Tour</h4>
							<div class="grid grid-cols-2 gap-3">
								<div>
									<label for="outbound-start-date" class="block text-xs font-medium text-gray-700 mb-1">
										Start Date *
									</label>
									<input 
										type="date" 
										id="outbound-start-date"
										bind:value={outboundCategoryForm.startDate}
										class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
										required
									/>
								</div>
								<div>
									<label for="outbound-end-date" class="block text-xs font-medium text-gray-700 mb-1">
										End Date *
									</label>
									<input 
										type="date" 
										id="outbound-end-date"
										bind:value={outboundCategoryForm.endDate}
										class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
										required
									/>
								</div>
							</div>
							{#if outboundCategoryForm.startDate && outboundCategoryForm.endDate}
								<div class="mt-3 p-2 bg-white rounded border border-indigo-200">
									<p class="text-xs text-indigo-700">
										<strong>Nama Kategori:</strong> 
										{formatDateForName(outboundCategoryForm.startDate)} - {formatDateForName(outboundCategoryForm.endDate)}
									</p>
								</div>
							{/if}
						</div>

						<!-- Price Section for Outbound -->
						<div class="bg-indigo-50 rounded-lg p-4">
							<h4 class="text-sm font-semibold text-indigo-900 mb-3">Harga Paket</h4>
							<div>
								<label for="outbound-price" class="block text-sm font-medium text-gray-700 mb-1">
									Harga Per Orang
								</label>
								<input 
									type="number" 
									id="outbound-price"
									bind:value={outboundCategoryForm.price}
									min="0"
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
									placeholder="0"
								/>
							</div>
						</div>

						<div>
							<label for="outbound-category-description" class="block text-sm font-medium text-gray-700 mb-1">
								Deskripsi
							</label>
							<textarea 
								id="outbound-category-description"
								bind:value={outboundCategoryForm.description}
								rows="3"
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								placeholder="Masukkan deskripsi tour outbound..."
							></textarea>
						</div>

						<div class="flex items-center">
							<input 
								type="checkbox" 
								id="outbound-category-active"
								bind:checked={outboundCategoryForm.isActive}
								class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label for="outbound-category-active" class="ml-2 text-sm text-gray-700">
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
				{/if}
			</div>

			<!-- Daftar Kategori -->
			<div class="card">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">
					Kategori dalam {selectedSeason.seasonName}
				</h3>
				<div class="space-y-3">
					{#each currentCategories as category}
						<div class="border border-gray-200 rounded-lg p-4">
							<div class="flex justify-between items-start">
								<div class="flex-1">
									<div class="flex items-center space-x-2 mb-2">
										<h4 class="font-medium text-gray-900">{category.name}</h4>
										<button 
											on:click={() => toggleCategoryActive(category.id)}
											class="inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer {category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}"
										>
											{category.isActive ? 'Aktif' : 'Nonaktif'}
										</button>
									</div>
									{#if selectedSeason.type === 'umrah'}
										<p class="text-sm text-gray-600 mb-2">{category.days} hari</p>
									{/if}
									
									<!-- Pricing Display -->
									{#if selectedSeason.type === 'umrah' && category.pricing}
										<div class="bg-purple-50 rounded-lg p-3 mb-2">
											<h5 class="text-xs font-semibold text-purple-900 mb-2">Harga Per Tipe Kamar:</h5>
											<div class="grid grid-cols-2 gap-2 text-xs">
												<div class="flex justify-between">
													<span class="text-gray-600">Double:</span>
													<span class="font-medium">{formatPrice(category.pricing.double)}</span>
												</div>
												<div class="flex justify-between">
													<span class="text-gray-600">Triple:</span>
													<span class="font-medium">{formatPrice(category.pricing.triple)}</span>
												</div>
												<div class="flex justify-between">
													<span class="text-gray-600">Quad:</span>
													<span class="font-medium">{formatPrice(category.pricing.quadruple)}</span>
												</div>
												<div class="flex justify-between">
													<span class="text-gray-600">Quint:</span>
													<span class="font-medium">{formatPrice(category.pricing.quintuple)}</span>
												</div>
											</div>
										</div>
									{:else if selectedSeason.type === 'outbound'}
										<div class="bg-indigo-50 rounded-lg p-3 mb-2">
											<div class="flex justify-between items-center mb-2">
												<h5 class="text-xs font-semibold text-indigo-900">Destinasi:</h5>
												<span class="text-xs font-medium text-indigo-800">{category.destination}</span>
											</div>
											<div class="flex justify-between items-center mb-2">
												<h5 class="text-xs font-semibold text-indigo-900">Periode:</h5>
												<span class="text-xs text-indigo-700">{formatDate(category.startDate)} - {formatDate(category.endDate)}</span>
											</div>
											{#if category.price}
												<div class="flex justify-between items-center">
													<h5 class="text-xs font-semibold text-indigo-900">Harga:</h5>
													<span class="text-sm font-medium text-indigo-800">{formatPrice(category.price)} / orang</span>
												</div>
											{/if}
										</div>
									{/if}

									{#if category.description}
										<p class="text-sm text-gray-500">{category.description}</p>
									{/if}
								</div>
								<button 
									on:click={() => deleteCategory(category.id)}
									class="text-red-600 hover:text-red-800 ml-2"
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
									</svg>
								</button>
							</div>
						</div>
					{/each}

					{#if currentCategories.length === 0}
						<div class="text-center py-8 text-gray-500">
							<Icon name="star" size="48" color="#9ca3af" />
							<p class="mt-2 text-sm">Belum ada kategori dalam season ini</p>
							<p class="text-xs">Tambahkan kategori menggunakan form di sebelah kiri</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

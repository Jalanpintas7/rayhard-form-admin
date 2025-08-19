<script>
	import Icon from '../../../lib/icons.svelte';
	import Dropdown from '../../../lib/components/Dropdown.svelte';

	// Data untuk dropdown
	let adminBranches = [
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
	let PelanconganDestinations = [
		'Turki',
		'Eropah (Paris, London, Amsterdam)',
		'Jepun (Tokyo, Osaka, Kyoto)',
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
			branch: 'Kuala Lumpur',
			seasonName: 'Ramadan 2024',
			startDate: '2024-03-01',
			endDate: '2024-04-30',
			type: 'umrah',
			status: 'Active'
		},
		{
			id: 2,
			branch: 'Shah Alam',
			seasonName: 'Turki Heritage 2024',
			startDate: '2024-06-01',
			endDate: '2024-06-30',
			type: 'Pelancongan',
			status: 'Active'
		}
	];

	// Selected season
	let selectedMusim = null;
	let selectedSeasonId = null;

	// Data kategori untuk setiap season
	let categoriesData = [
		{
			id: 1,
			seasonId: 1,
			name: 'Premium',
			isActive: true,
			description: 'Pakej Premium dengan hotel bintang 5',
			days: 15,
			type: 'umrah',
			pricing: {
				double: 7250,
				triple: 6380,
				quadruple: 5800,
				quintuple: 5220
			}
		},
		{
			id: 2,
			seasonId: 1,
			name: 'Regular',
			isActive: true,
			description: 'Pakej Regular dengan hotel bintang 4',
			days: 12,
			type: 'umrah',
			pricing: {
				double: 5800,
				triple: 5220,
				quadruple: 4640,
				quintuple: 4350
			}
		},
		{
			id: 3,
			seasonId: 2,
			name: '10 Oktober - 12 Disember',
			destination: 'Turki',
			startDate: '2024-10-10',
			endDate: '2024-12-12',
			isActive: true,
			description: 'Trip warisan budaya Turki musim gugur',
			type: 'Pelancongan',
			price: 4350
		},
		{
			id: 4,
			seasonId: 2,
			name: '15 Januari - 28 Februari',
			destination: 'Turki',
			startDate: '2025-01-15',
			endDate: '2025-02-28',
			isActive: true,
			description: 'Trip musim dingin Turki',
			type: 'Pelancongan',
			price: 5220
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

	// Form untuk kategori Pelancongan
	let PelanconganCategoryForm = {
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
				seasonId: selectedMusim.id,
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
			alert('Mohon lengkapi nama kategori dan Tempoh!');
		}
	}

	function submitPelanconganCategory() {
		if (PelanconganCategoryForm.destination && PelanconganCategoryForm.startDate && PelanconganCategoryForm.endDate) {
			// Generate nama dari date range
			const startDateFormatted = formatDateForName(PelanconganCategoryForm.startDate);
			const endDateFormatted = formatDateForName(PelanconganCategoryForm.endDate);
			const generatedName = `${startDateFormatted} - ${endDateFormatted}`;
			
			const newCategory = {
				id: categoriesData.length + 1,
				seasonId: selectedMusim.id,
				type: 'Pelancongan',
				name: generatedName,
				...PelanconganCategoryForm
			};
			categoriesData = [...categoriesData, newCategory];
			
			// Reset form
			PelanconganCategoryForm = {
				destination: '',
				startDate: '',
				endDate: '',
				isActive: true,
				description: '',
				price: 0
			};
			
			alert('Kategori Pelancongan berhasil ditambahkan!');
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
	$: currentCategories = selectedMusim ? categoriesData.filter(cat => cat.seasonId === selectedMusim.id) : [];

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

	function formatDateForName(dateString) {
		return new Date(dateString).toLocaleDateString('ms-MY', {
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
					{#if selectedMusim}
						Management Kategori - {selectedMusim.seasonName}
					{:else}
						Pilih Musim & Pengurusan Kategori
					{/if}
				</h1>
				<p class="text-gray-600 mt-1">
					{#if selectedMusim}
						Tambah dan urus kategori untuk musim yang dipilih
					{:else}
						Pilih musim dari dropdown untuk menguruskan kategori
					{/if}
				</p>
			</div>
			{#if selectedMusim}
				<button 
					on:click={() => {
						selectedMusim = null;
						selectedSeasonId = null;
					}}
					class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
				>
					← Kembali ke Pilih Musim
				</button>
			{:else}
				<a href="/admin/seasons" class="btn-primary">
					Management Musim
				</a>
			{/if}
		</div>
	</div>

	{#if !selectedMusim}
		<!-- Langkah 1: Pilih Musim -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Dropdown Pilih Musim -->
			<div class="card-primary">
				<div class="p-3 sm:p-6">
					<div class="flex items-center mb-6">
						<div class="p-2 bg-primary-100 rounded-lg mr-3">
							<Icon name="calendar" size="20" color="#921E8D" />
						</div>
						<h2 class="text-xl font-semibold text-gray-900">Pilih Musim</h2>
					</div>

					<div class="space-y-4">
						<div>
							<label for="season-select" class="block text-sm font-medium text-gray-700 mb-1">
								Pilih Musim yang Tersedia *
							</label>
							<Dropdown
						options={seasonsData.map(season => ({
							value: season.id,
							label: `${season.seasonName} (${season.branch}) - ${season.type === 'umrah' ? 'Umrah' : 'Pelancongan'}`
						}))}
						bind:value={selectedSeasonId}
						on:change={(e) => {
							const seasonId = parseInt(e.detail);
							if (seasonId) {
								selectedMusim = seasonsData.find(s => s.id === seasonId);
								selectedSeasonId = seasonId;
							}
						}}
						placeholder="-- Pilih Musim --"
						searchable={true}
						size="medium"
						variant="default"
					/>
						</div>

						<div class="bg-primary-100 border border-primary-200 rounded-lg p-4">
							<div class="flex items-start">
								<Icon name="eye" size="16" color="#921E8D" />
								<div class="ml-2">
									<h4 class="text-sm font-medium text-[#921E8D]">Info</h4>
									<p class="text-sm text-[#921E8D] mt-1">Pilih musim Umrah untuk mula menguruskan kategori di dalamnya. Jika musim belum wujud, sila buat terlebih dahulu di halaman 'Pengurusan Musim Umrah'.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Info Musim -->
			<div class="card-primary">
				<div class="p-3 sm:p-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Musim yang Tersedia</h3>
					<div class="space-y-3 max-h-80 overflow-y-auto">
						{#each seasonsData as season}
							<div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
								<div class="flex justify-between items-start">
									<div class="flex-1">
										<div class="flex items-center space-x-2 mb-2">
											<h4 class="font-medium text-gray-900">{season.seasonName}</h4>
											<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {season.type === 'umrah' ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-[#9A8F00]'}">
												{season.type === 'umrah' ? 'Umrah' : 'Pelancongan'}
											</span>
										</div>
										<p class="text-sm text-gray-600">{season.branch}</p>
										<p class="text-sm text-gray-600">{formatDate(season.startDate)} - {formatDate(season.endDate)}</p>
									</div>
									<button 
										on:click={() => {
											selectedMusim = season;
											selectedSeasonId = season.id;
										}}
										class="btn-primary text-xs px-3 py-1"
									>
										Pilih
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

	{:else}
		<!-- Step 2: Category Management -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Form Input Kategori -->
			<div class="card-primary">
				<div class="p-3 sm:p-6">
					<div class="flex items-center mb-6">
						<div class="p-2 {selectedMusim.type === 'umrah' ? 'bg-primary-100' : 'bg-secondary-100'} rounded-lg mr-3">
							<Icon name={selectedMusim.type === 'umrah' ? 'map-pin' : 'plane'} size="20" color={selectedMusim.type === 'umrah' ? '#921E8D' : '#9A8F00'} />
						</div>
						<h2 class="text-xl font-semibold text-gray-900">
							Tambah Kategori {selectedMusim.type === 'umrah' ? 'Umrah' : 'Pelancongan'}
						</h2>
					</div>

				{#if selectedMusim.type === 'umrah'}
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
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
								placeholder="Contoh: Premium, Regular, VIP"
								required
							/>
						</div>

						<div>
							<label for="umrah-category-days" class="block text-sm font-medium text-gray-700 mb-1">
								Tempoh (Hari) *
							</label>
							<input 
								type="number" 
								id="umrah-category-days"
								bind:value={umrahCategoryForm.days}
								min="1"
								max="365"
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
								required
							/>
						</div>

						<!-- Pricing Section for Umrah -->
						<div class="bg-primary-100 rounded-lg p-4 border border-primary-200">
							<h4 class="text-sm font-semibold text-[#921E8D] mb-3">Harga </h4>
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
										class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#921E8D] transition-colors"
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
										class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#921E8D] transition-colors"
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
										class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#921E8D] transition-colors"
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
										class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#921E8D] transition-colors"
										placeholder="0"
									/>
								</div>
							</div>
						</div>

						<div>
							<label for="umrah-category-description" class="block text-sm font-medium text-gray-700 mb-1">
								Description
							</label>
							<textarea 
								id="umrah-category-description"
								bind:value={umrahCategoryForm.description}
								rows="3"
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
								placeholder="Masukkan Description kategori umrah..."
							></textarea>
						</div>

						<div class="flex items-center">
							<input 
								type="checkbox" 
								id="umrah-category-active"
								bind:checked={umrahCategoryForm.isActive}
								class="rounded border-gray-300 text-[#921E8D] focus:ring-[#921E8D]"
							/>
							<label for="umrah-category-active" class="ml-2 text-sm text-gray-700">
								Aktif
							</label>
						</div>

						<button 
							type="submit"
							class="w-full btn-primary"
						>
							Tambah Kategori Umrah
						</button>
					</form>
				{:else}
					<!-- Form Pelancongan -->
					<form on:submit|preventDefault={submitPelanconganCategory} class="space-y-4">
						<div>
							<label for="Pelancongan-destination" class="block text-sm font-medium text-gray-700 mb-1">
								Destinasi *
							</label>
							<Dropdown
						options={PelanconganDestinations.map(dest => ({value: dest, label: dest}))}
						bind:value={PelanconganCategoryForm.destination}
						placeholder="Pilih Destinasi"
						searchable={true}
						size="medium"
						variant="default"
					/>
						</div>

						<!-- Date Range Section -->
						<div class="bg-primary-100 rounded-lg p-4 border border-primary-200">
							<h4 class="text-sm font-semibold text-[#921E8D] mb-3">Tempoh Trip</h4>
							<div class="grid grid-cols-2 gap-3">
								<div>
									<label for="Pelancongan-start-date" class="block text-xs font-medium text-gray-700 mb-1">
										Start Date *
									</label>
									<input 
										type="date" 
										id="Pelancongan-start-date"
										bind:value={PelanconganCategoryForm.startDate}
										class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#921E8D] transition-colors"
										required
									/>
								</div>
								<div>
									<label for="Pelancongan-end-date" class="block text-xs font-medium text-gray-700 mb-1">
										End Date *
									</label>
									<input 
										type="date" 
										id="Pelancongan-end-date"
										bind:value={PelanconganCategoryForm.endDate}
										class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#921E8D] transition-colors"
										required
									/>
								</div>
							</div>
							{#if PelanconganCategoryForm.startDate && PelanconganCategoryForm.endDate}
								<div class="mt-3 p-2 bg-white rounded border border-secondary-200">
									<p class="text-xs text-[#9A8F00]">
										<strong>Nama Kategori:</strong> 
										{formatDateForName(PelanconganCategoryForm.startDate)} - {formatDateForName(PelanconganCategoryForm.endDate)}
									</p>
								</div>
							{/if}
						</div>

						<!-- Price Section for Pelancongan -->
						<div class="bg-primary-100 rounded-lg p-4 border border-primary-200">
							<h4 class="text-sm font-semibold text-[#B8940F] mb-3">Harga Pakej</h4>
							<div>
								<label for="Pelancongan-price" class="block text-sm font-medium text-gray-700 mb-1">
									Harga Per Pax
								</label>
								<input 
									type="number" 
									id="Pelancongan-price"
									bind:value={PelanconganCategoryForm.price}
									min="0"
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
									placeholder="0"
								/>
							</div>
						</div>

						<div>
							<label for="Pelancongan-category-description" class="block text-sm font-medium text-gray-700 mb-1">
								Description
							</label>
							<textarea 
								id="Pelancongan-category-description"
								bind:value={PelanconganCategoryForm.description}
								rows="3"
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
								placeholder="Masukkan Description Trip Pelancongan..."
							></textarea>
						</div>

						<div class="flex items-center">
							<input 
								type="checkbox" 
								id="Pelancongan-category-active"
								bind:checked={PelanconganCategoryForm.isActive}
								class="rounded border-gray-300 text-[#921E8D] focus:ring-[#921E8D]"
							/>
							<label for="Pelancongan-category-active" class="ml-2 text-sm text-gray-700">
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
				{/if}
				</div>
			</div>

			<!-- Daftar Kategori -->
			<div class="card-primary">
				<div class="p-3 sm:p-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">
						Kategori dalam {selectedMusim.seasonName}
					</h3>
					<div class="space-y-3">
						{#each currentCategories as category}
							<div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
								<div class="flex justify-between items-start">
									<div class="flex-1">
										<div class="flex items-center space-x-2 mb-2">
											<h4 class="font-medium text-gray-900">{category.name}</h4>
											<button 
												on:click={() => toggleCategoryActive(category.id)}
												class="inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer {category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} transition-opacity"
											>
												{category.isActive ? 'Aktif' : 'Nonaktif'}
											</button>
										</div>
										{#if selectedMusim.type === 'umrah'}
											<p class="text-sm text-gray-600 mb-2">{category.days} hari</p>
										{/if}
										
										<!-- Pricing Display -->
										{#if selectedMusim.type === 'umrah' && category.pricing}
											<div class="bg-primary-100 rounded-lg p-3 mb-2 border border-primary-200">
												<h5 class="text-xs font-semibold text-[#921E8D] mb-2">Harga Kamar:</h5>
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
										{:else if selectedMusim.type === 'Pelancongan'}
											<div class="bg-primary-100 rounded-lg p-3 mb-2 border border-primary-200">
												<div class="flex justify-between items-center mb-2">
													<h5 class="text-xs font-semibold text-[#921E8D]">Destinasi:</h5>
													<span class="text-xs font-medium text-[#921E8D]">{category.destination}</span>
												</div>
												<div class="flex justify-between items-center mb-2">
													<h5 class="text-xs font-semibold text-[#921E8D]">Tempoh:</h5>
													<span class="text-xs text-[#921E8D]">{formatDate(category.startDate)} - {formatDate(category.endDate)}</span>
												</div>
												{#if category.price}
													<div class="flex justify-between items-center">
														<h5 class="text-xs font-semibold text-[#921E8D]">Harga:</h5>
														<span class="text-sm font-medium text-[#921E8D]">{formatPrice(category.price)} / orang</span>
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
										class="text-red-600 hover:text-red-800 ml-2 transition-colors"
										aria-label="Hapus kategori"
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
								<p class="mt-2 text-sm">Belum ada kategori dalam musim ini</p>
								<p class="text-xs">Tambahkan kategori menggunakan form di sebelah kiri</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

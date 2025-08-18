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

	// Data season Umrah yang sudah dibuat
	let umrahSeasons = [
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
			branch: 'Bandung',
			seasonName: 'Syawal 2024',
			startDate: '2024-04-15',
			endDate: '2024-06-15',
			status: 'Active'
		}
	];

	// Selected season
	let selectedSeason = null;

	// Data kategori untuk setiap season
	let umrahCategories = [
		{
			id: 1,
			seasonId: 1,
			name: 'Premium',
			isActive: true,
			description: 'Paket Premium dengan hotel bintang 5',
			days: 15,
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
			pricing: {
				double: 20000000,
				triple: 18000000,
				quadruple: 16000000,
				quintuple: 15000000
			}
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

	// Functions untuk kategori
	function submitUmrahCategory() {
		if (umrahCategoryForm.name && umrahCategoryForm.days > 0) {
			const newCategory = {
				id: umrahCategories.length + 1,
				seasonId: selectedSeason.id,
				...umrahCategoryForm
			};
			umrahCategories = [...umrahCategories, newCategory];
			
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

	function deleteCategory(id) {
		if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
			umrahCategories = umrahCategories.filter(item => item.id !== id);
		}
	}

	function toggleCategoryActive(id) {
		umrahCategories = umrahCategories.map(item => {
			if (item.id === id) {
				return { ...item, isActive: !item.isActive };
			}
			return item;
		});
	}

	// Get categories for selected season
	$: currentCategories = selectedSeason ? umrahCategories.filter(cat => cat.seasonId === selectedSeason.id) : [];

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
	<title>Input Umrah - Rayhar Travel Admin</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">
					{#if selectedSeason}
						Kelola Kategori Umrah - {selectedSeason.seasonName}
					{:else}
						Pilih Season Umrah & Kelola Kategori
					{/if}
				</h1>
				<p class="text-gray-600 mt-1">
					{#if selectedSeason}
						Tambah dan kelola kategori untuk season Umrah yang dipilih
					{:else}
						Pilih season Umrah dari dropdown untuk mengelola kategori
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
					Kelola Season Umrah
				</a>
			{/if}
		</div>
	</div>

	{#if !selectedSeason}
		<!-- Step 1: Pilih Season Umrah -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Dropdown Pilih Season -->
			<div class="card">
				<div class="flex items-center mb-6">
					<div class="p-2 bg-purple-100 rounded-lg mr-3">
						<Icon name="calendar" size="20" color="#622369" />
					</div>
					<h2 class="text-xl font-semibold text-gray-900">Pilih Season Umrah</h2>
				</div>

				<div class="space-y-4">
					<div>
						<label for="season-select" class="block text-sm font-medium text-gray-700 mb-1">
							Pilih Season Umrah yang Tersedia *
						</label>
						<select 
							id="season-select"
							on:change={(e) => {
								const seasonId = parseInt(e.target.value);
								if (seasonId) {
									selectedSeason = umrahSeasons.find(s => s.id === seasonId);
								}
							}}
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
						>
							<option value="">-- Pilih Season Umrah --</option>
							{#each umrahSeasons as season}
								<option value={season.id}>
									{season.seasonName} ({season.branch})
								</option>
							{/each}
						</select>
					</div>

					<div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
						<div class="flex items-start">
							<Icon name="eye" size="16" color="#622369" />
							<div class="ml-2">
								<h4 class="text-sm font-medium text-purple-800">Info</h4>
								<p class="text-sm text-purple-700 mt-1">Pilih season Umrah untuk mulai mengelola kategori di dalamnya. Jika belum ada season, buat terlebih dahulu di halaman "Kelola Season Umrah".</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Info Season -->
			<div class="card">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">Season Umrah yang Tersedia</h3>
				<div class="space-y-3 max-h-80 overflow-y-auto">
					{#each umrahSeasons as season}
						<div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
							<div class="flex justify-between items-start">
								<div class="flex-1">
									<div class="flex items-center space-x-2 mb-2">
										<h4 class="font-medium text-gray-900">{season.seasonName}</h4>
										<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
											Umrah
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
		<!-- Step 2: Umrah Category Management -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Form Input Kategori Umrah -->
			<div class="card">
				<div class="flex items-center mb-6">
					<div class="p-2 bg-purple-100 rounded-lg mr-3">
						<Icon name="map-pin" size="20" color="#622369" />
					</div>
					<h2 class="text-xl font-semibold text-gray-900">
						Tambah Kategori Umrah
					</h2>
				</div>

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
						<h4 class="text-sm font-semibold text-purple-900 mb-3">Harga Per Tipe</h4>
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
									<p class="text-sm text-gray-600 mb-2">{category.days} hari</p>
									
									<!-- Pricing Display -->
									{#if category.pricing}
										<div class="bg-purple-50 rounded-lg p-3 mb-2">
											<h5 class="text-xs font-semibold text-purple-900 mb-2">Harga Per Tipe:</h5>
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

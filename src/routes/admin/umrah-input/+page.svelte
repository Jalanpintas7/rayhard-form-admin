<script>
	import Icon from '../../../lib/icons.svelte';
	import PageHeader from '../../../lib/components/PageHeader.svelte';
	import FormCard from '../../../lib/components/FormCard.svelte';
	import Button from '../../../lib/components/Button.svelte';
	import Input from '../../../lib/components/Input.svelte';
	import Badge from '../../../lib/components/Badge.svelte';
	import DataCard from '../../../lib/components/DataCard.svelte';

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
	let umrahMusims = [
		{
			id: 1,
			branch: 'Kuala Lumpur',
			seasonName: 'Ramadan 2025',
			startDate: '2025-03-01',
			endDate: '2025-04-30',
			status: 'Active'
		},
		{
			id: 2,
			branch: 'Shah Alam',
			seasonName: 'Syawal 2025',
			startDate: '2025-04-15',
			endDate: '2025-06-15',
			status: 'Active'
		}
	];

	// Selected season
	let selectedMusim = null;

	// Data kategori untuk setiap season
	let umrahCategories = [
		{
			id: 1,
			seasonId: 1,
			name: 'Premium',
			isActive: true,
			description: 'Pakej Premium dengan hotel bintang 5',
			days: 15,
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
			pricing: {
				double: 5800,
				triple: 5220,
				quadruple: 4640,
				quintuple: 4350
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
				seasonId: selectedMusim.id,
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
			alert('Mohon lengkapi nama kategori dan Tempoh!');
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
	$: currentCategories = selectedMusim ? umrahCategories.filter(cat => cat.seasonId === selectedMusim.id) : [];

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
	<title>Input Umrah - Rayhar Travel Admin</title>
</svelte:head>

<div>
	<!-- Page Header -->
	<PageHeader 
		title={selectedMusim ? `Management Kategori Umrah - ${selectedMusim.seasonName}` : 'Pilih Musim Umrah & Management Kategori'}
		subtitle={selectedMusim ? 'Tambah dan Management kategori untuk season Umrah yang dipilih' : 'Pilih season Umrah dari dropdown untuk mengelola kategori'}
	/>

	<!-- Action Buttons -->
	<div class="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
		{#if selectedMusim}
			<Button variant="outline" on:click={() => selectedMusim = null}>
				← Kembali ke Pilih Musim
			</Button>
		{:else}
			<Button variant="primary" href="/admin/seasons">
				Management Musim Umrah
			</Button>
		{/if}
	</div>

	{#if !selectedMusim}
		<!-- Step 1: Pilih Musim Umrah -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
			<!-- Dropdown Pilih Musim -->
			<FormCard 
				title="Pilih Musim Umrah"
				subtitle="Pilih musim Umrah untuk mula menguruskan kategori di dalamnya"
			>
				<div class="space-y-4">
					<div>
						<label for="season-select" class="block text-sm font-medium text-gray-700 mb-2">
							Pilih Musim Umrah yang Tersedia *
						</label>
						<select 
							id="season-select"
							on:change={(e) => {
								const seasonId = parseInt(e.target.value);
								if (seasonId) {
									selectedMusim = umrahMusims.find(s => s.id === seasonId);
								}
							}}
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
						>
							<option value="">-- Pilih Musim Umrah --</option>
							{#each umrahMusims as season}
								<option value={season.id}>
									{season.seasonName} ({season.branch})
								</option>
							{/each}
						</select>
					</div>

					<div class="bg-primary-100 border border-primary-200 rounded-lg p-4">
						<Icon name="eye" size="16" color="#921E8D" />
						<h4 class="text-sm font-medium text-[#921E8D]">Info</h4>
						<p class="text-sm text-[#921E8D] mt-1">Pilih musim Umrah untuk mula menguruskan kategori di dalamnya. Jika musim belum wujud, sila buat terlebih dahulu di halaman 'Pengurusan Musim Umrah'.</p>
					</div>
				</div>
			</FormCard>

			<!-- Info Musim -->
			<FormCard title="Musim Umrah yang Tersedia">
				<div class="space-y-3 max-h-80 overflow-y-auto">
					{#each umrahMusims as season}
						<div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
							<div class="flex justify-between items-start">
								<div class="flex-1">
									<div class="flex items-center space-x-2 mb-2">
										<h4 class="font-medium text-gray-900">{season.seasonName}</h4>
										<Badge variant="umrah">Umrah</Badge>
									</div>
									<p class="text-sm text-gray-600">{season.branch}</p>
									<p class="text-sm text-gray-600">{formatDate(season.startDate)} - {formatDate(season.endDate)}</p>
								</div>
								<Button 
									variant="primary" 
									size="sm"
									on:click={() => selectedMusim = season}
								>
									Pilih
								</Button>
							</div>
						</div>
					{/each}
				</div>
			</FormCard>
		</div>

	{:else}
		<!-- Step 2: Umrah Category Management -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
			<!-- Form Input Kategori Umrah -->
			<FormCard 
				title="Tambah Kategori Umrah"
				subtitle="Tambah kategori baru untuk season yang dipilih"
			>
				<!-- Form Umrah -->
				<form on:submit|preventDefault={submitUmrahCategory} class="space-y-4">
					<Input
						label="Nama Kategori *"
						bind:value={umrahCategoryForm.name}
						placeholder="Contoh: Premium, Regular, VIP"
						required
						fullWidth
					/>

					<Input
						type="number"
						label="Tempoh (Hari) *"
						bind:value={umrahCategoryForm.days}
						min="1"
						max="365"
						required
						fullWidth
					/>

					<!-- Pricing Section for Umrah -->
					<div class="bg-primary-100 rounded-lg p-4 border border-primary-200">
						<h4 class="text-sm font-semibold text-[#921E8D] mb-3">Harga</h4>
						<div class="grid grid-cols-2 gap-3">
							<Input
								type="number"
								label="Double"
								bind:value={umrahCategoryForm.pricing.double}
								min="0"
								placeholder="0"
							/>
							<Input
								type="number"
								label="Triple"
								bind:value={umrahCategoryForm.pricing.triple}
								min="0"
								placeholder="0"
							/>
							<Input
								type="number"
								label="Quadruple"
								bind:value={umrahCategoryForm.pricing.quadruple}
								min="0"
								placeholder="0"
							/>
							<Input
								type="number"
								label="Quintuple"
								bind:value={umrahCategoryForm.pricing.quintuple}
								min="0"
								placeholder="0"
							/>
						</div>
					</div>

					<div>
						<label for="umrah-category-description" class="block text-sm font-medium text-gray-700 mb-2">
							Description
						</label>
						<textarea 
							id="umrah-category-description"
							bind:value={umrahCategoryForm.description}
							rows="3"
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
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

					<Button 
						type="submit"
						variant="primary"
						fullWidth
					>
						Tambah Kategori Umrah
					</Button>
				</form>
			</FormCard>

			<!-- Daftar Kategori -->
			<FormCard title="Kategori dalam {selectedMusim.seasonName}">
				<div class="space-y-3">
					{#each currentCategories as category}
						<DataCard
							title={category.name}
							subtitle="{category.days} hari"
							icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							actions={[
								{
									title: 'Toggle Status',
									icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
									onClick: () => toggleCategoryActive(category.id)
								},
								{
									title: 'Hapus Kategori',
									icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
									onClick: () => deleteCategory(category.id)
								}
							]}
						>
							<div class="flex items-center space-x-2 mb-3">
								<Badge variant={category.isActive ? 'success' : 'danger'}>
									{category.isActive ? 'Aktif' : 'Nonaktif'}
								</Badge>
							</div>
							
							<!-- Pricing Display -->
							{#if category.pricing}
								<div class="bg-primary-100 rounded-lg p-3 mb-3 border border-primary-200">
									<h5 class="text-xs font-semibold text-[#921E8D] mb-2">Harga:</h5>
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
						</DataCard>
					{/each}

					{#if currentCategories.length === 0}
						<div class="text-center py-8 text-gray-500">
							<Icon name="star" size="48" color="#9ca3af" />
							<p class="mt-2 text-sm">Belum ada kategori dalam season ini</p>
							<p class="text-xs">Tambahkan kategori menggunakan form di sebelah kiri</p>
						</div>
					{/if}
				</div>
			</FormCard>
		</div>
	{/if}
</div>

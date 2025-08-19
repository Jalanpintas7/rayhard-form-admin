<script>
	import Icon from '../../../lib/icons.svelte';
	import Badge from '../../../lib/components/Badge.svelte';
	import Dropdown from '../../../lib/components/Dropdown.svelte';
	
	// Sample data - dalam implementasi nyata, ini akan diambil dari API
	let allCustomers = [
		{
			id: 1,
			name: 'Ahmad Razak',
			email: 'ahmad.razak@email.com',
			phone: '+60123456789',
			type: 'Umrah',
			destination: 'Makkah - Madinah',
			status: 'Confirmed',
			date: '2024-01-15',
			cawangan: 'Kuala Lumpur',
			package: 'Umrah Premium 14 Hari',
			price: 8500
		},
		{
			id: 2,
			name: 'Siti Aminah',
			email: 'siti.aminah@email.com',
			phone: '+60198765432',
			type: 'Pelancongan',
			destination: 'Istanbul - Cappadocia',
			status: 'Pending',
			date: '2024-01-14',
			cawangan: 'Johor Bahru',
			package: 'Turkey Explorer 7 Hari',
			price: 4200
		},
		{
			id: 3,
			name: 'Muhammad Ali',
			email: 'muhammad.ali@email.com',
			phone: '+60187654321',
			type: 'Umrah',
			destination: 'Makkah - Madinah',
			status: 'Confirmed',
			date: '2024-01-13',
			cawangan: 'Penang',
			package: 'Umrah Ekonomi 10 Hari',
			price: 6800
		},
		{
			id: 4,
			name: 'Fatimah Zahra',
			email: 'fatimah.zahra@email.com',
			phone: '+60176543210',
			type: 'Pelancongan',
			destination: 'Dubai - Abu Dhabi',
			status: 'Cancelled',
			date: '2024-01-12',
			cawangan: 'Kuala Lumpur',
			package: 'UAE Luxury 5 Hari',
			price: 3500
		},
		{
			id: 5,
			name: 'Hassan Ibrahim',
			email: 'hassan.ibrahim@email.com',
			phone: '+60165432109',
			type: 'Umrah',
			destination: 'Makkah - Madinah',
			status: 'Pending',
			date: '2024-01-11',
			cawangan: 'Kota Kinabalu',
			package: 'Umrah Plus 12 Hari',
			price: 7200
		}
	];
	
	// Filter states
	let searchTerm = '';
	let selectedCawangan = '';
	let selectedType = '';
	let selectedStatus = '';
	let dateFrom = '';
	let dateTo = '';
	
	// Available options
	const cawanganOptions = [
		{ value: '', label: 'Semua Cawangan' },
		{ value: 'Kuala Lumpur', label: 'Kuala Lumpur' },
		{ value: 'Johor Bahru', label: 'Johor Bahru' },
		{ value: 'Penang', label: 'Penang' },
		{ value: 'Kota Kinabalu', label: 'Kota Kinabalu' },
		{ value: 'Kuching', label: 'Kuching' }
	];
	const typeOptions = [
		{ value: '', label: 'Semua Tipe' },
		{ value: 'Umrah', label: 'Umrah' },
		{ value: 'Pelancongan', label: 'Pelancongan' }
	];
	const statusOptions = [
		{ value: '', label: 'Semua Status' },
		{ value: 'Confirmed', label: 'Confirmed' },
		{ value: 'Pending', label: 'Pending' },
		{ value: 'Cancelled', label: 'Cancelled' }
	];
	
	// Filtered customers
	$: filteredCustomers = allCustomers.filter(customer => {
		const matchesSearch = !searchTerm || 
			customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			customer.destination.toLowerCase().includes(searchTerm.toLowerCase());
		
		const matchesCawangan = !selectedCawangan || customer.cawangan === selectedCawangan;
		const matchesType = !selectedType || customer.type === selectedType;
		const matchesStatus = !selectedStatus || customer.status === selectedStatus;
		
		const matchesDateRange = (!dateFrom || customer.date >= dateFrom) && 
								 (!dateTo || customer.date <= dateTo);
		
		return matchesSearch && matchesCawangan && matchesType && matchesStatus && matchesDateRange;
	});
	
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
			currency: 'MYR'
		}).format(price);
	}
	
	function clearFilters() {
		searchTerm = '';
		selectedCawangan = '';
		selectedType = '';
		selectedStatus = '';
		dateFrom = '';
		dateTo = '';
	}
	
	function exportData() {
		// Implementasi export data
		alert('Fungsi export akan diimplementasikan');
	}
</script>

<svelte:head>
	<title>Senarai Pelanggan - Rayhar Travel Admin</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Senarai Pelanggan</h1>
				<p class="text-gray-600 mt-2">Pengurusan data pelanggan Rayhar Travel</p>
			</div>
			<div class="flex items-center space-x-3">
				<button 
					on:click={exportData}
					class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
				>
					<Icon name="download" size="16" color="#374151" />
					<span class="ml-2">Export</span>
				</button>
				<div class="text-sm text-gray-500">
					<span class="font-medium">{filteredCustomers.length}</span> daripada <span class="font-medium">{allCustomers.length}</span> pelanggan
				</div>
			</div>
		</div>
	</div>

	<!-- Filters -->
	<div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
		<div class="p-6">
			<div class="flex items-center justify-between mb-4">
				<h3 class="text-lg font-semibold text-gray-900">Penapis</h3>
				<button 
					on:click={clearFilters}
					class="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
				>
					Kosongkan Penapis
				</button>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
				<!-- Search -->
				<div class="xl:col-span-2">
					<label for="search" class="block text-sm font-medium text-gray-700 mb-2">Cari</label>
					<div class="relative">
						<input 
							type="text" 
							id="search"
							bind:value={searchTerm}
							placeholder="Cari nama, email, atau destinasi..."
							class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
						/>
						<Icon name="search" size="16" color="#9CA3AF" class="absolute left-3 top-1/2 transform -translate-y-1/2" />
					</div>
				</div>
				
				<!-- Cawangan -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Cawangan</label>
					<Dropdown
						options={cawanganOptions}
						bind:value={selectedCawangan}
						placeholder="Semua Cawangan"
						searchable={true}
						size="medium"
						variant="default"
					/>
				</div>
				
				<!-- Type -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Tipe</label>
					<Dropdown
						options={typeOptions}
						bind:value={selectedType}
						placeholder="Semua Tipe"
						searchable={false}
						size="medium"
						variant="default"
					/>
				</div>
				
				<!-- Status -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
					<Dropdown
						options={statusOptions}
						bind:value={selectedStatus}
						placeholder="Semua Status"
						searchable={false}
						size="medium"
						variant="default"
					/>
				</div>
				
				<!-- Date Range -->
				<div>
					<label for="date-from" class="block text-sm font-medium text-gray-700 mb-2">Dari Tarikh</label>
					<input 
						type="date" 
						id="date-from"
						bind:value={dateFrom}
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
					/>
				</div>
				
				<div>
					<label for="date-to" class="block text-sm font-medium text-gray-700 mb-2">Hingga Tarikh</label>
					<input 
						type="date" 
						id="date-to"
						bind:value={dateTo}
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Customer Table -->
	<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
		<div class="p-6">
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-xl font-bold text-gray-900">Senarai Pelanggan</h3>
				<div class="text-sm text-gray-500">
					Menunjukkan {filteredCustomers.length} hasil
				</div>
			</div>
			
			{#if filteredCustomers.length > 0}
				<!-- Desktop Table -->
				<div class="hidden lg:block">
					<div class="overflow-hidden rounded-lg border border-gray-200">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gradient-to-r from-gray-50 to-gray-100">
								<tr>
									<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pelanggan</th>
									<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cawangan</th>
									<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipe</th>
									<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pakej</th>
									<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
									<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Harga</th>
									<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tarikh</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								{#each filteredCustomers as customer}
									<tr class="hover:bg-gray-50 transition-all duration-200">
										<td class="px-6 py-4">
											<div class="flex items-center space-x-4">
												<div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-[#AC2EAC] flex items-center justify-center shadow-sm">
													<span class="text-white text-sm font-semibold">{customer.name.charAt(0)}</span>
												</div>
												<div>
													<div class="text-sm font-semibold text-gray-900">{customer.name}</div>
													<div class="text-xs text-gray-500">{customer.email}</div>
													<div class="text-xs text-gray-500">{customer.phone}</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4">
											<div class="text-sm font-medium text-gray-900">{customer.cawangan}</div>
										</td>
										<td class="px-6 py-4">
											<Badge variant={customer.type === 'Umrah' ? 'umrah' : 'pelancongan'}>
												{customer.type}
											</Badge>
										</td>
										<td class="px-6 py-4">
											<div class="text-sm font-medium text-gray-900">{customer.package}</div>
											<div class="text-xs text-gray-500">{customer.destination}</div>
										</td>
										<td class="px-6 py-4">
											<Badge variant={customer.status === 'Confirmed' ? 'success' : customer.status === 'Pending' ? 'warning' : 'danger'}>
												{customer.status}
											</Badge>
										</td>
										<td class="px-6 py-4">
											<div class="text-sm font-semibold text-gray-900">{formatPrice(customer.price)}</div>
										</td>
										<td class="px-6 py-4">
											<div class="text-sm text-gray-600">{formatDate(customer.date)}</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
				
				<!-- Mobile Cards -->
				<div class="lg:hidden space-y-4">
					{#each filteredCustomers as customer}
						<div class="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-200">
							<div class="flex items-start space-x-4">
								<div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-[#AC2EAC] flex items-center justify-center flex-shrink-0 shadow-sm">
									<span class="text-white text-sm font-semibold">{customer.name.charAt(0)}</span>
								</div>
								<div class="flex-1 min-w-0">
									<div class="flex items-start justify-between mb-3">
										<div>
											<h4 class="text-base font-semibold text-gray-900 truncate">{customer.name}</h4>
											<p class="text-sm text-gray-500 truncate mt-1">{customer.email}</p>
											<p class="text-xs text-gray-500">{customer.phone}</p>
										</div>
										<Badge variant={customer.status === 'Confirmed' ? 'success' : customer.status === 'Pending' ? 'warning' : 'danger'}>
											{customer.status}
										</Badge>
									</div>
									<div class="grid grid-cols-2 gap-3 mb-3">
										<div>
											<Badge variant={customer.type === 'Umrah' ? 'umrah' : 'pelancongan'}>
												{customer.type}
											</Badge>
										</div>
										<div class="text-right">
											<div class="text-sm font-semibold text-gray-900">{formatPrice(customer.price)}</div>
										</div>
									</div>
									<div class="bg-gray-50 rounded-lg px-3 py-2 mb-3">
										<p class="text-sm font-medium text-gray-700">{customer.package}</p>
										<p class="text-xs text-gray-500">{customer.destination}</p>
									</div>
									<div class="flex items-center justify-between text-xs text-gray-500">
										<span>{customer.cawangan}</span>
										<span>{formatDate(customer.date)}</span>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<!-- Empty State -->
				<div class="text-center py-12">
					<div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
						<Icon name="users" size="24" color="#9CA3AF" />
					</div>
					<h3 class="text-lg font-medium text-gray-900 mb-2">Tiada pelanggan dijumpai</h3>
					<p class="text-gray-500 mb-6">
						{searchTerm || selectedCawangan || selectedType || selectedStatus || dateFrom || dateTo 
							? 'Cuba ubah kriteria penapis anda.' 
							: 'Belum ada pelanggan yang mendaftar.'}
					</p>
					<button 
						on:click={clearFilters}
						class="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
					>
						Kosongkan Penapis
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
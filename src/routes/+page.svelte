<script>
	import { onMount } from 'svelte';
	import Icon from '$lib/icons.svelte';

	// Data statistik
	let stats = {
		totalCustomers: 1247,
		umrahCustomers: 892,
		outboundCustomers: 355,
		popularDestinations: 8,
		growthRate: 12.5,
		lastMonthGrowth: -2.3
	};

	// Data pelanggan terbaru
	let recentCustomers = [
		{
			id: 1,
			name: "Ahmad Rizki",
			email: "ahmad.rizki@email.com",
			type: "Umrah",
			destination: "Makkah & Madinah",
			status: "Confirmed",
			date: "2024-01-15"
		},
		{
			id: 2,
			name: "Siti Nurhaliza",
			email: "siti.nurhaliza@email.com",
			type: "Outbound",
			destination: "Turki",
			status: "Pending",
			date: "2024-01-14"
		},
		{
			id: 3,
			name: "Muhammad Fadli",
			email: "m.fadli@email.com",
			type: "Umrah",
			destination: "Makkah & Madinah",
			status: "Confirmed",
			date: "2024-01-13"
		},
		{
			id: 4,
			name: "Dewi Sartika",
			email: "dewi.sartika@email.com",
			type: "Outbound",
			destination: "Eropa",
			status: "Confirmed",
			date: "2024-01-12"
		},
		{
			id: 5,
			name: "Budi Santoso",
			email: "budi.santoso@email.com",
			type: "Umrah",
			destination: "Makkah & Madinah",
			status: "Pending",
			date: "2024-01-11"
		}
	];

	// Data destinasi terpopuler
	let popularDestinations = [
		{ name: "Makkah & Madinah", customers: 892, percentage: 71.5, type: "Umrah" },
		{ name: "Turki", customers: 156, percentage: 12.5, type: "Outbound" },
		{ name: "Eropa", customers: 98, percentage: 7.9, type: "Outbound" },
		{ name: "Jepang", customers: 67, percentage: 5.4, type: "Outbound" },
		{ name: "Singapura", customers: 34, percentage: 2.7, type: "Outbound" }
	];

	// Data tren bulanan
	let monthlyTrends = [
		{ month: "Jan", umrah: 45, outbound: 23 },
		{ month: "Feb", umrah: 52, outbound: 28 },
		{ month: "Mar", umrah: 48, outbound: 31 },
		{ month: "Apr", umrah: 61, outbound: 35 },
		{ month: "Mei", umrah: 55, outbound: 42 },
		{ month: "Jun", umrah: 67, outbound: 38 },
		{ month: "Jul", umrah: 73, outbound: 45 },
		{ month: "Ags", umrah: 68, outbound: 52 },
		{ month: "Sep", umrah: 82, outbound: 48 },
		{ month: "Okt", umrah: 76, outbound: 55 },
		{ month: "Nov", umrah: 89, outbound: 62 },
		{ month: "Des", umrah: 95, outbound: 68 }
	];

	function getStatusColor(status) {
		switch(status) {
			case 'Confirmed': return 'bg-green-100 text-green-800';
			case 'Pending': return 'bg-yellow-100 text-yellow-800';
			case 'Cancelled': return 'bg-red-100 text-red-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	}

	function getTypeColor(type) {
		return type === 'Umrah' ? 'bg-purple-100 text-purple-800' : 'bg-indigo-100 text-indigo-800';
	}

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Dashboard - Rayhar Travel</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="bg-white shadow-sm border-b border-gray-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center py-6">
				<div class="flex items-center space-x-4">
					<img src="/logo.png" alt="Rayhar Travel" class="h-12 w-auto" />
					<div>
						<h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
						<p class="text-gray-600 mt-1">Selamat datang di sistem admin</p>
					</div>
				</div>
				<div class="flex items-center space-x-4">
					<div class="text-right">
						<p class="text-sm text-gray-600">Hari ini</p>
						<p class="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
					</div>
					<a href="/admin" class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
						Admin Panel
					</a>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Statistik Cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<!-- Total Pelanggan -->
			<div class="stat-card">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600">Total Pelanggan</p>
						<p class="text-3xl font-bold text-gray-900">{stats.totalCustomers.toLocaleString()}</p>
						<div class="flex items-center mt-2">
							<Icon name="arrow-up-right" size="16" color="#16a34a" />
							<span class="text-sm text-green-600 font-medium">+{stats.growthRate}%</span>
							<span class="text-sm text-gray-500 ml-1">dari bulan lalu</span>
						</div>
					</div>
					<div class="p-3 bg-purple-600 rounded-lg">
						<Icon name="users" size="24" color="white" />
					</div>
				</div>
			</div>

			<!-- Pelanggan Umrah -->
			<div class="stat-card-success">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600">Pelanggan Umrah</p>
						<p class="text-3xl font-bold text-gray-900">{stats.umrahCustomers.toLocaleString()}</p>
						<div class="flex items-center mt-2">
							<Icon name="arrow-up-right" size="16" color="#16a34a" />
							<span class="text-sm text-green-600 font-medium">+8.2%</span>
							<span class="text-sm text-gray-500 ml-1">dari bulan lalu</span>
						</div>
					</div>
					<div class="p-3 bg-green-500 rounded-lg">
						<Icon name="map-pin" size="24" color="white" />
					</div>
				</div>
			</div>

			<!-- Pelanggan Outbound -->
			<div class="stat-card-warning">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600">Pelanggan Outbound</p>
						<p class="text-3xl font-bold text-gray-900">{stats.outboundCustomers.toLocaleString()}</p>
						<div class="flex items-center mt-2">
							<Icon name="arrow-down-right" size="16" color="#dc2626" />
							<span class="text-sm text-red-600 font-medium">{stats.lastMonthGrowth}%</span>
							<span class="text-sm text-gray-500 ml-1">dari bulan lalu</span>
						</div>
					</div>
					<div class="p-3 bg-amber-500 rounded-lg">
						<Icon name="plane" size="24" color="white" />
					</div>
				</div>
			</div>

			<!-- Destinasi Populer -->
			<div class="stat-card-purple">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600">Destinasi Aktif</p>
						<p class="text-3xl font-bold text-gray-900">{stats.popularDestinations}</p>
						<div class="flex items-center mt-2">
							<Icon name="star" size="16" color="#622369" />
							<span class="text-sm text-purple-600 font-medium">Terpopuler</span>
							<span class="text-sm text-gray-500 ml-1">Makkah & Madinah</span>
						</div>
					</div>
					<div class="p-3 bg-purple-600 rounded-lg">
						<Icon name="trending-up" size="24" color="white" />
					</div>
				</div>
			</div>
		</div>

		<!-- Charts dan Data -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
			<!-- Grafik Tren Bulanan -->
			<div class="card">
				<div class="flex items-center justify-between mb-6">
					<h3 class="text-lg font-semibold text-gray-900">Tren Bulanan</h3>
					<div class="flex items-center space-x-4">
						<div class="flex items-center">
							<div class="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
							<span class="text-sm text-gray-600">Umrah</span>
						</div>
						<div class="flex items-center">
							<div class="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
							<span class="text-sm text-gray-600">Outbound</span>
						</div>
					</div>
				</div>
				<div class="relative h-64 bg-gray-50 rounded-lg p-4">
					<div class="h-full flex items-end justify-between space-x-1">
						{#each monthlyTrends as trend}
							<div class="flex flex-col items-center flex-1 h-full">
								<div class="w-full flex flex-col items-center justify-end h-48 space-y-1">
									<!-- Batasi tinggi maksimal menjadi 180px (90% dari 200px) -->
									<div 
										class="bg-purple-600 rounded-sm w-full max-w-8" 
										style="height: {Math.min(trend.umrah * 1.8, 90)}px;"
										title="Umrah: {trend.umrah}"
									></div>
									<div 
										class="bg-indigo-500 rounded-sm w-full max-w-8" 
										style="height: {Math.min(trend.outbound * 1.8, 90)}px;"
										title="Outbound: {trend.outbound}"
									></div>
								</div>
								<span class="text-xs text-gray-500 mt-2 font-medium">{trend.month}</span>
							</div>
						{/each}
					</div>
					<!-- Grid lines untuk panduan visual -->
					<div class="absolute inset-0 pointer-events-none">
						<div class="h-full flex flex-col justify-end p-4">
							{#each [0, 25, 50, 75] as line}
								<div class="border-t border-gray-200 opacity-30" style="margin-bottom: {line === 0 ? 0 : 45}px;"></div>
							{/each}
						</div>
					</div>
				</div>
				<!-- Scale indicator -->
				<div class="flex justify-between text-xs text-gray-400 mt-2 px-4">
					<span>0</span>
					<span>50</span>
					<span>100+</span>
				</div>
			</div>

			<!-- Destinasi Terpopuler -->
			<div class="card">
				<h3 class="text-lg font-semibold text-gray-900 mb-6">Destinasi Terpopuler</h3>
				<div class="space-y-4">
					{#each popularDestinations as destination}
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-3">
								<div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
									<Icon name="map-pin" size="20" color="white" />
								</div>
								<div>
									<p class="font-medium text-gray-900">{destination.name}</p>
									<p class="text-sm text-gray-500">{destination.type}</p>
								</div>
							</div>
							<div class="text-right">
								<p class="font-semibold text-gray-900">{destination.customers}</p>
								<p class="text-sm text-gray-500">{destination.percentage}%</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Tabel Pelanggan Terbaru -->
		<div class="card">
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-lg font-semibold text-gray-900">Pelanggan Terbaru</h3>
				<button class="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center">
					Lihat Semua
					<Icon name="arrow-up-right" size="16" color="#622369" />
				</button>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destinasi</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each recentCustomers as customer}
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
											<span class="text-white text-sm font-medium">{customer.name.charAt(0)}</span>
										</div>
										<div class="ml-4">
											<div class="text-sm font-medium text-gray-900">{customer.name}</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {getTypeColor(customer.type)}">
										{customer.type}
									</span>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.destination}</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {getStatusColor(customer.status)}">
										{customer.status}
									</span>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(customer.date)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</main>
</div>

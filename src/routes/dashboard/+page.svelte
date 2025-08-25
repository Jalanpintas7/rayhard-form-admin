<script>
	import { onMount } from 'svelte';
	import Icon from '$lib/icons.svelte';
	import TopSalesCard from '$lib/components/TopSalesCard.svelte';
	import TopSalesTable from '$lib/components/TopSalesTable.svelte';
	import DashboardStats from '$lib/components/DashboardStats.svelte';
	import SuperAdminDashboardStats from '$lib/components/SuperAdminDashboardStats.svelte';
	import PopularDestinations from '$lib/components/PopularDestinations.svelte';
	import RecentCustomers from '$lib/components/RecentCustomers.svelte';
	import { logout, userRole, userBranch } from '$lib/stores/auth.js';

	// Data statistik
	let stats = {
		totalCustomers: 1247,
		umrahCustomers: 892,
		PelanconganCustomers: 355,
		popularDestinations: 8,
		growthRate: 12.5,
		lastMonthGrowth: -2.3
	};





	// Data Trend bulanan
	let monthlyTrendds = [
		{ month: "Jan", umrah: 45, Pelancongan: 23 },
		{ month: "Feb", umrah: 52, Pelancongan: 28 },
		{ month: "Mar", umrah: 48, Pelancongan: 31 },
		{ month: "Apr", umrah: 61, Pelancongan: 35 },
		{ month: "Mei", umrah: 55, Pelancongan: 42 },
		{ month: "Jun", umrah: 67, Pelancongan: 38 },
		{ month: "Jul", umrah: 73, Pelancongan: 45 },
		{ month: "Ags", umrah: 68, Pelancongan: 52 },
		{ month: "Sep", umrah: 82, Pelancongan: 48 },
		{ month: "Okt", umrah: 76, Pelancongan: 55 },
		{ month: "Nov", umrah: 89, Pelancongan: 62 },
		{ month: "Des", umrah: 95, Pelancongan: 68 }
	];

	// Data Top Sales Consultant
	let topSalesConsultants = [
		{ 
			name: "Farhan", 
			percentage: 90, 
			avatar: "👨‍💼",
			avatarBg: "bg-teal-500",
			stream: "stream A"
		},
		{ 
			name: "Farhan", 
			percentage: 80, 
			avatar: "👨‍💼", 
			avatarBg: "bg-teal-500",
			stream: "stream B"
		},
		{ 
			name: "Farhan", 
			percentage: 80, 
			avatar: "👩‍💼", 
			avatarBg: "bg-red-500",
			stream: "stream C"
		}
	];

	// Variables untuk role dan branch
	let currentRole = '';
	let currentBranch = null;

	// Subscribe ke stores
	userRole.subscribe(role => {
		currentRole = role || '';
	});

	userBranch.subscribe(branch => {
		currentBranch = branch || null;
	});

	// Handle logout
	function handleLogout() {
		if (confirm('Adakah anda pasti mahu log keluar?')) {
			logout();
		}
	}
	
	// Redirect ke admin panel jika super admin
	function redirectToAdminPanel() {
		if (currentRole === 'super_admin') {
			window.location.href = '/admin';
		}
	}
	
	// Check role untuk menentukan apakah bisa akses admin panel
	function canAccessAdminPanel() {
		return currentRole === 'super_admin';
	}
	
	// Get role display name
	function getRoleDisplayName() {
		switch(currentRole) {
			case 'super_admin':
				return 'Super Admin';
			case 'admin_branch':
				return 'Admin Branch';
			default:
				return 'User';
		}
	}

	function getStatusColor(status) {
		switch(status) {
			case 'Confirmed': return 'bg-green-100 text-green-800';
			case 'Pending': return 'bg-secondary-100 text-[#9A8F00]';
			case 'Cancelled': return 'bg-red-100 text-red-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	}


</script>

<svelte:head>
	<title>Dashboard - Rayhar Travel Admin</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="bg-white shadow-sm border-b border-gray-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center py-6">
				<div class="flex items-center space-x-4">
					<img src="/favicon.svg" alt="Rayhar Travel" class="h-14 w-auto" />
					<div class="hidden sm:block">
						<h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
						<p class="text-gray-600 mt-1">
							Selamat datang di sistem admin
							{#if currentBranch}
								- {currentBranch.name}
							{/if}
						</p>
					</div>
				</div>
				<div class="flex items-center space-x-4">
					<div class="text-right hidden sm:block">
						<p class="text-sm text-gray-600">Hari ini</p>
						<p class="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString('ms-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
					</div>
					<div class="flex items-center space-x-3">
						<!-- Role Badge -->
						<div class="px-3 py-1 rounded-full text-sm font-medium {currentRole === 'super_admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}">
							{getRoleDisplayName()}
						</div>
						
						<!-- Admin Panel Button - hanya untuk super admin -->
						{#if canAccessAdminPanel()}
							<button 
								on:click={redirectToAdminPanel}
								class="btn-primary inline-flex items-center gap-2"
							>
								<span>Admin Panel</span>
								<Icon name="arrow-up-right" size="16" color="white" />
							</button>
						{/if}
						
						<button 
							on:click={handleLogout}
							class="btn-secondary inline-flex items-center gap-2"
						>
							<span>Log Keluar</span>
							<Icon name="log-out" size="16" color="#374151" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Statistik Cards -->
		{#if currentRole === 'super_admin'}
			<!-- Dashboard untuk Super Admin - menampilkan semua data -->
			<SuperAdminDashboardStats />
		{:else if $userBranch?.id}
			<!-- Dashboard untuk Admin Branch - menampilkan data berdasarkan branch -->
			<DashboardStats branchId={$userBranch.id} />
		{:else}
			<div class="text-center py-8">
				<div class="text-red-600 mb-4">
					<Icon name="alert-circle" size="48" color="#dc2626" />
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Branch Tidak Ditemukan</h3>
				<p class="text-gray-600">User ini tidak memiliki akses ke branch tertentu.</p>
			</div>
		{/if}

		<!-- Charts dan Data -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
			<!-- Grafik Top Sales Consultant -->
			<TopSalesCard />

			<!-- Destinasi Popular -->
			{#if currentRole === 'super_admin'}
				<PopularDestinations />
			{:else}
				<PopularDestinations branchId={$userBranch?.id} />
			{/if}
		</div>

		<!-- Top Sales Consultant Table -->
		<TopSalesTable />

		<!-- Tabel Pelanggan Terbaru -->
		{#if currentRole === 'super_admin'}
			<RecentCustomers />
		{:else}
			<RecentCustomers branchId={$userBranch?.id} />
		{/if}
	</main>
</div>

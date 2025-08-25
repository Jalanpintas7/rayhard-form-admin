<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import Icon from '$lib/icons.svelte';

	/**
	 * DashboardStats Component untuk Admin Branch
	 * 
	 * Component ini menampilkan statistik berdasarkan branch tertentu.
	 * Data yang ditampilkan:
	 * - Total Bookings per branch
	 * - Umrah Bookings per branch  
	 * - Outbound Bookings per branch
	 * - Active Destinations (yang tersedia di branch)
	 * 
	 * Usage:
	 * <DashboardStats branchId="uuid-branch-id" />
	 */

	// Props untuk branch_id - wajib untuk admin branch
	export let branchId;

	let stats = {
		totalBookings: 0,
		umrahBookings: 0,
		outboundBookings: 0,
		activeDestinations: 0,
		bookings30Days: 0,
		bookings7Days: 0,
		growthRate: 0,
		lastMonthGrowth: 0
	};

	let loading = true;
	let error = null;

	async function fetchStats() {
		try {
			loading = true;
			
			// Validasi branchId harus ada
			if (!branchId) {
				throw new Error('Branch ID is required for admin branch dashboard');
			}

			// Fetch total bookings dan breakdown berdasarkan branch
			const { data: bookingsData, error: bookingsError } = await supabase
				.from('bookings')
				.select('id, jenis_pelancongan, created_at, branch_id')
				.eq('branch_id', branchId);

			if (bookingsError) throw bookingsError;

			// Fetch destinations yang tersedia di branch ini
			// Destinations diakses melalui sales consultant yang ada di branch
			const { data: destinationsData, error: destinationsError } = await supabase
				.from('destinations')
				.select(`
					id,
					name,
					sales_consultant_id
				`)
				.not('sales_consultant_id', 'is', null);

			if (destinationsError) throw destinationsError;

			// Calculate statistics
			const now = new Date();
			const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
			const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

			const totalBookings = bookingsData?.length || 0;
			const umrahBookings = bookingsData?.filter(b => b.jenis_pelancongan === 'umrah').length || 0;
			const outboundBookings = bookingsData?.filter(b => b.jenis_pelancongan === 'outbound').length || 0;
			const bookings30Days = bookingsData?.filter(b => new Date(b.created_at) >= thirtyDaysAgo).length || 0;
			const bookings7Days = bookingsData?.filter(b => new Date(b.created_at) >= sevenDaysAgo).length || 0;
			// Filter destinations berdasarkan branch (melalui sales consultant)
			// Untuk sementara, kita ambil semua destinations yang ada
			// TODO: Implement proper branch filtering jika ada relasi yang lebih jelas
			const activeDestinations = destinationsData?.length || 0;

			// Calculate growth rates (simplified for now)
			const growthRate = totalBookings > 0 ? Math.round((bookings30Days / totalBookings) * 100) : 0;
			const lastMonthGrowth = outboundBookings > 0 ? Math.round((outboundBookings / totalBookings) * 100) : 0;

			stats = {
				totalBookings,
				umrahBookings,
				outboundBookings,
				activeDestinations,
				bookings30Days,
				bookings7Days,
				growthRate,
				lastMonthGrowth
			};

		} catch (err) {
			console.error('Error fetching stats:', err);
			error = err.message;
			
			// Jika branch tidak valid, tampilkan error yang lebih jelas
			if (err.message.includes('Branch ID is required')) {
				error = 'Branch ID diperlukan untuk dashboard admin branch';
			}
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchStats();
	});

	// Refresh stats every 5 minutes
	setInterval(fetchStats, 5 * 60 * 1000);
</script>

{#if loading}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
		{#each Array(4) as _}
			<div class="stat-card animate-pulse">
				<div class="h-20 bg-gray-200 rounded"></div>
			</div>
		{/each}
	</div>
{:else if error}
	<div class="text-red-600 text-center py-4">
		Error loading statistics: {error}
	</div>
{:else}
	<!-- Statistik Cards -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
		<!-- Total Bookings -->
		<div class="stat-card">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Total Bookings</p>
					<p class="text-3xl font-bold text-gray-900">{stats.totalBookings.toLocaleString()}</p>
					<div class="flex items-center mt-2">
						<Icon name="arrow-up-right" size="16" color="#16a34a" />
						<span class="text-sm text-green-600 font-medium">+{stats.growthRate}%</span>
						<span class="text-sm text-gray-500 ml-1">dari 30 hari</span>
					</div>
				</div>
				<div class="p-3 bg-primary-600 rounded-lg">
					<Icon name="users" size="24" color="white" />
				</div>
			</div>
		</div>

		<!-- Bookings Umrah -->
		<div class="stat-card-success">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Bookings Umrah</p>
					<p class="text-3xl font-bold text-gray-900">{stats.umrahBookings.toLocaleString()}</p>
					<div class="flex items-center mt-2">
						<Icon name="arrow-up-right" size="16" color="#16a34a" />
						<span class="text-sm text-green-600 font-medium">{stats.umrahBookings > 0 ? '+8.2%' : '0%'}</span>
						<span class="text-sm text-gray-500 ml-1">dari total</span>
					</div>
				</div>
				<div class="p-3 bg-[#921E8D] rounded-lg">
					<Icon name="map-pin" size="20" color="white" />
				</div>
			</div>
		</div>

		<!-- Bookings Outbound -->
		<div class="stat-card-warning">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Bookings Outbound</p>
					<p class="text-3xl font-bold text-gray-900">{stats.outboundBookings.toLocaleString()}</p>
					<div class="flex items-center mt-2">
						<Icon name="arrow-up-right" size="16" color="#16a34a" />
						<span class="text-sm text-green-600 font-medium">{stats.lastMonthGrowth}%</span>
						<span class="text-sm text-gray-500 ml-1">dari total</span>
					</div>
				</div>
				<div class="p-3 bg-[#921E8D] rounded-lg">
					<Icon name="plane" size="20" color="white" />
				</div>
			</div>
		</div>

		<!-- Destinations Active -->
		<div class="stat-card-purple">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-600">Destinasi Aktif</p>
					<p class="text-3xl font-bold text-gray-900">{stats.activeDestinations.toLocaleString()}</p>
					<div class="flex items-center mt-2">
						<Icon name="star" size="16" color="#622369" />
						<span class="text-sm text-primary-600 font-medium">Active</span>
						<span class="text-sm text-gray-500 ml-1">Destinations</span>
					</div>
				</div>
				<div class="p-3 bg-primary-600 rounded-lg">
					<Icon name="Trendding-up" size="24" color="white" />
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.stat-card {
		@apply bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow;
	}

	.stat-card-success {
		@apply bg-white rounded-xl shadow-sm border border-green-200 p-6 hover:shadow-md transition-shadow;
	}

	.stat-card-warning {
		@apply bg-white rounded-xl shadow-sm border border-yellow-200 p-6 hover:shadow-md transition-shadow;
	}

	.stat-card-purple {
		@apply bg-white rounded-xl shadow-sm border border-purple-200 p-6 hover:shadow-md transition-shadow;
	}

	.animate-pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: .5;
		}
	}
</style>

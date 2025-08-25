<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import Icon from '$lib/icons.svelte';
	import { userRole } from '$lib/stores/auth.js';

	/**
	 * RecentCustomers Component untuk Admin Branch dan Super Admin
	 * 
	 * Component ini menampilkan pelanggan terbaru:
	 * - Untuk Admin Branch: berdasarkan branch tertentu
	 * - Untuk Super Admin: dari semua branch
	 * 
	 * Data yang ditampilkan:
	 * - Pelanggan yang baru booking
	 * - Informasi lengkap: nama, email, jenis pelancongan, destinasi, status
	 * - Sorted berdasarkan tanggal booking terbaru
	 * 
	 * Usage:
	 * <RecentCustomers branchId="uuid-branch-id" /> // Admin Branch
	 * <RecentCustomers /> // Super Admin (tanpa branchId)
	 */

	// Props untuk branch_id - opsional untuk super admin
	export let branchId = null;

	let recentCustomers = [];
	let loading = true;
	let error = null;

	async function fetchRecentCustomers() {
		try {
			loading = true;
			
			let query = supabase
				.from('bookings')
				.select(`
					id,
					nama,
					email,
					jenis_pelancongan,
					status,
					created_at,
					destination_id,
					destinations (
						id,
						name
					)
				`)
				.order('created_at', { ascending: false })
				.limit(5);

			// Jika ada branchId, filter berdasarkan branch
			if (branchId) {
				query = query.eq('branch_id', branchId);
			}

			const { data: bookingsData, error: bookingsError } = await query;

			if (bookingsError) throw bookingsError;

			// Transform data untuk display
			const customers = bookingsData?.map(booking => ({
				id: booking.id,
				name: booking.nama || 'Nama tidak tersedia',
				email: booking.email || 'Email tidak tersedia',
				type: booking.jenis_pelancongan === 'umrah' ? 'Umrah' : 'Pelancongan',
				destination: booking.destinations?.name || 'Destinasi tidak tersedia',
				status: booking.status || 'pending',
				date: new Date(booking.created_at).toLocaleDateString('id-ID', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit'
				}),
				statusColor: getStatusColor(booking.status || 'pending')
			})) || [];

			recentCustomers = customers;

		} catch (err) {
			console.error('Error fetching recent customers:', err);
			error = err.message;
		} finally {
			loading = false;
		}
	}

	// Helper function untuk status color
	function getStatusColor(status) {
		switch (status.toLowerCase()) {
			case 'confirmed':
				return 'text-green-600 bg-green-100';
			case 'pending':
				return 'text-yellow-600 bg-yellow-100';
			case 'completed':
				return 'text-blue-600 bg-blue-100';
			case 'cancelled':
				return 'text-red-600 bg-red-100';
			default:
				return 'text-gray-600 bg-gray-100';
		}
	}

	onMount(() => {
		fetchRecentCustomers();
	});

	// Refresh data every 5 minutes
	setInterval(fetchRecentCustomers, 5 * 60 * 1000);
</script>

{#if loading}
	<div class="card-primary">
		<div class="p-6">
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-xl font-bold text-gray-900">
					{#if branchId}
						Pelanggan Terbaru - Branch
					{:else}
						Pelanggan Terbaru - Semua Branch
					{/if}
				</h3>
				<div class="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
			</div>
			<div class="space-y-4">
				{#each Array(5) as _}
					<div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg animate-pulse">
						<div class="flex items-center space-x-3">
							<div class="w-10 h-10 bg-gray-200 rounded-full"></div>
							<div>
								<div class="h-4 bg-gray-200 rounded w-32 mb-2"></div>
								<div class="h-3 bg-gray-200 rounded w-24 mb-1"></div>
								<div class="h-3 bg-gray-200 rounded w-20"></div>
							</div>
						</div>
						<div class="text-right">
							<div class="h-4 bg-gray-200 rounded w-16 mb-1"></div>
							<div class="h-3 bg-gray-200 rounded w-12"></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{:else if error}
	<div class="card-primary">
		<div class="p-6">
			<div class="text-red-600 text-center py-8">
				<Icon name="alert-circle" size="48" color="#dc2626" class="mx-auto mb-4" />
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
				<p class="text-gray-600">{error}</p>
			</div>
		</div>
	</div>
{:else if recentCustomers.length === 0}
	<div class="card-primary">
		<div class="p-6">
			<div class="flex flex-col items-center justify-center py-8">
				<Icon name="users" size="48" color="#6b7280" class="mb-4" />
				<h3 class="text-lg font-semibold text-gray-900 mb-2 text-center">Belum Ada Pelanggan</h3>
				<p class="text-gray-600 text-center">
					{#if branchId}
						Belum ada pelanggan yang booking di branch ini.
					{:else}
						Belum ada pelanggan yang booking di sistem.
					{/if}
				</p>
			</div>
		</div>
	</div>
{:else}
	<!-- Tabel Pelanggan Terbaru -->
	<div class="card-primary">
		<div class="p-6">
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-xl font-bold text-gray-900">
					{#if branchId}
						Pelanggan Terbaru - Branch
					{:else}
						Pelanggan Terbaru - Semua Branch
					{/if}
				</h3>
				{#if $userRole === 'admin_branch' || $userRole === 'super_admin'}
					<a href="/admin/customers" class="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center transition-colors">
						Lihat Semua
						<Icon name="arrow-right" size="16" color="currentColor" class="ml-1" />
					</a>
				{/if}
			</div>
			<div class="space-y-4">
				{#each recentCustomers as customer}
					<div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
						<div class="flex items-center space-x-3">
							<div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-[#AC2EAC] flex items-center justify-center">
								<span class="text-white font-semibold text-sm">
									{customer.name.charAt(0).toUpperCase()}
								</span>
							</div>
							<div>
								<p class="font-medium text-gray-900">{customer.name}</p>
								<p class="text-sm text-gray-500">{customer.email}</p>
								<div class="flex items-center space-x-2 mt-1">
									<span class="text-xs px-2 py-1 rounded-full {customer.statusColor}">
										{customer.status}
									</span>
									<span class="text-xs text-gray-500">•</span>
									<span class="text-xs text-gray-500">{customer.type}</span>
								</div>
							</div>
						</div>
						<div class="text-right">
							<p class="font-semibold text-gray-900">{customer.destination}</p>
							<p class="text-xs text-gray-500">{customer.date}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.card-primary {
		@apply bg-white rounded-xl shadow-sm border border-gray-200;
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

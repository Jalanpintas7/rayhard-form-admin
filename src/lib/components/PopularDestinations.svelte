<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import Icon from '$lib/icons.svelte';

	/**
	 * PopularDestinations Component untuk Admin Branch dan Super Admin
	 * 
	 * Component ini menampilkan destinasi popular:
	 * - Untuk Admin Branch: berdasarkan branch tertentu
	 * - Untuk Super Admin: dari semua branch
	 * 
	 * Data yang ditampilkan:
	 * - Destinasi dengan jumlah booking terbanyak
	 * - Breakdown umrah vs outbound per destinasi
	 * - Percentage dari total bookings
	 * 
	 * Usage:
	 * <PopularDestinations branchId="uuid-branch-id" /> // Admin Branch
	 * <PopularDestinations /> // Super Admin (tanpa branchId)
	 */

	// Props untuk branch_id - opsional untuk super admin
	export let branchId = null;

	let popularDestinations = [];
	let loading = true;
	let error = null;

	async function fetchPopularDestinations() {
		try {
			loading = true;
			
			let query = supabase
				.from('bookings')
				.select(`
					id,
					jenis_pelancongan,
					destination_id,
					destinations (
						id,
						name
					)
				`)
				.not('destination_id', 'is', null);

			// Jika ada branchId, filter berdasarkan branch
			if (branchId) {
				query = query.eq('branch_id', branchId);
			}

			const { data: bookingsData, error: bookingsError } = await query;

			if (bookingsError) throw bookingsError;

			// Fetch destinations yang tersedia
			const { data: destinationsData, error: destinationsError } = await supabase
				.from('destinations')
				.select('id, name');

			if (destinationsError) throw destinationsError;

			// Calculate popular destinations
			const destinationStats = {};

			// Initialize semua destinations dengan 0
			destinationsData?.forEach(dest => {
				destinationStats[dest.id] = {
					id: dest.id,
					name: dest.name,
					totalBookings: 0,
					umrahBookings: 0,
					outboundBookings: 0,
					percentage: 0
				};
			});

			// Count bookings per destination
			bookingsData?.forEach(booking => {
				if (booking.destination_id && destinationStats[booking.destination_id]) {
					destinationStats[booking.destination_id].totalBookings++;
					
					if (booking.jenis_pelancongan === 'umrah') {
						destinationStats[booking.destination_id].umrahBookings++;
					} else if (booking.jenis_pelancongan === 'outbound') {
						destinationStats[booking.destination_id].outboundBookings++;
					}
				}
			});

			// Calculate percentage dan filter destinations dengan booking > 0
			const totalBookings = bookingsData?.length || 0;
			const destinationsWithBookings = Object.values(destinationStats)
				.filter(dest => dest.totalBookings > 0)
				.map(dest => ({
					...dest,
					percentage: totalBookings > 0 ? Math.round((dest.totalBookings / totalBookings) * 100) : 0
				}))
				.sort((a, b) => b.totalBookings - a.totalBookings)
				.slice(0, 5); // Top 5 destinations

			popularDestinations = destinationsWithBookings;

		} catch (err) {
			console.error('Error fetching popular destinations:', err);
			error = err.message;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchPopularDestinations();
	});

	// Refresh data every 5 minutes
	setInterval(fetchPopularDestinations, 5 * 60 * 1000);
</script>

{#if loading}
	<div class="card-primary">
		<h3 class="text-lg font-semibold text-gray-900 mb-6">
			{#if branchId}
				Destinasi Popular - Branch
			{:else}
				Destinasi Popular - Semua Branch
			{/if}
		</h3>
		<div class="space-y-4">
			{#each Array(5) as _}
				<div class="flex items-center justify-between animate-pulse">
					<div class="flex items-center space-x-3">
						<div class="w-10 h-10 bg-gray-200 rounded-full"></div>
						<div>
							<div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
							<div class="h-3 bg-gray-200 rounded w-16"></div>
						</div>
					</div>
					<div class="text-right">
						<div class="h-4 bg-gray-200 rounded w-8 mb-1"></div>
						<div class="h-3 bg-gray-200 rounded w-12"></div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else if error}
	<div class="card-primary">
		<div class="text-red-600 text-center py-8">
			<Icon name="alert-circle" size="48" color="#dc2626" class="mx-auto mb-4" />
			<h3 class="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
			<p class="text-gray-600">{error}</p>
		</div>
	</div>
{:else if popularDestinations.length === 0}
	<div class="card-primary">
		<div class="flex flex-col items-center justify-center py-8">
			<Icon name="map-pin" size="48" color="#6b7280" class="mb-4" />
			<h3 class="text-lg font-semibold text-gray-900 mb-2 text-center">Belum Ada Data</h3>
			<p class="text-gray-600 text-center">
				{#if branchId}
					Belum ada destinasi yang memiliki booking di branch ini.
				{:else}
					Belum ada destinasi yang memiliki booking di sistem.
				{/if}
			</p>
		</div>
	</div>
{:else}
	<!-- Destinasi Popular -->
	<div class="card-primary">
		<h3 class="text-lg font-semibold text-gray-900 mb-6">
			{#if branchId}
				Destinasi Popular - Branch
			{:else}
				Destinasi Popular - Semua Branch
			{/if}
		</h3>
		<div class="space-y-4">
			{#each popularDestinations as destination}
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-3">
						<div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-[#AC2EAC] flex items-center justify-center">
							<Icon name="map-pin" size="20" color="white" />
						</div>
						<div>
							<p class="font-medium text-gray-900">{destination.name}</p>
							<p class="text-sm text-gray-500">
								{destination.umrahBookings > 0 ? `${destination.umrahBookings} Umrah` : ''}
								{destination.umrahBookings > 0 && destination.outboundBookings > 0 ? ' & ' : ''}
								{destination.outboundBookings > 0 ? `${destination.outboundBookings} Outbound` : ''}
							</p>
						</div>
					</div>
					<div class="text-right">
						<p class="font-semibold text-gray-900">{destination.totalBookings}</p>
						<p class="text-xs text-gray-500">{destination.percentage}%</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.card-primary {
		@apply bg-white rounded-xl shadow-sm border border-gray-200 p-6;
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

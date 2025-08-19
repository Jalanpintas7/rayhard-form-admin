<script>
	import Icon from '../icons.svelte';
	import Badge from './Badge.svelte';
	
	export let customers = [];
	
	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('ms-MY', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
	<div class="p-6">
		<div class="flex items-center justify-between mb-6">
			<div>
				<h3 class="text-xl font-bold text-gray-900">Pelanggan Terbaru</h3>
				<p class="text-sm text-gray-500 mt-1">Senarai pelanggan yang mendaftar baru-baru ini</p>
			</div>
			<a href="/admin/customers" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-[#AC2EAC] text-white text-sm font-medium rounded-lg hover:from-primary-700 hover:to-[#9A1E9A] transition-all duration-200 shadow-sm hover:shadow-md">
				Lihat Semua
				<Icon name="arrow-up-right" size="16" color="white" />
			</a>
		</div>
		
		<!-- Desktop Table -->
		<div class="hidden lg:block">
			<div class="overflow-hidden rounded-lg border border-gray-200">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gradient-to-r from-gray-50 to-gray-100">
						<tr>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pelanggan</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipe</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Destinasi</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
							<th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tarikh</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each customers as customer}
							<tr class="hover:bg-gray-50 transition-all duration-200">
								<td class="px-6 py-4">
									<div class="flex items-center space-x-4">
										<div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-[#AC2EAC] flex items-center justify-center shadow-sm">
											<span class="text-white text-sm font-semibold">{customer.name.charAt(0)}</span>
										</div>
										<div>
											<div class="text-sm font-semibold text-gray-900">{customer.name}</div>
											<div class="text-xs text-gray-500">{customer.email}</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4">
									<Badge variant={customer.type === 'Umrah' ? 'umrah' : 'pelancongan'}>
										{customer.type}
									</Badge>
								</td>
								<td class="px-6 py-4">
									<div class="text-sm font-medium text-gray-900">{customer.destination}</div>
								</td>
								<td class="px-6 py-4">
									<Badge variant={customer.status === 'Confirmed' ? 'success' : customer.status === 'Pending' ? 'warning' : 'danger'}>
										{customer.status}
									</Badge>
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
			{#each customers as customer}
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
								</div>
								<Badge variant={customer.status === 'Confirmed' ? 'success' : customer.status === 'Pending' ? 'warning' : 'danger'}>
									{customer.status}
								</Badge>
							</div>
							<div class="flex items-center justify-between mb-3">
								<Badge variant={customer.type === 'Umrah' ? 'umrah' : 'pelancongan'}>
									{customer.type}
								</Badge>
								<span class="text-xs text-gray-500 font-medium">{formatDate(customer.date)}</span>
							</div>
							<div class="bg-gray-50 rounded-lg px-3 py-2">
								<p class="text-sm font-medium text-gray-700 truncate">{customer.destination}</p>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

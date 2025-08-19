<script>
	import Icon from '../icons.svelte';
	import Badge from './Badge.svelte';
	
	export let customers = [];
	
	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('ms-MY', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<div class="card-primary">
	<div class="p-2 sm:p-5">
		<div class="flex items-center justify-between mb-4 sm:mb-6">
			<h3 class="text-lg font-semibold text-gray-900">Pelanggan Terbaru</h3>
			<button class="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
				Lihat Semua
				<Icon name="arrow-up-right" size="16" color="#921E8D" />
			</button>
		</div>
		
		<!-- Desktop Table -->
		<div class="hidden lg:block overflow-x-auto">
			<table class="min-w-full border border-gray-200 border-collapse">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Nama</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Email</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Tipe</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Destinasi</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Status</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Tanggal</th>
					</tr>
				</thead>
				<tbody class="bg-white">
					{#each customers as customer}
						<tr class="hover:bg-gray-50 transition-colors">
							<td class="px-6 py-4 whitespace-nowrap border border-gray-200">
								<div class="flex items-center">
									<div class="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-[#AC2EAC] flex items-center justify-center">
										<span class="text-white text-sm font-medium">{customer.name.charAt(0)}</span>
									</div>
									<div class="ml-4">
										<div class="text-sm font-medium text-gray-900">{customer.name}</div>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{customer.email}</td>
							<td class="px-6 py-4 whitespace-nowrap border border-gray-200">
								<Badge variant={customer.type === 'Umrah' ? 'umrah' : 'pelancongan'}>
									{customer.type}
								</Badge>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">{customer.destination}</td>
							<td class="px-6 py-4 whitespace-nowrap border border-gray-200">
								<Badge variant={customer.status === 'Confirmed' ? 'success' : customer.status === 'Pending' ? 'warning' : 'danger'}>
									{customer.status}
								</Badge>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{formatDate(customer.date)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		
		<!-- Mobile Cards -->
		<div class="lg:hidden space-y-4">
			{#each customers as customer}
				<div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
					<div class="flex items-start space-x-3">
						<div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-[#AC2EAC] flex items-center justify-center flex-shrink-0">
							<span class="text-white text-sm font-medium">{customer.name.charAt(0)}</span>
						</div>
						<div class="flex-1 min-w-0">
							<div class="flex items-center justify-between mb-2">
								<h4 class="text-sm font-medium text-gray-900 truncate">{customer.name}</h4>
								<Badge variant={customer.status === 'Confirmed' ? 'success' : customer.status === 'Pending' ? 'warning' : 'danger'}>
									{customer.status}
								</Badge>
							</div>
							<p class="text-sm text-gray-500 truncate mb-2">{customer.email}</p>
							<div class="flex items-center justify-between">
								<Badge variant={customer.type === 'Umrah' ? 'umrah' : 'pelancongan'}>
									{customer.type}
								</Badge>
								<span class="text-xs text-gray-500">{formatDate(customer.date)}</span>
							</div>
							<p class="text-sm text-gray-900 mt-2 truncate">{customer.destination}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

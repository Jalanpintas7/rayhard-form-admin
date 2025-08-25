<script>
  import Icon from '../icons.svelte';

  // Data top sales consultant
  let topSalesConsultants = [
    { 
      name: "Farhan Ahmad", 
      stream: "Stream A", 
      percentage: 90, 
      customers: 156, 
      revenue: 468000,
      avatar: "👨‍💼",
      avatarBg: "bg-teal-500"
    },
    { 
      name: "Farhan Rizki", 
      stream: "Stream B", 
      percentage: 80, 
      customers: 142, 
      revenue: 426000,
      avatar: "👨‍💼",
      avatarBg: "bg-teal-500"
    },
    { 
      name: "Farhan Putri", 
      stream: "Stream C", 
      percentage: 80, 
      customers: 138, 
      revenue: 414000,
      avatar: "👩‍💼",
      avatarBg: "bg-red-500"
    },
    { 
      name: "Ahmad Rizal", 
      stream: "Stream D", 
      percentage: 75, 
      customers: 125, 
      revenue: 375000,
      avatar: "👨‍💼",
      avatarBg: "bg-blue-500"
    },
    { 
      name: "Siti Nurhalizah", 
      stream: "Stream E", 
      percentage: 72, 
      customers: 118, 
      revenue: 354000,
      avatar: "👩‍💼",
      avatarBg: "bg-purple-500"
    }
  ];

  function formatCurrency(amount) {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
</script>

<div class="card-primary mb-8">
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-gray-900">Top Sales Consultant</h3>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-500">Bulan ini</span>
        <Icon name="calendar" size="16" color="#6b7280" />
      </div>
    </div>
    
    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Consultant</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stream</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Performance</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customers</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Revenue</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each topSalesConsultants as consultant, index}
            <tr class="hover:bg-gray-50 transition-all duration-200">
              <td class="px-6 py-4">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 {consultant.avatarBg} rounded-full flex items-center justify-center shadow-sm border-2 border-white">
                    <span class="text-white text-sm">{consultant.avatar}</span>
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">{consultant.name}</div>
                    <div class="text-xs text-gray-500">#{index + 1} Top Consultant</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                  {consultant.stream}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <div class="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-gradient-to-r from-primary-600 to-primary-500 h-2 rounded-full" 
                      style="width: {consultant.percentage}%"
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-900">{consultant.percentage}%</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{consultant.customers.toLocaleString()}</div>
                <div class="text-xs text-gray-500">customers</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-semibold text-gray-900">{formatCurrency(consultant.revenue)}</div>
                <div class="text-xs text-gray-500">total revenue</div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

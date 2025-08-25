<script>
  import Icon from '../icons.svelte';

  // Data top sales consultant
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

  // Fungsi untuk mendapatkan warna batang berdasarkan persentase
  function getBarColor(percentage) {
    return 'bg-gradient-to-t from-primary-700 to-primary-500';
  }

  // Fungsi untuk mendapatkan tinggi batang berdasarkan persentase
  function getBarHeight(percentage) {
    return `${percentage}%`;
  }
</script>

<div class="card-primary">
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Top Sales Consultant</h3>
      <div class="flex items-center space-x-2 text-sm text-gray-500">
        <Icon name="trending-up" size="16" color="#16a34a" />
        <span class="text-green-600 font-medium">+12.5%</span>
        <span>dari bulan lalu</span>
      </div>
    </div>
    
    <!-- Chart Container -->
    <div class="relative h-80">
      <!-- Chart Bars -->
      <div class="h-full flex items-end justify-between space-x-2 max-w-md mx-auto">
        {#each topSalesConsultants as consultant, index}
          <div class="flex flex-col items-center h-full flex-1 min-w-0 max-w-20">
            <!-- Stream Label di atas avatar -->
            <div class="mb-2 text-center w-full">
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wide truncate">
                {consultant.stream}
              </p>
            </div>
            
            <!-- Avatar di atas batang -->
            <div class="mb-3 relative">
              <div class="w-12 h-12 {consultant.avatarBg} rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <span class="text-white text-lg">{consultant.avatar}</span>
              </div>
              <!-- Efek glow -->
              <div class="absolute inset-0 {consultant.avatarBg} rounded-full opacity-20 blur-sm scale-110"></div>
            </div>
            
            <!-- Batang Chart -->
            <div class="relative w-full flex-1 flex items-end min-h-0">
              <div 
                class="w-full {getBarColor(consultant.percentage)} rounded-t-lg shadow-lg relative group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
                style="height: {getBarHeight(consultant.percentage)};"
                title="{consultant.name}: {consultant.percentage}%"
              >
                <!-- Persentase di dalam batang -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-white font-bold text-sm drop-shadow-lg">
                    {consultant.percentage}%
                  </span>
                </div>
                
                <!-- Efek hover -->
                <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-t-lg transition-opacity duration-300"></div>
                
                <!-- Efek gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-t-lg"></div>
              </div>
            </div>
            
            <!-- Nama Consultant di bawah -->
            <div class="mt-3 text-center w-full">
              <p class="text-sm font-semibold text-gray-800 truncate">{consultant.name}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

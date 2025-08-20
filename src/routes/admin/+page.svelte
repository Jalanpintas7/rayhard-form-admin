<script>
  import PageHeader from "../../lib/components/PageHeader.svelte";
  import StatCard from "../../lib/components/StatCard.svelte";
  import ChartCard from "../../lib/components/ChartCard.svelte";
  import DestinationCard from "../../lib/components/DestinationCard.svelte";
  import CustomerTable from "../../lib/components/CustomerTable.svelte";

  // Data statistik
  let stats = {
    totalCustomers: 1247,
    umrahCustomers: 892,
    PelanconganCustomers: 355,
    popularDestinations: 8,
    growthRate: 12.5,
    lastMonthGrowth: -2.3,
  };

  // Data pelanggan terbaru
  let recentCustomers = [
    {
      id: 1,
      name: "Ahmad Rizal bin Rahman",
      email: "ahmad.rizal@email.com",
      type: "Umrah",
      destination: "Makkah & Madinah",
      status: "Confirmed",
      date: "2025-09-15",
    },
    {
      id: 2,
      name: "Siti Nurhalizah binti Zulkifli",
      email: "sitinurhalizah@email.com",
      type: "Pelancongan",
      destination: "Turki",
      status: "Pending",
      date: "2025-09-14",
    },
    {
      id: 3,
      name: "Muhammad safe ali bin Azman",
      email: "muhammad.safe@email.com",
      type: "Umrah",
      destination: "Makkah & Madinah",
      status: "Confirmed",
      date: "2025-09-13",
    },
    {
      id: 4,
      name: "Noraini",
      email: "noraini.abdullah@email.com",
      type: "Pelancongan",
      destination: "Eropah",
      status: "Confirmed",
      date: "2025-09-12",
    },
    {
      id: 5,
      name: "safawi",
      email: "safawi@email.com",
      type: "Umrah",
      destination: "Makkah & Madinah",
      status: "Pending",
      date: "2025-09-11",
    },
  ];

  // Data destinasi Popular
  let popularDestinations = [
    {
      name: "Makkah & Madinah",
      customers: 892,
      percentage: 71.5,
      type: "Umrah",
    },
    { name: "Turki", customers: 156, percentage: 12.5, type: "Pelancongan" },
    { name: "Eropah", customers: 98, percentage: 7.9, type: "Pelancongan" },
    { name: "Jepun", customers: 67, percentage: 5.4, type: "Pelancongan" },
    { name: "Singapura", customers: 34, percentage: 2.7, type: "Pelancongan" },
  ];

  // Data tren bulanan
  let monthlyTrends = [
    { month: "Jan", umrah: 45, Pelancongan: 40 },
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
    { month: "Des", umrah: 95, Pelancongan: 68 },
  ];

  // Legend untuk chart
  let chartLegend = [
    { label: "Umrah", color: "bg-primary-600" },
    { label: "Pelancongan", color: "bg-secondary-500" },
  ];
</script>

<svelte:head>
  <title>Admin Dashboard - Rayhar Travel</title>
</svelte:head>

<div>
  <!-- Page Header -->
  <PageHeader
    title="Dashboard"
    subtitle="Selamat datang di Rayhar Travel Admin Panel"
  />

  <!-- Statistik Cards -->
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
  >
    <!-- Total Pelanggan -->
    <StatCard
      title="Total Pelanggan"
      value={stats.totalCustomers}
      growth={stats.growthRate}
      growthText="dari bulan lalu"
      icon="users"
      iconBgColor="bg-gradient-to-r from-primary-600 to-[#AC2EAC]"
      growthColor="text-green-600"
      growthIcon="arrow-up-right"
    />

    <!-- Pelanggan Umrah -->
    <StatCard
      title="Pelanggan Umrah"
      value={stats.umrahCustomers}
      growth={8.2}
      growthText="dari bulan lalu"
      icon="map-pin"
      iconBgColor="bg-gradient-to-r from-primary-600 to-[#AC2EAC]"
      growthColor="text-green-600"
      growthIcon="arrow-up-right"
    />

    <!-- Pelanggan Pelancongan -->
    <StatCard
      title="Pelanggan Pelancongan"
      value={stats.PelanconganCustomers}
      growth={stats.lastMonthGrowth}
      growthText="dari bulan lalu"
      icon="plane"
      iconBgColor="bg-gradient-to-r from-primary-600 to-[#AC2EAC]"
      growthColor="text-red-600"
      growthIcon="arrow-down-right"
    />

    <!-- Destinasi Popular -->
    <StatCard
      title="Destinasi Aktif"
      value={stats.popularDestinations}
      growth={0}
      growthText="Makkah & Madinah"
      icon="trending-up"
      iconBgColor="bg-gradient-to-r from-primary-600 to-[#AC2EAC]"
      growthColor="text-green-600"
      growthIcon="star"
    />
  </div>

  <!-- Charts dan Data -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
    <!-- Grafik Tren Bulanan -->
    <ChartCard
      title="Tren Bulanan"
      legend={chartLegend}
      data={monthlyTrends}
      type="bar"
    />

    <!-- Destinasi Popular -->
    <DestinationCard destinations={popularDestinations} />
  </div>

  <!-- Tabel Pelanggan Terbaru -->
  <CustomerTable customers={recentCustomers} />
</div>

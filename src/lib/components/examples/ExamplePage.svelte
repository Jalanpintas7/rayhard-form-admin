<script>
	import PageHeader from '../PageHeader.svelte';
	import StatCard from '../StatCard.svelte';
	import ChartCard from '../ChartCard.svelte';
	import DestinationCard from '../DestinationCard.svelte';
	import CustomerTable from '../CustomerTable.svelte';
	import FormCard from '../FormCard.svelte';
	import Button from '../Button.svelte';
	import Input from '../Input.svelte';
	import Badge from '../Badge.svelte';
	import DataCard from '../DataCard.svelte';

	// Sample data
	let stats = {
		totalCustomers: 1247,
		umrahCustomers: 892,
		PelanconganCustomers: 355,
		popularDestinations: 8
	};

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
			type: "Pelancongan",
			destination: "Turki",
			status: "Pending",
			date: "2024-01-14"
		}
	];

	let popularDestinations = [
		{ name: "Makkah & Madinah", customers: 892, percentage: 71.5, type: "Umrah" },
		{ name: "Turki", customers: 156, percentage: 12.5, type: "Pelancongan" }
	];

	let monthlyTrends = [
		{ month: "Jan", umrah: 45, Pelancongan: 23 },
		{ month: "Feb", umrah: 52, Pelancongan: 28 },
		{ month: "Mar", umrah: 48, Pelancongan: 31 }
	];

	let chartLegend = [
		{ label: "Umrah", color: "bg-primary-600" },
		{ label: "Pelancongan", color: "bg-secondary-500" }
	];

	// Form data
	let formData = {
		name: '',
		email: '',
		phone: ''
	};

	function handleSubmit() {
		alert('Form submitted!');
	}
</script>

<svelte:head>
	<title>Contoh Komponen - Rayhar Admin</title>
</svelte:head>

<div class="space-y-8">
	<!-- Page Header -->
	<PageHeader 
		title="Contoh Penggunaan Komponen" 
		subtitle="Halaman ini menunjukkan semua komponen yang tersedia" 
	/>

	<!-- Stat Cards -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
		<StatCard 
			title="Total Pelanggan"
			value={stats.totalCustomers}
			growth={12.5}
			growthText="dari bulan lalu"
			icon="users"
			iconBgColor="bg-gradient-to-r from-primary-600 to-[#AC2EAC]"
			growthColor="text-green-600"
			growthIcon="arrow-up-right"
		/>

		<StatCard 
			title="Pelanggan Umrah"
			value={stats.umrahCustomers}
			growth={8.2}
			growthText="dari bulan lalu"
			icon="map-pin"
			iconBgColor="bg-primary-600"
			growthColor="text-green-600"
			growthIcon="arrow-up-right"
		/>

		<StatCard 
			title="Pelanggan Pelancongan"
			value={stats.PelanconganCustomers}
			growth={-2.3}
			growthText="dari bulan lalu"
			icon="plane"
			iconBgColor="bg-secondary-500"
			growthColor="text-red-600"
			growthIcon="arrow-down-right"
		/>

		<StatCard 
			title="Destinasi Aktif"
			value={stats.popularDestinations}
			growth={0}
			growthText="Makkah & Madinah"
			icon="trending-up"
			iconBgColor="bg-[#FFF00C]"
			growthColor="text-[#FFF00C]"
			growthIcon="star"
		/>
	</div>

	<!-- Charts and Data -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
		<ChartCard 
			title="Tren Bulanan"
			legend={chartLegend}
			data={monthlyTrends}
			type="bar"
		/>

		<DestinationCard destinations={popularDestinations} />
	</div>

	<!-- Form Example -->
	<FormCard 
		title="Contoh Form" 
		subtitle="Form dengan komponen Input dan Button"
	>
		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Input
					label="Nama Lengkap"
					bind:value={formData.name}
					placeholder="Masukkan nama lengkap"
					required
					fullWidth
				/>

				<Input
					type="email"
					label="Email"
					bind:value={formData.email}
					placeholder="contoh@email.com"
					required
					fullWidth
				/>
			</div>

			<Input
				type="tel"
				label="Nomor Telepon"
				bind:value={formData.phone}
				placeholder="+60 12-345 6789"
				fullWidth
			/>

			<div class="flex flex-col sm:flex-row gap-3">
				<Button type="submit" variant="primary">
					Simpan Data
				</Button>
				<Button variant="outline">
					Batal
				</Button>
				<Button variant="secondary">
					Preview
				</Button>
			</div>
		</form>
	</FormCard>

	<!-- Badge Examples -->
	<FormCard title="Contoh Badge">
		<div class="space-y-4">
			<div class="flex flex-wrap gap-2">
				<Badge variant="default">Default</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="danger">Danger</Badge>
				<Badge variant="info">Info</Badge>
				<Badge variant="umrah">Umrah</Badge>
				<Badge variant="pelancongan">Pelancongan</Badge>
			</div>

			<div class="flex flex-wrap gap-2">
				<Badge variant="success" size="sm">Small</Badge>
				<Badge variant="success" size="md">Medium</Badge>
				<Badge variant="success" size="lg">Large</Badge>
			</div>
		</div>
	</FormCard>

	<!-- Data Card Examples -->
	<FormCard title="Contoh Data Card">
		<div class="space-y-4">
			<DataCard
				title="Data Customer"
				subtitle="Informasi lengkap customer"
				icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
				actions={[
					{
						title: 'Edit',
						icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
						onClick: () => alert('Edit clicked')
					},
					{
						title: 'Delete',
						icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
						onClick: () => alert('Delete clicked')
					}
				]}
			>
				<p class="text-sm text-gray-600">
					Ini adalah contoh konten dalam DataCard. Anda bisa menambahkan konten apapun di sini.
				</p>
			</DataCard>
		</div>
	</FormCard>

	<!-- Customer Table -->
	<CustomerTable customers={recentCustomers} />
</div>

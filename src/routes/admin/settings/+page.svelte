<script>
	import Icon from '../../../lib/icons.svelte';
	import Button from '../../../lib/components/Button.svelte';
	import Dropdown from '../../../lib/components/Dropdown.svelte';
	
	// Settings data
	let generalSettings = {
		companyName: 'Rayhar Travel',
		companyEmail: 'info@rayhartravel.com',
		companyPhone: '+60123456789',
		companyAddress: 'Kuala Lumpur, Malaysia',
		timezone: 'Asia/Kuala_Lumpur',
		language: 'ms-MY',
		currency: 'MYR'
	};
	
	let notificationSettings = {
		emailNotifications: true,
		smsNotifications: false,
		newBookingAlert: true,
		paymentAlert: true,
		cancellationAlert: true,
		dailyReport: true,
		weeklyReport: false,
		monthlyReport: true
	};
	
	let systemSettings = {
		maintenanceMode: false,
		autoBackup: true,
		backupFrequency: 'daily',
		sessionTimeout: 30,
		maxLoginAttempts: 5,
		passwordExpiry: 90
	};
	
	let integrationSettings = {
		paymentGateway: 'stripe',
		smsProvider: 'twilio',
		emailProvider: 'sendgrid',
		analytics: true,
		googleAnalyticsId: '',
		facebookPixelId: ''
	};
	
	// Available options
	const timezoneOptions = [
		{ value: 'Asia/Kuala_Lumpur', label: 'Malaysia (UTC+8)' },
		{ value: 'Asia/Singapore', label: 'Singapore (UTC+8)' },
		{ value: 'Asia/Jakarta', label: 'Indonesia (UTC+7)' },
		{ value: 'Asia/Bangkok', label: 'Thailand (UTC+7)' }
	];
	
	const languageOptions = [
		{ value: 'ms-MY', label: 'Bahasa Malaysia' },
		{ value: 'en-US', label: 'English' },
		{ value: 'id-ID', label: 'Bahasa Indonesia' }
	];
	
	const currencyOptions = [
		{ value: 'MYR', label: 'Malaysian Ringgit (MYR)' },
		{ value: 'USD', label: 'US Dollar (USD)' },
		{ value: 'SGD', label: 'Singapore Dollar (SGD)' }
	];
	
	const backupFrequencyOptions = [
		{ value: 'hourly', label: 'Setiap Jam' },
		{ value: 'daily', label: 'Harian' },
		{ value: 'weekly', label: 'Mingguan' },
		{ value: 'monthly', label: 'Bulanan' }
	];
	
	const paymentGatewayOptions = [
		{ value: 'stripe', label: 'Stripe' },
		{ value: 'paypal', label: 'PayPal' },
		{ value: 'razorpay', label: 'Razorpay' },
		{ value: 'fpx', label: 'FPX Malaysia' }
	];
	
	// Active tab
	let activeTab = 'general';
	
	// Status Management
	let statusList = [
		{ id: 1, name: 'Aktif', color: '#10B981', description: 'Status untuk pelanggan aktif' },
		{ id: 2, name: 'Pending', color: '#FFFFFF', description: 'Status untuk pelanggan menunggu konfirmasi' },
		{ id: 3, name: 'Tidak Aktif', color: '#EF4444', description: 'Status untuk pelanggan tidak aktif' },
		{ id: 4, name: 'Dibatalkan', color: '#6B7280', description: 'Status untuk pelanggan yang dibatalkan' },
		{ id: 5, name: 'Selesai', color: '#8B5CF6', description: 'Status untuk pelanggan yang telah selesai' },
		{ id: 6, name: 'Dalam Proses', color: '#3B82F6', description: 'Status untuk pelanggan dalam proses' },
		{ id: 7, name: 'Menunggu Pembayaran', color: '#F97316', description: 'Status untuk pelanggan menunggu pembayaran' },
		{ id: 8, name: 'Refund', color: '#EC4899', description: 'Status untuk pelanggan yang meminta refund' }
	];
	
	let statusForm = {
		id: null,
		name: '',
		color: '#10B981',
		description: ''
	};
	
	let showStatusModal = false;
	let isEditingStatus = false;
	let statusSearchQuery = '';
	let statusCurrentPage = 1;
	let statusItemsPerPage = 5;
	
	// Computed properties for status management
	$: filteredStatusList = statusList.filter(status => 
		status.name.toLowerCase().includes(statusSearchQuery.toLowerCase()) ||
		status.description.toLowerCase().includes(statusSearchQuery.toLowerCase())
	);
	
	$: statusTotalPages = Math.ceil(filteredStatusList.length / statusItemsPerPage);
	$: paginatedStatusList = filteredStatusList.slice(
		(statusCurrentPage - 1) * statusItemsPerPage,
		statusCurrentPage * statusItemsPerPage
	);
	
	const colorOptions = [
		{ value: '#10B981', label: 'Hijau', preview: '#10B981' },
		{ value: '#FFFFFF', label: 'Putih', preview: '#FFFFFF' },
		{ value: '#EF4444', label: 'Merah', preview: '#EF4444' },
		{ value: '#6B7280', label: 'Abu-abu', preview: '#6B7280' },
		{ value: '#8B5CF6', label: 'Ungu', preview: '#8B5CF6' },
		{ value: '#3B82F6', label: 'Biru', preview: '#3B82F6' },
		{ value: '#F97316', label: 'Oren', preview: '#F97316' },
		{ value: '#EC4899', label: 'Pink', preview: '#EC4899' },
		{ value: '#921E8D', label: 'Primary', preview: '#921E8D' },
		{ value: '#AC2EAC', label: 'Accent', preview: '#AC2EAC' }
	];
	
	// Functions
	function saveGeneralSettings() {
		// Implementasi save general settings
		alert('Pengaturan umum telah disimpan!');
	}
	
	function saveNotificationSettings() {
		// Implementasi save notification settings
		alert('Pengaturan notifikasi telah disimpan!');
	}
	
	function saveSystemSettings() {
		// Implementasi save system settings
		alert('Pengaturan sistem telah disimpan!');
	}
	
	function saveIntegrationSettings() {
		// Implementasi save integration settings
		alert('Pengaturan integrasi telah disimpan!');
	}
	
	function testConnection(service) {
		// Implementasi test connection
		alert(`Menguji koneksi ${service}...`);
	}
	
	function exportSettings() {
		// Implementasi export settings
		alert('Mengeksport pengaturan...');
	}
	
	function importSettings() {
		// Implementasi import settings
		alert('Mengimport pengaturan...');
	}
	
	// Status Management Functions
	function openStatusModal(status = null) {
		if (status) {
			isEditingStatus = true;
			statusForm = { ...status };
		} else {
			isEditingStatus = false;
			statusForm = {
				id: null,
				name: '',
				color: '#10B981',
				description: ''
			};
		}
		showStatusModal = true;
	}
	
	function closeStatusModal() {
		showStatusModal = false;
		statusForm = {
			id: null,
			name: '',
			color: '#10B981',
			description: ''
		};
	}
	
	function saveStatus() {
		if (!statusForm.name.trim()) {
			alert('Nama status harus diisi!');
			return;
		}
		
		if (isEditingStatus) {
			// Update existing status
			const index = statusList.findIndex(s => s.id === statusForm.id);
			if (index !== -1) {
				statusList[index] = { ...statusForm };
				statusList = [...statusList];
			}
		} else {
			// Add new status
			const newId = Math.max(...statusList.map(s => s.id)) + 1;
			statusList = [...statusList, { ...statusForm, id: newId }];
		}
		
		closeStatusModal();
		alert(isEditingStatus ? 'Status berhasil diperbarui!' : 'Status berhasil ditambahkan!');
	}
	
	function deleteStatus(statusId) {
		if (confirm('Apakah Anda yakin ingin menghapus status ini?')) {
			statusList = statusList.filter(s => s.id !== statusId);
			// Reset to first page if current page becomes empty
			if (paginatedStatusList.length === 0 && statusCurrentPage > 1) {
				statusCurrentPage = statusCurrentPage - 1;
			}
			alert('Status berhasil dihapus!');
		}
	}
	
	function goToStatusPage(page) {
		if (page >= 1 && page <= statusTotalPages) {
			statusCurrentPage = page;
		}
	}
	
	function clearStatusSearch() {
		statusSearchQuery = '';
		statusCurrentPage = 1;
	}
</script>

<svelte:head>
	<title>Pengaturan - Rayhar Travel Admin</title>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-8">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Pengaturan Sistem</h1>
				<p class="text-gray-600 mt-2">Konfigurasi dan pengaturan sistem Rayhar Travel</p>
			</div>
			<div class="flex items-center space-x-3">
				<button 
					on:click={importSettings}
					class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
				>
					<Icon name="upload" size="16" color="#374151" />
					<span class="ml-2">Import</span>
				</button>
				<button 
					on:click={exportSettings}
					class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
				>
					<Icon name="download" size="16" color="#374151" />
					<span class="ml-2">Export</span>
				</button>
			</div>
		</div>
	</div>

	<!-- Tabs -->
	<div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
		<div class="border-b border-gray-200">
			<nav class="flex space-x-8 px-6" aria-label="Tabs">
				<button 
					on:click={() => activeTab = 'general'}
					class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {activeTab === 'general' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
				>
					Umum
				</button>
				<button 
					on:click={() => activeTab = 'notifications'}
					class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {activeTab === 'notifications' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
				>
					Notifikasi
				</button>
				<button 
					on:click={() => activeTab = 'system'}
					class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {activeTab === 'system' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
				>
					Sistem
				</button>
				<button 
					on:click={() => activeTab = 'integrations'}
					class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {activeTab === 'integrations' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
				>
					Integrasi
				</button>
				<button 
					on:click={() => activeTab = 'status'}
					class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {activeTab === 'status' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
				>
					Status
				</button>
			</nav>
		</div>
	</div>

	<!-- Tab Content -->
	{#if activeTab === 'general'}
		<!-- General Settings -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100">
			<div class="p-6">
				<div class="flex items-center justify-between mb-6">
					<div>
						<h3 class="text-xl font-bold text-gray-900">Pengaturan Umum</h3>
						<p class="text-sm text-gray-500 mt-1">Konfigurasi dasar sistem dan informasi syarikat</p>
					</div>
				</div>
				
				<form on:submit|preventDefault={saveGeneralSettings}>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label for="company-name" class="block text-sm font-medium text-gray-700 mb-2">Nama Syarikat</label>
							<input 
								type="text" 
								id="company-name"
								bind:value={generalSettings.companyName}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
							/>
						</div>
						
						<div>
							<label for="company-email" class="block text-sm font-medium text-gray-700 mb-2">Email Syarikat</label>
							<input 
								type="email" 
								id="company-email"
								bind:value={generalSettings.companyEmail}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
							/>
						</div>
						
						<div>
							<label for="company-phone" class="block text-sm font-medium text-gray-700 mb-2">Telefon Syarikat</label>
							<input 
								type="tel" 
								id="company-phone"
								bind:value={generalSettings.companyPhone}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
							/>
						</div>
						
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2">Zon Waktu</label>
							<Dropdown
								options={timezoneOptions}
								bind:value={generalSettings.timezone}
								placeholder="Pilih zon masa"
								searchable={true}
								size="medium"
								variant="default"
							/>
						</div>
						
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2">Bahasa</label>
							<Dropdown
								options={languageOptions}
								bind:value={generalSettings.language}
								placeholder="Pilih bahasa"
								searchable={false}
								size="medium"
								variant="default"
							/>
						</div>
						
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2">Mata Wang</label>
							<Dropdown
								options={currencyOptions}
								bind:value={generalSettings.currency}
								placeholder="Pilih mata wang"
								searchable={true}
								size="medium"
								variant="default"
							/>
						</div>
					</div>
					
					<div class="mt-6">
						<label for="company-address" class="block text-sm font-medium text-gray-700 mb-2">Alamat Syarikat</label>
						<textarea 
							id="company-address"
							bind:value={generalSettings.companyAddress}
							rows="3"
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
						></textarea>
					</div>
					
					<div class="mt-8 flex justify-end">
						<Button type="submit" variant="primary">
							Simpan Pengaturan
						</Button>
					</div>
				</form>
			</div>
		</div>
	{:else if activeTab === 'notifications'}
		<!-- Notification Settings -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100">
			<div class="p-6">
				<div class="flex items-center justify-between mb-6">
					<div>
						<h3 class="text-xl font-bold text-gray-900">Pengaturan Notifikasi</h3>
						<p class="text-sm text-gray-500 mt-1">Konfigurasi notifikasi email dan SMS</p>
					</div>
				</div>
				
				<form on:submit|preventDefault={saveNotificationSettings}>
					<div class="space-y-6">
						<!-- General Notifications -->
						<div>
							<h4 class="text-lg font-semibold text-gray-900 mb-4">Notifikasi Umum</h4>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<div>
										<label class="text-sm font-medium text-gray-700">Notifikasi Email</label>
										<p class="text-xs text-gray-500">Terima notifikasi melalui email</p>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" bind:checked={notificationSettings.emailNotifications} class="sr-only peer">
										<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
									</label>
								</div>
								
								<div class="flex items-center justify-between">
									<div>
										<label class="text-sm font-medium text-gray-700">Notifikasi SMS</label>
										<p class="text-xs text-gray-500">Terima notifikasi melalui SMS</p>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" bind:checked={notificationSettings.smsNotifications} class="sr-only peer">
										<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
									</label>
								</div>
							</div>
						</div>
						
						<!-- Alert Settings -->
						<div>
							<h4 class="text-lg font-semibold text-gray-900 mb-4">Peringatan</h4>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<div>
										<label class="text-sm font-medium text-gray-700">Tempahan Baru</label>
										<p class="text-xs text-gray-500">Notifikasi ketika ada tempahan baharu</p>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" bind:checked={notificationSettings.newBookingAlert} class="sr-only peer">
										<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
									</label>
								</div>
								
								<div class="flex items-center justify-between">
									<div>
										<label class="text-sm font-medium text-gray-700">Pembayaran</label>
										<p class="text-xs text-gray-500">Notifikasi untuk transaksi pembayaran</p>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" bind:checked={notificationSettings.paymentAlert} class="sr-only peer">
										<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
									</label>
								</div>
								
								<div class="flex items-center justify-between">
									<div>
										<label class="text-sm font-medium text-gray-700">Pembatalan</label>
										<p class="text-xs text-gray-500">Notifikasi ketika ada pembatalan</p>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" bind:checked={notificationSettings.cancellationAlert} class="sr-only peer">
										<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
									</label>
								</div>
							</div>
						</div>
						
						<!-- Report Settings -->
						<div>
							<h4 class="text-lg font-semibold text-gray-900 mb-4">Laporan</h4>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<div>
										<label class="text-sm font-medium text-gray-700">Laporan Harian</label>
										<p class="text-xs text-gray-500">Terima laporan harian via email</p>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" bind:checked={notificationSettings.dailyReport} class="sr-only peer">
										<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
									</label>
								</div>
								
								<div class="flex items-center justify-between">
									<div>
										<label class="text-sm font-medium text-gray-700">Laporan Mingguan</label>
										<p class="text-xs text-gray-500">Terima laporan mingguan via email</p>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" bind:checked={notificationSettings.weeklyReport} class="sr-only peer">
										<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
									</label>
								</div>
								
								<div class="flex items-center justify-between">
									<div>
										<label class="text-sm font-medium text-gray-700">Laporan Bulanan</label>
										<p class="text-xs text-gray-500">Terima laporan bulanan via email</p>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" bind:checked={notificationSettings.monthlyReport} class="sr-only peer">
										<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
									</label>
								</div>
							</div>
						</div>
					</div>
					
					<div class="mt-8 flex justify-end">
						<Button type="submit" variant="primary">
							Simpan Pengaturan
						</Button>
					</div>
				</form>
			</div>
		</div>
	{:else if activeTab === 'system'}
		<!-- System Settings -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100">
			<div class="p-6">
				<div class="flex items-center justify-between mb-6">
					<div>
						<h3 class="text-xl font-bold text-gray-900">Pengaturan Sistem</h3>
						<p class="text-sm text-gray-500 mt-1">Konfigurasi keamanan dan sistem</p>
					</div>
				</div>
				
				<form on:submit|preventDefault={saveSystemSettings}>
					<div class="space-y-6">
						<!-- Maintenance -->
						<div>
							<h4 class="text-lg font-semibold text-gray-900 mb-4">Penyelenggaraan</h4>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<div>
										<label class="text-sm font-medium text-gray-700">Mod Penyelenggaraan</label>
										<p class="text-xs text-gray-500">Aktifkan untuk menghentikan akses pengguna</p>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" bind:checked={systemSettings.maintenanceMode} class="sr-only peer">
										<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
									</label>
								</div>
								
								<div class="flex items-center justify-between">
									<div>
										<label class="text-sm font-medium text-gray-700">Auto Backup</label>
										<p class="text-xs text-gray-500">Backup data secara automatik</p>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" bind:checked={systemSettings.autoBackup} class="sr-only peer">
										<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
									</label>
								</div>
								
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-2">Kekerapan Backup</label>
									<Dropdown
										options={backupFrequencyOptions}
										bind:value={systemSettings.backupFrequency}
										placeholder="Pilih kekerapan sandaran"
										searchable={false}
										size="medium"
										variant="default"
									/>
								</div>
							</div>
						</div>
						
						<!-- Security -->
						<div>
							<h4 class="text-lg font-semibold text-gray-900 mb-4">Keselamatan</h4>
							<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<label for="session-timeout" class="block text-sm font-medium text-gray-700 mb-2">Timeout Sesi (minit)</label>
									<input 
										type="number" 
										id="session-timeout"
										bind:value={systemSettings.sessionTimeout}
										min="5"
										max="120"
										class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
									/>
								</div>
								
								<div>
									<label for="max-login-attempts" class="block text-sm font-medium text-gray-700 mb-2">Maksimum Percubaan Login</label>
									<input 
										type="number" 
										id="max-login-attempts"
										bind:value={systemSettings.maxLoginAttempts}
										min="3"
										max="10"
										class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
									/>
								</div>
								
								<div>
									<label for="password-expiry" class="block text-sm font-medium text-gray-700 mb-2">Tamat Tempoh Kata Laluan (hari)</label>
									<input 
										type="number" 
										id="password-expiry"
										bind:value={systemSettings.passwordExpiry}
										min="30"
										max="365"
										class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
									/>
								</div>
							</div>
						</div>
					</div>
					
					<div class="mt-8 flex justify-end">
						<Button type="submit" variant="primary">
							Simpan Pengaturan
						</Button>
					</div>
				</form>
			</div>
		</div>
	{:else if activeTab === 'integrations'}
		<!-- Integration Settings -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100">
			<div class="p-6">
				<div class="flex items-center justify-between mb-6">
					<div>
						<h3 class="text-xl font-bold text-gray-900">Pengaturan Integrasi</h3>
						<p class="text-sm text-gray-500 mt-1">Konfigurasi integrasi dengan servis luar</p>
					</div>
				</div>
				
				<form on:submit|preventDefault={saveIntegrationSettings}>
					<div class="space-y-6">
						<!-- Payment Gateway -->
						<div>
							<h4 class="text-lg font-semibold text-gray-900 mb-4">Payment Gateway</h4>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">Provider</label>
						<Dropdown
							options={paymentGatewayOptions}
							bind:value={integrationSettings.paymentGateway}
							placeholder="Pilih gateway pembayaran"
							searchable={true}
							size="medium"
							variant="default"
						/>
					</div>
								<div class="flex items-end">
									<button 
										type="button"
										on:click={() => testConnection('Payment Gateway')}
										class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
									>
										Test Koneksi
									</button>
								</div>
							</div>
						</div>
						
						<!-- Analytics -->
						<div>
							<h4 class="text-lg font-semibold text-gray-900 mb-4">Analytics</h4>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<div>
										<label class="text-sm font-medium text-gray-700">Aktifkan Analytics</label>
										<p class="text-xs text-gray-500">Kumpul data analytics untuk laporan</p>
									</div>
									<label class="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" bind:checked={integrationSettings.analytics} class="sr-only peer">
										<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
									</label>
								</div>
								
								<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label for="google-analytics" class="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
										<input 
											type="text" 
											id="google-analytics"
											bind:value={integrationSettings.googleAnalyticsId}
											placeholder="GA-XXXXXXXXX-X"
											class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
										/>
									</div>
									
									<div>
										<label for="facebook-pixel" class="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
										<input 
											type="text" 
											id="facebook-pixel"
											bind:value={integrationSettings.facebookPixelId}
											placeholder="123456789012345"
											class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<div class="mt-8 flex justify-end">
						<Button type="submit" variant="primary">
							Simpan Pengaturan
						</Button>
					</div>
				</form>
			</div>
		</div>
	{:else if activeTab === 'status'}
		<!-- Status Management -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100">
			<div class="p-6">
				<div class="flex items-center justify-between mb-6">
					<div>
						<h3 class="text-xl font-bold text-gray-900">Pengurusan Status</h3>
						<p class="text-sm text-gray-500 mt-1">Kelola status yang tersedia dalam sistem</p>
					</div>
					<button 
						on:click={() => openStatusModal()}
						class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
					>
						<Icon name="plus" size="16" color="white" />
						<span class="ml-2">Tambah Status</span>
					</button>
				</div>
				
				<!-- Search -->
				<div class="mb-6">
					<div class="relative">
						<input 
							type="text" 
							bind:value={statusSearchQuery}
							placeholder="Cari status..."
							class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
						/>
						<Icon name="search" size="20" color="#6B7280" class="absolute left-3 top-1/2 transform -translate-y-1/2" />
						{#if statusSearchQuery}
							<button 
								on:click={clearStatusSearch}
								class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								<Icon name="x" size="16" color="currentColor" />
							</button>
						{/if}
					</div>
				</div>
				
				<!-- Status Table -->
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead>
							<tr class="border-b border-gray-200">
								<th class="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
								<th class="text-left py-3 px-4 font-semibold text-gray-700">Warna</th>
								<th class="text-left py-3 px-4 font-semibold text-gray-700">Deskripsi</th>
								<th class="text-center py-3 px-4 font-semibold text-gray-700">Aksi</th>
							</tr>
						</thead>
						<tbody>
							{#each paginatedStatusList as status (status.id)}
								<tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
									<td class="py-3 px-4">
										<div class="flex items-center space-x-3">
											<div 
												class="w-3 h-3 rounded-full"
												style="background-color: {status.color}"
											></div>
											<span class="font-medium text-gray-900">{status.name}</span>
										</div>
									</td>
									<td class="py-3 px-4">
										<div class="flex items-center space-x-2">
											<div 
												class="w-6 h-6 rounded border border-gray-200"
												style="background-color: {status.color}"
											></div>
											<span class="text-sm text-gray-600 font-mono">{status.color}</span>
										</div>
									</td>
									<td class="py-3 px-4 text-gray-600">{status.description}</td>
									<td class="py-3 px-4">
										<div class="flex items-center justify-center space-x-2">
											<button 
												on:click={() => openStatusModal(status)}
												class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
												title="Edit"
											>
												<Icon name="edit" size="16" color="currentColor" />
											</button>
											<button 
												on:click={() => deleteStatus(status.id)}
												class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
												title="Hapus"
											>
												<Icon name="trash" size="16" color="currentColor" />
											</button>
										</div>
									</td>
								</tr>
							{:else}
								<tr>
									<td colspan="4" class="py-8 text-center text-gray-500">
										{#if statusSearchQuery}
											Tiada status yang ditemui untuk "{statusSearchQuery}"
										{:else}
											Belum ada status yang ditambah
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				
				<!-- Pagination -->
				{#if statusTotalPages > 1}
					<div class="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
						<div class="text-sm text-gray-600">
							Menampilkan {(statusCurrentPage - 1) * statusItemsPerPage + 1} - {Math.min(statusCurrentPage * statusItemsPerPage, filteredStatusList.length)} dari {filteredStatusList.length} status
						</div>
						<div class="flex items-center space-x-2">
							<button 
								on:click={() => goToStatusPage(statusCurrentPage - 1)}
								disabled={statusCurrentPage === 1}
								class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								Sebelumnya
							</button>
							
							{#each Array(statusTotalPages).fill(0) as _, i}
								{#if i + 1 === statusCurrentPage || i + 1 === 1 || i + 1 === statusTotalPages || (i + 1 >= statusCurrentPage - 1 && i + 1 <= statusCurrentPage + 1)}
									<button 
										on:click={() => goToStatusPage(i + 1)}
										class="px-3 py-1 border rounded text-sm transition-colors {i + 1 === statusCurrentPage ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-300 hover:bg-gray-50'}"
									>
										{i + 1}
									</button>
								{:else if i + 1 === statusCurrentPage - 2 || i + 1 === statusCurrentPage + 2}
									<span class="px-2 py-1 text-gray-400">...</span>
								{/if}
							{/each}
							
							<button 
								on:click={() => goToStatusPage(statusCurrentPage + 1)}
								disabled={statusCurrentPage === statusTotalPages}
								class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								Selanjutnya
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<!-- Status Modal -->
{#if showStatusModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
			<div class="p-6">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-bold text-gray-900">
						{isEditingStatus ? 'Edit Status' : 'Tambah Status Baru'}
					</h3>
					<button 
						on:click={closeStatusModal}
						class="text-gray-400 hover:text-gray-600 transition-colors"
					>
						<Icon name="x" size="20" color="currentColor" />
					</button>
				</div>
				
				<form on:submit|preventDefault={saveStatus}>
					<div class="space-y-4">
						<div>
							<label for="status-name" class="block text-sm font-medium text-gray-700 mb-2">Nama Status</label>
							<input 
								type="text" 
								id="status-name"
								bind:value={statusForm.name}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
								placeholder="Masukkan nama status"
								required
							/>
						</div>
						
						<div>
							<label for="status-color" class="block text-sm font-medium text-gray-700 mb-2">Warna</label>
							<div class="flex items-center space-x-3">
								<input 
									type="color" 
									id="status-color"
									bind:value={statusForm.color}
									class="w-12 h-10 border border-gray-300 rounded cursor-pointer"
								/>
								<div class="flex-1">
								<Dropdown
									options={colorOptions}
									bind:value={statusForm.color}
									placeholder="Pilih warna"
									searchable={false}
									size="medium"
									variant="default"
								/>
							</div>
							</div>
						</div>
						
						<div>
							<label for="status-description" class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
							<textarea 
								id="status-description"
								bind:value={statusForm.description}
								rows="3"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
								placeholder="Masukkan deskripsi status"
							></textarea>
						</div>
					</div>
					
					<div class="flex items-center justify-end space-x-3 mt-6">
						<button 
							type="button"
							on:click={closeStatusModal}
							class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
						>
							Batal
						</button>
						<Button type="submit" variant="primary">
							{isEditingStatus ? 'Perbarui' : 'Simpan'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
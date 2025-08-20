<script>
	import { page } from '$app/stores';
	
	export let isSidebarOpen = true;
	export let isMobile = false;
	
	// Dispatch event untuk toggle sidebar
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	const toggleSidebar = () => {
		dispatch('toggle');
	};
</script>

<!-- Sidebar -->
<div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out {isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:sticky md:top-0 md:self-start md:h-screen md:overflow-y-auto md:inset-y-auto md:left-0 md:translate-x-0">
	<!-- Sidebar Header -->
	<div class="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-[#921E8D] via-[#AC2EAC] to-[#921E8D]">
		<div class="flex items-center space-x-3">
			<img src="/favicon.svg" alt="Rayhar Travel" class="h-8 w-auto" />
			{#if !isMobile}
				<span class="text-white font-bold text-lg">Rayhar Admin</span>
			{/if}
		</div>
		<button 
			on:click={toggleSidebar}
			class="md:hidden text-white hover:text-[#FFF00C] transition-colors"
			aria-label="Toggle sidebar"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
			</svg>
		</button>
	</div>

	<!-- Sidebar Navigation -->
	<nav class="flex-1 px-4 py-6 space-y-2">
		<!-- Dashboard -->
		<a 
			href="/admin" 
			class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-100 hover:text-primary-700 hover:border-r-2 hover:border-primary-600 transition-all duration-200 {$page.url.pathname === '/admin' ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600' : ''}"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
			</svg>
			<span class="font-medium">Dashboard</span>
		</a>

		<!-- Pelanggan -->
		<a 
			href="/admin/customers" 
			class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-100 hover:text-primary-700 hover:border-r-2 hover:border-primary-600 transition-all duration-200 {$page.url.pathname === '/admin/customers' ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600' : ''}"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
			</svg>
			<span class="font-medium">Pelanggan</span>
		</a>

		<!-- Pengaturan -->
		<a 
			href="/admin/settings" 
			class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-100 hover:text-primary-700 hover:border-r-2 hover:border-primary-600 transition-all duration-200 {$page.url.pathname === '/admin/settings' ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600' : ''}"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
			</svg>
			<span class="font-medium">Pengaturan</span>
		</a>

		<!-- Umrah Section -->
		<div class="pt-6">
			<div class="px-4 mb-3">
				<span class="text-xs font-semibold text-primary-700 uppercase tracking-wider">Umrah</span>
			</div>
			
			<a 
				href="/admin/seasons" 
				class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-100 hover:text-primary-700 hover:border-r-2 hover:border-primary-600 transition-all duration-200 {$page.url.pathname === '/admin/seasons' ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600' : ''}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
				</svg>
				<span class="font-medium">Musim</span>
			</a>
			
			<a 
				href="/admin/umrah-input" 
				class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-100 hover:text-primary-700 hover:border-r-2 hover:border-primary-600 transition-all duration-200 {$page.url.pathname === '/admin/umrah-input' ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600' : ''}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
				</svg>
				<span class="font-medium">Input Umrah</span>
			</a>
			
			<a 
				href="/admin/umrah" 
				class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-100 hover:text-primary-700 hover:border-r-2 hover:border-primary-600 transition-all duration-200 {$page.url.pathname === '/admin/umrah' ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600' : ''}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
				</svg>
				<span class="font-medium">Data Umrah</span>
			</a>
		</div>

		<!-- Pelancongan Section -->
		<div class="pt-6">
			<div class="px-4 mb-3">
				<span class="text-xs font-semibold text-[#9A8F00] uppercase tracking-wider">Pelancongan</span>
			</div>
			
			<a 
				href="/admin/destinations" 
				class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-secondary-100 hover:text-[#9A8F00] hover:border-r-2 hover:border-secondary-500 transition-all duration-200 {$page.url.pathname === '/admin/destinations' ? 'bg-secondary-100 text-[#9A8F00] border-r-2 border-secondary-500' : ''}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
				</svg>
				<span class="font-medium">Destinasi</span>
			</a>
			
			<a 
				href="/admin/outbound" 
				class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-secondary-100 hover:text-[#9A8F00] hover:border-r-2 hover:border-secondary-500 transition-all duration-200 {$page.url.pathname === '/admin/outbound' ? 'bg-secondary-100 text-[#9A8F00] border-r-2 border-secondary-500' : ''}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
				</svg>
				<span class="font-medium">Data Outbound</span>
			</a>
		</div>
	</nav>

	<!-- Sidebar Footer -->
	<div class="border-t border-gray-200 px-4 py-4">
		<div class="flex items-center space-x-3 px-4 py-3">
			<div class="w-8 h-8 bg-gradient-to-r from-primary-600 to-[#AC2EAC] rounded-full flex items-center justify-center">
				<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
				</svg>
			</div>
			<div class="flex-1">
				<p class="text-sm font-medium text-gray-700">Super Admin</p>
				<p class="text-xs text-gray-500">Administrator</p>
			</div>
			<a href="/" class="text-gray-400 hover:text-[#FFF00C] transition-colors" aria-label="Logout" title="Kembali ke Halaman Utama">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
				</svg>
			</a>
		</div>
	</div>
</div>

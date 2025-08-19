<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	let isSidebarOpen = true;
	let isMobile = false;
	
	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
			if (isMobile) {
				isSidebarOpen = false;
			}
		};
		
		checkMobile();
		window.addEventListener('resize', checkMobile);
		
		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	});
	
	const toggleSidebar = () => {
		isSidebarOpen = !isSidebarOpen;
	};
</script>

<svelte:head>
	<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✈️</text></svg>" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
	<!-- Sidebar -->
	<div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out {isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0">
		<!-- Sidebar Header -->
		<div class="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-[#8E2168] via-[#462365] to-[#8E2168]">
			<div class="flex items-center space-x-3">
				<img src="/logo.png" alt="Rayhar Travel" class="h-8 w-auto" />
				<span class="text-white font-bold text-lg">Rayhar Admin</span>
			</div>
			<button 
				on:click={toggleSidebar}
				class="md:hidden text-white hover:text-[#E3BE1D] transition-colors"
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
				class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-[#8E2168]/10 hover:text-[#8E2168] hover:border-r-2 hover:border-[#8E2168] transition-all duration-200 {$page.url.pathname === '/admin' ? 'bg-[#8E2168]/15 text-[#8E2168] border-r-2 border-[#8E2168]' : ''}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
				</svg>
				<span class="font-medium">Dashboard</span>
			</a>

			<!-- Umrah Section -->
			<div class="pt-6">
				<div class="px-4 mb-3">
					<span class="text-xs font-semibold text-[#8E2168] uppercase tracking-wider">Umrah</span>
				</div>
				
				<a 
					href="/admin/seasons" 
					class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-[#8E2168]/10 hover:text-[#8E2168] hover:border-r-2 hover:border-[#8E2168] transition-all duration-200 {$page.url.pathname === '/admin/seasons' ? 'bg-[#8E2168]/15 text-[#8E2168] border-r-2 border-[#8E2168]' : ''}"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
					</svg>
					<span class="font-medium">Musim</span>
				</a>
				
				<a 
					href="/admin/umrah-input" 
					class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-[#8E2168]/10 hover:text-[#8E2168] hover:border-r-2 hover:border-[#8E2168] transition-all duration-200 {$page.url.pathname === '/admin/umrah-input' ? 'bg-[#8E2168]/15 text-[#8E2168] border-r-2 border-[#8E2168]' : ''}"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
					</svg>
					<span class="font-medium">Input Umrah</span>
				</a>
				
				<a 
					href="/admin/umrah" 
					class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-[#8E2168]/10 hover:text-[#8E2168] hover:border-r-2 hover:border-[#8E2168] transition-all duration-200 {$page.url.pathname === '/admin/umrah' ? 'bg-[#8E2168]/15 text-[#8E2168] border-r-2 border-[#8E2168]' : ''}"
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
					<span class="text-xs font-semibold text-[#462365] uppercase tracking-wider">Pelancongan</span>
				</div>
				
				<a 
					href="/admin/destinations" 
					class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-[#462365]/10 hover:text-[#462365] hover:border-r-2 hover:border-[#462365] transition-all duration-200 {$page.url.pathname === '/admin/destinations' ? 'bg-[#462365]/15 text-[#462365] border-r-2 border-[#462365]' : ''}"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
					</svg>
					<span class="font-medium">Destinasi</span>
				</a>
				
				<a 
					href="/admin/outbound" 
					class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-[#462365]/10 hover:text-[#462365] hover:border-r-2 hover:border-[#462365] transition-all duration-200 {$page.url.pathname === '/admin/outbound' ? 'bg-[#462365]/15 text-[#462365] border-r-2 border-[#462365]' : ''}"
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
				<div class="w-8 h-8 bg-gradient-to-r from-[#8E2168] to-[#462365] rounded-full flex items-center justify-center">
					<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
					</svg>
				</div>
				<div class="flex-1">
					<p class="text-sm font-medium text-gray-700">Super Admin</p>
					<p class="text-xs text-gray-500">Administrator</p>
				</div>
				<button class="text-gray-400 hover:text-[#E3BE1D] transition-colors" aria-label="Logout">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Overlay -->
	{#if isSidebarOpen && isMobile}
		<div 
			class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
			on:click={toggleSidebar}
		></div>
	{/if}

	<!-- Main Content -->
	<div class="flex-1 flex flex-col min-w-0">
		<!-- Top Bar -->
		<div class="bg-white shadow-sm border-b border-gray-200 px-4 py-4 md:hidden">
			<div class="flex items-center justify-between">
				<button 
					on:click={toggleSidebar}
					class="text-gray-600 hover:text-[#8E2168] transition-colors"
					aria-label="Open sidebar"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</button>
				<div class="flex-1 flex justify-center">
					<img src="/logo.png" alt="Rayhar Travel" class="h-8 w-auto" />
				</div>
				<div class="w-6"></div>
			</div>
		</div>

		<!-- Page Content -->
		<main class="flex-1 p-6">
			<slot />
		</main>
	</div>
</div>

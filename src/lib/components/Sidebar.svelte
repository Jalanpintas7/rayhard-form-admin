<script>
	import { page } from '$app/stores';
	import { userRole, userBranch, logout } from '$lib/stores/auth.js';
	import Icon from '$lib/icons.svelte';
	
	export let isSidebarOpen = true;
	export let isMobile = false;
	
	// Dispatch event untuk toggle sidebar
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	// Variables untuk role dan branch
	let currentRole = '';
	let currentBranch = null;
	let currentPath = '/dashboard'; // Default path
	
	// Subscribe ke stores dengan error handling
	userRole.subscribe(role => {
		currentRole = role || '';
	});
	
	userBranch.subscribe(branch => {
		currentBranch = branch || null;
	});
	
	// Subscribe ke page store dengan null safety
	page.subscribe(pageData => {
		if (pageData && pageData.url && pageData.url.pathname) {
			currentPath = pageData.url.pathname;
		}
	});
	
	const toggleSidebar = () => {
		dispatch('toggle');
	};
	
	// Check role untuk menentukan apakah bisa akses admin panel
	function canAccessAdminPanel() {
		return currentRole === 'super_admin';
	}
	
	// Get role display name
	function getRoleDisplayName() {
		switch(currentRole) {
			case 'super_admin':
				return 'Super Admin';
			case 'admin_branch':
				return 'Admin Branch';
			default:
				return 'User';
		}
	}
	
	// Helper function untuk check active path
	function isActivePath(path) {
		return currentPath === path;
	}
	
	function isActivePathStartsWith(path) {
		return currentPath.startsWith(path);
	}
	
	// Handle logout
	async function handleLogout() {
		if (confirm('Adakah anda pasti mahu log keluar?')) {
			await logout();
		}
	}
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
			class="md:hidden text-white hover:text-gray-300 transition-colors"
			aria-label="Toggle sidebar"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
			</svg>
		</button>
	</div>

	<!-- Sidebar Navigation -->
	<nav class="flex-1 px-4 py-6 space-y-2">
		<!-- Dashboard - semua role bisa akses -->
		<a href="/dashboard" class="{isActivePath('/dashboard') ? 'bg-primary-100 text-primary-700 border-primary-200' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-transparent'} flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200">
			<Icon name="home" size="20" color="currentColor" />
			<span>Dashboard</span>
		</a>
		
		<!-- Menu Admin - hanya untuk super admin -->
		{#if canAccessAdminPanel()}
			<a href="/admin/customers" class="{isActivePathStartsWith('/admin/customers') ? 'bg-primary-100 text-primary-700 border-primary-200' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-transparent'} flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200">
				<Icon name="users" size="20" color="currentColor" />
				<span>Pelanggan</span>
			</a>
			
			<a href="/admin/settings" class="{isActivePathStartsWith('/admin/settings') ? 'bg-primary-100 text-primary-700 border-primary-200' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-transparent'} flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200">
				<Icon name="settings" size="20" color="currentColor" />
				<span>Pengaturan</span>
			</a>
			
			<!-- Umrah Section -->
			<div class="pt-6">
				<span class="text-xs font-semibold text-primary-700 uppercase tracking-wider">Umrah</span>
				<a href="/admin/seasons" class="{isActivePathStartsWith('/admin/seasons') ? 'bg-primary-100 text-primary-700 border-primary-200' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-transparent'} flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 mt-2">
					<Icon name="calendar" size="20" color="currentColor" />
					<span>Musim</span>
				</a>
				<a href="/admin/umrah-input" class="{isActivePathStartsWith('/admin/umrah-input') ? 'bg-primary-100 text-primary-700 border-primary-200' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-transparent'} flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 mt-2">
					<Icon name="plus-circle" size="20" color="currentColor" />
					<span>Input Umrah</span>
				</a>
				<a href="/admin/umrah" class="{isActivePathStartsWith('/admin/umrah') ? 'bg-primary-100 text-primary-700 border-primary-200' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-transparent'} flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 mt-2">
					<Icon name="database" size="20" color="currentColor" />
					<span>Data Umrah</span>
				</a>
			</div>
			
			<!-- Pelancongan Section -->
			<div class="pt-6">
				<span class="text-xs font-semibold text-[#9A8F00] uppercase tracking-wider">Pelancongan</span>
				<a href="/admin/destinations" class="{isActivePathStartsWith('/admin/destinations') ? 'bg-primary-100 text-primary-700 border-primary-200' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-transparent'} flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 mt-2">
					<Icon name="map-pin" size="20" color="currentColor" />
					<span>Destinasi</span>
				</a>
				<a href="/admin/outbound" class="{isActivePathStartsWith('/admin/outbound') ? 'bg-primary-100 text-primary-700 border-primary-200' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-transparent'} flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 mt-2">
					<Icon name="plane" size="20" color="currentColor" />
					<span>Data Outbound</span>
				</a>
			</div>
		{/if}
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
				<p class="text-sm font-medium text-gray-700">{getRoleDisplayName()}</p>
				<p class="text-xs text-gray-500">
					{#if currentBranch}
						{currentBranch.name}
					{:else}
						Administrator
					{/if}
				</p>
			</div>
			<button 
				on:click={handleLogout}
				class="text-gray-400 hover:text-gray-300 transition-colors" 
				aria-label="Logout" 
				title="Log Keluar"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
				</svg>
			</button>
		</div>
	</div>
</div>

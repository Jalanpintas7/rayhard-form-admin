<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✈️</text></svg>" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Navigation -->
	<nav class="bg-white shadow-sm border-b border-gray-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center py-4">
				<div class="flex items-center space-x-8">
					<div class="flex items-center">
						<img src="/logo.png" alt="Rayhar Travel" class="h-8 w-auto" />
					</div>
					<div class="flex space-x-6">
						<a href="/admin" class={`text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium ${$page.url.pathname === '/admin' ? 'bg-purple-100 text-purple-600' : ''}`}>
							Dashboard
						</a>
						
						<!-- Umrah Section -->
						<div class="flex items-center space-x-1">
							<span class="text-xs text-purple-600 font-semibold">UMRAH</span>
						</div>
						<a href="/admin/seasons" class={`text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium ${$page.url.pathname === '/admin/seasons' ? 'bg-purple-100 text-purple-600' : ''}`}>
							Season
						</a>
						<a href="/admin/umrah-input" class={`text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium ${$page.url.pathname === '/admin/umrah-input' ? 'bg-purple-100 text-purple-600' : ''}`}>
							Input
						</a>
						<a href="/admin/umrah" class={`text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium ${$page.url.pathname === '/admin/umrah' ? 'bg-purple-100 text-purple-600' : ''}`}>
							Data
						</a>
						
						<!-- Divider -->
						<div class="h-6 w-px bg-gray-300"></div>
						
						<!-- Outbound Section -->
						<div class="flex items-center space-x-1">
							<span class="text-xs text-indigo-600 font-semibold">OUTBOUND</span>
						</div>
						<a href="/admin/destinations" class={`text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium ${$page.url.pathname === '/admin/destinations' ? 'bg-indigo-100 text-indigo-600' : ''}`}>
							Destinasi
						</a>
						<a href="/admin/outbound" class={`text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium ${$page.url.pathname === '/admin/outbound' ? 'bg-indigo-100 text-indigo-600' : ''}`}>
							Data
						</a>
					</div>
				</div>
				<div class="flex items-center space-x-4">
					<span class="text-sm text-gray-600">Super Admin</span>
					<button class="text-gray-600 hover:text-purple-600">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<slot />
	</main>
</div>

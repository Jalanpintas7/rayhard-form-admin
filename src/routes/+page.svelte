<script>
	import { onMount } from 'svelte';
	import { isAuthenticated, checkAuthStatus } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';
	
	let hasRedirected = false; // Flag untuk mencegah infinite redirect
	
	onMount(async () => {
		try {
			// Check auth status
			const isAuth = await checkAuthStatus();
			
			if (!hasRedirected) {
				if (isAuth) {
					// Jika sudah login, redirect ke dashboard
					hasRedirected = true;
					goto('/dashboard');
				} else {
					// Jika belum login, redirect ke login
					hasRedirected = true;
					goto('/login');
				}
			}
		} catch (error) {
			console.error('Error in root page:', error);
			// Fallback ke login jika ada error
			if (!hasRedirected) {
				hasRedirected = true;
				goto('/login');
			}
		}
	});
</script>

<svelte:head>
	<title>Rayhar Travel Admin</title>
</svelte:head>

<!-- Loading screen sementara redirect -->
<div class="min-h-screen bg-gray-50 flex items-center justify-center">
	<div class="text-center">
		<div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl shadow-lg mb-6">
			<span class="text-4xl">✈️</span>
		</div>
		<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
		<p class="text-gray-600">Mengalihkan...</p>
	</div>
</div>

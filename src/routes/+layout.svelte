<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { isAuthenticated, checkAuthStatus } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	
	let isLoading = true;
	let currentUser = null;
	let hasRedirected = false; // Flag untuk mencegah infinite redirect
	
	onMount(async () => {
		try {
			// Check auth status saat aplikasi dimuat
			const isAuth = await checkAuthStatus();
			
			if (!hasRedirected) {
				if (!isAuth) {
					// Jika tidak terautentikasi dan bukan di halaman login, redirect ke login
					if (page.url && page.url.pathname !== '/login') {
						hasRedirected = true;
						goto('/login');
					}
				} else {
					// Jika sudah terautentikasi dan di halaman login, redirect ke dashboard
					if (page.url && page.url.pathname === '/login') {
						hasRedirected = true;
						goto('/dashboard');
					}
				}
			}
			
			isLoading = false;
		} catch (error) {
			console.error('Error in layout:', error);
			isLoading = false;
		}
		
		// Subscribe ke store autentikasi
		const unsubscribe = isAuthenticated.subscribe(authenticated => {
			currentUser = authenticated;
			
			if (!authenticated && page.url && page.url.pathname !== '/login') {
				// Redirect ke login jika logout - reset flag untuk memungkinkan redirect
				hasRedirected = false;
				goto('/login');
			}
		});
		
		return unsubscribe;
	});
</script>

<svelte:head>
	<title>Rayhar Travel Admin</title>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

{#if isLoading}
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center">
			<div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl shadow-lg mb-6">
				<span class="text-4xl">✈️</span>
			</div>
			<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
			<p class="text-gray-600">Memuat aplikasi...</p>
		</div>
	</div>
{:else}
	<slot />
{/if}

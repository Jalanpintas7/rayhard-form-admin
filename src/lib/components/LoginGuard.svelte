<script>
	import { onMount } from 'svelte';
	import { isAuthenticated, checkAuthStatus } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';
	
	let isLoading = true;
	let hasRedirected = false; // Flag untuk mencegah infinite redirect
	
	onMount(async () => {
		try {
			// Check status autentikasi saat komponen dimuat
			const isAuth = await checkAuthStatus();
			
			if (isAuth && !hasRedirected) {
				// Jika sudah terautentikasi, redirect ke dashboard
				hasRedirected = true;
				goto('/dashboard');
			} else {
				isLoading = false;
			}
		} catch (error) {
			console.error('Error in LoginGuard:', error);
			isLoading = false;
		}
		
		// Subscribe ke store autentikasi
		const unsubscribe = isAuthenticated.subscribe(authenticated => {
			if (authenticated && !hasRedirected) {
				// Redirect ke dashboard jika login berhasil
				hasRedirected = true;
				goto('/dashboard');
			}
		});
		
		return unsubscribe;
	});
</script>

{#if isLoading}
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
			<p class="text-gray-600">Memeriksa autentikasi...</p>
		</div>
	</div>
{:else}
	<slot />
{/if}

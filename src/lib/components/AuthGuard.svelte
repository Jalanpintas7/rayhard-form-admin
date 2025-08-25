<script>
	import { onMount } from 'svelte';
	import { isAuthenticated, checkAuthStatus, setupHistoryManagement } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';
	
	let isLoading = true;
	let hasRedirected = false; // Flag untuk mencegah infinite redirect
	
	onMount(async () => {
		try {
			// Check status autentikasi saat komponen dimuat
			const isAuth = await checkAuthStatus();
			
			if (!isAuth && !hasRedirected) {
				// Jika tidak terautentikasi, redirect ke login
				hasRedirected = true;
				goto('/login');
			} else if (isAuth) {
				isLoading = false;
				// Setup history management untuk mencegah back button
				setupHistoryManagement();
			}
		} catch (error) {
			console.error('Error in AuthGuard:', error);
			// Fallback ke login jika ada error
			if (!hasRedirected) {
				hasRedirected = true;
				goto('/login');
			}
		}
		
		// Subscribe ke store autentikasi
		const unsubscribe = isAuthenticated.subscribe(authenticated => {
			if (!authenticated) {
				// Redirect ke login jika logout - reset flag untuk memungkinkan redirect
				hasRedirected = false;
				goto('/login');
			} else if (authenticated) {
				isLoading = false;
				// Setup history management untuk mencegah back button
				setupHistoryManagement();
			}
		});
		
		return unsubscribe;
	});
</script>

{#if isLoading}
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
			<p class="text-gray-700">Memeriksa autentikasi...</p>
		</div>
	</div>
{:else}
	<slot />
{/if}

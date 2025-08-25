<script>
	import '../../app.css';
	import BackButtonGuard from '$lib/components/BackButtonGuard.svelte';
	import { onMount } from 'svelte';
	import { checkAuthStatus } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';
	
	let isLoading = true;
	let hasCheckedAuth = false;
	
	onMount(async () => {
		try {
			// Check auth status
			const isAuth = await checkAuthStatus();
			
			if (!isAuth) {
				// Redirect ke login jika tidak terautentikasi
				goto('/login');
				return;
			}
			
			hasCheckedAuth = true;
			isLoading = false;
		} catch (error) {
			console.error('Error in dashboard layout:', error);
			// Fallback ke login jika ada error
			goto('/login');
		}
	});
</script>

<svelte:head>
	<title>Dashboard - Rayhar Travel Admin</title>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

{#if isLoading || !hasCheckedAuth}
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
			<p class="text-gray-600">Memeriksa autentikasi...</p>
		</div>
	</div>
{:else}
	<BackButtonGuard>
		<slot />
	</BackButtonGuard>
{/if}

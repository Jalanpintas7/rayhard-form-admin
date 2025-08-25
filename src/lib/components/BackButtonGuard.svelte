<script>
	import { onMount, onDestroy } from 'svelte';
	import { isAuthenticated } from '$lib/stores/auth.js';
	
	let currentUser = null;
	
	onMount(() => {
		// Subscribe ke store autentikasi
		const unsubscribe = isAuthenticated.subscribe(authenticated => {
			currentUser = authenticated;
		});
		
		// Setup history management
		setupHistoryManagement();
		
		// Event listener untuk popstate (back button)
		const handlePopState = (event) => {
			// Jika user tidak terautentikasi dan mencoba kembali
			if (!currentUser) {
				event.preventDefault();
				window.location.href = '/login';
				return;
			}
			
			// Jika user terautentikasi, allow back button
			// Tapi pastikan tidak kembali ke halaman yang memerlukan auth
			const currentPath = window.location.pathname;
			const protectedRoutes = ['/dashboard', '/admin'];
			
			if (protectedRoutes.some(route => currentPath.startsWith(route))) {
				// Check localStorage untuk memastikan auth masih valid
				const storedAuth = localStorage.getItem('isAuthenticated');
				if (storedAuth !== 'true') {
					event.preventDefault();
					window.location.href = '/login';
				}
			}
		};
		
		window.addEventListener('popstate', handlePopState);
		
		// Cleanup function
		return () => {
			unsubscribe();
			window.removeEventListener('popstate', handlePopState);
		};
	});
	
	function setupHistoryManagement() {
		if (typeof window !== 'undefined') {
			// Tambahkan entry baru ke history dengan state yang menunjukkan user terautentikasi
			window.history.pushState({ 
				authenticated: true, 
				timestamp: Date.now() 
			}, '', window.location.href);
		}
	}
</script>

<!-- Komponen ini tidak render apapun, hanya untuk mencegah back button -->
<slot />

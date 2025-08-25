import { checkAuthStatus, setupHistoryManagement } from '$lib/stores/auth.js';

export const prerender = true;
export const ssr = false;

// Inisialisasi auth status dan history management saat aplikasi dimuat
if (typeof window !== 'undefined') {
	let hasInitialized = false; // Flag untuk mencegah multiple initialization
	
	// Check auth status
	checkAuthStatus().then(isAuth => {
		if (isAuth && !hasInitialized) {
			// Setup history management jika user sudah terautentikasi
			hasInitialized = true;
			setupHistoryManagement();
		}
	}).catch(error => {
		console.error('Error initializing auth in layout:', error);
	});
	
	// Event listener untuk mencegah back button ke halaman yang memerlukan auth
	window.addEventListener('popstate', (event) => {
		// Jika user mencoba kembali ke halaman yang memerlukan auth
		const protectedRoutes = ['/dashboard', '/admin'];
		const currentPath = window.location.pathname;
		
		if (protectedRoutes.some(route => currentPath.startsWith(route))) {
			// Check apakah user masih terautentikasi
			const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
			if (!isAuthenticated) {
				// Redirect ke login
				window.location.href = '/login';
			}
		}
	});
}

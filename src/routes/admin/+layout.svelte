<script>
	import { onMount } from 'svelte';
	import Navbar from '../../lib/components/Navbar.svelte';
	import Sidebar from '../../lib/components/Sidebar.svelte';
	
	let isSidebarOpen = false;
	let isMobile = false;
	
	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
			isSidebarOpen = !isMobile;
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	});
	
	const handleToggle = () => {
		isSidebarOpen = !isSidebarOpen;
	};
</script>

<svelte:head>
	<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✈️</text></svg>" />
</svelte:head>

<div class="admin-layout min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col md:flex-row">
	<!-- Sidebar Component -->
	<Sidebar {isSidebarOpen} {isMobile} on:toggle={handleToggle} />
	
	<!-- Mobile Navbar Component -->
	<Navbar {isSidebarOpen} {isMobile} on:toggle={handleToggle} />

	<!-- Main Content -->
	<div class="flex-1 flex flex-col min-w-0">
		<!-- Page Content -->
		<main class="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
			<slot />
		</main>
	</div>
</div>

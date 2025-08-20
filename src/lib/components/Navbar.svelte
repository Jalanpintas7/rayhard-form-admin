<script>
	export let isSidebarOpen = true;
	export let isMobile = false;
	
	// Dispatch event untuk toggle sidebar
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	const toggleSidebar = () => {
		dispatch('toggle');
	};
</script>

<!-- Mobile Top Bar -->
<div class="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200 px-4 py-4 md:hidden">
	<div class="flex items-center justify-between">
		<button 
			on:click={toggleSidebar}
			class="text-gray-600 hover:text-[#921E8D] transition-colors"
			aria-label="Open sidebar"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
		<div class="flex-1 flex justify-center">
			<img src="/favicon.svg" alt="Rayhar Travel" class="h-10 w-auto" />
		</div>
		<div class="w-6"></div>
	</div>
</div>

<!-- Mobile Overlay -->
{#if isSidebarOpen && isMobile}
	<div 
		class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
		on:click={toggleSidebar}
	></div>
{/if}

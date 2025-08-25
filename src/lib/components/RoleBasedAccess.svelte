<script>
	import { userRole } from '$lib/stores/auth.js';
	
	export let allowedRoles = ['super_admin'];
	export let fallback = null;
	
	let currentRole = '';
	
	// Subscribe ke store role
	userRole.subscribe(role => {
		currentRole = role;
	});
	
	// Check apakah user bisa akses
	function canAccess() {
		return allowedRoles.includes(currentRole);
	}
</script>

{#if canAccess()}
	<slot />
{:else if fallback}
	{@html fallback}
{/if}

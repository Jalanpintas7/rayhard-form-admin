<script>
	import { userRole, userBranch } from '$lib/stores/auth.js';
	
	let currentRole = '';
	let currentBranch = null;
	
	// Subscribe ke stores
	userRole.subscribe(role => {
		currentRole = role;
	});
	
	userBranch.subscribe(branch => {
		currentBranch = branch;
	});
	
	// Get role display name
	function getRoleDisplayName() {
		switch(currentRole) {
			case 'super_admin':
				return 'Super Admin';
			case 'admin_branch':
				return 'Admin Branch';
			default:
				return 'User';
		}
	}
	
	// Get role color
	function getRoleColor() {
		switch(currentRole) {
			case 'super_admin':
				return 'bg-purple-100 text-purple-800';
			case 'admin_branch':
				return 'bg-blue-100 text-blue-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}
</script>

<div class="flex items-center space-x-3">
	<!-- Role Badge -->
	<div class="px-3 py-1 rounded-full text-sm font-medium {getRoleColor()}">
		{getRoleDisplayName()}
	</div>
	
	<!-- Branch Info -->
	{#if currentBranch}
		<div class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
			{currentBranch.name}
		</div>
	{/if}
</div>

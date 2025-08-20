<script>
	import Icon from '../icons.svelte';
	
	export let title = '';
	export let value = 0;
	export let growth = 0;
	export let growthText = '';
	export let icon = '';
	export let iconBgColor = 'bg-gradient-to-r from-primary-600 to-[#AC2EAC]';
	export let iconColor = 'white';
	export let growthColor = 'text-green-600';
	export let growthIcon = 'arrow-up-right';
</script>

<div class="card-primary">
	<div class="p-2 sm:p-5">
		<div class="flex items-center justify-between">
			<div class="flex-1 min-w-0">
				<p class="text-sm font-medium text-gray-600 truncate">{title}</p>
				<p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
				<div class="flex items-center mt-2">
					<Icon name={growthIcon} size="16" color={growthColor === 'text-green-600' ? '#16a34a' : '#dc2626'} />
					<span class="text-sm {growthColor} font-medium">{growth > 0 ? '+' : ''}{growth}%</span>
					<span class="text-sm text-gray-500 ml-1 truncate">{growthText}</span>
				</div>
			</div>
			<div class="p-3 {iconBgColor} rounded-lg flex-shrink-0 ml-4">
				<Icon name={icon} size="24" color={iconColor} />
			</div>
		</div>
	</div>
</div>

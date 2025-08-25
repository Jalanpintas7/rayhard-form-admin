<script>
	export let name = '';
	export let size = 24;
	export let color = 'currentColor';
	export let class_name = '';
</script>

{#if name === 'users'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
		<circle cx="9" cy="7" r="4"></circle>
		<path d="m22 21-2-2"></path>
		<path d="M16 16l4 4"></path>
		<path d="M4 16l4 4"></path>
	</svg>
{:else if name === 'plane'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4c-2 0-4 1-4.5 2.5L11 8 2.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 2.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
	</svg>
{:else if name === 'map-pin'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
		<circle cx="12" cy="10" r="3"></circle>
	</svg>
{:else if name === 'trending-up' || name === 'Trendding-up'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
		<polyline points="16,7 22,7 22,13"></polyline>
	</svg>
{:else if name === 'calendar'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
		<line x1="16" y1="2" x2="16" y2="6"></line>
		<line x1="8" y1="2" x2="8" y2="6"></line>
		<line x1="3" y1="10" x2="21" y2="10"></line>
	</svg>
{:else if name === 'star'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
	</svg>
{:else if name === 'arrow-up-right'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<path d="M7 17 17 7"></path>
		<path d="M7 7h10v10"></path>
	</svg>
{:else if name === 'arrow-down-right'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<path d="M7 7 17 17"></path>
		<path d="M17 7v10H7"></path>
	</svg>
{:else if name === 'eye'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
		<circle cx="12" cy="12" r="3"></circle>
	</svg>
{:else if name === 'eye-off'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
		<line x1="1" y1="1" x2="23" y2="23"></line>
	</svg>
{:else if name === 'heart'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
	</svg>
{:else if name === 'mail'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
		<polyline points="22,6 12,13 2,6"></polyline>
	</svg>
{:else if name === 'lock'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
		<circle cx="12" cy="16" r="1"></circle>
		<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
	</svg>
{:else if name === 'log-in'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
		<polyline points="10,17 15,12 10,7"></polyline>
		<line x1="15" y1="12" x2="3" y2="12"></line>
	</svg>
{:else if name === 'alert-circle'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<circle cx="12" cy="12" r="10"></circle>
		<line x1="12" y1="8" x2="12" y2="12"></line>
		<line x1="12" y1="16" x2="12.01" y2="16"></line>
	</svg>
{:else if name === 'check-circle'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
		<polyline points="22,4 12,14.01 9,11.01"></polyline>
	</svg>
{:else if name === 'info'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={class_name}>
		<circle cx="12" cy="12" r="10"></circle>
		<line x1="12" y1="16" x2="12.01" y2="16"></line>
		<line x1="12" y1="12" x2="12.01" y2="12"></line>
	</svg>
{/if}

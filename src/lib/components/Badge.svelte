<script>
	export let variant = 'default'; // default, success, warning, danger, info
	export let size = 'md'; // sm, md, lg
	
	const variants = {
		default: 'bg-gray-100 text-gray-800',
		success: 'bg-green-100 text-green-800',
		warning: 'bg-secondary-100 text-[#9A8F00]',
		danger: 'bg-red-100 text-red-800',
		info: 'bg-blue-100 text-blue-800',
		umrah: 'bg-primary-100 text-primary-700',
		pelancongan: 'bg-secondary-100 text-[#9A8F00]'
	};
	
	const sizes = {
		sm: 'px-2 py-1 text-xs',
		md: 'px-2.5 py-1.5 text-xs',
		lg: 'px-3 py-2 text-sm'
	};
	
	$: badgeClasses = `
		inline-flex items-center font-semibold rounded-full
		${variants[variant]}
		${sizes[size]}
	`;
</script>

<span class={badgeClasses}>
	<slot />
</span>

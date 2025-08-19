<script>
	export let type = 'primary';
	export let disabled = false;
	export let className = '';

	const variants = {
		primary: 'bg-gradient-to-r from-primary-600 to-[#AC2EAC] text-white hover:from-[#7B1D7B] hover:to-[#C964C9] focus:ring-primary-600',
		secondary: 'bg-[#FFF00C] text-gray-900 hover:bg-[#E6DA10] focus:ring-[#FFF00C]',
		outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
	};
</script>

<button
	class={`px-4 py-2 rounded-lg transition-colors duration-200 font-medium focus:outline-none focus:ring-2 ${variants[type]} ${className}`}
	disabled={disabled}
>
	<slot />
</button>

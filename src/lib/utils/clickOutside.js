/**
 * Click outside action for Svelte
 * Usage: use:clickOutside on:clickOutside={handler}
 */
export function clickOutside(node) {
	function handleClick(event) {
		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent('clickOutside'));
		}
	}

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
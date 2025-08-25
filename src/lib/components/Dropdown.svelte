<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { clickOutside } from '$lib/utils/clickOutside.js';

	const dispatch = createEventDispatcher();

	// Props
	export let options = [];
	export let value = '';
	export let placeholder = 'Pilih opsyen...';
	export let searchable = true;
	export let disabled = false;
	export let clearable = false;
	export let maxHeight = '200px';
	export let position = 'bottom'; // 'bottom' | 'top'
	export let size = 'medium'; // 'small' | 'medium' | 'large'
	export let variant = 'default'; // 'default' | 'outline' | 'filled'
	export let id = '';

	// State
	let isOpen = false;
	let searchQuery = '';
	let dropdownElement;
	let inputElement;
	let highlightedIndex = -1;

	// Computed
	$: filteredOptions = searchable && searchQuery
		? options.filter(option => 
				option.label.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: options;

	$: selectedOption = options.find(option => option.value === value);
	$: displayValue = selectedOption ? selectedOption.label : '';

	// Size classes
	$: sizeClasses = {
		small: 'px-3 py-2 text-sm',
		medium: 'px-4 py-2.5 text-sm',
		large: 'px-4 py-3 text-base'
	}[size];

	// Variant classes
	$: variantClasses = {
		default: 'bg-white border-gray-300 focus:border-[#942392] focus:ring-[#942392]',
		outline: 'bg-transparent border-gray-300 focus:border-[#942392] focus:ring-[#942392]',
		filled: 'bg-gray-50 border-gray-200 focus:border-[#942392] focus:ring-[#942392] focus:bg-white'
	}[variant];

	function toggleDropdown() {
		if (disabled) return;
		isOpen = !isOpen;
		if (isOpen) {
			searchQuery = '';
			highlightedIndex = -1;
			setTimeout(() => {
				if (searchable && inputElement) {
					inputElement.focus();
				}
			}, 100);
		}
	}

	function selectOption(option) {
		value = option.value;
		isOpen = false;
		searchQuery = '';
		highlightedIndex = -1;
		dispatch('change', { value: option.value, option });
	}

	function clearSelection() {
		value = '';
		dispatch('change', { value: '', option: null });
	}

	function handleKeydown(event) {
		if (disabled) return;

		switch (event.key) {
			case 'Enter':
				event.preventDefault();
				if (isOpen && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
					selectOption(filteredOptions[highlightedIndex]);
				} else if (!isOpen) {
					toggleDropdown();
				}
				break;
			case 'ArrowDown':
				event.preventDefault();
				if (!isOpen) {
					toggleDropdown();
				} else {
					highlightedIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1);
				}
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (isOpen) {
					highlightedIndex = Math.max(highlightedIndex - 1, -1);
				}
				break;
			case 'Escape':
				isOpen = false;
				searchQuery = '';
				highlightedIndex = -1;
				break;
		}
	}

	function handleClickOutside() {
		isOpen = false;
		searchQuery = '';
		highlightedIndex = -1;
	}
</script>

<div class="dropdown-container relative" bind:this={dropdownElement} use:clickOutside on:clickOutside={handleClickOutside}>
	<!-- Trigger Button -->
	<div
		class="dropdown-trigger w-full flex items-center justify-between border rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 {sizeClasses} {variantClasses}"
		class:opacity-50={disabled}
		class:cursor-not-allowed={disabled}
		class:cursor-pointer={!disabled}
		class:ring-2={isOpen}
		class:ring-[#942392]={isOpen}
		class:border-[#942392]={isOpen}
		on:click={toggleDropdown}
		on:keydown={handleKeydown}
		role="button"
		tabindex="0"
		{id}
		aria-haspopup="listbox"
		aria-expanded={isOpen}
	>
		<span class="flex-1 text-left truncate" class:text-gray-500={!displayValue}>
			{displayValue || placeholder}
		</span>
		
		<div class="flex items-center space-x-1 ml-2">
			{#if clearable && value}
				<button
					type="button"
					class="p-1 hover:bg-gray-100 rounded transition-colors duration-150"
					on:click|stopPropagation={clearSelection}
					title="Padam pilihan"
					aria-label="Padam pilihan"
				>
					<svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			{/if}
			
			<svg 
				class="w-4 h-4 text-gray-400 transition-transform duration-200 ease-in-out"
				class:rotate-180={isOpen}
				fill="none" 
				stroke="currentColor" 
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	</div>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div 
			class="dropdown-menu absolute z-50 w-full bg-white border border-gray-200 rounded-lg overflow-hidden dropdown-shadow"
			class:bottom-full={position === 'top'}
			class:mb-1={position === 'top'}
			class:mt-1={position === 'bottom'}
			class:dropdown-enter={position === 'bottom'}
			class:dropdown-enter-top={position === 'top'}
			class:left-0={true}
			class:right-0={true}
			class:min-w-full={true}
			class:max-w-xs={true}
			class:sm:max-w-sm={true}
			class:md:max-w-md={true}
		>
			{#if searchable}
				<div class="p-2 border-b border-gray-100">
					<div class="relative">
						<input
							bind:this={inputElement}
							bind:value={searchQuery}
							type="text"
							class="w-full px-3 py-2 pl-8 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#942392] focus:border-[#942392]"
							placeholder="Carian..."
							on:keydown={handleKeydown}
						/>
						<svg class="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</div>
				</div>
			{/if}

			<div class="max-h-60 overflow-y-auto dropdown-scroll" style="max-height: {maxHeight};">
				{#if filteredOptions.length > 0}
					{#each filteredOptions as option, index}
						<button
							type="button"
							class="dropdown-option w-full px-3 py-2.5 sm:px-4 text-left text-sm transition-all duration-150 ease-in-out flex items-center justify-between hover-lift"
							class:highlighted={index === highlightedIndex}
				class:text-[#942392]={index === highlightedIndex}
				class:bg-[#942392]={option.value === value}
				class:text-white={option.value === value}
				class:hover:bg-gray-50={option.value !== value && index !== highlightedIndex}
				class:border-l-2={option.value === value}
				class:border-[#942392]={option.value === value}
							on:click={() => selectOption(option)}
							on:mouseenter={() => highlightedIndex = index}
						>
							<span class="flex-1">{option.label}</span>
							{#if option.value === value}
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							{/if}
						</button>
					{/each}
				{:else}
					<div class="px-4 py-6 text-center text-sm text-gray-500">
						{searchQuery ? 'Tiada hasil ditemui' : 'Tiada opsyen tersedia'}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes dropdownFadeIn {
		from {
			opacity: 0;
			transform: translateY(-4px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.dropdown-menu {
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	.dropdown-option:hover {
		background-color: rgba(148, 35, 146, 0.05);
	}

	.highlighted {
		background-color: rgba(148, 35, 146, 0.1) !important;
	}

	.dropdown-trigger:hover:not(:disabled) {
		border-color: #9CA3AF;
	}

	.dropdown-trigger:focus {
		box-shadow: 0 0 0 3px rgba(148, 35, 146, 0.1);
	}
</style>
<script>
	import { onMount } from 'svelte';
	import Icon from '$lib/icons.svelte';
	import LoginGuard from '$lib/components/LoginGuard.svelte';
	import { login } from '$lib/stores/auth.js';
	
	let email = '';
	let password = '';
	let rememberMe = false;
	let isLoading = false;
	let showPassword = false;
	let errorMessage = '';
	let successMessage = '';
	
	// Validasi email sederhana
	function validateEmail(email) {
		return email.includes('@') && email.includes('.');
	}
	
	// Handle login
	async function handleLogin() {
		// Reset messages
		errorMessage = '';
		successMessage = '';
		
		// Validasi form
		if (!email || !password) {
			errorMessage = 'Sila masukkan email dan kata laluan';
			return;
		}
		
		if (!validateEmail(email)) {
			errorMessage = 'Format email tidak sah';
			return;
		}
		
		isLoading = true;
		
		try {
			const result = await login(email, password);
			successMessage = result.message + ' Mengalihkan ke dashboard...';
			
			// Redirect ke dashboard setelah 1.5 saat
			setTimeout(() => {
				// Redirect otomatis ke dashboard setelah login berhasil
				window.location.href = '/dashboard';
			}, 1500);
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isLoading = false;
		}
	}
	
	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
	
	// Auto focus pada email input
	onMount(() => {
		const emailInput = document.getElementById('email');
		if (emailInput) {
			emailInput.focus();
		}
	});
</script>

<svelte:head>
	<title>Login - Rayhar Travel Admin</title>
</svelte:head>

<LoginGuard>
	<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
	<div class="w-full max-w-sm">
		<!-- Logo dan Header -->
		<div class="text-center mb-8">
			<div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl shadow-lg mb-6 hover:scale-105 transition-transform duration-200">
				<img src="/logo.png" alt="Rayhar Travel Logo" class="w-12 h-12 object-contain" />
			</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h1>
			<p class="text-gray-600">Log masuk ke panel admin Rayhar Travel</p>
		</div>
		
		<!-- Form Login -->
		<div class="bg-white rounded-2xl shadow-[0_10px_30px_rgba(16,24,40,0.06)] ring-1 ring-gray-100/80 p-6">
			<form on:submit|preventDefault={handleLogin} class="space-y-6">
				<!-- Email Input -->
				<div>
					<label for="email" class="block text-left text-sm font-medium text-gray-700 mb-2">
						Alamat Email
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Icon name="mail" size="20" color="#6b7280" />
						</div>
						<input
							id="email"
							type="email"
							bind:value={email}
							class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
							placeholder="admin@rayhar.com"
							required
							disabled={isLoading}
						/>
					</div>
				</div>
				
				<!-- Password Input -->
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 mb-2">
						Kata Laluan
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Icon name="lock" size="20" color="#6b7280" />
						</div>
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							bind:value={password}
							class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#921E8D] focus:border-transparent transition-colors"
							placeholder="••••••••"
							required
							disabled={isLoading}
						/>
						<button
							type="button"
							on:click={togglePasswordVisibility}
							class="absolute inset-y-0 right-0 pr-3 flex items-center justify-center w-10 text-gray-500 hover:text-gray-700 transition-colors"
							disabled={isLoading}
						>
							{#if showPassword}
								<Icon name="eye-off" size="20" color="currentColor" />
							{:else}
								<Icon name="eye" size="20" color="currentColor" />
							{/if}
						</button>
					</div>
				</div>
				
				<!-- Remember Me & Forgot Password -->
				<div class="flex items-center justify-between">
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={rememberMe}
							class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
							disabled={isLoading}
						/>
						<span class="ml-2 text-sm text-gray-600">Ingat saya</span>
					</label>
					<button type="button" class="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
						Lupa kata laluan?
					</button>
				</div>
				
				<!-- Error Message -->
				{#if errorMessage}
					<div class="bg-red-50 border border-red-200 rounded-lg p-4">
						<div class="flex items-center">
							<Icon name="alert-circle" size="20" color="#dc2626" />
							<span class="ml-2 text-sm text-red-700">{errorMessage}</span>
						</div>
					</div>
				{/if}
				
				<!-- Success Message -->
				{#if successMessage}
					<div class="bg-green-50 border border-green-200 rounded-lg p-4">
						<div class="flex items-center">
							<Icon name="check-circle" size="20" color="#16a34a" />
							<span class="ml-2 text-sm text-green-700">{successMessage}</span>
						</div>
					</div>
				{/if}
				
				<!-- Login Button -->
				<button
					type="submit"
					class="w-full btn-primary py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
					disabled={isLoading}
				>
					{#if isLoading}
						<div class="flex items-center justify-center">
							<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
							Memproses...
						</div>
					{:else}
						Log Masuk
					{/if}
				</button>
			</form>
		</div>
		
		<!-- Footer -->
		<div class="text-center mt-8">
			<p class="text-sm text-gray-500">
				© 2024 Rayhar Travel. Hak cipta terpelihara.
			</p>
		</div>
	</div>
	</div>
</LoginGuard>

<style>
	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>

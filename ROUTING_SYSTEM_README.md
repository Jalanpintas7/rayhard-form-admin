# Sistem Routing Rayhar Travel Admin

## Overview
Sistem routing yang mengatur alur navigasi user berdasarkan status autentikasi dan role. Aplikasi akan langsung menampilkan halaman login jika user belum terautentikasi.

## Flow Routing

### 1. **User Belum Login (Belum Terautentikasi)**
```
URL: / (root)
↓
Redirect otomatis ke: /login
↓
Tampilkan halaman login
```

### 2. **User Sudah Login**
```
URL: / (root)
↓
Redirect otomatis ke: /dashboard
↓
Tampilkan dashboard sesuai role
```

### 3. **Setelah Login Berhasil**
```
Login berhasil
↓
Redirect otomatis ke: /dashboard
↓
Tampilkan dashboard dengan menu sesuai role
```

## Role-Based Access

### **Admin Branch Role**
- ✅ **Dashboard** - Akses penuh
- ❌ **Admin Panel** - Tidak bisa akses
- ❌ **Menu Admin** - Tersembunyi

### **Super Admin Role**
- ✅ **Dashboard** - Akses penuh
- ✅ **Admin Panel** - Akses penuh
- ✅ **Semua Menu Admin** - Akses penuh

## Implementasi

### 1. **Root Layout (`+layout.svelte`)**
```svelte
<script>
	import { onMount } from 'svelte';
	import { isAuthenticated, checkAuthStatus } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	
	onMount(async () => {
		const isAuth = await checkAuthStatus();
		
		if (!isAuth) {
			// Redirect ke login jika belum terautentikasi
			if (page.url.pathname !== '/login') {
				goto('/login');
			}
		} else {
			// Redirect ke dashboard jika sudah terautentikasi
			if (page.url.pathname === '/login') {
				goto('/dashboard');
			}
		}
	});
</script>
```

### 2. **Root Page (`+page.svelte`)**
```svelte
<script>
	onMount(async () => {
		const isAuth = await checkAuthStatus();
		
		if (isAuth) {
			goto('/dashboard');  // Redirect ke dashboard
		} else {
			goto('/login');      // Redirect ke login
		}
	});
</script>
```

### 3. **LoginGuard Component**
```svelte
<script>
	onMount(async () => {
		const isAuth = await checkAuthStatus();
		
		if (isAuth) {
			// Redirect ke dashboard jika sudah login
			goto('/dashboard');
		}
	});
</script>
```

### 4. **AuthGuard Component**
```svelte
<script>
	onMount(async () => {
		const isAuth = await checkAuthStatus();
		
		if (!isAuth) {
			// Redirect ke login jika belum terautentikasi
			goto('/login');
		}
	});
</script>
```

## Halaman dan Akses

### **Public Pages (Tidak Perlu Login)**
- `/login` - Halaman login

### **Protected Pages (Perlu Login)**
- `/dashboard` - Dashboard utama (semua role)
- `/admin/*` - Admin panel (hanya super admin)

### **Redirect Rules**
1. **Belum login** → `/login`
2. **Sudah login** → `/dashboard`
3. **Admin branch** → Hanya bisa akses `/dashboard`
4. **Super admin** → Bisa akses `/dashboard` dan `/admin/*`

## Komponen yang Digunakan

### 1. **LoginGuard**
- Mencegah user yang sudah login mengakses halaman login
- Redirect otomatis ke dashboard

### 2. **AuthGuard**
- Mencegah user yang belum login mengakses halaman protected
- Redirect otomatis ke login

### 3. **BackButtonGuard**
- Mencegah browser back button setelah logout
- Keamanan tambahan untuk protected routes

## Testing Flow

### **Test 1: User Belum Login**
1. Buka aplikasi
2. Harus langsung redirect ke `/login`
3. Tidak bisa akses `/dashboard` atau `/admin`

### **Test 2: Admin Branch Login**
1. Login dengan role admin branch
2. Redirect otomatis ke `/dashboard`
3. Menu admin tersembunyi
4. Tidak bisa akses `/admin/*`

### **Test 3: Super Admin Login**
1. Login dengan role super admin
2. Redirect otomatis ke `/dashboard`
3. Semua menu admin tersedia
4. Bisa akses `/admin/*`

### **Test 4: Logout**
1. Klik logout
2. Redirect otomatis ke `/login`
3. Tidak bisa akses halaman sebelumnya
4. Browser back button tidak berfungsi

## Keamanan

### 1. **Automatic Redirects**
- Mencegah akses tidak sah
- Redirect otomatis berdasarkan status auth

### 2. **Role-Based Access**
- Menu dan halaman sesuai role
- Validasi di level komponen dan routing

### 3. **Back Button Protection**
- Mencegah akses kembali setelah logout
- Clear browser history

### 4. **Real-time Validation**
- Check auth status real-time
- Subscribe ke store autentikasi

## Troubleshooting

### **Redirect Loop**
- Check logic di `onMount`
- Pastikan kondisi redirect sudah benar
- Validasi status autentikasi

### **Menu Tidak Muncul**
- Check role user di database
- Pastikan `canAccessAdminPanel()` berfungsi
- Validasi store `userRole`

### **Halaman Tidak Bisa Diakses**
- Check `AuthGuard` sudah terpasang
- Pastikan routing sudah benar
- Validasi permission sesuai role

## Best Practices

### 1. **Gunakan Guard Components**
- `LoginGuard` untuk halaman login
- `AuthGuard` untuk halaman protected
- `BackButtonGuard` untuk keamanan tambahan

### 2. **Centralized Auth Logic**
- Semua logic auth di `auth.js` store
- Konsisten di semua komponen
- Mudah maintain dan update

### 3. **Role-Based UI**
- Menu dan button sesuai role
- User experience yang jelas
- Tidak ada menu yang tidak bisa diakses

## Kesimpulan

Sistem routing Rayhar Travel Admin memberikan:
- ✅ **Keamanan tinggi** dengan redirect otomatis
- ✅ **User experience yang baik** dengan navigasi yang jelas
- ✅ **Role-based access** yang konsisten
- ✅ **Protection dari back button** setelah logout
- ✅ **Loading states** yang informatif

Sistem ini memastikan user hanya bisa mengakses halaman yang sesuai dengan role dan status autentikasinya.

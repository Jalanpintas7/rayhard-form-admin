# Troubleshooting Rayhar Travel Admin

## Error yang Sudah Diperbaiki

### 1. **Error: Cannot read properties of undefined (reading 'pathname')**

**Penyebab:**
- `page.url` belum tersedia saat komponen dimuat
- SvelteKit store `page` belum diinisialisasi
- Sidebar component mengakses `page.url.pathname` langsung

**Solusi:**
```javascript
// Sebelum (Error)
if (page.url.pathname !== '/login') {
    goto('/login');
}

// Sesudah (Fixed)
if (page.url && page.url.pathname !== '/login') {
    goto('/login');
}

// Atau gunakan local variable dengan default value
let currentPath = '/dashboard'; // Default path

page.subscribe(pageData => {
    if (pageData && pageData.url && pageData.url.pathname) {
        currentPath = pageData.url.pathname;
    }
});
```

### 2. **Infinite Redirect Loop**

**Penyebab:**
- Multiple redirect tanpa flag control
- Subscribe callback yang berjalan berulang

**Solusi:**
```javascript
let hasRedirected = false; // Flag untuk mencegah infinite redirect

onMount(async () => {
    if (!hasRedirected) {
        // Lakukan redirect
        hasRedirected = true;
        goto('/login');
    }
});
```

### 3. **Multiple Initialization**

**Penyebab:**
- Layout.js dijalankan multiple kali
- Setup history management berulang

**Solusi:**
```javascript
let hasInitialized = false; // Flag untuk mencegah multiple initialization

if (isAuth && !hasInitialized) {
    hasInitialized = true;
    setupHistoryManagement();
}
```

### 4. **Infinite Loading di Admin Panel**

**Penyebab:**
- Layout admin tidak ada loading state control
- Auth check berulang tanpa flag control

**Solusi:**
```javascript
let isLoading = true;
let hasCheckedAuth = false;

onMount(async () => {
    try {
        const isAuth = await checkAuthStatus();
        
        if (!isAuth) {
            goto('/login');
            return;
        }
        
        // Check role untuk super admin
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'super_admin') {
            goto('/dashboard');
            return;
        }
        
        hasCheckedAuth = true;
        isLoading = false;
    } catch (error) {
        console.error('Error in admin layout:', error);
        goto('/login');
    }
});
```

### 5. **Warning: Avoid using `history.pushState(...)` and `history.replaceState(...)`**

**Penyebab:**
- Menggunakan `window.history.pushState()` langsung
- Konflik dengan SvelteKit router
- Tidak menggunakan SvelteKit navigation API

**Solusi:**
```javascript
// Sebelum (Warning)
import { writable } from 'svelte/store';

function setupHistoryManagement() {
    if (typeof window !== 'undefined') {
        // ❌ Jangan gunakan ini
        window.history.pushState({ authenticated: true }, '', window.location.href);
    }
}

// Sesudah (Fixed)
import { writable } from 'svelte/store';
import { pushState, replaceState } from '$app/navigation';

function setupHistoryManagement() {
    if (typeof window !== 'undefined') {
        // ✅ Gunakan SvelteKit API
        pushState(window.location.href, { authenticated: true });
    }
}

function preventBackButton() {
    if (typeof window !== 'undefined') {
        // ✅ Gunakan SvelteKit API
        replaceState('/login', { replace: true });
        replaceState('/login', { replace: true });
    }
}
```

### 6. **Error: Gagal mengambil data pengguna**

**Penyebab:**
- Query database yang salah
- Mencoba mengakses kolom yang tidak ada
- JOIN query yang tidak sesuai dengan struktur database

**Solusi:**
```javascript
// Sebelum (Error)
const { data: userData, error: userError } = await supabase
    .from('user_branches')
    .select('*')  // ❌ Select semua kolom
    .eq('email', email)  // ❌ Kolom email tidak ada
    .single();

// Sesudah (Fixed)
const { data: userData, error: userError } = await supabase
    .from('user_branches')
    .select(`
        role,
        branch_id,
        branches (
            id,
            name,
            state,
            region
        )
    `)  // ✅ Select kolom yang diperlukan dengan JOIN
    .eq('user_id', data.user.id)  // ✅ Gunakan user_id dari auth
    .single();
```

## Error Handling yang Ditambahkan

### 1. **Try-Catch Blocks**
```javascript
try {
    const isAuth = await checkAuthStatus();
    // Logic auth
} catch (error) {
    console.error('Error in component:', error);
    // Fallback handling
}
```

### 2. **Null Safety Checks**
```javascript
// Sebelum
userRole.subscribe(role => {
    currentRole = role;
});

// Sesudah
userRole.subscribe(role => {
    currentRole = role || '';
});
```

### 3. **Error Logging**
```javascript
.catch(error => {
    console.error('Error initializing auth in layout:', error);
});
```

### 4. **Local Path Management**
```javascript
// Gunakan local variable untuk path
let currentPath = '/dashboard'; // Default path

// Subscribe dengan null safety
page.subscribe(pageData => {
    if (pageData && pageData.url && pageData.url.pathname) {
        currentPath = pageData.url.pathname;
    }
});

// Helper functions
function isActivePath(path) {
    return currentPath === path;
}

function isActivePathStartsWith(path) {
    return currentPath.startsWith(path);
}
```

### 5. **SvelteKit Navigation API**
```javascript
// Import SvelteKit navigation functions
import { pushState, replaceState, goto } from '$app/navigation';

// Gunakan untuk history management
pushState(url, options);        // Tambah entry baru ke history
replaceState(url, options);     // Ganti entry current di history
goto(url, options);            // Navigasi ke URL baru
```

### 6. **Database Query Best Practices**
```javascript
// ✅ Gunakan JOIN yang benar
.select(`
    role,
    branch_id,
    branches (
        id,
        name,
        state,
        region
    )
`)

// ✅ Gunakan foreign key yang benar
.eq('user_id', data.user.id)

// ✅ Handle null values
userBranch.set(userData.branches || null);

// ✅ Safe property access
branch: userData.branches?.name || 'No Branch'
```

## Komponen yang Diperbaiki

### 1. **Root Layout (`+layout.svelte`)**
- ✅ Added `hasRedirected` flag
- ✅ Added null safety untuk `page.url`
- ✅ Added try-catch error handling
- ✅ Added error logging

### 2. **Root Page (`+page.svelte`)**
- ✅ Added `hasRedirected` flag
- ✅ Added try-catch error handling
- ✅ Added fallback redirect ke login

### 3. **LoginGuard Component**
- ✅ Added `hasRedirected` flag
- ✅ Added try-catch error handling
- ✅ Added error logging

### 4. **AuthGuard Component**
- ✅ Added `hasRedirected` flag
- ✅ Added try-catch error handling
- ✅ Added fallback redirect ke login

### 5. **Layout.js**
- ✅ Added `hasInitialized` flag
- ✅ Added error handling untuk promises
- ✅ Added error logging

### 6. **Sidebar Component**
- ✅ Added null safety untuk stores
- ✅ Added Icon import yang hilang
- ✅ Added local path management
- ✅ Added helper functions untuk active path
- ✅ Removed direct `page.url.pathname` access

### 7. **Admin Layout (`+layout.svelte`)**
- ✅ Added loading state control
- ✅ Added auth check dengan flag control
- ✅ Added role validation untuk super admin
- ✅ Added error handling dan fallback

### 8. **Dashboard Layout (`+layout.svelte`)**
- ✅ Added loading state control
- ✅ Added auth check dengan flag control
- ✅ Added error handling dan fallback

### 9. **Dashboard Page (`+page.svelte`)**
- ✅ Removed AuthGuard dan BackButtonGuard (sudah di layout)
- ✅ Added null safety untuk stores
- ✅ Simplified structure

### 10. **Auth Store (`auth.js`)**
- ✅ Replaced `window.history.pushState()` dengan `pushState` dari `$app/navigation`
- ✅ Replaced `window.history.replaceState()` dengan `replaceState` dari `$app/navigation`
- ✅ Added proper SvelteKit navigation API usage
- ✅ Improved error handling dan logging
- ✅ Better localStorage management
- ✅ Fixed database query dengan JOIN yang benar
- ✅ Added proper foreign key relationships
- ✅ Added null safety untuk branch data

## Best Practices untuk Mencegah Error

### 1. **Gunakan Flag untuk Control Flow**
```javascript
let hasRedirected = false;
let hasInitialized = false;
let isLoading = true;
let hasCheckedAuth = false;
```

### 2. **Null Safety Checks**
```javascript
// Selalu check apakah object ada sebelum akses property
if (page.url && page.url.pathname) {
    // Akses pathname
}
```

### 3. **Try-Catch untuk Async Operations**
```javascript
try {
    const result = await asyncFunction();
    // Handle success
} catch (error) {
    console.error('Error:', error);
    // Handle error
}
```

### 4. **Subscribe dengan Default Values**
```javascript
store.subscribe(value => {
    // Berikan default value jika undefined
    currentValue = value || defaultValue;
});
```

### 5. **Error Logging**
```javascript
.catch(error => {
    console.error('Component: Error description:', error);
});
```

### 6. **Local State Management**
```javascript
// Gunakan local variable untuk data yang sering diakses
let currentPath = '/dashboard';
let currentRole = '';
let currentBranch = null;

// Update melalui subscribe
page.subscribe(pageData => {
    if (pageData && pageData.url && pageData.url.pathname) {
        currentPath = pageData.url.pathname;
    }
});
```

### 7. **SvelteKit Navigation API**
```javascript
// ✅ Gunakan SvelteKit API, bukan browser API langsung
import { pushState, replaceState, goto } from '$app/navigation';

// Jangan gunakan:
// ❌ window.history.pushState()
// ❌ window.history.replaceState()

// Gunakan:
// ✅ pushState(url, options)
// ✅ replaceState(url, options)
// ✅ goto(url, options)
```

### 8. **Database Query Best Practices**
```javascript
// ✅ Gunakan JOIN yang benar sesuai struktur database
.select(`
    role,
    branch_id,
    branches (
        id,
        name,
        state,
        region
    )
`)

// ✅ Gunakan foreign key yang benar
.eq('user_id', data.user.id)

// ✅ Handle null values dengan default
userBranch.set(userData.branches || null);

// ✅ Safe property access dengan optional chaining
branch: userData.branches?.name || 'No Branch'
```

## Testing Setelah Perbaikan

### 1. **Test Root Route**
1. Buka `/` (root)
2. Harus redirect ke `/login` (tidak infinite loop)
3. Check console untuk error

### 2. **Test Login Flow**
1. Login berhasil
2. Redirect ke `/dashboard` (tidak infinite loop)
3. Menu sesuai role

### 3. **Test Admin Panel Access**
1. Login sebagai super admin
2. Klik "Admin Panel" button
3. Harus masuk ke admin panel (tidak infinite loading)
4. Sidebar harus berfungsi normal

### 4. **Test Logout Flow**
1. Klik logout
2. Redirect otomatis ke `/login` (tidak infinite loop)
3. Tidak bisa akses halaman sebelumnya
4. Browser back button tidak berfungsi

### 5. **Test Error Scenarios**
1. Network error
2. Invalid credentials
3. Database connection issues
4. Access admin panel sebagai admin branch

### 6. **Test Console Warnings**
1. Check console untuk warning `history.pushState`
2. Harus tidak ada warning navigation API
3. Semua navigation menggunakan SvelteKit API

### 7. **Test Database Queries**
1. Login dengan user yang valid
2. Check console untuk database query success
3. Verify role dan branch data ter-load dengan benar
4. Test dengan user yang tidak punya branch

## Monitoring dan Debugging

### 1. **Console Logs**
- Semua error sekarang di-log
- Auth status changes di-track
- Redirect actions di-log

### 2. **Network Tab**
- Check API calls ke Supabase
- Monitor response status
- Track redirect chains

### 3. **Application Tab**
- Check localStorage values
- Monitor auth state
- Track route changes

### 4. **Component State**
- Check loading states
- Monitor flag values
- Track auth check status

### 5. **Console Warnings**
- Monitor untuk `history.pushState` warnings
- Pastikan semua navigation menggunakan SvelteKit API
- Check untuk deprecated browser API usage

### 6. **Database Queries**
- Monitor Supabase query responses
- Check untuk JOIN query errors
- Verify foreign key relationships
- Monitor null value handling

## Kesimpulan

Setelah perbaikan ini:
- ✅ **Tidak ada lagi infinite redirect loop**
- ✅ **Tidak ada lagi infinite loading**
- ✅ **Error handling yang robust**
- ✅ **Null safety untuk semua components**
- ✅ **Flag-based flow control**
- ✅ **Comprehensive error logging**
- ✅ **Local path management di Sidebar**
- ✅ **Loading state control di semua layout**
- ✅ **SvelteKit navigation API usage**
- ✅ **Tidak ada lagi console warnings**
- ✅ **Database queries yang benar**
- ✅ **Proper JOIN relationships**
- ✅ **Null safety untuk branch data**

Sistem sekarang lebih stabil, mudah di-debug, menggunakan SvelteKit best practices, dan memiliki database queries yang robust.

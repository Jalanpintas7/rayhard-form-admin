# Sistem Role Rayhar Travel Admin

## Gambaran Umum

Sistem ini mendukung dua jenis role untuk mengelola akses pengguna menggunakan **satu tabel** `user_branches` yang sudah ada:

### 1. Super Admin
- **Akses**: Penuh ke semua fitur
- **Halaman yang bisa diakses**:
  - Dashboard
  - Admin Panel (semua menu)
  - Pengaturan
  - Semua fitur Umrah dan Pelancongan
- **Branch**: NULL (tidak terikat ke cabang tertentu)

### 2. Admin Branch
- **Akses**: Terbatas hanya ke dashboard
- **Halaman yang bisa diakses**:
  - Dashboard (hanya)
- **Halaman yang tidak bisa diakses**:
  - Admin Panel
  - Semua menu admin lainnya
- **Branch**: Terikat ke cabang tertentu

## Struktur Database

### Tabel `user_branches` (Sudah Ada)
```sql
-- Tabel yang sudah ada dan digunakan
CREATE TABLE user_branches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES branches(id), -- NULL untuk super admin
    role TEXT NOT NULL CHECK (role IN ('admin_branch', 'super_admin')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Keuntungan Menggunakan Satu Tabel
1. **Tidak ada redundansi** - Satu sumber kebenaran untuk role user
2. **Relasi yang jelas** - User bisa terikat ke branch atau tidak
3. **Maintenance mudah** - Hanya satu tabel yang perlu diupdate
4. **Performance lebih baik** - Tidak perlu join multiple tabel
5. **Data consistency** - Tidak ada kemungkinan role berbeda di tabel berbeda

### Tabel `branches`
- Menyimpan informasi cabang
- Terhubung dengan `user_branches` untuk admin branch

## Implementasi Frontend

### Store Auth (`src/lib/stores/auth.js`)
- Menggunakan Supabase untuk autentikasi
- Mengambil role dan branch dari tabel `user_branches`
- Fungsi helper untuk check role

### Komponen Role-Based Access
- `RoleBasedAccess.svelte` - Kontrol akses berdasarkan role
- `UserInfo.svelte` - Tampilkan informasi role dan branch
- Sidebar dan Dashboard menyesuaikan dengan role

### Halaman yang Dihasilkan
- **Dashboard**: Semua role bisa akses
- **Admin Panel**: Hanya super admin
- **Sidebar Menu**: Menyesuaikan dengan role

## Cara Penggunaan

### 1. Login
```javascript
import { login } from '$lib/stores/auth.js';

const result = await login(email, password);
// Role akan otomatis diambil dari tabel user_branches
```

### 2. Check Role
```javascript
import { userRole, isSuperAdmin, isAdminBranch } from '$lib/stores/auth.js';

// Subscribe ke role
userRole.subscribe(role => {
    console.log('Current role:', role);
});

// Check role
if (isSuperAdmin()) {
    // Akses admin panel
}

if (isAdminBranch()) {
    // Hanya dashboard
}
```

### 3. Role-Based Access Control
```svelte
<script>
import RoleBasedAccess from '$lib/components/RoleBasedAccess.svelte';
</script>

<!-- Hanya super admin yang bisa lihat -->
<RoleBasedAccess allowedRoles={['super_admin']}>
    <AdminPanel />
</RoleBasedAccess>

<!-- Admin branch dan super admin -->
<RoleBasedAccess allowedRoles={['admin_branch', 'super_admin']}>
    <Dashboard />
</RoleBasedAccess>
```

## Testing

### User Test yang Tersedia
1. **Super Admin**: `asyraf.rayhar@gmail.com`
   - Role: `super_admin`
   - Branch: `NULL` (tidak terikat ke cabang)
   - Akses: Penuh

2. **Admin Branch**: `nathalieya.rayhar@gmail.com`
   - Role: `admin_branch`
   - Branch: `Jertih`
   - Akses: Hanya dashboard

### Test Case
1. Login sebagai Super Admin
   - Bisa akses dashboard
   - Bisa akses admin panel
   - Semua menu tersedia
   - Tidak terikat ke cabang tertentu

2. Login sebagai Admin Branch
   - Bisa akses dashboard
   - Tidak bisa akses admin panel
   - Menu admin tersembunyi
   - Terikat ke cabang "Jertih"

## Keamanan

- Role disimpan di tabel `user_branches` yang sudah ada
- Frontend tidak bisa memanipulasi role
- Setiap request ke admin panel dicek role
- RLS (Row Level Security) bisa diaktifkan di Supabase

## Deployment

1. Tabel `user_branches` sudah ada dan siap digunakan
2. Data test user sudah diinsert
3. Sistem role sudah terintegrasi dengan Supabase
4. Test login dengan berbagai role

## Troubleshooting

### Role tidak muncul
- Check apakah user ada di tabel `user_branches`
- Pastikan `branch_id` sesuai untuk admin branch
- Pastikan `role` sesuai dengan yang diharapkan

### Admin panel tidak muncul
- Check role user di tabel `user_branches`
- Pastikan role = 'super_admin'

### Error autentikasi
- Check Supabase credentials
- Pastikan user sudah terdaftar di auth.users
- Pastikan user ada di tabel user_branches

## Kesimpulan

Dengan menggunakan tabel `user_branches` yang sudah ada, kita mendapatkan:
- **Sistem yang lebih sederhana** - Satu tabel untuk role dan branch
- **Maintenance yang mudah** - Tidak ada duplikasi data
- **Performance yang lebih baik** - Tidak perlu join multiple tabel
- **Data consistency** - Satu sumber kebenaran untuk role user

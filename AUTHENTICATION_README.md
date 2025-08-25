# Sistem Autentikasi Rayhar Travel Admin

## Gambaran Umum

Sistem ini telah diimplementasikan dengan fitur autentikasi yang memastikan pengguna harus login terlebih dahulu sebelum dapat mengakses dashboard dan halaman admin.

## Fitur Utama

### 1. Halaman Login
- **Lokasi**: `/login`
- **Fitur**: 
  - Form login dengan validasi email dan password
  - Credentials demo: `admin@rayhar.com` / `admin123`
  - Redirect otomatis ke dashboard setelah login berhasil
  - Mencegah akses jika sudah terautentikasi

### 2. Halaman Dashboard
- **Lokasi**: `/dashboard`
- **Fitur**:
  - Hanya dapat diakses setelah login
  - Tombol logout untuk keluar dari sistem
  - Redirect otomatis ke login jika tidak terautentikasi

### 3. Halaman Admin
- **Lokasi**: `/admin`
- **Fitur**:
  - Hanya dapat diakses setelah login
  - Dilindungi dengan AuthGuard
  - Redirect otomatis ke login jika tidak terautentikasi

## Komponen Autentikasi

### AuthGuard.svelte
- Melindungi halaman yang memerlukan autentikasi
- Redirect ke `/login` jika tidak terautentikasi
- Menampilkan loading spinner saat memeriksa status

### LoginGuard.svelte
- Mencegah pengguna yang sudah login mengakses halaman login
- Redirect ke `/dashboard` jika sudah terautentikasi

### Store Autentikasi (`src/lib/stores/auth.js`)
- `isAuthenticated`: Status login pengguna
- `user`: Data pengguna yang sedang login
- `login()`: Fungsi untuk proses login
- `logout()`: Fungsi untuk proses logout
- `checkAuthStatus()`: Memeriksa status autentikasi dari localStorage

## Alur Kerja

### 1. Akses Pertama
1. Pengguna mengakses website
2. Sistem memeriksa status autentikasi
3. Jika tidak terautentikasi → redirect ke `/login`
4. Jika sudah terautentikasi → akses ke dashboard

### 2. Proses Login
1. Pengguna memasukkan email dan password
2. Sistem memvalidasi credentials
3. Jika berhasil → set status autentikasi dan redirect ke dashboard
4. Jika gagal → tampilkan pesan error

### 3. Akses Dashboard
1. Pengguna dapat mengakses semua fitur dashboard
2. Tombol logout tersedia di header
3. Data autentikasi tersimpan di localStorage

### 4. Proses Logout
1. Pengguna klik tombol logout
2. Konfirmasi logout
3. Hapus data autentikasi
4. Redirect ke halaman login

## Keamanan

- **Local Storage**: Data autentikasi disimpan di browser
- **Route Protection**: Semua halaman admin dilindungi dengan AuthGuard
- **Auto Redirect**: Redirect otomatis berdasarkan status autentikasi
- **Session Persistence**: Status login bertahan setelah refresh halaman

## Penggunaan

### Untuk Developer
1. Import `AuthGuard` untuk halaman yang memerlukan autentikasi
2. Import `LoginGuard` untuk halaman login
3. Gunakan store autentikasi untuk mengelola status login

### Untuk User
1. Akses website → otomatis diarahkan ke login
2. Login dengan credentials yang valid
3. Akses dashboard dan fitur admin
4. Logout ketika selesai

## File yang Terlibat

- `src/lib/stores/auth.js` - Store autentikasi
- `src/lib/components/AuthGuard.svelte` - Komponen pelindung halaman
- `src/lib/components/LoginGuard.svelte` - Komponen pelindung login
- `src/routes/login/+page.svelte` - Halaman login
- `src/routes/dashboard/+page.svelte` - Halaman dashboard
- `src/routes/admin/+page.svelte` - Halaman admin
- `src/routes/+page.svelte` - Halaman utama (redirect ke login)

## Catatan Penting

- Credentials demo hanya untuk testing
- Dalam production, implementasikan backend API yang proper
- Gunakan HTTPS untuk keamanan data
- Implementasikan refresh token untuk keamanan tambahan
- Tambahkan rate limiting untuk mencegah brute force attack

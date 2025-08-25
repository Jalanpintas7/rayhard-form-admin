# Rayhar Travel Admin Dashboard

## Gambaran Umum
Sistem admin dashboard untuk Rayhar Travel yang menyediakan pengurusan pelanggan, destinasi, dan statistik perjalanan Umrah dan Pelancongan.

## Struktur Routing

### 📊 Halaman Utama (Dashboard)
- **Route**: `/` (root)
- **File**: `src/routes/+page.svelte`
- **Fungsi**: Halaman dashboard utama dengan statistik dan data
- **Fitur**: Statistik, grafik, tabel pelanggan, dan navigasi ke admin panel

### 🔐 Halaman Login
- **Route**: `/login`
- **File**: `src/routes/login/+page.svelte`
- **Fungsi**: Halaman login yang terpisah
- **Fitur**: Form login dengan validasi, loading state, dan redirect otomatis

### 📊 Dashboard Detail
- **Route**: `/dashboard`
- **File**: `src/routes/dashboard/+page.svelte`
- **Fungsi**: Halaman dashboard yang sama dengan halaman utama
- **Fitur**: Statistik, grafik, tabel pelanggan, dan navigasi ke admin panel

### ⚙️ Admin Panel
- **Route**: `/admin/*`
- **File**: `src/routes/admin/+layout.svelte` dan sub-routes
- **Fungsi**: Panel admin dengan sidebar navigation
- **Fitur**: Pengurusan pelanggan, destinasi, musim, dan pengaturan

## Alur Penggunaan

1. **Pengguna membuka website** → Langsung ke halaman dashboard (`/`)
2. **Akses login** → Klik "Log Masuk" untuk ke halaman login (`/login`)
3. **Login berhasil** → Redirect otomatis ke dashboard (`/dashboard`)
4. **Akses admin panel** → Klik "Admin Panel" dari dashboard
5. **Logout** → Kembali ke halaman dashboard utama

## Fitur Login

### 🔐 Keamanan
- Validasi email format
- Password visibility toggle
- Loading state dengan spinner
- Error handling yang informatif
- Success feedback sebelum redirect

### 🎨 Antarmuka
- Design yang modern dan responsif
- Tema warna Rayhar Travel
- Animasi slide-up dan hover effects
- Auto-focus pada input email

### 📱 Responsivitas
- Mobile-first design
- Breakpoint yang optimal
- Touch-friendly interface

## Kredensial Demo

```
Email: admin@rayhar.com
Password: admin123
```

## Teknologi

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS
- **Icons**: Custom icon system
- **Routing**: File-based routing SvelteKit

## Struktur File

```
src/routes/
├── +page.svelte              # Halaman dashboard utama (root)
├── +layout.svelte            # Layout utama
├── login/                    # Halaman login
│   ├── +page.svelte         # Form login
│   └── +layout.svelte       # Layout login
├── dashboard/                # Dashboard detail
│   ├── +page.svelte         # Dashboard (sama dengan root)
│   └── +layout.svelte       # Layout dashboard
├── admin/                    # Admin panel routes
│   ├── +layout.svelte       # Layout admin dengan sidebar
│   ├── +page.svelte         # Admin overview
│   ├── customers/           # Pengurusan pelanggan
│   ├── destinations/        # Pengurusan destinasi
│   ├── seasons/             # Pengurusan musim
│   └── settings/            # Pengaturan sistem
└── lib/
    ├── components/           # Komponen UI
    ├── icons.svelte         # Sistem icon
    └── utils/               # Utility functions
```

## Fitur Dashboard

### 📊 Statistik
- Total pelanggan
- Pelanggan Umrah vs Pelancongan
- Destinasi aktif
- Trend pertumbuhan

### 📈 Grafik & Visualisasi
- Top Sales Consultant
- Destinasi popular
- Trend bulanan

### 📋 Tabel Data
- Pelanggan terbaru
- Status booking
- Informasi pakej

## Keamanan

- **Authentication**: Login required untuk dashboard
- **Session Management**: Redirect otomatis setelah login
- **Input Validation**: Validasi form yang ketat
- **Error Handling**: Pesan error yang aman

## Responsivitas

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## Customization

### Warna Tema
- **Primary**: `#921E8D` (Ungu)
- **Secondary**: `#FFF00C` (Kuning)
- **Accent**: `#AC2EAC` (Ungu Muda)

### Komponen
- Custom button styles
- Card components dengan shadow
- Statistik cards dengan border
- Responsive grid layouts

## Development

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

## Deployment

- **Platform**: Vercel, Netlify, atau hosting static
- **Build Command**: `npm run build`
- **Output Directory**: `build/`
- **Environment**: Node.js 18+

## Roadmap

### Fitur Masa Depan
- [ ] Two-factor authentication (2FA)
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode theme

### Peningkatan
- [ ] Progressive Web App (PWA)
- [ ] Offline capability
- [ ] Advanced search & filtering
- [ ] Export data functionality

## Kontribusi

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## Lisensi

© 2024 Rayhar Travel. Hak cipta terpelihara.

---

**Nota**: Sistem ini direka untuk pengurusan agensi travel dengan fokus pada pakej Umrah dan Pelancongan. Semua data adalah demo dan tidak mewakili data sebenar.

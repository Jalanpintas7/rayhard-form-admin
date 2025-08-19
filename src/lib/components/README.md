# Komponen Rayhar Admin

Koleksi komponen yang responsif dan dapat digunakan kembali untuk aplikasi admin Rayhar Travel.

## Daftar Komponen

### Layout Components

#### Navbar.svelte
Komponen navbar untuk mobile yang menampilkan tombol hamburger dan logo.

**Props:**
- `isSidebarOpen` (boolean): Status sidebar terbuka/tertutup
- `isMobile` (boolean): Status device mobile

**Events:**
- `toggle`: Event untuk toggle sidebar

#### Sidebar.svelte
Komponen sidebar dengan navigasi lengkap untuk admin panel.

**Props:**
- `isSidebarOpen` (boolean): Status sidebar terbuka/tertutup
- `isMobile` (boolean): Status device mobile

**Events:**
- `toggle`: Event untuk toggle sidebar

### Dashboard Components

#### PageHeader.svelte
Komponen header halaman dengan title dan subtitle.

**Props:**
- `title` (string): Judul halaman
- `subtitle` (string): Subtitle halaman (opsional)

#### StatCard.svelte
Komponen card untuk menampilkan statistik dengan icon dan pertumbuhan.

**Props:**
- `title` (string): Judul statistik
- `value` (number): Nilai statistik
- `growth` (number): Persentase pertumbuhan
- `growthText` (string): Teks tambahan untuk pertumbuhan
- `icon` (string): Nama icon
- `iconBgColor` (string): Warna background icon
- `iconColor` (string): Warna icon
- `growthColor` (string): Warna pertumbuhan
- `growthIcon` (string): Icon pertumbuhan

#### ChartCard.svelte
Komponen card untuk menampilkan grafik dengan legend.

**Props:**
- `title` (string): Judul grafik
- `legend` (array): Array legend items
- `data` (array): Data untuk grafik
- `type` (string): Tipe grafik (bar, line, pie)

#### DestinationCard.svelte
Komponen card untuk menampilkan daftar destinasi popular.

**Props:**
- `destinations` (array): Array data destinasi

#### CustomerTable.svelte
Komponen tabel responsif untuk menampilkan data pelanggan.

**Props:**
- `customers` (array): Array data pelanggan

### Form Components

#### FormCard.svelte
Komponen card untuk form dengan title dan subtitle.

**Props:**
- `title` (string): Judul form
- `subtitle` (string): Subtitle form (opsional)

#### Button.svelte
Komponen button dengan berbagai variant dan ukuran.

**Props:**
- `variant` (string): Variant button (primary, secondary, outline, danger)
- `size` (string): Ukuran button (sm, md, lg)
- `disabled` (boolean): Status disabled
- `type` (string): Tipe button
- `fullWidth` (boolean): Full width button

#### Input.svelte
Komponen input dengan label dan error handling.

**Props:**
- `type` (string): Tipe input
- `label` (string): Label input
- `placeholder` (string): Placeholder text
- `value` (string): Nilai input
- `error` (string): Pesan error
- `required` (boolean): Required field
- `disabled` (boolean): Status disabled
- `fullWidth` (boolean): Full width input

### UI Components

#### DataCard.svelte
Komponen card untuk menampilkan data dengan icon dan actions.

**Props:**
- `title` (string): Judul card
- `subtitle` (string): Subtitle card
- `icon` (string): Path SVG icon
- `iconColor` (string): Warna icon
- `iconBgColor` (string): Background color icon
- `actions` (array): Array action buttons

#### Badge.svelte
Komponen badge untuk menampilkan status atau label.

**Props:**
- `variant` (string): Variant badge (default, success, warning, danger, info, umrah, pelancongan)
- `size` (string): Ukuran badge (sm, md, lg)

## Penggunaan

```javascript
import { 
  Navbar, 
  Sidebar, 
  StatCard, 
  ChartCard, 
  Button, 
  Input,
  Badge 
} from '$lib/components';
```

## Responsivitas

Semua komponen telah didesain responsif dengan breakpoint:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Styling

Komponen menggunakan Tailwind CSS dengan custom color scheme:
- Primary: `#921E8D` (Ungu)
- Secondary: `#FFF00C` (Kuning)
- Tambahan ungu: `#AC2EAC`, `#C964C9`, `#FF97FF`
- Tambahan kuning: `#FAF55A`, `#FAFF97`, `#FFFFC9`

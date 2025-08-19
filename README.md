# Rayhar Travel Admin Panel

Panel admin yang responsif untuk Rayhar Travel dengan komponen-komponen yang dapat digunakan kembali.

## 🚀 Fitur

- **Responsif**: Didesain untuk desktop, tablet, dan mobile
- **Komponen Modular**: Koleksi komponen yang dapat digunakan kembali
- **Modern UI**: Menggunakan Tailwind CSS dengan custom design system
- **SvelteKit**: Dibangun dengan SvelteKit untuk performa optimal
- **TypeScript Ready**: Siap untuk implementasi TypeScript

## 📱 Responsivitas

Aplikasi ini responsif dengan breakpoint berikut:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎨 Design System

### Warna Utama
- **Primary**: `#8E2168` (Ungu)
- **Secondary**: `#462365` (Ungu Gelap)
- **Accent**: `#E3BE1D` (Kuning)

### Komponen yang Tersedia

#### Layout Components
- `Navbar.svelte` - Navbar responsif untuk mobile
- `Sidebar.svelte` - Sidebar dengan navigasi lengkap

#### Dashboard Components
- `PageHeader.svelte` - Header halaman dengan title dan subtitle
- `StatCard.svelte` - Card untuk menampilkan statistik
- `ChartCard.svelte` - Card untuk menampilkan grafik
- `DestinationCard.svelte` - Card untuk daftar destinasi
- `CustomerTable.svelte` - Tabel responsif untuk data pelanggan

#### Form Components
- `FormCard.svelte` - Card untuk form dengan title
- `Button.svelte` - Button dengan berbagai variant
- `Input.svelte` - Input field dengan label dan error handling

#### UI Components
- `DataCard.svelte` - Card untuk menampilkan data dengan actions
- `Badge.svelte` - Badge untuk status atau label

## 🛠️ Instalasi

```bash
# Clone repository
git clone <repository-url>
cd admin-rayhar

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Struktur Komponen

```
src/lib/components/
├── index.js                 # Export semua komponen
├── README.md               # Dokumentasi komponen
├── Navbar.svelte           # Navbar responsif
├── Sidebar.svelte          # Sidebar navigasi
├── PageHeader.svelte       # Header halaman
├── StatCard.svelte         # Card statistik
├── ChartCard.svelte        # Card grafik
├── DestinationCard.svelte  # Card destinasi
├── CustomerTable.svelte    # Tabel pelanggan
├── FormCard.svelte         # Card form
├── Button.svelte           # Komponen button
├── Input.svelte            # Komponen input
├── DataCard.svelte         # Card data
└── Badge.svelte            # Komponen badge
```

## 🔧 Penggunaan Komponen

### Import Komponen
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

### Contoh Penggunaan
```svelte
<script>
  import { StatCard, Button, Badge } from '$lib/components';
  
  let stats = {
    totalCustomers: 1247,
    growthRate: 12.5
  };
</script>

<StatCard 
  title="Total Pelanggan"
  value={stats.totalCustomers}
  growth={stats.growthRate}
  growthText="dari bulan lalu"
  icon="users"
/>

<Button variant="primary" size="lg">
  Tambah Data
</Button>

<Badge variant="success">Aktif</Badge>
```

## 📱 Responsive Features

### Mobile-First Design
- Sidebar otomatis tersembunyi di mobile
- Tabel berubah menjadi card layout di mobile
- Grid layout menyesuaikan ukuran layar
- Touch-friendly interface

### Breakpoint System
```css
/* Mobile */
@media (max-width: 767px) { ... }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }
```

## 🎯 Best Practices

### Penggunaan Komponen
1. **Gunakan komponen yang sudah ada** sebelum membuat yang baru
2. **Ikuti naming convention** yang konsisten
3. **Gunakan props yang tersedia** untuk kustomisasi
4. **Test responsivitas** di berbagai ukuran layar

### Styling
1. **Gunakan utility classes** Tailwind CSS
2. **Ikuti design system** yang sudah ditetapkan
3. **Gunakan custom CSS** hanya jika diperlukan
4. **Test di berbagai browser** dan device

## 🔄 State Management

Komponen menggunakan Svelte's reactive system:
- **Props**: Untuk data yang diterima dari parent
- **Events**: Untuk komunikasi ke parent component
- **Reactive statements**: Untuk computed values

## 📊 Performance

- **Lazy loading** untuk komponen besar
- **Optimized images** dan assets
- **Minimal bundle size** dengan tree shaking
- **Efficient re-renders** dengan Svelte reactivity

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📝 Dokumentasi

- [Komponen Documentation](./src/lib/components/README.md)
- [API Documentation](./docs/api.md)
- [Styling Guide](./docs/styling.md)

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Untuk dukungan teknis, silakan hubungi:
- Email: support@rayhar.com
- WhatsApp: +60 12-345 6789

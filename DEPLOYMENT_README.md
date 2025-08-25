# Panduan Deployment ke Netlify

## Persiapan

1. Pastikan semua error build sudah diperbaiki
2. Pastikan file `netlify.toml` sudah ada di root project
3. Pastikan file `static/_redirects` sudah ada

## Langkah Deployment

### 1. Push ke GitHub
```bash
git add .
git commit -m "Fix build errors and prepare for deployment"
git push origin main
```

### 2. Deploy ke Netlify

#### Opsi A: Deploy via GitHub Integration (Recommended)
1. Buka [Netlify Dashboard](https://app.netlify.com/)
2. Klik "New site from Git"
3. Pilih GitHub sebagai provider
4. Pilih repository `admin-rayhar`
5. Konfigurasi build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Klik "Deploy site"

#### Opsi B: Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy
netlify deploy --prod --dir=build
```

### 3. Konfigurasi Environment Variables (Jika diperlukan)

Jika aplikasi menggunakan environment variables, tambahkan di Netlify Dashboard:
1. Buka site settings
2. Pilih "Environment variables"
3. Tambahkan variable yang diperlukan

### 4. Verifikasi Deployment

1. Cek apakah semua halaman berfungsi
2. Test fitur login dan navigasi
3. Pastikan semua komponen berfungsi dengan baik

## Troubleshooting

### Build Error
- Pastikan Node.js version 18+ digunakan
- Cek log build di Netlify Dashboard
- Pastikan semua dependencies terinstall

### Routing Error
- Pastikan file `_redirects` ada di folder `static/`
- Pastikan konfigurasi SPA routing sudah benar

### Performance Issues
- File `netlify.toml` sudah mengatur cache headers
- Assets akan di-cache selama 1 tahun
- Gunakan lazy loading untuk komponen besar

## Monitoring

Setelah deployment, monitor:
- Build status di Netlify Dashboard
- Performance metrics
- Error logs
- User analytics (jika ada)

## Update Deployment

Untuk update aplikasi:
1. Push perubahan ke GitHub
2. Netlify akan otomatis rebuild dan deploy
3. Atau trigger manual rebuild dari dashboard

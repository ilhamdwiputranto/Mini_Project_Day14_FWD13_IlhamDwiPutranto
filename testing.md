# Laporan Pengujian (Testing) - Sistem Checkout Produk Sederhana

Dokumentasi ini memuat laporan hasil pengujian fungsi `hitungCheckout(harga, jumlah, isMember)` berdasarkan **8 skenario wajib** yang ditetapkan dalam panduan tugas. Seluruh skenario telah dieksekusi dan diverifikasi.

---

## 1. Ringkasan Eksekusi Pengujian

- **Target Pengujian**: Fungsi JavaScript `hitungCheckout(harga, jumlah, isMember)`
- **Jumlah Skenario**: 8 Skenario Uji Wajib
- **Tingkat Keberhasilan**: 100% (8 dari 8 Skenario Berhasil / PASSED)
- **Lingkungan Pengujian**: Node.js

---

## 2. Rincian Skenario Pengujian

### Skenario 1: Pembeli Status Member

- **Tujuan**: Memastikan diskon 10% dihitung dengan benar untuk pelanggan berstatus member.
- **Input**:
  - `harga`: `50000`
  - `jumlah`: `2`
  - `isMember`: `true`
- **Hasil yang Diharapkan**:
  - Subtotal: Rp100.000
  - Diskon (10%): Rp10.000
  - Total Setelah Diskon: Rp90.000
  - Ongkos Kirim: Rp15.000 (karena total setelah diskon < Rp250.000)
  - Total Pembayaran: **Rp105.000**
- **Hasil Aktual**: `Subtotal: Rp100.000, Diskon: Rp10.000, TotalStlhDiskon: Rp90.000, Ongkir: Rp15.000, TotalPembayaran: Rp105.000`
- **Status**: **PASSED**

---

### Skenario 2: Pembeli Status Non-Member

- **Tujuan**: Memastikan pembeli non-member tidak mendapatkan potongan diskon.
- **Input**:
  - `harga`: `50000`
  - `jumlah`: `2`
  - `isMember`: `false`
- **Hasil yang Diharapkan**:
  - Subtotal: Rp100.000
  - Diskon (0%): Rp0
  - Total Setelah Diskon: Rp100.000
  - Ongkos Kirim: Rp15.000
  - Total Pembayaran: **Rp115.000**
- **Hasil Aktual**: `Subtotal: Rp100.000, Diskon: Rp0, TotalStlhDiskon: Rp100.000, Ongkir: Rp15.000, TotalPembayaran: Rp115.000`
- **Status**: **PASSED**

---

### Skenario 3: Total Setelah Diskon Di Bawah Rp250.000

- **Tujuan**: Memastikan ongkos kirim Rp15.000 dikenakan jika total belanja setelah diskon kurang dari Rp250.000.
- **Input**:
  - `harga`: `100000`
  - `jumlah`: `2`
  - `isMember`: `false`
- **Hasil yang Diharapkan**:
  - Subtotal: Rp200.000
  - Diskon: Rp0
  - Total Setelah Diskon: Rp200.000 (< Rp250.000)
  - Ongkos Kirim: Rp15.000
  - Total Pembayaran: **Rp215.000**
- **Hasil Aktual**: `Subtotal: Rp200.000, Diskon: Rp0, TotalStlhDiskon: Rp200.000, Ongkir: Rp15.000, TotalPembayaran: Rp215.000`
- **Status**: **PASSED**

---

### Skenario 4: Total Setelah Diskon Tepat Rp250.000

- **Tujuan**: Memastikan batas ambang (_threshold_) gratis ongkir berlaku jika total belanja tepat Rp250.000.
- **Input**:
  - `harga`: `250000`
  - `jumlah`: `1`
  - `isMember`: `false`
- **Hasil yang Diharapkan**:
  - Subtotal: Rp250.000
  - Diskon: Rp0
  - Total Setelah Diskon: Rp250.000 (>= Rp250.000)
  - Ongkos Kirim: Rp0 (Gratis)
  - Total Pembayaran: **Rp250.000**
- **Hasil Aktual**: `Subtotal: Rp250.000, Diskon: Rp0, TotalStlhDiskon: Rp250.000, Ongkir: Rp0, TotalPembayaran: Rp250.000`
- **Status**: **PASSED**

---

### Skenario 5: Total Setelah Diskon Di Atas Rp250.000

- **Tujuan**: Memastikan kombinasi diskon member dan fasilitas bebas ongkir berjalan secara simultan saat belanja di atas Rp250.000.
- **Input**:
  - `harga`: `300000`
  - `jumlah`: `1`
  - `isMember`: `true`
- **Hasil yang Diharapkan**:
  - Subtotal: Rp300.000
  - Diskon (10%): Rp30.000
  - Total Setelah Diskon: Rp270.000 (>= Rp250.000)
  - Ongkos Kirim: Rp0 (Gratis)
  - Total Pembayaran: **Rp270.000**
- **Hasil Aktual**: `Subtotal: Rp300.000, Diskon: Rp30.000, TotalStlhDiskon: Rp270.000, Ongkir: Rp0, TotalPembayaran: Rp270.000`
- **Status**: **PASSED**

---

### Skenario 6: Jumlah Produk Bernilai 0

- **Tujuan**: Memastikan validasi menolak jumlah produk bernilai nol (`0`).
- **Input**:
  - `harga`: `50000`
  - `jumlah`: `0`
  - `isMember`: `true`
- **Hasil yang Diharapkan**: Pesan error `"Input tidak valid: Jumlah produk harus berupa bilangan bulat positif."`
- **Hasil Aktual**: `"Input tidak valid: Jumlah produk harus berupa bilangan bulat positif."`
- **Status**: **PASSED**

---

### Skenario 7: Jumlah Produk Berupa Angka Pecahan

- **Tujuan**: Memastikan validasi menolak jumlah produk bernilai desimal/pecahan (`2.5`).
- **Input**:
  - `harga`: `50000`
  - `jumlah`: `2.5`
  - `isMember`: `true`
- **Hasil yang Diharapkan**: Pesan error `"Input tidak valid: Jumlah produk harus berupa bilangan bulat positif."`
- **Hasil Aktual**: `"Input tidak valid: Jumlah produk harus berupa bilangan bulat positif."`
- **Status**: **PASSED**

---

### Skenario 8: Harga Produk Tidak Valid (Angka Negatif)

- **Tujuan**: Memastikan validasi menolak harga produk bernilai negatif (`-50000`).
- **Input**:
  - `harga`: `-50000`
  - `jumlah`: `2`
  - `isMember`: `false`
- **Hasil yang Diharapkan**: Pesan error `"Input tidak valid: Harga harus berupa angka positif."`
- **Hasil Aktual**: `"Input tidak valid: Harga harus berupa angka positif."`
- **Status**: **PASSED**

---

## 3. Analisis Kesimpulan Pengujian

1. **Keandalan Validasi Input**: Pengujian skenario 6, 7, dan 8 membuktikan fungsi mampu menghentikan kalkulasi secara dini (_fail-early_) apabila menemukan data input yang tidak sah (harga negatif, jumlah nol, atau jumlah pecahan).
2. **Kepatuhan Logika Diskon & Ongkir**: Pengujian skenario 1 hingga 5 membuktikan bahwa persentase diskon member (10%) dan kriteria batas ambang gratis ongkos kirim (Rp250.000) dihitung secara presisi dan sesuai dengan aturan bisnis yang ditetapkan.

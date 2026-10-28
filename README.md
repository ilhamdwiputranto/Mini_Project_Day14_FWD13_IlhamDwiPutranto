# Mini Project Full-Stack: Sistem Checkout Produk Sederhana

---

## 👤 Profile

- **Nama Peserta:** Ilham Dwi Putranto
- **Program:** Full-Stack Web Development Batch 13 [FWD13]
- **Topik:** Computational Thinking, Flowchart, Pseudocode, dan JavaScript Dasar

---

## 📌 Deskripsi Case Study

Proyek ini merupakan **Sistem Checkout Produk Sederhana** berbasis JavaScript Vanilla yang dibuat untuk menghitung total pembayaran dalam transaksi e-commerce. Sistem menerima tiga argumen masukan:

1. `harga`: Harga per unit produk (harus numerik positif > 0).
2. `jumlah`: Jumlah unit produk yang dibeli (harus bilangan bulat positif > 0).
3. `isMember`: Status keanggotaan pengguna (`true` untuk member, `false` untuk non-member).

### **Aturan Bisnis (Business Rules):**

1. **Validasi Input:** Jika `harga <= 0` atau `jumlah` bukan bilangan bulat positif, sistem mengembalikan pesan kesalahan (_error message_) dan membatalkan kalkulasi.
2. **Subtotal:** Hasil perkalian `harga * jumlah`.
3. **Diskon Member:** Potongan 10% dari subtotal khusus untuk pengguna berstatus member (`isMember = true`). Non-member tidak mendapatkan diskon (0%).
4. **Ongkos Kirim:** Gratis (Rp0) apabila total pembayaran setelah diskon mencapai minimal **Rp250.000**. Jika di bawah Rp250.000, dikenakan ongkir **Rp15.000**.
5. **Total Pembayaran:** Total akhir yang dihitung dari Total Setelah Diskon + Ongkos Kirim.

---

## 📁 Struktur File Repository (Deliverables)

```text
.
├── README.md                # Dokumentasi utama proyek & petunjuk penggunaan
├── analysis.md              # Dokumen Computational Thinking (Decomposition, Pattern, Abstraction)
├── flowchart.drawio         # File diagram mentah (draw.io)
├── flowchart.png            # Hasil ekspor diagram flowchart dalam bentuk gambar
├── pseudocode.md            # Rincian algoritma pseudocode yang konsisten dengan flowchart
├── checkout.js              # Fungsi utama hitungCheckout() & suite pengujian 8 skenario otomatis
├── checkout_interactive.js  # Skrip JavaScript interaktif untuk input live melalui terminal CLI
└── testing.md               # Laporan pengujian lengkap berisi 8 skenario wajib
```

---

## 🚀 Cara Menjalankan Program

### Prasyarat:

- Memiliki **Node.js** terinstal di komputer.

### 1. Menjalankan Program Interaktif (Input Live via Terminal CLI)

Untuk menginputkan data transaksi secara langsung (_live input_) melalui prompt terminal:

```bash
node checkout_interactive.js
```

### 2. Menjalankan Pengujian 8 Skenario Wajib (Otomatis)

Untuk menjalankan suite pengujian otomatis pada 8 skenario uji:

```bash
node checkout.js
```

---

## 🤖 Ringkasan Penggunaan AI (AI Partner Usage)

Sesuai dengan ketentuan assignment, AI digunakan sebagai **partner diskusi, perancang diagram, dan reviewer logika**:

- **Perancangan Algoritma & Edge Cases:** Mendiskusikan penanganan batas validasi input (seperti pecahan desimal dan angka nol).
- **Review Logika:** Memastikan keselarasan alur antara _flowchart_, _pseudocode_, dan _kode JavaScript_.

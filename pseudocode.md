# Pseudocode - Sistem Checkout Produk Sederhana

Dokumentasi ini berisi algoritma _pseudocode_ untuk fungsi `hitungCheckout(harga, jumlah, isMember)` yang merepresentasikan alur logika sistem checkout produk e-commerce sederhana.

---

## 1. Spesifikasi Algoritma

- **Nama Algoritma**: `HitungCheckout`
- **Input**:
  - `harga` (_number_): Harga per unit produk (harus angka positif > 0)
  - `jumlah` (_number_): Jumlah produk yang dibeli (harus bilangan bulat positif > 0)
  - `isMember` (_boolean_): Status keanggotaan pelanggan (`TRUE` jika member, `FALSE` jika non-member)
- **Output**:
  - Objek hasil perhitungan (`subtotal`, `diskon`, `totalSetelahDiskon`, `ongkir`, `totalPembayaran`) **ATAU**
  - String pesan kesalahan `"Input tidak valid"` jika salah satu argumen tidak memenuhi syarat.

---

## 2. Struktur Pseudocode

```text
ALGORITHM HitungCheckout
  INPUT: harga (number), jumlah (number), isMember (boolean)
  OUTPUT: object (subtotal, diskon, totalSetelahDiskon, ongkir, totalPembayaran) ATAU string error

  BEGIN
    // Step 1: Validasi Input Harga
    IF harga IS NOT NUMBER OR harga <= 0 THEN
      RETURN "Input tidak valid: Harga harus berupa angka positif."
    ENDIF

    // Step 2: Validasi Input Jumlah (Harus bilangan bulat positif)
    IF jumlah IS NOT NUMBER OR jumlah <= 0 OR jumlah IS NOT INTEGER THEN
      RETURN "Input tidak valid: Jumlah produk harus berupa bilangan bulat positif."
    ENDIF

    // Step 3: Normalisasi Status Member
    statusMember = BOOLEAN(isMember)

    // Step 4: Hitung Subtotal
    subtotal = harga * jumlah

    // Step 5: Hitung Diskon Member (10% untuk member, 0% untuk non-member)
    IF statusMember IS TRUE THEN
      diskon = subtotal * 0.10
    ELSE
      diskon = 0
    ENDIF

    totalSetelahDiskon = subtotal - diskon

    // Step 6: Hitung Ongkos Kirim (Gratis jika total setelah diskon >= 250.000)
    IF totalSetelahDiskon >= 250000 THEN
      ongkir = 0
    ELSE
      ongkir = 15000
    ENDIF

    // Step 7: Hitung Total Pembayaran
    totalPembayaran = totalSetelahDiskon + ongkir

    // Step 8: Kembalikan Rincian Perhitungan
    RETURN {
      subtotal: subtotal,
      diskon: diskon,
      totalSetelahDiskon: totalSetelahDiskon,
      ongkir: ongkir,
      totalPembayaran: totalPembayaran
    }
  END
```

---

## 3. Penjelasan Alur Logika

1. **Validasi Input (_Fail-Early_)**: Algoritma memeriksa `harga` dan `jumlah` terlebih dahulu. Jika ditemukan input yang bernilai nol, negatif, atau berformat desimal untuk jumlah barang, fungsi langsung menghentikan proses dan mengembalikan pesan error.
2. **Kalkulasi Subtotal**: Menghitung total biaya kasar dengan mengalikan harga unit dan jumlah unit.
3. **Penerapan Diskon Member**: Mengecek `statusMember`. Jika `TRUE`, pelanggan mendapatkan diskon sebesar 10% dari subtotal ($0.10 \times \text{subtotal}$).
4. **Penentuan Ongkos Kirim**: Mengevaluasi `totalSetelahDiskon`. Jika bernilai minimal **Rp250.000**, biaya ongkos kirim diset ke **0 (Gratis)**. Jika di bawah Rp250.000, ongkir diset ke **Rp15.000**.
5. **Total Pembayaran**: Menjumlahkan `totalSetelahDiskon` dengan `ongkir` untuk mendapatkan total tagihan akhir.

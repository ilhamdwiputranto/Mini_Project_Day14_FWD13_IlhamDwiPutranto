### Analisis Computational Thinking

---

#### Case Study: Sistem Checkout Produk Sederhana

---

##### 1\. Pendahuluan

Dokumen ini menyajikan analisis **Computational Thinking** untuk perancangan **Sistem Checkout Produk Sederhana**. Analisis ini menjadi fondasi dalam pembuatan _flowchart_ , _pseudocode_, dan implementasi fungsi pada JavaScript (checkout.js).

---

##### 2\. Problem Decomposition (Pemecahan Masalah)

Masalah utama sistem checkout diuraikan menjadi komponen-komponen kecil sebagai berikut:

###### _A. Input_

Sistem menerima 3 (tiga) argumen/variabel input:

1. harga ( _number_ ): Harga per unit produk.
2. jumlah ( _number_ ): Jumlah produk yang dibeli.
3. isMember ( _boolean_ ): Status keanggotaan pengguna (true untuk member, false untuk non-member).

###### _B. Aturan & Validasi Input_

Sebelum melakukan kalkulasi, sistem wajib memastikan validitas input:

- **Aturan Harga:** Harus berupa angka numerik bernilai lebih dari 0 (harga \> 0).
- **Aturan Jumlah:** Harus berupa bilangan bulat positif (jumlah \> 0 dan bernilai integer/bukan desimal/pecahan).
- **Aturan Status Member:** Harus berupa nilai _boolean_ atau dapat dievaluasi secara pasti sebagai true/false.
- **Keluaran Error:** Jika ada input yang melanggar aturan di atas, proses kalkulasi dihentikan dan sistem mengembalikan pesan kesalahan: "Input tidak valid: Harga harus angka positif dan jumlah harus bilangan bulat positif."

###### _C. Proses Kalkulasi Logika_

- **Hitung Subtotal:** Subtotal \= harga \* jumlah
- **Hitung Diskon Member:**
- Jika isMember \=== true: Diskon \= 10% \* Subtotal ( 0.10 \* Subtotal ).
- Jika isMember \=== false: Diskon \= 0 .
- **Total Setelah Diskon:** Total Setelah Diskon \= Subtotal \- Diskon
- **Hitung Ongkos Kirim (Ongkir):**
- Total Setelah Diskon $\geq$ Rp250.000 : Ongkir \= Rp0 (Gratis Ongkir).
- Jika Total Setelah Diskon \< Rp250.000 : Ongkir \= Rp15.000
- **Hitung Total Pembayaran:** Total Pembayaran \= Total Setelah Diskon \+ Ongkos Kirim

###### _D. Output_

Sistem mengembalikan hasil dalam bentuk struktur data terformat (object/string rincian):

- subtotal
- diskon
- totalSetelahDiskon
- ongkir
- totalPembayaran
- status (Success / Error)

---

##### 3\. Pattern Recognition

Dalam sistem e-commerce/checkout, diidentifikasi beberapa pola umum:

- **Pola Percabangan Berantai (Conditional Logic):**
- Validasi Input \-\> Jika gagal, _early return_ error.
- Cek Diskon Member \-\> Dua kondisi (Member vs Non-Member).
- Cek Ambang Batas Free Shipping \-\> Evaluasi _boundary value_ (Rp250.000).
- **Pola Ambang Batas (Boundary Value Pattern):**
- Pengujian tepat pada batas nilai Rp250.000 membedakan perlakuan gratis ongkir vs ongkir berbayar Rp15.000.

---

##### 4\. Abstraksi

Abstraksi dilakukan dengan menyederhanakan kompleksitas dunia nyata e-commerce dan berfokus hanya pada variabel inti yang diminta dalam _case study_ :

- **Elemen yang Diabaikan (Out of Scope):**
- Tampilan antarmuka (UI/Frontend)
- Database produk, stok, dan autentikasi user
- Biaya penanganan/admin, pajak (PPN), voucher promo tambahan
- Pilihan kurir pengiriman dan estimasi waktu sampai
- **Elemen Inti yang Difokuskan (In Scope):**
- Formula matematika perhitungan matematika subtotal, diskon, ongkir, dan total akhir.

---

##### 5\. Algorithm Design (Rancangan Algoritma Sekuensial)

1. Terima input (harga, jumlah, isMember).
2. Periksa apakah harga dan jumlah valid. Jika tidak, kembalikan pesan error.
3. Kalikan harga dengan jumlah untuk memperoleh subtotal.
4. Evaluasi isMember: jika true, diskon \= 10% \* subtotal ; jika false, diskon \= 0 .
5. Kurangi subtotal dengan diskon untuk memperoleh totalSetelahDiskon.
6. Evaluasi totalSetelahDiskon: jika $\geq$ 250.000 , ongkir \= 0 ; jika \< 250.000 , ongkir \= 15.000.
7. Tambahkan totalSetelahDiskon dengan ongkir untuk memperoleh totalPembayaran.
8. Kembalikan rincian rincian pembayaran akhir.

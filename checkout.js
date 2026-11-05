/**
 * Fungsi utama untuk menghitung total checkout produk e-commerce sederhana.
 *
 * @param {number} harga - Harga per unit produk (harus angka positif > 0)
 * @param {number} jumlah - Jumlah barang yang dibeli (harus bilangan bulat positif > 0)
 * @param {boolean} isMember - Status keanggotaan pengguna (true jika member, false jika non-member)
 * @returns {Object|string} Rincian perhitungan checkout atau pesan error jika input tidak valid.
 */
function hitungCheckout(harga, jumlah, isMember) {
  // 1. Validasi Input Harga
  if (typeof harga !== "number" || isNaN(harga) || harga <= 0) {
    return "Input tidak valid: Harga harus berupa angka positif.";
  }

  // 2. Validasi Input Jumlah (harus angka, positif, dan bilangan bulat/integer)
  if (typeof jumlah !== "number" || isNaN(jumlah) || jumlah <= 0 || !Number.isInteger(jumlah)) {
    return "Input tidak valid: Jumlah produk harus berupa bilangan bulat positif.";
  }

  // Normalisasi status member ke boolean
  const statusMember = Boolean(isMember);

  // 3. Hitung Subtotal
  const subtotal = harga * jumlah;

  // 4. Hitung Diskon Member (10% jika member, 0 jika non-member)
  const diskon = statusMember ? subtotal * 0.1 : 0;
  const totalSetelahDiskon = subtotal - diskon;

  // 5. Hitung Ongkos Kirim (Gratis jika total setelah diskon >= Rp250.000, selain itu Rp15.000)
  const ongkir = totalSetelahDiskon >= 250000 ? 0 : 15000;

  // 6. Hitung Total Pembayaran
  const totalPembayaran = totalSetelahDiskon + ongkir;

  // Helper formatter Rupiah
  const formatRupiah = (val) => "Rp" + val.toLocaleString("id-ID");

  // 7. Mengembalikan Objek Hasil Rincian Checkout
  return {
    status: "Success",
    hargaUnit: harga,
    jumlah: jumlah,
    isMember: statusMember,
    subtotal: subtotal,
    diskon: diskon,
    totalSetelahDiskon: totalSetelahDiskon,
    ongkir: ongkir,
    totalPembayaran: totalPembayaran,
    rincianFormatted: {
      subtotal: formatRupiah(subtotal),
      diskon: formatRupiah(diskon),
      totalSetelahDiskon: formatRupiah(totalSetelahDiskon),
      ongkir: formatRupiah(ongkir),
      totalPembayaran: formatRupiah(totalPembayaran),
    },
  };
}

// Ekspor modul jika dijalankan sebagai modul Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = { hitungCheckout };
}

if (typeof require !== "undefined" && require.main === module) {
  console.log("====================================================");
  console.log("===        RUNNING TEST : CHECKOUT SYSTEM        ===");
  console.log("==================================================\n");

  const testCases = [
    { id: 1, name: "Pembeli status Member", args: [50000, 2, true] }, // Expected Output: Total Pembayaran = Rp105.000 (Subtotal: Rp100.000, Diskon: Rp10.000, Ongkir: Rp15.000)
    { id: 2, name: "Pembeli status Non-member", args: [50000, 2, false] }, // Expected Output: Total Pembayaran = Rp115.000 (Subtotal: Rp100.000, Diskon: Rp0, Ongkir: Rp15.000)
    { id: 3, name: "Total setelah diskon di bawah Rp250.000", args: [100000, 2, false] }, // Expected Output: Total Pembayaran = Rp215.000 (Subtotal: Rp200.000, Diskon: Rp0, Ongkir: Rp15.000)
    { id: 4, name: "Total setelah diskon tepat Rp250.000", args: [250000, 1, false] }, // Expected Output: Total Pembayaran = Rp250.000 (Subtotal: Rp250.000, Diskon: Rp0, Ongkir: Rp0 - Gratis Ongkir)
    { id: 5, name: "Total setelah diskon di atas Rp250.000", args: [300000, 1, true] }, // Expected Output: Total Pembayaran = Rp270.000 (Subtotal: Rp300.000, Diskon: Rp30.000, Ongkir: Rp0 - Gratis Ongkir)
    { id: 6, name: "Jumlah produk bernilai 0", args: [50000, 0, true] }, // Expected Output: "Input tidak valid: Jumlah produk harus berupa bilangan bulat positif."
    { id: 7, name: "Jumlah produk berupa angka pecahan", args: [50000, 2.5, true] }, // Expected Output: "Input tidak valid: Jumlah produk harus berupa bilangan bulat positif."
    { id: 8, name: "Harga produk tidak valid (negatif)", args: [-50000, 2, false] }, // Expected Output: "Input tidak valid: Harga harus berupa angka positif."
  ];

  testCases.forEach((tc) => {
    console.log(`[Test ${tc.id}] ${tc.name}`);
    console.log(` Input  : harga=${tc.args[0]}, jumlah=${tc.args[1]}, isMember=${tc.args[2]}`);
    const res = hitungCheckout(...tc.args);
    if (typeof res === "string") {
      console.log(` Output : ${res}`);
    } else {
      console.log(
        ` Output : Total Pembayaran = ${res.rincianFormatted.totalPembayaran} (Subtotal: ${res.rincianFormatted.subtotal}, Diskon: ${res.rincianFormatted.diskon}, Ongkir: ${res.rincianFormatted.ongkir})`,
      );
    }
    console.log("--------------------------------------------------\n");
  });
}

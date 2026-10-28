/**
 * Sistem Checkout Produk Sederhana - Interactive CLI
 * Menggunakan modul Readline Node.js untuk menerima input live yang dinamis.
 */

const readline = require("readline");

// Fungsi utama hitungCheckout
function hitungCheckout(harga, jumlah, isMember) {
  if (typeof harga !== "number" || isNaN(harga) || harga <= 0) {
    return "Input tidak valid: Harga harus berupa angka positif.";
  }

  if (typeof jumlah !== "number" || isNaN(jumlah) || jumlah <= 0 || !Number.isInteger(jumlah)) {
    return "Input tidak valid: Jumlah produk harus berupa bilangan bulat positif.";
  }

  const statusMember = Boolean(isMember);
  const subtotal = harga * jumlah;
  const diskon = statusMember ? subtotal * 0.1 : 0;
  const totalSetelahDiskon = subtotal - diskon;
  const ongkir = totalSetelahDiskon >= 250000 ? 0 : 15000;
  const totalPembayaran = totalSetelahDiskon + ongkir;

  const formatRupiah = (val) => "Rp" + val.toLocaleString("id-ID");

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

// Konfigurasi interface readline untuk input terminal live
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function tanya(pertanyaan) {
  return new Promise((resolve) => {
    rl.question(pertanyaan, (jawaban) => {
      resolve(jawaban.trim());
    });
  });
}

async function jalankanCheckoutInteractive() {
  console.log("\n==================================================");
  console.log("      SISTEM CHECKOUT PRODUK SEDERHANA (Dinamis)   ");
  console.log("==================================================\n");

  let lanjut = true;

  while (lanjut) {
    let harga = 0;
    let jumlah = 0;
    let isMember = false;

    // 1. Loop Validasi Input Harga
    while (true) {
      const inputHarga = await tanya("1. Masukkan harga produk (Rp) : ");
      harga = parseFloat(inputHarga);

      if (!isNaN(harga) && harga > 0) {
        break; // Input valid, lanjut ke jumlah
      }
      console.log("    Error: Harga harus berupa angka positif.\n");
    }

    // 2. Loop Validasi Input Jumlah
    while (true) {
      const inputJumlah = await tanya("2. Masukkan jumlah produk     : ");
      jumlah = Number(inputJumlah);

      if (!isNaN(jumlah) && jumlah > 0 && Number.isInteger(jumlah)) {
        break; // Input valid, lanjut ke member
      }
      console.log("   Error: Jumlah produk harus berupa bilangan bulat positif.\n");
    }

    // 3. Loop Validasi Status Member
    while (true) {
      const inputMember = await tanya("3. Status Member? (y/n)       : ");
      const formattedMember = inputMember.toLowerCase();

      if (["y", "ya", "true", "1"].includes(formattedMember)) {
        isMember = true;
        break;
      } else if (["n", "tidak", "false", "0"].includes(formattedMember)) {
        isMember = false;
        break;
      }
      console.log("   Error: Ketik 'y' untuk Ya atau 'n' untuk Tidak.\n");
    }

    console.log("\n--------------------------------------------------");
    console.log("  MEMPROSES CHECKOUT...");
    console.log("--------------------------------------------------");

    const hasil = hitungCheckout(harga, jumlah, isMember);

    if (typeof hasil === "string") {
      console.log(`  ERROR : ${hasil}`);
    } else {
      console.log("  RINCIAN PEMBAYARAN:");
      console.log(`   - Harga Per Unit     : Rp${harga.toLocaleString("id-ID")}`);
      console.log(`   - Jumlah Barang      : ${jumlah} unit`);
      console.log(`   - Status Member      : ${isMember ? "Member (Diskon 10%)" : "Non-Member (Diskon 0%)"}`);
      console.log("   -----------------------------------------------");
      console.log(`   - Subtotal           : ${hasil.rincianFormatted.subtotal}`);
      console.log(`   - Diskon             : -${hasil.rincianFormatted.diskon}`);
      console.log(`   - Total Stlh Diskon  : ${hasil.rincianFormatted.totalSetelahDiskon}`);
      console.log(`   - Ongkos Kirim       : ${hasil.ongkir === 0 ? "Rp0 (Gratis Ongkir)" : hasil.rincianFormatted.ongkir}`);
      console.log("   ===============================================");
      console.log(`    TOTAL PEMBAYARAN  : ${hasil.rincianFormatted.totalPembayaran}`);
    }

    console.log("==================================================\n");

    // Loop validasi pertanyaan ulang transaksi
    while (true) {
      const ulang = await tanya("Hitung transaksi lain? (y/n)  : ");
      const jawaban = ulang.toLowerCase();

      if (["y", "ya", "true", "1"].includes(jawaban)) {
        console.log("\n");
        break;
      } else if (["n", "tidak", "false", "0"].includes(jawaban)) {
        lanjut = false;
        console.log("\nTerima kasih telah menggunakan Sistem Checkout! \n");
        break;
      } else {
        console.log("   Input tidak valid! Silakan ketik 'y' untuk Ya atau 'n' untuk Tidak.\n");
      }
    }
  }

  rl.close();
}

// Eksekusi program
if (require.main === module) {
  jalankanCheckoutInteractive();
}

module.exports = { hitungCheckout, jalankanCheckoutInteractive };

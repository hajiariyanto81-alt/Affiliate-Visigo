/**
 * GOOGLE APPS SCRIPT - COPY & PASTE KE GOOGLE SHEETS
 * 
 * 1. Buka Google Sheets kamu.
 * 2. Klik menu 'Extensions' -> 'Apps Script'.
 * 3. Hapus semua kode yang ada, lalu paste kode di bawah ini.
 * 4. Klik 'Save' (ikon disket) dan beri nama 'VisiGo Affiliate Receiver'.
 * 5. Klik tombol 'Deploy' -> 'New Deployment'.
 * 6. Pilih type 'Web App'.
 * 7. Deskripsi: 'VisiGo Affiliate Receiver'.
 * 8. Execute as: 'Me'.
 * 9. Who has access: 'Anyone' (PENTING!).
 * 10. Klik 'Deploy'. Copy 'Web App URL' yang muncul.
 * 11. Masukkan URL tersebut ke Secrets/Env Variable 'VITE_GOOGLE_SHEET_URL' di AI Studio.
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Jika sheet masih kosong, buat header
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Tanggal", 
        "Nama Lengkap", 
        "WhatsApp", 
        "Domisili", 
        "Umur", 
        "Sosmed", 
        "Username", 
        "Alasan", 
        "Siap Share", 
        "Komunitas"
      ]);
      
      // Format header jadi Bold
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#004E92").setFontColor("white");
    }
    
    // Tambah baris data baru
    // Format nomor WA agar jadi link klik langsung
    let waNumber = data.whatsapp.toString().replace(/[^0-9]/g, '');
    if (waNumber.startsWith('0')) {
      waNumber = '62' + waNumber.substring(1);
    }
    const waLink = `=HYPERLINK("https://wa.me/${waNumber}", "${data.whatsapp}")`;

    sheet.appendRow([
      new Date(),
      data.nama,
      waLink,
      data.domisili,
      data.umur || "-",
      data.sosmed.join(", "),
      data.username || "-",
      data.alasan,
      data.siapShare,
      data.komunitas
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      message: "Data berhasil disimpan ke Google Sheets!" 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

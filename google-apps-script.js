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
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0]; // Target ke Sheet Pertama (Pendaftaran)
    
    // --- OTOMATIS BUAT HEADER JIKA KOSONG ---
    if (sheet.getLastRow() === 0) {
      var headers = ["Tanggal Daftar", "Nama Lengkap", "WhatsApp", "Domisili", "Umur", "Sosmed Aktif", "Username/Link", "Alasan Bergabung", "Komitmen Share", "Jumlah Komunitas", "Bank/E-Wallet", "No. Rekening", "Link Foto"];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold").setBackground("#004E92").setFontColor("white").setHorizontalAlignment("center").setVerticalAlignment("middle");
      sheet.setFrozenRows(1);
    }

    // --- PROSES FOTO ---
    var fileUrl = "";
    var folderId = "1aNlSSF_K5yn1q7PIl1Qw2l8WErqHNRc2"; 
    if (data.foto && folderId !== "") {
      try {
        var folder = DriveApp.getFolderById(folderId);
        var contentType = data.foto.substring(5, data.foto.indexOf(';'));
        var bytes = Utilities.base64Decode(data.foto.split(',')[1]);
        var blob = Utilities.newBlob(bytes, contentType, data.fotoName || "foto_affiliate.jpg");
        var file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        fileUrl = file.getUrl();
      } catch (fError) {
        fileUrl = "Error Drive: " + fError.toString();
      }
    }

    // --- LOGIKA HYPERLINK ---
    var namaCell = fileUrl ? '=HYPERLINK("' + fileUrl + '", "' + data.nama + '")' : data.nama;
    var waClean = data.whatsapp.toString().replace(/[^0-9]/g, '');
    if (waClean.startsWith('0')) waClean = '62' + waClean.substr(1);
    var waLink = 'https://wa.me/' + waClean;
    var waCell = '=HYPERLINK("' + waLink + '", "' + data.whatsapp + '")';
    
    // --- SIMPAN DATA ---
    sheet.appendRow([
      new Date(), namaCell, waCell, data.domisili, data.umur, data.sosmed.join(", "), 
      data.username, data.alasan, data.siapShare, data.komunitas, data.bankName, data.rekening, fileUrl
    ]);

    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var action = e.parameter.action;
    var whatsapp = e.parameter.whatsapp;
    
    if (action === "cekSaldo") {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheetSales = ss.getSheets()[1]; // Target ke Sheet Kedua (Data Closing)
      
      if (!sheetSales) {
        return ContentService.createTextOutput(JSON.stringify({success: false, message: "Sheet 2 (Data Closing) belum ada!"}))
          .setMimeType(ContentService.MimeType.JSON);
      }

      var data = sheetSales.getDataRange().getValues();
      var results = [];
      var totalKomisi = 0;

      // Format WA Target untuk pencarian
      var waTarget = whatsapp.replace(/[^0-9]/g, '');
      if (waTarget.startsWith('0')) waTarget = '62' + waTarget.substr(1);

      // Loop data mulai baris ke-2 (i=1)
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var waInSheet = row[7] ? row[7].toString().replace(/[^0-9]/g, '') : "";
        if (waInSheet.startsWith('0')) waInSheet = '62' + waInSheet.substr(1);

        if (waInSheet === waTarget) {
          results.push({
            tanggal: row[0],
            customer: row[1],
            produk: row[3],
            komisi: parseFloat(row[5] || 0)
          });
          totalKomisi += parseFloat(row[5] || 0);
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        total: totalKomisi,
        history: results
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({success: false, message: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

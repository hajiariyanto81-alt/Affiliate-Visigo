// --- KONFIGURASI ---
var FOLDER_ID = "1aNlSSF_K5yn1q7PIl1Qw2l8WErqHNRc2"; 

function bersihkanWA(wa) {
  if (!wa) return "";
  var clean = wa.toString().replace(/[^0-9]/g, '');
  if (clean.startsWith('62')) return clean.substring(2);
  if (clean.startsWith('0')) return clean.substring(1);
  return clean;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0]; 
    
    // --- CEK DUPLIKASI WA ---
    var waBaru = bersihkanWA(data.whatsapp);
    var namaBaru = (data.nama || "").toString().toLowerCase().trim();
    
    if (waBaru !== "") {
      var displayData = sheet.getDataRange().getDisplayValues(); // Ambil apa yang tampil di layar
      for (var i = 1; i < displayData.length; i++) {
        var waLama = bersihkanWA(displayData[i][2]); // Kolom C (WhatsApp)
        var namaLama = displayData[i][1].toString().toLowerCase().trim(); // Kolom B (Nama)
        
        // Cek jika WA sama ATAU (Nama sama & WA sama)
        // Disini kita blokir jika WA sudah ada (karena WA harus unik)
        if (waLama === waBaru) {
          return ContentService.createTextOutput(JSON.stringify({
            success: false, 
            message: "Nomor WhatsApp ini sudah terdaftar sebagai Affiliate dengan nama '" + displayData[i][1] + "'. Silakan gunakan nomor lain atau cek saldo kamu."
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }
    
    // Generate Unique ID
    var randomNum = Math.floor(10000 + Math.random() * 90000);
    var affiliateId = "VG-AFF-" + randomNum;

    // --- PROSES FOTO ---
    var fileUrl = "";
    if (data.foto && FOLDER_ID !== "") {
      try {
        var folder = DriveApp.getFolderById(FOLDER_ID);
        var contentType = data.foto.substring(5, data.foto.indexOf(';'));
        var bytes = Utilities.base64Decode(data.foto.split(',')[1]);
        var blob = Utilities.newBlob(bytes, contentType, data.fotoName || "foto_affiliate.jpg");
        var file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        fileUrl = file.getUrl();
      } catch (fError) { fileUrl = "Error Drive: " + fError.toString(); }
    }

    // --- ANTI ERROR FORMULA (Escape Double Quotes & Pakai Titik Koma ;) ---
    var safeNama = (data.nama || "").toString().replace(/"/g, '""');
    var safeWA = (data.whatsapp || "").toString().replace(/"/g, '""');
    
    // --- LOGIKA HYPERLINK (PENTING: Pakai ; bukan ,) ---
    var namaCell = fileUrl ? '=HYPERLINK("' + fileUrl + '"; "' + safeNama + '")' : safeNama;
    var waClean = (data.whatsapp || "").toString().replace(/[^0-9]/g, '');
    if (waClean.startsWith('0')) waClean = '62' + waClean.substr(1);
    var waCell = '=HYPERLINK("https://wa.me/' + waClean + '"; "' + safeWA + '")';
    
    // --- SIMPAN DATA (Urutan Kolom A-P) ---
    var rowData = [
      new Date(),             // A: Tanggal Daftar
      namaCell,               // B: Nama Lengkap (Link Foto)
      waCell,                 // C: WhatsApp (Link Chat)
      data.domisili || "-",   // D: Domisili
      data.umur || "-",       // E: Umur
      (data.sosmed || []).join(", ") || "-", // F: Sosmed Aktif
      data.username || "-",   // G: Username/Link
      data.alasan || "-",     // H: Alasan Bergabung
      data.siapShare || "-",  // I: Komitmen Share
      data.komunitas || "-",  // J: Jumlah Komunitas
      data.referensi || "-",  // K: Referensi Tim VisiGo
      data.area || "-",       // L: VisiGo Area
      data.bankName || "-",   // M: Bank/E-Wallet
      data.rekening || "-",   // N: No. Rekening
      affiliateId,            // O: Affiliate ID
      fileUrl                 // P: Link Foto (Raw)
    ];
    
    sheet.appendRow(rowData);

    // Update Header (Selalu pastikan header benar di baris 1)
    var headers = ["Tanggal Daftar", "Nama Lengkap", "WhatsApp", "Domisili", "Umur", "Sosmed Aktif", "Username/Link", "Alasan Bergabung", "Komitmen Share", "Jumlah Komunitas", "Referensi Tim", "VisiGo Area", "Bank/E-Wallet", "No. Rekening", "Affiliate ID", "Link Foto"];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#004E92").setFontColor("white");

    // Kirim balik ID ke website
    return ContentService.createTextOutput(JSON.stringify({
      success: true, 
      affiliateId: affiliateId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false, 
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var action = e.parameter.action;
    var whatsapp = e.parameter.whatsapp;
    if (action === "cekSaldo") {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheetAffiliates = ss.getSheets()[0];
      var sheetSales = ss.getSheets()[1]; 
      
      var waTarget = bersihkanWA(whatsapp);
      var affiliatorName = "";
      var affiliatorDomisili = "";
      var affiliatorPhoto = "";
      var affiliateId = "";
      
      // Cari data affiliator di Sheet 1
      var affiliateData = sheetAffiliates.getDataRange().getDisplayValues(); // Lebih aman pakai DisplayValues
      for (var j = 1; j < affiliateData.length; j++) {
        var waAff = affiliateData[j][2] ? bersihkanWA(affiliateData[j][2]) : "";
        if (waAff === waTarget && waTarget !== "") {
          affiliatorName = affiliateData[j][1] || ""; // Kolom B
          affiliatorDomisili = affiliateData[j][3] || ""; // Kolom D
          affiliateId = affiliateData[j][14] || ""; // Kolom O
          affiliatorPhoto = affiliateData[j][15] || ""; // Kolom P
          break;
        }
      }
      
      if (!sheetSales) return ContentService.createTextOutput(JSON.stringify({success: false, message: "Sheet 2 belum ada!"})).setMimeType(ContentService.MimeType.JSON);
      var data = sheetSales.getDataRange().getValues();
      var results = [];
      var totalKomisi = 0;
      
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var waInSheet = row[7] ? bersihkanWA(row[7]) : ""; 
        if (waInSheet === waTarget && waTarget !== "") {
          results.push({ tanggal: row[0], customer: row[1], alamat: row[2] || "-", produk: row[3], komisi: parseFloat(row[5] || 0), status: row[8] || "Pending" });
          totalKomisi += parseFloat(row[5] || 0);
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({ 
        success: true, 
        total: totalKomisi, 
        history: results,
        affiliatorName: affiliatorName,
        affiliatorDomisili: affiliatorDomisili,
        affiliatorPhoto: affiliatorPhoto,
        affiliateId: affiliateId
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) { return ContentService.createTextOutput(JSON.stringify({success: false, message: err.toString()})).setMimeType(ContentService.MimeType.JSON); }
}

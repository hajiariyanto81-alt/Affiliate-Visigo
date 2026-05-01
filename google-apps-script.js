/* 
  --- VISIGO AFFILIATE SCRIPT V6 (FINAL) ---
  1. Copy semua kode ini.
  2. Paste ke Editor Google Apps Script Anda.
  3. Pastikan SPREADSHEET_ID sudah benar (sudah saya isi di bawah).
  4. Klik DEPLOY -> NEW DEPLOYMENT -> WHO HAS ACCESS: ANYONE.
*/

var SPREADSHEET_ID = "1Av09z22gSOKyLJW9NZh93xQZgwqWjmLvWs6jTjAMNFQ"; 
var FOLDER_ID = "1aNlSSF_K5yn1q7PIl1Qw2l8WErqHNRc2"; 

function getSheet(index) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    if (!ss) throw new Error("Spreadsheet inaccessible!");
    var sheet = ss.getSheets()[index];
    if (!sheet) throw new Error("Sheet index " + index + " not found!");
    return sheet;
  } catch (e) {
    throw new Error("Gagal akses Spreadsheet: " + e.message);
  }
}

function bersihkanWA(wa) {
  if (!wa) return "";
  var clean = wa.toString().replace(/[^0-9]/g, '');
  // Standarisasi ke format 62...
  if (clean.startsWith('0')) clean = '62' + clean.substr(1);
  else if (clean.startsWith('8')) clean = '62' + clean;
  return clean;
}

function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents) throw new Error("No data received");
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet(0); 
    
    // 1. CEK DUPLIKAT WHATSAPP
    var waBaru = bersihkanWA(data.whatsapp);
    var range = sheet.getDataRange();
    if (range.getNumRows() > 1) {
      var displayData = range.getDisplayValues();
      for (var i = 1; i < displayData.length; i++) {
        var waLama = bersihkanWA(displayData[i][2]);
        if (waLama === waBaru && waBaru !== "") {
          return ContentService.createTextOutput(JSON.stringify({
            success: false, 
            message: "Nomor WhatsApp " + data.whatsapp + " sudah terdaftar sebagai Affiliate. Silakan gunakan nomor lain."
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }
    
    // 2. PROSES FOTO (DRIVE)
    var fileUrl = "";
    if (data.foto && FOLDER_ID !== "") {
      try {
        var folder = DriveApp.getFolderById(FOLDER_ID);
        var parts = data.foto.split(',');
        var contentType = parts[0].substring(parts[0].indexOf(':') + 1, parts[0].indexOf(';'));
        var bytes = Utilities.base64Decode(parts[1]);
        var blob = Utilities.newBlob(bytes, contentType, data.fotoName || "foto.jpg");
        var file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        fileUrl = file.getUrl();
      } catch (fError) { fileUrl = "Drive Error: " + fError.toString(); }
    }

    // 3. GENERATE ID & SIMPAN DATA
    var randomId = "VG-AFF-" + Math.floor(10000 + Math.random() * 90000);
    var safeNama = (data.nama || "").toString().replace(/"/g, '""');
    var safeWA = (data.whatsapp || "").toString().replace(/"/g, '""');
    
    // Gunakan titik koma (;) sebagai pemisah rumus untuk Regional Indonesia
    var namaCell = fileUrl ? '=HYPERLINK("' + fileUrl + '"; "' + safeNama + '")' : safeNama;
    var waClean = bersihkanWA(data.whatsapp);
    var waCell = '=HYPERLINK("https://wa.me/' + waClean + '"; "' + safeWA + '")';
    
    var rowData = [
      new Date(), namaCell, waCell, data.domisili || "-", data.umur || "-", 
      (data.sosmed || []).join(", ") || "-", data.username || "-", 
      data.alasan || "-", data.siapShare || "-", data.komunitas || "-", 
      data.referensi || "-", data.area || "-", data.bankName || "-", 
      "'" + (data.rekening || ""), randomId, fileUrl
    ];
    
    sheet.appendRow(rowData);

    // Format Header jika belum ada
    var hRange = sheet.getRange(1, 1, 1, 16);
    hRange.setValues([["Tanggal Daftar", "Nama Lengkap", "WhatsApp", "Domisili", "Umur", "Sosmed Aktif", "Username/Link", "Alasan Bergabung", "Komitmen Share", "Jumlah Komunitas", "Referensi Tim", "VisiGo Area", "Bank/E-Wallet", "No. Rekening", "Affiliate ID", "Link Foto"]]);
    hRange.setFontWeight("bold").setBackground("#004E92").setFontColor("white");

    return ContentService.createTextOutput(JSON.stringify({success: true, affiliateId: randomId})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, message: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var action = e.parameter.action;
    var whatsapp = e.parameter.whatsapp;
    if (action === "cekSaldo") {
      var sheetAffiliates = getSheet(0);
      var sheetSales = getSheet(1); 
      var waTarget = bersihkanWA(whatsapp);
      
      var affName = "", affDom = "", affPhoto = "", affId = "";
      var affData = sheetAffiliates.getDataRange().getDisplayValues();
      for (var j = 1; j < affData.length; j++) {
        if (bersihkanWA(affData[j][2]) === waTarget && waTarget !== "") {
          affName = affData[j][1];
          affDom = affData[j][3];
          affId = affData[j][14];
          affPhoto = affData[j][15];
          break;
        }
      }

      if (!sheetSales) return ContentService.createTextOutput(JSON.stringify({success: false, message: "Sheet Data Penjualan belum ada!"})).setMimeType(ContentService.MimeType.JSON);
      
      var salesData = sheetSales.getDataRange().getValues();
      var history = [];
      var total = 0;
      for (var i = 1; i < salesData.length; i++) {
        var row = salesData[i];
        if (row[7] && bersihkanWA(row[7]) === waTarget && waTarget !== "") {
          history.push({ 
            tanggal: row[0], customer: row[1], alamat: row[2] || "-", 
            produk: row[3], komisi: parseFloat(row[5] || 0), status: row[8] || "Pending" 
          });
          total += parseFloat(row[5] || 0);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ 
        success: true, total: total, history: history,
        affiliatorName: affName, affiliatorDomisili: affDom,
        affiliatorPhoto: affPhoto, affiliateId: affId
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) { 
    return ContentService.createTextOutput(JSON.stringify({success: false, message: err.toString()})).setMimeType(ContentService.MimeType.JSON); 
  }
}

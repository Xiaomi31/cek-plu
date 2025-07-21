let dataExcel = [];

// Ganti URL berikut dengan URL mentah file Excel dari GitHub kamu
const excelURL = "https://raw.githubusercontent.com/username/repo/main/database.xlsx";

// 1️⃣ Otomatis ambil database dari GitHub saat pertama kali
fetch(excelURL)
  .then(response => response.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    dataExcel = XLSX.utils.sheet_to_json(sheet);
    console.log("Database berhasil dimuat dari GitHub! Baris:", dataExcel.length);
  })
  .catch(err => {
    alert("Gagal mengambil database dari GitHub: " + err.message);
  });

// 2️⃣ Fitur upload file manual
document.getElementById('excelFile').addEventListener('change', function(e) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, {type: 'array'});
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    dataExcel = XLSX.utils.sheet_to_json(sheet);
    alert("Database berhasil diupload! Baris: " + dataExcel.length);
  };
  reader.readAsArrayBuffer(e.target.files[0]);
});

// 3️⃣ Fungsi pencarian
function searchPLU() {
  const input = document.getElementById("searchInput").value.trim();
  const result = dataExcel.find(row => row.PLU == input || row.Barcode == input);
  const resultDiv = document.getElementById("result");

  if (result) {
    resultDiv.innerHTML = `
      <strong>DESC     :</strong> ${result.DESC}<br>
      <strong>SUPCO    :</strong> ${result.SUPCO || "-"}<br>
      <strong>SUPPLIER :</strong> ${result.SUPPLIER || "-"}<br>
      <strong>KDSB     :</strong> ${result.KDSB || "-"}<br>
      <strong>COVERAGE :</strong> ${result.COVERAGE || "-"}<br>
      <strong>TAG      :</strong> ${result.TAG || "-"}<br>
      <strong>PTAG     :</strong> ${result.PTAG || "-"}
      <strong>STOK     :</strong> ${result.STOK || "-"}
    `;
  } else {
    resultDiv.innerHTML = "Data tidak ditemukan.";
  }
}

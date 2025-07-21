let dataExcel = [];

// Ganti URL berikut dengan URL file Excel mentah kamu dari GitHub
const excelURL = "https://raw.githubusercontent.com/username/repo/main/database.xlsx";

// Ambil dan baca file Excel dari GitHub
fetch(excelURL)
  .then(response => response.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    dataExcel = XLSX.utils.sheet_to_json(sheet);
    console.log("Database berhasil dimuat! Baris:", dataExcel.length);
  })
  .catch(err => {
    alert("Gagal mengambil file Excel dari GitHub: " + err.message);
  });

function searchPLU() {
  const input = document.getElementById("searchInput").value.trim();
  const result = dataExcel.find(row => row.PLU == input || row.Barcode == input);
  const resultDiv = document.getElementById("result");

  if (result) {
    resultDiv.innerHTML = `
      <strong>Deskripsi:</strong> ${result.Deskripsi}<br>
      <strong>Supplier:</strong> ${result.Supplier || "-"}<br>
      <strong>Harga:</strong> ${result.Harga || "-"}
    `;
  } else {
    resultDiv.innerHTML = "Data tidak ditemukan.";
  }
}

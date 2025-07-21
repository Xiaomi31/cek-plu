let dataExcel = [];

document.getElementById('excelFile').addEventListener('change', function(e) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, {type: 'array'});
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    dataExcel = XLSX.utils.sheet_to_json(sheet);
    alert("Database berhasil dimuat! Baris: " + dataExcel.length);
  };
  reader.readAsArrayBuffer(e.target.files[0]);
});

function searchPLU() {
  const input = document.getElementById('searchInput').value.trim();
  const result = dataExcel.find(row => row.PLU == input || row.Barcode == input);
  const resultDiv = document.getElementById('result');

  if (result) {
    resultDiv.innerHTML = `
      <strong>Deskripsi:</strong> ${result.Deskripsi}<br>
      <strong>Supco:</strong> ${result.Supco || "-"}<br>      
      <strong>Supplier:</strong> ${result.Supplier || "-"}<br>
      <strong>Harga:</strong> ${result.Harga || "-"}
    `;
  } else {
    resultDiv.innerHTML = "Data tidak ditemukan.";
  }
}

/**
 * Format angka ke format mata uang Rupiah
 * @param {number} amount
 * @returns {string} e.g. "Rp 45.000"
 */
export function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("IDR", "Rp");
}

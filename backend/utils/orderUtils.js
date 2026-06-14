function normalizeOrderItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      const idMenu = Number(item.id_menu || item.id);
      const jumlah = Number(item.jumlah || item.qty || 1);

      if (!idMenu || Number.isNaN(idMenu) || jumlah <= 0) {
        return null;
      }

      return {
        id_menu: idMenu,
        jumlah,
      };
    })
    .filter(Boolean);
}

function isValidOrderPayload(payload) {
  if (!payload) return false;

  const { id_user, items, tanggal_booking } = payload;

  if (!id_user) return false;
  if (!tanggal_booking) return false;
  if (!Array.isArray(items) || items.length === 0) return false;

  const normalizedItems = normalizeOrderItems(items);

  return normalizedItems.length === items.length;
}

function calculateTotalHarga(items, menuPriceMap) {
  const normalizedItems = normalizeOrderItems(items);

  return normalizedItems.reduce((total, item) => {
    const harga = Number(menuPriceMap[item.id_menu] || 0);
    return total + harga * item.jumlah;
  }, 0);
}

module.exports = {
  normalizeOrderItems,
  isValidOrderPayload,
  calculateTotalHarga,
};
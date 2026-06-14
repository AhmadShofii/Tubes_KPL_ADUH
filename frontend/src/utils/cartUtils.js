export function normalizeCartItem(item) {
  const idMenu = Number(item.id_menu || item.id);
  const qty = Number(item.qty || item.jumlah || 1);
  const price = Number(item.price || item.harga || 0);

  if (!idMenu || Number.isNaN(idMenu)) {
    return null;
  }

  return {
    id: idMenu,
    id_menu: idMenu,
    name: item.name || item.nama_menu || "Menu Foodora",
    nama_menu: item.nama_menu || item.name || "Menu Foodora",
    desc: item.desc || item.description || item.deskripsi || "",
    deskripsi: item.deskripsi || item.desc || item.description || "",
    price,
    harga: price,
    qty: qty > 0 ? qty : 1,
    jumlah: qty > 0 ? qty : 1,
    image: item.image || item.img || "",
    img: item.img || item.image || "",
  };
}
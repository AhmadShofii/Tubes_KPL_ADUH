import { describe, expect, test } from "vitest";
import { normalizeCartItem } from "../cartUtils";

describe("cartUtils", () => {
  test("normalizeCartItem mengubah data menu menjadi format cart", () => {
    const result = normalizeCartItem({
      id_menu: "101",
      nama_menu: "Nasi Goreng",
      harga: "25000",
      qty: "2",
      deskripsi: "Nasi goreng spesial",
      image: "image.jpg",
    });

    expect(result).toEqual({
      id: 101,
      id_menu: 101,
      name: "Nasi Goreng",
      nama_menu: "Nasi Goreng",
      desc: "Nasi goreng spesial",
      deskripsi: "Nasi goreng spesial",
      price: 25000,
      harga: 25000,
      qty: 2,
      jumlah: 2,
      image: "image.jpg",
      img: "image.jpg",
    });
  });

  test("normalizeCartItem mengembalikan null jika id_menu tidak valid", () => {
    const result = normalizeCartItem({
      id_menu: "rec-1",
      nama_menu: "Menu Tidak Valid",
      harga: 10000,
    });

    expect(result).toBeNull();
  });
});
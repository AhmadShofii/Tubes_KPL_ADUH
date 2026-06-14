const {
  normalizeOrderItems,
  isValidOrderPayload,
  calculateTotalHarga,
} = require("../../utils/orderUtils");

describe("orderUtils", () => {
  test("normalizeOrderItems mengubah item cart menjadi format pesanan", () => {
    const items = [
      {
        id_menu: "101",
        qty: "2",
      },
      {
        id: 102,
        jumlah: 3,
      },
    ];

    expect(normalizeOrderItems(items)).toEqual([
      {
        id_menu: 101,
        jumlah: 2,
      },
      {
        id_menu: 102,
        jumlah: 3,
      },
    ]);
  });

  test("normalizeOrderItems membuang item dengan id_menu tidak valid", () => {
    const items = [
      {
        id_menu: "rec-1",
        qty: 1,
      },
      {
        id_menu: 105,
        qty: 2,
      },
    ];

    expect(normalizeOrderItems(items)).toEqual([
      {
        id_menu: 105,
        jumlah: 2,
      },
    ]);
  });

  test("isValidOrderPayload menerima payload valid", () => {
    const payload = {
      id_user: 1,
      tanggal_booking: "2026-06-15",
      items: [
        {
          id_menu: 101,
          jumlah: 2,
        },
      ],
    };

    expect(isValidOrderPayload(payload)).toBe(true);
  });

  test("isValidOrderPayload menolak payload tanpa tanggal booking", () => {
    const payload = {
      id_user: 1,
      items: [
        {
          id_menu: 101,
          jumlah: 2,
        },
      ],
    };

    expect(isValidOrderPayload(payload)).toBe(false);
  });

  test("calculateTotalHarga menghitung total harga pesanan", () => {
    const items = [
      {
        id_menu: 101,
        jumlah: 2,
      },
      {
        id_menu: 102,
        jumlah: 1,
      },
    ];

    const menuPriceMap = {
      101: 15000,
      102: 20000,
    };

    expect(calculateTotalHarga(items, menuPriceMap)).toBe(50000);
  });
});
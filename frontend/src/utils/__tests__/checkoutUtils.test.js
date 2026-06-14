import { describe, expect, test } from "vitest";
import {
  getLocalDateValue,
  generateBookingDates,
  getFirstAvailableDate,
  buildPesananPayload,
} from "../checkoutUtils";

describe("checkoutUtils", () => {
  test("getLocalDateValue mengubah date menjadi format yyyy-mm-dd", () => {
    const date = new Date("2026-06-15T00:00:00");

    expect(getLocalDateValue(date)).toBe("2026-06-15");
  });

  test("generateBookingDates menghasilkan jumlah tanggal sesuai parameter", () => {
    const startDate = new Date("2026-06-15T00:00:00");
    const dates = generateBookingDates(3, startDate);

    expect(dates).toHaveLength(3);
    expect(dates[0].value).toBe("2026-06-15");
    expect(dates[1].value).toBe("2026-06-16");
    expect(dates[2].value).toBe("2026-06-17");
  });

  test("getFirstAvailableDate mengambil tanggal pertama yang belum dibooking", () => {
    const bookingDates = [
      {
        value: "2026-06-15",
      },
      {
        value: "2026-06-16",
      },
      {
        value: "2026-06-17",
      },
    ];

    const bookedDates = ["2026-06-15", "2026-06-16"];

    expect(getFirstAvailableDate(bookingDates, bookedDates)).toEqual({
      value: "2026-06-17",
    });
  });

  test("buildPesananPayload membuat payload pesanan sesuai backend", () => {
    const payload = buildPesananPayload({
      user: {
        id_user: 1,
      },
      paymentMethod: "QRIS",
      selectedDate: "2026-06-15",
      cartItems: [
        {
          id_menu: 101,
          qty: 2,
        },
      ],
    });

    expect(payload).toEqual({
      id_user: 1,
      metode_pembayaran: "QRIS",
      tanggal_booking: "2026-06-15",
      items: [
        {
          id_menu: 101,
          jumlah: 2,
        },
      ],
    });
  });
});
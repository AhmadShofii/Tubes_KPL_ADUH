import { describe, expect, test } from "vitest";
import { formatRp, formatTanggal } from "../formatters";

describe("formatters", () => {
  test("formatRp mengubah angka menjadi format Rupiah", () => {
    expect(formatRp(25000)).toBe("Rp 25.000");
  });

  test("formatRp menangani nilai kosong", () => {
    expect(formatRp()).toBe("Rp 0");
  });

  test("formatTanggal mengubah tanggal menjadi format Indonesia", () => {
    const result = formatTanggal("2026-06-15");

    expect(result).toContain("2026");
    expect(result).toContain("Juni");
  });

  test("formatTanggal mengembalikan strip jika tanggal kosong", () => {
    expect(formatTanggal()).toBe("-");
  });
});
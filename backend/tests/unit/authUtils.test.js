const {
  generateOtp,
  normalizePhone,
  isValidEmail,
  isValidPassword,
} = require("../../utils/authUtils");

describe("authUtils", () => {
  test("generateOtp menghasilkan 6 digit angka", () => {
    const otp = generateOtp();

    expect(otp).toHaveLength(6);
    expect(Number.isNaN(Number(otp))).toBe(false);
  });

  test("normalizePhone mengubah nomor 08 menjadi 628", () => {
    expect(normalizePhone("081234567890")).toBe("6281234567890");
  });

  test("normalizePhone menghapus spasi dan karakter non angka", () => {
    expect(normalizePhone("+62 812-3456-7890")).toBe("6281234567890");
  });

  test("isValidEmail menerima format email valid", () => {
    expect(isValidEmail("user@gmail.com")).toBe(true);
  });

  test("isValidEmail menolak format email tidak valid", () => {
    expect(isValidEmail("usergmail.com")).toBe(false);
  });

  test("isValidPassword menerima password minimal 6 karakter", () => {
    expect(isValidPassword("123456")).toBe(true);
  });

  test("isValidPassword menolak password kurang dari 6 karakter", () => {
    expect(isValidPassword("123")).toBe(false);
  });
});
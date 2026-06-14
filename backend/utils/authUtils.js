const crypto = require("crypto");

function generateOtp() {
  return String(crypto.randomInt(100000, 999999));
}

function normalizePhone(phone) {
  if (!phone) return "";

  let cleaned = String(phone).replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  }

  return cleaned;
}

function isValidEmail(email) {
  if (!email) return false;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return typeof password === "string" && password.length >= 6;
}

module.exports = {
  generateOtp,
  normalizePhone,
  isValidEmail,
  isValidPassword,
};
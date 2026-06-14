const API_BASE_URL = "http://localhost:3001/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Terjadi kesalahan.");
  }

  return data;
}

export function loginUser(email, password) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function registerUser(payload) {
  return request("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginWithGoogle(credential) {
  return request("/auth/google", {
    method: "POST",
    body: JSON.stringify({ credential }),
  });
}

export function forgotPassword(payload) {
  return request("/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function verifyOtp(payload) {
  return request("/verify-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function resetPassword(payload) {
  return request("/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getVendors() {
  return request("/vendors");
}

export function getMenus() {
  return request("/menu");
}

export function getMenuByVendor(idVendor) {
  return request(`/vendors/${idVendor}/menu`);
}

export function getBookedDates() {
  return request("/pesanan/booked-dates");
}

export function createPesanan(payload) {
  return request("/pesanan", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getPesananByUser(idUser) {
  return request(`/users/${idUser}/pesanan`);
}

export function konfirmasiPembayaran(idPesanan) {
  return request(`/pesanan/${idPesanan}/bayar`, {
    method: "PUT",
  });
}
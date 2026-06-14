const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
const pool = require("./db");
const { sendOtpEmail } = require("./mailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Bisa baca GOOGLE_CLIENT_ID atau VITE_GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ==========================
// HELPER FUNCTION
// ==========================
function generateOtp() {
  return String(crypto.randomInt(100000, 999999));
}

function normalizePhone(phone) {
  if (!phone) return "";

  let cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  }

  return cleaned;
}

// ==========================
// CEK SERVER
// ==========================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Foodora API berjalan",
  });
});

// ==========================
// CEK DATABASE
// ==========================
app.get("/api/health", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS status");

    res.json({
      success: true,
      message: "Database terhubung",
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database gagal terhubung",
      error: error.message,
    });
  }
});

// ==========================
// LOGIN DENGAN GOOGLE
// ==========================
app.post("/api/auth/google", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Credential Google wajib dikirim.",
      });
    }

    if (!GOOGLE_CLIENT_ID) {
      return res.status(500).json({
        success: false,
        message: "GOOGLE_CLIENT_ID belum diatur di file .env backend.",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const googleId = payload.sub;
    const email = payload.email;
    const nama = payload.name || payload.given_name || "User Google";

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email Google tidak ditemukan.",
      });
    }

    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    let user;

    if (existingUsers.length > 0) {
      user = existingUsers[0];
    } else {
      const dummyPassword = await bcrypt.hash(`google-${googleId}`, 10);

      const [result] = await pool.query(
        `INSERT INTO users (nama, email, password, no_hp, alamat)
         VALUES (?, ?, ?, ?, ?)`,
        [nama, email, dummyPassword, null, null]
      );

      user = {
        id_user: result.insertId,
        nama,
        email,
        no_hp: null,
        alamat: null,
      };
    }

    return res.json({
      success: true,
      message: "Login Google berhasil.",
      data: {
        id_user: user.id_user,
        nama: user.nama,
        email: user.email,
        no_hp: user.no_hp,
        alamat: user.alamat,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);

    return res.status(401).json({
      success: false,
      message: "Login Google gagal.",
      error: error.message,
    });
  }
});

// ==========================
// REGISTER
// ==========================
app.post("/api/register", async (req, res) => {
  try {
    const { nama, email, password, no_hp, alamat } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Nama, email, dan password wajib diisi.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password minimal 6 karakter.",
      });
    }

    const [existingUsers] = await pool.query(
      "SELECT id_user FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email sudah terdaftar.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users (nama, email, password, no_hp, alamat)
       VALUES (?, ?, ?, ?, ?)`,
      [nama, email, hashedPassword, no_hp || null, alamat || null]
    );

    return res.status(201).json({
      success: true,
      message: "Registrasi berhasil. Silakan login.",
      data: {
        id_user: result.insertId,
        nama,
        email,
        no_hp: no_hp || null,
        alamat: alamat || null,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat registrasi.",
      error: error.message,
    });
  }
});

// ==========================
// LOGIN
// ==========================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi.",
      });
    }

    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah.",
      });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah.",
      });
    }

    return res.json({
      success: true,
      message: "Login berhasil.",
      data: {
        id_user: user.id_user,
        nama: user.nama,
        email: user.email,
        no_hp: user.no_hp,
        alamat: user.alamat,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat login.",
      error: error.message,
    });
  }
});

// ==========================
// FORGOT PASSWORD - REQUEST OTP
// Email: OTP dikirim ke email
// WhatsApp: OTP muncul di terminal backend
// ==========================
app.post("/api/forgot-password", async (req, res) => {
  try {
    const { channel, value } = req.body;

    if (!channel || !value) {
      return res.status(400).json({
        success: false,
        message: "Metode dan tujuan verifikasi wajib diisi.",
      });
    }

    if (!["email", "whatsapp"].includes(channel)) {
      return res.status(400).json({
        success: false,
        message: "Metode verifikasi tidak valid.",
      });
    }

    let userQuery = "";
    let queryValue = "";
    let target = "";

    if (channel === "email") {
      userQuery = "SELECT * FROM users WHERE email = ? LIMIT 1";
      queryValue = value;
      target = value;
    }

    if (channel === "whatsapp") {
      const normalizedPhone = normalizePhone(value);

      userQuery = `
        SELECT * FROM users
        WHERE REPLACE(REPLACE(REPLACE(no_hp, '-', ''), ' ', ''), '+', '') LIKE ?
        LIMIT 1
      `;

      queryValue = `%${value.replace(/\D/g, "")}%`;
      target = normalizedPhone;
    }

    const [users] = await pool.query(userQuery, [queryValue]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          channel === "email"
            ? "Email tidak terdaftar."
            : "Nomor WhatsApp tidak terdaftar.",
      });
    }

    const user = users[0];
    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    await pool.query(
      `
      UPDATE password_reset_otps
      SET used_at = NOW()
      WHERE id_user = ? AND used_at IS NULL
      `,
      [user.id_user]
    );

    await pool.query(
      `
      INSERT INTO password_reset_otps
      (id_user, channel, target, otp_hash, expires_at)
      VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))
      `,
      [user.id_user, channel, target, otpHash]
    );

    console.log("====================================");
    console.log("OTP RESET PASSWORD FOODORA");
    console.log("Channel:", channel);
    console.log("User:", user.email);
    console.log("Target:", target);
    console.log("OTP:", otp);
    console.log("Expired: 10 menit");
    console.log("====================================");

    if (channel === "email") {
      try {
        await sendOtpEmail({
          to: user.email,
          otp,
        });

        console.log("Status email: OTP berhasil dikirim ke email");
      } catch (emailError) {
        console.log("Status email: Gagal mengirim email");
        console.log("Penyebab:", emailError.message);
        console.log("Untuk demo, gunakan OTP yang tampil di terminal backend.");
      }
    }

    return res.json({
      success: true,
      message:
        channel === "email"
          ? "Kode OTP dibuat. Cek email atau lihat terminal backend."
          : "Kode OTP WhatsApp ditampilkan di terminal backend.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Gagal mengirim kode OTP.",
    });
  }
});

// ==========================
// VERIFY OTP
// ==========================
app.post("/api/verify-otp", async (req, res) => {
  try {
    const { channel, value, otp } = req.body;

    if (!channel || !value || !otp) {
      return res.status(400).json({
        success: false,
        message: "Metode, tujuan, dan OTP wajib diisi.",
      });
    }

    if (!["email", "whatsapp"].includes(channel)) {
      return res.status(400).json({
        success: false,
        message: "Metode verifikasi tidak valid.",
      });
    }

    const target = channel === "whatsapp" ? normalizePhone(value) : value;

    const [rows] = await pool.query(
      `SELECT *
       FROM password_reset_otps
       WHERE channel = ?
       AND target = ?
       AND used_at IS NULL
       AND expires_at > NOW()
       ORDER BY created_at DESC
       LIMIT 1`,
      [channel, target]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP tidak ditemukan atau sudah kedaluwarsa.",
      });
    }

    const resetData = rows[0];
    const isValidOtp = await bcrypt.compare(otp, resetData.otp_hash);

    if (!isValidOtp) {
      return res.status(400).json({
        success: false,
        message: "Kode OTP salah.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    await pool.query(
      `UPDATE password_reset_otps
       SET reset_token = ?,
           reset_token_expires_at = DATE_ADD(NOW(), INTERVAL 15 MINUTE)
       WHERE id_reset = ?`,
      [resetToken, resetData.id_reset]
    );

    return res.json({
      success: true,
      message: "OTP berhasil diverifikasi.",
      data: {
        resetToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal verifikasi OTP.",
      error: error.message,
    });
  }
});

// ==========================
// RESET PASSWORD
// ==========================
app.post("/api/reset-password", async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token dan password baru wajib diisi.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password baru minimal 6 karakter.",
      });
    }

    const [rows] = await pool.query(
      `SELECT *
       FROM password_reset_otps
       WHERE reset_token = ?
       AND reset_token_expires_at > NOW()
       AND used_at IS NULL
       LIMIT 1`,
      [resetToken]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Token reset tidak valid atau sudah kedaluwarsa.",
      });
    }

    const resetData = rows[0];
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE users
       SET password = ?
       WHERE id_user = ?`,
      [hashedPassword, resetData.id_user]
    );

    await pool.query(
      `UPDATE password_reset_otps
       SET used_at = NOW()
       WHERE id_reset = ?`,
      [resetData.id_reset]
    );

    return res.json({
      success: true,
      message: "Password berhasil diperbarui. Silakan login kembali.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal reset password.",
      error: error.message,
    });
  }
});

// ==========================
// GET ALL VENDORS
// ==========================
app.get("/api/vendors", async (req, res) => {
  try {
    const [vendors] = await pool.query(
      "SELECT * FROM vendors ORDER BY id_vendor DESC"
    );

    return res.json({
      success: true,
      data: vendors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data vendor.",
      error: error.message,
    });
  }
});

// ==========================
// GET MENU BY VENDOR
// ==========================
app.get("/api/vendors/:id_vendor/menu", async (req, res) => {
  try {
    const { id_vendor } = req.params;

    const [menus] = await pool.query(
      "SELECT * FROM menu WHERE id_vendor = ? ORDER BY id_menu DESC",
      [id_vendor]
    );

    return res.json({
      success: true,
      data: menus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data menu.",
      error: error.message,
    });
  }
});

// ==========================
// GET ALL MENU
// ==========================
app.get("/api/menu", async (req, res) => {
  try {
    const [menus] = await pool.query(
      `SELECT 
        menu.id_menu,
        menu.id_vendor,
        menu.nama_menu,
        menu.harga,
        menu.deskripsi,
        vendors.nama_vendor
      FROM menu
      LEFT JOIN vendors ON menu.id_vendor = vendors.id_vendor
      ORDER BY menu.id_menu DESC`
    );

    return res.json({
      success: true,
      data: menus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data menu.",
      error: error.message,
    });
  }
});

app.get("/api/pesanan/booked-dates", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT DATE_FORMAT(tanggal, '%Y-%m-%d') AS tanggal
      FROM pesanan
      WHERE status NOT IN ('Dibatalkan', 'Batal')
      `
    );

    res.json({
      success: true,
      data: rows.map((row) => row.tanggal),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil tanggal booking.",
      error: error.message,
    });
  }
});

app.post("/api/pesanan", async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { id_user, items, metode_pembayaran, tanggal_booking } = req.body;

    if (!id_user || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Silakan login dan pilih minimal 1 menu sebelum membuat pesanan.",
      });
    }

    if (!tanggal_booking) {
      return res.status(400).json({
        success: false,
        message: "Tanggal booking wajib dipilih.",
      });
    }

    const [userRows] = await connection.query(
      "SELECT id_user FROM users WHERE id_user = ? LIMIT 1",
      [id_user]
    );

    if (userRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan. Silakan login ulang.",
      });
    }

    const [bookedRows] = await connection.query(
      `
      SELECT id_pesanan
      FROM pesanan
      WHERE tanggal = ?
      AND status NOT IN ('Dibatalkan', 'Batal')
      LIMIT 1
      `,
      [tanggal_booking]
    );

    if (bookedRows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Tanggal tersebut sudah dibooking. Silakan pilih tanggal lain.",
      });
    }

    await connection.beginTransaction();

    const detailItems = [];
    let totalHarga = 0;

    for (const item of items) {
      const idMenu = Number(item.id_menu || item.id);
      const jumlah = Number(item.jumlah || item.qty || 1);

      if (!idMenu || jumlah <= 0) {
        throw new Error("Data menu atau jumlah pesanan tidak valid.");
      }

      const [menuRows] = await connection.query(
        "SELECT id_menu, harga FROM menu WHERE id_menu = ? LIMIT 1",
        [idMenu]
      );

      if (menuRows.length === 0) {
        throw new Error(`Menu dengan ID ${idMenu} tidak ditemukan.`);
      }

      const harga = Number(menuRows[0].harga || 0);
      const subtotal = harga * jumlah;

      detailItems.push({
        id_menu: idMenu,
        jumlah,
        subtotal,
      });

      totalHarga += subtotal;
    }

    const [pesananResult] = await connection.query(
      `
      INSERT INTO pesanan (id_user, tanggal, total_harga, status)
      VALUES (?, ?, ?, ?)
      `,
      [id_user, tanggal_booking, totalHarga, "Menunggu Pembayaran"]
    );

    const idPesanan = pesananResult.insertId;

    for (const item of detailItems) {
      await connection.query(
        `
        INSERT INTO detail_pesanan (id_pesanan, id_menu, jumlah, subtotal)
        VALUES (?, ?, ?, ?)
        `,
        [idPesanan, item.id_menu, item.jumlah, item.subtotal]
      );
    }

    await connection.query(
      `
      INSERT INTO pembayaran (id_pesanan, metode, status, tanggal_bayar)
      VALUES (?, ?, ?, NULL)
      `,
      [idPesanan, metode_pembayaran || "Belum dipilih", "Belum Dibayar"]
    );

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "Pesanan berhasil dibuat dan masuk ke database.",
      data: {
        id_pesanan: idPesanan,
        total_harga: totalHarga,
        tanggal_booking,
      },
    });
  } catch (error) {
    await connection.rollback();

    console.error("ERROR PESANAN:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Gagal membuat pesanan.",
    });
  } finally {
    connection.release();
  }
});

// ==========================
// CREATE PESANAN
// ==========================
app.post("/api/pesanan", async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { id_user, items, metode_pembayaran } = req.body;

    if (!id_user || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Silakan login dan pilih minimal 1 menu sebelum membuat pesanan.",
      });
    }

    const [userRows] = await connection.query(
      "SELECT id_user FROM users WHERE id_user = ? LIMIT 1",
      [id_user]
    );

    if (userRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan. Silakan login ulang.",
      });
    }

    await connection.beginTransaction();

    const detailItems = [];
    let totalHarga = 0;

    for (const item of items) {
      const idMenu = Number(item.id_menu || item.id);
      const jumlah = Number(item.jumlah || item.qty || 1);

      if (!idMenu || jumlah <= 0) {
        throw new Error("Data menu atau jumlah pesanan tidak valid.");
      }

      const [menuRows] = await connection.query(
        "SELECT id_menu, harga FROM menu WHERE id_menu = ? LIMIT 1",
        [idMenu]
      );

      if (menuRows.length === 0) {
        throw new Error(`Menu dengan ID ${idMenu} tidak ditemukan.`);
      }

      const harga = Number(menuRows[0].harga || 0);
      const subtotal = harga * jumlah;

      detailItems.push({
        id_menu: idMenu,
        jumlah,
        subtotal,
      });

      totalHarga += subtotal;
    }

    const [pesananResult] = await connection.query(
      `INSERT INTO pesanan (id_user, tanggal, total_harga, status)
       VALUES (?, CURDATE(), ?, ?)`,
      [id_user, totalHarga, "Menunggu Pembayaran"]
    );

    const idPesanan = pesananResult.insertId;

    for (const item of detailItems) {
      await connection.query(
        `INSERT INTO detail_pesanan (id_pesanan, id_menu, jumlah, subtotal)
         VALUES (?, ?, ?, ?)`,
        [idPesanan, item.id_menu, item.jumlah, item.subtotal]
      );
    }

    await connection.query(
      `INSERT INTO pembayaran (id_pesanan, metode, status, tanggal_bayar)
       VALUES (?, ?, ?, NULL)`,
      [idPesanan, metode_pembayaran || "Belum dipilih", "Belum Dibayar"]
    );

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "Pesanan berhasil dibuat dan masuk ke database.",
      data: {
        id_pesanan: idPesanan,
        total_harga: totalHarga,
      },
    });
  } catch (error) {
    await connection.rollback();

    console.error("ERROR PESANAN:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Gagal membuat pesanan.",
    });
  } finally {
    connection.release();
  }
});

// ==========================
// GET PESANAN BY USER
// ==========================
app.get("/api/users/:id_user/pesanan", async (req, res) => {
  try {
    const { id_user } = req.params;

    const [pesananRows] = await pool.query(
      `SELECT 
        pesanan.id_pesanan,
        pesanan.id_user,
        pesanan.tanggal,
        pesanan.total_harga,
        pesanan.status,
        pembayaran.metode AS metode_pembayaran,
        pembayaran.status AS status_pembayaran,
        pembayaran.tanggal_bayar
       FROM pesanan
       LEFT JOIN pembayaran ON pembayaran.id_pesanan = pesanan.id_pesanan
       WHERE pesanan.id_user = ?
       ORDER BY pesanan.id_pesanan DESC`,
      [id_user]
    );

    const pesananWithDetails = [];

    for (const pesanan of pesananRows) {
      const [detailRows] = await pool.query(
        `SELECT 
          detail_pesanan.id_detail,
          detail_pesanan.id_pesanan,
          detail_pesanan.id_menu,
          detail_pesanan.jumlah,
          detail_pesanan.subtotal,
          menu.nama_menu,
          menu.deskripsi,
          menu.harga
         FROM detail_pesanan
         LEFT JOIN menu ON detail_pesanan.id_menu = menu.id_menu
         WHERE detail_pesanan.id_pesanan = ?`,
        [pesanan.id_pesanan]
      );

      pesananWithDetails.push({
        ...pesanan,
        details: detailRows,
      });
    }

    return res.json({
      success: true,
      data: pesananWithDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil histori pesanan.",
      error: error.message,
    });
  }
});

// ==========================
// KONFIRMASI BAYAR
// ==========================
app.put("/api/pesanan/:id_pesanan/bayar", async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { id_pesanan } = req.params;

    await connection.beginTransaction();

    await connection.query(
      `
      UPDATE pembayaran
      SET status = 'Lunas',
          tanggal_bayar = NOW()
      WHERE id_pesanan = ?
      `,
      [id_pesanan]
    );

    await connection.query(
      `
      UPDATE pesanan
      SET status = 'Diproses'
      WHERE id_pesanan = ?
      `,
      [id_pesanan]
    );

    await connection.commit();

    res.json({
      success: true,
      message: "Pembayaran berhasil",
    });
  } catch (error) {
    await connection.rollback();

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    connection.release();
  }
});

// ==========================
// GET PESANAN BY USER + DETAIL
// ==========================
app.get("/api/users/:id_user/pesanan", async (req, res) => {
  try {
    const { id_user } = req.params;

    const [pesananRows] = await pool.query(
      `SELECT 
        id_pesanan,
        id_user,
        tanggal,
        total_harga,
        status
       FROM pesanan
       WHERE id_user = ?
       ORDER BY id_pesanan DESC`,
      [id_user]
    );

    const pesananWithDetails = [];

    for (const pesanan of pesananRows) {
      const [detailRows] = await pool.query(
        `SELECT 
          detail_pesanan.id_detail,
          detail_pesanan.id_pesanan,
          detail_pesanan.id_menu,
          detail_pesanan.jumlah,
          detail_pesanan.subtotal,
          menu.nama_menu,
          menu.deskripsi,
          menu.harga
         FROM detail_pesanan
         LEFT JOIN menu ON detail_pesanan.id_menu = menu.id_menu
         WHERE detail_pesanan.id_pesanan = ?`,
        [pesanan.id_pesanan]
      );

      pesananWithDetails.push({
        ...pesanan,
        details: detailRows,
      });
    }

    return res.json({
      success: true,
      data: pesananWithDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil histori pesanan.",
      error: error.message,
    });
  }
});

app.put("/api/pesanan/:id_pesanan/bayar", async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { id_pesanan } = req.params;

    await connection.beginTransaction();

    await connection.query(
      `
      UPDATE pembayaran
      SET
        status='Lunas',
        tanggal_bayar=NOW()
      WHERE id_pesanan=?
      `,
      [id_pesanan]
    );

    await connection.query(
      `
      UPDATE pesanan
      SET status='Diproses'
      WHERE id_pesanan=?
      `,
      [id_pesanan]
    );

    await connection.commit();

    res.json({
      success: true,
      message: "Pembayaran berhasil",
    });
  } catch (error) {
    await connection.rollback();

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    connection.release();
  }
});

// ==========================
// LISTEN SERVER
// ==========================
app.listen(PORT, () => {
  console.log(`API server berjalan di http://localhost:${PORT}`);

  if (!GOOGLE_CLIENT_ID) {
    console.log("PERINGATAN: GOOGLE_CLIENT_ID belum ada di file .env backend.");
  }
});
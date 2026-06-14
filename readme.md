# 🍽️ Foodora Catering App

### Tugas Besar Konstruksi Perangkat Lunak

Foodora Catering App adalah aplikasi pemesanan katering berbasis web yang dibuat untuk memudahkan pengguna dalam melihat vendor makanan, memilih menu, melakukan pemesanan, memilih tanggal booking, serta menyelesaikan pembayaran melalui QRIS.

Project ini dikembangkan menggunakan **React.js** sebagai frontend, **Node.js + Express.js** sebagai backend, dan **MySQL** sebagai database. Selain membangun fitur utama aplikasi, project ini juga menerapkan beberapa teknik konstruksi perangkat lunak seperti **Automata**, **Table Driven Construction**, **Parameterization / Generic**, **Runtime Configuration**, **Code Reuse Library**, dan **API**.

---

## 📌 Daftar Isi

* [Latar Belakang](#-latar-belakang)
* [Tujuan Project](#-tujuan-project)
* [Pembagian Tugas](#-pembagian-tugas)
* [Teknik Konstruksi yang Digunakan](#-teknik-konstruksi-yang-digunakan)
* [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
* [Struktur Folder](#-struktur-folder)
* [Fitur Aplikasi](#-fitur-aplikasi)
* [Penerapan Teknik Konstruksi](#-penerapan-teknik-konstruksi)
* [Clean Code](#-clean-code)
* [Design Pattern](#-design-pattern)
* [Cara Menjalankan Project](#-cara-menjalankan-project)
* [Cara Push ke Branch](#-cara-push-ke-branch)
* [Kesimpulan](#-kesimpulan)

---

# 📖 Latar Belakang

Dalam kehidupan sehari-hari, kebutuhan terhadap layanan katering semakin meningkat, terutama untuk acara keluarga, kantor, sekolah, dan kegiatan lainnya. Namun, proses pemesanan katering secara manual sering kali kurang efisien karena pengguna harus menghubungi vendor satu per satu, menanyakan menu, harga, jadwal ketersediaan, hingga melakukan konfirmasi pembayaran secara terpisah.

Oleh karena itu, dibuatlah **Foodora Catering App** sebagai aplikasi berbasis web yang membantu pengguna dalam melakukan pemesanan katering secara lebih mudah dan terstruktur. Melalui aplikasi ini, pengguna dapat melihat daftar vendor, memilih menu, memasukkan pesanan ke keranjang, memilih tanggal booking, melakukan pembayaran, serta melihat histori pesanan.

Aplikasi ini juga dibuat sebagai implementasi dari materi **Konstruksi Perangkat Lunak**, khususnya dalam penerapan teknik konstruksi kode, pemanfaatan library, penggunaan API, konfigurasi runtime, serta penerapan design pattern.

---

# 🎯 Tujuan Project

Tujuan dari pembuatan aplikasi ini adalah:

1. Membuat aplikasi pemesanan katering berbasis web.
2. Memudahkan pengguna dalam memilih vendor dan menu makanan.
3. Menyediakan fitur keranjang dan checkout.
4. Menambahkan fitur booking tanggal agar tanggal yang sudah dipesan tidak dapat dipilih kembali.
5. Menyediakan fitur pembayaran QRIS dan halaman konfirmasi pembayaran.
6. Menyediakan fitur login, register, forgot password, OTP, dan reset password.
7. Menerapkan teknik konstruksi perangkat lunak pada project nyata.
8. Menerapkan prinsip clean code dan design pattern agar kode lebih rapi dan mudah dikembangkan.

---

# 👥 Pembagian Tugas

Pembagian tugas mengikuti progress kelompok yang sudah dibuat.

| Nama       | Bagian yang Dikerjakan                                        |
| ---------- | ------------------------------------------------------------- |
| **Aditio** | Keranjang, checkout, detail vendor                            |
| **Chiara** | Login, lupa password, buat password baru                      |
| **Shofi**  | Home page, beranda, list vendor, histori                      |
| **Ghina**  | Register, verifikasi kode, password berhasil, riwayat pesanan |

---

# 🧩 Teknik Konstruksi yang Digunakan

Teknik konstruksi yang dipilih oleh masing-masing anggota adalah sebagai berikut:

| Nama       | Teknik Konstruksi                                   |
| ---------- | --------------------------------------------------- |
| **Aditio** | Runtime Configuration dan Table Driven Construction |
| **Chiara** | Library dan API                                     |
| **Ghina**  | Generic dan Library                                 |
| **Shofi**  | Generic dan Runtime Configuration                   |

Selain pembagian tersebut, project ini juga menggunakan **Automata** pada alur status pesanan dan pembayaran.

---

# 🛠️ Teknologi yang Digunakan

## Frontend

| Teknologi        | Fungsi                                 |
| ---------------- | -------------------------------------- |
| React.js         | Membuat tampilan aplikasi              |
| React Router DOM | Navigasi antar halaman                 |
| Framer Motion    | Animasi tampilan                       |
| Lucide React     | Icon modern                            |
| React Icons      | Icon tambahan                          |
| CSS              | Styling halaman                        |
| LocalStorage     | Menyimpan data user dan cart sementara |

## Backend

| Teknologi      | Fungsi                             |
| -------------- | ---------------------------------- |
| Node.js        | Runtime backend                    |
| Express.js     | Membuat API server                 |
| MySQL          | Database                           |
| mysql2/promise | Koneksi database                   |
| bcryptjs       | Hash password dan OTP              |
| nodemailer     | Mengirim email OTP                 |
| dotenv         | Membaca konfigurasi `.env`         |
| cors           | Menghubungkan frontend dan backend |

---

# 🗂️ Struktur Folder

```txt
Tubes_KPL_Aduh/
│
├── backend/
│   ├── api/
│   │   └── authApi.js
│   │
│   ├── db.js
│   ├── mailer.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── authApi.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── VendorCard.jsx
│   │   │
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   │
│   │   ├── data/
│   │   │   └── vendorData.js
│   │   │
│   │   ├── features/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   └── vendor-detail/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Beranda.jsx
│   │   │   ├── VendorList.jsx
│   │   │   ├── VendorDetailPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── PaymentQris.jsx
│   │   │   ├── PaymentSuccess.jsx
│   │   │   ├── History.jsx
│   │   │   ├── HistoriPesanan.jsx
│   │   │   ├── login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── Verify.jsx
│   │   │
│   │   ├── styles/
│   │   │   ├── PaymentQris.css
│   │   │   ├── PaymentSuccess.css
│   │   │   ├── Verify.css
│   │   │   ├── ForgotPassword.css
│   │   │   └── login.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

# ✨ Fitur Aplikasi

## 1. Register

Pengguna dapat membuat akun baru dengan memasukkan nama, email, password, nomor HP, dan alamat.

**File terkait:**

```txt
frontend/src/pages/Register.jsx
backend/server.js
```

**Kode backend:**

```js
app.post("/api/register", async (req, res) => {
  const { nama, email, password, no_hp, alamat } = req.body;

  if (!nama || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Nama, email, dan password wajib diisi.",
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
      no_hp,
      alamat,
    },
  });
});
```

---

## 2. Login

Pengguna dapat login menggunakan email dan password. Setelah login berhasil, data user disimpan ke `localStorage`.

**File terkait:**

```txt
frontend/src/pages/login.jsx
frontend/src/api/authApi.js
backend/server.js
```

**Kode penyimpanan user:**

```js
const result = await loginUser(email, password);

localStorage.setItem("foodora_user", JSON.stringify(result.data));

navigate("/beranda");
```

---

## 3. Forgot Password dan OTP

Pengguna dapat meminta kode OTP untuk melakukan reset password. OTP dikirim menggunakan email, dan untuk kebutuhan demo OTP juga ditampilkan di terminal backend.

**File terkait:**

```txt
frontend/src/pages/ForgotPassword.jsx
frontend/src/pages/Verify.jsx
backend/server.js
backend/mailer.js
```

**Kode generate OTP:**

```js
function generateOtp() {
  return String(crypto.randomInt(100000, 999999));
}
```

**Kode simpan OTP ke database:**

```js
await pool.query(
  `
  INSERT INTO password_reset_otps
  (id_user, channel, target, otp_hash, expires_at)
  VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))
  `,
  [user.id_user, channel, target, otpHash]
);
```

---

## 4. List Vendor

Pengguna dapat melihat daftar vendor katering yang tersedia.

**File terkait:**

```txt
frontend/src/pages/VendorList.jsx
frontend/src/components/VendorCard.jsx
backend/server.js
```

**Kode endpoint vendor:**

```js
app.get("/api/vendors", async (req, res) => {
  const [vendors] = await pool.query(
    "SELECT * FROM vendors ORDER BY id_vendor DESC"
  );

  return res.json({
    success: true,
    data: vendors,
  });
});
```

---

## 5. Detail Vendor dan Menu

Pengguna dapat melihat detail vendor dan menu yang tersedia.

**File terkait:**

```txt
frontend/src/pages/VendorDetailPage.jsx
frontend/src/features/vendor-detail/components/MenuCard.jsx
backend/server.js
```

**Kode endpoint menu vendor:**

```js
app.get("/api/vendors/:id_vendor/menu", async (req, res) => {
  const { id_vendor } = req.params;

  const [menus] = await pool.query(
    "SELECT * FROM menu WHERE id_vendor = ? ORDER BY id_menu DESC",
    [id_vendor]
  );

  return res.json({
    success: true,
    data: menus,
  });
});
```

---

## 6. Keranjang

Pengguna dapat menambahkan menu ke keranjang, mengubah jumlah item, menghapus item, dan melihat total harga.

**File terkait:**

```txt
frontend/src/context/CartContext.jsx
frontend/src/pages/CartPage.jsx
frontend/src/features/cart/components/CartItem.jsx
```

**Kode normalisasi cart item:**

```js
function normalizeCartItem(item) {
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
    price,
    harga: price,
    qty: qty > 0 ? qty : 1,
    jumlah: qty > 0 ? qty : 1,
    image: item.image || item.img || "",
  };
}
```

---

## 7. Checkout dan Booking Tanggal

Pada halaman checkout, pengguna dapat memilih tanggal booking. Tanggal yang sudah pernah dibooking akan terkunci dan tidak bisa dipilih kembali.

**File terkait:**

```txt
frontend/src/pages/CheckoutPage.jsx
frontend/src/features/checkout/styles/checkout.css
backend/server.js
```

**Endpoint tanggal booking:**

```js
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
```

**Validasi tanggal booking:**

```js
if (!selectedDate) {
  setMessage("Pilih tanggal booking terlebih dahulu.");
  return;
}

if (bookedDates.includes(selectedDate)) {
  setMessage("Tanggal tersebut sudah dibooking. Pilih tanggal lain.");
  return;
}
```

**Payload checkout:**

```js
const payload = {
  id_user: user.id_user,
  metode_pembayaran: paymentMethod,
  tanggal_booking: selectedDate,
  items: cartItems.map((item) => ({
    id_menu: item.id_menu || item.id,
    jumlah: item.qty || item.jumlah || 1,
  })),
};
```

---

## 8. Payment QRIS

Setelah checkout berhasil, pengguna diarahkan ke halaman pembayaran QRIS.

**File terkait:**

```txt
frontend/src/pages/PaymentQris.jsx
frontend/src/styles/PaymentQris.css
```

**Kode konfirmasi pembayaran:**

```js
async function handlePayment() {
  try {
    await konfirmasiPembayaran(orderId);

    clearCart();

    navigate("/payment-success", {
      state: {
        orderId,
        total,
        paymentMethod,
        selectedDate,
      },
    });
  } catch (error) {
    alert(error.message || "Gagal mengkonfirmasi pembayaran");
    console.error(error);
  }
}
```

---

## 9. Payment Success

Setelah pembayaran berhasil dikonfirmasi, pengguna diarahkan ke halaman sukses pembayaran.

**File terkait:**

```txt
frontend/src/pages/PaymentSuccess.jsx
frontend/src/styles/PaymentSuccess.css
```

**Kode mengambil data pembayaran:**

```js
const location = useLocation();

const orderId = location.state?.orderId;
const total = location.state?.total;
const paymentMethod = location.state?.paymentMethod;
const selectedDate = location.state?.selectedDate;
```

---

## 10. Histori Pesanan

Pengguna dapat melihat histori pesanan berdasarkan akun yang sedang login.

**File terkait:**

```txt
frontend/src/pages/History.jsx
frontend/src/pages/HistoriPesanan.jsx
backend/server.js
```

**Endpoint histori pesanan:**

```js
app.get("/api/users/:id_user/pesanan", async (req, res) => {
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

  return res.json({
    success: true,
    data: pesananRows,
  });
});
```

---

# 🧠 Penerapan Teknik Konstruksi

---

## 1. Automata

### Pengertian

Automata adalah teknik yang menggambarkan sistem dalam bentuk state atau kondisi. Sistem akan berpindah dari satu state ke state lain berdasarkan input atau aksi tertentu.

### Penerapan pada Project

Automata diterapkan pada alur status pesanan dan pembayaran.

```txt
Menunggu Pembayaran -> Diproses -> Dikirim / Selesai
```

Saat pesanan dibuat, status awal adalah:

```txt
Menunggu Pembayaran
```

Setelah pengguna menekan tombol **Saya Sudah Bayar**, status pembayaran berubah menjadi:

```txt
Lunas
```

dan status pesanan berubah menjadi:

```txt
Diproses
```

### Letak Kode

```txt
backend/server.js
frontend/src/pages/PaymentQris.jsx
frontend/src/pages/PaymentSuccess.jsx
```

### Kode Automata Status

```js
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
```

### Tabel Automata

| Aksi                       | State Awal          | State Akhir         |
| -------------------------- | ------------------- | ------------------- |
| User membuat pesanan       | Belum ada pesanan   | Menunggu Pembayaran |
| User klik Saya Sudah Bayar | Menunggu Pembayaran | Diproses            |
| Sistem update pembayaran   | Belum Dibayar       | Lunas               |

---

## 2. Table Driven Construction

### Pengertian

Table Driven Construction adalah teknik membuat program berdasarkan data tabel, array, atau object sehingga kode tidak terlalu banyak menggunakan percabangan.

### Penerapan pada Project

Teknik ini diterapkan pada checkout, terutama pada bagian metode pembayaran dan jadwal pengiriman.

### Letak Kode

```txt
frontend/src/pages/CheckoutPage.jsx
```

### Kode Metode Pembayaran

```js
const paymentMethods = [
  {
    id: "QRIS",
    name: "QRIS",
    desc: "Scan semua e-wallet",
    icon: QrCode,
  },
  {
    id: "DANA",
    name: "DANA",
    desc: "Bayar via DANA",
    icon: Smartphone,
  },
  {
    id: "GoPay",
    name: "GoPay",
    desc: "Bayar via GoPay",
    icon: Wallet,
  },
  {
    id: "Bank Transfer",
    name: "Bank Transfer",
    desc: "Virtual account",
    icon: CreditCard,
  },
];
```

### Kode Render Menggunakan Map

```jsx
<div className="cox-payment-grid">
  {paymentMethods.map((method) => {
    const Icon = method.icon;
    const active = paymentMethod === method.id;

    return (
      <motion.button
        key={method.id}
        type="button"
        className={active ? "active" : ""}
        onClick={() => setPaymentMethod(method.id)}
      >
        <Icon size={21} />
        <strong>{method.name}</strong>
        <span>{method.desc}</span>
      </motion.button>
    );
  })}
</div>
```

### Kesimpulan

Dengan Table Driven Construction, jika ingin menambah metode pembayaran baru, cukup menambahkan data baru ke array `paymentMethods`.

---

## 3. Parameterization / Generic

### Pengertian

Parameterization atau Generic adalah teknik membuat function atau komponen yang dapat digunakan untuk banyak jenis data melalui parameter.

### Penerapan pada Project

Teknik ini digunakan untuk format harga, format tanggal, pengambilan data item, dan request API.

### Letak Kode

```txt
frontend/src/pages/CheckoutPage.jsx
frontend/src/pages/PaymentQris.jsx
frontend/src/pages/PaymentSuccess.jsx
frontend/src/context/CartContext.jsx
frontend/src/api/authApi.js
```

### Kode Generic Format Rupiah

```js
function formatRp(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}
```

### Kode Generic Format Tanggal

```js
function formatTanggal(value) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
```

### Kode Generic API Request

```js
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
```

### Kesimpulan

Generic membuat kode lebih fleksibel karena satu function dapat digunakan di berbagai halaman dan berbagai data.

---

## 4. Runtime Configuration

### Pengertian

Runtime Configuration adalah teknik pengaturan konfigurasi aplikasi melalui file `.env` atau environment variable yang dibaca saat aplikasi berjalan.

### Penerapan pada Project

Runtime Configuration digunakan pada konfigurasi database, port backend, email pengirim OTP, dan Google Client ID.

### Letak Kode

```txt
backend/.env
backend/db.js
backend/mailer.js
backend/server.js
```

### Contoh `.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_pemesanan_katering
DB_PORT=3306

PORT=3001

MAIL_USER=emailpengirim@gmail.com
MAIL_PASS=app_password_gmail
MAIL_FROM=Foodora <emailpengirim@gmail.com>

GOOGLE_CLIENT_ID=google_client_id
```

### Kode Database Runtime Configuration

```js
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
```

### Kesimpulan

Runtime Configuration membuat aplikasi lebih aman dan mudah dipindahkan ke perangkat lain tanpa mengubah kode utama.

---

## 5. Code Reuse Library

### Pengertian

Code Reuse Library adalah teknik menggunakan library atau modul yang sudah tersedia agar developer tidak membuat semua fitur dari awal.

### Penerapan pada Project

Project ini menggunakan library eksternal dan internal.

### Library Eksternal

| Library          | Fungsi                                  |
| ---------------- | --------------------------------------- |
| react-router-dom | Navigasi antar halaman                  |
| framer-motion    | Animasi UI                              |
| lucide-react     | Icon modern                             |
| react-icons      | Icon tambahan                           |
| mysql2           | Koneksi MySQL                           |
| bcryptjs         | Hash password dan OTP                   |
| nodemailer       | Kirim email OTP                         |
| dotenv           | Membaca `.env`                          |
| cors             | Mengizinkan request frontend ke backend |

### Contoh Framer Motion

```jsx
<motion.section
  className="ps-card"
  initial={{ opacity: 0, y: 38, scale: 0.92 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{
    duration: 0.65,
    ease: "easeOut",
  }}
>
  ...
</motion.section>
```

### Contoh bcrypt

```js
const hashedPassword = await bcrypt.hash(password, 10);
const isPasswordValid = await bcrypt.compare(password, user.password);
```

### Kesimpulan

Dengan library, project menjadi lebih cepat dibuat, lebih rapi, dan lebih mudah dikembangkan.

---

## 6. API

### Pengertian

API adalah penghubung antara frontend dan backend. Frontend mengirim request ke backend, lalu backend mengolah data dan mengirim response.

### Letak Kode

```txt
frontend/src/api/authApi.js
backend/server.js
```

### API Client Frontend

```js
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
```

### Daftar API

| Method | Endpoint                         | Fungsi                |
| ------ | -------------------------------- | --------------------- |
| POST   | `/api/register`                  | Registrasi user       |
| POST   | `/api/login`                     | Login user            |
| POST   | `/api/forgot-password`           | Kirim OTP             |
| POST   | `/api/verify-otp`                | Verifikasi OTP        |
| POST   | `/api/reset-password`            | Reset password        |
| GET    | `/api/vendors`                   | Ambil data vendor     |
| GET    | `/api/vendors/:id_vendor/menu`   | Ambil menu vendor     |
| GET    | `/api/menu`                      | Ambil semua menu      |
| GET    | `/api/pesanan/booked-dates`      | Ambil tanggal booking |
| POST   | `/api/pesanan`                   | Membuat pesanan       |
| PUT    | `/api/pesanan/:id_pesanan/bayar` | Konfirmasi pembayaran |
| GET    | `/api/users/:id_user/pesanan`    | Histori pesanan user  |

---

# 👨‍💻 Pembagian Teknik Berdasarkan Anggota

## Aditio

### Runtime Configuration dan Table Driven Construction

**Bagian:**

```txt
Keranjang, checkout, detail vendor
```

**Letak kode:**

```txt
frontend/src/pages/CheckoutPage.jsx
frontend/src/context/CartContext.jsx
backend/db.js
backend/server.js
```

**Contoh Table Driven Construction:**

```js
const deliverySlots = [
  "Sekarang",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "18:00 - 19:00",
];
```

---

## Chiara

### Library dan API

**Bagian:**

```txt
Login, lupa password, buat password baru
```

**Letak kode:**

```txt
frontend/src/pages/login.jsx
frontend/src/pages/ForgotPassword.jsx
frontend/src/pages/Verify.jsx
frontend/src/api/authApi.js
backend/server.js
backend/mailer.js
```

**Contoh API:**

```js
export function forgotPassword(payload) {
  return request("/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
```

---

## Ghina

### Generic dan Library

**Bagian:**

```txt
Register, verifikasi kode, password berhasil, riwayat pesanan
```

**Letak kode:**

```txt
frontend/src/pages/Register.jsx
frontend/src/pages/Verify.jsx
frontend/src/pages/HistoriPesanan.jsx
frontend/src/api/authApi.js
```

**Contoh Generic:**

```js
async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  return response.json();
}
```

---

## Shofi

### Generic dan Runtime Configuration

**Bagian:**

```txt
Home page, beranda, list vendor, histori
```

**Letak kode:**

```txt
frontend/src/pages/Home.jsx
frontend/src/pages/Beranda.jsx
frontend/src/pages/VendorList.jsx
frontend/src/pages/History.jsx
frontend/src/pages/HistoriPesanan.jsx
frontend/src/components/VendorCard.jsx
```

**Contoh Generic Component:**

```jsx
function VendorCard({ vendor }) {
  return (
    <div className="vendor-card">
      <h3>{vendor.nama_vendor}</h3>
      <p>{vendor.deskripsi}</p>
    </div>
  );
}
```

---

# 🧼 Clean Code

Clean Code diterapkan agar kode mudah dibaca, diperbaiki, dan dikembangkan.

## 1. Penamaan Function Jelas

```js
function formatRp(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}
```

Function tersebut jelas digunakan untuk mengubah angka menjadi format Rupiah.

---

## 2. Pemisahan Tanggung Jawab File

| File                                   | Tanggung Jawab            |
| -------------------------------------- | ------------------------- |
| `backend/db.js`                        | Koneksi database          |
| `backend/mailer.js`                    | Pengiriman email OTP      |
| `backend/server.js`                    | Endpoint backend          |
| `frontend/src/api/authApi.js`          | API client frontend       |
| `frontend/src/context/CartContext.jsx` | State keranjang           |
| `CheckoutPage.jsx`                     | Checkout dan booking      |
| `PaymentQris.jsx`                      | Pembayaran QRIS           |
| `PaymentSuccess.jsx`                   | Halaman sukses pembayaran |

---

## 3. Reusable Function

```js
function getItemPrice(item) {
  return Number(item.price || item.harga || 0);
}

function getItemQty(item) {
  return Number(item.qty || item.jumlah || 1);
}

function getItemName(item) {
  return item.name || item.nama_menu || "Menu Foodora";
}
```

---

## 4. Error Handling

```js
try {
  const result = await createPesanan(payload);
} catch (error) {
  console.error("Checkout error:", error);
  setMessage(error.message || "Gagal membuat pesanan.");
}
```

---

## 5. Validasi Input

```js
if (cartItems.length === 0) {
  setMessage("Keranjang masih kosong.");
  return;
}

if (!selectedDate) {
  setMessage("Pilih tanggal booking terlebih dahulu.");
  return;
}
```

---

# 🧱 Design Pattern

---

## 1. Singleton Pattern

### Pengertian

Singleton Pattern adalah design pattern yang memastikan suatu object hanya dibuat satu kali dan digunakan bersama oleh seluruh aplikasi.

### Penerapan

Singleton Pattern diterapkan pada koneksi database di file `backend/db.js`.

**Letak kode:**

```txt
backend/db.js
```

**Kode:**

```js
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
```

**Digunakan di file lain:**

```js
const pool = require("./db");
```

### Alasan Menggunakan Singleton

Database pool sebaiknya hanya dibuat satu kali agar koneksi tidak dibuat berulang-ulang di setiap request. Dengan Singleton Pattern, koneksi database menjadi lebih efisien dan stabil.

---

## 2. Module Pattern

### Pengertian

Module Pattern digunakan untuk memisahkan kode berdasarkan fungsi tertentu ke dalam file khusus.

### Penerapan

Module Pattern digunakan pada API frontend dan mailer backend.

**Letak kode:**

```txt
frontend/src/api/authApi.js
backend/mailer.js
```

**Contoh API Module:**

```js
export function loginUser(email, password) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function createPesanan(payload) {
  return request("/pesanan", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
```

---

## 3. Context / Provider Pattern

### Pengertian

Context Pattern digunakan untuk menyediakan data global agar bisa digunakan oleh banyak komponen tanpa props drilling.

### Penerapan

Context Pattern digunakan pada fitur keranjang.

**Letak kode:**

```txt
frontend/src/context/CartContext.jsx
frontend/src/App.jsx
```

**Kode:**

```jsx
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart);

  const value = {
    cartItems,
    totalItems,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
```

**Penggunaan:**

```js
const { cartItems, updateQty } = useCart();
```

---

# 🚀 Cara Menjalankan Project

## 1. Clone Repository

```bash
git clone <url-repository>
cd Tubes_KPL_Aduh
```

---

## 2. Install Backend

```bash
cd backend
npm install
```

---

## 3. Buat File `.env` Backend

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_pemesanan_katering
DB_PORT=3306

PORT=3001

MAIL_USER=emailpengirim@gmail.com
MAIL_PASS=app_password_gmail
MAIL_FROM=Foodora <emailpengirim@gmail.com>
```

---

## 4. Jalankan Backend

```bash
npm run dev
```

Backend berjalan di:

```txt
http://localhost:3001
```

---

## 5. Install Frontend

```bash
cd ../frontend
npm install
```

---

## 6. Jalankan Frontend

```bash
npm run dev
```

Frontend berjalan di:

```txt
http://localhost:5173
```

---

# 🌿 Cara Push ke Branch

Branch yang digunakan:

```txt
Ovy_Branch
```

Perintah push:

```bash
git status
git add .
git commit -m "Update fitur checkout, booking tanggal, OTP, dan pembayaran" -m "Menambahkan sistem tanggal booking pada checkout, validasi tanggal yang sudah dipesan, integrasi pesanan ke database, perbaikan OTP forgot password, serta memperbarui tampilan halaman Payment QRIS dan Payment Success."
git push origin Ovy_Branch
```

---

# ✅ Kesimpulan

Foodora Catering App adalah aplikasi pemesanan katering berbasis web yang memiliki fitur utama seperti register, login, forgot password, OTP, list vendor, detail vendor, keranjang, checkout, booking tanggal, pembayaran QRIS, payment success, dan histori pesanan.

Dalam project ini diterapkan beberapa teknik konstruksi perangkat lunak, yaitu:

1. Automata
2. Table Driven Construction
3. Parameterization / Generic
4. Runtime Configuration
5. Code Reuse Library
6. API

Selain itu, project juga menerapkan prinsip **Clean Code** dan beberapa **Design Pattern**, yaitu:

1. Singleton Pattern
2. Module Pattern
3. Context / Provider Pattern

Dengan penerapan tersebut, aplikasi menjadi lebih terstruktur, mudah dipahami, mudah dikembangkan, dan sesuai dengan prinsip konstruksi perangkat lunak.

# 🍽️ Foodora Catering App

### Tugas Besar Konstruksi Perangkat Lunak

Foodora Catering App adalah aplikasi pemesanan katering berbasis web yang memudahkan pengguna dalam melihat daftar vendor, memilih menu makanan, memasukkan pesanan ke keranjang, memilih tanggal booking, melakukan pembayaran, serta melihat histori pesanan.

Project ini dikembangkan menggunakan **React.js** sebagai frontend, **Node.js + Express.js** sebagai backend, dan **MySQL** sebagai database. Selain fitur utama aplikasi, project ini juga menerapkan teknik konstruksi perangkat lunak seperti **Automata**, **Table Driven Construction**, **Parameterization / Generic**, **Runtime Configuration**, **Code Reuse Library**, **API**, serta menerapkan **Unit Testing**, **Performance Testing**, dan **Secure Coding Practice**.

---

# 📌 Daftar Isi

* [Latar Belakang](#-latar-belakang)
* [Tujuan Project](#-tujuan-project)
* [Pembagian Tugas](#-pembagian-tugas)
* [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
* [Struktur Folder](#-struktur-folder)
* [Fitur Aplikasi](#-fitur-aplikasi)
* [Teknik Konstruksi Perangkat Lunak](#-teknik-konstruksi-perangkat-lunak)
* [Design Pattern](#-design-pattern)
* [Clean Code](#-clean-code)
* [Unit Testing](#-unit-testing)
* [Performance Testing](#-performance-testing)
* [Secure Coding Practice](#-secure-coding-practice)
* [Cara Menjalankan Project](#-cara-menjalankan-project)
* [Cara Menjalankan Testing](#-cara-menjalankan-testing)
* [Kesimpulan](#-kesimpulan)

---

# 📖 Latar Belakang

Kebutuhan terhadap layanan katering semakin meningkat, baik untuk acara keluarga, sekolah, kantor, maupun kegiatan lainnya. Namun, proses pemesanan katering secara manual sering kali kurang efisien karena pengguna harus menghubungi vendor satu per satu, menanyakan menu, harga, jadwal, hingga melakukan pembayaran secara terpisah.

Oleh karena itu, dibuatlah **Foodora Catering App** sebagai aplikasi berbasis web yang membantu pengguna melakukan pemesanan katering secara lebih mudah dan terstruktur. Melalui aplikasi ini, pengguna dapat melihat daftar vendor, memilih menu, menambahkan menu ke keranjang, memilih tanggal booking, melakukan pembayaran, dan melihat histori pesanan.

Project ini juga dibuat sebagai implementasi dari mata kuliah **Konstruksi Perangkat Lunak**, khususnya dalam penerapan teknik konstruksi kode, penggunaan API, runtime configuration, code reuse, clean code, design pattern, testing, dan secure coding.

---

# 🎯 Tujuan Project

Tujuan dari pembuatan aplikasi ini adalah:

1. Membuat aplikasi pemesanan katering berbasis web.
2. Memudahkan pengguna dalam melihat vendor dan memilih menu.
3. Menyediakan fitur keranjang dan checkout.
4. Menyediakan fitur booking tanggal agar tanggal yang sudah dipesan tidak dapat dipilih ulang.
5. Menyediakan fitur pembayaran QRIS dan halaman sukses pembayaran.
6. Menyediakan fitur autentikasi seperti register, login, forgot password, OTP, dan reset password.
7. Mengintegrasikan frontend dengan backend menggunakan API.
8. Menerapkan teknik konstruksi perangkat lunak.
9. Menerapkan clean code dan design pattern.
10. Menambahkan unit testing, performance testing, dan secure coding practice.

---

# 👥 Pembagian Tugas

| Nama       | Bagian yang Dikerjakan                                        |
| ---------- | ------------------------------------------------------------- |
| **Aditio** | Keranjang, checkout, detail vendor                            |
| **Chiara** | Login, lupa password, buat password baru                      |
| **Shofi**  | Home page, beranda, list vendor, histori                      |
| **Ghina**  | Register, verifikasi kode, password berhasil, riwayat pesanan |

---

# 🧩 Teknik Konstruksi Berdasarkan Anggota

| Nama       | Teknik Konstruksi                                   |
| ---------- | --------------------------------------------------- |
| **Aditio** | Runtime Configuration dan Table Driven Construction |
| **Chiara** | Library dan API                                     |
| **Ghina**  | Generic dan Library                                 |
| **Shofi**  | Generic dan Runtime Configuration                   |

Selain pembagian tersebut, project ini juga menerapkan **Automata** pada alur status pesanan dan pembayaran.

---

# 🛠️ Teknologi yang Digunakan

## Frontend

| Teknologi        | Fungsi                                 |
| ---------------- | -------------------------------------- |
| React.js         | Membuat antarmuka aplikasi             |
| Vite             | Build tool frontend                    |
| React Router DOM | Navigasi antar halaman                 |
| Framer Motion    | Animasi tampilan                       |
| Lucide React     | Icon modern                            |
| React Icons      | Icon tambahan                          |
| CSS              | Styling halaman                        |
| LocalStorage     | Menyimpan data user dan cart sementara |
| Vitest           | Unit testing frontend                  |

## Backend

| Teknologi          | Fungsi                             |
| ------------------ | ---------------------------------- |
| Node.js            | Runtime backend                    |
| Express.js         | Membuat API server                 |
| MySQL              | Database                           |
| mysql2/promise     | Koneksi database                   |
| bcryptjs           | Hash password dan OTP              |
| nodemailer         | Mengirim email OTP                 |
| dotenv             | Membaca konfigurasi `.env`         |
| cors               | Mengatur akses frontend ke backend |
| helmet             | Menambahkan security headers       |
| express-rate-limit | Membatasi request berlebih         |
| Jest               | Unit testing backend               |

---

# 🗂️ Struktur Folder

```txt
Tubes_KPL_Aduh/
│
├── backend/
│   ├── api/
│   │   └── authApi.js
│   │
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── authUtils.test.js
│   │   │   └── orderUtils.test.js
│   │   │
│   │   └── performance/
│   │       └── api.perf.js
│   │
│   ├── utils/
│   │   ├── authUtils.js
│   │   └── orderUtils.js
│   │
│   ├── db.js
│   ├── mailer.js
│   ├── server.js
│   ├── jest.config.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── tests/
│   │   └── performance/
│   │       └── frontend.perf.cjs
│   │
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
│   │   ├── features/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   └── vendor-detail/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
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
│   │   ├── utils/
│   │   │   ├── formatters.js
│   │   │   ├── cartUtils.js
│   │   │   ├── checkoutUtils.js
│   │   │   └── __tests__/
│   │   │       ├── formatters.test.js
│   │   │       ├── cartUtils.test.js
│   │   │       └── checkoutUtils.test.js
│   │   │
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── vitest.config.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

# ✨ Fitur Aplikasi

## 1. Register

Pengguna dapat membuat akun baru dengan nama, email, password, nomor HP, dan alamat.

File terkait:

```txt
frontend/src/pages/Register.jsx
backend/server.js
```

## 2. Login

Pengguna dapat login menggunakan email dan password. Setelah login berhasil, data user disimpan ke `localStorage`.

File terkait:

```txt
frontend/src/pages/login.jsx
frontend/src/api/authApi.js
backend/server.js
```

Contoh kode:

```js
const result = await loginUser(email, password);

localStorage.setItem("foodora_user", JSON.stringify(result.data));

navigate("/beranda");
```

## 3. Forgot Password dan OTP

Pengguna dapat meminta kode OTP untuk reset password. OTP dikirim melalui email dan juga dapat ditampilkan di terminal backend untuk kebutuhan demo.

File terkait:

```txt
frontend/src/pages/ForgotPassword.jsx
frontend/src/pages/Verify.jsx
backend/server.js
backend/mailer.js
```

Contoh kode generate OTP:

```js
function generateOtp() {
  return String(crypto.randomInt(100000, 999999));
}
```

## 4. List Vendor

Pengguna dapat melihat daftar vendor katering.

File terkait:

```txt
frontend/src/pages/VendorList.jsx
frontend/src/components/VendorCard.jsx
backend/server.js
```

Contoh endpoint:

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

## 5. Detail Vendor dan Menu

Pengguna dapat melihat detail vendor dan menu dari vendor tertentu.

File terkait:

```txt
frontend/src/pages/VendorDetailPage.jsx
frontend/src/features/vendor-detail/components/MenuCard.jsx
backend/server.js
```

## 6. Keranjang

Pengguna dapat menambahkan menu ke keranjang, mengubah jumlah item, dan menghapus item.

File terkait:

```txt
frontend/src/context/CartContext.jsx
frontend/src/pages/CartPage.jsx
frontend/src/features/cart/components/CartItem.jsx
```

## 7. Checkout dan Booking Tanggal

Pengguna dapat melakukan checkout dan memilih tanggal booking. Tanggal yang sudah dibooking tidak dapat dipilih kembali.

File terkait:

```txt
frontend/src/pages/CheckoutPage.jsx
backend/server.js
```

Contoh validasi tanggal booking:

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

## 8. Payment QRIS

Setelah checkout berhasil, pengguna diarahkan ke halaman pembayaran QRIS.

File terkait:

```txt
frontend/src/pages/PaymentQris.jsx
frontend/src/styles/PaymentQris.css
```

## 9. Payment Success

Setelah pembayaran dikonfirmasi, pengguna diarahkan ke halaman sukses pembayaran.

File terkait:

```txt
frontend/src/pages/PaymentSuccess.jsx
frontend/src/styles/PaymentSuccess.css
```

## 10. Histori Pesanan

Pengguna dapat melihat histori pesanan berdasarkan akun yang sedang login.

File terkait:

```txt
frontend/src/pages/History.jsx
frontend/src/pages/HistoriPesanan.jsx
backend/server.js
```

---

# 🧠 Teknik Konstruksi Perangkat Lunak

## 1. Automata

Automata diterapkan pada alur status pesanan dan pembayaran.

Alur state:

```txt
Menunggu Pembayaran -> Diproses -> Dikirim / Selesai
```

Pada saat pesanan dibuat, status pesanan adalah:

```txt
Menunggu Pembayaran
```

Setelah user melakukan konfirmasi pembayaran, status pembayaran menjadi:

```txt
Lunas
```

dan status pesanan berubah menjadi:

```txt
Diproses
```

Letak kode:

```txt
backend/server.js
frontend/src/pages/PaymentQris.jsx
frontend/src/pages/PaymentSuccess.jsx
```

Contoh kode:

```js
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
```

## 2. Table Driven Construction

Table Driven Construction digunakan pada checkout untuk menampilkan metode pembayaran berdasarkan data array.

Letak kode:

```txt
frontend/src/pages/CheckoutPage.jsx
```

Contoh kode:

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

Data tersebut dirender menggunakan `map()`:

```jsx
{paymentMethods.map((method) => {
  const Icon = method.icon;

  return (
    <button
      key={method.id}
      type="button"
      onClick={() => setPaymentMethod(method.id)}
    >
      <Icon size={21} />
      <strong>{method.name}</strong>
      <span>{method.desc}</span>
    </button>
  );
})}
```

## 3. Parameterization / Generic

Generic digunakan pada function yang menerima parameter sehingga dapat dipakai berulang kali.

Letak kode:

```txt
frontend/src/utils/formatters.js
frontend/src/utils/cartUtils.js
frontend/src/utils/checkoutUtils.js
frontend/src/api/authApi.js
```

Contoh kode format Rupiah:

```js
export function formatRp(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}
```

Contoh kode format tanggal:

```js
export function formatTanggal(value) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
```

## 4. Runtime Configuration

Runtime Configuration digunakan untuk mengatur database, port server, email OTP, dan allowed origin melalui `.env`.

Letak kode:

```txt
backend/.env
backend/db.js
backend/server.js
backend/mailer.js
```

Contoh `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_pemesanan_katering
DB_PORT=3306

PORT=3001
CLIENT_ORIGIN=http://localhost:5173

MAIL_USER=emailpengirim@gmail.com
MAIL_PASS=app_password_gmail
MAIL_FROM=Foodora <emailpengirim@gmail.com>
```

Contoh kode:

```js
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});
```

## 5. Code Reuse Library

Project ini menggunakan library eksternal dan internal agar kode tidak dibuat dari awal.

Library eksternal:

| Library            | Fungsi                |
| ------------------ | --------------------- |
| react-router-dom   | Navigasi halaman      |
| framer-motion      | Animasi UI            |
| lucide-react       | Icon UI               |
| mysql2             | Koneksi database      |
| bcryptjs           | Hash password dan OTP |
| nodemailer         | Kirim email OTP       |
| dotenv             | Membaca `.env`        |
| helmet             | Security headers      |
| express-rate-limit | Rate limiter          |
| jest               | Unit test backend     |
| vitest             | Unit test frontend    |

Library internal:

```txt
frontend/src/api/authApi.js
frontend/src/utils/formatters.js
frontend/src/utils/cartUtils.js
frontend/src/utils/checkoutUtils.js
backend/db.js
backend/mailer.js
backend/utils/authUtils.js
backend/utils/orderUtils.js
```

## 6. API

API digunakan sebagai penghubung frontend dan backend.

Letak kode:

```txt
frontend/src/api/authApi.js
backend/server.js
```

Contoh API client frontend:

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

Daftar API:

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

# 🧱 Design Pattern

## Singleton Pattern

Design pattern yang digunakan pada project ini adalah **Singleton Pattern**.

Singleton Pattern adalah design pattern yang memastikan sebuah object hanya dibuat satu kali dan digunakan bersama oleh bagian lain dalam aplikasi.

Pada project ini, Singleton Pattern diterapkan pada koneksi database MySQL di file:

```txt
backend/db.js
```

Kode:

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

Digunakan pada file lain:

```js
const pool = require("./db");
```

Alasan menggunakan Singleton Pattern:

1. Koneksi database cukup dibuat satu kali.
2. Menghindari pembuatan koneksi berulang pada setiap request.
3. Menghemat resource server.
4. Membuat kode backend lebih rapi.
5. Memudahkan maintenance konfigurasi database.

---

# 🧼 Clean Code

Clean code diterapkan agar kode mudah dibaca, diperbaiki, dan dikembangkan.

## 1. Penamaan Function Jelas

Contoh:

```js
function generateOtp() {
  return String(crypto.randomInt(100000, 999999));
}
```

```js
function normalizeOrderItems(items) {
  // logic normalisasi item pesanan
}
```

Nama function menjelaskan fungsi dari kode tersebut.

## 2. Pemisahan Tanggung Jawab File

| File                                   | Tanggung Jawab            |
| -------------------------------------- | ------------------------- |
| `backend/db.js`                        | Koneksi database          |
| `backend/mailer.js`                    | Kirim email OTP           |
| `backend/server.js`                    | Endpoint API              |
| `backend/utils/authUtils.js`           | Helper autentikasi        |
| `backend/utils/orderUtils.js`          | Helper pesanan            |
| `frontend/src/api/authApi.js`          | API client frontend       |
| `frontend/src/context/CartContext.jsx` | State keranjang           |
| `frontend/src/utils/formatters.js`     | Format Rupiah dan tanggal |
| `frontend/src/utils/cartUtils.js`      | Helper cart               |
| `frontend/src/utils/checkoutUtils.js`  | Helper checkout           |

## 3. Error Handling

Contoh:

```js
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
```

## 4. Validasi Input

Contoh:

```js
if (!email || !password) {
  return res.status(400).json({
    success: false,
    message: "Email dan password wajib diisi.",
  });
}
```

## 5. Parameterized Query

Contoh:

```js
const [users] = await pool.query(
  "SELECT * FROM users WHERE email = ? LIMIT 1",
  [email]
);
```

Dengan parameterized query, risiko SQL Injection dapat dikurangi.

---

# 🧪 Unit Testing

Unit Testing digunakan untuk menguji bagian kecil dari program, seperti function helper dan logic tertentu.

## 1. Unit Testing Backend

Backend menggunakan **Jest**.

Letak file test:

```txt
backend/tests/unit/authUtils.test.js
backend/tests/unit/orderUtils.test.js
```

File utility yang diuji:

```txt
backend/utils/authUtils.js
backend/utils/orderUtils.js
```

Contoh kode yang diuji:

```js
function normalizeOrderItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      const idMenu = Number(item.id_menu || item.id);
      const jumlah = Number(item.jumlah || item.qty || 1);

      if (!idMenu || Number.isNaN(idMenu) || jumlah <= 0) {
        return null;
      }

      return {
        id_menu: idMenu,
        jumlah,
      };
    })
    .filter(Boolean);
}
```

Contoh unit test:

```js
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
```

Script:

```json
"test": "jest",
"test:unit": "jest tests/unit"
```

Cara menjalankan:

```bash
cd backend
npm run test:unit
```

## 2. Unit Testing Frontend

Frontend menggunakan **Vitest**.

Letak file test:

```txt
frontend/src/utils/__tests__/formatters.test.js
frontend/src/utils/__tests__/cartUtils.test.js
frontend/src/utils/__tests__/checkoutUtils.test.js
```

File utility yang diuji:

```txt
frontend/src/utils/formatters.js
frontend/src/utils/cartUtils.js
frontend/src/utils/checkoutUtils.js
```

Contoh kode yang diuji:

```js
export function formatRp(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}
```

Contoh unit test:

```js
test("formatRp mengubah angka menjadi format Rupiah", () => {
  expect(formatRp(25000)).toBe("Rp 25.000");
});
```

Script:

```json
"test": "vitest",
"test:unit": "vitest run"
```

Cara menjalankan:

```bash
cd frontend
npm run test:unit
```

---

# 🚀 Performance Testing

Performance Testing digunakan untuk mengetahui performa backend dan frontend saat aplikasi dijalankan.

## 1. Performance Testing Backend

Backend performance testing dilakukan menggunakan fitur bawaan Node.js yaitu `fetch` dan `perf_hooks`.

Letak file:

```txt
backend/tests/performance/api.perf.js
```

Endpoint yang diuji:

| Endpoint                    | Fungsi                    |
| --------------------------- | ------------------------- |
| `/api/vendors`              | Mengambil data vendor     |
| `/api/menu`                 | Mengambil data menu       |
| `/api/pesanan/booked-dates` | Mengambil tanggal booking |

Contoh kode:

```js
const { performance } = require("perf_hooks");

const BASE_URL = process.env.PERF_BASE_URL || "http://localhost:3001";

const scenarios = [
  {
    name: "Get Vendors",
    url: `${BASE_URL}/api/vendors`,
  },
  {
    name: "Get Menu",
    url: `${BASE_URL}/api/menu`,
  },
  {
    name: "Get Booked Dates",
    url: `${BASE_URL}/api/pesanan/booked-dates`,
  },
];
```

Performance test menghitung:

1. Average response time
2. Minimum response time
3. Maximum response time
4. P95 response time
5. Jumlah error request

Script:

```json
"test:perf": "node tests/performance/api.perf.js"
```

Cara menjalankan:

```bash
cd backend
npm run dev
```

Buka terminal kedua:

```bash
cd backend
npm run test:perf
```

## 2. Performance Testing Frontend

Frontend performance testing dilakukan dengan mengecek hasil build frontend, response time halaman, dan ukuran bundle JS/CSS.

Letak file:

```txt
frontend/tests/performance/frontend.perf.cjs
```

Halaman yang diuji:

| Halaman | URL |
| ------- | --- |
| Home    | `/` |

Performance test frontend menghitung:

1. Response time halaman
2. Average load time
3. P95 load time
4. Error request
5. Total ukuran bundle JS
6. Total ukuran bundle CSS

Contoh kode:

```js
const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const BASE_URL = process.env.PERF_FRONTEND_URL || "http://127.0.0.1:4173";

const REQUEST_COUNT = 10;
const MAX_AVERAGE_RESPONSE_TIME = 1000;
const MAX_P95_RESPONSE_TIME = 1500;
const MAX_JS_BUNDLE_SIZE_KB = 700;
const MAX_CSS_BUNDLE_SIZE_KB = 300;
```

Script:

```json
"perf:preview": "vite preview --host 127.0.0.1 --port 4173",
"perf:lighthouse": "node tests/performance/frontend.perf.cjs",
"test:perf": "npm run build && start-server-and-test perf:preview http://127.0.0.1:4173 perf:lighthouse"
```

Cara menjalankan:

```bash
cd frontend
npm run test:perf
```

Catatan hasil build:

```txt
Some chunks are larger than 500 kB after minification
```

Peringatan tersebut bukan error, tetapi catatan bahwa bundle frontend dapat dioptimalkan lagi menggunakan dynamic import atau code splitting.

---

# 🔐 Secure Coding Practice

Secure Coding Practice diterapkan untuk meningkatkan keamanan aplikasi.

## 1. Password dan OTP di-hash

Password user dan OTP tidak disimpan dalam bentuk asli, tetapi di-hash menggunakan `bcryptjs`.

Contoh:

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

```js
const otpHash = await bcrypt.hash(otp, 10);
```

## 2. Parameterized Query

Query database menggunakan parameter `?` untuk mengurangi risiko SQL Injection.

Contoh:

```js
const [users] = await pool.query(
  "SELECT * FROM users WHERE email = ? LIMIT 1",
  [email]
);
```

## 3. Environment Variable

Data sensitif seperti konfigurasi database dan email OTP disimpan pada `.env`.

Contoh:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_pemesanan_katering

MAIL_USER=emailpengirim@gmail.com
MAIL_PASS=app_password_gmail
```

## 4. `.env` Tidak Dipush ke GitHub

File `.env` dimasukkan ke `.gitignore`.

Contoh `.gitignore`:

```gitignore
node_modules/
backend/node_modules/
frontend/node_modules/

.env
backend/.env
frontend/.env
```

## 5. Helmet Security Headers

Backend menggunakan `helmet` untuk menambahkan security headers.

Contoh:

```js
const helmet = require("helmet");

app.use(helmet());
```

## 6. CORS Configuration

Backend hanya mengizinkan origin tertentu dari frontend.

Contoh:

```js
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin tidak diizinkan oleh CORS."));
    },
    credentials: true,
  })
);
```

## 7. Rate Limiter

Rate limiter digunakan untuk membatasi request berlebih pada endpoint sensitif seperti login dan OTP.

Contoh:

```js
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak percobaan login. Coba lagi nanti.",
  },
});
```

Digunakan pada route login:

```js
app.post("/api/login", authLimiter, async (req, res) => {
  // logic login
});
```

## 8. Validasi Input

Backend melakukan validasi input sebelum data diproses.

Contoh:

```js
if (!email || !password) {
  return res.status(400).json({
    success: false,
    message: "Email dan password wajib diisi.",
  });
}
```

## 9. Audit Dependency

Pengujian keamanan dependency dilakukan menggunakan:

```bash
npm audit
```

Pada backend sempat ditemukan vulnerability dari dependency performance testing `autocannon`. Karena dependency tersebut hanya digunakan untuk testing, dependency tersebut dihapus dan performance testing backend diganti menggunakan fitur bawaan Node.js yaitu `fetch` dan `perf_hooks`.

Setelah perbaikan dilakukan, hasil audit backend menunjukkan:

```txt
found 0 vulnerabilities
```

---

# ▶️ Cara Menjalankan Project

## 1. Clone Repository

```bash
git clone <url-repository>
cd Tubes_KPL_Aduh
```

## 2. Install Backend

```bash
cd backend
npm install
```

## 3. Buat File `.env` Backend

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_pemesanan_katering
DB_PORT=3306

PORT=3001
CLIENT_ORIGIN=http://localhost:5173

MAIL_USER=emailpengirim@gmail.com
MAIL_PASS=app_password_gmail
MAIL_FROM=Foodora <emailpengirim@gmail.com>
```

## 4. Jalankan Backend

```bash
npm run dev
```

Backend berjalan di:

```txt
http://localhost:3001
```

## 5. Install Frontend

```bash
cd ../frontend
npm install
```

## 6. Jalankan Frontend

```bash
npm run dev
```

Frontend berjalan di:

```txt
http://localhost:5173
```

---

# 🧪 Cara Menjalankan Testing

## Backend Unit Test

```bash
cd backend
npm run test:unit
```

## Backend Performance Test

Terminal pertama:

```bash
cd backend
npm run dev
```

Terminal kedua:

```bash
cd backend
npm run test:perf
```

## Backend Security Audit

```bash
cd backend
npm audit
```

## Frontend Unit Test

```bash
cd frontend
npm run test:unit
```

## Frontend Performance Test

```bash
cd frontend
npm run test:perf
```

## Frontend Security Audit

```bash
cd frontend
npm audit
```

---

# 🌿 Cara Commit dan Push

Branch yang digunakan:

```txt
Ovy_Branch
```

Perintah:

```bash
git status
git add .
git commit -m "Menambahkan unit testing, performance testing, secure coding, dan README final"
git push origin Ovy_Branch
```

---

# ✅ Kesimpulan

Foodora Catering App merupakan aplikasi pemesanan katering berbasis web yang memiliki fitur utama seperti register, login, forgot password, OTP, list vendor, detail vendor, keranjang, checkout, booking tanggal, pembayaran QRIS, payment success, dan histori pesanan.

Project ini menerapkan teknik konstruksi perangkat lunak, yaitu:

1. Automata
2. Table Driven Construction
3. Parameterization / Generic
4. Runtime Configuration
5. Code Reuse Library
6. API

Project ini juga menerapkan:

1. Singleton Pattern pada koneksi database.
2. Clean Code melalui pemisahan file dan penamaan function yang jelas.
3. Unit Testing pada backend dan frontend.
4. Performance Testing pada backend dan frontend.
5. Secure Coding Practice melalui bcrypt, parameterized query, `.env`, `.gitignore`, Helmet, CORS configuration, rate limiter, validasi input, dan npm audit.

Dengan penerapan tersebut, aplikasi menjadi lebih rapi, lebih aman, lebih mudah diuji, dan lebih mudah dikembangkan.

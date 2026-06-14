import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  CreditCard,
  QrCode,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

import { konfirmasiPembayaran } from "../api/authApi";
import { useCart } from "../context/CartContext";
import "../styles/PaymentQris.css";

function formatRp(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}

function formatTanggal(value) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function PaymentQris() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { clearCart } = useCart();

  if (!state) {
    return (
      <main className="qris-page">
        <section className="qris-empty-card">
          <h1>Data pembayaran tidak ditemukan</h1>
          <p>Silakan kembali ke checkout dan buat pesanan terlebih dahulu.</p>

          <button onClick={() => navigate("/checkout")}>
            Kembali ke Checkout
          </button>
        </section>
      </main>
    );
  }

  const { orderId, total, paymentMethod, qrUrl, selectedDate } = state;

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

  async function handleCopyOrderId() {
    try {
      await navigator.clipboard.writeText(String(orderId));
      alert("Order ID berhasil disalin.");
    } catch (error) {
      alert("Gagal menyalin Order ID.");
    }
  }

  return (
    <main className="qris-page">
      <div className="qris-blob qris-blob-one"></div>
      <div className="qris-blob qris-blob-two"></div>
      <div className="qris-blob qris-blob-three"></div>

      <motion.section
        className="qris-wrapper"
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <section className="qris-left-card">
          <button className="qris-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Kembali
          </button>

          <motion.div
            className="qris-badge"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <ShieldCheck size={16} />
            Secure QRIS Payment
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            Selesaikan Pembayaran
          </motion.h1>

          <motion.p
            className="qris-subtitle"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
          >
            Scan QR Code berikut menggunakan aplikasi e-wallet atau mobile
            banking yang mendukung QRIS.
          </motion.p>

          <motion.div
            className="qris-steps"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
          >
            <div className="qris-step active">
              <span>1</span>
              <p>Buka e-wallet</p>
            </div>

            <i></i>

            <div className="qris-step active">
              <span>2</span>
              <p>Scan QRIS</p>
            </div>

            <i></i>

            <div className="qris-step">
              <span>3</span>
              <p>Konfirmasi</p>
            </div>
          </motion.div>

          <motion.div
            className="qris-info-box"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52 }}
          >
            <div>
              <Clock3 size={21} />
            </div>

            <section>
              <h3>Menunggu Pembayaran</h3>
              <p>
                Setelah kamu membayar, klik tombol <b>Saya Sudah Bayar</b> agar
                status pesanan berubah menjadi diproses.
              </p>
            </section>
          </motion.div>

          <motion.div
            className="qris-detail-list"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62 }}
          >
            <div>
              <span>
                <CreditCard size={17} />
                Metode
              </span>
              <strong>{paymentMethod || "QRIS"}</strong>
            </div>

            <div>
              <span>
                <CalendarDays size={17} />
                Tanggal Booking
              </span>
              <strong>{formatTanggal(selectedDate)}</strong>
            </div>

            <div>
              <span>
                <Wallet size={17} />
                Total Pembayaran
              </span>
              <strong>{formatRp(total)}</strong>
            </div>
          </motion.div>
        </section>

        <section className="qris-right-card">
          <motion.div
            className="qris-qr-card"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 16,
              delay: 0.2,
            }}
          >
            <motion.div
              className="qris-icon-ring"
              animate={{
                scale: [1, 1.06, 1],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <QrCode size={34} />
            </motion.div>

            <span className="qris-mini-badge">
              <Sparkles size={14} />
              Foodora Payment
            </span>

            <h2>Scan QRIS</h2>

            <div className="qris-image-wrap">
              <div className="qris-scan-line"></div>

              <img src={qrUrl} alt="QRIS Payment Code" />
            </div>

            <div className="qris-order-box">
              <div>
                <span>Order ID</span>
                <strong>#{orderId}</strong>
              </div>

              <button type="button" onClick={handleCopyOrderId}>
                <Copy size={16} />
              </button>
            </div>

            <div className="qris-total-box">
              <span>Total Bayar</span>
              <strong>{formatRp(total)}</strong>
            </div>

            <motion.button
              type="button"
              className="qris-paid-btn"
              onClick={handlePayment}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <CheckCircle2 size={21} />
              Saya Sudah Bayar
            </motion.button>

            <p className="qris-safe-text">
              <ShieldCheck size={16} />
              Pembayaran aman dan akan dikonfirmasi oleh sistem.
            </p>
          </motion.div>
        </section>
      </motion.section>
    </main>
  );
}
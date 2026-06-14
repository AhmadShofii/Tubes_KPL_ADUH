import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Home,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Utensils,
  Wallet,
} from "lucide-react";
import "../styles/PaymentSuccess.css";

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

export default function PaymentSuccess() {
  const location = useLocation();

  const orderId = location.state?.orderId;
  const total = location.state?.total;
  const paymentMethod = location.state?.paymentMethod;
  const selectedDate = location.state?.selectedDate;

  return (
    <main className="ps-page">
      <div className="ps-blob ps-blob-one"></div>
      <div className="ps-blob ps-blob-two"></div>
      <div className="ps-blob ps-blob-three"></div>

      <div className="ps-confetti">
        {[...Array(24)].map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      <motion.section
        className="ps-card"
        initial={{ opacity: 0, y: 38, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.65,
          ease: "easeOut",
        }}
      >
        <motion.div
          className="ps-success-icon"
          initial={{ scale: 0, rotate: -120 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 15,
            delay: 0.15,
          }}
        >
          <CheckCircle2 />
        </motion.div>

        <motion.div
          className="ps-badge"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
        >
          <Sparkles size={16} />
          Pembayaran Berhasil
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
        >
          Pesanan Kamu Berhasil!
        </motion.h1>

        <motion.p
          className="ps-subtitle"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44 }}
        >
          Terima kasih sudah memesan di Foodora. Pembayaran sudah dikonfirmasi
          dan pesanan sedang diproses oleh vendor.
        </motion.p>

        <motion.div
          className="ps-layout"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54 }}
        >
          <section className="ps-receipt-card">
            <div className="ps-receipt-head">
              <div>
                <span>ORDER RECEIPT</span>
                <h2>Detail Pesanan</h2>
              </div>

              <ReceiptText />
            </div>

            <div className="ps-receipt-list">
              <div>
                <span>
                  <ReceiptText size={17} />
                  Order ID
                </span>
                <strong>#{orderId || "-"}</strong>
              </div>

              <div>
                <span>
                  <Wallet size={17} />
                  Metode Bayar
                </span>
                <strong>{paymentMethod || "-"}</strong>
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
                  <Clock3 size={17} />
                  Estimasi
                </span>
                <strong>20 - 35 Menit</strong>
              </div>
            </div>

            <div className="ps-total-box">
              <span>Total Pembayaran</span>
              <strong>{formatRp(total)}</strong>
            </div>
          </section>

          <section className="ps-status-card">
            <div className="ps-status-head">
              <span>ORDER STATUS</span>
              <h2>Proses Pesanan</h2>
            </div>

            <div className="ps-timeline">
              <div className="ps-timeline-item active">
                <div className="ps-timeline-icon">
                  <CheckCircle2 />
                </div>

                <section>
                  <h3>Pembayaran Berhasil</h3>
                  <p>Transaksi kamu sudah dikonfirmasi.</p>
                </section>
              </div>

              <div className="ps-timeline-line active"></div>

              <div className="ps-timeline-item active">
                <div className="ps-timeline-icon">
                  <Utensils />
                </div>

                <section>
                  <h3>Pesanan Diproses</h3>
                  <p>Vendor mulai menyiapkan makanan.</p>
                </section>
              </div>

              <div className="ps-timeline-line"></div>

              <div className="ps-timeline-item">
                <div className="ps-timeline-icon">
                  <Truck />
                </div>

                <section>
                  <h3>Pesanan Dikirim</h3>
                  <p>Pesanan akan segera menuju alamatmu.</p>
                </section>
              </div>
            </div>
          </section>
        </motion.div>

        <motion.div
          className="ps-note"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68 }}
        >
          <ShieldCheck size={22} />

          <p>
            Simpan Order ID untuk mengecek status pesanan. Vendor akan memproses
            pesanan sesuai tanggal booking yang kamu pilih.
          </p>
        </motion.div>

        <motion.div
          className="ps-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78 }}
        >
          <Link to="/history" className="ps-primary-btn">
            <ShoppingBag size={19} />
            Lihat Pesanan
            <ChevronRight size={18} />
          </Link>

          <Link to="/beranda" className="ps-secondary-btn">
            <Home size={19} />
            Pesan Lagi
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
}
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/HistoriPesanan.css";

import {
  FaInstagram,
  FaEnvelope,
  FaAt,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaTruck,
  FaReceipt,
  FaRedoAlt,
  FaEye,
  FaUtensils,
  FaCalendarAlt,
  FaWallet,
} from "react-icons/fa";

const orders = [
  {
    id: 1,
    name: "Nasi Kuning Seraya",
    code: "#FD-66512",
    items: "2 Items",
    price: "Rp 125.000",
    status: "Selesai",
    date: "05 Okt 2025",
    payment: "QRIS",
    vendor: "Dapur Seraya",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800",
  },
  {
    id: 2,
    name: "Ayam Kremes",
    code: "#FD-66513",
    items: "2 Items",
    price: "Rp 160.000",
    status: "Diproses",
    date: "01 Okt 2025",
    payment: "GoPay",
    vendor: "Ayam Kremes Bu Sari",
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=800",
  },
  {
    id: 3,
    name: "Tahu Kupat Minah",
    code: "#FD-44201",
    items: "1 Items",
    price: "Rp 90.000",
    status: "Dibatalkan",
    date: "20 Agu 2025",
    payment: "DANA",
    vendor: "Tahu Kupat Minah",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800",
  },
  {
    id: 4,
    name: "Nasi Goreng Ayam Soraya",
    code: "#FD-33109",
    items: "4 Items",
    price: "Rp 130.000",
    status: "Selesai",
    date: "04 Agu 2025",
    payment: "Bank Transfer",
    vendor: "Nasi Goreng Soraya",
    image:
      "https://images.unsplash.com/photo-1604908176997-431dcced9d9b?q=80&w=800",
  },
];

const filters = [
  {
    label: "Semua",
    icon: FaReceipt,
  },
  {
    label: "Selesai",
    icon: FaCheckCircle,
  },
  {
    label: "Diproses",
    icon: FaClock,
  },
  {
    label: "Dibatalkan",
    icon: FaTimesCircle,
  },
];

const statusConfig = {
  Selesai: {
    icon: FaCheckCircle,
    className: "hp-status-done",
    text: "Pesanan Selesai",
  },
  Diproses: {
    icon: FaClock,
    className: "hp-status-process",
    text: "Sedang Diproses",
  },
  Dibatalkan: {
    icon: FaTimesCircle,
    className: "hp-status-cancel",
    text: "Pesanan Dibatalkan",
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
};

function HistoriPesanan() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filteredOrders = useMemo(() => {
    if (activeFilter === "Semua") return orders;

    return orders.filter((order) => order.status === activeFilter);
  }, [activeFilter]);

  const lastOrder = orders[0];

  const totalSelesai = orders.filter((order) => order.status === "Selesai").length;
  const totalDiproses = orders.filter((order) => order.status === "Diproses").length;
  const totalDibatalkan = orders.filter(
    (order) => order.status === "Dibatalkan"
  ).length;

  return (
    <div className="hp-page">
      <main className="hp-main">
        <motion.section
          className="hp-hero"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <span className="hp-hero-badge">ORDER HISTORY</span>

            <h1>Riwayat Pesanan</h1>

            <p>
              Pantau pesananmu, cek status transaksi, dan pesan kembali menu
              favorit Foodora dengan lebih mudah.
            </p>
          </div>

          <div className="hp-hero-stats">
            <div>
              <strong>{orders.length}</strong>
              <span>Total Pesanan</span>
            </div>

            <div>
              <strong>{totalSelesai}</strong>
              <span>Selesai</span>
            </div>

            <div>
              <strong>{totalDiproses}</strong>
              <span>Diproses</span>
            </div>

            <div>
              <strong>{totalDibatalkan}</strong>
              <span>Dibatalkan</span>
            </div>
          </div>
        </motion.section>

        <motion.div
          className="hp-filter-wrapper"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {filters.map((filter) => {
            const Icon = filter.icon;
            const active = activeFilter === filter.label;

            return (
              <button
                key={filter.label}
                type="button"
                className={`hp-filter-btn ${active ? "active" : ""}`}
                onClick={() => setActiveFilter(filter.label)}
              >
                <Icon />
                {filter.label}
              </button>
            );
          })}
        </motion.div>

        <div className="hp-content">
          <section className="hp-order-list">
            <AnimatePresence mode="popLayout">
              {filteredOrders.length === 0 ? (
                <motion.div
                  className="hp-empty-state"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                >
                  <div>
                    <FaReceipt />
                  </div>

                  <h3>Belum ada pesanan</h3>

                  <p>
                    Tidak ada pesanan dengan status{" "}
                    <strong>{activeFilter}</strong>.
                  </p>
                </motion.div>
              ) : (
                filteredOrders.map((order, index) => (
                  <OrderCard key={order.id} order={order} index={index} />
                ))
              )}
            </AnimatePresence>
          </section>

          <motion.aside
            className="hp-summary-card"
            initial={{ opacity: 0, x: 34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <span className="hp-summary-badge">TERAKHIR DIPESAN</span>

            <div className="hp-summary-image">
              <img src={lastOrder.image} alt={lastOrder.name} />
            </div>

            <h2>{lastOrder.name}</h2>

            <p className="hp-summary-id">ID: {lastOrder.code}</p>

            <div className="hp-summary-row">
              <p>Status</p>
              <span>Selesai</span>
            </div>

            <div className="hp-summary-row">
              <p>Pembayaran</p>
              <strong>{lastOrder.payment}</strong>
            </div>

            <div className="hp-summary-row">
              <p>Total</p>
              <strong>{lastOrder.price}</strong>
            </div>

            <div className="hp-progress">
              <div className="active">
                <FaReceipt />
              </div>

              <span></span>

              <div className="active">
                <FaUtensils />
              </div>

              <span></span>

              <div className="active">
                <FaTruck />
              </div>

              <span></span>

              <div className="active">
                <FaCheckCircle />
              </div>
            </div>

            <button className="hp-detail-btn">
              Lihat Detail
              <FaArrowRight />
            </button>
          </motion.aside>
        </div>
      </main>

      <footer className="hp-footer">
        <div className="hp-footer-top">
          <div className="hp-footer-brand">
            <h3>Foodora</h3>

            <p>
              Penyedia platform kurasi vendor makanan terbaik di Indonesia yang
              fokus pada kualitas dan kepuasan pelanggan.
            </p>

            <div className="hp-footer-social">
              <FaInstagram />
              <FaEnvelope />
              <FaAt />
            </div>
          </div>

          <div className="hp-footer-col">
            <h4>PERUSAHAAN</h4>
            <p>About Us</p>
            <p>Partner with Us</p>
            <p>Career</p>
          </div>

          <div className="hp-footer-col">
            <h4>BANTUAN</h4>
            <p>Help Center</p>
            <p>Contact</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>

          <div className="hp-footer-col hp-subscribe">
            <h4>BERLANGGANAN</h4>

            <p>Dapatkan info promo dan menu terbaru setiap minggu.</p>

            <div className="hp-subscribe-box">
              <input type="email" placeholder="Email Anda" />
              <button>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="hp-footer-bottom">
          © 2024 Foodora Indonesia. Fresh Heritage. Delivered.
        </div>
      </footer>
    </div>
  );
}

function OrderCard({ order, index }) {
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  return (
    <motion.article
      layout
      className="hp-order-card"
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={{
        duration: 0.4,
        delay: index * 0.06,
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.2 },
      }}
    >
      <div className="hp-order-image">
        <img src={order.image} alt={order.name} />

        <span className={config.className}>
          <StatusIcon />
          {order.status}
        </span>
      </div>

      <div className="hp-order-body">
        <div className="hp-order-top">
          <div>
            <h2>{order.name}</h2>

            <p className="hp-order-vendor">
              <FaUtensils />
              {order.vendor}
            </p>
          </div>

          <div className="hp-order-price">{order.price}</div>
        </div>

        <div className="hp-order-meta">
          <span>
            <FaReceipt />
            {order.code}
          </span>

          <span>
            <FaCalendarAlt />
            {order.date}
          </span>

          <span>
            <FaWallet />
            {order.payment}
          </span>

          <span>{order.items}</span>
        </div>

        <div className="hp-mini-timeline">
          <div className="active"></div>
          <span></span>
          <div
            className={
              order.status === "Diproses" ||
              order.status === "Selesai" ||
              order.status === "Dibatalkan"
                ? "active"
                : ""
            }
          ></div>
          <span></span>
          <div
            className={
              order.status === "Selesai" || order.status === "Dibatalkan"
                ? "active"
                : ""
            }
          ></div>
        </div>

        <div className="hp-order-bottom">
          <p className={config.className}>
            <StatusIcon />
            {config.text}
          </p>

          <div className="hp-order-actions">
            <button type="button" className="hp-reorder-btn">
              <FaRedoAlt />
              Pesan Lagi
            </button>

            <button type="button" className="hp-view-btn">
              <FaEye />
              Lihat
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export { default } from "./History";
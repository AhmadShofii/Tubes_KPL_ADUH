import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

import {
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiMapPin,
  FiPackage,
  FiRefreshCw,
  FiEye,
  FiX,
  FiShoppingBag,
  FiFilter,
} from "react-icons/fi";

import { getPesananByUser } from "../api/authApi";
import "../styles/history.css";

const fallbackImages = [
  "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?q=80&w=1000&auto=format&fit=crop",
];

const filters = ["Semua", "Diproses", "Selesai", "Dibatalkan"];

function formatRp(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}

function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getStatusType(status) {
  const normalized = String(status || "").toLowerCase();

  if (normalized.includes("batal")) return "danger";
  if (normalized.includes("selesai")) return "success";
  if (normalized.includes("kirim")) return "warning";

  return "process";
}

function getFilterStatus(status) {
  const normalized = String(status || "").toLowerCase();
  if (normalized.includes("batal")) return "Dibatalkan";
  if (normalized.includes("selesai")) return "Selesai";
  return "Diproses";
}

function getProgressSteps(status) {
  const type = getStatusType(status);
  const canceled = type === "danger";
  const done = type === "success";
  const shipping = type === "warning";

  return [
    { label: "Dibuat", icon: FiCheckCircle, status: canceled ? "danger" : "active" },
    { label: "Dikonfirmasi", icon: FiCheckCircle, status: canceled ? "" : "active" },
    { label: "Dimasak", icon: FiPackage, status: canceled ? "" : done || shipping ? "active" : "current" },
    { label: "Dikirim", icon: FiTruck, status: canceled ? "" : done ? "active" : shipping ? "current" : "" },
    { label: canceled ? "Dibatalkan" : "Selesai", icon: canceled ? FiX : FiMapPin, status: canceled ? "danger" : done ? "active" : "" },
  ];
}

function getOrderTitle(order) {
  if (!order?.details || order.details.length === 0) {
    return "Pesanan Foodora";
  }

  return order.details[0].nama_menu || "Pesanan Foodora";
}

function getOrderItemsText(order) {
  if (!order?.details || order.details.length === 0) {
    return "Detail menu tidak tersedia";
  }

  return order.details
    .map((item) => `${item.jumlah}x ${item.nama_menu || "Menu"}`)
    .join(" • ");
}

function History() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("foodora_user");

    if (!savedUser) {
      setMessage("Silakan login terlebih dahulu untuk melihat history.");
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    async function fetchHistory() {
      try {
        const result = await getPesananByUser(parsedUser.id_user);
        setOrders(result.data || []);
      } catch (error) {
        setMessage(error.message || "Gagal mengambil history pesanan.");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  const stats = useMemo(() => {
    return {
      total: orders.length,
      diproses: orders.filter((order) => getFilterStatus(order.status) === "Diproses").length,
      selesai: orders.filter((order) => getFilterStatus(order.status) === "Selesai").length,
      batal: orders.filter((order) => getFilterStatus(order.status) === "Dibatalkan").length,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (activeFilter === "Semua") return orders;
    return orders.filter((order) => getFilterStatus(order.status) === activeFilter);
  }, [orders, activeFilter]);

  const activeOrder = useMemo(() => {
    return (
      orders.find((order) => getFilterStatus(order.status) === "Diproses") ||
      orders[0]
    );
  }, [orders]);

  const progressSteps = useMemo(
    () => getProgressSteps(activeOrder?.status),
    [activeOrder?.status]
  );

  if (loading) {
    return (
      <>
        <section className="history-page history-page-pro">
          <motion.div
            className="history-state-card history-state-pro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="history-loading-spinner" />
            <h2>Memuat riwayat pesanan...</h2>
            <p>Mohon tunggu sebentar.</p>
          </motion.div>
        </section>

        <Footer />
      </>
    );
  }

  if (message && orders.length === 0) {
    return (
      <>
        <section className="history-page history-page-pro">
          <motion.div
            className="history-state-card history-state-pro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiShoppingBag />
            <h2>Riwayat Pesanan</h2>
            <p>{message}</p>
            <Link to="/login" className="history-state-link">Login Sekarang</Link>
          </motion.div>
        </section>

        <Footer />
      </>
    );
  }

  if (!activeOrder) {
    return (
      <>
        <section className="history-page history-page-pro">
          <motion.div
            className="history-state-card history-state-pro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiPackage />
            <h2>Belum Ada Pesanan</h2>
            <p>Kamu belum pernah membuat pesanan di Foodora.</p>
            <Link to="/list-vendor" className="history-state-link">Cari Vendor</Link>
          </motion.div>
        </section>

        <Footer />
      </>
    );
  }

  return (
    <>
      <section className="history-page history-page-pro">
        <motion.div
          className="history-header history-header-pro"
          initial={{ opacity: 0, y: -34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <span className="history-badge">
              <FiClock />
              Halo, {user?.nama || "User Foodora"}
            </span>

            <h1>Riwayat Pesanan</h1>

            <p>
              Pantau pesanan aktif, cek timeline pengiriman, dan lihat kembali
              semua transaksi Foodora kamu.
            </p>
          </div>

          <div className="history-hero-stats">
            <div>
              <strong>{stats.total}</strong>
              <span>Total</span>
            </div>
            <div>
              <strong>{stats.diproses}</strong>
              <span>Diproses</span>
            </div>
            <div>
              <strong>{stats.selesai}</strong>
              <span>Selesai</span>
            </div>
            <div>
              <strong>{stats.batal}</strong>
              <span>Dibatalkan</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="active-order-card active-order-card-pro"
          initial={{ opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <div className="active-order-image">
            <img src={fallbackImages[0]} alt={getOrderTitle(activeOrder)} />

            <span className={`active-order-status ${getStatusType(activeOrder.status)}`}>
              {activeOrder.status || "Pesanan Dibuat"}
            </span>
          </div>

          <div className="active-order-content">
            <div className="order-top">
              <div>
                <span className="order-id">Order #{activeOrder.id_pesanan}</span>

                <h2>{getOrderTitle(activeOrder)}</h2>

                <p>{getOrderItemsText(activeOrder)}</p>

                <span className="order-date">
                  Ordered on {formatDate(activeOrder.tanggal)}
                </span>
              </div>

              <h3>{formatRp(activeOrder.total_harga)}</h3>
            </div>

            <div className="progress-box progress-box-pro">
              {progressSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.label}
                    className={`progress-step ${step.status}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                  >
                    <div className="progress-icon">
                      <Icon />
                    </div>

                    <span>{step.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="map-box map-box-pro"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="map-header">
            <div>
              <h2>Lokasi Pengiriman</h2>
              <p>Kurir sedang menuju alamat tujuan kamu.</p>
            </div>

            <span>
              <FiTruck />
              {activeOrder.status || "On Process"}
            </span>
          </div>

          <iframe
            title="map"
            src="https://maps.google.com/maps?q=jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </motion.div>

        <section className="history-list-section history-list-section-pro">
          <div className="history-list-header">
            <div>
              <span className="history-list-kicker"><FiFilter /> FILTER PESANAN</span>
              <h2>Semua Pesanan</h2>
              <p>Daftar transaksi yang pernah kamu lakukan.</p>
            </div>

            <Link to="/list-vendor" className="history-order-again-link">
              <FiRefreshCw />
              Pesan Lagi
            </Link>
          </div>

          <div className="history-filter-tabs">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="history-list">
            <AnimatePresence mode="popLayout">
              {filteredOrders.length === 0 ? (
                <motion.div
                  className="history-state-card small"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h2>Tidak ada pesanan {activeFilter.toLowerCase()}</h2>
                  <p>Coba pilih filter lain untuk melihat pesanan kamu.</p>
                </motion.div>
              ) : (
                filteredOrders.map((order, index) => (
                  <motion.article
                    key={order.id_pesanan}
                    className="history-item-card history-item-card-pro"
                    layout
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="history-item-image">
                      <img
                        src={fallbackImages[index % fallbackImages.length]}
                        alt={getOrderTitle(order)}
                      />
                    </div>

                    <div className="history-item-content">
                      <div className="history-item-main">
                        <span className="history-order-id">#{order.id_pesanan}</span>

                        <h3>{getOrderTitle(order)}</h3>

                        <p>{getOrderItemsText(order)}</p>

                        <span className="history-date">{formatDate(order.tanggal)}</span>
                      </div>

                      <div className="history-item-side">
                        <span className={`status-badge ${getStatusType(order.status)}`}>
                          {order.status || "Diproses"}
                        </span>

                        <strong>{formatRp(order.total_harga)}</strong>

                        <div className="history-actions">
                          <button
                            type="button"
                            className="outline-btn"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <FiEye />
                            Detail
                          </button>

                          <Link to="/vendor-detail" className="primary-btn">
                            <FiRefreshCw />
                            Pesan Lagi
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>
      </section>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="history-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              className="history-modal"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="history-modal-close" onClick={() => setSelectedOrder(null)}>
                <FiX />
              </button>

              <span className={`status-badge ${getStatusType(selectedOrder.status)}`}>
                {selectedOrder.status || "Diproses"}
              </span>

              <h2>Order #{selectedOrder.id_pesanan}</h2>
              <p>{getOrderItemsText(selectedOrder)}</p>

              <div className="history-modal-detail">
                <div>
                  <span>Tanggal</span>
                  <strong>{formatDate(selectedOrder.tanggal)}</strong>
                </div>
                <div>
                  <span>Total</span>
                  <strong>{formatRp(selectedOrder.total_harga)}</strong>
                </div>
                <div>
                  <span>Metode</span>
                  <strong>{selectedOrder.metode_pembayaran || "-"}</strong>
                </div>
              </div>

              <Link to="/vendor-detail" className="history-modal-cta">
                Pesan Lagi
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default History;
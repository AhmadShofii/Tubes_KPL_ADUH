import "../styles/HistoriPesanan.css";
import {
  FaInstagram,
  FaEnvelope,
  FaAt,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

function HistoriPesanan() {
  const orders = [
    {
      id: 1,
      name: "Nasi Kuning Seraya",
      code: "#FD-66512",
      items: "2 Items",
      price: "Rp 125.000",
      status: "Selesai",
      date: "05 Okt 2025",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800",
    },
    {
      id: 2,
      name: "Ayam Kremes",
      code: "#FD-66512",
      items: "2 Items",
      price: "Rp 160.000",
      status: "Selesai",
      date: "01 Okt 2025",
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
      date: "20 August 2025",
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
      date: "4 August 2025",
      image:
        "https://images.unsplash.com/photo-1604908176997-431dcced9d9b?q=80&w=800",
    },
  ];

  const lastOrder = orders[0];

  return (
    <div className="history-page">
      <main className="history-main">
        <h1>Riwayat Pesanan</h1>

        <div className="filter-wrapper">
          <button className="filter-btn active-filter">Semua</button>

          <button className="filter-btn">
            <FaCheckCircle className="done-icon" />
            Selesai
          </button>

          <button className="filter-btn">
            <FaClock className="process-icon" />
            Diproses
          </button>

          <button className="filter-btn">
            <FaTimesCircle className="cancel-icon" />
            Dibatalkan
          </button>
        </div>

        <div className="history-content">
          <section className="order-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-left">
                  <img src={order.image} alt={order.name} />

                  <div className="order-info">
                    <h2>{order.name}</h2>

                    <p className="order-code">
                      ID: {order.code} • {order.items}
                    </p>

                    <div className="order-meta">
                      <span className="order-price">{order.price}</span>
                      <span className="dot">•</span>

                      <span
                        className={
                          order.status === "Dibatalkan"
                            ? "status-cancel"
                            : "status-done"
                        }
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="order-right">
                  <p className="order-date">{order.date}</p>

                  <div className="order-actions">
                    <button>Pesan lagi</button>
                    <button>Lihat</button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <aside className="summary-card">
            <span className="summary-badge">TERAKHIR DIPESAN</span>

            <h2>{lastOrder.name}</h2>

            <p className="summary-id">ID: {lastOrder.code}</p>

            <div className="summary-row">
              <p>Status</p>
              <span>Selesai</span>
            </div>

            <div className="summary-row">
              <p>Total</p>
              <strong>{lastOrder.price}</strong>
            </div>

            <button className="detail-btn">
              Lihat Detail
              <FaArrowRight />
            </button>
          </aside>
        </div>
      </main>

      <footer className="history-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Foodora</h3>

            <p>
              Penyedia platform kurasi vendor makanan terbaik di Indonesia yang
              fokus pada kualitas dan kepuasan pelanggan.
            </p>

            <div className="footer-social">
              <FaInstagram />
              <FaEnvelope />
              <FaAt />
            </div>
          </div>

          <div className="footer-col">
            <h4>PERUSAHAAN</h4>
            <p>About Us</p>
            <p>Partner with Us</p>
            <p>Career</p>
          </div>

          <div className="footer-col">
            <h4>BANTUAN</h4>
            <p>Help Center</p>
            <p>Contact</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>

          <div className="footer-col subscribe">
            <h4>BERLANGGANAN</h4>

            <p>Dapatkan info promo dan menu terbaru setiap minggu.</p>

            <div className="subscribe-box">
              <input type="email" placeholder="Email Anda" />
              <button>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="history-footer-bottom">
          © 2024 Foodora Indonesia. Fresh Heritage. Delivered.
        </div>
      </footer>
    </div>
  );
}

export default HistoriPesanan;
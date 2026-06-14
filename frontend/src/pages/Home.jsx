import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiClock,
  FiStar,
  FiCheckCircle,
  FiTruck,
  FiShield,
  FiCreditCard,
  FiHeart,
  FiMapPin,
} from "react-icons/fi";

import "../styles/home.css";

import heroFood from "../assets/images/hero-food.png";
import nasi from "../assets/images/nasi-goreng.png";
import sate from "../assets/images/sate.png";
import rendang from "../assets/images/rendang.png";

const whyCards = [
  {
    type: "main",
    icon: FiCheckCircle,
    title: "Banyak Pilihan Vendor",
    desc: "Temukan berbagai menu favorit dari vendor makanan terkurasi, mulai dari masakan nusantara, lauk rumahan, hingga menu premium.",
    tags: ["Halal", "Nusantara", "Premium", "Cepat"],
    img: nasi,
  },
  {
    type: "green",
    icon: FiCreditCard,
    title: "Pembayaran Mudah",
    desc: "Dukung metode pembayaran modern seperti QRIS, DANA, GoPay, dan transfer bank.",
    metric: "4+ Metode",
  },
  {
    type: "orange",
    icon: FiStar,
    title: "Rating Terpercaya",
    desc: "Setiap vendor memiliki rating dan ulasan agar kamu bisa memilih dengan lebih yakin.",
    metric: "4.8/5",
  },
  {
    type: "white",
    icon: FiTruck,
    title: "Pesanan Cepat",
    desc: "Proses pemesanan mudah, praktis, dan pengiriman dapat dipantau dari halaman history.",
    metric: "15 Menit",
  },
  {
    type: "white",
    icon: FiShield,
    title: "Vendor Terkurasi",
    desc: "Foodora membantu menghadirkan vendor pilihan dengan kualitas rasa dan pelayanan terbaik.",
    metric: "500+ Vendor",
  },
];

function Home() {
  return (
    <div className="home">
      <div className="blur blur1"></div>
      <div className="blur blur2"></div>

      <section className="hero landing-hero">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="badge">PLATFORM VENDOR MAKANAN</span>

          <h1>
            Temukan Vendor <br />
            <span>Makanan Terbaik </span> untukmu
          </h1>

          <p>
            Nikmati kelezatan autentik nusantara dari vendor terkurasi. Harga
            transparan, pemesanan cepat, dan kualitas yang selalu terjaga.
          </p>

          <div className="hero-buttons">
            <Link to="/beranda" className="primary-btn">
              Mulai Sekarang &gt;
            </Link>

            <Link to="/list-vendor" className="secondary-btn">
              Lihat Menu
            </Link>
          </div>

          <div className="stats">
            <div className="stat-card">
              <h2>500+</h2>
              <p>Vendor Aktif</p>
            </div>

            <div className="stat-card">
              <h2>4.8/5</h2>
              <p>Rating Kepuasan</p>
            </div>

            <div className="stat-card">
              <h2>15mnt</h2>
              <p>Rata-rata Kirim</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-image-container">
            <img src={heroFood} alt="Foodora Hero" className="hero-image" />

            <div className="floating-badge top-right">
              ⭐ Menu Terlaris <br />
              <span>Pesanan Cepat</span>
            </div>

            <div className="floating-badge bottom-left">
              🧡 Rating 5 Bintang <br />
              <span>Dari 10rb+ Pelanggan</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="why-choose-us">
        <div className="why-bg-circle"></div>

        <motion.div
          className="section-header center"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-kicker">KENAPA FOODORA?</span>

          <h2>Mengapa Memilih Foodora?</h2>

          <p>
            Kami menghadirkan pengalaman pesan makanan yang lebih praktis,
            transparan, dan nyaman untuk semua kebutuhan kulinermu.
          </p>
        </motion.div>

        <div className="feature-grid">
          {whyCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                className={`feature-card feature-${card.type}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="feature-card-content">
                  <div className="feature-icon">
                    <Icon />
                  </div>

                  <h3>{card.title}</h3>

                  <p>{card.desc}</p>

                  {card.tags && (
                    <div className="mini-tags">
                      {card.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}

                  {card.metric && (
                    <div className="feature-metric">
                      <strong>{card.metric}</strong>
                      <span>Foodora Service</span>
                    </div>
                  )}
                </div>

                {card.img && (
                  <div className="feature-visual">
                    <img src={card.img} alt={card.title} />

                    <div className="feature-floating-card">
                      <FiHeart />
                      <div>
                        <strong>Fresh Food</strong>
                        <span>Ready to deliver</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="why-mini-info"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div>
            <FiMapPin />
            <span>Dekat dengan lokasimu</span>
          </div>

          <div>
            <FiClock />
            <span>Estimasi waktu jelas</span>
          </div>

          <div>
            <FiShield />
            <span>Vendor terpercaya</span>
          </div>
        </motion.div>
      </section>

      <section className="popular-section">
        <div className="section-header">
          <h2>Terpopuler Minggu Ini</h2>
          <button className="view-btn">Lihat Semua</button>
        </div>

        <div className="vendor-grid">
          <MenuCard
            name="Iga Bakar Madu"
            price="85.000"
            rating="4.9"
            img={rendang}
          />

          <MenuCard
            name="Nasi Goreng Wagyu"
            price="65.000"
            rating="4.8"
            img={nasi}
          />

          <MenuCard
            name="Sate Ayam Ponorogo"
            price="45.000"
            rating="4.9"
            img={sate}
          />

          <MenuCard
            name="Rendang Daging Sapi"
            price="75.000"
            rating="5.0"
            img={rendang}
          />
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-box">
          <h2>Siap Menemukan Rasa Terbaik?</h2>

          <p>
            Daftar sekarang dan nikmati pengalaman kuliner nusantara terbaik di
            pintu rumahmu.
          </p>

          <div className="cta-buttons">
            <Link to="/register" className="primary-btn orange">
              Daftar Sekarang
            </Link>

            <Link to="/beranda" className="secondary-btn outline">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-box">
            <h2 className="logo">Foodora</h2>
            <p>Penyedia platform kurasi vendor makanan terbaik di Indonesia.</p>
          </div>

          <div className="footer-box">
            <h3>PERUSAHAAN</h3>
            <p>About Us</p>
            <p>Partner with Us</p>
            <p>Career</p>
          </div>

          <div className="footer-box">
            <h3>BANTUAN</h3>
            <p>Help Center</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>

          <div className="footer-box newsletter">
            <h3>BERLANGGANAN</h3>

            <div className="subscribe-box">
              <input type="text" placeholder="Email Anda" />
              <button className="go-btn">➤</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MenuCard({ name, price, rating, img }) {
  return (
    <motion.div className="vendor-card" whileHover={{ y: -10 }}>
      <div className="card-image-wrap">
        <img src={img} alt={name} className="food-image" />
        <span className="card-rating">⭐ {rating}</span>
      </div>

      <div className="vendor-content">
        <h3>{name}</h3>

        <div className="vendor-bottom">
          <h4>Rp {price}</h4>
          <button className="add-btn">+</button>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
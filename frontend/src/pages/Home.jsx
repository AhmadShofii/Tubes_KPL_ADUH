import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiClock,
  FiStar,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";

import "../styles/home.css";

// Assets (Pastikan path sesuai dengan struktur folder kamu)
import heroFood from "../assets/images/hero-food.png";
import nasi from "../assets/images/nasi-goreng.png";
import sate from "../assets/images/sate.png";
import rendang from "../assets/images/rendang.png";

function Home() {
  return (
    <div className="home">
      {/* BACKGROUND BLUR */}
      <div className="blur blur1"></div>
      <div className="blur blur2"></div>

      {/* HERO SECTION */}
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
            <button className="primary-btn">Mulai Sekarang &gt;</button>
            <button className="secondary-btn">Lihat Menu</button>
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
              ⭐ Menu Terlaris <br /> <span>Pesanan Cepat</span>
            </div>
            <div className="floating-badge bottom-left">
              🧡 Rating 5 Bintang <br /> <span>Dari 10rb+ Pelanggan</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* WHY CHOOSE US - Feature Grid sesuai Desain */}
      <section className="why-choose-us">
        <div className="section-header center">
          <h2>Mengapa Memilih Foodora?</h2>
          <p>Kami menghadirkan solusi makan terbaik dengan kualitas yang diprioritaskan.</p>
        </div>

        <div className="feature-grid">
          {/* Card 1: Banyak Pilihan */}
          <div className="feature-card wide white">
             <div className="card-text">
                <FiCheckCircle className="icon-green" />
                <h3>Banyak Pilihan</h3>
                <p>Menu bervariasi dari masakan nusantara hingga gourmet internasional.</p>
                <div className="mini-tags">
                    <span>Halal</span> <span>Nusantara</span> <span>Vegetarian</span>
                </div>
             </div>
             <div className="card-img-placeholder dark-bg">
                {/* Gambar burger/makanan sesuai desain */}
             </div>
          </div>

          {/* Card 2: Harga Transparan */}
          <div className="feature-card small green">
             <div className="card-text">
                <FiStar className="icon-white" />
                <h3>Harga Transparan</h3>
                <p>Tidak ada biaya tersembunyi. Semua harga sesuai dengan kualitas yang didapat.</p>
                <Link to="/beranda">Pelajari lanjut &gt;</Link>
             </div>
          </div>

          {/* Card 3: Rating & Ulasan */}
          <div className="feature-card small orange">
             <div className="card-text">
                <FiStar className="icon-white" />
                <h3>Rating & Ulasan</h3>
                <p>Dipercaya oleh lebih dari 12.000 pelanggan aktif di seluruh Indonesia.</p>
                <div className="user-avatars"> {/* Avatar placeholder */} </div>
             </div>
          </div>

          {/* Card 4: Mudah & Cepat */}
          <div className="feature-card wide white flex-row">
             <div className="card-img-placeholder gray-bg">
                 <FiTruck size={40} />
             </div>
             <div className="card-text">
                <FiClock className="icon-green" />
                <h3>Mudah & Cepat</h3>
                <p>Pemesanan dalam hitungan detik, pengantaran dalam hitungan menit.</p>
             </div>
          </div>
        </div>
      </section>

      {/* POPULAR MENU */}
      <section className="popular-section">
        <div className="section-header">
          <h2>Terpopuler Minggu Ini</h2>
          <button className="view-btn">Lihat Semua</button>
        </div>
        <div className="vendor-grid">
          <MenuCard name="Iga Bakar Madu" price="85.000" rating="4.9" img={rendang} />
          <MenuCard name="Nasi Goreng Wagyu" price="65.000" rating="4.8" img={nasi} />
          <MenuCard name="Sate Ayam Ponorogo" price="45.000" rating="4.9" img={sate} />
          <MenuCard name="Rendang Daging Sapi" price="75.000" rating="5.0" img={rendang} />
        </div>
      </section>

      {/* CTA SECTION - Hijau Gelap sesuai desain */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>Siap Menemukan Rasa Terbaik?</h2>
          <p>Daftar sekarang dan nikmati pengalaman kuliner nusantara terbaik di pintu rumahmu.</p>
          <div className="cta-buttons">
            <button className="primary-btn orange">Daftar Sekarang</button>
            <button className="secondary-btn outline">Hubungi Kami</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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

// Sub-component untuk Card agar kode bersih
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


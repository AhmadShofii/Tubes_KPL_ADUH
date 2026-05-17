import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FiSearch, FiClock, 
  FiSend, FiStar, FiCamera, FiAtSign, 
} from "react-icons/fi";
import "../styles/beranda.css";

// Data Dummy Vendor
const VENDOR_DATA = [
  { id: 1, name: "Resa Rumah", tag: "Sehat • Lokal", price: "35.000+", rate: "4.8", cat: "Nasi", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500" },
  { id: 2, name: "Warung Bu Siti", tag: "Minang • Pedas", price: "45.000+", rate: "4.7", cat: "Nasi", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=500" },
  { id: 3, name: "Bakmi Jowo Solo", tag: "Bakmi • Jawa", price: "28.000+", rate: "4.9", cat: "Sate", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500" },
  { id: 4, name: "Kedai Kopi", tag: "Minuman • Kopi", price: "18.000+", rate: "4.6", cat: "Minuman", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500" },
  { id: 5, name: "Sate Maranggi", tag: "Sate • Khas Purwakarta", price: "55.000+", rate: "4.9", cat: "Sate", img: "https://images.unsplash.com/photo-1529651795107-e5a141e34843?q=80&w=500" },
];

const HERO_IMG = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1500&auto=format&fit=crop";
const MAIN_VENDOR_IMG = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop";

function Beranda() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Terdekat", "Rating Tertinggi", "Promo", "Nasi", "Sate", "Minuman"];

  // Filter Logic
  const filteredVendors = VENDOR_DATA.filter(vendor => {
    if (selectedCategory === "Semua") return true;
    if (selectedCategory === "Terdekat") return vendor.rate >= 4.8;
    return vendor.cat === selectedCategory;
  });

  return (
    <motion.div 
      className="beranda-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* HERO */}
      <section className="hero-beranda-section">
        <motion.div 
          className="hero-banner-box"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src={HERO_IMG} alt="Hero" className="img-hero-bg" />
          <div className="overlay-content">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Authentic Heritage, <br /> Delivered to You.
            </motion.h1>
            <motion.div 
              className="search-wrapper"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <FiSearch className="icon-search" />
              <input type="text" placeholder="Mau makan apa hari ini?" />
              <button className="btn-submit-search">Cari</button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FILTER CATEGORY */}
      <section className="filter-container">
        <div className="filter-list">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={selectedCategory === cat ? "btn-cat active" : "btn-cat"}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="recommendation-grid-section">
        <div className="section-title-flex">
          <h2>{selectedCategory === "Semua" ? "Rekomendasi Terpopuler" : `Hasil: ${selectedCategory}`}</h2>
          <Link to="/list-vendor" className="view-all-link">Lihat Semua</Link>
        </div>

        <div className="bento-wrapper">
          {selectedCategory === "Semua" && (
            <motion.div 
              className="card-main-bento"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              style={{ backgroundImage: `linear-gradient(transparent, rgba(0,0,0,0.85)), url(${MAIN_VENDOR_IMG})` }}
            >
              <div className="tag-trending">TRENDING</div>
              <div className="info-bento">
                <h3>Dapur Amanda</h3>
                <p>Hidangan warisan nusantara dengan cita rasa autentik.</p>
                <button className="btn-order-bento">Pesan Sekarang</button>
              </div>
            </motion.div>
          )}

          <motion.div className="grid-sub-bento" layout>
            <AnimatePresence mode="popLayout">
              {filteredVendors.map((vendor) => (
                <SmallVendorCard 
                  key={vendor.id}
                  name={vendor.name}
                  tag={vendor.tag}
                  price={vendor.price}
                  rate={vendor.rate}
                  img={vendor.img}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-beranda">
        <div className="footer-top-grid">
          <div className="footer-col brand-col">
            <h2 className="footer-logo">Foodora</h2>
            <p>Penyedia platform kurasi vendor makanan terbaik di Indonesia.</p>
            <div className="social-icons">
               <div className="icon-circle"><FiStar /></div>
               <div className="icon-circle"><FiCamera /></div>
               <div className="icon-circle"><FiAtSign /></div>
            </div>
          </div>
          <div className="footer-col">
            <h4>PERUSAHAAN</h4>
            <ul><li>About Us</li><li>Partner with Us</li><li>Career</li></ul>
          </div>
          <div className="footer-col">
            <h4>BANTUAN</h4>
            <ul><li>Help Center</li><li>Contact</li><li>Privacy Policy</li></ul>
          </div>
          <div className="footer-col newsletter-col">
            <h4>BERLANGGANAN</h4>
            <div className="subscribe-box">
              <input type="email" placeholder="Email Anda" />
              <button className="btn-send"><FiSend /></button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Foodora Indonesia. Fresh Heritage, Delivered.</p>
        </div>
      </footer>
    </motion.div>
  );
}

function SmallVendorCard({ name, tag, price, rate, img }) {
  return (
    <motion.div 
      className="card-small-vendor"
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <div className="img-wrap-small">
        <img src={img} alt={name} loading="lazy" />
        <span className="badge-rate">⭐ {rate}</span>
      </div>
      <div className="content-small">
        <h4>{name}</h4>
        <p className="txt-tag">{tag}</p>
        <div className="foot-small">
          <span className="txt-price">Rp {price}</span>
          <span className="txt-time"><FiClock /> 15-20m</span>
        </div>
      </div>
    </motion.div>
  );
}

export default Beranda;
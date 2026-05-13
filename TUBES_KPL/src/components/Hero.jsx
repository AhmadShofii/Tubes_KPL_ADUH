import { motion } from "framer-motion";
import heroFood from "../assets/images/hero-food.png";
import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <span className="badge">INDONESIAN FRESH HERITAGE</span>

        <h1>
          Temukan Vendor <br />
          Makanan Terbaik untukmu
        </h1>

        <p>
          Nikmati kelezatan autentik Nusantara dari vendor terpercaya.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Mulai Sekarang</button>
          <button className="secondary-btn">Lihat Menu</button>
        </div>

        <div className="hero-stats">
          <div>
            <h2>500+</h2>
            <p>Vendor Aktif</p>
          </div>

          <div>
            <h2>4.8/5</h2>
            <p>Rating Kepuasan</p>
          </div>

          <div>
            <h2>15mnt</h2>
            <p>Rata-rata Kirim</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="hero-right"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src={heroFood} alt="food" />
      </motion.div>
    </section>
  );
}

export default Hero;
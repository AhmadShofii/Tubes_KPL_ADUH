import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FiTag,
  FiGift,
  FiClock,
} from "react-icons/fi";

import "../styles/promo.css";

function Promo() {
  return (
    <>
      <Navbar />

      <section className="promo-page">

        {/* HEADER */}
        <motion.div
          className="promo-header"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <span className="promo-badge">
            🔥 SPECIAL PROMO
          </span>

          <h1>
            Promo Terbaik
            Untuk Kamu
          </h1>

          <p>
            Nikmati berbagai diskon menarik
            dan voucher eksklusif setiap hari.
          </p>

        </motion.div>

        {/* BIG PROMO */}
        <motion.div
          className="big-promo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >

          <div className="big-left">

            <h2>
              Diskon Hingga
              50%
            </h2>

            <p>
              Untuk semua menu pilihan
              setiap weekend.
            </p>

            <button>
              Claim Now
            </button>

          </div>

          <div className="big-right">
            🍔
          </div>

        </motion.div>

        {/* PROMO GRID */}
        <div className="promo-grid">

          {/* CARD */}
          <motion.div
            className="promo-card"
            whileHover={{ y: -10 }}
          >

            <FiGift className="promo-icon" />

            <h3>
              Voucher Gratis Ongkir
            </h3>

            <p>
              Gratis biaya pengiriman
              minimal order Rp50.000
            </p>

            <span>
              Berlaku sampai 30 Mei
            </span>

          </motion.div>

          {/* CARD */}
          <motion.div
            className="promo-card orange"
            whileHover={{ y: -10 }}
          >

            <FiTag className="promo-icon" />

            <h3>
              Cashback 30%
            </h3>

            <p>
              Cashback untuk pengguna baru
              hingga Rp25.000
            </p>

            <span>
              Limited Offer
            </span>

          </motion.div>

          {/* CARD */}
          <motion.div
            className="promo-card green"
            whileHover={{ y: -10 }}
          >

            <FiClock className="promo-icon" />

            <h3>
              Flash Sale
            </h3>

            <p>
              Promo spesial jam 12 siang
              setiap hari.
            </p>

            <span>
              12.00 - 14.00
            </span>

          </motion.div>

        </div>

        {/* FOOD DEALS */}
        <section className="food-deals">

          <div className="deal-header">

            <h2>
              Best Deals Today
            </h2>

            <p>
              Menu favorit dengan harga terbaik.
            </p>

          </div>

          <div className="deal-grid">

            <motion.div
              className="deal-card"
              whileHover={{ scale: 1.03 }}
            >

              <div className="deal-image">
                🍜
              </div>

              <div className="deal-content">

                <h3>
                  Nasi Goreng Premium
                </h3>

                <p>
                  Rp 65.000
                </p>

                <button>
                  Order Now
                </button>

              </div>

            </motion.div>

            <motion.div
              className="deal-card"
              whileHover={{ scale: 1.03 }}
            >

              <div className="deal-image orange-bg">
                🍢
              </div>

              <div className="deal-content">

                <h3>
                  Sate Ayam Special
                </h3>

                <p>
                  Rp 45.000
                </p>

                <button>
                  Order Now
                </button>

              </div>

            </motion.div>

            <motion.div
              className="deal-card"
              whileHover={{ scale: 1.03 }}
            >

              <div className="deal-image red-bg">
                🍛
              </div>

              <div className="deal-content">

                <h3>
                  Rendang Padang
                </h3>

                <p>
                  Rp 75.000
                </p>

                <button>
                  Order Now
                </button>

              </div>

            </motion.div>

          </div>

        </section>

      </section>

      <Footer />
    </>
  );
}

export default Promo;
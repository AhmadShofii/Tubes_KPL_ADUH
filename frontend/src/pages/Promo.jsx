import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { FiTag, FiGift, FiClock } from "react-icons/fi";
import "../styles/promo.css";

const dealItems = [
  {
    title: "Nasi Goreng Premium",
    price: "Rp 65.000",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200",
    badge: "Best Seller",
  },
  {
    title: "Sate Ayam Special",
    price: "Rp 45.000",
    image:
      "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?q=80&w=1200",
    badge: "Hot Deal",
  },
  {
    title: "Rendang Padang",
    price: "Rp 75.000",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200",
    badge: "Premium",
  },
];

function Promo() {
  return (
    <>
      <section className="promo-page">
        <motion.div
          className="promo-header"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="promo-badge">🔥 SPECIAL PROMO</span>

          <h1>
            Promo Terbaik
            <br />
            Untuk Kamu
          </h1>

          <p>
            Nikmati berbagai diskon menarik dan voucher eksklusif setiap hari
            untuk menu favorit pilihan Foodora.
          </p>
        </motion.div>

        <motion.div
          className="big-promo"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="big-promo-image">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400"
              alt="Promo Foodora"
            />
          </div>

          <div className="big-promo-overlay" />

          <div className="big-left">
            <span className="big-promo-label">Weekend Special</span>

            <h2>
              Diskon Hingga
              <br />
              50%
            </h2>

            <p>
              Untuk semua menu pilihan setiap weekend. Pesan sekarang dan
              nikmati promo terbaik dari Foodora.
            </p>

            <button type="button">Claim Now</button>
          </div>

          <div className="big-right">
            <span>50%</span>
            <p>OFF</p>
          </div>
        </motion.div>

        <div className="promo-grid">
          <motion.div className="promo-card" whileHover={{ y: -10 }}>
            <div className="promo-icon-box">
              <FiGift className="promo-icon" />
            </div>

            <h3>Voucher Gratis Ongkir</h3>
            <p>Gratis biaya pengiriman minimal order Rp50.000.</p>
            <span>Berlaku sampai 30 Mei</span>
          </motion.div>

          <motion.div className="promo-card orange" whileHover={{ y: -10 }}>
            <div className="promo-icon-box">
              <FiTag className="promo-icon" />
            </div>

            <h3>Cashback 30%</h3>
            <p>Cashback untuk pengguna baru hingga Rp25.000.</p>
            <span>Limited Offer</span>
          </motion.div>

          <motion.div className="promo-card green" whileHover={{ y: -10 }}>
            <div className="promo-icon-box">
              <FiClock className="promo-icon" />
            </div>

            <h3>Flash Sale</h3>
            <p>Promo spesial jam 12 siang setiap hari.</p>
            <span>12.00 - 14.00</span>
          </motion.div>
        </div>

        <section className="food-deals">
          <div className="deal-header">
            <h2>Best Deals Today</h2>
            <p>Menu favorit dengan harga terbaik dan tampilan yang menggoda.</p>
          </div>

          <div className="deal-grid">
            {dealItems.map((item, index) => (
              <motion.div
                className="deal-card"
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                whileHover={{ y: -8 }}
              >
                <div className="deal-image">
                  <img src={item.image} alt={item.title} />
                  <span className="deal-badge">{item.badge}</span>
                </div>

                <div className="deal-content">
                  <h3>{item.title}</h3>
                  <p>{item.price}</p>
                  <button type="button">Order Now</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}

export default Promo;
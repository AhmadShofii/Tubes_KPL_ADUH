// frontend/src/features/vendor-detail/components/Hero.jsx

import {
  Star,
  MapPin,
  Clock3,
  Info,
  UtensilsCrossed,
  ShieldCheck,
  Flame,
  Bike,
} from "lucide-react";
import { motion } from "framer-motion";

const heroContainer = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const heroItem = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  return (
    <motion.section
      className="vendor-hero vendor-hero-pro"
      variants={heroContainer}
      initial="hidden"
      animate="show"
    >
      <div className="vendor-hero-bg" />
      <div className="vendor-hero-overlay" />

      <motion.div
        className="vendor-hero-float vendor-hero-float-one"
        animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flame size={18} />
        Hot Promo
      </motion.div>

      <motion.div
        className="vendor-hero-float vendor-hero-float-two"
        animate={{ y: [0, 12, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Bike size={18} />
        20-30 min
      </motion.div>

      <div className="vendor-hero-content">
        <div className="vendor-hero-main">
          <motion.div variants={heroItem} className="vendor-hero-badges">
            <span className="vendor-partner-badge">
              <ShieldCheck size={15} />
              Verified Partner
            </span>

            <span className="vendor-rating-badge">
              <Star size={15} fill="currentColor" />
              <strong>4.8</strong>
              <small>(500+ ratings)</small>
            </span>
          </motion.div>

          <motion.h1 variants={heroItem}>Dapur Ananda</motion.h1>

          <motion.p variants={heroItem} className="vendor-hero-desc">
            Sajian heritage Indonesia dengan rasa rumahan, plating modern, dan
            paket lengkap yang cocok untuk makan siang, keluarga, atau meeting.
          </motion.p>

          <motion.div variants={heroItem} className="vendor-hero-meta">
            <div>
              <Clock3 size={17} />
              <span>20–30 min</span>
            </div>

            <div>
              <MapPin size={17} />
              <span>1.2 km dari lokasi kamu</span>
            </div>

            <div>
              <UtensilsCrossed size={17} />
              <span>Indonesian Heritage</span>
            </div>
          </motion.div>
        </div>

        <motion.div variants={heroItem} className="vendor-store-card-mini">
          <span>Mulai dari</span>
          <strong>Rp32k</strong>
          <p>Free delivery untuk transaksi hari ini.</p>

          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            className="vendor-store-info-btn"
          >
            <Info size={19} />
            Store Info
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
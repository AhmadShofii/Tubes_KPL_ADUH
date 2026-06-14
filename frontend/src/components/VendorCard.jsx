import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiClock,
  FiHeart,
  FiMapPin,
  FiShoppingBag,
} from "react-icons/fi";

function VendorCard({ v }) {
  return (
    <motion.article
      className="v-card-v2"
      layout
      whileHover={{ y: -10 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="v-card-glow" />

      <div className="v-img-box">
        <img src={v.img} alt={v.name} loading="lazy" />
        <div className="v-img-overlay" />

        <div className="v-rate-badge">
          ⭐ {v.rate} <span className="rev-count">({v.reviews})</span>
        </div>

        <motion.button
          type="button"
          className="v-fav-btn"
          whileTap={{ scale: 0.86 }}
          aria-label="Tambah ke favorit"
        >
          <FiHeart />
        </motion.button>

        {v.isPromo && <div className="v-promo-tag">PROMO</div>}
      </div>

      <div className="v-body">
        <div className="v-row-1">
          <h3>{v.name}</h3>
          <span className="v-price-lvl">{v.priceLvl}</span>
        </div>

        <p className="v-tag-txt">{v.tag}</p>

        <div className="v-row-meta">
          <span className="meta-item">
            <FiClock /> {v.time} min
          </span>
          <span className="meta-item">
            <FiMapPin /> {v.dist} km
          </span>
        </div>

        <div className="v-card-bottom">
          <span className="v-from">
            From <strong>Rp{v.startPrice}</strong>
          </span>

          <Link to="/vendor-detail" className="v-cta">
            <FiShoppingBag /> Menu <FiArrowRight />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default VendorCard;
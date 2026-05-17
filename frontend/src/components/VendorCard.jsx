import React from "react";
import { motion } from "framer-motion";
import { FiHeart, FiClock, FiMapPin } from "react-icons/fi";

function VendorCard({ v }) {
  return (
    <motion.div 
      className="v-card-v2" 
      layout 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="v-img-box">
        <img src={v.img} alt={v.name} loading="lazy" />
        <div className="v-rate-badge">
          ⭐ {v.rate} <span className="rev-count">({v.reviews})</span>
        </div>
        <button className="v-fav-btn">
          <FiHeart />
        </button>
        {v.isPromo && <div className="v-promo-tag">PROMO</div>}
      </div>
      
      <div className="v-body">
        <div className="v-row-1">
          <h3>{v.name}</h3>
          <span className="v-price-lvl">{v.priceLvl}</span>
        </div>
        <p className="v-tag-txt">{v.tag}</p>
        
        <div className="v-row-meta">
          <span className="meta-item"><FiClock /> {v.time} min</span>
          <span className="meta-item"><FiMapPin /> {v.dist} km</span>
          <span className="v-from">From <strong>Rp{v.startPrice}</strong></span>
        </div>
      </div>
    </motion.div>
  );
}

export default VendorCard;
// frontend/src/features/vendor-detail/components/MenuCard.jsx

import { useState } from "react";
import { Clock3, Flame, Plus, ShoppingBasket, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function MenuCard({ item, onAddToCart }) {
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    onAddToCart(item);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 900);
  }

  return (
    <motion.article
      className="vendor-menu-card vendor-menu-card-pro"
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="vendor-menu-image">
        <img src={item.image} alt={item.name} />
        <span className="vendor-menu-rating">
          <Star size={14} fill="currentColor" /> {item.rating}
        </span>
      </div>

      <div className="vendor-menu-body">
        <div>
          <div className="vendor-menu-title-row">
            <h3>{item.name}</h3>

            {item.badge && <span>{item.badge}</span>}
          </div>

          <p>{item.description}</p>
        </div>

        <div className="vendor-menu-info-row">
          <small>
            <Clock3 size={14} /> {item.prepTime}
          </small>
          <small>
            <Flame size={14} /> {item.calories}
          </small>
          <small>{item.sold} terjual</small>
        </div>

        <div className="vendor-menu-bottom">
          <div className="vendor-menu-price">
            <strong>{formatRupiah(item.price)}</strong>

            {item.originalPrice && (
              <small>{formatRupiah(item.originalPrice)}</small>
            )}
          </div>

          <motion.button
            type="button"
            onClick={handleAdd}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className={justAdded ? "added" : ""}
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  ✓ Ditambah
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <ShoppingBasket size={16} />
                  Add
                  <Plus size={15} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
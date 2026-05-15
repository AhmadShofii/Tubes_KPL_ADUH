import { Trash2, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

function formatRp(num) {
  return "Rp " + num.toLocaleString("id-ID");
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function CartItem({ item, onUpdateQty, onDelete }) {
  return (
    <motion.article
      layout
      variants={itemVariants}
      initial="hidden"
      animate="show"
      exit={{
        opacity: 0,
        x: -28,
        scale: 0.97,
        transition: {
          duration: 0.32,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        y: -3,
        transition: { duration: 0.22 },
      }}
      className="cart-item-card"
    >
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="cart-item-content">
        <div className="cart-item-top">
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
          </div>

          <motion.button
            type="button"
            className="cart-delete-button"
            onClick={() => onDelete(item.id)}
            aria-label={`Hapus ${item.name}`}
            whileHover={{ scale: 1.08, rotate: 4 }}
            whileTap={{ scale: 0.92 }}
          >
            <Trash2 size={18} />
          </motion.button>
        </div>

        <div className="cart-item-bottom">
          <motion.span
            key={item.qty}
            className="cart-item-price"
            initial={{ opacity: 0.7, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {formatRp(item.price)}
          </motion.span>

          <div className="cart-qty-control">
            <motion.button
              type="button"
              onClick={() => onUpdateQty(item.id, item.qty - 1)}
              aria-label="Kurangi jumlah"
              whileTap={{ scale: 0.86 }}
            >
              <Minus size={16} />
            </motion.button>

            <motion.span
              key={item.qty}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.22 }}
            >
              {item.qty}
            </motion.span>

            <motion.button
              type="button"
              onClick={() => onUpdateQty(item.id, item.qty + 1)}
              aria-label="Tambah jumlah"
              whileTap={{ scale: 0.86 }}
            >
              <Plus size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
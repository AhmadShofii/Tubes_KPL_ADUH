import { Minus, Plus, Trash2, Flame } from "lucide-react";
import { motion } from "framer-motion";

function formatRp(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}

export default function CartItem({ item, onUpdateQty, onDelete }) {
  const id = item.id;
  const name = item.name || item.nama_menu || "Menu Foodora";
  const desc = item.desc || item.description || "Menu pilihan dari Foodora.";
  const price = Number(item.price || item.harga || 0);
  const qty = Number(item.qty || item.jumlah || 1);
  const image =
    item.image ||
    item.img ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=900&auto=format&fit=crop";

  const itemTotal = price * qty;

  return (
    <motion.article
      layout
      className="cart-item"
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -28, scale: 0.96 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <div className="cart-item-image">
        <img src={image} alt={name} />

        <span>
          <Flame size={13} /> Fresh
        </span>
      </div>

      <div className="cart-item-body">
        <div className="cart-item-top">
          <div>
            <h3>{name}</h3>
            <p>{desc}</p>
          </div>

          <motion.button
            type="button"
            className="cart-delete"
            onClick={() => onDelete(id)}
            aria-label={`Hapus ${name}`}
            whileHover={{ rotate: 5, scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 size={18} />
          </motion.button>
        </div>

        <div className="cart-item-bottom">
          <div className="cart-price-group">
            <motion.strong
              key={itemTotal}
              initial={{ opacity: 0.6, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {formatRp(itemTotal)}
            </motion.strong>

            <small>{formatRp(price)} / item</small>
          </div>

          <div className="cart-qty">
            <button type="button" onClick={() => onUpdateQty(id, qty - 1)}>
              <Minus size={16} />
            </button>

            <motion.span
              key={qty}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
            >
              {qty}
            </motion.span>

            <button type="button" onClick={() => onUpdateQty(id, qty + 1)}>
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}